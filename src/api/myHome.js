import request from '@/utils/requestNew'
const CustomerService = '/customer-service'
const MaterialService = '/material-service'
    // 首页
export function getMyInfo() {
    return request({
        url: CustomerService + '/my',
        method: 'get',
    })
}
// 待处理 朋友圈
export function friendSend(data) {
    return request({
        url: MaterialService + '/friendCircle/getFriendSend',
        method: 'get',
        params: data,
    })
}
export function groupSend(data) {
    return request({
        url: CustomerService + '/cluecustomerMass/getCustomerMassSend',
        method: 'get',
        params: data,
    })
}
// @我

export function getAbutMe(data) {
    return request({
        url: CustomerService + '/my/toMyMsg',
        method: 'get',
        params: data,
    })
}