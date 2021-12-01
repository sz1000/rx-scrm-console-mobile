import moment from 'moment'
const $textEmpty = function(text) {
    return text ? text : '-'
}

const $time = function(dataStr, pattern = 'YYYY-MM-DD') {
    return dataStr ? moment(dataStr).format(pattern) : ''
}

export default {
    $textEmpty,
    $time
}