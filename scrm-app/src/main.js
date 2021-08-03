import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
// import './utils/rem'
import Vant from 'vant'
import 'vant/lib/index.css'
import Network from './utils/request'
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$network = Network

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')