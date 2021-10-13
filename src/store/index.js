import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatId: sessionStorage.getItem('chatId'),
    userId: localStorage.getItem('userId'),
  },
  getters: {
    chatId: state => state.chatId,
    userId: state => state.userId,
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
  },
  actions: {
  },
  modules: {
  }
})
