// import 'babel-polyfill'
// import promise from 'es6-promise'
// promise.polyfill()
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/common.less'
import preventReClick from './utils/directive.js' //防多次点击，重复提交
import loadmore from './utils/directive.js' //下拉框滚动加载
import { http } from './utils/request'

Vue.use(preventReClick)
Vue.use(loadmore)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$network = http
new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')