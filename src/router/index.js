import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由跳转组件
// 我的面经分享组件
import shareFace from '@/views/shareFace/index.vue'
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
import profile from '@/views/profile/index.vue'
// 修改昵称组件
import setNickname from '@/views/setNickname/index.vue'
// 我的消息组件
import message from '@/views/My/message.vue'
// 导入store
import store from '@/store/index.js'
// 导入工具方法
import { getToken, removeToken } from '@/utils/local.js'
// 导入api
import { getUserInfo } from '@/api/userInfo.js'
import { Toast } from 'vant'
Vue.use(VueRouter)

const routes = [
  // 公司路由配置  路由元信息meta有isShow就是显示tabbar  有login是需要登录才能访问
  { path: '/company', component: company, meta: { isShow: true } },
  // 问题路由配置
  { path: '/question', component: question, meta: { isShow: true } },
  // 发现路由配置
  { path: '/find', component: find, meta: { isShow: true } },
  // 我的路由配置
  { path: '/my', component: my, meta: { isShow: true, login: true } },
  // 登录路由配置
  { path: '/login', component: login },
  // 路由重定向
  { path: '/', redirect: '/login' },
  // 我的资料路由配置
  { path: '/profile', component: profile, meta: { login: true } },
  // 修改昵称路由配置
  { path: '/setNickname', component: setNickname, meta: { login: true } },
  // 我的消息路由配置
  { path: '/message', component: message },
  // 我分享的面经配置
  { path: '/shareFace', component: shareFace }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
// 注册导航守卫
// 登录验证  判断切换的路由的元信息是否要登录 如果不用登录就允许通过 如果要登录就判断vuex的登录状态 如果登录状态是true 就允许通过 否则路由切换到登录页
router.beforeEach((to, from, next) => {
  // 判断切换的路由是否要登录
  if (to.meta.login) {
    // 判断是否登录了
    if (store.state.islogin) {
      // 登录了  允许通过
      next()
    } else {
      // 判断是否存在token
      if (getToken()) {
        // 存在  就发送请求获取用户信息  保存起来
        getUserInfo()
          .then(res => {
            // 图片拼接基地址
            res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
            // 保存用户信息vuex
            store.commit('SETUSERINFO', res.data)
            // 改变vuex登录状态
            store.commit('SETLOGINSTATUS', true)
            // 允许通过
            next()
          })
          .catch(() => {
            // token是伪装或者是无效
            // 删除token
            removeToken()
            // 提示用户
            Toast.fail('请登录')
            // 记录目标页面地址
            next('/login?target=' + to.fullPath)
          })
      } else {
        // 没有登录 路由切换到登录页
        // 提示用户
        Toast.fail('请登录')
        next('/login?target=' + to.fullPath)
      }
    }
  } else {
    // 不需要登录 允许通过
    next()
  }
})
export default router
