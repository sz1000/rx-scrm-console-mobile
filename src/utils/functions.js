const bases = function(Vue) {
    Vue.prototype.$gender = function(val) {   //性别
        let obj = {
            0: '未知',
            1: '男',
            2: '女',
        }
        return val ? obj[val] : '未知'
    }
}
export default bases