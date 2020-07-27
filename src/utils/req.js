// 导入axios
import axios from 'axios'
// 创建副本
const req = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
req.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
req.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)
// 暴露出去
export default req
