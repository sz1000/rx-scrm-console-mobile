<template>
    <van-popup get-container="body" position="bottom" round v-model="dialog" :safe-area-inset-bottom="true">
        <div class="dialog_wrap">
            <div class="dialog_header">
                <img class="close" @click="dialog = false" src="@/assets/svg/icon_close.svg" alt="">
                <div class="title">{{title}}</div>
                <div class="confirm_btn" @click="onConfirm">确定</div>
            </div>
            <div class="dialog_content">
                <van-picker ref="picker" :columns="data" :value-key="keys"/>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'SelectDialog',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: () => {}
        },
        title: {
            type: String,
            default: '标题'
        },
        keys: {     //选项对象中，选项文字对应的键名
            type: String,
            default: ''
        },
    },
    data(){
        return {}
    },
    computed: {
        dialog: {
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        },
    },
    methods: {
        onConfirm() {
            let data = this.$refs.picker.getValues()
            this.dialog = false
            // console.log(data)
            this.$emit('confirm',data)
        },
    },
    watch: {
        dialog(val){
            val ? document.getElementById('html').style.overflow = 'hidden' : document.getElementById('html').style.overflow = 'auto'
        },
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dialog_wrap{
    width: 100%;
    height: 46vh;
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
            left: 32px;
            top: 34px;
        }
        .confirm_btn{
            font-size: 28px;
            line-height: 40px;
            font-weight: 500;
            color: @main;
            position: absolute;
            right: 32px;
            top: 32px;
        }
    }
    .dialog_content{
        width: 100%;
        /deep/ .van-picker__columns{
            height: calc(46vh - 104px) !important;
        }
    }
}
</style>