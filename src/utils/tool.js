import { Getticket, GetSignature } from '../config/api'
import { Toast } from 'vant'

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
    if (typeof dateTime == 'string') {
        dateTime = dateTime.replace(/-/g, '/')
    }
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
        ret = {}
    if (arr_url && arr_url[1]) {
        let str_para = arr_url[1],
            result
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2]
        }
    }
    return ret
}

// 文件大小单位转换
export function byteConvert(bytes) {
    if (isNaN(bytes)) {
        return
    }
    let symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    let exp = Math.floor(Math.log(bytes) / Math.log(2)) // 获取以2为底的bytes的对数（向下取整）

    if (exp < 1) {
        exp = 0
    }
    let i = Math.floor(exp / 10)

    bytes = bytes / Math.pow(2, 10 * i)

    // 取两位小数
    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2)
    }

    return bytes + '' + symbols[i]
}

export function handleMoney(num) {
    let AmountUnitlist = ['元', '万元', '亿', '兆', '京', '垓', '杼']
        // 将数字金额转为字符串
    let strnum = num.toString()
        // 声明一个变量用于接收金额单位
    let AmountUnit = ''
        // 循环遍历单位数组
    AmountUnitlist.find((item, index) => {
        let newNum = ''
            // 判断一下传进来的金额是否包含小数点
        if (strnum.indexOf('.') !== -1) {
            // 若有则将小数点前的字符截取出来
            newNum = strnum.substring(0, strnum.indexOf('.'))
        } else {
            // 没有则直接等于原金额
            newNum = strnum
        }
        // 判断一下经过小数点截取后的金额字符长度是否小于5
        if (newNum.length < 5) {
            // 若小于5则接收当前单位，并跳出迭代
            AmountUnit = item

            return true
        } else {
            // 若不小于5则将经过小数点截取处理过后的字符除以10000后作为下一轮迭代的初始金额重新判断(每一个单位之间相距4位数，故除以10000)
            strnum = ((newNum * 1) / 10000).toString()
        }
    })

    return (strnum * 1).toFixed(2) + AmountUnit
}

// 分享消息到当前会话
export function sendChatMessage(
    msgtype,
    enterChat,
    content,
    imageId,
) {
    Getticket({ url: location.href }).then((res) => {
        Toast.loading({
            message: '发送中...',
            forbidClick: true,
            duration: 0,
            loadingType: 'spinner',
        })
        wx.config({
            beta: true,
            debug: false,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: ['sendChatMessage', 'invoke', 'agentConfig', 'checkJsApi'],
        })
        wx.ready(function() {
            wx.invoke(
                'agentConfig', {
                    corpid: res.data.corpId,
                    agentid: res.data.agent_id + '',
                    timestamp: res.data.agent_config_data.timestamp,
                    nonceStr: res.data.agent_config_data.noncestr,
                    signature: res.data.agent_config_data.signature,
                    jsApiList: ['sendChatMessage', 'getContext', 'invoke'],
                },
                function(res) {
                    let typeData = null
                    if (content) {
                        let { link, title, desc, imgUrl } = content

                        typeData = {
                            msgtype, //消息类型，必填
                            enterChat, //为true时表示发送完成之后顺便进入会话，仅移动端3.1.10及以上版本支持该字段
                            news: {
                                link, //H5消息页面url 必填
                                title, //H5消息标题
                                desc, //H5消息摘要
                                imgUrl, //H5消息封面图片URL
                            },
                        }
                    } else if (imageId) {
                        typeData = {
                            msgtype, //消息类型，必填
                            enterChat, //为true时表示发送完成之后顺便进入会话，仅移动端3.1.10及以上版本支持该字段
                            image: {
                                mediaid: imageId, //图片的素材id
                            },
                        }
                    }
                    wx.invoke('sendChatMessage', typeData, function(res) {
                        Toast.clear()
                        if (res.err_msg == 'sendChatMessage:ok') {
                            //发送成功
                            Toast('发送成功')
                        }
                    })
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
        signature: signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
    })
    wx.ready(function() {
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function() {},
        })
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function() {},
        })
    })
}

export async function wxPreviewImage(url, urlList) {
    let { appId, timestamp, nonceStr, signature } = await getSignature()

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: ['previewImage'], // 必填，需要使用的JS接口列表
    })
    wx.ready(function() {
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: urlList ? urlList : [url], // 需要预览的图片http链接列表
        })
    })
}

async function getSignature() {
    let { code, data } = await GetSignature(
        encodeURIComponent(window.location.href)
    )
    if (code == 'success') {
        return data
    }
}

export function IsURL (str_url) { 
    let strRegex = '^((https|http|ftp|rtsp|mms)?://)' 
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
    + '|' // 允许IP和DOMAIN（域名） 
    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
    + '[a-z]{2,6})' // first level domain- .com or .museum 
    + '(:[0-9]{1,4})?' // 端口- :80 
    + '((/?)|' // a slash isn't required if there is no file name 
    + '(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$'

    let re = new RegExp(strRegex)
    
    return re.test(str_url)
}

export function getFileType(name) {
    if (/\.ppt$|\.pptx$/i.test(name)) {
        return 1
    }
    if (/\.doc$|\.docx$/i.test(name)) {
        return 2
    }
    if (/\.xls$|\.xlsx$/i.test(name)) {
        return 3
    }
    if (/\.pdf$/i.test(name)) {
        return 4
    }

    return 0
}

export function getFileDefaultCover(name) {
    let pptUrl = 'https://test-h5.jzcrm.com/static/img/default_ppt.png', wordUrl = 'https://test-h5.jzcrm.com/static/img/default_word.png', excelUrl = 'https://test-h5.jzcrm.com/static/img/default_excel.png', pdfUrl = 'https://test-h5.jzcrm.com/static/img/default_pdf2.png', fileUrl = 'https://test-h5.jzcrm.com/static/img/default_file.png'

    return getFileType(name) == 1 ? pptUrl : getFileType(name) == 2 ? wordUrl : getFileType(name) == 3 ? excelUrl : getFileType(name) == 4 ? pdfUrl : fileUrl
}