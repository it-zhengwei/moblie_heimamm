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
// 导入自己封装的插件
import Obj from '@/components/index.js'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入自己封装的组件
import Login from '@/plugin/index.js'
Vue.use(Vant)
// 全局注册
Vue.use(Obj)
Vue.use(Login)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
