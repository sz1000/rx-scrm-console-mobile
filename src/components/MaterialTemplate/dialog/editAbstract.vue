<template>
    <div class="edit-abstract">
        <van-popup
            v-model="visible"
            round
            position="bottom"
            class="edit-abstract-form"
            :close-on-click-overlay="false"
            @closed="hide">
            <div class="title">
                <img class="close pointer" src="../../../images/close.png" alt="" @click="hide">
                <span class="title-text">{{ title }}</span>
                <span class="confirm pointer" @click="confirm">确定</span>
            </div>
            <div class="box">
                <van-field v-model="content" class="edit-field" rows="6" autosize type="textarea" placeholder="请输入文字(不得超过108个字符)" maxlength="108" show-word-limit />
                <div class="divider"></div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '文章摘要',
            visible: false,
            content: ''
        }
    },
    inject: ['getAbstractData'],
    methods: {
        show(data) {
            this.content = data ? data : ''
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        confirm() {
            this.getAbstractData(this.content)
            this.hide()
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/color');
.edit-abstract {
    .edit-abstract-form {
        max-height: 90%;
        padding: 0 0 240px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 104px;
            line-height: 104px;
            padding: 0 32px;
            background-color: @white;
            border-radius: 16px 16px 0px 0px;
            .close {
                width: 34px;
                height: 34px;
            }
            .title-text {
                font-size: 32px;
                color: @fontMain;
                font-weight: 600;
            }
            .confirm {
                color: @main;
                font-size: 28px;
            }
        }
        .box {
            .edit-field {
                color: @fontMain;
            }
            /deep/ .van-cell {
                &::after {
                    border-bottom: none;
                }
                .van-field__control {
                    border-bottom: 2px solid @main;
                    box-shadow: none;
                }
            }
        }
    }
}
</style>