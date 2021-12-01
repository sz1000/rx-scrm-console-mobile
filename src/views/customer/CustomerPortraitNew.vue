<template>
    <div class="customer_wrap">
        <img class="bg" src="@/assets/svg/customer_bg.svg" alt="">
        <div class="top_box">
            <div class="customer_card">
                <!-- <div class="score">7832分</div> -->
                <div class="info_box">
                    <div class="avatar">
                        <img class="img" :src="customerInfo.avatar">
                    </div>
                    <div class="val">
                        <div class="name_box">
                            <div class="name">{{customerInfo.name}}</div>
                            <div class="alt" v-if="customerInfo.customerType">{{customerInfo.customerType == 1 ? '@微信' : `@${customerInfo.customerName}`}}</div>
                            <div class="icon">
                                <img src="../../images/icon_female@2x.png" v-if="customerInfo.gender == '2'" />
                                <img src="../../images/man.png" v-if="customerInfo.gender == '1'" />
                            </div>
                        </div>
                        <div class="p">{{customerInfo.mobil}}</div>
                        <div class="p">{{customerInfo.cropFullName}}</div>
                        <div class="person">
                            <div class="img_box" :class="`m${personList.length}`">
                                <img class="img" :src="item.avatar" v-for="(item,index) in personList" :key="index">
                            </div>
                            <div class="text">{{getUserObj('name')}}等{{userList.length}}人</div>
                            <img class="icon_next" src="@/assets/svg/icon_next_gray.svg">
                        </div>
                    </div>
                </div>
                <div class="tag_box" :class="{'opt0':tagList.length == 0}">
                    <span class="tag">nice</span>
                    <span class="tag">有意向购买</span>
                    <span class="tag">优质客户</span>
                </div>
            </div>
        </div>
        <div class="nav_box">
            <div class="nav" @click="navClickFun(item.code)" :class="{'cur':item.code == navActive}" v-for="item in navList" :key="item.code">{{item.name}}<span v-if="item.num">({{item.num}})</span></div>
        </div>
        <div class="content" :class="{'pd0':navActive == 'group'}">
            <!-- 客户动态 -->
            <dynamics v-if="navActive == 'dynamics'" :time="timeList" :data="dataList" @sure="getSelectFollowMsgList" @fillMessage="getPeople"></dynamics>
            <!-- 商机 -->
            <opportunities v-if="navActive == 'niche'" :customerNo="customerInfo && customerInfo.clueCustomerNo" fromType="3"></opportunities>
            <!-- 群聊 -->
            <group :data="groupList" v-if="navActive == 'group'" @sure="getGroupUserList"></group>
            <!-- 附件 -->
            <fujian v-if="navActive == 'enclosure'" :isPortrait="1"></fujian>
        </div>
        <!-- 协助人消息输入框 -->
        <message-box v-if="navActive == 'dynamics'" ref="messageBox"></message-box>
        <!-- 协助人选择弹窗 -->
        <reminders-box ref="remindersBox" :customerNo="customerInfo && customerInfo.clueCustomerNo"></reminders-box>
        <!-- 群成员列表 -->
        <van-popup @touchmove.prevent position="bottom" round v-model="dialog_group" :lock-scroll="true" :safe-area-inset-bottom="true">
            <div class="dialog_wrap">
                <div class="dialog_header">
                    <div class="title">群成员列表</div>
                    <img class="close" @click="dialog_group = false" src="@/assets/svg/icon_close.svg" alt="">
                    <div class="total_box">
                        <div class="total">共 {{groupUserData.total}} 个群成员，{{groupUserData.cusCount}} 个客户，{{groupUserData.ygCount}}个企业内部成员</div>
                        <div class="btn">
                            <span class="a">群聊详情</span>
                            <img class="icon" src="@/assets/svg/icon_next_blue.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="dialog_content">
                    <div class="list">
                        <div class="li" v-for="(item,index) in groupUserList" :key="index">
                            <!-- <div class="avatar"></div> -->
                            <img class="avatar" :src="item.avatar" alt="">
                            <div class="val">
                                <div class="tit_box">
                                    <div class="tit">{{item.name}}</div>
                                    <div class="alt">@微信</div>
                                    <div class="tag">员工</div>
                                </div>
                                <div class="time">2021-12-12 13:24</div>
                                <div class="opera_right">
                                    <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Dynamics,Group } from './components'
