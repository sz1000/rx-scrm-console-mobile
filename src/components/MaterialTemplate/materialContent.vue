<template>
  <div v-if="formData" class="material-content">
    <template v-if="materialType == 1">
      <h2 class="title">{{formData.title || formData.materialName}}</h2>
      <div v-if="formData.author || formData.pushTime" class="info">
        <span class="author">{{formData.author}}</span>
        <span v-if="formData.isTimeShow" class="time">{{formData.pushTime ? formatDate(formData.pushTime, "yyyy-MM-dd") : ''}}</span>
      </div>
      <p class="content" v-html="formData.content"></p>
    </template>

    <div v-if="materialType == 2 && formData && formData.documentUrl" class="file-content">
      <!-- <div v-if="/\.pdf$/i.test(formData.name)" class="file-img-box">
                <img class="item" v-for="i in formData.imageRelList" :key="i.documentId" :src="i.imageUrl" alt="">
            </div> -->
      <!-- <iframe v-if="/\.xls$|\.xlsx$/i.test(formData.name)" class="file-box" :src="'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(formData.documentUrl)" width='100%' height='100%'></iframe> -->
      <!-- <iframe v-else-if="/\.pdf$/i.test(formData.name)" class="file-box" :src="formData.documentUrl" width='100%' height='100%'>
                您的浏览器暂不支持预览该pdf文件，可<a :href="formData.documentUrl">点击下载</a>之后浏览
            </iframe> -->
      <iframe class="file-box" :class="{h2: !userNo}" :src="'https://view.xdocin.com/view?src=' + encodeURIComponent(formData.documentUrl)"
              width="100%" height="auto"></iframe>
    </div>
  </div>
</template>
<script>
import { ArticleDetail, SaleDocumentDetail } from '../../config/api'

import { formatDate, wxShare, byteConvert } from '../../utils/tool'

export default {
  name: 'materialContent',
  props: {
    userNo: {
      default: null,
    },
  },
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
      ApiOpts(params.materialId).then((res) => {
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
      let shareTitle = '',
        url = window.location.href,
        imgUrl = '',
        desc = ''

      if (params.materialType == 1) {
        let { title, cover, contentAbstract } = this.formData

        shareTitle = title
        imgUrl =
          cover && cover.length
            ? cover
            : 'https://h5.jzcrm.com/static/img/default_article.png'
        desc = contentAbstract ? contentAbstract : title
      } else if (params.materialType == 2) {
        let { name, cover, fileSize } = this.formData

        shareTitle = name
        imgUrl =
          cover && cover.length
            ? cover
            : 'https://h5.jzcrm.com/static/img/default_pdf.png'
        desc = fileSize ? byteConvert(fileSize) : name
      }
      wxShare(shareTitle, url, imgUrl, desc)
    },
    formatDate,
    // 预览获取详情
    getPreviewDetails(params) {
      console.log('---params---', params)
      const { materialType } = params

      this.materialType = materialType
      this.formData = params.data
    },
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
    .author,
    .time {
      margin: 0 20px 20px 0;
    }
    .time {
      color: rgba(0, 0, 0, 0.3);
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
  .file-content {
    .file-box {
      min-height: calc(100vh - 270px);
      border: none;
    }
    .h2 {
      min-height: calc(100vh - 70px);
    }
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