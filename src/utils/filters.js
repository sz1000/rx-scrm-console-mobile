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

export default {
    $textEmpty,
    $time,
    $setAvatar
}