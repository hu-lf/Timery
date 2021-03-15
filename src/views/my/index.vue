<template>
  <div id="my">
    <!-- 日历 -->
    <el-calendar>
      <template v-slot:dateCell="{ date, data }">
        <p @click="show(data)">
          {{ data.day.split("-").slice(2).join("-") }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
      return {
      }
  },
  mounted() {
   
  },
  methods: {
      show(data) {
          console.log(data)
      }
  }
};
</script>

<style >
/* 点击面扩大 */
.el-calendar-day p{
    height: 100%;
}
</style>