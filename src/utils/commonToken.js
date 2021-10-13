import Network from './request'
import router from '../router/index'
import store from '../store'
import {
    setStoreValue,
    getStoreValue,
    removeStoreValue,
} from '../utils/LocalStorageDate'

const getWxAppid = function() {
        let authCode
        if (window.location.href.indexOf('?') > -1) {
            let href = window.location.href.split('?')[1]
            let p = href.split('&')[0]
            authCode = p.split('=')[1]
        } else {
            // alert('ppppppp')
            authCode = ''
        }
        // alert(authCode)
        if (!authCode) {
            // alert('-----authCode-----')
            Network.get('/user-service/m/user/getappid', {
                redirect_uri: window.location.pathname,
            }).then((res) => {
                // alert(JSON.stringify(res))
                let params = {
                    appid: res.data.suiteid,
                    redirect_url: encodeURIComponent('https://' + res.data.redirect_uri),
                }
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${params.appid}&redirect_uri=${params.redirect_url}&response_type=code&state=state&scope=snsapi_base#wechat_redirect`
            })
        } else {
            // alert('----getWxCofig----前')
            getWxCofig(authCode)
        }
    }
    // else {
    //     alert('----getTicket----前')
    //     getTicket()
    // }
    // }

function getWxCofig(v) {
    // alert('getWxCofig---后---')
    Network.get('/user-service/m/user/getloguser', {
        code: v,
        url: location.href,
    }).then((res) => {
        // alert(JSON.stringify(res))
        if (res.result) {
            // this.token = res.data.accessToken
            // this.appid = res.data.corpId
            // localStorage.setItem('token', res.data.accessToken)
            setStoreValue(
                'token',
                res.data.accessToken,
                res.data.expire_time,
                res.data.userNo
            )
            getAgent(res)
        } else {
            if (
                res.code == 'error_busy' ||
                res.code == 'error_code' ||
                res.code == 'error_forbid' ||
                res.code == 'error_corp_forbid'
            ) {
                this.$message({
                    type: 'error',
                    message: '系统繁忙,请稍后重试' || res.msg,
                })
            } else {
                router.push('/404')
                localStorage.removeItem('token')
            }
        }
    })
}

function getTicket() {
    // alert('getTicket-后----')
    // alert(location.href)
    Network.get('/user-service/m/user/getticket', {
        url: location.href,
    }).then((res) => {
        // alert(JSON.stringify(res))
        getAgent(res)
    })
}

function getAgent(res) {
    // alert(JSON.stringify(res))
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
        // var that = this
    wx.ready(function() {
        wx.invoke(
            'agentConfig', {
                corpid: res.data.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                agentid: res.data.agent_id + '', // 必填，企业微信的应用id （e.g. 1000247）
                timestamp: res.data.agent_config_data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.agent_config_data.noncestr, // 必填，生成签名的随机串
                signature: res.data.agent_config_data.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                jsApiList: [
                    'getCurExternalContact',
                    'getContext',
                    'invoke',
                    'getCurExternalChat',
                ], //必填，传入需要使用的接口名称飞)
            },
            function() {
                //获取外部联系人ID
                wx.invoke('getCurExternalContact', {}, function(res) {
                        // alert(JSON.stringify(res))
                        if (res.err_msg == 'getCurExternalContact:ok') {
                            // that.userId = res.userId //返回当前外部联系人userId
                            // alert(JSON.stringify(res))
                            // alert(JSON.stringify(res.userId))
                            // localStorage.setItem('userId', res.userId)
                            store.commit('setUserId',res.chatId)
                                // this.$store.commit('userId', res.userId)
                                // alert(JSON.stringify(that.obj))
                                // that.getMethod()
                        } else {
                            //错误处理
                        }
                    })
                    //获取当前客户群ID
                wx.invoke('getCurExternalChat', {}, function(res) {
                        // alert(("群id"+ res.chatId))
                        if (res.err_msg == 'getCurExternalChat:ok') {
                            // chatId = res.chatId //返回当前客户群的群聊ID

                            // localStorage.setItem('chatId', res.chatId)
                            // sessionStorage.setItem('chatId', res.chatId)
                            store.commit('setChatId',res.chatId)
                        } else {
                            //错误处理
                        }
                    })
                    //判断入口
                wx.invoke('getContext', {}, function(res) {
                    // alert(JSON.stringify(res))
                    // alert(JSON.stringify(res.entry))
                    if (res.err_msg == 'getContext:ok') {} else {
                        //错误处理
                    }
                })
            }
        )
    })
}
export default {
    getWxAppid,
}