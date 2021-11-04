import { http } from '../utils/request'

const userServiceApi = '/user-service'
const wechatServiceApi = '/wechat-service'
const materialServiceApi = '/material-service'
const customerServiceApi = '/customer-service'

export const Getticket = data => { return http.get(`${userServiceApi}/m/user/getticket`, data)} // url获取授权信息
export const GetCrop = () => { return http.get(`${userServiceApi}/Corp/getCrop`)} // 企业详情
export const UsersList = data => { return http.get(`${userServiceApi}/user/getlist/${data}`)} // 企业员工列表
export const UsersInfo = data => { return http.get(`${userServiceApi}/user/getUser/${data}/info`)} // 员工信息详情

export const OffiAccount = data => { return http.post(`${wechatServiceApi}/offi-account/user/${data}`)} // 添加公众号授权后获取的用户信息
export const GetSignature = data => { return http.get(`${wechatServiceApi}/offi-account/autograph?url=${data}`)} // 获取分享签名

// 素材模板
export const ArticleList = data => { return http.get(`${materialServiceApi}/article/list`, data)} // 获取文章列表
export const ArticleDetail = data => { return http.get(`${materialServiceApi}/article/${data}/detail`)} // 获取文章详情

export const SaleDocumentList = data => { return http.get(`${materialServiceApi}/sale_document/list`, data)} // 获取文件列表
export const SaleDocumentDetail = data => { return http.get(`${materialServiceApi}/sale_document/${data}/detail`)} // 获取文件详情

export const PosterList = data => { return http.get(`${materialServiceApi}/sale-poster-entity/list`, data)} // 获取海报列表

export const MaterialOperation = data => { return http.post(`${materialServiceApi}/material_operation/${data.materialId}`, data.model)} // 上报浏览信息

//商机
export const OpportunitiesList = data => { return http.get(`${customerServiceApi}/business-opportunities/list/${data}`)} // 获取商机
export const AddOpportunities = data => { return http.post(`${customerServiceApi}/business-opportunities`, data)} // 新增商机
export const ModifyOpportunities = data => { return http.put(`${customerServiceApi}/business-opportunities`, data)} // 修改商机
export const DeleteOpportunities = data => { return http.delete(`${customerServiceApi}/business-opportunities/${data}`)} // 删除商机
export const ModifyOpportunitiesStatus = data => { return http.put(`${customerServiceApi}/business-opportunities/status/${data.id}?stageNo=${data.stageNo}`)} // 修改商机对应阶段
export const OpportunitiesStageList = data => { return http.get(`${customerServiceApi}/business-opportunities/stages/${data.corpId}?isEnd=${data.isEnd}&isAdd=${data.isAdd}`)} // 获取商机阶段概要信息
export const StageReasonList = data => { return http.get(`${customerServiceApi}/business-opportunities/stage-reason/${data}`)} // 获取阶段原因
export const ChargeUserInfoList = data => { return http.get(`${customerServiceApi}/business-opportunities/charge-user-info/${data}`)} // 获取可选商机负责人

export const SelectFollowMsgList = data => { return http.get(`${customerServiceApi}/clueCustomerFollowUser/selectFollowMsgList?clueCustomerNo=${data.clueCustomerNo}&punckStatus=${data.punckStatus}`)} // 当前客户跟进信息(商机动态)

// 协作人&消息通知
export const MessageNotificatio = data => { return http.post(`${customerServiceApi}/clueCustomerFollowUser/message-notificatio`, data)} // 添加消息通知
export const ReceiveUser = data => { return http.get(`${customerServiceApi}/clueCustomerFollowUser/receive-user?customerNo=${data.customerNo}&isPublic=${data.isPublic}&corpId=${data.corpId}`)} // 获取接收人信息
export const UserMessageReceive = data => { return http.get(`${customerServiceApi}/clueCustomerFollowUser/user-message-receive?clueCustomerNo=${data}`)} // 是否有新信息
