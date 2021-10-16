import { Getticket, GetSignature } from "../config/api"
import { Message } from 'element-ui'

// 防抖
export function _debounce(fn, delay) {
    var delay = delay || 200
    var timer
    return function() {
        var th = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            timer = null
            fn.apply(th, args)
        }, delay)
    }
}
// 节流
export function _throttle(fn, interval) {
    var last
    var timer
    var interval = interval || 5000
    return function() {
        var th = this
        var args = arguments
        var now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                last = now
                fn.apply(th, args)
            }, interval)
        } else {
            last = now
            fn.apply(th, args)
        }
    }
}
//深复制
export function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                objClone[key] = deepClone(obj[key])
            } else {
                objClone[key] = obj[key]
            }
        }
    }
    return objClone
}

// 时间转换
export function formatDate(dateTime, fmt) {
    let date = new Date(dateTime)
        // console.log(date, fmt)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            )
        }
    }
    // console.log('-----fmt---', fmt)
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger'
}

// 微信弹窗授权
export function getCode(wxurl) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50f34e90927ce260&redirect_uri=${wxurl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

// 获取链接问号后面参数对象
export function parseQueryString(url) {
    let reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
        arr_url = reg_url.exec(url),
        ret = {};
    if (arr_url && arr_url[1]) {
        let str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}

// 文件大小单位转换
export function byteConvert(bytes){ 
    if(isNaN(bytes)) {
        return
    }
    let symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    let exp = Math.floor(Math.log(bytes)/Math.log(2)) // 获取以2为底的bytes的对数（向下取整）

    if (exp < 1) {
        exp = 0
    }
    let i = Math.floor(exp/10)

    bytes = bytes/Math.pow(2, 10*i)

    // 取两位小数
    if(bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2)
    }

    return bytes + '' + symbols[i]
}

// 分享消息到当前会话
export function sendChatMessage(msgtype, enterChat, content, imageId, videoId, fileId) {
    Getticket({url: location.href}).then(res => {
        wx.config({
            beta: true,
            debug: false,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [ "sendChatMessage", "invoke", "agentConfig", "checkJsApi" ],
        })
        wx.ready(function() {
            wx.invoke( "agentConfig", {
                    corpid: res.data.corpId,
                    agentid: res.data.agent_id + "",
                    timestamp: res.data.agent_config_data.timestamp,
                    nonceStr: res.data.agent_config_data.noncestr,
                    signature: res.data.agent_config_data.signature,
                    jsApiList: ["sendChatMessage", "getContext", "invoke"],
                },
                function(res) {
                    wx.invoke( "sendChatMessage", {
                            msgtype, //消息类型，必填
                            enterChat, //为true时表示发送完成之后顺便进入会话，仅移动端3.1.10及以上版本支持该字段
                            text: {
                                content, //文本内容
                            },
                            image: {
                                mediaid: imageId, //图片的素材id
                            },
                            video: {
                                mediaid: videoId, //视频的素材id
                            },
                            file: {
                               mediaid: fileId, //文件的素材id
                            },
                        }, function (res) {
                            if (res.err_msg == "sendChatMessage:ok") {
                                //发送成功
                                Message.success("发送成功")
                            }
                        }
                    )
                }
            )
        })
    })
}

export async function wxShare(title, link, imgUrl, desc) {
    let { appId, timestamp, nonceStr, signature } = await getSignature()

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
    })
    wx.ready(function(){
        wx.updateAppMessageShareData({ 
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {}
        })
        wx.updateTimelineShareData({ 
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {}
          })
    })
}

async function getSignature() {
    let {code, data} = await GetSignature(encodeURIComponent(window.location.href))
    if (code == 'success') {
        return data
    }
}