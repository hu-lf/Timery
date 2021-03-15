<template>
  <div id="item-detail">

    <!-- 标题 -->
    <div class="item-detail__header">
        {{ records[0].itemName }}
    </div>

    <!-- 时间线 -->
    <el-timeline>

      <el-timeline-item
        v-for="(record) in records"
        :key="record.id"
        :timestamp="record.when"
        placement="top"
      >
        <el-card>
          <h4>这是注释</h4>
          <p></p>
        </el-card>
      </el-timeline-item>

    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      // 避免在未获取到数据时，进行渲染，而报错 
      records: [{itemName:"请稍后..."}],
    };
  },
  activated() {
    let id = this.$route.params.id;
    fetch("http://127.0.0.1:8000/items/" + id)
      .then((res) => res.json())
      .then((res) => (this.records = res));
  },
};
</script>

<style scoped>
#item-detail {
  padding: 10px;
  box-sizing: border-box;
}
#item-detail .item-detail__header {
  height: 55px;
  font-size: 30px;
}
</style>