<template>
  <div :class="{ plusBtn: true, fixed: fixed }">
    <el-button
      type="primary"
      icon="el-icon-plus"
      circle
      @click="$emit('showForm')"
    >
    </el-button>
  </div>
</template>

<script>
export default {
  name: "PlusBtn",
  // 是否定位
  props: {
    fixed: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style>
.plusBtn.fixed {
  position: fixed;
  right: 10%;
  bottom: 12%;
}
.el-icon-plus {
  font-size: 20px;
}
</style>