import request from '@/utils/requestNew'
let BASE_Prefix = 'user-service'
export function userBusinessCard_personalCard() { //获取详情信息
    return request({
        url: BASE_Prefix + '/userBusinessCard/personalCard',
        method: 'get'
    })
}
export function userBusinessCardViewLog_personalCard() { //获取浏览数据
    return request({
        url: BASE_Prefix + '/userBusinessCardViewLog/personalCard',
        method: 'get'
    })
}