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
export function dataReport_getDataReportDaily(id,cid) { //获取日报详情
    return request({
        url: BASE_CUSTOMER_SERCICE + '/dataReport/getDataReportDaily?userNo=' + id + '&corpId=' + cid,
        method: 'post'
    })
}