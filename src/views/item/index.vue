<template>
  <div id="item">
    <!-- 事项列表 -->
    <el-collapse accordion>
      <el-collapse-item
        v-for="(top_item, i) in items"
        :key="i"
        :title="top_item.name"
      >
        <router-link
          v-for="(sub_item, i) in top_item.sub_items"
          :key="i"
          :to="'/item/' + sub_item.id + '/detail'"
          tag="div"
        >
          {{ sub_item.name }}
        </router-link>
        <div v-if="top_item.sub_items.length == 0">暂无</div>
        <!-- 次级事项按钮 -->
        <Plus-btn
          @showForm="showForm(top_item.level + 1, top_item.id, top_item.name)"
        ></Plus-btn>
      </el-collapse-item>
    </el-collapse>

    <!-- 添加事项表单 -->
    <el-dialog title="添加事项" :visible.sync="formVisible" width="340px">
      <el-form>
        <el-form-item label="事项" label-width="70px">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="级别" label-width="70px">
          <el-input v-model="item.level" disabled></el-input>
        </el-form-item>
        <el-form-item label="顶级事项" label-width="70px">
          <el-input v-model="item.parentName" disabled></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取消</el-button>
        <el-button @click.prevent="addItem" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 顶级事项按钮 -->
    <Plus-btn fixed @showForm="showForm()"></Plus-btn>

    <!-- 二级：事项详情 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import PlusBtn from "@/components/PlusBtn";

export default {
  name: "Item",
  components: {
    PlusBtn,
  },
  data() {
    return {
      items: [],
      formVisible: false,
      item: { name: "", level: "", parentId: "", parentName: "" },
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/items/")
      .then((res) => res.json())
      .then((res) => (this.items = res));
  },
  methods: {
    // 显示表单: 还可优化
    showForm(level = 1, parentId = null, parentName = "无") {
      // 显示表单
      this.formVisible = true;
      // 默认项
      this.item.level = level;
      this.item.parentId = parentId;
      this.item.parentName = parentName;
    },
    // 添加事项
    addItem() {
      const _this = this;
      // 验证表单
      if (!_this.validate()) {
        return;
      }
      // 隐藏表单
      _this.formVisible = false;
      // 请求
      fetch("http://127.0.0.1:8000/items/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(_this.item),
      })
        .then((res) => res.json())
        .then((res) => {
          _this.message("添加事项成功！", "success");
          // 如果是顶级事项
          res.sub_items = [];
          if (res.level == 1) {
            _this.items.push(res);
            // 如果是二级事项
          } else {
            for (let i = 0; i < _this.items.length; i++) {
              if (_this.items[i].id == res.parent_id) {
                _this.items[i].sub_items.push(res);
              }
            }
          }
        });
    },
    // 表单验证
    validate() {
      // 事项名不能为空
      if (this.item.name == "") {
        this.message("事项名不能为空！", "error");
        return false;
      }
      // 事项名不能重复
      // 父级名不能重复
      if (this.items.some((top_item) => top_item.name == this.item.name)) {
        this.message("该事项已存在！", "error");
        this.item.name = "";
        return false;
      }
      // 子级名不能重复： 注意这里用的是of
      for (var top_item of this.items) {
        if (
          top_item.sub_items.some((sub_item) => sub_item.name == this.item.name)
        ) {
          this.message("该事项已存在！", "error");
          this.item.name = "";
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style>
/* 整体 */
div.el-collapse-item {
  padding-left: 10px;
}

/* 表单 */
.el-dialog__header {
  text-align: center;
}
.el-form-item__label {
  text-align: left;
}
</style>
