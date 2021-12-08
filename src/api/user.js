import request from '@/utils/requestNew'
let BASE_USER_SERVICE = 'user-service'
export function userdepartment_getAlllist() {   //获取部门列表
    return request({
        url: BASE_USER_SERVICE + '/userdepartment/getAlllist',
        method: 'get'
    })
}
export function user_getUserList(data) {    //获取员工列表
    return request({
        url: BASE_USER_SERVICE + '/user/getMBUserList',
        method: 'get',
        params: data
    })
}