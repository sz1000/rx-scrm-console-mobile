import request from '@/utils/requestNew'
let BASE_CUSTOMER_SERVICE = 'customer-service'
export function cluecustomer_getClueCustomerByid(id) { //客户详情
    return request({
        url: BASE_CUSTOMER_SERVICE + '/m/cluecustomer/getClueCustomerByid?id=' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_selectFollowMsgList(data) { // 当前客户跟进信息
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/selectFollowMsgList',
        method: 'get',
        params: data
    })
}
export function group_getMobileCustomerGroupPage(data) { // 获取客户群列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getMobileCustomerGroupPage',
        method: 'get',
        params: data
    })
}
export function group_getMobileGroupUserlist(id) { // 获取群群员列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getMobileGroupUserlist?chatId=' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_addCommentInfo(data) { // 添加评论回复
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/addCommentInfo',
        method: 'post',
        data
    })
}