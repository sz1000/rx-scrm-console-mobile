<template>
    <div class="delete">
        <van-popup
            v-model="visible"
            round
            class="delete-pop"
            closeable
            @closed="hide">
            <div class="title"></div>
            <div class="content">

            </div>
            <div class="btn-wrap">
                <div class="item close-btn" @click="hide">取消</div>
                <div class="item submit-btn" @click="handleDelete">确定</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    props: {
        customerNo: {
            type: String,
            default: ''
        },
        stageListOptions: {
            type: Array,
            default: []
        }
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
    }
}
</script>
<style lang="less" scoped>
.delete {
    .title {

    }
    .btn-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        .item {
            width: 339px;
            height: 80px;
            line-height: 80px;
            margin: 0 12px;
            border: 2px solid #4168F6;
            border-radius: 8px;
            font-size: 28px;
            text-align: center;
        }
        .close-btn {
            color: #4168F6;
            background-color: #fff;
        }
        .submit-btn {
            color: #fff;
            background-color: #4168F6;
        }
    }
}
</style>