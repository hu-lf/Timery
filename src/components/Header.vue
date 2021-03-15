<template>
  <header id="header">
    <img src="../../public/img/logo.png" />
    <GoBack></GoBack>
  </header>
</template>

<script>
import GoBack from "@/components/GoBack";

export default {
  name: "Header",
  components: {
    GoBack,
  },
};
</script>

<style scoped>
img {
  height: 55px;
}
</style>