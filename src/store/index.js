import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatId: sessionStorage.getItem('chatId'),
    userId: localStorage.getItem('userId'),
    entry: '',  //进入H5页面的入口环境
  },
  getters: {
    chatId: state => state.chatId,
    userId: state => state.userId,
    entry: state => state.entry,
  },
  mutations: {
    setChatId(state, data) {
      sessionStorage.setItem('chatId', data)
      state.chatId = data
    },
    setUserId(state, val) {
      localStorage.setItem('userId', data)
      state.userId = val
    },
    setEntry(state, val) {
      localStorage.setItem('entry', data)
      state.entry = val
    },
  },
  actions: {
  },
  modules: {
  }
})
