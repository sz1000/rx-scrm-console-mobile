import request from '@/utils/requestNew'
let BASE_Prefix = 'customer-service'
export function sop_groupSopList(id) { //群画像sop列表
    return request({
        url: BASE_Prefix + '/sop/groupSopList/' + id,
        method: 'get'
    })
}
export function sop_listAll(data) { //群SOP 所有规则
    return request({
        url: BASE_Prefix + '/sop/corpList',
        method: 'post',
        data
    })
}
export function sop_groupSopSetting(data) { //设置群SOP
    return request({
        url: BASE_Prefix + '/sop/groupSopSetting',
        method: 'post',
        data
    })
}
export function sop_prompt_personal(id) { //个人SOP提醒列表
    return request({
        url: BASE_Prefix + '/sop/prompt/personal/' + id,
        method: 'get',
    })
}
export function sop_prompt_group(id) { //群SOP提醒列表
    return request({
        url: BASE_Prefix + '/sop/prompt/group/' + id,
        method: 'get',
    })
}
export function sopSendDetail_tag(id) { //SOP规则发送记录详情标记发送状态
    return request({
        url: BASE_Prefix + '/sopSendDetail/tag/' + id,
        method: 'get',
    })
}
export function m_cluecustomer_getClueCustomerByid(id) { //获取客户详情
    return request({
        url: BASE_Prefix + '/m/cluecustomer/getClueCustomerByid?id=' + id,
        method: 'get',
    })
}
export function group_getGroupDetail(id) { //获取群详情
    return request({
        url: BASE_Prefix + '/group/getGroupDetail?chatId=' + id,
        method: 'get',
    })
}
export function sop_employeeList() { //当前登录用户企业员工列表-新增SOP规则使用员工下拉选
    return request({
        url: BASE_Prefix + '/sop/employeeList',
        method: 'get'
    })
}