<template>
    <div class="customer_wrap" :class="{'glass':dialog_xzr}">
        <template v-if="!showFollowUpBox">
            <img class="bg" :style="{'transform':`translateY(-${bgY})`}" src="@/assets/svg/customer_bg.svg" alt="">
            <TopCard :fromType="fromType" :customerInfo="customerInfo" :userList="userList" :tagList="tagList" isPortrait @jump="toFun"></TopCard>
            
            <div class="content">
                <dynamics ref="dynamic" :fromType="fromType" :id="customerInfo.clueCustomerNo" :did="customerInfo.userNo" @openDialog="openDialog" @load="listLoadFun"></dynamics>
                <!-- <dynamics ref="dynamic" v-if="navActive == 'dynamics'" :fromType="fromType" :id="customerInfo.clueCustomerNo" :did="customerInfo.userNo" @fillMessage="getPeople" @openDialog="openDialog" @load="listLoadFun"></dynamics> -->
            </div>
            <!-- 打开操作按钮弹窗面板 -->
            <div v-if="((fromType == 1 || fromType == 3) && (isInCharge || isHelperOne)) || (fromType == 2 || fromType == 4)" class="operation-box">
                <div class="follow_up pointer" @click="showOperationBtnBox()">
                    <img class="icon" src="@/assets/svg/icon_add.svg" alt="">
                </div>
            </div>

            <!-- 群成员列表 -->
            <van-popup position="bottom" round v-model="dialog_group" :safe-area-inset-bottom="true">
                <div class="dialog_wrap">
                    <div class="dialog_header">
                        <div class="title">群成员列表</div>
                        <img class="close" @click="dialog_group = false" src="@/assets/svg/icon_close.svg" alt="">
                        <div class="total_box">
                            <div class="total">共 {{groupUserData.total}} 个群成员，{{groupUserData.cusCount}} 个客户，{{groupUserData.ygCount}}个企业内部成员</div>
                            <div class="btn" @click="toGroupDetail">
                                <span class="a">群画像</span>
                                <img class="icon" src="@/assets/svg/icon_next_blue.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="dialog_content">
                        <div class="list">
                            <div class="li" v-for="(item,index) in groupUserList" :key="index">
                                <!-- <div class="avatar"></div> -->
                                <img class="avatar" :src="item.avatar | $setAvatar" alt="">
                                <div class="val">
                                    <div class="tit_box">
                                        <div class="tit">{{item.name}}</div>
                                        <div class="alt" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 1">@微信</div>
                                        <div class="alt yellow" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 2">@{{item.customerName || item.corpName}}</div>
                                        <div class="tag red" v-if="item.admintype == 1">群主</div>
                                        <div class="tag" v-if="item.admintype != 1 && item.type == 1">员工</div>
                                        <div class="tag green" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 1">客户</div>
                                        <div class="tag yellow" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 2">企业客户</div>
                                    </div>
                                    <div class="time">{{item.joinTime | $time('YYYY-MM-DD HH:mm')}} <span v-if="item.admintype != 1">{{item.joinScene | joinType}}</span></div>
                                    <!-- <div class="opera_right">
                                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-popup>
            <!-- 消息回复弹窗 -->
            <DialogComment v-model="dialog_xx" @sure="addCommentFun" isComment></DialogComment>
            <!-- 商机详情 -->
            <OpportunityDialog v-model="dialog_sj"></OpportunityDialog>
            <!-- 同事名片 -->
            <BusinessCard v-model="dialog_card"></BusinessCard>
            <!-- 申请成为协助人 -->
            <ApplyHelp v-model="dialog_xzr" :id="customerInfo.clueCustomerNo" :data="applyData"></ApplyHelp>
            <!-- 操作按钮弹窗面板 -->
            <operation-btn-box ref="operationBtnBox" :permission="permission" @doAction="doAction"></operation-btn-box>
            <!-- 放弃或领取或删除 -->
            <give-up-or-receive ref="giveUpOrReceive" :title="popContent.title" :btnList="popContent.btnList" :desList="popContent.desList" @doNextOption="doNextOption"></give-up-or-receive>
            <!-- 变更负责人 -->
            <change-director ref="changeDirector" :fromType="fromType"></change-director>
            <!-- 新建/编辑商机 -->
            <edit-opportunity ref="editOpportunity" :fromType="fromType" :customerNo="customerInfo && customerInfo.clueCustomerNo" @sure="callbackFun"></edit-opportunity>
        </template>

        <!-- 写跟进 -->
        <follow-up-box v-else ref="followUpBox" :fromType="fromType" :customerNo="customerInfo && customerInfo.clueCustomerNo" :sendUserInfo="sendUserInfo" @doHideFollowUpBox="doHideFollowUpBox"></follow-up-box>
    </div>
