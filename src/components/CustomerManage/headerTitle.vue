<template>
    <div class="header-title pointer">
        <div class="back-page" @click="goBack">
            <img src="../../images/arrow_left.png" alt="">
        </div>
        <ul class="nav-box">
            <li v-for="i in navList" :key="i.code" class="nav" :class="{'cur': i.code == navActive}" @click="changeNav(i.code)">{{ i.name }}</li>
        </ul>
        <span v-if="showAdd" class="add-btn" @click="doAdd"></span>
        <span v-else class="btn-position"></span>
    </div>
</template>
<script>
export default {
    name: 'headerTitle',
    props: {
        navList: {
            type: Array,
            default() {
                return []
            }
        },
        navActive: {
            type: String,
            default: 'myCustomer'
        },
        showAdd: {
            type: Boolean,
            default: true
        }
    },
    inject: ['goBack', 'changeNav', 'doAdd']
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.header-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    height: 87px;
    line-height: 87px;
    padding: 0 36px;
    background-color: @white;
    text-align: center;
    z-index: 9;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &::before{
        content: '';
        height: 2px;
        background: @lineColor;
        transform: scaleY(.5);
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .back-page {
        min-width: 28px;
        img {
            width: 28px;
            height: 28px;
        }
    }
    .nav-box{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 88px;
        padding: 0 100px;
        .nav{
            color: @fontSub1;
            font-size: 28px;
            line-height: 88px;
            flex: 1;
            position: relative;
            &.cur{
                color: @main;
                &::before{
                    content: '';
                    width: 40px;
                    height: 4px;
                    background: @main;
                    border-radius: 2px;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                }
            }
        }
    }
    .add-btn {
        min-width: 28px;
        height: 100%;
        position: relative;
        &::before, &::after{
            content: '';
            border-radius: 40px;
            background-color: @fontSub3;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        &::before{
            width: 4px;
            height: 28px;
        }
        &::after{
            width: 28px;
            height: 4px;
        }
    }
    .btn-position {
        min-width: 28px;
        height: 100%;
    }
}
</style>