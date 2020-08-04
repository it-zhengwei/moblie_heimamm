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
// 获取面经的详情
function sharedetails (id) {
  return req({
    url: '/articles/share/' + id
  })
}
// 获取面经评论
function comments ({ id, start, limit }) {
  return req({
    url: '/articles/comments/' + id,
    params: {
      start,
      limit
    }
  })
}
// 发表评论
function setComments (data) {
  return req({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
// 暴露出去
export {
  technic,
  cityData,
  share,
  technicTopSearch,
  sharedetails,
  comments,
  setComments
}
