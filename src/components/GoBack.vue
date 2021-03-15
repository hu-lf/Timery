<template>
    <el-page-header @back="goBack()" content="详情页面">
    </el-page-header>
</template>

<script>

export default {
  name: "GoBack",
  components: {
  },
  methods: {
    goBack() {
      this.$router.back()
    },  
  },
};
</script>

<style scoped>
</style>