import { user_getUserName } from '@/api/home'
import { MessageNotificatio } from '../../config/api'
import {
    cluecustomer_getClueCustomerByid,
    clueCustomerFollowUser_selectFollowMsgList,
    group_getMobileCustomerGroupPage,
    group_getMobileGroupUserlist,
} from '@/api/customer'
import Fujian from "../customerManage/comTip/fujian"
import Opportunities from '@/components/BusinessOpportunities/opportunities'
import MessageBox from "@/components/CustomerManage/messageBox"
import RemindersBox from '@/components/CustomerManage/dialog/remindersBox'
export default {
    components: {
        Dynamics,Group,
        Opportunities,Fujian,MessageBox,RemindersBox
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
            showPortraitType: 0,
            dialog_group: false,

            navList: [
                { name: '客户动态',code: 'dynamics'},
                { name: '商机',code: 'niche',num: 3},
                { name: '客户群',code: 'group',num: 5},
                { name: '附件',code: 'enclosure',num: 1},
            ],
            navActive: 'dynamics',

            customerInfo: {},
            userList: [],
            timeList: [],
            dataList: [],
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
        personList(){
            let list = this.userList
            return list && list.length ? list.slice(0,3) : ''
        },
    },
    mounted(){
        this.getCustomerDetail()
        this.getUserName()
    },
    methods: {
        getCustomerDetail(){    //获取客户详情
            let id = this.userId || 
            // 'woyPDZEQAAiC1soXYe2zmSfXJTFmgVqQ'
            // 'wmyPDZEQAAathBnqj2G6xYkqbLTZBu9w'
            // 'woyPDZEQAAKN_BGnwemNjnTqtjllE71g'
            // 'woyPDZEQAANKdNIy7tiPKdWh4HGqhrZw'
            // 'woyPDZEQAAsU15Y6_nJ6uNYQzGf6sbcA'  //更新客户信息
            // 'woyPDZEQAAdsUF6NtjIrKh6_NqD-mwnQ'  //协助人
            'woyPDZEQAArynDzUMWHKQZTy_XMj7rPg'  //协助人、商机、附件
            // 'woY-gRDAAAd9kSNXH541UDExp7IHHZjw'  //协助人、附件
            // 'woyPDZEQAA5NKt4Bw12Ri3N02Tz2cNmQ'  //更新协助人，客户信息、附件
            // 'woyPDZEQAA2IR5xonK_JD04coOUHVyzg'  //添加协助人
            // 'woyPDZEQAAWRYc71z2QntxYx_vCx96zg'  //跟进记录
            // 'woyPDZEQAA_MAhjlSBaGyeqbpxB2rkxA'  //拜访客户
            // 'woyPDZEQAAW1UxaUrQ1LIgmDZ_5YfNjw'  //商机
            cluecustomer_getClueCustomerByid(id).then(res => {
                if(res.result){
                    let data = res.data
                    this.customerInfo = data.clueCustomerVO
                    this.userList = data.directorList
                    this.tagList = data.tagList
                    this.navList.forEach(el => {
                        if(el.code == 'code'){
                            el.num = data.mobileDataCount.busCount
                        }else if(el.code == 'group'){
                            el.num = data.mobileDataCount.groupCount
                        }else if(el.code == 'enclosure'){
                            el.num = data.mobileDataCount.encCount
                        }
                    })

                    this.getSelectFollowMsgList()
                    this.getCustomerGroupList()
                }
            })
        },
        getUserName(){  //获取权限数据
            user_getUserName().then(res => {
                if(res.result){
                    if(res.result){
                        let data = res.data
                        this.showSecret = !data.haveSecret
                        this.sendUserInfo = data && data.userEntity
                    }
                }
            })
        },
        getSelectFollowMsgList(i){   //获取客户跟进信息
            console.log('sure',i)
            let params = {
                page: 1,
                limit: 50,
                clueCustomerNo: this.customerInfo && this.customerInfo.clueCustomerNo,
                punckStatus: i == 1 || !i ? '' : i // ''：全部动态，1：跟进动态，2：客户或线索动态，3：商机动态
            }
            clueCustomerFollowUser_selectFollowMsgList(params).then(res => {
                if(res.result){
                    let data = res.data
                    let list = data.dataList.records
                    if(list && list.length > 0){
                        list.forEach(el => {
                            /*-start-*
                             * 6.变更负责人 7.分配客户 8.领取客户
                             * 9.放弃客户 11.附件 13.跟进记录 14.拜访客户 15.新增商机 16.修改商机
                             * 17.删除商机 21.互动协同 26.新增标签 28.自动打标
                             * 41.添加企微好友
                             * -end-*/ 
                            let dotList = [6,7,8,9,11,13,14,26,28]
                            if(dotList.indexOf(el.optType) > -1){
                                el.class = 'dot'
                            }
                            let whiteList = [15,16,17,21]
                            if(whiteList.indexOf(el.optType) > -1){
                                el.context = JSON.parse(el.context)
                            }
                            let newsList = [21]
                            if(newsList.indexOf(el.optType) > -1){
                                el.class = 'opera'
                                el.more = false
                            }
                        })
                    }
                    this.timeList = data.dateList
                    this.dataList = list
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
                }
            })
        },
        getGroupUserList(id){   //获取群群员列表
            group_getMobileGroupUserlist(id).then(res => {
                if(res.result){
                    this.groupUserData = res.data.dataCount
                    this.groupUserList = res.data.allList
                    this.dialog_group = true
                }
            })
        },
        navClickFun(code){
            this.navActive = code
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
        async messageNotificatio(receiveUserInfo, message) {
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

            let { code, msg } = await MessageNotificatio(params)

            if (code == 'success') {
                this.$refs.dynamic.changeDynamicNav(3)
                this.$refs.messageBox.initData()
            }
            this.$toast(msg)
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
                height: 1px;
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
                        }
                        .tag{
                            margin-left: 8px;
                            height: 32px;
                            line-height: 30px;
                            font-size: 20px;
                            color: @main;
                            background: rgba(@main,.06);
                            padding: 0 16px;
                            border-radius: 21px;
                            border: 1px solid @main;
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
                    font-weight: bold;
                }
                .alt{
                    font-size: 24px;
                    line-height: 32px;
                    color: @yellow;
                    margin-left: 8px;
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
                border: 1px solid @bdColor;
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
                        border: 1px solid @white;
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
                    line-height: 50px;
                    color: @fontSub1;
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
            border-top: 1px solid @lineColor;
            &.opt0{
                opacity: 0;
            }
            .tag{
                height: 52px;
                line-height: 50px;
                padding: 0 16px;
                border-radius: 26px;
                border: 1px solid @bdColor;
                font-size: 28px;
                color: @fontSub1;
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
    border-bottom: 1px solid @lineColor;
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
}
</style>