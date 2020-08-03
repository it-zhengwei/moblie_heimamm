const key = 'HISTORY'
// 保存历史记录
function saveHistory (data) {
  // 保存要把数据转化为字符串
  window.localStorage.setItem(key, JSON.stringify(data))
}
// 获取历史记录
function getHistory () {
  // 判断当前保存的数据是否为空
  if (JSON.parse(window.localStorage.getItem(key))) {
    // 不为空返回当前历史记录
    return JSON.parse(window.localStorage.getItem(key))
  } else {
    // 为空返回[]  主要是配合push使用
    return []
  }
}
// 删除历史记录
function removeHistory () {
  window.localStorage.removeItem(key)
}
// 暴露出去
export { saveHistory, getHistory, removeHistory }
