<template>
    <div class="dynamics_box">
        <div class="type_box">
            <div class="type" @click="navClickFun(index)" :class="{'cur':activeIndex == index,'dot':index == 3}" v-for="(item,index) in navList" :key="index">{{item}}</div>
        </div>
        <div class="time_list">
            <div class="li" :class="[item.class,{'last':list.length-1 == index}]" v-for="(item,index) in list" :key="index">
                <div class="icon_box">
                    <img class="icon" v-if="item.class == 'day'" src="@/assets/svg/icon_time.svg" alt="">
                    <img class="icon" v-if="item.class == 'dot'" src="@/assets/svg/icon_cir.svg" alt="">
                    <img class="icon" v-if="item.optType == 1" src="@/assets/svg/icon_jd.svg" alt="">
                    <img class="icon" v-if="item.optType == 21" src="@/assets/svg/icon_gt.svg" alt="">
                    <img class="icon" v-if="item.optType == 15 || item.optType == 16" src="@/assets/svg/icon_sj.svg" alt="">
                    <img class="icon" v-if="item.optType == 18 || item.optType == 19 || item.optType == 20" src="@/assets/svg/icon_xzr.svg" alt="">
                    <img class="icon" v-if="item.optType == 29 || item.optType == 30" src="@/assets/svg/icon_jh.svg" alt="">
                    <img class="icon" v-if="item.optType == 40" src="@/assets/svg/icon_sc.svg" alt="">
                    <img class="icon" v-if="item.optType == 41" src="@/assets/svg/icon_wx.svg" alt="">
                </div>
                <div class="val">
                    <div class="show_day" v-if="item.class == 'day'">{{item.title}}<span class="total" v-if="item.total > 0">({{item.total}}条)</span><span class="total" v-else>(暂无动态)</span></div>
                    <div class="card" v-if="item.class != 'day' && item.class != 'opera'">
                        <div class="tit">{{item.optName}}</div>
                        <div class="text tips" v-if="item.optType == 28">
                            <img class="icon" src="@/assets/svg/icon_tip.svg" alt="">
                            <span>{{getTextFun(item)}}</span>
                        </div>
                        <div class="text" v-else>
                            <!-- optType 等于0的时候是旧数据 -->
                            <span class="name" v-if="item.optType && item.optUserName">
                                <div class="avatar"></div>
                                <span>{{item.optUserName}}</span>
                            </span>
                            <span :class="{'mr8':item.name}">{{getTextFun(item)}}</span>
                            <span class="name" v-if="item.fromUser">
                                <div class="avatar"></div>
                                <span>{{item.fromUser}}</span>
                            </span>
                            <span class="mr8" v-if="item.optType && item.toUser && item.optType == 6">变更为</span>
                            <span class="name" v-if="item.optType && item.toUser && item.optType == 6">
                                <div class="avatar"></div>
                                <span>{{item.toUser}}</span>
                            </span>
                            <a class="link" v-if="item.file">{{item.file}}</a>
                        </div>
                        <div class="time">{{item.createTime | $time('YYYY-MM-DD HH:mm')}}</div>
                    </div>
                    <div class="card" v-if="item.class == 'opera'" :class="{'hide':item.more,'no': !item.msgList}">
                        <div class="info">
                            <div class="img_box" @click="fillMessage(item.context.sendUserInfo)">
                                <img :src="item.optAvatar | $setAvatar" alt="">
                            </div>
                            <div class="name">{{item.optUserName}}<span>{{isMeFun(item.createBy)}}</span></div>
                        </div>
                        <div class="time">{{item.createTime}}</div>
                        <div class="text">
                            <a class="link alt mr8">{{item.context.receiveUserInfo | alt}}</a>
                            <span>{{item.context.content}}</span>
                        </div>
                        <div class="opera_right">
                            <div class="icon_btn">
                                <img class="iconfont" src="@/assets/svg/icon_dz.svg" alt="">
                                <div class="num" v-show="item.praise">{{item.praise}}</div>
                            </div>
                            <div class="icon_btn" @click="addCommentDialog(item)">
                                <img class="iconfont" src="@/assets/svg/icon_pl.svg" alt="">
                                <div class="num" v-show="item.commentCount">{{item.commentCount}}</div>
                            </div>
                        </div>
                        <div class="msg_box" v-if="item.praise">
                            <div class="msg_li" v-for="(son,i) in item.context.receiveUserInfo" :key="i">
                                <div class="msg_info">
                                    <div class="msg_img"></div>
                                    <div class="msg_name">{{son.userName}}</div>
                                </div>
                                <div class="msg_text">{{item.context.content}}</div>
                                <div class="time">{{item.createTime}}</div>
                            </div>
                        </div>
                        <div class="more" v-if="item.praise" @click="item.more = !item.more">
                            <img class="icon" v-if="item.more" src="@/assets/svg/icon_down.svg" alt="">
                            <img class="icon" v-else src="@/assets/svg/icon_up.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dynamics',
    props: {
        data:{
            type: Array,
            default: () => []
        },
        time:{
            type: Array,
            default: () => []
        },
    },
    data(){
        return {
            whiteList: ['jiandang','gengxin','biangeng','fenpei','shangchuan','tag'],
            navList: ['全部','客户动态','商机动态','互动沟通'],
            activeIndex: 0,
        }
    },
    computed: {
        userNo(){
            return this.$store.getters.userNo
        },
        list(){
            let arr = JSON.parse(JSON.stringify(this.data)),n = 0
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
            return arr
        },
    },
    methods: {
        addCommentDialog(row){  //打开回复弹窗
            this.$emit('openDialog',row.id)
        },
        navClickFun(i){
            this.activeIndex = i
            this.$emit('sure',i+1)
        },
        // @接收人
        fillMessage(data) {
            this.$emit('fillMessage', data)
        },
        isMeFun(by){    //是否自己
            return this.userNo == by ? '(我)' : ''
        },
        getTextFun(obj){
            // console.log('asd',obj)
            let val = obj.optType,str = '',isOld = true
            switch (val) {
                case 1:
                    str = '建立了客户档案'
                    break;
                case 6:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '将负责人从'
                    }
                    break;
                case 7:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '将客户分配给了'
                    }
                    break;
                case 8:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '领取了客户'
                    }
                    break;
                case 9:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '放弃了客户，客户已回到公海'
                    }
                    break;
                case 11:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '上传了附件'
                    }
                    break;
                case 13:
                    str = `新增了一条记录“${obj.context}”`
                    break;
                case 14:
                    str = '拜访了客户'
                    break;
                case 15:
                    str = '新增了商机'
                    break;
                case 16:
                    str = '更新了商机'
                    break;
                case 17:
                    str = '删除了商机'
                    break;
                case 18:
                    if(isOld){
                        str = obj.context
                    }else{
                        str = '新增协作人'
                    }
                    break;
                case 26:
                    str = `新增标签“${obj.context}”`
                    break;
                case 28:
                    str = obj.context
                    break;
                case 29:
                    str = obj.context
                    break;
                case 30:
                    str = obj.context
                    break;
                default:
                    break;
            }
            return str
        },
    },
    filters: {
        alt(list){
            let arr = []
            if(list && list.length){
                list.forEach(el => {
                    let str = '@' + el.userName
                    arr.push(str)
                })
                return arr.join(' ')
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dynamics_box{
    width: 100%;
    padding-bottom: 60px;
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
                        top: 36px;
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
                // .icon{
                //     width: 12px;
                //     height: 12px;
                //     border-radius: 50%;
                //     background: @dot;
                // }
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
            &.last .icon_box{
                &::after{
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
                    transform: translateX(-50%);
                }
                &::after{
                    content: '';
                    width: 1px; /*no*/
                    height: calc(100% - 24px);
                    border-right: 1px dashed @placeholder; /*no*/
                    position: absolute;
                    left: 50%;
                    top: 64px;
                    transform: translateX(-50%);
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
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontMain;
                        padding-left: 40px;
                        position: relative;
                        margin-right: 8px;
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
                        &.tips{
                            padding-left: 32px;
                            position: relative;
                            .icon{
                                width: 28px;
                                height: 28px;
                                border-radius: 50%;
                                background: rgba(0, 0, 0, .05);
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
                        margin-left: 8px;
                        &.alt{
                            font-weight: 400;
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