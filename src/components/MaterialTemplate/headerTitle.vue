<template>
    <div class="header-title pointer" :class="{'header-line': needLine, 'right-btn': btnText}">
        <div class="back-page" @click="goBack">
            <img src="../../images/arrow_left.png" alt="">
            <span v-if="needBackText" class="reback">返回</span>
        </div>
        <span class="text-title one-line">{{ title }}</span>
        <div v-if="btnText" class="btn pointer" @click="submit">{{ btnText }}</div>
    </div>
</template>
<script>
export default {
    name: 'headerTitle',
    props: {
        title: {
            type: String,
            default: ''
        },
        needBackText: {
            type: Boolean,
            default: true
        },
        needLine: {
            type: Boolean,
            default: false
        },
        btnText: {
            type: String,
            default: ''
        },
    },
    inject: ['goBack'],
    methods: {
        submit() {
            this.$emit('doSubmit')
        },
        back(){
            this.$emit('clickBack',1)
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.header-title {
    width: 10rem;
    height: 87px;
    line-height: 87px;
    padding: 0 24px;
    background-color: @white;
    // border-top: 1px solid @lineColor;
    text-align: center;
    z-index: 9;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .back-page {
        position: absolute;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        img {
            display: inline-block;
            vertical-align: middle;
            width: 28px;
            height: 28px;
        }
        .reback {
            display: inline-block;
            vertical-align: middle;
            font-size: 28px;
            color: @fontMain;
        }
    }
    .text-title {
        display: inline-block;
        max-width: 80%;
        font-size: 30px;
        color: @fontMain;
        font-weight: 600;
    }
}
.header-line {
    position: relative;
    &::after {
        content: '';
        height: 2px;
        background-color: @lineColor;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        transform: scaleY(.5);
    }
}
.right-btn {
    .btn {
        display: inline-block;
        width: 60px;
        height: 87px;
        line-height: 87px;
        color: @main;
        font-size: 28px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 32px;
    }
}
</style>