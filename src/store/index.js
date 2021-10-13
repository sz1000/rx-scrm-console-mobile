import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatId: sessionStorage.getItem('chatId'),
    userId: '',
  },
  getters: {
    chatId: state => state.chatId,
  },
  mutations: {
    setChatId(state, data) {
      sessionStorage.setItem('chatId', data)
      state.chatId = data
    },
    userId(state, val) {
      state.userId = val
    },
  },
  actions: {
  },
  modules: {
  }
})