</template>

<script>
import MyMixin from '@/mixins/permissionsList'
import opportunityMixin from '@/mixins/opportunity'
import { Dynamics, DialogComment, OpportunityDialog, ApplyHelp, TopCard, BusinessCard } from './components'
import { user_getUserName } from '@/api/home'
import {
    cluecustomer_getClueCustomerByid,
    group_getMobileGroupUserlist,
    clueCustomerFollowUser_addCommentInfo,  //添加评论回复
    cluecustomer_giveUpType, // 放弃
    cluecustomer_getclue, // 领取
    cluecustomer_delClueCustomer, // 删除
} from '@/api/customer'
import GiveUpOrReceive from '@/components/CustomerManage/dialog/giveupOrReceive'
import ChangeDirector from '@/components/CustomerManage/dialog/changeDirector'
import OperationBtnBox from '@/components/CustomerManage/operationBtnBox'
import FollowUpBox from '@/components/CustomerManage/followUpBox'
import EditOpportunity from '@/components/BusinessOpportunities/dialog/editOpportunity'

export default {
    mixins: [MyMixin, opportunityMixin],
    components: {
        Dynamics, 
        DialogComment, 
        OpportunityDialog, 
        ApplyHelp, 
        TopCard, 
        BusinessCard,
        GiveUpOrReceive, 
        ChangeDirector, 
        OperationBtnBox, 
        FollowUpBox,
        EditOpportunity
    },
    data(){
        return {
            jurisdictionList: [], // 按钮权限列表

            id: this.$route.query.id,
            code: this.$route.query.userNo,
            num: this.$route.query.num,

            dialog_group: false,
            dialog_xx: false,
            dialog_sj: false,
            dialog_xzr: false,
            dialog_card: false,
            // isApply: false,     //是否已经申请成为协助人 且还未通过

            optionType: '', // 操作类型
            popContent: {
                title: '',
                btnList: [],
                desList: []
            },

            applyData: {},

            customerInfo: {},
            userList: [],
            tagList: [],

            searchGroup: {
                page: 1,
                limit: 10,
                customerNo: '',
            },
            groupList: [],
            groupTotal: 0,
            groupUserData: {},
            groupUserList: [],
            groupChatId: '',
            rowId: '',

            showSecret: false,
            sendUserInfo: {},

            showFollowUpBox: false, // 是否显示写跟进页面
        }
    },
     computed: {
        chatId() {
            return this.$store.getters.chatId
        },
        entry() {
            return this.$store.getters.entry
        },
        userId() {
            return this.$store.getters.userId
        },
        userNo(){
            return this.$store.getters.userNo
        },
        personList(){
            let list = this.userList
            return list && list.length ? list.slice(0,3) : ''
        },
        fromType() { // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            return this.customerInfo && this.customerInfo.type
        },
        bgY(){
            let y = 0
            if(this.tagList.length == 0){
                if(!this.customerInfo.mobil){
                    y = '70px'
                }else{
                    y = '40px'
                }
            }else{
                if(!this.customerInfo.mobil){
                    y = '30px'
                }
            }
            return y
        },
        // 获取当前登录客户的角色与权限
        roleObj() {
            let obj = {}

            this.userList.map(item => {
                if (item.userNo == this.userNo) {
                    obj.flag = item.flag  // 1: 负责人 2: 协助人
                    obj.permission = item.permission // 1: 读写 2: 只读
                }
            })

            return obj
        },
        // 是否是负责人
        isInCharge() {
            return this.roleObj && this.roleObj.flag == 1
        },
        // 是否是协助人（读写）
        isHelperOne() {
            return this.roleObj && this.roleObj.flag == 2 && this.roleObj.permission == 1
        },
        // 是否是协助人（只读）
        isHelperTwo() {
            return this.roleObj && this.roleObj.flag == 2 && this.roleObj.permission == 2
        },
        // 配置按钮权限列表
        jurisdictionListData() {
            return {
                transferCustomer: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'turn'),
                changeDirector: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'change'),
                opportunityOperation: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'business'),
                giveUp: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'giveup'),
                // distribution: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'allot'),
                distribution: false,
                receive: this.jurisdictionList && this.jurisdictionList.length && this.jurisdictionList.some(item => item.enName == 'get'),
            }
        },
        // 操作面板弹窗操作按钮权限
        permission() {
            return {
                writeFollowUp: (this.fromType == 1 || this.fromType == 3) && (this.isInCharge || this.isHelperOne) ? true : false, // 写跟进（type: 1 || 3, 负责人与写权限的协助人）
                transferCustomer: this.fromType == 1 && this.jurisdictionListData.transferCustomer && this.isInCharge ? true : false, // 转客户（type: 1, 仅负责人）
                changeDirector: (this.fromType == 1 || this.fromType == 3) && this.jurisdictionListData.changeDirector && this.isInCharge ? true : false, // 变更负责人（type: 1 || 3, 仅负责人）
                opportunityOperation: this.fromType == 3 && this.jurisdictionListData.opportunityOperation && (this.isInCharge || this.isHelperOne) ? true : false, // 操作商机（新增, type: 3, 负责人与写权限的协助人）
                giveUp: (this.fromType == 1 || this.fromType == 3) && this.jurisdictionListData.giveUp && this.isInCharge ? true : false, // 放弃（type: 1 || 3, 仅负责人）
                distribution: (this.fromType == 2 || this.fromType == 4) && this.jurisdictionListData.distribution ? true : false, // 分配（type: 2 || 4, 有按钮权限即可）
                receive: (this.fromType == 2 || this.fromType == 4) && this.jurisdictionListData.receive ? true : false, // 领取（type: 2 || 4, 有按钮权限即可）
                delete: this.fromType == 1 && this.customerInfo.isWcCus != 1 && this.isInCharge ? true : false, // 删除（客户没有删除，线索有删除（仅负责人 非微信好友可删除））
            }
        },
    },
    mounted(){
        console.log('asd',this.$route.query.name)
        this.getCustomerDetail()
    },
    provide() {
        return {
            getGroupUserList: this.getGroupUserList,
            opportunitiesList: this.opportunitiesList,
            opportunitiesStageList: this.opportunitiesStageList,
        }
    },
    methods: {
        isDirectorFun(data){    //是否是相关负责人协助人 及相关数据(是否展示无权限弹窗)(permFlag: 0: 无权限 1: 读写 2: 只读; isShow: 0: 无权限 1: 有权限)
            this.dialog_xzr = Number(data.isShow) ? false : true
            // this.isApply = data.isApply ? true : false
            let directorList = data.directorList
            let depName = directorList && directorList.length && directorList[0].depId ? `-${directorList[0].depId}` : ''
            
            this.applyData = {
                customerName: data.clueCustomerVO.name,
                cropFullName: data.clueCustomerVO.cropFullName ? data.clueCustomerVO.cropFullName : data.clueCustomerVO.customerName,
                customerAvatar: data.clueCustomerVO.avatar,
                createTime: data.clueCustomerVO.createTime,
                directorName: directorList && directorList.length ? directorList[0].name + depName : '',
                directorAvatar: directorList && directorList.length ? directorList[0].avatar : '',
            }
        },
        jumpFun(code){      //锚点跳转
            // console.log('code',code,document.querySelector(`#${code}`))
            const returnEle = document.querySelector(`#${code}`);  //productId是将要跳转区域的id
            if (!returnEle) {
                returnEle.scrollIntoView(true); // true 是默认的
            }
            document.querySelector(`#${code}`).scrollIntoView(true); //这里的counter1是将要返回地方的id
        },
        getCustomerDetail(){    //获取客户详情
            let id = this.userId
            // || 'woyPDZEQAArynDzUMWHKQZTy_XMj7rPg'  //协助人、商机、附件
            let { comeFrom, name } = this.$route.query

            if(comeFrom == 'messageCard') {
                id = name
            } else {
                if(this.code) {
                    id = this.code
                }
            }
            cluecustomer_getClueCustomerByid(id, '').then(res => {
                if (res.result) {
                    let data = res.data

                    this.customerInfo = data.clueCustomerVO

                    // 我的客户和我的线索有无权限弹窗
                    if (this.fromType == 1 || this.fromType == 3) {
                        this.isDirectorFun(data)
                    }

                    this.getUserName()

                    this.userList = data.directorList
                    this.tagList = data.tagList.filter((el,index) => {
                        return index < 3
                    })
                    // this.isDirector()

                    let { comeFrom } = this.$route.query

                    if(comeFrom == 'messageCard'){
                        this.$refs.dynamic.navClickFun(3)
                    }
                } else {
                    this.$toast(res.msg)
                }
            })
        },
        getUserName(){  //获取权限数据
            user_getUserName().then(res => {
                if(res.result){
                    let data = res.data
                    this.showSecret = !data.haveSecret
                    this.sendUserInfo = data && data.userEntity
                    this.getJurisdictionList()
                }
            })
        },
        // 获取按钮权限列表
        getJurisdictionList() {
            let pathname = "/customerManage/myCustomer"

            if (this.fromType == 1 || this.fromType == 2) {
                pathname = "/customerManage/clues"
            }

            this.setName(this.sendUserInfo.permissionList, pathname)

            let jurisdictionObj = {}

            for (let i in this.expandedKeys) {
                jurisdictionObj[this.expandedKeys[i].enName] = this.expandedKeys[i].childrenList
            }

            let type = this.fromType == '1' ? 'myClew' : this.fromType == '2' ? 'commonClew' : this.fromType == '3' ? 'myCustomer' : 'commonCustomer'
            
            this.jurisdictionList = jurisdictionObj[type]
        },
        getGroupUserList(id){   //获取群群员列表
            this.groupChatId = id
            group_getMobileGroupUserlist(id).then(res => {
                if(res.result){
                    this.groupUserData = res.data.dataCount
                    this.groupUserList = res.data.allList

                    if (this.groupUserData.total > 20) {
                        this.toGroupDetail()
                        return
                    }

                    this.dialog_group = true
                }
            })
        },
        listLoadFun(val){   //客户动态列表获取成功判断 (跳转用)
            if(val){
                if(this.id){
                    setTimeout(() => {
                        this.jumpFun(`m${this.id}`)
                    },200)
                }
            }
        },
        // 打开操作弹窗面板
        showOperationBtnBox() {
            this.$refs.operationBtnBox.show()
        },
        // 操作事件（客户相关和线索相关：写跟进，变更负责人，放弃，分配，领取，删除）
        doAction(type) {
            this.optionType = type
            switch (type) {
                case 'writeFollowUp':    // 写跟进（我的客户、我的线索）
                    this.openDialog('', 'follow')
                    break;
                case 'transferCustomer':    // 转客户（我的线索）
                    this.$router.push({
                        path: '/customerManage/turnCustomer',
                        query: {
                            fromType: this.fromType,
                            clueCustomerNo: this.customerInfo.clueCustomerNo,
                            customerCalled: this.customerInfo.customerCalled
                        },
                    })
                    break;
                case 'giveUp':   // 放弃（我的客户、我的线索）
                    this.popContent.title = '放弃警告'
                    this.popContent.btnList = ['是', '否']
                    this.popContent.desList = ['是否放弃返回公海？', '* 放弃到公海后，此客户数据将属于公共资源，原归属人员不能再维护跟进和更新此客户数据。']
                    this.$refs.giveUpOrReceive.show()
                    break;
                case 'changeDirector':    // 变更负责人（我的客户、我的线索）
                case 'distribution':    // 分配（客户公海、线索公海）
                    this.$refs.changeDirector.show(this.customerInfo.clueCustomerNo, type)
                    break;
                case 'receive':    // 领取（客户公海、线索公海）
                    this.popContent.title = '领取提示'
                    this.popContent.desList = [ this.fromType == 4 ? '是否确认领取所选择的客户？' : '是否确认领取所选择的线索？', '确认申领该条资源吗？']
                    this.$refs.giveUpOrReceive.show()
                    break;
                case 'delete':    // 删除（ 客户没有删除，我的线索有删除（非微信好友可删除：isWcCus 为 1 即为好友））
                    this.popContent.title = '温馨提示'
                    this.popContent.btnList = ['确定', '取消']
                    this.popContent.desList = [ '是否确认删除？']
                    this.$refs.giveUpOrReceive.show()
                    break;
                case 'opportunityOperation':   // 新增商机（我的客户）
                    this.$refs.editOpportunity.show(data)
                default:
                    break;
            }
            this.$refs.operationBtnBox.hide()
        },
        // 操作确认
        doNextOption() {
            let ApiOpts = null, tips = ''

            if (this.optionType == 'giveUp') {
                // 放弃
                ApiOpts = cluecustomer_giveUpType
                tips = '操作成功'
            } else if (this.optionType == 'receive') {
                // 领取
                ApiOpts = cluecustomer_getclue
                tips = '领取成功'
            } else if (this.optionType == 'delete') {
                // 删除
                ApiOpts = cluecustomer_delClueCustomer
                tips = '已删除'
            }

            let params = {
                clueCustomerNo: this.customerInfo.clueCustomerNo,
                type: this.fromType,
            }

            ApiOpts(params).then(res => {
                const { result, msg }  = res

                if (result) {
                    this.$router.go(-1)
                    this.$toast(tips)
                } else {
                    this.$toast(msg)
                }
            })
        },
        // 关闭新建商机
        callbackFun() {
            this.$refs.editOpportunity.hide()
        },
        openDialog(id,type){  //打开回复弹窗
            this.rowId = id
            switch (type) {
                case 'comment':   //消息回复
                    this.dialog_xx = true
                    break;
                case 'detail':    //商机详情
                    this.dialog_sj = true
                    break;
                case 'follow':    //写跟进
                    this.doShowFollowUpBox()
                    break;
                default:
                    break;
            }
        },
        // 显示写跟进页面
        doShowFollowUpBox() {
            this.showFollowUpBox = true
        },
        // 关闭写跟进页面
        doHideFollowUpBox() {
            this.showFollowUpBox = false
        },
        addCommentFun(val){    //添加评论回复
            let data = {
                content: val,
                fromUserId: this.userNo,
                targetId: this.rowId,
                targetType: 1,
            }
            console.log('submit',data)
            // return false
            clueCustomerFollowUser_addCommentInfo(data).then(res => {
                if(res.result){
                    this.dialog_xx = false
                    this.$refs.dynamic.searchFun()
                }
            })
        },
        toFun(val){
            let name = '', query = { fromType: this.fromType }

            if (val == 'helper') {    //查看协助人
                name = 'helper'
                query.id = this.customerInfo.clueCustomerNo
            } else if (val == 'detail') {    //详情
                name = 'CustomerDetail'
                query.clueCustomerNo = this.customerInfo.clueCustomerNo
            }
            this.$router.push({ name, query })
        },
        toGroupDetail(){    //群画像
            this.$router.push({
                path: '/customerManage/groupListDetails',
                query: {
                    id: this.groupChatId
                }
            })
        },
    },
    filters: {
        joinType(val){
            let obj = {
                1: '直接邀请入群',
                2: '通过邀请链接入群',
                3: '通过扫描群二维码入群',
            }
            return val ? obj[val] : ''
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dialog_wrap{
    width: 100%;
    height: 60vh;
    background: @white;
    position: relative;
    .dialog_header{
        width: 100%;
        min-height: 104px;
        position: relative;
        .title{
            width: 100%;
            padding: 32px 0;
            text-align: center;
            font-weight: bold;
            color: @fontMain;
            font-size: 32px;
            line-height: 40px;
        }
        .close{
            width: 40px;
            height: 40px;
            position: absolute;
            right: 30px;
            top: 34px;
        }
        .total_box{
            padding: 24px 32px;
            position: relative;
            &::after{
                content: '';
                width: calc(100% - 64px);
                height: 1px;    /*no*/
                background: @lineColor;
                position: absolute;
                bottom: 0;
                left: 24px;
            }
            .total{
                color: @fontSub1;
                font-size: 24px;
                line-height: 32px;
            }
            .btn{
                position: absolute;
                right: 32px;
                bottom: 24px;
                font-size: 24px;
                line-height: 32px;
                display: flex;
                .a{
                    color: @main;
                }
                .icon{
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
    .dialog_content{
        width: 100%;
        height: calc(100% - 184px);
        overflow-y: scroll;
        .list{
            width: 100%;
            padding: 0 32px;
            .li{
                width: 100%;
                padding: 32px 0;
                position: relative;
                display: flex;
                .avatar{
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-right: 22px;
                    background: rgba(0, 0, 0, 0.07);
                }
                .val{
                    width: calc(100% - 102px);
                    position: relative;
                    .tit_box{
                        display: flex;
                        align-items: center;
                        font-size: 28px;
                        line-height: 32px;
                        margin-bottom: 16px;
                        .tit{
                            color: @fontMain;
                            font-weight: bold;
                            max-width: 50%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .alt{
                            color: @green;
                            margin-left: 4px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &.yellow{
                                color: @yellow;
                            }
                        }
                        .tag{
                            margin-left: 8px;
                            height: 32px;
                            line-height: 32px;
                            font-size: 20px;
                            color: @main;
                            white-space: nowrap;
                            background: rgba(@main,.06);
                            padding: 0 16px;
                            border-radius: 21px;
                            border: 1px solid @main; /*no*/
                            &.red{
                                color: @red;
                                background: rgba(@red,.06);
                                border-color: @red;
                            }
                            &.green{
                                color: @green;
                                background: rgba(@green,.06);
                                border-color: @green;
                            }
                            &.yellow{
                                color: @yellow;
                                background: rgba(@yellow,.06);
                                border-color: @yellow;
                            }
                        }
                    }
                    .time{
                        color: @total;
                        font-size: 24px;
                        line-height: 32px;
                        span{
                            margin-left: 24px;
                        }
                    }
                    .opera_right{
                        width: 60px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        position: absolute;
                        right: 0;
                        top: 0;
                        .icon{
                            height: 40px;
                        }
                    }
                }
            }
        }
    }
}
.customer_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  position: relative;
  overflow: hidden;
  &.glass{
    filter: blur(4px); /* no */
  }
  .bg{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .nav_box{
    width: 100%;
    height: 88px;
    display: flex;
    text-align: center;
    // border-bottom: 1px solid @lineColor; /*no*/
    position: relative;
    &::before{
        content: '';
        width: 100%;
        height: 1px;   /*no*/
        background: @lineColor;
        transform: scaleY(.5);
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .nav{
        color: @fontSub1;
        font-size: 28px;
        line-height: 88px;
        flex: 1;
        position: relative;
        &.cur{
            color: @main;
            &::before{
                content: '';
                width: 40px;
                height: 4px;
                background: @main;
                border-radius: 2px;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
            }
        }
    }
  }
  .content{
    width: 100%;
    padding: 32px;
    &.pd0{
        padding: 0;
    }
  }
  .operation-box {
        width: 5rem;
        height: 104px;
        pointer-events: none;
        position: fixed;
        bottom: 200px;
        left: 50%;
        z-index: 9;
        .follow_up{
            width: 104px;
            height: 104px;
            background-color: @main;
            box-shadow: 0 6px 34px 0 rgba(65, 104, 246, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            right: 32px;
            top: 0;
            .icon{
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>