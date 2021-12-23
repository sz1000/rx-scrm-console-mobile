<template>
    <div class="give-up-or-receive">
        <van-dialog v-model="visible" :title="title" show-cancel-button :confirm-button-text="btnList[0]" :cancel-button-text="btnList[1]" confirmButtonColor="#4168F6" @confirm="confirm()" @cancel="hide">
            <ul class="content">
                <li v-for="i in desList" :key="i">{{ i }}</li>
            </ul>
        </van-dialog>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        btnList: {
            type: Array,
            default() {
                return ['确认', '取消']
            }
        },
        desList: {
            type: Array,
            default() {
                return []
            }
        },
    },
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
        confirm() {
            this.$emit('doNextOption')
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
    .give-up-or-receive {
        .content {
            padding: 24px 50px 32px;
            li {
                color: @fontSub3;
                font-size: 28px;
            }
        }
    }
</style>