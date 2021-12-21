<template>
    <div class="group_wrap">
        <TitleBack title="群聊详情"></TitleBack>
        
    </div>
</template>

<script>
import {
    TitleBack
} from '@/components'
export default {
    components: {
        TitleBack
    },
    data(){
        return {}
    },
    methods: {
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.group_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
}
</style>