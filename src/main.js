// import 'babel-polyfill'
// import promise from 'es6-promise'
// promise.polyfill()
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission' // permission control
import 'lib-flexible/flexible'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/common.less'
import preventReClick from './utils/directive.js' //防多次点击，重复提交
import loadmore from './utils/directive.js' //下拉框滚动加载
import { http } from './utils/request'
import * as echarts from 'echarts'

import filters from '@/utils/filters'
import globalComponents from '@/components/global/index.js'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))
Object.keys(globalComponents).forEach((g) =>
    Vue.component(g, globalComponents[g])
)

Vue.use(preventReClick)
Vue.use(loadmore)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$network = http
Vue.prototype.$echarts = echarts
new Vue({
    router,
    store,
    echarts,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')