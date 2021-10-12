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

export function getCode(wxurl) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50f34e90927ce260&redirect_uri=${wxurl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

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