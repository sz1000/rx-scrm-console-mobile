<template>
    <div class="delete">
        <van-dialog 
            v-model="deleteDialogVisible"
            title="温馨提示"
            message="是否确认删除？"
            show-cancel-button
            confirm-button-text="是"
            cancel-button-text="否"
            confirm-button-color="#4168F6"
            @confirm="doDelete(id)"
            @cancel="hide"
        >
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            deleteDialogVisible: false,
            id: ''
        }
    },
    inject: ['doDelete'],
    methods: {
        show(data) {
            this.id = data
            this.deleteDialogVisible = true
        },
        hide() {
            this.deleteDialogVisible = false
        },
    }
}
</script>