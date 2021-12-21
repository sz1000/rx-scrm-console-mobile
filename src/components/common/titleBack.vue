<template>
    <div class="top_back" @click="$router.go(-1)">
        <img class="icon" src="@/assets/svg/icon_back.svg" alt="">
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
export default {
    name: 'TitleBack',
    props: {
        title: {
            type: String,
            default: 'title'
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.top_back{
    width: 100%;
    height: 88px;
    position: relative;
    text-align: center;
    &::before{
        content: '';
        width: 100%;
        height: 1px; /* no */
        background: @lineColor;
        position: absolute;
        left: 0;
        bottom: 0;
        transform: scaleY(.5);
    }
    .icon{
        width: 32px;
        height: 32px;
        position: absolute;
        left: 32px;
        top: 50%;
        transform: translateY(-50%);
    }
    .title{
        display: inline-block;
        line-height: 88px;
        font-size: 28px;
        font-weight: bold;
        color: @fontMain;
    }
}
</style>