<template>
    <div class="delete">
        <van-popup
            v-model="deleteDialogVisible"
            round
            class="delete-pop"
            closeable
            @closed="hide">
            <div class="title">温馨提示</div>
            <div class="box">
                <img src="../../../assets/images/icon_error@2x.png" alt="">
                <span>是否确认删除？</span>
            </div>
            <div class="btn-wrap">
                <div class="item close-btn" @click="hide">否</div>
                <div class="item submit-btn" @click="doDelete(id)">是</div>
            </div>
        </van-popup>
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
<style lang="less" scoped>
.delete {
    .delete-pop {
        width: 700px;
        padding: 24px;
        border-radius: 8px;
        /deep/ .van-popup__close-icon {
            color: #3C4353;
        }
        .title {
            color: #3C4353;
            font-size: 28px;
            font-weight: 600;
        }
        .box {
            margin: 24px 0;
            img, span {
                display: inline-block;
                margin-right: 8px;
                vertical-align: middle;
            }
            span {
                color: #3C4353;
                font-size: 28px;
            }
            img {
                width: 28px;
                height: 28px;
            }
        }
        .btn-wrap {
            display: flex;
            align-items: center;
            justify-content: right;
            .item {
                width: 160px;
                height: 68px;
                line-height: 68px;
                margin-left: 16px;
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
}
</style>