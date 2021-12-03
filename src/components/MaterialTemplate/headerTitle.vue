<template>
    <div class="header-title">
        <div class="back-page" @click="goBack">
            <img src="../../images/arrow_left.png" alt="">
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
        }
    },
    inject: ['goBack']
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.header-title {
    height: 87px;
    line-height: 87px;
    padding: 0 24px;
    background-color: @white;
    border-top: 1px solid @lineColor;
    border-bottom: 1px solid @lineColor;
    text-align: center;
    position: relative;
    .back-page {
        position: absolute;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        img {
            width: 48px;
            height: 48px;
        }
    }
    .text-title {
        font-size: 34px;
        color: @fontMain;
        font-weight: 600;
    }
}
</style>