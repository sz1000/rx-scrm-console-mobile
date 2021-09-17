import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeTransition from '../views/HomeTransition.vue'
// 客户画像
import CustomerPortrait from '../views/customer/CustomerPortrait.vue'
import InformationDetail from '../views/customer/InformationDetail.vue'
import CustomTransition from '../views/customer/CustomTransition.vue'
// 拓客工具
import TalkTool from '../views/talkTool/index.vue'
import EnterpriseCode from '../views/talkTool/EnterpriseCode.vue'
import ChannelConfiguration from '../views/talkTool/ChannelConfiguration.vue'
import verbalTrick from '../views/talkTool/verbalTrick.vue'
import Added from '../views/talkTool/Added.vue'
//打卡
import PunchCard from '../views/clockPage/PunchCard.vue'
import ClockPage from '../views/clockPage/ClockPage.vue'
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
// 群画像
import Groupportrait from '../views/portrait/Groupportrait'
// 群列表
import Grouplist from '../views/customerManage/Grouplist.vue'
//错误页
import NoPermissions from '../views/404.vue'
import Test from '../views/talkTool/test.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/homeTransition',
    },
    {
        path: '/test',
        name: 'test',

        component: Test,
    },
    {
        path: '/homeTransition',
        name: 'homeTransition',
        meta: {
            bodyClass: 'HomeTransition',
        },
        component: HomeTransition,
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            bodyClass: 'HomeWarp',
        },
        component: Home,
    },
    {
        path: '/404',
        name: '404',
        component: NoPermissions,
    },

    // 客户画像
    {
        path: '/customTransition',
        name: 'customTransition',
        meta: {
            bodyClass: 'CustomTransition',
        },
        component: CustomTransition,
    },
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
    // 群画像
    {
        path: '/groupportrait',
        name: 'groupportrait',
        meta: {
            bodyClass: 'groupportrait',
        },
        component: Groupportrait,
    },

    //打卡
    {
        path: '/punchCard',
        name: 'punchCard',
        meta: {
            keepAlive: true,
        },
        component: PunchCard,
    },
    {
        path: '/clockPage',
        name: 'clockPage',
        component: ClockPage,
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
            // 话术
            {
                path: 'verbalTrick',
                meta: {
                    bodyClass: 'verbalTrick',
                },
                component: verbalTrick,
            },
            // 新增
            {
                path: 'added',
                meta: {
                    bodyClass: 'Added',
                },
                component: Added,
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
            // 群列表
            {
                path: 'grouplist',
                name: 'grouplist',
                meta: {
                    bodyClass: 'grouplist',
                },
                component: Grouplist,
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
    //营销互动
    {
        path: '',
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
router.beforeEach((to, from, next) => {
    // document.getElementsByTagName('body')[0].className = to.meta.bodyClass
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
    next()
})
export default router