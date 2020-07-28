// 导入获取token的方法
import { getToken } from '@/utils/local.js'
// 导入axios
import axios from 'axios'
// 创建副本
const copy = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
copy.interceptors.request.use(
  config => {
    config.headers('authorization', 'Bearer ' + getToken())
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
copy.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)
// 暴露出去
export default copy
