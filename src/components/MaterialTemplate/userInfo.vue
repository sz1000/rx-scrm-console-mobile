<template>
    <div class="user-info-box">
        <div v-if="userData" class="user-info">
            <img class="left" :src="userData.avatar ? userData.avatar : require('../../images/default_header.jpg')" alt="">
            <ul class="center">
                <li class="name one-line">{{ userData.name }}</li>
                <li class="company one-line">{{ userData.departments }}</li>
            </ul>
            <div class="right" @click="showWechat">
                <img src="../../images/icon_qiwei.png" alt="">
                <span>加企业微信</span>
            </div>
        </div>

        <wechat-qrcode ref="wechatQrcode"></wechat-qrcode>
    </div>
</template>
<script>
import WechatQrcode from "../../components/MaterialTemplate/wechatQrcode"

export default {
    name: "userInfo",
    props: {
        userData: {
            default: null
        }
    },
    methods: {
        showWechat() {
            this.$refs.wechatQrcode.show(this.userData.qrCode)
        },
    },

    components: {
        WechatQrcode
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.user-info-box {
    /deep/ .van-overlay {
        width: 10rem;
        left: 50%;
        transform: translateX(-50%);
    }
    .user-info {
        width: 10rem;
        height: 144px;
        padding: 32px;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.1);
        background-color: @white;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        .left {
            display: inline-block;
            width: 72px;
            height: 72px;
            margin-right: 16px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .center {
            display: inline-block;
            max-width: 60%;
            vertical-align: middle;
            .name {
                color: @fontMain;
                font-size: 28px;
            }
            .company {
                margin-top: 8px;
                color: @fontSub2;
                font-size: 24px;
            }
        }
        .right {
            width: 140px;
            height: 100%;
            text-align: center;
            position: absolute;
            right: 27px;
            top: 0;
            img {
                width: 48px;
                height: 48px;
                margin: 24px auto 16px;
            }
            span {
                font-size: 24px;
            }
        }
    }
}
</style>