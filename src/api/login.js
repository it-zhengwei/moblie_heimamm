// 导入副本
import req from '@/utils/req.js'
// 获取验证码
function getCode (data) {
  return req({
    url: '/au/code',
    method: 'post',
    data
  })
}
// 登录接口
function login (data) {
  return req({
    url: '/au/login',
    method: 'post',
    data
  })
}
// 暴露出去
export { getCode, login }
