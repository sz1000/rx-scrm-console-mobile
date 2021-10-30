import { http } from '../utils/request'
let BASE_Prefix = '/common-service'
export const uploadFile = (data) => {
    return http.post(`${BASE_Prefix}/oss/uploadfileparam`, data)
}