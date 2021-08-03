import router from '../router/index'
import axios from 'axios'
let BASE_URL = 'http://172.10.7.114:8099'
let instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
})

// 请求
// instance.interceptors.request.use(
//         (config) => {
//             // console.log('--------', config)
//             // 如果有token 就携带tokon
//             const token = window.localStorage.getItem('token')
//             console.log('------token----', token)
//             if (token) {
//                 config.headers.common.token = token
//             }
//             // console.log('-----config----', config)
//             return config
//         },
//         (error) => Promise.reject(error)
//     )
//     //响应
// instance.interceptors.response.use(
//     // 响应包含以下信息data,status,statusText,headers,config
//     // (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
//     (res) => {
//         // console.log('---resUse------', res)
//         if (res.status === 200) {
//             return Promise.resolve(res)
//         } else {
//             return Promise.reject(res)
//         }
//     },

//     (err) => {
//         // console.log(11111111)
//         const { response } = err
//         // console.log('--------', response)
//         if (response) {
//             errorHandle(response.status, response.data)
//             return Promise.reject(response)
//         } else {
//             console.log('请求失败')
//         }
//     }
// )
const errorHandle = (status, other) => {
    // console.log(other)
    switch (status) {
        case 400:
            console.log('信息校验失败')
            break
        case 401:
            // console.log('---1111-----', router)
            router.replace({
                path: '/login',
            })
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
                if (data.result) {
                    return Promise.resolve(data)
                } else {
                    return Promise.reject(data.msg)
                }
            })
            .catch((err) => {
                return Promise.reject(err.error)
            })
    }
})
export default http