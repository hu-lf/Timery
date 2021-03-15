<template>
  <footer id="footer">
    <ul>
      <router-link to="/item" tag="li">
        <i class="iconfont icon-xiangmu"></i>
        <p>事项</p>
      </router-link>
      <router-link to="/record" tag="li">
        <i class="iconfont icon-lishi"></i>
        <p>记录</p>
      </router-link>
      <router-link to="/my" tag="li">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
#footer {
  width: 100%;
  height: 50px;
  background: white;
  border-top: 2px #ebe8e3 solid;
  position: fixed;
  left: 0;
  bottom: 0;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 100%;
  align-items: center;
}
#footer ul li {
  flex: 1;
  height: 40px;
}
#footer ul li.active {
  color: #f03d37;
}
#footer ul li.router-link-active {
  color: #00a0e9;
}
@keyframes emphasize {
  0% {transform: scale(1);}
  33% {transform: scale(1.1);}
  100% {transform: scale(1);}
}
#footer ul li.router-link-active i{
  display: block;
  animation: emphasize .5s;
}

#footer ul i {
  font-size: 20px;
}
#footer ul p {
  font-size: 14px;
  line-height: 18px;
}

</style>