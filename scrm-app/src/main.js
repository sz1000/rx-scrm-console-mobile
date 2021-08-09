import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
// import './utils/rem'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/common.less'
import preventReClick from './utils/directive.js' //防多次点击，重复提交
import Network from './utils/request'
Vue.use(preventReClick)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$network = Network

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')