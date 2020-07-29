import Vue from 'vue'
import Vuex from 'vuex'
import cityList from '@/utils/cityList.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    userInfo: ''
  },
  mutations: {
    // 修改用户信息
    SETUSERINFO (state, data) {
      state.userInfo = data
    },
    // 修改登录状态
    SETLOGINSTATUS (state, data) {
      state.islogin = true
    }
  },
  getters: {
    GETGENDER (state) {
      const arr = ['未知', '男', '女']
      return arr[state.userInfo.gender]
    },
    GETCITY (state) {
      return cityList.city_list[state.userInfo.area]
    }
  },
  actions: {},
  modules: {}
})
