import Vue from 'vue'
import Vuex from 'vuex'
import cityList from '@/utils/cityList.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    userInfo: '',
    cityList: cityList
  },
  mutations: {
    // 修改用户信息
    SETUSERINFO (state, data) {
      state.userInfo = data
    },
    // 修改登录状态
    SETLOGINSTATUS (state, data) {
      state.islogin = data
    },
    // 修改部分用户数据
    SETONEUSERINFO (state, { name, value }) {
      state.userInfo[name] = value
    }
  },
  getters: {
    // 计算性别
    GETGENDER (state) {
      const arr = ['未知', '男', '女']
      return arr[state.userInfo.gender]
    },
    // 计算城市
    getCity (state) {
      return cityList.city_list[state.userInfo.area]
    }
  },
  actions: {},
  modules: {}
})
