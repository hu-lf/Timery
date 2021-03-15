<template>
  <div id="detail">
    <GoBack></GoBack>
    <TimeLine></TimeLine>
  </div>
</template>

<script>
import TimeLine from "@/components/item/TimeLine";
import GoBack from "@/components/GoBack";

export default {
  name: "detail",
  components: {
    TimeLine,
    GoBack,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {},
  },
};
</script>

<style scoped>
#detail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
</style>
