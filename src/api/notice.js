import request from '@/utils/requestNew'
let BASE_Prefix = 'user-service'
export function notice_getNoticeDetail(id) { //获取通知详情信息
    return request({
        url: BASE_Prefix + '/notice/getNoticeDetail/' + id,
        method: 'get'
    })
}