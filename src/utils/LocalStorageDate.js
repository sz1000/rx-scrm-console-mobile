// const exp = 60 * 60 * 24 * 1000 // 过期时间一天
import Network from '../utils/request'
import router from '../router/index'
/**
 * 读取值
 * @param {string} keyName    - 字段名
 * @param {any}    defaultVal - 默认值，在某些情况下非常有用，比如返回对象时可免除空值判断
 * @returns {any}
 */

export function getStoreValue(keyName, defaultVal = '') {
    const data = localStorage.getItem(keyName)
        // alert(JSON.stringify(data))
    const jsonData = JSON.parse(data)
    if (data == null || data === '') {
        // 跳转home
        router.push('/home')
        return defaultVal
    } else {
        // 判断是否过期
        let overdueTime = jsonData.time - new Date().getTime()
            // alert(overdueTime)
        var minutes = Math.floor(overdueTime / (60 * 1000)) //计算相差分钟数
            // 如果过期,通过userno重新获取token
            // alert(minutes)
        if (minutes <= 5) {
            // alert(1111111111111)
            router.push('/home')
            return defaultVal
                // alert(jsonData.userNo)
                // let code = await Network.get('/user-service/m/user/getaccessToken', {
                //     userNo: jsonData.userNo,
                // }).then((res) => {
                //     alert(JSON.stringify(res))
                //     if (res.result) {
                //         setStoreValue(
                //             'token',
                //             res.data.accessToken,
                //             res.data.expire_time,
                //             res.data.userNo
                //         )

            //     } else {
            // }
            // })
            // 1531105426709
        } else {
            // 未过期,直接用
            return jsonData.value
        }
    }
    // 保存token
    // try {
    //     const jsonData = JSON.parse(data)
    //     if (Date.now() - jsonData.time >= exp) {
    //         removeStoreValue(keyName)
    //         return defaultVal
    //     }
    //     return jsonData.value
    // } catch (error) {
    //     return defaultVal
    // }
}

/**
 * 写入值
 * @param {string} keyName - 字段名
 * @param {any}    value   - 待存储的值
 */
export function setStoreValue(keyName, value, time, userNo) {
    localStorage.setItem(
        keyName,
        JSON.stringify({ value: value, time: time, userNo: userNo })
    )
}

/**
 * 删除值
 * @param {string} keyName - 字段名
 */
export function removeStoreValue(keyName) {
    localStorage.removeItem(keyName)
}