<template>
    <van-action-sheet v-model="dialog" :title="title" :safe-area-inset-bottom="true" class="vant_sheet">
        <div class="van_content">
            <div class="writerInput">
                <van-field v-model="msgText" type="textarea" maxlength="200" :placeholder="isComment?'请输入要回复的消息~':'记录好跟进，多签单哟~'" show-word-limit />
            </div>
            <div class="buttonWarp">
                <span class="cancel" @click="dialog = false">取消</span>
                <span class="save" @click="confirmFun">确定</span>
            </div>
        </div>
    </van-action-sheet>
</template>

<script>
export default {
    name: 'DialogComment',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isComment: {    //是否消息
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '回复'
        },
    },
    data(){
        return {
            dialog: false,
            msgText: '',
        }
    },
    methods: {
        confirmFun(){
            if(!this.msgText.trim()){
                let str = this.isComment ? '请输入回复内容' : '请输入跟进内容'
                this.$toast(str)
                return false
            }
            this.$emit('sure',this.msgText)
        },
    },
    watch:{
        value(val){
            this.dialog = val
        },
        dialog(val){
            if(val){
                this.msgText = ''
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
/* 旧样式 */   
.van_content {
    padding: 24px;
    .writerInput {
        height: 490px;
        .van-cell,
        .van-field,
        .van-field--min-height {
            font-size: 28px;
            height: 400px;
            background: #ffffff;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            padding-bottom: 40px;
            /deep/.van-field__control {
                height: 350px;
                padding-top: 10px;
            }
        }
        /deep/ .van-field__word-limit{
            position: absolute;
            bottom: -24px;
            right: 0;
        }
    }
    .buttonWarp {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        span {
            display: inline-block;
            width: 339px;
            height: 80px;
            border-radius: 8px;
            border: 2px solid #4168f6;
            text-align: center;
            line-height: 80px;
        }
        .cancel {
            color: #4168f6;
            background: #fff;
        }
        .save {
            background: #4168f6;
            color: #fff;
        }
    }
}
</style>