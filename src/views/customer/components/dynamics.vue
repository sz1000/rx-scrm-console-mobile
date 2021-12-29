<template>
    <div class="dynamics_box">
        <div class="type_box">
            <div class="type" @click="navClickFun(index)" :class="{'cur':activeIndex == index,'dot':index == 3 && isPoint}" v-for="(item,index) in navList" :key="index">{{item}}</div>
        </div>
        <div class="time_list">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了~"
                :immediate-check="false"
                @load="onLoad">
                <div class="li" :id="`m${item.id}`" :class="[item.class,{'last':list.length-1 == index}]" v-for="(item,index) in list" :key="index">
                    <div class="icon_box">
                        <img class="icon" v-if="item.class == 'day'" src="@/assets/svg/icon_time.svg" alt="">
                        <img class="icon" v-if="item.class == 'dot'" src="@/assets/svg/icon_cir.svg" alt="">
                        <img class="icon" v-if="item.optType == 1" src="@/assets/svg/icon_jd.svg" alt="">
                        <img class="icon" v-if="item.optType == 21" src="@/assets/svg/icon_gt.svg" alt="">
                        <img class="icon" v-if="item.optType == 15 || item.optType == 16 || item.optType == 17" src="@/assets/svg/icon_sj.svg" alt="">
                        <img class="icon" v-if="helperNum.indexOf(item.optType) > -1" src="@/assets/svg/icon_xzr.svg" alt="">
                        <img class="icon" v-if="item.optType == 29 || item.optType == 30" src="@/assets/svg/icon_jh.svg" alt="">
                        <img class="icon" v-if="item.optType == 40" src="@/assets/svg/icon_sc.svg" alt="">
                        <img class="icon" v-if="item.optType == 41" src="@/assets/svg/icon_wx.svg" alt="">
                    </div>
                    <div class="val">
                        <div class="show_day" v-if="item.class == 'day'">{{item.title}}<span class="total" v-if="item.total > 0">({{item.total}}条)</span><span class="total" v-else>(暂无动态)</span></div>
                        <div class="card" v-if="item.class != 'day' && item.class != 'opera'">
                            <div class="tit">{{item.optName || item.title}}</div>
                            <div class="text tips" v-if="item.optType == 28">
                                <img class="icon" src="@/assets/svg/icon_tip.svg" alt="">
                                <span>{{getTextFun(item)}}</span>
                            </div>
                            <div class="text" v-else>
                                <!-- optType 等于0的时候是旧数据 -->
                                <div class="name" v-if="item.optType && item.optUserName">
                                    <img class="avatar" :src="item.optAvatar | $setAvatar" alt="">
                                    <span>{{item.optUserName}}</span>
                                </div>
                                <span class="mr8">{{getTextFun(item)}}</span>
                                <div class="name" v-if="item.fromUser && item.optType != 44 && fromUserNum.indexOf(item.optType) > -1">
                                    <img class="avatar" :src="item.fromUser.avatar | $setAvatar" alt="">
                                    <span>{{item.fromUser | optString}}</span>
                                </div>
                                <span class="mr8" v-if="item.optType && item.toUser && item.optType == 6">变更为</span>
                                <div class="name" v-if="item.optType && item.toUser && item.optType == 6">
                                    <img class="avatar" :src="item.toUser.avatar | $setAvatar" alt="">
                                    <span>{{item.toUser | optToString}}</span>
                                </div>
                                <div class="name_box" v-if="item.optType && item.toUser && item.toUser.length && item.toUser[0]">
                                    <div class="name" v-for="(us,ri) in item.toUser" :key="ri">
                                        <img class="avatar" :src="us.avatar | $setAvatar" alt="">
                                        <span>{{us | optString}}</span>
                                    </div>
                                </div>
                                <a class="link" :href="item.ossUrl" v-if="item.optType == 11">{{item.ossObjectname}}</a>
                                <div class="apply_opera" v-if="isDirector && item.optType == 44 && !item.optFlag">
                                    <div class="btn" @click="reviewFun('pass',item)">通过</div>
                                    <div class="btn" @click="reviewFun('nopass',item)">拒绝</div>
                                </div>
                            </div>
                            <div class="time">{{item.createTime | $time('YYYY-MM-DD HH:mm')}}</div>
                        </div>
                        <div class="card" v-if="item.class == 'opera'" :class="{'hide':!item.more,'no': !item.commentCount}">
                            <div class="info">
                                <div class="img_box" @click="fillMessage(item.context.sendUserInfo)">
                                    <img :src="item.optAvatar | $setAvatar" alt="">
                                </div>
                                <div class="name">{{item.optUserName}}<span>{{isMeFun(item.createBy)}}</span></div>
                            </div>
                            <div class="time">{{item.createTime | $time('YYYY-MM-DD HH:mm')}}</div>
                            <div class="text">
                                <a class="link alt mr8">{{item.context.receiveUserInfo | alt}}</a>
                                <span>{{item.context.content}}</span>
                            </div>
                            <div class="opera_right">
                                <div class="icon_btn" @click="addFabulous(item)">
                                    <img class="iconfont" v-if="item.dzFlag" src="@/assets/svg/icon_dz_red.svg" alt="">
                                    <img class="iconfont" v-else src="@/assets/svg/icon_dz.svg" alt="">
                                    <div class="num" :class="{'hide':!item.praise}">{{item.praise}}</div>
                                </div>
                                <div class="icon_btn" @click="openDialog(item,'comment')">
                                    <img class="iconfont" src="@/assets/svg/icon_pl.svg" alt="">
                                    <div class="num" :class="{'hide':!item.commentCount}">{{item.commentCount}}</div>
                                </div>
                            </div>
                            <div class="msg_box" v-if="item.commentCount && item.more">
                                <div class="msg_li" v-for="(son,i) in item.msgList" :key="i">
                                    <div class="msg_info">
                                        <img class="msg_img" :src="son.avatar | $setAvatar" alt="">
                                        <div class="msg_name">{{son.fromUserName}}</div>
                                    </div>
                                    <div class="msg_text">{{son.content}}</div>
                                    <div class="time">{{son.createTime | $time('YYYY-MM-DD HH:mm')}}</div>
                                </div>
                            </div>
                            <div class="more" v-if="item.commentCount" @click="getComentList(item)">
                                <img class="icon" v-if="!item.more" src="@/assets/svg/icon_down.svg" alt="">
                                <img class="icon" v-else src="@/assets/svg/icon_up.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { _throttle } from '@/utils/tool'
