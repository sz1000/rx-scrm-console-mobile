import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
import Vue from 'vue'
import VConsole from 'vconsole'
const stateUselessList = [
    'error_token_null',
    'error_token_expired',
    'error_token_empty',
]

let BASE_URL = ''
    // console.log(location.hostname)
if (location.hostname == 'localhost') {
    // BASE_URL = 'http://172.10.7.114:8099/' //袁
    // BASE_URL = 'http://172.10.7.200:8099/' //刘
    // BASE_URL = 'http://172.10.7.170:8099/' //稳
    // BASE_URL = 'http://172.10.6.177:8099' //葛
        // BASE_URL = 'http://172.10.6.144:8099' // 李泉
        BASE_URL = 'https://test-api.jzcrm.com' //测试
        // BASE_URL = 'https://dev-api.jzcrm.com' //开发
} else if (location.hostname == 'dev-h5.jzcrm.com') {
    BASE_URL = 'https://dev-api.jzcrm.com' //开发
    addVconsole()
} else if (location.hostname == 'test-h5.jzcrm.com') {
    BASE_URL = 'https://test-api.jzcrm.com' //测试
    addVconsole()
} else {
    BASE_URL = 'https://api.jzcrm.com' //生产
}

function addVconsole() {
    const vConsole = new VConsole()
    Vue.use(vConsole)
}

let IndicatorHaveLoadCount = 0
let loadingService = {
    // message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
}
let loadingIndicator = ''

// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
const service = axios.create({
    baseURL: BASE_URL,
    //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    //withCredentials: true, // send cookies when cross-domain requests
    //timeout: 30000, // request timeout
})
service.interceptors.request.use(
    (config) => {
        var token = localStorage.getItem('token')
        if (token) {
            config.headers.common.token = token
        }
        IndicatorHaveLoadCount += 1
        if (!config.headers['noLoading']) {
            loadingIndicator = Toast.loading(loadingService)
            delete config.headers['noLoading']
        } else {
            delete config.headers['noLoading']
        }
        return config
    },
    (error) => {
        // Indicator.close();
        if (loadingIndicator) {
            loadingIndicator.clear()
        }
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response) => {
        let noMessage = response.config.headers.noMessage || false
        IndicatorHaveLoadCount -= 1
        if (IndicatorHaveLoadCount < 1) {
            IndicatorHaveLoadCount = 0
            if (loadingIndicator) {
                loadingIndicator.clear()
            }
        }
        const res = response.data
        if (!noMessage && res.code != 'success') {
            if (stateUselessList.indexOf(res.code) > -1) {
                // Toast('请重新登录')
                console.log('token无效', process.env.NODE_ENV)
                if (process.env.NODE_ENV === 'production') {
                    store.dispatch('signOut').then(() => {
                        console.log('signOut', window.location.pathname)
                        router.replace(window.location.pathname)
                    })
                }
            } else {
                // Toast(res.msg)
            }
        }
        return res
    },
    (error) => {
        IndicatorHaveLoadCount -= 1
        if (IndicatorHaveLoadCount < 1) {
            IndicatorHaveLoadCount = 0
            if (loadingIndicator) {
                loadingIndicator.clear()
            }
        }
        if (error.response) {
            if (error.response.status == 401) {
                // Toast('请重新登录')
                // setTimeout(function() {
                //     window.location.reload()
                // }, 2000)
            } else if (error.response.status == 400) {
                // Toast('请输入正确的参数')
            } else {
                // Toast('请求出错，请重试')
            }
        } else {
            // Toast('请求出错，请重试')
        }
        return Promise.reject(error)
    }
)

export default service