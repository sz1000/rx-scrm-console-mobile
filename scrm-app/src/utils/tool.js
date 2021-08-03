/**
 * 函数防抖
 */
export function debounce(func, delay, immediate = false) {
    let timer,
        context = this
    return (...args) => {
        if (immediate) {
            func.apply(context, args)
            immediate = false
            return
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(context, args)
        }, delay)
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