// 导入req
import req from '@/utils/req.js'
// 获取面试技巧
function technic (params) {
  return req({
    url: '/articles/technic',
    params,
    needToken: true
  })
}
// 获取市场数据
function cityData () {
  return req({
    url: '/chart-data/hot'
  })
}

// 获取面经列表
function share (params) {
  return req({
    url: '/articles/share',
    needToken: true,
    params
  })
}
// 获取面向技巧热搜
function technicTopSearch () {
  return req({
    url: '/articles/technicTopSearch'
  })
}
// 暴露出去
export { technic, cityData, share, technicTopSearch }
