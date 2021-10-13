import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: '',
    },
    mutations: {
        userId(state, val) {
            state.userId = val
        },
    },
    actions: {},
    modules: {},
})