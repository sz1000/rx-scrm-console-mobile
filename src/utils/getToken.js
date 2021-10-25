import {http} from './request'

export const getToken = (params) => {
    return http.get('/user-service/m/user/getloguser', params)
}