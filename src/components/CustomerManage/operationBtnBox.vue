<template>
    <div class="operation-btn-box">
        <van-action-sheet v-model="visible">
            <div class="content">
                <ul class="btn-box">
                    <template v-for="i in actions">
                        <li v-if="i.show && (i.type == fromType || fromType == '1' && i.type == '3' || fromType == '2' && i.type == '4' || (fromType == '1' || fromType == '2') && i.type == '0')" :key="i.code" class="btn-item pointer" @click="doAction(i.code)">
                            <div class="icon" :class="i.code">
                                <img class="icon-svg" :src="require(`@/assets/svg/${i.iconName}`)" alt="">
                            </div>
                            <p>{{ i.name }}</p>
                        </li>
                    </template>
                </ul>
                <div class="divider"></div>
                <div class="cancel pointer" @click="hide">取消</div>
            </div>
        </van-action-sheet>
    </div>
</template>
<script>
export default {
    name: 'operationBtnBox',
    props: {
        fromType: {  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: '0'
        },
        jurisdictionList: { // 按钮权限列表
            default() {
                return {}
            }
        },
        isWcCus: { // 是否是企微或微信好友
            default: 1
        }
    },
    data() {
        return {
            visible: false,
        }
    },
    computed: {
        actions() { // 操作按钮列表
            return [
                { show: true, type: '3', name: '写跟进', code: 'writeFollowUp', iconName: 'writeFollowUp.svg' },
                { show: this.jurisdictionList && this.jurisdictionList.some(item => item.enName == 'turn'), type: '1', name: '转客户', code: 'transferCustomer', iconName: 'transferCustomer.svg' },
                { show: this.jurisdictionList && this.jurisdictionList.some(item => item.enName == 'change'), type: '3', name: '变更负责人', code: 'changeDirector', iconName: 'changeDirector.svg' },
                { show: this.jurisdictionList && this.jurisdictionList.some(item => item.enName == 'giveup'), type: '3', name: '放弃', code: 'giveUp', iconName: 'giveUp.svg' },
                { show: this.jurisdictionList && this.jurisdictionList.some(item => item.enName == 'allot'), type: '4', name: '分配', code: 'distribution', iconName: 'distribution.svg' },
                { show: this.jurisdictionList && this.jurisdictionList.some(item => item.enName == 'get'), type: '4', name: '领取', code: 'receive', iconName: 'receive.svg' },
                { show: this.isWcCus != 1, type: '0', name: '删除', code: 'delete', iconName: 'delete.svg' }  // 客户没有删除，线索有删除（非微信好友可删除）
            ]
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        doAction(data) {
            this.$emit('doAction', data)
        },
    },
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
.operation-btn-box{
    .btn-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 42px 0;
        .btn-item {
            min-width: 120px;
            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 100px;
                margin: 0 auto;
                border-radius: 50%;
                margin-bottom: 16px;
                .icon-svg {
                    width: 48px;
                    height: 48px;
                }
                &.writeFollowUp, &.distribution {
                    background: linear-gradient(to right, #4390FF, #4168F6);
                }
                &.transferCustomer {
                    background: linear-gradient(to right, #8D95F0, #5360FF);
                }
                &.changeDirector, &.receive {
                    background: linear-gradient(to right, #55A7FE, #55BBFE);
                }
                &.giveUp {
                    background: linear-gradient(to right, #FFAE20, #FFC96A);
                }
                &.delete {
                    background: linear-gradient(to right, #EA7878, #D14343);
                }
            }
            p {
                text-align: center;
                color: @fontSub3;
                font-size: 24px;
            }
        }
    }
    .divider {
        height: 24px;
        background-color: @navBg;
    }
    .cancel {
        height: 104px;
        line-height: 104px;
        text-align: center;
        color: @fontSub3;
        font-size: 32px;
    }
}
</style>