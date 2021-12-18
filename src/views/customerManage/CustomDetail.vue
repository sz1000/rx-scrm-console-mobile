<template>
    <div class="customer_wrap">
        <img class="bg" :style="{'transform':`translateY(-${bgY})`}" src="@/assets/svg/customer_bg.svg" alt="">
        <TopCard :customerInfo="customerInfo" :userList="userList" :tagList="tagList" @jump="toFun"></TopCard>
        <div class="nav_box">
            <div class="nav" @click="navClickFun(item.code)" :class="{'cur':item.code == navActive}" v-for="item in navList" :key="item.code">{{item.name}}<span v-if="item.num">({{item.num}})</span></div>
        </div>
        <div class="content" :class="{'pd0':navActive == 'group' || navActive == 'enclosure'}">
            <!-- 客户动态 -->
            <dynamics ref="dynamic" v-if="navActive == 'dynamics'" :id="customerInfo.clueCustomerNo" :did="customerInfo.userNo" @fillMessage="getPeople" @openDialog="openDialog" @load="listLoadFun"></dynamics>
            <!-- 商机 -->
            <opportunities v-if="navActive == 'niche'" :customerNo="customerInfo && customerInfo.clueCustomerNo" fromType="3" @sure="getCustomerDetail" isPortrait></opportunities>
            <!-- 群聊 -->
            <group :data="groupList" v-if="navActive == 'group'" @sure="getGroupUserList"></group>
            <!-- 附件 -->
            <enclosure :id="customerInfo.clueCustomerNo" v-if="navActive == 'enclosure'" @sure="getCustomerDetail"></enclosure>
        </div>
        <!-- 写跟进 -->
        <div class="operation-box">
            <div class="follow_up pointer" v-if="navActive == 'dynamics'" @click="showOperationBtnBox()">
                <img class="icon" src="@/assets/svg/icon_add.svg" alt="">
            </div>
        </div>
        
        <!-- 协助人消息输入框 -->
        <message-box v-if="navActive == 'dynamics'" ref="messageBox"></message-box>
        <!-- 协助人选择弹窗 -->
        <reminders-box ref="remindersBox" :customerNo="customerInfo && customerInfo.clueCustomerNo"></reminders-box>
        <!-- 群成员列表 -->
        <van-popup position="bottom" round v-model="dialog_group" :safe-area-inset-bottom="true">
            <div class="dialog_wrap">
                <div class="dialog_header">
                    <div class="title">群成员列表</div>
                    <img class="close" @click="dialog_group = false" src="@/assets/svg/icon_close.svg" alt="">
                    <div class="total_box">
                        <div class="total">共 {{groupUserData.total}} 个群成员，{{groupUserData.cusCount}} 个客户，{{groupUserData.ygCount}}个企业内部成员</div>
                        <div class="btn" @click="toGroupDetail">
                            <span class="a">群聊详情</span>
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
                                    <div class="alt" v-if="item.admintype != 1 && item.type == 2 && item.customerType == 1">@微信</div>
                                    <div class="alt yellow" v-if="item.admintype != 1 && item.type == 2 && item.customerType == 2">{{item.corpName}}</div>
                                    <div class="tag red" v-if="item.admintype == 1">群主</div>
                                    <div class="tag" v-if="item.admintype != 1 && item.type == 1">员工</div>
                                    <div class="tag green" v-if="item.admintype != 1 && item.type == 2 && item.customerType == 1">客户</div>
                                    <div class="tag yellow" v-if="item.admintype != 1 && item.type == 2 && item.customerType == 2">企业客户</div>
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
        <!-- 写跟进弹窗 -->
        <DialogComment v-model="dialog_xgj" title="写跟进" @sure="followUpFun"></DialogComment>
        <!-- 商机详情 -->
        <OpportunityDialog v-model="dialog_sj"></OpportunityDialog>
        <!-- 操作按钮弹窗面板 -->
        <operation-btn-box ref="operationBtnBox" :fromType="fromType" @doAction="doAction"></operation-btn-box>
        <!-- 放弃警告 -->
        <give-up-customer ref="giveUpCustomer" :fromType="fromType" @doGiveUp="doGiveUp"></give-up-customer>
        <!-- 变更负责人 -->
        <change-director ref="changeDirector" :fromType="fromType"></change-director>
    </div>
</template>

