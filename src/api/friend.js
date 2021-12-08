import { http } from '../utils/request'
import request from '@/utils/requestNew'
let BASE_Prefix = '/common-service'
let materialServiceApi = '/material-service'
export const uploadFile = (data) => {
        return http.post(`${BASE_Prefix}/oss/uploadfileparam`, data)
    }
    // export function uploadFile(data) {
    //     //获取通知详情信息
    //     return request({
    //         url: BASE_Prefix + '/notice/getNoticeDetail/',
    //         method: 'post',
    //         data,
    //     })
    // }

export const addFriend = (data) => {
        return http.post(`${materialServiceApi}/friendCircle/addFriendCircle`, data)
    }
    // export const addFriendStrong = (data) => {
    //     return http.post(`${materialServiceApi}/friendCircle/addFriendCircleH5`, data)
    // }
export const addFriendStrong = (data) => {
    return request({
        url: materialServiceApi + 'friendCircle/addFriendCircleH5',
        method: 'post',
        data: data,
    })
}