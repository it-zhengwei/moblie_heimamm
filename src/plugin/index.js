// 导入store
import store from '@/store/index.js'
import { getToken, removeToken } from '@/utils/local.js'
import { Toast } from 'vant'
import router from '@/router/index.js'
import { getUserInfo } from '@/api/userInfo.js'
export default function global (Vue) {
  Vue.prototype.$login = function () {
    // 返回一个promise对象  让外面.then  .catch执行
    return new Promise((resolve, reject) => {
      // 判断是否登录
      if (store.state.islogin) {
        // 登录了
        resolve()
      } else {
        // 没有登录  判断是否有token
        if (getToken()) {
          // 有token
          // 获取用户信息
          getUserInfo()
            .then(res => {
              // 图片拼接基地址
              res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
              // 保存用户信息vuex
              store.commit('SETUSERINFO', res.data)
              // 改变vuex登录状态
              store.commit('SETLOGINSTATUS', true)
              resolve()
            })
            .catch(() => {
              // 删除token
              removeToken()
              // 提示用户
              Toast.fail('请登录')
              // 跳转到登录页面并记录当前页面
              router.push('/login?target=' + this.$route.fullPath)
              // reject
              reject(new Error('请登录'))
            })
        } else {
          // 没有token
          // 提示用户
          Toast.fail('请登录')
          // 跳转到登录页并记录当前页面
          router.push('/login?target=' + this.$route.fullPath)
          // reject
          reject(new Error('请登录'))
        }
      }
    })
  }
}
