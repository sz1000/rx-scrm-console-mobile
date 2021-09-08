import Network from './request'

export const getToken = (params) => {
    return Network.get('/user-service/m/user/getloguser', params)
}