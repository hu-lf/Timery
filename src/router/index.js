import Vue from 'vue'
import VueRouter from 'vue-router'

import itemRoutes from './item'
import recordRoutes from './record'
import myRoutes from './my'

Vue.use(VueRouter)

const routes = [
  itemRoutes,
  recordRoutes,
  myRoutes,
  {
    path: '/*',
    redirect: '/item'
  },
]

const router = new VueRouter({
  routes
})

export default router
