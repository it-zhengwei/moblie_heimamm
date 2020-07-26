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
// 登录组件
import login from '@/views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  // 公司路由配置  路由元信息meta有isShow就是显示tabbar
  { path: '/company', component: company, meta: { isShow: true } },
  // 问题路由配置
  { path: '/question', component: question, meta: { isShow: true } },
  // 发现路由配置
  { path: '/find', component: find, meta: { isShow: true } },
  // 我的路由配置
  { path: '/my', component: my, meta: { isShow: true } },
  // 登录路由配置
  { path: '/', component: login }
]

const router = new VueRouter({
  routes
})

export default router
