import request from '@/utils/requestNew'
let BASE_Prefix = 'user-service'
let BASE_GROUP_Prefix = 'customer-service'
export function livecodegroup_getlist(data,loading = false) { //群活码列表
    return request({
        url: BASE_Prefix + '/livecodegroup/getlist',
        method: 'get',
        headers: {
            noLoading: loading
        },
        params: data
    })
}
export function livecodegroup_upload(e) { //文件上传
    let formData = new FormData();
    formData.append("file", e.target.files[0])
    return request({
        url: BASE_Prefix + '/livecodegroup/upload',
        method: 'post',
        data: formData,
    })
}
export function livecodegroup_add(data) { //新增活码
    return request({
        url: BASE_Prefix + '/livecodegroup/add',
        method: 'post',
        data: data
    })
}
export function livecodegroup_update(data) { //编辑活码
    return request({
        url: BASE_Prefix + '/livecodegroup/update',
        method: 'post',
        data: data
    })
}
export function livecodegroup_delete(data) { //删除活码
    return request({
        url: BASE_Prefix + '/livecodegroup/delete',
        method: 'post',
        data: data
    })
}
export function livecodegroup_getselect() { //获取使用员工和渠道列表
    return request({
        url: BASE_Prefix + '/livecodegroup/getselect',
        method: 'get'
    })
}
export function group_getGroupInfoList() { //获取群列表
    return request({
        url: BASE_GROUP_Prefix + '/group/getGroupInfoList',
        method: 'get',
    })
}
export function livecodegroup_getByNo(id) { //获取详情
    return request({
        url: BASE_Prefix + '/livecodegroup/getByNo?livecodeNo=' + id,
        method: 'get'
    })
}