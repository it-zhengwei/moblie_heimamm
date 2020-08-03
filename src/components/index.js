// 导入需要全局注册的组件
import cell from '@/components/cell.vue'
import face from '@/components/face.vue'
import navBar from '@/components/navBar.vue'
// 导入moment
import moment from 'moment'
// 定义一个对象
const Obj = {
  // 定义一个install方法
  install (Vue) {
    // 注册组件
    Vue.component(cell.name, cell)
    Vue.component(face.name, face)
    Vue.component(navBar.name, navBar)
    // 注册全局的过滤时间方法
    Vue.filter('formatTime', time => {
      // 给时间格式定义中文
      moment.locale('zh-cn')
      // 把当前文章创建的时间格式去掉Z
      time = time.slice(0, time.length - 2)
      // 判断创建的时间是否超过一天
      if (moment().diff(moment(time, 'days') > 1)) {
        // 超过一天显示日期格式
        return moment(time).format('YYYY年MM月DD日')
      } else {
        // 显示一天内的时间
        return moment(time).fromNow()
      }
    })
  }
}
// 暴露出去
export default Obj
