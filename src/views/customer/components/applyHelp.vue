<template>
    <DialogDetail title="申请成为协助人" v-model="dialog" isOpera>
        <div class="dialog_box">
            <div class="tips_box">
                <img class="icon" src="@/assets/svg/icon_tips.svg" alt="">
                <div class="tip">该客户已有同事正在负责，申请成为协助人后，可查看客户资料</div>
            </div>
            <div class="item">
                <div class="label">客户</div>
                <div class="val">
                    <div class="info">
                        <div class="avatar"></div>
                        <div class="name">陈良-运营部</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">建档时间</div>
                <div class="val">2020-01-01 12:30:30</div>
            </div>
            <div class="item">
                <div class="label">当前负责人</div>
                <div class="val">
                    <div class="info">
                        <div class="avatar"></div>
                        <div class="name">陈良-运营部</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="opera_box" :class="{'disable':isApply}" slot="footer_box">
            <div class="mask"></div>
            <div class="btn disable">{{isApply ? '已提交申请，等待负责人处理中' : '提交申请'}}</div>
        </div>
    </DialogDetail>
</template>

<script>
import { DialogDetail } from '../components'
export default {
    name: 'ApplyHelp',
    components: {
        DialogDetail
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isApply: {  //是否已经申请过
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            dialog: false,
        }
    },
    methods: {
        submitFun(){    //申请成为协助人
            if(this.isApply){return false}
            
        },
    },
    watch:{
        value(val){
            this.dialog = val
        },
        dialog(val){
            if(this.value==val){return false}
            this.$emit('input',val)
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dialog_box{
    width: 100%;
    height: 100%;
    padding: 0 32px;
    .tips_box{
        width: 100%;
        padding-left: 46px;
        position: relative;
        .icon{
            width: 30px;
            height: 30px;
            position: absolute;
            left: 0;
            top: 8px;
        }
        .tip{
            font-size: 24px;
            line-height: 40px;
            color: @fontSub1;
        }
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
            }
        }
    }
}
.opera_box{
    width: 100%;
    margin-top: 40px;
    padding: 24px 40px;
    border-top: 1px solid @lineColor; /* no */
    position: relative;
    &.disable .mask{
        display: block;
    }
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(@white,.6);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        display: none;
    }
    .btn{
        width: 100%;
        color: @white;
        background: @main;
        border-radius: 16px;
        font-size: 32px;
        line-height: 40px;
        font-weight: bold;
        padding: 28px 0;
        text-align: center;
        position: relative;
    }
}
</style>