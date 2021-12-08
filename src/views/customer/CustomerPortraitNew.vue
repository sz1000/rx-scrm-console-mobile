<template>
    <div class="customer_wrap" :class="{'glass':dialog_xzr}">
        <img class="bg" :style="{'transform':`translateY(-${bgY})`}" src="@/assets/svg/customer_bg.svg" alt="">
        <div class="top_box">
            <div class="customer_card" @click="goDetail">
                <!-- <div class="score">7832分</div> -->
                <div class="info_box">
                    <div class="avatar">
                        <img class="img" :src="customerInfo.avatar | $setAvatar">
                    </div>
                    <div class="val">
                        <div class="name_box">
                            <div class="name">{{customerInfo.name}}</div>
                            <div class="alt" :class="{'green':customerInfo.customerType == 1}" v-if="customerInfo.customerType">{{customerInfo.customerType == 1 ? '@微信' : `@${customerInfo.customerName}`}}</div>
                            <div class="icon">
                                <img src="../../images/icon_female@2x.png" v-if="customerInfo.gender == '2'" />
                                <img src="../../images/man.png" v-if="customerInfo.gender == '1'" />
                            </div>
                        </div>
                        <div class="p">{{customerInfo.mobil}}</div>
                        <div class="p">{{customerInfo.cropFullName}}</div>
                        <div class="person" @click.stop="toFun">
                            <div class="img_box" :class="`m${personList.length}`">
                                <img class="img" :src="item.avatar" v-for="(item,index) in personList" :key="index">
                            </div>
                            <div class="text">
                                <span class="limit">{{getUserObj('name')}}</span>
                                <span class="son">等{{userList.length}}人</span>
                            </div>
                            <img class="icon_next" src="@/assets/svg/icon_next_gray.svg">
                        </div>
                    </div>
                </div>
                <div class="tag_box" :class="{'opt0':tagList.length == 0}">
                    <div class="tag" v-for="(item,index) in tagList" :key="index">{{item.name | limitFilter}}</div>
                </div>
            </div>
        </div>
        <div class="nav_box">
            <div class="nav" @click="navClickFun(item.code)" :class="{'cur':item.code == navActive}" v-for="item in navList" :key="item.code">{{item.name}}<span v-if="item.num">({{item.num}})</span></div>
        </div>
        <div class="content" :class="{'pd0':navActive == 'group'}">
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
        <div class="follow_up" v-if="navActive == 'dynamics'" @click="openDialog('','follow')">
            <img class="icon" src="@/assets/svg/icon_add.svg" alt="">
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
        <!-- 申请成为协助人 -->
        <ApplyHelp v-model="dialog_xzr" :id="customerInfo.clueCustomerNo" :data="applyData" :isApply="isApply"></ApplyHelp>
    </div>
</template>

