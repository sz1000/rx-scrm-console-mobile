<template>
    <div class="material-template" :class="{preview: isPreview == 1}">
        <div class="top-fixed">
            <div v-if="isPreview == 1" class="header-title">
                <div class="back-page" @click="goBack">
                    <img src="../../images/arrow_left.png" alt="">
                </div>
                <span class="text-title">{{ materialType == 1 ? '文章' : '文件' }}预览</span>
            </div>
            <div v-if="userData" class="user-info">
                <img class="left" :src="userData.avatar ? userData.avatar : require('../../images/default_header.jpg')" alt="">
                <ul class="center">
                    <li class="name one-txt-cut">{{ userData.name }}</li>
                    <li class="company one-txt-cut">{{ userData.departments }}</li>
                </ul>
                <div class="right" @click="showWechat">
                    <img src="../../images/icon_qiwei.png" alt="">
                    <span>加企业微信</span>
                </div>
            </div>
        </div>

        <template v-if="materialType == 1">
            <h2 class="title">{{formData.title}}</h2>
            <div v-if="formData.author || formData.pushTime" class="info">
                <span class="author">{{formData.author}}</span>
                <span v-if="formData.isTimeShow" class="time">{{formData.pushTime ? formatDate(formData.pushTime, "yyyy-MM-dd") : ''}}</span>
            </div>
            <p class="content" v-html="formData.content"></p>
        </template>

        <template v-if="materialType == 2">
            <!-- <div v-if="formData.imageRelList && formData.imageRelList.length" class="file-img-box">
                <img class="item" v-for="i in formData.imageRelList" :key="i.documentId" :src="i.imageUrl" alt="">
            </div> -->
            <!-- <iframe v-else class="file-box" :src="formData.documentUrl" width="100%" height="auto"></iframe> -->
            <iframe v-if="formData && formData.documentUrl" class="file-box" :src="'http://view.xdocin.com/xdoc?_xdoc=' + formData.documentUrl" width="100%" height="100%"></iframe>
        </template>

        <wechat-qrcode ref="wechatQrcode"></wechat-qrcode>
    </div>
</template>
<script>
import { OffiAccount, UsersInfo, MaterialOperation, ArticleDetail, SaleDocumentDetail } from "../../config/api"

import { isWeiXin, getCode, formatDate, wxShare, byteConvert } from "../../utils/tool"

import WechatQrcode from "../../components/MaterialTemplate/wechatQrcode"

export default {
    name: "materialTemplate",
    data() {
        return {
            isPreview: 0,
            userData: null,
            formData: {},
            unionId: '',
            materialId: '',
            materialType: '', // 1: 文章, 2: 文件
            userNo: ''
        }
    },
    created() {
        const { isPreview, type, userNo, data } = this.$route.query

        if (isPreview == 1) {
            this.isPreview = 1
            this.materialType = type
            this.formData = JSON.parse(decodeURIComponent(data))
            this.userNo = userNo
            this.getUsersInfo()
            return
        }

        this.isPreview = 0

        if (isWeiXin()) {
            // 微信授权
            this.wechatLoad()
        }
        const { materialId } = this.$route.query

        this.materialId = materialId
        this.materialType = type
        this.userNo = userNo

        this.getUsersInfo()
        this.getDetails()
    },
    methods: {
        wechatLoad(){
            let { code } = this.$route.query
            if(!code) {
                getCode(encodeURIComponent(window.location.href))
            } else {
                this.offiAccount(code)
            }
        },
        offiAccount(wechatCode) {
            OffiAccount(wechatCode).then(res => {
                const { code, data } = res
                if (code === 'success') {
                    this.unionId = data
                    this.materialOperation()
                }
            })
        },
        materialOperation() {
            const params = {
                materialId: this.materialId,
                model: {
                    materialType: this.materialType,
                    unionId: this.unionId
                }
            }

            MaterialOperation(params).then(res => {
                if (res && res.code == 'success') {
                    setTimeout(() => {
                        this.materialOperation(params)
                    }, 5000)
                }
            })
        },
        getUsersInfo() {
            UsersInfo(this.userNo).then(res => {
                const { code, data } = res
                if (code === 'success') {
                    this.userData = data
                }
            })
        },
        getDetails() {
            let ApiOpts = ArticleDetail

            if (this.materialType == 1) {
                ApiOpts = ArticleDetail
            } else if (this.materialType == 2) {
                ApiOpts = SaleDocumentDetail
            }

            ApiOpts(this.materialId).then(res => {
                const { code, data, msg } = res
                if (code === 'success') {
                    this.formData = data
                    this.doWxShare()
                } else {
                    this.$toast(msg)
                }
            })
        },
        doWxShare() {
            let shareTitle = '', url = window.location.href, imgUrl = '', desc = ''

            if (this.materialType == 1) {
                let {title, cover, contentAbstract} = this.formData

                shareTitle = title
                imgUrl = cover && cover.length ? cover : 'https://h5.jzcrm.com/static/img/default_article.png'
                desc = contentAbstract ? contentAbstract : title
            } else if (this.materialType == 2) {
                let {name, cover, fileSize} = this.formData

                shareTitle = name
                imgUrl = cover && cover.length ? cover : 'https://h5.jzcrm.com/static/img/default_pdf.png'
                desc = fileSize ? byteConvert(fileSize) : name
            }
            wxShare(shareTitle, url, imgUrl, desc)
        },
        formatDate,
        showWechat() {
            this.$refs.wechatQrcode.show(this.userData.qrCode)
        },
        goBack() {
            this.$router.push({
                path: '/talkTool/verbalTrick',
                query: { comeFrom: 2 },
            })
        },
    },

    components: {
        WechatQrcode
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
    .material-template {
        min-height: 100vh;
        padding: 172px 32px 32px;
        background-color: @white;
        position: relative;
        .top-fixed {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            .header-title {
                height: 87px;
                line-height: 87px;
                padding: 0 24px;
                background-color: @white;
                border-top: 1px solid @lineColor;
                border-bottom: 1px solid @lineColor;
                text-align: center;
                position: relative;
                .back-page {
                    position: absolute;
                    left: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                    img {
                        width: 48px;
                        height: 48px;
                    }
                }
                .text-title {
                    font-size: 34px;
                    color: @fontMain;
                    font-weight: 600;
                }
            }
            .user-info {
                width: 100%;
                height: 144px;
                padding: 32px;
                box-shadow: 0 6px 10px 0 rgba(0,0,0,0.1);
                background-color: @white;
                position: relative;
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
                    width: 130px;
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
        .title {
            margin: 0 0 28px;
            word-break: break-all;
            font-size: 44px;
        }
        .info {
            margin-bottom: 44px;
            font-size: 0;
            span {
                display: inline-block;
                line-height: 40px;
                font-size: 30px;
            }
            .author, .time {
                margin: 0 20px 20px 0;
            }
            .time {
                color: rgba(0,0,0,0.3);
            }
        }
        .content {
            word-break: break-all;
            font-size: 30px;
            img {
                width: auto !important;
                height: auto !important;
                max-width: 100% !important;
            }
        }
        .file-box {
            min-height: 85vh;
            border: none;
        }
        // .file-img-box {
        //     width: 100%;
        //     height: auto;
        //     min-height: 100vh;
        //     .item {
        //         width: 100%;
        //         height: auto;
        //     }
        // }
    }
    .preview {
        padding-top: 255px;
    }
</style>
<style lang="less">
    .material-template {
        .content {
            img {
                width: auto !important;
                height: auto !important;
                max-width: 100% !important;
            }
            section {
                max-width: 100%;
            }
        }
    }
</style>