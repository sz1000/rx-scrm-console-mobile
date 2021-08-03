import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 客户画像
import CustomerPortrait from '../views/customer/CustomerPortrait.vue'
Vue.use(VueRouter)

const routes = [
    // {
    //       path: '/',
    //       redirect: '/home',
    //   },
    //   {
    //       path: '/home',
    //       name: 'Home',
    //       component: Home,
    //   },
    {
        path: '/customerPortrait',
        name: 'CustomerPortrait',
        component: CustomerPortrait,
    },
]

const router = new VueRouter({
    routes,
})

export default router