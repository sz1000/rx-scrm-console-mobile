import request from '@/utils/requestNew'
let BASE_USER_SERVICE = 'user-service'
let BASE_CUSTOMER_SERCICE = 'customer-service'
export function Corp_getCrop() { //获取企业信息
    return request({
        url: BASE_USER_SERVICE + '/Corp/getCrop',
        method: 'get'
    })
}
export function notice_getNoticeDetail(id) { //获取通知详情信息
    return request({
        url: BASE_USER_SERVICE + '/notice/getNoticeDetail/' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_getApplyFollowUserDetail(id) { //查看申请协助人详情
    return request({
        url: BASE_CUSTOMER_SERCICE + '/clueCustomerFollowUser/getApplyFollowUserDetail?id=' + id,
        method: 'get'
    })
}
export function dataReport_getDataReportDaily(data) { //获取日报详情
    return request({
        url: BASE_CUSTOMER_SERCICE + '/dataReport/getDataReportDaily',
        method: 'post',
        params: data
    })
}
export function dataReport_getDataReportWeekly(data) { //获取周报详情
    return request({
        url: BASE_CUSTOMER_SERCICE + '/dataReport/getDataReportWeekly',
        method: 'post',
        params: data
    })
}
export function dataReport_getDataReportMonthly(data) { //获取月报详情
    return request({
        url: BASE_CUSTOMER_SERCICE + '/dataReport/getDataReportMonthly',
        method: 'post',
        params: data
    })
}