<template>
    <van-popup get-container="body" :close-on-click-overlay="closeClickLay" :overlay="overlay" position="bottom" round v-model="dialog" :safe-area-inset-bottom="true">
        <div class="dialog_wrap">
            <div class="dialog_header">
                <div class="title">{{title}}</div>
                <img class="close" v-if="closeable" @click="dialog = false" src="@/assets/svg/icon_close.svg" alt="">
            </div>
            <div class="dialog_content" :class="{'opera':isOpera}">
                <slot></slot>
            </div>
            <slot name="footer_box"></slot>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'dialogDetail',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        overlay: {  //遮罩层
            type: Boolean,
            default: true,
        },
        closeClickLay: {  //点击遮罩层是否可以关闭弹窗
            type: Boolean,
            default: true,
        },
        closeable: {  //是否显示关闭图标
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '商机详情'
        },
        isOpera: {
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
            if(val){
                document.getElementById('html').style.overflow = 'hidden'
            }else{
                document.getElementById('html').style.overflow = 'auto'
            }
            if(this.value==val){return false}
            this.$emit('input',val)
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dialog_wrap{
    width: 100%;
    min-height: 60vh;
    background: @white;
    position: relative;
    .dialog_header{
        width: 100%;
        height: 104px;
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
    }
    .dialog_content{
        width: 100%;
        height: calc(100% - 104px);
        overflow-y: scroll;
        &.opera{
            height: calc(60vh - 248px);
            padding-top: 32px;
        }
        .list{
            width: 100%;
            padding: 0 32px;
            .li{
                width: 100%;
                padding: 32px 0;
                position: relative;
                display: flex;
            }
        }
    }
}
</style>