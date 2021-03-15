<template>
  <div id="record">
    <!-- 记录列表 -->
    <el-collapse accordion>
      <el-collapse-item
        v-for="(records, date) in records"
        :key="date"
        :title="date"
      >
        <div v-for="(record, i) in records" :key="i">
          {{ record.name }}
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 添加记录表单 -->
    <el-drawer title="添加记录" :visible.sync="formVisible" direction="btt">
      <el-form>
        <el-form-item label="时间" label-width="45px">
          <el-date-picker v-model="record.date"></el-date-picker>
        </el-form-item>

        <el-form-item label="事项" label-width="45px">
          <el-input
            v-model="record.itemName"
            @focus="flag = true"
            readonly
            placeholder="请选择你的事项"
          ></el-input>

          <transition name="el-zoom-in-top">
            <!-- 事项列表 -->
            <el-collapse accordion v-show="flag">
              <el-collapse-item
                v-for="(top_item, i) in items"
                :key="i"
                :title="top_item.name"
              >
                <div
                  v-for="(sub_item, i) in top_item.sub_items"
                  :key="i"
                  @click="record.itemName = sub_item.name"
                >
                  {{ sub_item.name }}
                </div>
                <div v-if="top_item.sub_items.length == 0">暂无</div>
              </el-collapse-item>
            </el-collapse>
          </transition>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <!-- 如果loadding为true，则显示 动画 + 提交中... -->
        <el-button @click="handelSubmit()" :loading="loading" type="primary">
          {{ loading ? "提交中 ..." : "确定" }}
        </el-button>
      </div>
    </el-drawer>
    
    <Plus-btn fixed @showForm="showForm()"></Plus-btn>
  </div>
</template>

<script>
import PlusBtn from "@/components/PlusBtn";

export default {
  name: "Record",
  components: {
    PlusBtn,
  },
  data() {
    return {
      // 获取的数据
      items: [],
      records: null,
      // 需提交的数据
      record: {
        date: null,
        itemName: "",
      },
      formVisible: false,
      loading: false,
      timer: null,
      flag: false,
    };
  },
  watch: {
    // 日期格式
    "record.date"(newVal) {
      // 如果已经不是对象，而是已经格式化为字符串
      if (typeof newVal == "object") {
        // 格式化为字符串: 注意  这里不是 03

        // 格式为："2021/3/6"
        var localeDateString = newVal.toLocaleDateString();
        // 格式为："2021-3-6"
        var localeDateString = localeDateString.replaceAll("/", "-");

        // 格式为："2021-03-06"
        var array = localeDateString.split("-");
        array[1] = array[1].length == 1 ? "0" + array[1] : array[1];
        array[2] = array[2].length == 1 ? "0" + array[2] : array[2];
        this.record.date = array.join("-");
      }
    },
    // 事项列表显示动画
    "record.itemName"() {
      this.flag = false;
    },
  },
  mounted() {
    // 请求所有事项
    fetch("http://127.0.0.1:8000/items/")
      .then((res) => res.json())
      .then((res) => (this.items = res));
    // 请求所有记录
    fetch("http://127.0.0.1:8000/records/")
      .then((res) => res.json())
      .then((res) => (this.records = res));
    // 在挂载时，重新赋一下date的值，则会触发监听器函数
    this.record.date = new Date()
  },
  methods: {
    // init
    init() {
      fetch("http://127.0.0.1:8000/records/")
        .then((res) => res.json())
        .then((res) => (this.records = res));
    },
    // 显示表单
    showForm() {
      // 显示表单
      this.formVisible = true;
    },
    // 隐藏表单
    cancelForm() {
      this.loading = false;
      this.formVisible = false;
    },
    // 添加事项
    addRecord() {
      // 发起请求
      fetch("http://127.0.0.1:8000/records/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.record),
      }).then((res) => {
        // 重新获取items 或 records
        this.init();
        this.message("添加事项成功！", "success");
      });
    },
    // 表单验证
    validate() {
      // 事项名不能为空
      if (this.record.itemName == "") {
        this.message("事项名不能为空！", "error");
        return false;
      }
      // 因为之前写过，事项名不会重复，所以事项名也是唯一的

      if (this.records[this.record.date]) {
        for (const item of this.records[this.record.date]) {
          console.log(item);
          if (item.name == this.record.itemName) {
            this.message("今天已添加过该事项~", "error");
            return false;
          }
        }
      }

      return true;
    },
    handelSubmit() {
      // 验证表单
      if (!this.validate()) {
        return;
      }
      // 显示提交中...
      this.loading = true;

      // 1.2秒后添加记录
      setTimeout(() => {
        this.addRecord();
        this.cancelForm();
      }, 1200);
    },
  },
}
</script>

<style>
/* 整体 */
#record {
  background-color: rgb(232, 235, 242);
}
#record .el-collapse {
  padding: 10px;
}
/* 每项 */
#record .el-collapse-item {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #fff;
}
/* 抽屉整体 */
#record .el-drawer {
  height: auto !important;
  padding: 20px;
  overflow: scroll;
  transition: height 0.3s ease-in;
}
/* 按钮 */
#record .demo-drawer__footer {
  text-align: right;
}
/* 日期选择器 */
#record .el-date-editor.el-input {
  width: 100%;
}
</style>



