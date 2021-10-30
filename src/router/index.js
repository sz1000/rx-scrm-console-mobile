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
import CustomerGroup from '../views/talkTool/Customergroup.vue' //客户群发
import CustomergroupPlaye from '../views/talkTool/CustomergroupPlaye.vue' //客户群群发
import GroupCodeList from '../views/talkTool/groupCode/list.vue' //群活码列表
import GroupCodeAdd from '../views/talkTool/groupCode/add.vue' //群活码列表
import CallingMyCard from '../views/talkTool/callingCard/myCard.vue' //我的名片
import CallingPoster from '../views/talkTool/callingCard/poster.vue' //我的名片 生成海报
import CallingData from '../views/talkTool/callingCard/lookData.vue' //我的名片 浏览数据

import LableDataGroup from '../views/talkTool/lableDataGroup.vue' //客户群群发

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
import CustomDeepDetail from '../views/customerManage/CustomDeepDetail.vue'
import CustomerDeepSeas from '../views/customerManage/CustomerDeepSeas.vue'
import StageList from '../components/BusinessOpportunities/stageList'

// 群画像
import Groupportrait from '../views/portrait/Groupportrait'
// 群 SOP 设置
import SettingSop from '../views/portrait/settingSop'
// 群列表
import Grouplist from '../views/customerManage/Grouplist.vue'
// 群列表
import GroupListDetails from '../views/customerManage/groupListDetails.vue'
//错误页
import NoPermissions from '../views/404.vue'
import Test from '../views/talkTool/test.vue'

// 素材模板h5分享页面
import MaterialTemplate from '../views/MaterialTemplate/share'

// 消息通知 互动提醒
import Notice from '../views/notice/index'
//朋友圈
import CircleFriend from '../views/circleFriend/CircleFriend.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

const routes = [{
        path: '/',
        redirect: '/home',
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
    //群SOP 设置
    {
        path: '/settingSop',
        name: 'settingSop',
        meta: {
            bodyClass: 'settingSop',
        },
        component: SettingSop,
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
            //客户群发
            {
                path: 'CustomerGroup',
                meta: {
                    bodyClass: 'CustomerGroup',
                },
                component: CustomerGroup,
            },
            //客户群群发
            {
                path: 'CustomergroupPlaye',
                meta: {
                    bodyClass: 'CustomergroupPlaye',
                },
                component: CustomergroupPlaye,
            },

            //一建拉群
            {
                path: 'lableDataGroup',
                meta: {
                    bodyClass: 'lableDataGroup',
                },
                component: LableDataGroup,
            },
            //群活码 list
            {
                path: 'groupCodeList',
                meta: {
                    bodyClass: 'GroupCodeList',
                },
                component: GroupCodeList,
            },
            //群活码 add
            {
                path: 'groupCodeAdd',
                meta: {
                    bodyClass: 'GroupCodeAdd',
                },
                component: GroupCodeAdd,
            },
            //我的名片
            {
                path: 'myCard',
                meta: {
                    bodyClass: 'CallingMyCard',
                },
                component: CallingMyCard,
            },
            //生成海报
            {
                path: 'poster',
                meta: {
                    bodyClass: 'CallingPoster',
                },
                component: CallingPoster,
            },
            //浏览数据
            {
                path: 'lookData',
                meta: {
                    bodyClass: 'CallingData',
                },
                component: CallingData,
            },
            // 新建朋友圈
            {
                path: 'circleFriend',
                name: 'circleFriend',
                component: CircleFriend,
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
            // 群列表详情
            {
                path: 'groupListDetails',
                name: 'groupListDetails',
                meta: {
                    bodyClass: 'groupListDetails',
                },
                component: GroupListDetails,
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
            {
                path: 'customDeepDetail',
                meta: {
                    bodyClass: 'CustomDeepDetail',
                },
                component: CustomDeepDetail,
            },
            {
                path: 'customerDeepSeas',
                meta: {
                    bodyClass: 'CustomerDeepSeas',
                },
                component: CustomerDeepSeas,
            },
            {
                path: 'stageList',
                meta: {
                    bodyClass: 'StageList',
                },
                component: StageList,
            },
        ],
    },
    //营销互动
    {
        path: '',
    },
    // 素材模板h5分享页面
    {
        path: '/materialTemplate',
        name: 'materialTemplate',
        component: MaterialTemplate,
    },
    // 消息通知 互动提醒
    {
        path: '/notice',
        name: 'Notice',
        component: Notice,
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