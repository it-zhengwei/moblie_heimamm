import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由跳转组件
// 公司组件
import company from '@/views/Company/index.vue'
// 刷题组件
import question from '@/views/Question/index.vue'
// 发现组件
import find from '@/views/Find/index.vue'
// 我的组件
import my from '@/views/My/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/company', component: company },
  { path: '/question', component: question },
  { path: '/find', component: find },
  { path: '/my', component: my }
]

const router = new VueRouter({
  routes
})

export default router
