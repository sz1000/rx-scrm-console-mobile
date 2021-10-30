<template>
    <div class="change-stage">
        <van-dialog 
            v-model="changeStageDialogVisible"
            title="温馨提示"
            :message="`是否确认更改阶段为“${stageData && stageData.stageName }”？`"
            show-cancel-button
            confirm-button-text="是"
            cancel-button-text="否"
            confirm-button-color="#4168F6"
            @confirm="doChange(stageData)"
            @cancel="hide"
        >
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            changeStageDialogVisible: false,
            stageData: {}
        }
    },
    inject: ['doChange'],
    methods: {
        show(data) {
            this.stageData = data
            this.changeStageDialogVisible = true
        },
        hide() {
            this.changeStageDialogVisible = false
        },
    }
}
</script>