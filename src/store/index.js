import Vue from 'vue'
import Vuex from 'vuex'
import { GetCrop } from "../config/api"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        chatId: sessionStorage.getItem('chatId'),
        userId: sessionStorage.getItem('userId'),
        entry: sessionStorage.getItem('entry'), //进入H5页面的入口环境
        corpId: localStorage.getItem('corpId'),
        token: localStorage.getItem('token'),
        copy: localStorage.getItem('copy'),
    },
    getters: {
        chatId: state => state.chatId,
        userId: state => state.userId,
        entry: state => state.entry,
        corpId: state => state.corpId,
        token: state => state.token,
        copy: state => state.copy,
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
        setCopy(state, data) {
            localStorage.setItem('copy', data)
            state.copy = data
        },
        SET_CORPID(state, val) {
            localStorage.setItem('corpId', val)
            state.corpId = val
        },
    },
    actions: {
        getCorpId({ commit }) {
            return new Promise((resolve, reject) => {
                GetCrop().then(res => {
                    const { code, data } = res

                    if (code === 'success' && data) {
                        commit('SET_CORPID', data.corpId)
                        resolve(data.corpId)
                    } else {
                        reject()
                    }
                }).catch(reject)
            })
        }
    },
    modules: {}
})