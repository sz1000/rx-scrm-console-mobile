<template>
    <DialogDetail title="同事名片" v-model="dialog" isOpera>
        <div class="card"></div>
        <template slot="footer_box">
            <div class="opera_box">
                <div class="btn">拨打电话</div>
            </div>
        </template>
    </DialogDetail>
</template>
<script>
import { DialogDetail } from '../components'
export default {
    name: 'BusinessCard',
    components: {
        DialogDetail
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: () => []
        },
    },
    data(){
        return {}
    },
    computed: {
        dialog: {
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        },
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.opera_box{
    width: 100%;
    margin-top: 40px;
    padding: 24px 40px;
    border-top: 1px solid @lineColor; /* no */
    position: relative;
    .btn{
        width: 100%;
        color: @white;
        background: @main;
        border-radius: 16px;
        font-size: 32px;
        line-height: 40px;
        font-weight: bold;
        padding: 28px 0;
        text-align: center;
        position: relative;
    }
}
</style>