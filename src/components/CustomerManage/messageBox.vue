<template>
    <div class="message">
        <div class="message-box">
            <div v-if="receiveUserInfo && receiveUserInfo.length" class="top">
                <div class="top-box">
                    <div class="name-item" v-for="i in receiveUserInfo" :key="i.userNo">
                        {{ i.userName }}
                        <span @click="deleteUser(i.userNo)">×</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="inp">
                    <div class="icon" @click="showRemindersBox">@</div>
                    <van-field v-model="message" class="inp-content" rows="1" autosize type="textarea" placeholder="请输入消息内容"/>
                </div>
                <div class="send" @click="messageNotificatio(receiveUserInfo, message)">发送</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        messageValue: '',
    },
    data() {
        return {
            receiveUserInfo: [],
            message: '',
        }
    },
    inject: ['showRemindersBox', 'messageNotificatio'],
    methods: {
        deleteUser(userNo) {
            this.receiveUserInfo.map((item, index) => {
                if (userNo == item.userNo) {
                    this.receiveUserInfo.splice(index, 1)
                }
            })
        },
        initData() {
            this.message = ''
            this.receiveUserInfo = []
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
.message {
    width: 100%;
    max-width: 750px;
    padding: 20px 24px;
    background-color: #fff;
    z-index: 9;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    &::after{
        content: '';
        height: 1px; /* no */
        width: 100%;
        background: @lineColor;
        position: absolute;
        top: 0;
        left: 0;
    }
    .message-box {
        .top {
            width: 700px;
            padding-bottom: 20px;
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
        .bottom{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .inp {
                display: flex;
                align-items: flex-end;
                justify-content: flex-start;
                width: 576px;
                min-height: 72px;
                padding: 16px 24px;
                background-color: #F6F7F9;
                .icon {
                    font-size: 28px;
                    color: #4168F6;
                }
                .inp-content {
                    width: 100%;
                    height: auto;
                    line-height: 40px;
                    margin-left: 24px;
                    padding: 0;
                    background-color: #F6F7F9;
                }
            }
            .send {
                width: 114px;
                height: 56px;
                margin-left: 12px;
                line-height: 56px;
                border-radius: 28px;
                background-color: #4168F6;
                text-align: center;
                font-size: 28px;
                color: #fff;
            }
        }
    }
}
.details-message {
    bottom: 112px;
}
</style>