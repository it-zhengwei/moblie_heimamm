// 导入获取token的方法
import { getToken } from '@/utils/local.js'
// 导入轻提示
import { Toast } from 'vant'
// 导入axios
import axios from 'axios'

// 创建副本
const req = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
req.interceptors.request.use(
  config => {
    // 判断当前请求的api config对象里是否需要携带token
    if (config.needToken) {
      // 判断是否存在token
      if (getToken()) {
        config.headers.authorization = 'Bearer ' + getToken()
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
req.interceptors.response.use(
  res => {
    const code = res.data.code
    if (code === 200) {
      return res.data
    } else if (code === 400 || code === 401 || code === 403) {
      // 提示用户
      Toast.fail(res.data.message)
      // 中止then的执行
      return Promise.reject(new Error(res.data.message))
    } else {
      return Promise.reject(new Error(res.data.message))
    }
  },
  err => {
    return Promise.reject(err)
  }
)
// 暴露出去
export default req
