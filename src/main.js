import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入初始化样式
import '@/style/base.less'
// 导入字体图标样式
import '@/style/icon.css'
// 导入flexible 根据设备尺寸改变html的fontsize大小
import 'amfe-flexible'

// 导入normalize.css 抹平差异
import 'normalize.css'

// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入navBar组件
import navBar from '@/components/navBar.vue'
// 导入cell组件
import cell from '@/components/cell.vue'
// 导入face组件
import face from '@/components/face.vue'
Vue.use(Vant)
// 全局注册
// 注册头部导航栏
Vue.component(navBar.name, navBar)
// 注册cell单元格
Vue.component(cell.name, cell)
// 注册face组件
Vue.component(face.name, face)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
