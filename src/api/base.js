import request from '@/utils/requestNew'
let BASE_USER_SERVICE = 'user-service'
export function user_getappid(data) { //获取appid
    return request({
        url: BASE_USER_SERVICE + '/m/user/getappid?redirect_uri=' + data,
        method: 'get'
    })
}
export function user_getloguser(data) { //获取登陆信息
    return request({
        url: BASE_USER_SERVICE + '/m/user/customize/getloguser',
        method: 'get',
        params: data
    })
}