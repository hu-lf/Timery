<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    
    <!-- 内容 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.el-page-header {
  height: 35px;
  line-height: 35px;
}
</style>
