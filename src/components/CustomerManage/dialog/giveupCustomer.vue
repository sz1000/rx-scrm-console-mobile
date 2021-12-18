<template>
    <div class="give-up-customer">
        <van-dialog v-model="visible" title="放弃警告" show-cancel-button confirm-button-text="是" cancel-button-text="否" @confirm="doGiveUp()" @cancel="hide">
            <ul class="content">
                <li>是否放弃返回公海？</li>
                <li>* 放弃到公海后，此客户数据将属于公共资源，原归属人员不能再维护跟进和更新此客户数据。</li>
            </ul>
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        doGiveUp() {
            this.$emit('doGiveUp')
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
    .give-up-customer {
        .content {
            padding: 24px 50px 32px;
            li {
                color: @fontSub3;
                font-size: 28px;
            }
        }
    }
</style>