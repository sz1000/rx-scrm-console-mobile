<template>
    <DialogDetail title="a" v-model="dialog" :closeable="false" :closeClickLay="false" isOpera>
        <div class="operation-btn-box">
            
        </div>
    </DialogDetail>
</template>
<script>
import DialogDetail from '../../views/customer/components/dialogDetail'

export default {
    name: 'operationBtnBox',
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        show() {
            this.dialog = true
        },
    },
    components: {
        DialogDetail
    },
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
.operation-btn-box{
    .btn {
        width: 76px;
        height: 76px;
        background: rgba(0, 0, 0, .4);
        border-radius: 50%;
        position: fixed;
        right: 24px;
        bottom: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon{
            width: 40px;
            height: 40px;
        }
    }
}
</style>