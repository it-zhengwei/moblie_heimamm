// 导入副本
import req from '@/utils/req.js'
// 获取用户信息
function getUserInfo () {
  return req({
    url: '/au/info',
    // 自定义一个属性来判断请求需不需要携带token
    needToken: true
  })
}
// 修改用户信息
function editUserInfo (data) {
  return req({
    url: '/au/edit',
    method: 'post',
    data,
    // 自定义一个属性来判断请求需不需要携带token
    needToken: true
  })
}
// 文件上传
function upload (data) {
  return req({
    url: '/upload',
    method: 'post',
    data,
    // 自定义一个属性来判断请求需不需要携带token
    needToken: true
  })
}
// 暴露出去
export { getUserInfo, editUserInfo, upload }
