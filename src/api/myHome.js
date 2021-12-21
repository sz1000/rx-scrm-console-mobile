import request from '@/utils/requestNew'
const CustomerService = '/customer-service'
const MaterialService = '/material-service'
const CommonService = '/common-service'
    // 首页
export function getMyInfo() {
    return request({
        url: CustomerService + '/my',
        method: 'get',
    })
}
// 图表
export function getAllCharts() {
    return request({
        url: CustomerService + '/my/getAllCharts',
        method: 'get',
        headers: {
            noLoading: true,
        },
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

// 客户寻回、激活
export function ActiveCustomer(data) {
    return request({
        url: CustomerService + '/my/activate',
        method: 'get',
        params: data,
    })
}
export function ReplayCustomer(data) {
    return request({
        url: CustomerService + '/my/regression',
        method: 'get',
        params: data,
    })
}
// 一键激活
export function keyToActivate(data) {
    return request({
        url: CustomerService + '/my/toactivate',
        method: 'post',
        data: data,
    })
}
// 一件巡回
export function keyToFind(data) {
    return request({
        url: CustomerService + '/my/tofind',
        method: 'post',
        data: data,
    })
}
// 客户动态
export function getMBTop10FollowMsgList(data) {
    return request({
        url: CustomerService + '/my/getMBTop10FollowMsgList',
        method: 'get',
        params: data,
    })
}
//客户动态 全部
export function queryFollowMsgPage(data) {
    return request({
        url: CustomerService + '/my/queryFollowMsgPage',
        method: 'post',
        data: data,
    })
}
// 获取mediaid
export function uploadTemporaryMaterial(data) {
    return request({
        url: CommonService + '/RedisMaterial/uploadTemporaryMaterial',
        method: 'post',
        data: data,
    })
}
// 弹框内列表
export function friendCircleUserList(data) {
    return request({
        url: MaterialService + '/friendCircle/friendCircleUserList',
        method: 'get',
        params: data,
    })
}