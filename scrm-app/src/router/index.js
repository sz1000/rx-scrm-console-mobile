import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/talkTool/test.vue'
// 客户画像
import CustomerPortrait from '../views/customer/CustomerPortrait.vue'
import InformationDetail from '../views/customer/InformationDetail.vue'
import CustomTransition from '../views/customer/CustomTransition.vue'
// 拓客工具
import TalkTool from '../views/talkTool/index.vue'
import EnterpriseCode from '../views/talkTool/EnterpriseCode.vue'
import ChannelConfiguration from '../views/talkTool/ChannelConfiguration.vue'
// 客户管理
import CustomerManage from '../views/customerManage/index.vue'
//线索
import Clues from '../views/customerManage/Clues.vue'
import AddCules from '../views/customerManage/AddCules.vue'
import DetailCules from '../views/customerManage/DetailCules.vue'
import TurnCustomer from '../views/customerManage/TurnCustomer.vue'
import CluesSeas from '../views/customerManage/CluesSeas.vue'
// 客户
import MyCustomer from '../views/customerManage/MyCustomer.vue'
import AddCustomer from '../views/customerManage/AddCustomer.vue'
import CustomDetail from '../views/customerManage/CustomDetail.vue'
import CustomerSeas from '../views/customerManage/CustomerSeas.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
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
    {
        path: '/customTransition',
        name: 'customTransition',
        meta: {
            bodyClass: 'CustomTransition',
        },
        component: CustomTransition,
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
                name: 'clues',
                meta: {
                    bodyClass: 'Clues',
                    // keepAlive: true,
                },
                component: Clues,
            },
            {
                path: 'addCules',
                name: 'addCules',
                meta: {
                    bodyClass: 'AddCules',
                },
                component: AddCules,
            },
            {
                path: 'detailCules',
                name: 'detailCules',
                meta: {
                    bodyClass: 'DetailCules',
                    // keepAlive: true
                },
                component: DetailCules,
            },
            {
                path: '/test',
                name: 'test',
                component: Test,
            },
            // 客户画像
            {
                path: 'turnCustomer',
                meta: {
                    bodyClass: 'TurnCustomer',
                },
                component: TurnCustomer,
            },
            {
                path: 'cluesSeas',
                meta: {
                    bodyClass: 'CluesSeas',
                },
                component: CluesSeas,
            },
            // 客户
            {
                path: 'myCustomer',
                meta: {
                    bodyClass: 'MyCustomer',
                    // keepAlive: true,
                },
                component: MyCustomer,
            },
            {
                path: 'addCustomer',
                meta: {
                    bodyClass: 'AddCustomer',
                },
                component: AddCustomer,
            },
            {
                path: 'customDetail',
                meta: {
                    bodyClass: 'CustomDetail',
                },
                component: CustomDetail,
            },
            {
                path: 'customerSeas',
                meta: {
                    bodyClass: 'CustomerSeas',
                },
                component: CustomerSeas,
            },
        ],
    },
]

const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    document.getElementsByTagName('body')[0].className = to.meta.bodyClass
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
    next()
})
export default router