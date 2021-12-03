<template>
    <div v-if="formData" class="material-content">
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
            <iframe v-if="formData && formData.documentUrl" class="file-box" :src="'http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=' + formData.documentUrl" width="100%" height="100%"></iframe>
        </template>
    </div>
</template>
<script>
import { ArticleDetail, SaleDocumentDetail } from "../../config/api"

import { formatDate, wxShare, byteConvert } from "../../utils/tool"

export default {
    name: "materialContent",
    data() {
        return {
            formData: {},
            materialType: '', // 1: 文章, 2: 文件
        }
    },
    methods: {
        // 分享h5获取详情
        getDetails(params) {
            this.materialType = params.materialType

            let ApiOpts = ArticleDetail

            if (params.materialType == 1) {
                ApiOpts = ArticleDetail
            } else if (params.materialType == 2) {
                ApiOpts = SaleDocumentDetail
            }

            ApiOpts(params.materialId).then(res => {
                const { code, data, msg } = res
                if (code === 'success') {
                    this.formData = data
                    this.doWxShare(params)
                } else {
                    this.$toast(msg)
                }
            })
        },
        doWxShare(params) {
            let shareTitle = '', url = window.location.href, imgUrl = '', desc = ''

            if (params.materialType == 1) {
                let {title, cover, contentAbstract} = this.formData

                shareTitle = title
                imgUrl = cover && cover.length ? cover : 'https://h5.jzcrm.com/static/img/default_article.png'
                desc = contentAbstract ? contentAbstract : title
            } else if (params.materialType == 2) {
                let {name, cover, fileSize} = this.formData

                shareTitle = name
                imgUrl = cover && cover.length ? cover : 'https://h5.jzcrm.com/static/img/default_pdf.png'
                desc = fileSize ? byteConvert(fileSize) : name
            }
            wxShare(shareTitle, url, imgUrl, desc)
        },
        formatDate,
        // 预览获取详情
        getPreviewDetails(params) {
            this.materialType = params.materialType
            this.formData = params.data
        }
    },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
    .material-content {
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
</style>
<style lang="less">
    .material-content {
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