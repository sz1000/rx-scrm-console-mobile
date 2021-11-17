import request from '@/utils/requestNew'
let BASE_CUSTOMER_SERVICE = 'customer-service'
let BASE_USER_SERVICE = 'user-service'
export function cluecustomer_homedata() { //
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/homedata',
        method: 'get'
    })
}
export function user_getUserName(data = 'mobile') { //获取首页权限数据
    return request({
        url: BASE_USER_SERVICE + '/user/getUserName?endPoint=' + data,
        method: 'get'
    })
}