<template>
    <div class="follow-up-box">
        <header-title class="customer-title" title="写跟进" :needBackText="false" :needLine="true" btnText="确定" @doSubmit="messageNotificatio"></header-title>
        <div class="content">
            <div v-if="receiveUserInfo && receiveUserInfo.length" class="top">
                <div class="top-box">
                    <div class="name-item" v-for="i in receiveUserInfo" :key="i.userNo">
                        {{ i.userName }}
                        <span class="pointer" @click="deleteUser(i.userNo)">×</span>
                    </div>
                </div>
            </div>
            <van-field v-model="message" class="inp-content" rows="1" autosize type="textarea" maxlength="200" show-word-limit :border="false" placeholder="记录好跟进，多签单呦～" @input="doInput"/>
            <div class="img-box" @click.stop="previewImg(imgData)">
                <img v-if="imgData" :src="imgData" alt="">
                <div v-if="imgData" class="close" @click.stop.prevent="clearImg"></div>
            </div>
        </div>
        <ul class="btn-box">
            <li class="item-at" @click="showPop">
                <img src="@/assets/svg/icon-follow-at.svg" alt="">
                <span>提及同事</span>
            </li>
            <li v-if="!imgData">
                <img-upload :isCustomize="true" :customizeType="4"></img-upload>
            </li>
        </ul>

        <!-- 选择@员工 -->
        <choose-at-person ref="chooseAtPerson" :fromType="fromType" :customerNo="customerNo"></choose-at-person>
        <!-- 图片预览 -->
        <img-preview ref="imgPreview"></img-preview>
    </div>
</template>
<script>
import {
    clueCustomerFollowUser_message_notificatio, //添加消息回复 （@）
} from '@/api/customer'
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import ChooseAtPerson from '@/components/CustomerManage/dialog/chooseAtPerson'
import ImgUpload from '@/components/MaterialTemplate/imgUpload'
import ImgPreview from '@/components/MaterialTemplate/imgPreview'
import { throttle } from '@/utils/tool'

export default {
    props: {
        fromType: { // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: '1'
        },
        customerNo: {
            default: ''
        },
        sendUserInfo: {
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            message: '',
            imgData: '', // 上传图片信息
            receiveUserInfo: []
        }
    },
    provide() {
        return {
            goBack: this.goBack,
            getImgUrl: this.getImgUrl,
            getPeople: this.getPeople
        }
    },
    methods: {
        initData() {
            Object.assign(this.$data, this.$options.data())
        },
        doInput() {
            // console.log("输入的值：", this.message)
        },
        showPop() {
            this.$refs.chooseAtPerson.show()
        },
        // 上传图片地址获取
        getImgUrl(data) {
            this.imgData = data
        },
        clearImg() {
            this.imgData = ''
        },
        // 获取最终选中的人
        getPeople(data) {
            this.receiveUserInfo = this.receiveUserInfo.concat(...data)
            let arr = this.receiveUserInfo

            this.receiveUserInfo = this.$refs.chooseAtPerson.resetCheckedList(arr)

            this.$refs.chooseAtPerson.hide()
        },
        deleteUser(userNo) {
            this.receiveUserInfo.map((item, index) => {
                if (userNo == item.userNo) {
                    this.receiveUserInfo.splice(index, 1)
                }
            })
        },
        // 提交
        messageNotificatio() {
            if(!throttle()) {
                return
            }

            if (!this.checkBeforeSend(this.message)) {
                return
            }
            const { avatar = '', name = '', userNo = '' } = this.sendUserInfo

            let params = {
                content: this.message,
                customerNo: this.customerNo,
                receiveUserInfo: this.receiveUserInfo,
                sendUserInfo: {
                    avatar,
                    userName: name,
                    userNo
                },
                imageUrl: this.imgData,
            }
            clueCustomerFollowUser_message_notificatio(params).then(res => {
                if(res.result) {
                    this.goBack()
                } else {
                    this.$toast(res.msg)
                }
            })
        },
        // 提交前验证
        checkBeforeSend(message) {
            if (!message) {
                this.$toast('跟进内容不能为空')
                return false
            }
            return true
        },
        goBack() {
            this.$emit('doHideFollowUpBox')
        },
        previewImg(i) {
            this.$refs.imgPreview.show(1, [i])
        },
    },
    components: {
        HeaderTitle,
        ChooseAtPerson,
        ImgUpload,
        ImgPreview
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
    .follow-up-box {
        padding-top: 88px;
        .customer-title {
            position: fixed;
            top: 0;
        }
        .content {
            position: relative;
            padding-top: 32px;
            &::after {
                content: '';
                height: 2px;
                background-color: @main;
                position: absolute;
                left: 32px;
                right: 32px;
            }
            .top {
                width: 686px;
                margin: 0 auto 20px;
                overflow-x: auto;
                .top-box {
                    white-space: nowrap;
                    .name-item {
                        display: inline-block;
                        height: 56px;
                        line-height: 30px;
                        padding: 12px 20px;
                        border-radius: 34px;
                        border: 2px solid #D9DAE4;
                        background-color: #fff;
                        color: #3C4353;
                        font-size: 24px;
                        span {
                            display: inline-block;
                            height: 100%;
                            color: #C0C4CC;
                        }
                        &:not(:first-child) {
                            margin-left: 16px;
                        }
                    }
                }
            }
            .inp-content {
                height: auto;
                line-height: 40px;
                padding: 0 32px;
                /deep/ .van-field__word-limit {
                    margin-top: 16px;
                    text-align: left;
                    color: @total;
                    font-size: 20px;
                }
            }
            .img-box {
                width: 200px;
                height: 200px;
                margin: 32px 32px 80px;
                border-radius: 20px;
                overflow: hidden;
                position: relative;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
                .close {
                    width: 32px;
                    height: 32px;
                    border-bottom-left-radius: 20px;
                    background: rgba(0, 0, 0, .4);
                    position: absolute;
                    right: 0;
                    top: 0;
                    &::before, &::after {
                        content: '';
                        border-radius: 20px;
                        background-color: @white;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                    &::before {
                        width: 16px;
                        height: 4px;
                    }
                    &::after {
                        width: 4px;
                        height: 16px;
                    }
                }
            }
        }
        .btn-box {
            display: flex;
            align-items: center;
            padding: 16px 32px;
            .item-at {
                display: flex;
                align-items: center;
                padding: 6px 12px;
                margin-right: 16px;
                border-radius: 22px;
                border: 2px solid @lineColor;
                img {
                    width: 32px;
                    height: 32px;
                }
                span {
                    margin-left: 8px;
                    font-size: 20px;
                    color: @fontSub1;
                }
            }
        }
    }
</style>