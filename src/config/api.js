import http from '../utils/request'

const userServiceApi = '/user-service'
const wechatServiceApi = '/wechat-service'
const materialServiceApi = '/material-service'

export const Getticket = data => { return http.get(`${userServiceApi}/m/user/getticket`, data)} // url获取授权信息
export const GetCrop = () => { return http.get(`${userServiceApi}/Corp/getCrop`)} // 企业详情
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
