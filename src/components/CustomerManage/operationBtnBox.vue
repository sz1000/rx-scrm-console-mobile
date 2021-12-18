<template>
    <div class="operation-btn-box">
        <van-action-sheet v-model="visible">
            <div class="content">
                <ul class="btn-box">
                    <template v-for="i in actions">
                        <li v-if="i.type == fromType || i.type == '0' && (fromType == '1' || fromType == '2')" :key="i.code" class="btn-item pointer" @click="doAction(i.code)">
                            <div class="icon"></div>
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
        fromType: {
            default: '0'
        }
    },
    data() {
        return {
            visible: false,
            actions: [
                { type: '3', name: '写跟进', code: 'writeFollowUp' },
                { type: '3', name: '变更负责人', code: 'changeDirector' },
                { type: '3', name: '放弃', code: 'giveUp' },
                { type: '4', name: '分配', code: 'distribution' },
                { type: '4', name: '领取', code: 'receive' },
                { type: '0', name: '删除', code: 'delete' }  // 客户没有删除，线索有删除（非微信好友可删除）
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
    components: {

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
            .icon {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: @main;
                margin-bottom: 16px;
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