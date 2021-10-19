import request from '@/utils/requestNew'
let BASE_Prefix = 'user-service'
export function livecodegroup_getlist(data) { //群活码列表
    return request({
        url: BASE_Prefix + '/livecodegroup/getlist',
        method: 'get',
        params: data
    })
}