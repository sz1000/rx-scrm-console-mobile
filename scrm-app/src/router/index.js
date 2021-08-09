import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 客户画像
import CustomerPortrait from '../views/customer/CustomerPortrait.vue'
import InformationDetail from '../views/customer/InformationDetail.vue'
// 拓客工具
import TalkTool from '../views/talkTool/index.vue'
import EnterpriseCode from '../views/talkTool/EnterpriseCode.vue'
import ChannelConfiguration from '../views/talkTool/ChannelConfiguration.vue'
// 客户管理
import CustomerManage from '../views/customerManage/index.vue'
import Clues from '../views/customerManage/Clues.vue'
import AddCules from '../views/customerManage/AddCules.vue'
import DetailCules from '../views/customerManage/DetailCules.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            bodyClass: 'HomeWarp',
        },
        component: Home,
    },
    // 客户画像
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
    // 拓客工具
    {
        path: '/talkTool',
        component: TalkTool,
        redirect: '/talkTool/enterpriseCode',
        children: [{
                path: 'enterpriseCode',
                meta: {
                    bodyClass: 'EnterpriseCode',
                },
                component: EnterpriseCode,
            },
            {
                path: 'channelConfiguration',
                meta: {
                    bodyClass: 'ChannelConfiguration',
                },
                component: ChannelConfiguration,
            },
        ],
    },
    //客户管理
    {
        path: '/customerManage',
        component: CustomerManage,
        redirect: '/customerManage/clues',
        children: [{
                path: 'clues',
                meta: {
                    bodyClass: 'Clues',
                },
                component: Clues,
            },
            {
                path: 'addCules',
                meta: {
                    bodyClass: 'AddCules',
                },
                component: AddCules,
            },
            {
                path: 'detailCules',
                meta: {
                    bodyClass: 'DetailCules',
                },
                component: DetailCules,
            },
        ],
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