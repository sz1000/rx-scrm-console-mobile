import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { getStoreValue, setStoreValue } from '../utils/LocalStorageDate'
import Vue from 'vue'
import VConsole from 'vconsole'

let BASE_URL = ''
    // console.log(location.hostname)
if (location.hostname == 'localhost') {
    // BASE_URL = 'http://172.10.7.114:8099/' //袁
    // BASE_URL = 'http://172.10.7.200:8099/' //刘
    // BASE_URL = 'http://172.10.7.170:8099/'  //稳
    // BASE_URL = 'https://test-api.jzcrm.com' //测试
    // BASE_URL = 'https://dev-api.jzcrm.com' //开发
    BASE_URL = 'http://172.10.6.144:8099' // 李泉
    addVconsole()
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
service.interceptors.request.use(config => {
    // 如果有token 就携带tokon
    const token = getStoreValue('token') //生产token
        // const token = localStorage.getItem('token') //本地token
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
    return config;
}, error => {
    // Indicator.close();
    if (loadingIndicator) {
        loadingIndicator.clear()
    }
    Promise.reject(error);
})
service.interceptors.response.use(
    response => {
        let noMessage = response.config.headers.noMessage || false
        IndicatorHaveLoadCount -= 1
        if (IndicatorHaveLoadCount < 1) {
            IndicatorHaveLoadCount = 0
            if (loadingIndicator) {
                loadingIndicator.clear()
            }
        }
        const res = response.data
        if (!noMessage && res.code != "success") {
            if (res.code == 401) {
                // Toast('请重新登录')
                setTimeout(function() {
                    window.location.reload()
                }, 2000)
            } else {
                if (res.resultType != 0 || res.resultType != 1) {
                    // Toast(res.msg)
                    return false
                }
            }
        }
        return res;
    },
    error => {
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