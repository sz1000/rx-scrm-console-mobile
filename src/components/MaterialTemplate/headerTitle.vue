<template>
    <div class="header-title pointer" :class="{'header-line': needLine}">
        <div class="back-page" @click="goBack">
            <img src="../../images/arrow_left.png" alt="">
            <span v-if="needBackText" class="reback">返回</span>
        </div>
        <span class="text-title">{{ title }}</span>
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
        }
    },
    inject: ['goBack']
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
</style>