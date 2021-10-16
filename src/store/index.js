import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatId: sessionStorage.getItem('chatId'),
    userId: sessionStorage.getItem('userId'),
    entry: sessionStorage.getItem('entry'),  //进入H5页面的入口环境
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
    setUserId(state, data) {
      sessionStorage.setItem('userId', data)
      state.userId = data
    },
    setEntry(state, data) {
      sessionStorage.setItem('entry', data)
      state.entry = data
    },
  },
  actions: {
  },
  modules: {
  }
})
