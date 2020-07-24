import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入normalize.css 抹平差异
import 'normalize.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
