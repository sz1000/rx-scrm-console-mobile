import store from '@/store'
import { user_getappid,user_getloguser } from '@/api/base'
import { parseQueryString } from '@/utils/tool'
/**
 * 判断是安卓还是iOS
 */
export const phoneModel = () => { 
    const u = navigator.userAgent 
    const app = navigator.appVersion 
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
         
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
          if (isAndroid) return 'android' 
    if (isiOS) return 'ios'
}

/**
 * 判断是否是微信浏览器
 */
export const isWeChat = () => {  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
     
    const ua = navigator.userAgent  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
         
    return !!ua.match(/MicroMessenger/i)
}

/**
 * wx授权获取token等信息
 */
export const getAuthInfo = () => {
    return new Promise((resolve, reject) => {
        let queryObj = parseQueryString(location)
        let qywxUrl = encodeURIComponent(window.location.href)
        let authCode = queryObj.code
        if(authCode){
            let _data = {
                code: authCode,
                url: location.href
            }
            user_getloguser(_data).then(res => {
                if(res.result){
                    store.commit('setToken', res.data.accessToken)
                    store.commit('setExpireTime', res.data.expire_time)
                    store.commit('setUserNo', res.data.user_no)
                    store.commit('SET_CORPID', res.data.corpId)
                    store.commit('setWxLogoInfo', res)
                    resolve(res)
                }else{
                    reject(false)
                }
            })
        }else{
            let url = window.location.pathname
            user_getappid(url).then(res => {
                if(res.result){
                    let appid = res.data.suiteid
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${qywxUrl}&response_type=code&state=state&scope=snsapi_base#wechat_redirect`
                }
            })
        }
    }).catch(error => {
        console.log('error', error)
    })
}

/**
 * 获取微信授权部分信息：
 * 1.获取外部联系人ID
 * 2.获取当前客户群ID
 * 3.获取进入H5页面的入口环境
 * @param {Object} res 
 * @param {Array} type 
 */
export const wxAgent = (res,type) => {
    return new Promise((resolve,reject) => {
        wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.corpId, // 必填，企业微信的corpID
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: [
                'getCurExternalContact',
                'invoke',
                'agentConfig',
                'checkJsApi',
                'getCurExternalChat',
            ], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function() {
            let jsApiList = ['invoke','getContext']
            if(type.indexOf('contacts') > -1){     //获取外部联系人ID
                jsApiList.push('getCurExternalContact')
            }
            if(type.indexOf('group') > -1){      //获取当前客户群ID
                jsApiList.push('getCurExternalChat')
            }
            wx.invoke(
                'agentConfig', {
                    corpid: res.data.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                    agentid: res.data.agent_id + '', // 必填，企业微信的应用id （e.g. 1000247）
                    timestamp: res.data.agent_config_data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.agent_config_data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.agent_config_data.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                    jsApiList: jsApiList, //必填，传入需要使用的接口名称
                },
                function(res) {
                    console.log('asd agentConfig',res)
                    //判断入口
                    wx.invoke('getContext', {}, function(res) {
                        if (res.err_msg == 'getContext:ok') {
                            let entry = res.entry //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools、chat_attachment
                            store.commit('setEntry', entry)
                        } else {
                            //错误处理
                            console.log('getContext>>>err>>>', res)
                        }
                    })
                    if(jsApiList.indexOf('getCurExternalContact') > -1){
                        //获取外部联系人ID
                        wx.invoke('getCurExternalContact', {}, function(res) {
                            if (res.err_msg == 'getCurExternalContact:ok') {
                                localStorage.setItem('userId', res.userId)
                                store.commit('setUserId', res.userId)
                                resolve(true)
                            } else {
                                //错误处理
                                console.log('getCurExternalContact>>>err>>>', res,jsApiList.length)
                                if(jsApiList.length == 3){
                                    reject()
                                }
                            }
                        })
                    }
                    if(jsApiList.indexOf('getCurExternalChat') > -1){
                        //获取当前客户群ID
                        wx.invoke('getCurExternalChat', {}, function(res) {
                            if (res.err_msg == 'getCurExternalChat:ok') {
                                store.commit('setChatId', res.chatId)
                                resolve(true)
                            } else {
                                //错误处理
                                console.log('getCurExternalChat>>>err>>>', res)
                                reject()
                            }
                        })
                    }
                }
            )
        })
    }).catch(error => {
        console.log('wxAuth error',error)
    })
}