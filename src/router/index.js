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
// 我的资料组件
import profile from '@/views/My/profile.vue'
// 修改昵称组件
import setNickname from '@/views/My/setNickname.vue'
// 我的消息组件
import message from '@/views/My/message.vue'
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
  { path: '/login', component: login },
  // 路由重定向
  { path: '/', redirect: '/login' },
  // 我的资料路由配置
  { path: '/profile', component: profile },
  // 修改昵称路由配置
  { path: '/setNickname', component: setNickname },
  // 我的消息路由配置
  { path: '/message', component: message }
]

const router = new VueRouter({
  routes
})

export default router
