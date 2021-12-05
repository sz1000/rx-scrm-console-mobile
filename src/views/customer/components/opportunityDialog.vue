<template>
    <DialogDetail title="商机详情" v-model="dialog">
        <div class="dialog_box">
            <div class="item tit">
                <div class="label">第二代医疗器械</div>
                <div class="val">
                    <div class="info">
                        <div class="avatar"></div>
                        <div class="name">陈良-运营部</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">商机阶段</div>
                <div class="val">初步沟通</div>
            </div>
            <div class="item">
                <div class="label">商机金额</div>
                <div class="val">¥ 100.00 万元</div>
            </div>
            <div class="item">
                <div class="label">创建时间</div>
                <div class="val">2021-10-12 12:30:30</div>
            </div>
            <div class="item">
                <div class="label">预计成交</div>
                <div class="val">2021-10-12 12:30:30</div>
            </div>
            <div class="item">
                <div class="label">实际成交</div>
                <div class="val">暂无</div>
            </div>
        </div>
        <div class="opera_box" slot="footer_box">
            <div class="btn">查看更多</div>
        </div>
    </DialogDetail>
</template>

<script>
import { DialogDetail } from '../components'
export default {
    name: 'opportunityDialog',
    components: {
        DialogDetail
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            dialog: false,
        }
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
    .item{
        width: 100%;
        padding: 32px 0;
        display: flex;
        font-size: 28px;
        line-height: 36px;
        color: @fontMain;
        &.tit{
            .label{
                width: 260px;
                font-size: 32px;
                line-height: 40px;
                font-weight: bold;
            }
            .val{
                width: calc(100% - 260px);
            }
        }
        .label{
            width: 120px;
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
    }
}
</style>