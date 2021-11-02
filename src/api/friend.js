import { http } from '../utils/request'
let BASE_Prefix = '/common-service'
let materialServiceApi = '/material-service'
export const uploadFile = (data) => {
    return http.post(`${BASE_Prefix}/oss/uploadfileparam`, data)
}

export const addFriend = (data) => {
    return http.post(`${materialServiceApi}/friendCircle/addFriendCircle`, data)
}