<script>
import { Dynamics,Group,Enclosure,DialogComment,OpportunityDialog,ApplyHelp } from './components'
import { user_getUserName } from '@/api/home'
import {
    cluecustomer_getClueCustomerByid,
    group_getMobileCustomerGroupPage,
    group_getMobileGroupUserlist,
    clueCustomerFollowUser_addCommentInfo,  //添加评论回复
    clueCustomerFollowUser_message_notificatio, //添加消息回复 （@）
    cluecustomer_addMessage,    //写跟进
} from '@/api/customer'
import Opportunities from '@/components/BusinessOpportunities/opportunities'
import MessageBox from "@/components/CustomerManage/messageBox"
import RemindersBox from '@/components/CustomerManage/dialog/remindersBox'
export default {
    components: {
        Dynamics,Group,Enclosure,DialogComment,OpportunityDialog,ApplyHelp,
        Opportunities,MessageBox,RemindersBox
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
            id: this.$route.query.id,
            code: this.$route.query.userNo,
            num: this.$route.query.num,
            showPortraitType: 0,
            dialog_group: false,
            dialog_xx: false,
            dialog_xgj: false,
            dialog_sj: false,
            dialog_xzr: false,
            isApply: false,     //是否已经申请成为协助人 且还未通过

            applyData: {},

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
        console.log('asd',this.$route.query.name)
        this.getCustomerDetail()
        this.getUserName()
    },
    methods: {
        isDirectorFun(data){    //是否是相关负责人协助人 及相关数据
            this.dialog_xzr = Number(data.permFlag) ? false : true
            this.isApply = data.isApply ? true : false
            let directorList = data.directorList
            let depName = directorList && directorList.length && directorList[0].depId ? `-${directorList[0].depId}` : ''
            this.applyData = {
                customerName: data.clueCustomerVO.name,
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
            if(comeFrom == 'messageCard'){
                id = name
            }else{
                if(this.code){
                    id = this.code
                }
            }
            // 'woyPDZEQAAiC1soXYe2zmSfXJTFmgVqQ'
            // 'wmyPDZEQAAathBnqj2G6xYkqbLTZBu9w'
            // 'woyPDZEQAAKN_BGnwemNjnTqtjllE71g'
            // 'woyPDZEQAANKdNIy7tiPKdWh4HGqhrZw'
            // 'woyPDZEQAAsU15Y6_nJ6uNYQzGf6sbcA'  //更新客户信息
            // 'woyPDZEQAAdsUF6NtjIrKh6_NqD-mwnQ'  //协助人
            // 'woY-gRDAAAd9kSNXH541UDExp7IHHZjw'  //协助人、附件
            // 'woyPDZEQAA5NKt4Bw12Ri3N02Tz2cNmQ'  //更新协助人，客户信息、附件
            // 'woyPDZEQAA2IR5xonK_JD04coOUHVyzg'  //添加协助人
            // 'woyPDZEQAAWRYc71z2QntxYx_vCx96zg'  //跟进记录
            // 'woyPDZEQAA_MAhjlSBaGyeqbpxB2rkxA'  //拜访客户
            // 'woyPDZEQAAW1UxaUrQ1LIgmDZ_5YfNjw'  //商机
            cluecustomer_getClueCustomerByid(id).then(res => {
                if(res.result){
                    let data = res.data
                    this.isDirectorFun(data)
                    // this.isApply = data.permFlag ? true : false
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
                    // this.isDirector()
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
        toFun(){    //查看协助人
            localStorage.setItem('helperData',JSON.stringify(this.userList))
            localStorage.setItem('customerId',this.customerInfo.clueCustomerNo)
            this.$router.push('/helper')
        },
        goDetail() {
            this.$router.push({
                name: 'informationDetail',
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
        getUserObj(n = 'num'){
            let list = this.userList
            if(!list || list.length == 0){return}
            let _str = null,arr = [],str = ''
            list.forEach((el,index) => {
                if(index < 3){
                    arr.push(el.name)
                }
            })
            // if(n == 'num'){
            //     _str = list.length > 3 ? 3 : list.length
            // }else{
            //     _str = arr.join('、')
            // }
            str = arr.join('、')
            // console.log('asd',_str,arr,str)
            return str
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
        limitFilter(val){
            return val && val.length > 6 ? val.substring(0,5) + '...' : val
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
  .top_box{
    width: 100%;
    padding: 32px;
    .customer_card {
        width: 100%;
        // min-height: 392px;
        background: @white;
        box-shadow: 0px 10px 32px 0px rgba(0, 0, 0, 0.07);
        border-radius: 24px;
        padding: 40px 32px 24px 32px;
        position: relative;
        .score{
            width: 136px;
            height: 56px;
            background: linear-gradient(186deg, #76A1FB 0%, #4168F6 100%);
            border-radius: 0 22px 0px 35px;
            line-height: 56px;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            color: @white;
            position: absolute;
            top: 0;
            right: 0;
        }
        .info_box{
            width: 100%;
            display: flex;
            margin-bottom: 32px;
        }
        .avatar{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background: rgba(@placeholder,.2);
            margin-right: 32px;
            font-size: 0;
            .img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .val{
            width: calc(100% - 152px);
            .name_box{
                display: flex;
                align-items: flex-end;
                margin-bottom: 16px;
                .name{
                    color: @fontMain;
                    line-height: 48px;
                    font-size: 36px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: calc(100% - 200px);
                    font-weight: bold;
                }
                .alt{
                    font-size: 24px;
                    line-height: 32px;
                    color: @yellow;
                    max-width: 160px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-left: 8px;
                    &.green{
                        color: @green;
                    }
                }
                .icon{
                    width: 26px;
                    height: 26px;
                    font-size: 26px;
                    margin-left: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .p{
                font-size: 28px;
                line-height: 36px;
                color: @fontSub1;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-bottom: 16px;
            }
            .person{
                width: fit-content;
                height: 52px;
                border-radius: 26px;
                border: 1px solid @bdColor; /*no*/
                display: flex;
                align-items: center;
                padding: 0 16px;
                .img_box{
                    display: flex;
                    width: 32px;
                    margin-right: 10px;
                    &.m2{
                        width: calc(32px * 1.75);
                    }
                    &.m3{
                        width: calc(32px * 2.5);
                    }
                    &.m4{
                        width: calc(32px * 3.25);
                    }
                    &.m5{
                        width: calc(32px * 4);
                    }
                    .img{
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        border-radius: 50%;
                        border: 1px solid @white; /*no*/
                        &:nth-child(2){
                            transform: translateX(-25%);
                        }
                        &:nth-child(3){
                            transform: translateX(-50%);
                        }
                        &:nth-child(4){
                            transform: translateX(-75%);
                        }
                        &:nth-child(5){
                            transform: translateX(-100%);
                        }
                    }
                }
                .text{
                    font-size: 20px;
                    color: @fontSub1;
                    span{
                        line-height: 30px;
                        display: inline-block;
                        vertical-align: middle;
                        padding: 10px 0;
                    }
                    .limit{
                        max-width: calc(100vw - 560px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .icon_next{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .tag_box{
            display: flex;
            align-items: center;
            padding-top: 24px;
            // border-top: 1px solid @lineColor;   /*no*/
            position: relative;
            &::before{
                content: '';
                width: 100%;
                height: 1px;   /*no*/
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                left: 0;
                top: 0;
            }
            &.opt0{
                opacity: 0;
            }
            .tag{
                height: 52px;
                line-height: 50px;
                padding: 0 16px;
                border-radius: 26px;
                border: 1px solid @bdColor; /*no*/
                font-size: 28px;
                
                // height: 104px;
                // line-height: 100px;
                // padding: 0 32px;
                // border-radius: 52px;
                // border: 1px solid @bdColor; /*no*/
                // font-size: 56px;
                color: @fontSub1;
                // transform: scale(.5);
                &+.tag{
                    margin-left: 16px;
                }
            }
        }
    }
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
  .follow_up{
    width: 76px;
    height: 76px;
    background: rgba(0, 0, 0, .4);
    border-radius: 50%;
    position: fixed;
    right: 24px;
    bottom: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
        width: 40px;
        height: 40px;
    }
  }
}
</style>