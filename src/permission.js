import router from './router'
import store from '@/store'
import { phoneModel, isWeChat, getAuthInfo, wxAgent } from '@/utils/function.js'
var contactsList = ['/customerPortrait', '/talkTool/verbalTrick'] //需获取外部联系人id页面路由
var groupList = ['/customerPortrait', '/talkTool/verbalTrick'] //需获取群id页面路由
var useList = [
        '/notice',
        '/notice/daily',
        '/notice/applyHelp',
        '/home',
        '/Interactive',
        '/customerPortrait',
        '/customerManage/customDetail',
        '/informationDetail',
        '/talkTool/verbalTrick',
        '/talkTool/contentMaterial',
    ] //目前可使用页面路由
var pcList = [
        '/notice',
        '/notice/daily',
        '/notice/applyHelp',
        '/Interactive',
        '/customerPortrait',
        '/informationDetail',
        '/talkTool/verbalTrick',
        '/talkTool/contentMaterial',
    ] //禁止跳转pc

router.beforeEach(async(to, from, next) => {
    let system = phoneModel()
    let type = [],
        token =
        system == 'ios' ? store.getters.token : sessionStorage.getItem('token')
    store.commit('setSystem', system)
    if (groupList.indexOf(to.path) > -1) {
        type.push('group')
    }
    if (contactsList.indexOf(to.path) > -1) {
        type.push('contacts')
    }
    if (process.env.NODE_ENV === 'production') {
        // console.log('href', window.location.href, to)
        // console.log('is wx', isWeChat())
        // console.log('is sys', phoneModel())

        console.log('form', from, to)
        console.log('token is', isTokenValid(), token)
        if (from.path === '/' && useList.indexOf(to.path) > -1 && !to.query.code) {
            console.log('right close', token)
                // setTimeout(() => {
                //     wx.closeWindow()
                // },100)
        }
    }
    if (useList.indexOf(to.path) > -1) {
        if (token && isTokenValid()) {
            console.log('token true')
            if (process.env.NODE_ENV === 'development') {
                next()
            } else {
                if (from.path == '/') {
                    if (to.query.comeFrom == 'messageCard') {
                        console.log('card')
                        next()
                    } else {
                        let verbalTrickStr = localStorage.getItem('verbalTrick'),
                            customerPortraitStr = localStorage.getItem('customerPortrait')
                        console.log('no card', verbalTrickStr, customerPortraitStr)
                        if (
                            groupList.indexOf(to.path) > -1 &&
                            ((verbalTrickStr &&
                                    verbalTrickStr.length > 5 &&
                                    verbalTrickStr == to.query.code) ||
                                (customerPortraitStr &&
                                    customerPortraitStr.length > 5 &&
                                    customerPortraitStr == to.query.code))
                        ) {
                            console.log('is auth code y')
                            next()
                        } else {
                            getAuthInfo().then((res) => {
                                if (res.result) {
                                    if (type.length > 0) {
                                        wxAgent(res, type).then((r) => {
                                            if (r) {
                                                console.log('next', store.getters)
                                                next()
                                            }
                                        })
                                    } else {
                                        next()
                                    }
                                } else {
                                    console.log('getAuthInfo error')
                                    next()
                                }
                            })
                        }
                    }
                } else {
                    console.log('oh h')
                    next()
                }
            }
        } else {
            //授权获取token
            console.log('to get token')
            if (process.env.NODE_ENV === 'development') {
                next()
            } else {
                getAuthInfo().then((res) => {
                    // console.log('success',res)
                    if (res.result) {
                        if (
                            phoneModel() === 'ios' ||
                            phoneModel() === 'android' ||
                            pcList.indexOf(to.path) > -1
                        ) {
                            if (type.length > 0) {
                                // console.log('wx is',res,type)
                                if (to.query.comeFrom == 'messageCard') {
                                    console.log('card')
                                    next()
                                } else {
                                    wxAgent(res, type).then((r) => {
                                        if (r) {
                                            console.log('next', store.getters)
                                            next()
                                        }
                                    })
                                }
                            } else {
                                console.log('type is null')
                                next()
                            }
                        } else {
                            console.log(location.hostname, 'location.hostname ======')
                            let token = store.getters.token
                                // window.location.href = `http://test-console.jzcrm.com/#/readme/main?token=${token}`
                            if (location.hostname == 'localhost') {
                                window.location.href = `http://test-console.jzcrm.com/#/readme/main?token=${token}`
                            } else if (location.hostname == 'test-h5.jzcrm.com') {
                                window.location.href = `http://test-console.jzcrm.com/#/readme/main?token=${token}`
                            } else {
                                window.location.href = `http://console.jzcrm.com/#/readme/main?token=${token}`
                            }
                        }
                    }
                })
            }
        }
    } else {
        console.log('no user list', to.path)
        next()
    }
})

router.afterEach(async(to, from, next) => {
    if (process.env.NODE_ENV) {
        console.log('to:', to.path, 'from:', from.path)
    }
    // finish progress bar
})

function isTokenValid() {
    //获取token是否可用
    let state = true,
        expireTime = store.getters.expireTime
    let overdueTime = new Date(expireTime).getTime() - new Date().getTime()
    let minutes = Math.floor(overdueTime / (60 * 1000)) //计算相差分钟数
    if (process.env.NODE_ENV === 'production' && minutes <= 5) {
        state = false
    } else {
        state = true
    }
    return state
}