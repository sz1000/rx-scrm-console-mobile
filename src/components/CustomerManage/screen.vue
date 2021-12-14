<template>
    <div class="screen">
        <header-title title="筛选" :needBackText="false" :needLine="true"></header-title>
        
        <ul class="screen-form">
            <li class="screen-item">
                <h3 class="label">建档时间</h3>
                <div class="content">
                    <span class="time start">开始时间</span>
                    <span class="divider"></span>
                    <span class="time end">结束时间</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户来源</h3>
                <div class="content">
                    <span class="tag">陌拜</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户阶段</h3>
                <div class="content">
                    <span class="tag">沟通洽谈</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户类型</h3>
                <div class="content">
                    <span class="tag">个人</span>
                </div>
            </li>
            <template v-if="navActive == 'myCustomer'">
                <li class="screen-item">
                    <h3 class="label">负责类型</h3>
                    <div class="content">
                        <span class="tag">我负责的</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">协助人</h3>
                    <div class="content">
                        <span class="select">负责人</span>
                        <span class="select">协助人</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">商机阶段</h3>
                    <div class="content">
                        <span class="tag">成交</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">微信来源</h3>
                    <div class="content">
                        <span class="select">请选择</span>
                    </div>
                </li>
            </template>
            <li class="screen-item">
                <h3 class="label">好友关系</h3>
                <div class="content">
                    <span class="tag">加微客户</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import HeaderTitle from '../../components/MaterialTemplate/headerTitle'

export default {
    name: 'search',
    props: {
        navActive: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    // inject: ['checkTable'],
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        goBack() {
            let params = {}

            this.$emit('hideScreen', params)
        },
    },
    components: {
        HeaderTitle
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.screen {
    .screen-form {
        padding: 32px;
        .screen-item {
            margin-bottom: 60px;
            .label {
                margin-bottom: 24px;
                color: @fontSub3;
                font-size: 32px;
            }
            .content {
                span {
                    display: inline-block;
                    vertical-align: middle;
                    background-color: @navBg;
                    border-radius: 32px;
                    text-align: center;
                    color: @fontSub3;
                    font-size: 24px;
                    &:not(.divider) {
                        min-width: 214px;
                        padding: 16px 0;
                    }
                }
                .time {
                    width: 320px;
                }
                .divider {
                    width: 22px;
                    height: 2px;
                    margin: 0 12px;
                }
                .select {
                    width: 328px;
                    &:not(:first-child) {
                        margin-left: 30px;
                    }
                }
                .tag {
                    margin-bottom: 24px;
                    &:not(:first-child) {
                        margin-left: 24px;
                    }
                }
            }
        }
    }
}
</style>