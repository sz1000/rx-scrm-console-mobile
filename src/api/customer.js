import request from '@/utils/requestNew'
let BASE_CUSTOMER_SERVICE = 'customer-service'
let BASE_COMMON_SERVICE = 'common-service'

export function cluecustomer_getClueCustomerByid(id, clueCustomerNo) { //客户详情
    return request({
        url: BASE_CUSTOMER_SERVICE + '/m/cluecustomer/getClueCustomerByid?id=' + id + '&clueCustomerNo=' + clueCustomerNo,
        method: 'get'
    })
}
export function clueCustomerFollowUser_selectFollowMsgList(data, loading = false) { // 当前客户跟进信息
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/selectFollowMsgList',
        method: 'get',
        headers: {
            noLoading: loading
        },
        params: data
    })
}
export function clueCustomerFollowUser_message(id) { // 是否有新消息
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/user-message-receive?clueCustomerNo=' + id,
        method: 'get',
        headers: {
            noLoading: true
        }
    })
}
export function clueCustomerFollowUser_message_notificatio(data) { // 添加消息通知（@）
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/message-notificatio',
        method: 'post',
        data: data
    })
}
export function cluecustomer_addMessage(data) { // 写跟进
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/addMessage',
        method: 'post',
        data: data
    })
}
export function group_getMobileCustomerGroupPage(data) { // 获取客户群列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getMobileCustomerGroupPage',
        method: 'get',
        params: data
    })
}
export function group_getMobileGroupUserlist(id) { // 获取群群员列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getMobileGroupUserlist?chatId=' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_addCommentInfo(data) { // 添加评论回复
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/addCommentInfo',
        method: 'post',
        data
    })
}
export function clueCustomerFollowUser_queryCommentInfoList(data) { // 查询评论回复
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/queryCommentInfoList',
        method: 'get',
        headers: {
            noLoading: true
        },
        params: data
    })
}
export function clueCustomerFollowUser_giveTheThumbsUp(data) { // 点赞
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/giveTheThumbsUp',
        method: 'post',
        headers: {
            noLoading: true
        },
        params: data
    })
}
export function cluecustomeraccessory_getList(id) { // 获取附件列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomeraccessory/getList?clueCustomerNo=' + id,
        method: 'get'
    })
}
export function cluecustomeraccessory_delupload(data) { // 删除附件
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomeraccessory/delupload',
        method: 'post',
        params: data
    })
}
export function clueCustomerFollowUser_applyFollowUser(id) { // 申请成为协助人
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/applyFollowUser?clueCustomerNo=' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_approveHelperpplication(data) { // 协助人申请审批 1-同意2-拒绝
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/approveHelperpplication',
        method: 'post',
        data
    })
}
export function clueCustomerFollowUser_addFollowUser(data) { // 新增协助人
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/addFollowUser',
        method: 'post',
        data
    })
}
export function clueCustomerFollowUser_deleteFollowUsers(data) { // 删除协助人
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/deleteFollowUsers',
        method: 'post',
        data
    })
}
export function clueCustomerFollowUser_getFollowUserList(id) { // 获取协助人列表
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/getFollowUserList?cluecustomerno=' + id,
        method: 'get'
    })
}
export function clueCustomerFollowUser_getMBFollowUserList(id) { // 获取协助人列表 new
    return request({
        url: BASE_CUSTOMER_SERVICE + '/clueCustomerFollowUser/getMBFollowUserList?cluecustomerno=' + id,
        method: 'get'
    })
}
export function cluecustomeraccessory_upload(e, id, type, noLoading = false) { // 附件上传
    let formData = new FormData()
    formData.append('file', e.target.files[0])
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomeraccessory/upload?clueCustomerNo=' + id + 'type=' + type,
        method: 'post',
        header: {
            noLoading: noLoading
        },
        data: formData
    })
}
export function cluecustomer_toupdate(id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/toupdate?clueCustomerNo=' + id,
        method: 'get',
    })
}
export function cluecustomer_gettag(id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/gettag?clueCustomerNo=' + id,
        method: 'get',
    })
}
export function cluecustomer_update(data,loading = false) {     //客户画像详情修改
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/update',
        method: 'post',
        headers: {
            noLoading: loading
        },
        data: data
    })
}
export function cluecustomer_addtag(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/addtag',
        method: 'post',
        data
    })
}
export function cluecustomer_updPertag(data,id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/updPertag/' + id,
        method: 'post',
        data
    })
}
export function cluecustomer_deltag(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/deltag',
        method: 'post',
        data
    })
}
export function cluecustomer_updCorptag(id, data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/updCorptag/' + id,
        method: 'post',
        data
    })
}
export function group_getGroupDetail(id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getGroupDetail?chatId=' + id,
        method: 'get',
    })
}
export function group_getGroupUserPage(data, loading = false) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getGroupUserPage',
        method: 'get',
        headers: {
            noLoading: loading
        },
        params: data
    })
}
export function grouptag_list() {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/grouptag/list',
        method: 'get',
    })
}
export function groupUserTag_list(id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/groupUserTag/list?chatId=' + id,
        method: 'get',
    })
}
export function groupUserTag_addGroupTag(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/groupUserTag/addGroupTag',
        method: 'post',
        data: data
    })
}
export function group_getGroupTodayDetail(id) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/group/getGroupTodayDetail?chatId=' + id,
        method: 'get'
    })
}
// 客户线索列表
export function getcluecustomerlist(data, loading = false) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/getcluecustomerlist',
        method: 'post',
        headers: {
            noLoading: loading
        },
        data: data
    })
}
// 客户列表筛选条件商机阶段下拉列表数据
export function opportunitiesList(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/business-opportunities/corpStage/list',
        method: 'get',
        params: data,
    })
}
// 客户列表筛选条件下拉列表数据
export function getlistFiled(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/common/getlist',
        method: 'get',
        params: data,
    })
}
// 新增客户筛选条件下拉列表数据
export function getAddFiled(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/toadd',
        method: 'get',
        params: data,
    })
}
// 新增客户
export function doAdd(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/addCul',
        method: 'post',
        data,
    })
}
// 放弃
export function cluecustomer_giveUpType(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/giveUpType',
        method: 'get',
        params: data,
    })
}
// 变更负责人获取负责人选择列表
export function cluecustomer_getuserList(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/getuserList',
        method: 'get',
        params: data,
    })
}
// 变更负责人保存
export function cluecustomer_turnBlon(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/turnBlon',
        method: 'get',
        params: data,
    })
}
// 领取客户或线索
export function cluecustomer_getclue(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/getclue',
        method: 'get',
        params: data,
    })
}
// 删除线索
export function cluecustomer_delClueCustomer(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/delClueCustomer',
        method: 'get',
        params: data,
    })
}
// 线索转客户
export function cluecustomer_cluetocustomer(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + '/cluecustomer/cluetocustomer',
        method: 'post',
        data,
    })
}
// 线索合并客户
export function cluecustomer_clueMergeToCustomer(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + `/cluecustomer/clueMergeToCustomer?clueNo=${data.clueNo}&customerNo=${data.customerNo}`,
        method: 'post',
    })
}
// 获取企业下的某个配置项及规则(客户自动去重settingItem: customer_duplicate_switch)
export function cluecustomer_settingItem(data) {
    return request({
        url: BASE_CUSTOMER_SERVICE + `/generalSettings/settingItem/${data}`,
        method: 'get',
    })
}
// 获取客户名称相似列表
export function cluecustomer_elasticSearch(data, loading = false) {
    return request({
        url: BASE_COMMON_SERVICE + '/elasticSearch/queryClueCustomerPage/customers',
        method: 'post',
        headers: {
            noLoading: loading
        },
        data,
    })
}