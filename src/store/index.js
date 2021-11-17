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
        expireTime: process.env.NODE_ENV === 'development' ? '' : localStorage.getItem('expireTime'),
        userNo: localStorage.getItem('userNo'),
        wxLogoInfo: JSON.parse(localStorage.getItem('wxLogoInfo')),
    },
    getters: {
        chatId: state => state.chatId,
        userId: state => state.userId,
        entry: state => state.entry,
        corpId: state => state.corpId,
        token: state => state.token,
        userNo: state => state.userNo,
        expireTime: state => state.expireTime,
        wxLogoInfo: state => state.wxLogoInfo,
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
        setUserNo(state, data) {
            localStorage.setItem('userNo', data)
            state.userNo = data
        },
        setExpireTime(state, data){
            localStorage.setItem('expireTime', data)
            state.expireTime = data
        },
        setToken(state, data) {
            localStorage.setItem('token', data)
            state.token = data
        },
        setWxLogoInfo(state, data) {
            localStorage.setItem('wxLogoInfo', JSON.stringify(data))
            state.wxLogoInfo = data
        },
        SET_CORPID(state, val) {
            localStorage.setItem('corpId', val)
            state.corpId = val
        },
    },
    actions: {
        signOut({ commit }, payload) {
            return new Promise((res, rej) => {
                commit('setUserId', '')
                commit('setChatId', '')
                commit('setToken', '')
                commit('setUserNo', '')
                commit('setExpireTime', '')
                localStorage.removeItem('userId')
                res(true)
            })
        },
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