<script>
import { Dynamics, Group, Enclosure, DialogComment, OpportunityDialog, TopCard } from '../customer/components'
import { user_getUserName } from '@/api/home'
import {
    cluecustomer_getClueCustomerByid,
    group_getMobileCustomerGroupPage,
    group_getMobileGroupUserlist,
    clueCustomerFollowUser_addCommentInfo,  //添加评论回复
    clueCustomerFollowUser_message_notificatio, //添加消息回复 （@）
    cluecustomer_addMessage,    //写跟进
    cluecustomer_giveUpType, // 放弃
} from '@/api/customer'
import Opportunities from '@/components/BusinessOpportunities/opportunities'
import MessageBox from "@/components/CustomerManage/messageBox"
import RemindersBox from '@/components/CustomerManage/dialog/remindersBox'
import GiveUpCustomer from '@/components/CustomerManage/dialog/giveupCustomer'
import ChangeDirector from '@/components/CustomerManage/dialog/changeDirector'
import OperationBtnBox from '@/components/CustomerManage/operationBtnBox'
export default {
    components: {
        Dynamics,
        Group,
        Enclosure,
        DialogComment,
        OpportunityDialog,
        TopCard,
        Opportunities,
        MessageBox,
        RemindersBox,
        GiveUpCustomer,
        ChangeDirector,
        OperationBtnBox
    },
    provide() {
        return {
            goDetail: this.goDetail,
            showCompany: this.showCompany,
            showGuideBox: this.showGuideBox,
            showRemindersBox: this.showRemindersBox,
            messageNotificatio: this.messageNotificatio,
            getPeople: this.getPeople,
        }
    },
    data(){
        return {
            fromType: this.$route.query.fromType,
            id: this.$route.query.id,
            code: this.$route.query.userNo,
            num: this.$route.query.num,
            showPortraitType: 0,
            dialog_group: false,
            dialog_xx: false,
            dialog_xgj: false,
            dialog_sj: false,

            navList: [
                { name: '客户动态',code: 'dynamics'},
                { name: '商机',code: 'niche',num: 0},
                { name: '客户群',code: 'group',num: 0},
                { name: '附件',code: 'enclosure',num: 0},
            ],
            navActive: 'dynamics',

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
        }
    },
     computed: {
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
    },
    mounted(){
        this.getCustomerDetail()
        this.getUserName()
    },
    methods: {
        jumpFun(code){      //锚点跳转
            // console.log('code',code,document.querySelector(`#${code}`))
            const returnEle = document.querySelector(`#${code}`);  //productId是将要跳转区域的id
            if (!returnEle) {
                returnEle.scrollIntoView(true); // true 是默认的
            }
            document.querySelector(`#${code}`).scrollIntoView(true); //这里的counter1是将要返回地方的id
        },
        getCustomerDetail(){    //获取客户详情
            cluecustomer_getClueCustomerByid(this.code).then(res => {
                if(res.result){
                    let data = res.data

                    this.customerInfo = data.clueCustomerVO
                    this.userList = data.directorList
                    this.tagList = data.tagList.filter((el,index) => {
                        return index < 3
                    })
                    this.navList.forEach(el => {
                        if(el.code == 'niche'){
                            el.num = data.mobileDataCount.busCount
                        }else if(el.code == 'group'){
                            el.num = data.mobileDataCount.groupCount
                        }else if(el.code == 'enclosure'){
                            el.num = data.mobileDataCount.encCount
                        }
                    })

                    this.getCustomerGroupList()
                }
            })
        },
        getUserName(){  //获取权限数据
            user_getUserName().then(res => {
                if(res.result){
                    let data = res.data
                    this.showSecret = !data.haveSecret
                    this.sendUserInfo = data && data.userEntity
                }
            })
        },
        getCustomerGroupList(){     //获取客户群列表
            this.searchGroup.customerNo = this.customerInfo.clueCustomerNo
            group_getMobileCustomerGroupPage(this.searchGroup).then(res => {
                if(res.result){
                    let data = res.data
                    this.groupList = data.records
                    this.groupTotal = data.total

                    let { comeFrom } = this.$route.query
                    if(comeFrom == 'messageCard'){
                        this.$refs.dynamic.navClickFun(3)
                    }
                }
            })
        },
        getGroupUserList(id){   //获取群群员列表
            this.groupChatId = id
            group_getMobileGroupUserlist(id).then(res => {
                if(res.result){
                    this.groupUserData = res.data.dataCount
                    this.groupUserList = res.data.allList
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
            switch (type) {
                case 'writeFollowUp':    // 写跟进
                    this.openDialog('', 'follow')
                    break;
                case 'changeDirector':    // 变更负责人
                    this.$refs.changeDirector.show(this.customerInfo.clueCustomerNo)
                    break;
                case 'giveUp':   // 放弃
                    this.$refs.giveUpCustomer.show()
                    break;
                default:
                    break;
            }
            this.$refs.operationBtnBox.hide()
        },
        // 放弃
        doGiveUp() {
            let params = {
                clueCustomerNo: this.customerInfo.clueCustomerNo,
                type: this.fromType,
            }

            cluecustomer_giveUpType(params).then((res) => {
                if (res.result) {
                    this.$router.go(-1)
                    this.$toast('操作成功')
                }
            })
        },
        openDialog(id, type){  //打开回复弹窗
            this.rowId = id
            switch (type) {
                case 'comment':   //消息回复
                    this.dialog_xx = true
                    break;
                case 'detail':    //商机详情
                    this.dialog_sj = true
                    break;
                case 'follow':    //写跟进
                    this.dialog_xgj = true
                    break;
                default:
                    break;
            }
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
        followUpFun(val){  //写跟进
            console.log('val 写跟进',val)
            let data = {
                clueCustomerNo: this.customerInfo.clueCustomerNo,
                context: val,
            }
            cluecustomer_addMessage(data).then(res => {
                if(res.result){
                    this.$toast('操作成功')
                    this.dialog_xgj = false
                    this.$refs.dynamic.searchFun()
                }
            })
        },
        navClickFun(code){
            this.navActive = code
            switch (code) {
                case 'dynamics':    //客户动态
                    // this.getSelectFollowMsgList()
                    break;
                case 'niche':   //商机
                    
                    break;
                case 'group':   //客户群
                    this.getCustomerGroupList()
                    break;
                case 'enclosure':   //附件
                    
                    break;
                default:
                    break;
            }
        },
        showRemindersBox() {
            this.$refs.remindersBox.show()
        },
        getPeople(data) {
            let arr = JSON.parse(JSON.stringify(this.$refs.messageBox.receiveUserInfo))

            arr.push(data)
            this.$refs.messageBox.receiveUserInfo = this.resetReceiveUserInfo(arr)
            this.$refs.remindersBox.hide()
        },
        resetReceiveUserInfo(arr) {
            let newArr = []
            for (let i = 0; i < arr.length; i++) {
                if (this.noHas(newArr, arr[i].userNo)) {
                    newArr.push(arr[i])
                }
            }
            return newArr
        },
        noHas(arr, userNo) {
            let result = arr.filter((item) =>{
                return item.userNo == userNo;
            })
            return result.length == 0 ? true : false;
        },
        messageNotificatio(receiveUserInfo, message) {
            if (!this.checkBeforeSend(receiveUserInfo, message)) {
                return
            }
            const { avatar = '', name = '', userNo = '' } = this.sendUserInfo

            let params = {
                content: message,
                customerNo: this.customerInfo && this.customerInfo.clueCustomerNo,
                receiveUserInfo,
                sendUserInfo: {
                    avatar,
                    userName: name,
                    userNo
                }
            }
            clueCustomerFollowUser_message_notificatio(params).then(res => {
                if(res.result){
                    this.$refs.messageBox.initData()
                    this.$refs.dynamic.searchFun()
                }
            })
        },
        checkBeforeSend(receiveUserInfo, message) {
            if (!receiveUserInfo || receiveUserInfo && !receiveUserInfo.length) {
                this.$toast('接收人不能为空')
                return false
            } else if (!message) {
                this.$toast('消息内容不能为空')
                return false
            }
            return true
        },
        toFun(val){
            let name = ''
            if(val == 'helper'){    //查看协助人
                name = 'helper'
            }else if(val == 'detail'){    //详情
                name = 'CustomerDetail'
            }
            this.$router.push({
                name: name,
                query: { id: this.customerInfo.clueCustomerNo },
            })
        },
        toGroupDetail(){    //群聊详情
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
                        }
                        .alt{
                            color: @green;
                            margin-left: 4px;
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
        height: 76px;
        pointer-events: none;
        position: fixed;
        bottom: 200px;
        left: 50%;
        z-index: 9;
        .follow_up{
            width: 76px;
            height: 76px;
            background: rgba(0, 0, 0, .4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            right: 24px;
            top: 0;
            .icon{
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>