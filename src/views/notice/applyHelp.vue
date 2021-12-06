<template>
    <div class="apply_box">
        <div class="title">申请成为协助人</div>
        <div class="item_box">
            <div class="tips_box" v-if="detail.isShow == 1">
                <img class="icon" src="@/assets/svg/icon_tips.svg" alt="">
                <div class="tip">协助人规则生效中，若{{detail.showNum}}小时未处理，系统将自动通过</div>
            </div>
            <div class="item">
                <div class="label">申请人</div>
                <div class="val">
                    <div class="info" v-if="detail.fromUser">
                        <img class="avatar" :src="detail.fromUser.avatar | $setAvatar" alt="">
                        <div class="name">{{detail.fromUser.name}}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">客户</div>
                <div class="val">
                    <div class="info" v-if="detail.toUser">
                        <img class="avatar" :src="detail.toUser.avatar | $setAvatar" alt="">
                        <div class="name">{{detail.toUser.name}}</div>
                        <div class="alt">@微信</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">申请时间</div>
                <div class="val">{{detail.createTime}}</div>
            </div>
        </div>
        <div class="opera_box" v-if="detail.isFollowuser == 1 && !detail.optResult">
            <div class="btn plain" @click="reviewFun('nopass')">拒绝</div>
            <div class="btn" @click="reviewFun('pass')">通过</div>
        </div>
        <div class="opera_box" v-else>
            <div class="btn plain no">{{btnText}}</div>
        </div>
    </div>
</template>

<script>
import {
    clueCustomerFollowUser_getApplyFollowUserDetail,    //查看申请详情
} from '@/api/notice'
import {
    clueCustomerFollowUser_approveHelperpplication,     //协助人审批
} from '@/api/customer'
export default {
    data(){
        return {
            id: this.$route.query.id || 2,
            detail: {},
        }
    },
    computed: {
        btnText(){
            let str = ''
            if(this.detail.optResult == 1){
                str = '已通过'
            }else if(this.detail.optResult == 2){
                str = '已拒绝'
            }else{
                str = '负责人已变更，已交由其他负责人处理'
            }
            return str
        },
    },
    mounted(){
        this.getDetail()
    },
    methods: {
        getDetail(){    //查看申请详情
            clueCustomerFollowUser_getApplyFollowUserDetail(this.id).then(res => {
                if(res.result){
                    let data = res.data.helperApplicationVO
                    data.fromUser = data.fromUser ? JSON.parse(data.fromUser) : data.fromUser
                    data.toUser = data.toUser ? JSON.parse(data.toUser) : data.toUser
                    data.isFollowuser = res.data.isFollowuser
                    data.isShow = res.data.isShow
                    data.showNum = res.data.showNum
                    this.detail = data
                }
            })
        },
        reviewFun(type){    //协助人审核
            let btnText = type == 'pass' ? '同意' : '拒绝'
            let tips = `你确定${btnText}“${this.detail.fromUser.name}”成为该客户的协助人吗？`
            let obj = {
                id: this.detail.id,
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
                        this.getDetail()
                    }
                })
            }).catch(() => {
                // on cancel
                console.log("cancel");
            });
        },
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/color.less';
.apply_box{
    width: 100%;
    min-height: 100vh;
    background: @white;
    .title{
        font-size: 30px;
        line-height: 44px;
        color: @fontMain;
        padding: 22px 0;
        text-align: center;
    }
    .tips_box{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .icon{
            width: 30px;
            height: 30px;
            margin-right: 8px;
        }
        .tip{
            font-size: 24px;
            line-height: 40px;
            color: @fontSub1;
        }
    }
    .item_box{
        width: 100%;
        height: calc(100vh - 230px);
        padding: 0 32px;
    }
    .item{
        width: 100%;
        padding: 32px 0;
        display: flex;
        font-size: 28px;
        line-height: 36px;
        color: @fontMain;
        .label{
            width: 160px;
        }
        .val{
            width: calc(100% - 120px);
            font-weight: 500;
            text-align: right;
            .info{
                display: flex;
                align-items: center;
                justify-content: right;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(0,0,0,.05);
                    margin-right: 8px;
                }
                .name{
                    font-size: 24px;
                    line-height: 32px;
                    color: @fontMain;
                    font-weight: 400;
                }
                .alt{
                    font-size: 20px;
                    line-height: 28px;
                    color: @green;
                    &.yellow{
                        color: @yellow;
                    }
                }
            }
        }
    }
    .opera_box{
        width: 100%;
        padding: 16px 32px;
        display: flex;
        .btn{
            flex: 1;
            border: 1px solid @main; /* no */
            background: @main;
            font-size: 32px;
            line-height: 44px;
            color: @white;
            border-radius: 16px;
            padding: 17px 0 ;
            text-align: center;
            transition: all .2s;
            &:active{
                background: rgba(@main,.85);
                border-color: rgba(@main,.85);
            }
            &.plain{
                color: @main;
                background: @white;
                border-color: @main;
                margin-right: 24px;
                &:active{
                    background: rgba(@main,.08);
                }
                &.no{
                    margin-right: 0;
                    font-size: 30px;
                    &:active{
                        background: @white;
                    }
                }
            }
        }
    }
}
</style>