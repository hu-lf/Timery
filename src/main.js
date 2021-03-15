import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

// 定义全局方法
Vue.prototype.message = function(message, type) {
  this.$message({
    message: message,
    type: type,
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
