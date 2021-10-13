import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatId: sessionStorage.getItem('chatId'),
  },
  getters: {
    chatId: state => state.chatId,
  },
  mutations: {
    setChatId(state, data) {
      sessionStorage.setItem('chatId', data)
      state.chatId = data
    },
  },
  actions: {
  },
  modules: {
  }
})
