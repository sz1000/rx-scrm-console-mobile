import router from './router'
import store from '@/store'
import { phoneModel, isWeChat, getAuthInfo, wxAgent } from '@/utils/function.js'
var contactsList = []                   //需获取外部联系人id页面路由
var groupList = ['/customerPortrait']   //需获取群id页面路由 暂未启用
var useList = ['/notice','/notice/daily','/home','/customerPortrait']       //目前可使用页面路由

router.beforeEach(async(to, from, next) => {
    let type = '',token = store.getters.token || localStorage.getItem('token')
    if(groupList.indexOf(to.path) > -1){
        type = 'group'
    }else if(contactsList.indexOf(to.path) > -1){
        type = 'contacts'
    }
    if(process.env.NODE_ENV === 'production'){
        console.log('href', window.location.href, to)
        console.log('is wx', isWeChat())
        console.log('is sys', phoneModel())
    
    
        console.log('token is', isTokenValid(),token)
    }
    if(useList.indexOf(to.path) > -1){
        if(token && isTokenValid() && !type){
            console.log('token true')
            next()
        }else {
            //授权获取token
            console.log('to get token')
            if(process.env.NODE_ENV === 'development'){
                next()
            }else{
                getAuthInfo().then(res => {
                    console.log('success',res)
                    if(res.result){
                        if(type){
                            console.log('wx is',res,type)
                            wxAgent(res,type).then(r => {
                                if(r){
                                    console.log('next')
                                    next()
                                }
                            })
                        }else{
                            console.log('type is null')
                            next()
                        }
                    }
                })
            }
        }
    }else{
        console.log('no user list')
        next()
    }
})

router.afterEach(async(to, from, next) => {
    // console.log('to',to)
    // finish progress bar
    // let url = ''
    // if (phoneModel() === 'ios') {
    //     url = window.entryUrl
    // } else {
    //     url = window.location.href
    // }
})

function isTokenValid() {   //获取token是否可用
    let state = true,expireTime = store.getters.expireTime
    let overdueTime = new Date(expireTime).getTime() - new Date().getTime()
    let minutes = Math.floor(overdueTime / (60 * 1000)) //计算相差分钟数
    if (process.env.NODE_ENV === 'production' && minutes <= 5){
        state = false
    }else{
        state = true
    }
    return state
}