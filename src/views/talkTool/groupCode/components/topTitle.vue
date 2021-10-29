<template>
    <div class="top_nav">
        <div class="black_btn" @click="$router.go(-1)">返回</div>
        <div class="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TopTitle',
    props: {
        title: {
            type: String,
            default: 'title'
        },
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/color.less';
 .top_nav{
    width: 100%;
    height: 88px;
    padding: 24px;
    background: @white;
    border-bottom: 1px solid @dashedColor;
    position: relative;
    text-align: center;
    font-size: 28px;
    line-height: 40px;
    color: @fontMain;
    font-weight: bold;
    .black_btn{
        position: absolute;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding-left: 30px;
        &::before{
            content: '<';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .title{
        display: inline-block;
    }
}
</style>