import {
    clueCustomerFollowUser_selectFollowMsgList, //list
    clueCustomerFollowUser_message, //是否有新消息
    clueCustomerFollowUser_giveTheThumbsUp, //点赞
    clueCustomerFollowUser_queryCommentInfoList,  //回复
    clueCustomerFollowUser_approveHelperpplication,     //协助人审批
} from '@/api/customer'
export default {
    name: 'Dynamics',
    props: {
        fromType: {
            default: '0'
        },
        id: {
            type: String,
            default: ''
        },
        did: {  //负责人Id
            type: String,
            default: ''
        },
    },
    data(){
        return {
            num: this.$route.query.num,
            activeIndex: 0,
            fromUserNum: [6],
            helperNum: [18,19,20,39,44,46,47,48],
            
            followMsgSearch: {
                page: 1,
                limit: 10,
                clueCustomerNo: '',
                punckStatus: '' // ''：全部动态，3：商机动态，4：互动协同（跟进记录），5：群动态，6：线索动态
            },
            time: [],
            data: [],
            noListLoading: false,
            finished: false,
            loading: false,
            
            isAdd: true,
            isPoint: false, //是否有新消息 红色圆点展示
        }
    },
    computed: {
        userNo(){
            return this.$store.getters.userNo
        },

        // 动态导航
        navList() {
            if (this.fromType == 1) {
                return ['全部', '线索动态', '跟进记录']
            }
            if (this.fromType == 2) {
                return ['全部', '线索动态']
            }
            if (this.fromType == 3) {
                return ['全部', '客户动态', '商机动态', '跟进记录']
            }
            if (this.fromType == 4) {
                return ['全部', '客户动态', '商机动态']
            }
            return ['全部', '客户动态', '商机动态', '跟进记录']
        },
        list(){
            let arr = this.data && this.data.length ? JSON.parse(JSON.stringify(this.data)): [],n = 0
            if(this.time && this.time.length > 0){
                this.time.forEach(el => {
                    let obj = {
                        class: 'day',
                        title: el.dataTime,
                        total: el.dataCount,
                    }
                    if(el.dataTime == '今日'){
                        arr.unshift(obj)
                    }else{
                        arr.splice(n,0,obj)
                    }
                    n+=el.dataCount
                    n++
                })
            }
            return arr
        },
        isDirector(){   //是否是负责人
            return this.did && this.userNo == this.did ? true : false
        },
    },
    mounted(){
        if(this.id){
            this.getSelectFollowMsgList()
        }
    },
    methods: {
        onLoad() {
            console.log("load");
            this.getSelectFollowMsgList()
        },
        async addFabulous(row){
            if(!this.isAdd){ return false }
            this.isAdd = false
            let obj = {
                id: row.id,
                isAdd: row.dzFlag ? -1 : 1   // 1 or -1
            }
            await clueCustomerFollowUser_giveTheThumbsUp(obj).then(res => {
                if(res.result){
                    this.data.forEach(el => {
                        if(el.id == row.id){
                            if(row.dzFlag){
                                el.praise--
                            }else{
                                el.praise++
                            }
                            el.dzFlag = row.dzFlag ? 0 : 1
                        }
                    })
                    this.isAdd = true
                }
            })
        },
        getComentList(row){  //查看回复列表
            let more = row.more
            if(more){
                this.data.forEach(el => {
                    if(el.id == row.id){
                        el.more = false
                    }
                })
            }else{
                let obj = {
                    targetType: 1,  //回复类型
                    targetId: row.id,
                }
                clueCustomerFollowUser_queryCommentInfoList(obj).then(res => {
                    if(res.result){
                        let list = res.data
                        this.data.forEach(el => {
                            if(el.id == row.id){
                                el.more = true
                                el.msgList = list
                            }
                        })

                    }
                })
            }
        },
        openDialog(row,type){  //打开弹窗
            //type =>  comment(消息回复) detail(商机详情)
            this.$emit('openDialog',row.id,type)
        },
        reviewFun:_throttle(function(type,row){    //协助人审核
            let btnText = type == 'pass' ? '同意' : '拒绝'
            let tips = `你确定${btnText}“${row.optUserName}”成为该客户的协助人吗？`
            let obj = {
                id: row.sourceId,
                optResult: type == 'pass' ? 1 : 2
            }
            this.$dialog.confirm({
                title: "",
                message: tips,
            }).then(() => {
                console.log("yes");
                clueCustomerFollowUser_approveHelperpplication(obj).then(res => {
                    if(res.result){
                        this.$toast('操作成功')
                        this.navClickFun()
                    }
                })
            }).catch(() => {
                // on cancel
                console.log("cancel");
            });
        },2000),
        navClickFun(i){
            this.activeIndex = i
            this.followMsgSearch.page = 1
            this.noListLoading = false
            this.getSelectFollowMsgList()
        },
        searchFun(){
            this.followMsgSearch.page = 1
            this.noListLoading = false
            this.getSelectFollowMsgList()
        },
        // @接收人
        fillMessage(data) {
            this.$emit('fillMessage', data)
        },
        isMeFun(by){    //是否自己
            return this.userNo == by ? '(我)' : ''
        },
        userMessageReceive(){    //是否有新消息
            clueCustomerFollowUser_message(this.id).then(res => {
                if(res.result){
                    this.isPoint = res.data
                }
            })
        },
        getSelectFollowMsgList(){   //获取客户跟进信息
            let i = this.activeIndex + 1
            console.log('get list',i)
            if(i != 4){
                this.userMessageReceive()
            }
            this.followMsgSearch.clueCustomerNo = this.id
            if(this.num){
                this.followMsgSearch.limit = this.num * this.followMsgSearch.limit
            }
            this.followMsgSearch.punckStatus = i == 1 || !i ? '' : i
            
            // 获取线索动态
            if ((this.fromType == 1 || this.fromType == 2) && i == 2) {
                this.followMsgSearch.punckStatus = 6
            }
            
            clueCustomerFollowUser_selectFollowMsgList(this.followMsgSearch,this.noListLoading).then(res => {
                if(res.result){
                    let data = res.data
                    let list = data.dataList.records
                    let total = data.dataList.total
                    this.noListLoading = true
                    this.loading = false
                    if(list && list.length > 0){
                        list.forEach(el => {
                            /*-start-*
                             * 3.企微同步 5.更新客户 6.变更负责人 7.分配客户 8.领取客户
                             * 9.放弃客户 11.附件 12.删除附件 13.跟进记录 14.拜访客户 15.新增商机 16.修改商机
                             * 17.删除商机 18.新增协助人 21.互动协同 26.新增标签 28.自动打标
                             * 
                             * 40.浏览素材 41.添加企微好友 44.申请成为协助人 46.自动成为协助人
                             * 47.申请成为协助人已通过 48.申请成为协助人未通过
                             * 4. 线索转客户 50.线索创建 51.线索导入 52.企微同步 53.更新线索 55.分配线索 56.领取线索 57.放弃线索
                             * 0. 老数据
                             * -end-*/ 
                            el.fromUser = el.fromUser ? JSON.parse(el.fromUser) : el.fromUser
                            el.toUser = el.toUser ? JSON.parse(el.toUser) : el.toUser
                            if(el.optType == 18 && !el.createBy){
                                el.optAvatar = el.toUser.avatar
                                el.optUserName = el.toUser.name
                            }
                            if(el.optType == 40){
                                let str = ''
                                if(el.duration < 5){
                                    str = '少于5秒'
                                }else if(el.duration > 5 && el.duration < 60){
                                    str = el.duration + '秒'
                                }else{
                                    str = this.secondToDate(el.duration)
                                }
                                el.optName = el.optName + ' ' + str
                            }
                            let dotList = [0,3,5,6,7,8,9,11,12,13,14,26,27,28,36,44]
                            if(dotList.indexOf(el.optType) > -1){
                                el.class = 'dot'
                            }
                            // let whiteList = [5,15,16,17,21]
                            let whiteList = [21]
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
                    if (this.followMsgSearch.page == 1) {
                        this.data = []
                    }
                    this.followMsgSearch.page++
                    this.data = this.data.concat(list)
                    
                    if (this.data.length >= total) {
                        this.finished = true
                    } else {
                        this.finished = false
                    }
                    this.time = data.dateList
                    this.total = total

                    this.$nextTick(() => {
                        this.$emit('load',true)
                    })
                }
            })
        },
        secondToDate(result) {
            let _str = ''
            var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            if(Number(h)){
                _str = h + "小时" + m + "分" + s + '秒'
            }else if(Number(m)){
                _str = Number(m) + "分" + s + '秒'
            }
            return _str
        },
        getTextFun(obj){
            // console.log('asd',obj)
            let val = obj.optType,str = '',isOld = true
            switch (val) {
                case 0:
                    str = obj.context
                    break;
                case 1:
                    str = '建立了客户档案'
                    break;
                case 3:
                    str = '从企微同步了'
                    break;
                case 5:
                    str = '更新了客户信息'
                    break;
                case 6:
                    str = '将负责人从'
                    break;
                case 7:
                    str = '将客户分配给了'
                    break;
                case 8:
                    if(obj.optUserName){
                        str = '领取了客户'
                    }else{
                        str = obj.context
                    }
                    break;
                case 9:
                    str = '放弃了客户，客户已回到公海'
                    break;
                case 11:
                    str = '上传了附件'
                    break;
                case 12:
                    str = '删除了附件'
                    break;
                case 13:
                    str = `新增了一条记录“${obj.context}”`
                    break;
                case 14:
                    str = '拜访了客户'
                    break;
                case 15:
                    str = '新增了商机' + obj.context
                    break;
                case 16:
                    str = '更新了商机'
                    break;
                case 17:
                    str = '删除了商机'
                    break;
                case 18:
                    if(obj.optUserName){
                        if(obj.createBy){
                            str = '新增协作人'
                        }else{
                            str = obj.context
                        }
                    }else{
                        str = obj.context
                    }
                    break;
                case 20:
                    str = '删除了协作人'
                    break;
                case 26:
                    let name = obj.ossObjectname ? obj.ossObjectname : obj.context
                    str = `新增标签“${name}”`
                    break;
                case 27:
                    str = `移除了标签“${obj.ossObjectname}”`
                    break;
                case 28:
                    str = obj.context
                    break;
                case 29:
                    str = '发起激活客户'
                    break;
                case 30:
                    str = obj.context
                    break;
                case 36:
                    str = obj.context
                    break;
                case 40:
                    str = obj.context
                    break;
                case 44:
                    let _str = ''
                    if(obj.optResult == 1){
                        _str = '(已通过)'
                    }else if(obj.optResult == 0){
                        _str = '(已拒绝)'
                    }
                    str = '申请成为协助人' + _str
                    break;
                case 46:
                    str = '已自动成为协助人'
                    break;
                case 47:
                case 48:
                    break;
                case 4:
                case 50:
                case 51:
                case 52:
                case 53:
                case 55:
                case 56:
                case 57:
                    str = obj.context
                    break;
                default:
                    break;
            }
            return str
        },
    },
    watch: {
        id(){
            console.log('list')
            this.getSelectFollowMsgList()
        },
    },
    filters: {
        alt(list){
            let arr = []
            if(list && list.length){
                if(list.length == 1 && !list[0].userName){
                    return '@所有人'
                }else{
                    list.forEach(el => {
                        let str = '@' + el.userName
                        arr.push(str)
                    })
                    return  arr.join(' ')
                }
            }
        },
        optString(val){
            // console.log('val',`${val.name}-${val.depId}`)
            return val.name && val.depId ? `${val.name}-${val.depId}` : val.name
        },
        optToString(val){
            let arr = []
            if(val && val.length){
                let str = ''
                val.forEach(el => {
                    str = el.name && el.depId ? `${el.name}-${el.depId}` : el.name
                })
                arr.push(str)
            }
            return arr && arr.length ? arr.join('、') : ''
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dynamics_box{
    width: 100%;
    padding-bottom: 90px;
    .type_box{
        width: 100%;
        display: flex;
        margin-bottom: 32px;
        .type{
            height: 52px;
            color: @fontSub1;
            font-size: 24px;
            line-height: 50px;
            padding: 0 26px;
            border: 1px solid @navBg; /*no*/
            background: @navBg;
            border-radius: 26px;
            margin-right: 24px;
            position: relative;
            &:last-child{
                margin-right: 0;
            }
            &.cur{
                background: @white;
                border-color: @main;
                color: @main;
            }
            &.dot::before{
                content: '';
                width: 16px;
                height: 16px;
                background: @red;
                border-radius: 50%;
                position: absolute;
                right: 0;
                top: -8px;
            }
        }
    }
    .time_list{
        width: 100%;
        .li{
            position: relative;
            padding-bottom: 40px;
            display: flex;
            &.day{
                .icon_box{
                    .icon{
                        width: 40px;
                        height: 40px;
                        top: 2px;
                    }
                    &::before{
                        display: none;
                    }
                    &::after{
                        content: '';
                        height: calc(100% - 4px);
                        top: 39px;
                    }
                }
                .val{
                    .show_day{
                        font-size: 32px;
                        line-height: 40px;
                        color: @fontMain;
                        font-weight: bold;
                        .total{
                            font-size: 28px;
                            color: @total;
                            font-weight: 500;
                            margin-left: 8px;
                        }
                    }
                }
            }
            &.dot .icon_box{
                &::after{
                    content: '';
                    height: calc(100% - 10px);
                    top: 44px;
                }
                &::before{
                    content: '';
                    height: 36px;
                }
                .icon{
                    left: 51%;
                    // width: 12px;
                    // height: 12px;
                    // border-radius: 50%;
                    // background: @dot;
                }
            }
            &.opera .val .card{
                padding-bottom: 64px;
                .text{
                    margin-bottom: 24px;
                }
                .opera_right{
                    display: flex;
                    justify-content: flex-end;
                    .icon_btn{
                        min-width: 60px;
                        display: flex;
                        align-items: flex-start;
                        margin-left: 28px;
                        .iconfont{
                            width: 34px;
                            height: auto;
                        }
                        .num{
                            font-size: 24px;
                            line-height: 32px;
                            margin-left: 8px;
                            &.hide{
                                opacity: 0;
                            }
                        }
                    }
                }
                .msg_box{
                    width: 100%;
                    position: relative;
                    margin-top: 28px;
                    &::before{
                        content: '';
                        width: calc(100% + 48px);
                        height: 1px;    /*no*/
                        background: @lineColor;
                        position: absolute;
                        top: 0;
                        left: -24px;
                    }
                    .msg_li{
                        width: 100%;
                        padding: 24px 0;
                        border-bottom: 1px solid @lineColor; /*no*/
                        position: relative;
                        &:last-child{
                            border: none;
                        }
                        .msg_info{
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;
                            .msg_img{
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                background: rgba(0, 0, 0, .05);
                                margin-right: 8px;
                            }
                            .msg_name{
                                font-size: 24px;
                                line-height: 40px;
                                color: @fontMain;
                                font-weight: normal;
                            }
                            .msg_text{
                                font-size: 24px;
                                line-height: 32px;
                                color: @fontSub1;
                            }
                        }
                        .time{
                            right: 0;
                        }
                    }
                }
                .more{
                    width: 36px;
                    height: 36px;
                    position: absolute;
                    left: 50%;
                    bottom: 20px;
                    transform: translateX(-50%);
                    .icon{
                        width: 100%;
                        height: auto;
                    }
                }
            }
            &.last{
                padding-bottom: 0;
                .icon_box::after{
                    display: none;
                }
            }
            .icon_box{
                width: 40px;
                padding-top: 24px;
                margin-right: 16px;
                position: relative;
                &::before{
                    content: '';
                    width: 1px; /*no*/
                    height: 24px;
                    border-right: 1px dashed @placeholder; /*no*/
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%) scaleX(.5);
                }
                &::after{
                    content: '';
                    width: 1px; /*no*/
                    height: calc(100% - 24px);
                    border-right: 1px dashed @placeholder; /*no*/
                    position: absolute;
                    left: 50%;
                    top: 64px;
                    transform: translateX(-50%) scaleX(.5);
                }
                .icon{
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    left: 50%;
                    top: 25px;
                    transform: translateX(-50%);
                }
            }
            .val{
                width: calc(100% - 56px);
                .card{
                    width: 100%;
                    min-height: 132px;
                    background: @white;
                    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.05);
                    border-radius: 8px;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    &.hide .msg_box{
                        display: none;
                    }
                    &.no{
                        padding-bottom: 30px;
                    }
                    .mr8{
                        margin-right: 8px;
                    }
                    .tit{
                        font-size: 28px;
                        line-height: 40px;
                        color: @fontMain;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                    .time{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontSub1;
                        position: absolute;
                        right: 24px;
                        top: 28px;
                    }
                    .name_box{
                        display: inline-block;
                    }
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontMain;
                        padding-left: 40px;
                        position: relative;
                        margin-right: 8px;
                        display: inline-block;
                        .avatar{
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            background: rgba(0, 0, 0, .05);
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                    .text{
                        font-size: 24px;
                        line-height: 40px;
                        color: @fontSub1;
                        span {
                            word-break: break-all;
                        }
                        &.tips{
                            padding-left: 32px;
                            position: relative;
                            .icon{
                                width: 28px;
                                height: 28px;
                                border-radius: 50%;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                    }
                    .link{
                        color: @main;
                        font-size: 24px;
                        line-height: 32px;
                        font-weight: bold;
                        word-break: break-all;
                        // margin-left: 8px;
                        &.alt{
                            font-weight: 400;
                        }
                    }
                    .apply_opera{
                        width: 100%;
                        display: flex;
                        margin-top: 24px;
                        .btn{
                            width: calc(50% - 12px);
                            height: 64px;
                            line-height: 64px;
                            font-size: 24px;
                            text-align: center;
                            border-radius: 8px;
                            color: @fontMain;
                            background: @navBg;
                            &:first-child{
                                margin-right: 24px;
                            }
                        }
                    }
                    .info{
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                        .img_box{
                            width: 48px;
                            height: 48px;
                            background: rgba(0, 0, 0, .05);
                            margin-right: 8px;
                            img{
                                border-radius: 50%;
                            }
                        }
                        .name{
                            font-size: 28px;
                            line-height: 40px;
                            font-weight: bold;
                            color: @fontMain;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>