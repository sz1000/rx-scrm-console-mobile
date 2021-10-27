import router from '../router/index'
import axios from 'axios'
import { getStoreValue, setStoreValue } from '../utils/LocalStorageDate'
import Vue from 'vue'
import VConsole from 'vconsole'

let BASE_URL = ''
    // console.log(location.hostname)
if (location.hostname == 'localhost') {
    // BASE_URL = 'http://172.10.7.114:8099/' //袁
    // BASE_URL = 'http://172.10.7.200:8099/' //刘
    // BASE_URL = 'https://dev-api.jzcrm.com' //开发
    // BASE_URL = 'https://api.jzcrm.com' //生产
    BASE_URL = 'https://test-api.jzcrm.com' //测试
        // BASE_URL = 'http://172.10.6.144:8099' // 李泉
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

let instance = axios.create({
        baseURL: BASE_URL,
        timeout: 30000,
    })
    // 请求
instance.interceptors.request.use(
        (config) => {
            // 如果有token 就携带tokon
            // const token = getStoreValue('token') //生产token
            const token = localStorage.getItem('token') //本地token
            if (token) {
                config.headers.common.token = token
            }
            return config
        },
        (error) => Promise.reject(error)
    )
    //响应
instance.interceptors.response.use(
    // 响应包含以下信息data,status,statusText,headers,config
    // (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    (res) => {
        // console.log('---resUse------', res)
        if (res.status === 200) {
            // alert('--------pathname-----', window.location.pathname)
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    },

    (err) => {
        const { response } = err
        // console.log('--------', response)
        if (response) {
            errorHandle(response.status, response.data)
            return Promise.reject(response)
        } else {
            console.log('请求失败')
        }
    }
)
const errorHandle = (status, other) => {
    // console.log(other)
    switch (status) {
        case 400:
            console.log('信息校验失败')
            break
        case 401:
            // console.log('---1111-----', router)
            console.log('认证失败')
            break
        case 403:
            console.log('token校验失败')
            break
        case 404:
            console.log('请求的资源不存在')
            break
        case 500:
            console.log('请求500错误')
            break
    }
}

const methods = ['post', 'get', 'delete']

let http = {}
methods.forEach((item) => {
    http[item] = function(url, params = {}, config = {}) {
        let innerInstance
        if (['get', 'delete'].includes(item)) {
            innerInstance = instance[item](url, { params: params, ...config })
        } else {
            innerInstance = instance[item](url, params, config)
        }
        return innerInstance
            .then((res) => {
                // console.log('---res1----', res)
                let data = res.data
                    // if (data) {
                    // alert(JSON.stringify(data))
                if (
                    data.code == 'error_token_expired' ||
                    data.code == 'error_token_null' ||
                    data.code == 'error_token_empty'
                ) {
                    // alert('request------')
                    window.localStorage.removeItem('token')
                    window.localStorage.removeItem('userId')
                    router.push(window.location.pathname)
                } else {
                    // console.log(axios)
                    // router.go(0)
                    return Promise.resolve(data)
                }
                // }
            })
            .catch((err) => {
                return Promise.reject(err.error)
            })
    }
})
export default http