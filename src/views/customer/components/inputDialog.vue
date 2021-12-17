<template>
    <van-popup get-container="body" position="bottom" round v-model="dialog" :safe-area-inset-bottom="true">
        <div class="dialog_wrap">
            <div class="dialog_header">
                <img class="close" @click="dialog = false" src="@/assets/svg/icon_close.svg" alt="">
                <div class="title">{{title}}</div>
                <div class="confirm_btn" @click="onConfirm">确定</div>
            </div>
            <div class="dialog_content">
                <div class="input_box" v-if="type == 'input'">
                    <input type="text" class="input" v-model="msg" maxlength="100" placeholder="请输入">
                    <img class="icon" @click="resetFun" src="@/assets/svg/icon_close_cir.svg" alt="">
                </div>
                <div class="textarea_box" v-if="type == 'textarea'">
                    <textarea class="textarea" v-model="msg" maxlength="200" placeholder="请输入"></textarea>
                    <span class="length"><i>{{msg.length}}</i>/200</span>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'InputDialog',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '地址'
        },
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'input'
        },
    },
    data(){
        return {
            msg: '',
        }
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
            this.dialog = false
            console.log(this.msg)
            this.$emit('confirm',this.msg)
        },
        resetFun(){     //清空
            this.msg = ''
        },
    },
    watch: {
        dialog(val){
            if(val){
                this.msg = this.text ? this.text : ''
                document.getElementById('html').style.overflow = 'hidden'
            }else{
                document.getElementById('html').style.overflow = 'auto'
            }
        },
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dialog_wrap{
    width: 100%;
    min-height: 46vh;
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
        padding: 32px;
        .input_box{
            width: 100%;
            height: 72px;
            position: relative;
            &::before{
                content: '';
                height: 1px; /* no */
                width: 100%;
                background: @main;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .input{
                width: 100%;
                line-height: 40px;
                font-size: 28px;
                color: @fontMain;
                padding: 16px 0;
                border: none;
                word-break: break-all;
                padding-right: 60px;
            }
            .icon{
                width: 32px;
                height: 32px;
                position: absolute;
                z-index: 2;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .textarea_box{
            padding: 16px 0;
            position: relative;
            &::before{
                content: '';
                height: 1px; /* no */
                width: 100%;
                background: @main;
                position: absolute;
                bottom: 16px;
                left: 0;
            }
            .textarea{
                border: none;
                width: 100%;
                height: 400px;
                line-height: 40px;
                font-size: 28px;
                color: @fontMain;
                word-break: break-all;
            }
            .length{
                font-size: 20px;
                line-height: 28px;
                color: @total;
                position: absolute;
                bottom: 0;
                right: 16px;
                transform: translateY(100%);
                i{
                    font-style: normal;
                    color: @fontMain;
                }
            }
        }
    }
}
</style>