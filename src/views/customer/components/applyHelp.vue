<template>
    <!-- <DialogDetail title="申请成为协助人" v-model="dialog" :closeable="false" :closeClickLay="false" isOpera> -->
    <DialogDetail title="无权限查看" v-model="dialog" :closeable="false" :closeClickLay="false" isOpera>
        <div class="dialog_box">
            <div class="tips_box">
                <img class="icon" src="@/assets/svg/icon_tips_warning.svg" alt="">
                <div class="tip">
                    <p>该客户已有同事正在负责，如需查看客户资料，</p>
                    <p>请联系该同事或上级领导</p>
                </div>
                <!-- <div class="tip">该客户已有同事正在负责，申请成为协助人后，可查看客户资料</div> -->
            </div>
            <div class="item">
                <div class="label">联系人</div>
                <div class="val">
                    <div class="info">
                        <img class="avatar" :src="data.customerAvatar | $setAvatar" alt="">
                        <div class="name one-line">{{data.customerName}}</div>
                        <div v-if="data.cropFullName" class="crop one-line">@{{ data.cropFullName }}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">创建时间</div>
                <div class="val">{{data.createTime | $time('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
            <div class="item">
                <div class="label">当前负责人</div>
                <div class="val">
                    <div class="info director">
                        <img class="avatar" :src="data.directorAvatar | $setAvatar" alt="">
                        <div class="name one-line">{{data.directorName}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="opera_box" :class="{'disable':isApply || applyState}" slot="footer_box">
            <div class="mask"></div>
            <div class="btn disable" @click="submitFun">{{isApply || applyState ? '已提交申请，等待负责人处理中' : '提交申请'}}</div>
        </div> -->
    </DialogDetail>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { DialogDetail } from '../components'
// import {
//     clueCustomerFollowUser_applyFollowUser,     //申请成为协助人
// } from '@/api/customer'
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
        id: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: () => {}
        },
        // isApply: {  //是否已经申请过
        //     type: Boolean,
        //     default: false,
        // },
    },
    data(){
        return {
            dialog: false,
            // applyState: false,
        }
    },
    methods: {
        // submitFun:_throttle(function(){    //申请成为协助人
        //     if(this.isApply || this.applyState){return false}
        //     clueCustomerFollowUser_applyFollowUser(this.id).then(res => {
        //         if(res.result){
        //             this.$toast('申请成功')
        //             this.applyState = true
        //         }
        //     })
        // },2000),
    },
    watch:{
        value(val){
            console.log("val", val)
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
    // .tips_box{
    //     width: 100%;
    //     padding-left: 46px;
    //     position: relative;
    //     .icon{
    //         width: 30px;
    //         height: 30px;
    //         position: absolute;
    //         left: 0;
    //         top: 8px;
    //     }
    //     .tip{
    //         font-size: 24px;
    //         line-height: 40px;
    //         color: @fontSub1;
    //     }
    // }
    .tips_box{
        width: 100%;
        .icon{
            width: 112px;
            height: 112px;
            margin: 0 auto 32px;
        }
        .tip{
            font-size: 24px;
            line-height: 40px;
            color: @fontSub1;
            text-align: center;
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
            white-space: nowrap;
        }
        .val{
            width: calc(100% - 120px);
            font-weight: 500;
            text-align: right;
            .info{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(0,0,0,.05);
                    margin-right: 8px;
                }
                .name{
                    max-width: calc(100% - 300px);
                    font-size: 24px;
                    line-height: 32px;
                    color: @fontMain;
                    font-weight: 400;
                }
                .crop {
                    max-width: calc(100% - 300px);
                    font-size: 24px;
                    color: @yellow;
                }
            }
            .director {
                .name {
                    max-width: calc(100% - 50px);
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