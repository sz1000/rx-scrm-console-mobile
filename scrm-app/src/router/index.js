import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 客户画像
import CustomerPortrait from '../views/customer/CustomerPortrait.vue'
import InformationDetail from '../views/customer/InformationDetail.vue'
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
        meta: {
            bodyClass: 'CustomerPortrait',
        },
        component: CustomerPortrait,
    },
    {
        path: '/informationDetail',
        name: 'informationDetail',
        meta: {
            bodyClass: 'InformationDetail',
        },
        component: InformationDetail,
    },
]

const router = new VueRouter({
    routes,
})
router.beforeEach((to, from, next) => {
    document.getElementsByTagName('body')[0].className = to.meta.bodyClass
    next()
})
export default router