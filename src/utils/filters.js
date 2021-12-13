import moment from 'moment'
const avatar = require('@/assets/svg/avatar_default.svg')
const $textEmpty = function(text,unit = '-') {
    return text ? text : unit
}

const $time = function(dataStr, pattern = 'YYYY-MM-DD') {
    return dataStr ? moment(dataStr).format(pattern) : ''
}

const $setAvatar = function(val) {
    return val ? val : avatar
}

const $gender = function(val) {
    let obj = {
        1: '男',
        2: '女'
    }
    return obj ? obj[val] : '未知'
}

const $customerType = function(val) {
    let obj = {
        1: '微信用户',
        2: '企微用户'
    }
    return obj ? obj[val] : '未知'
}

export default {
    $textEmpty,
    $time,
    $setAvatar,
    $gender,
    $customerType,
}