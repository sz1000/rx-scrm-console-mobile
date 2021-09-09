import Network from './request'
import router from '../router/index'
import {
    setStoreValue,
    getStoreValue,
    removeStoreValue,
} from '../utils/LocalStorageDate'
const getWxToken = function() {
    let authCode
        // alert(window.location.href)
    if (window.location.href.indexOf('?') > -1) {
        let href = window.location.href.split('?')[1]
        let p = href.split('&')[0]
        authCode = p.split('=')[1]
    } else {
        // alert('ppppppp')
        authCode = ''
    }
    // alert(authCode)
    if (!authCode) {
        // alert('-----没有authCode-----')
        // alert(JSON.stringify(window.location.pathname))
        Network.get('/user-service/m/user/getappid', {
            redirect_uri: window.location.pathname,
        }).then((res) => {
            // alert(JSON.stringify(res))
            let params = {
                appid: res.data.suiteid,
                redirect_url: encodeURIComponent('https://' + res.data.redirect_uri),
            }
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${params.appid}&redirect_uri=${params.redirect_url}&response_type=code&state=state&scope=snsapi_base#wechat_redirect`
        })
    } else {
        // alert('有authcode---')
        getWxCofig(authCode)
    }
}

function getWxCofig(v) {
    Network.get('/user-service/m/user/getloguser', {
        code: v,
        url: location.href,
    }).then((res) => {
        if (res.result) {
            // alert(JSON.stringify(res))
            // this.token = res.data.accessToken
            // localStorage.setItem('token', res.data.accessToken)
            setStoreValue(
                'token',
                res.data.accessToken,
                res.data.expire_time,
                res.data.userNo
            )
        } else {
            if (
                res.code == 'error_busy' ||
                res.code == 'error_code' ||
                res.code == 'error_forbid' ||
                res.code == 'error_corp_forbid'
            ) {
                this.$message({
                    type: 'error',
                    message: '系统繁忙,请稍后重试' || res.msg,
                })
            } else {
                router.push('/404')
                localStorage.removeItem('token')
            }
        }
    })
}

export default {
    getWxToken,
}