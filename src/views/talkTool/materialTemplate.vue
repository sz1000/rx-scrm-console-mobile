<template>
  <div class="material-template">
    <header-title v-if="isIndependent == 1 && !showUploadPoster && !showContentPreview && !showFileUpload" title="素材库"></header-title>
    <template v-if="!showUploadPoster && !showContentPreview && !showFileUpload">
      <ul class="header-nav pointer">
        <li @click="changeNav(0)" :class="{active: type == 0}"><span>种草文章({{articleListTotal > 99 ? '99+' : articleListTotal}})</span></li>
        <li @click="changeNav(1)" :class="{active: type == 1}"><span>销售文件({{saleListTotal > 99 ? '99+' : saleListTotal}})</span></li>
        <li @click="changeNav(2)" :class="{active: type == 2}"><span>营销海报({{posterListTotal > 99 ? '99+' : posterListTotal}})</span></li>
      </ul>
      <search ref="search" :type="type"></search>
      <ul class="list-box">
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 0">
          <van-list v-model="articleListLoading" :immediate-check="false" :finished="articleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item pointer" v-for="i in articleList" :key="i.articleId">
              <div class="right" @click="preview(1, i)">
                <div class="img">
                  <span><img :src="i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_article.png'" alt=""></span>
                </div>
                <div class="des">
                  <div>
                    <h3 class="one-line">{{i.title}}</h3>
                    <p class="one-line" v-html="i.contentAbstract"></p>
                  </div>
                </div>
              </div>
              <div v-show="isIndependent == 2" class="left"
                   @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.articleId}&type=1&userNo=${userNo}`, 'title': i.title, 'desc': i.contentAbstract ? i.contentAbstract : i.title, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_article.png' })">
                <img src="../../images/relay.png" alt="">
              </div>
            </div>
          </van-list>
        </li>
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 1">
          <van-list v-model="saleListLoading" :immediate-check="false" :finished="saleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item pointer" v-for="i in saleList" :key="i.documentId">
              <div class="right" @click="preview(2, i)">
                <img class="img" :src="i.cover ? i.cover : getFileDefaultCover(i.name)" alt="">
                <div class="des">
                  <div>
                    <h3 class="one-line">{{i.name}}</h3>
                    <p class="one-line">{{i.fileSize ? byteConvert(i.fileSize) : ''}}</p>
                  </div>
                </div>
              </div>
              <div v-show="isIndependent == 2" class="left"
                   @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`, 'title': i.name, 'desc': i.fileSize ? byteConvert(i.fileSize) : i.name, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png' })">
                <img src="../../images/relay.png" alt="">
              </div>
            </div>
          </van-list>
        </li>
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 2">
          <van-list v-model="posterListLoading" :immediate-check="false" :finished="posterListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item pointer" v-for="i in posterList" :key="i.posterId">
              <div class="right" @click="previewImg(i)">
                <div class="img">
                  <span><img :src="i.posterUrl" alt=""></span>
                </div>
                <div class="des">
                  <div>
                    <h3 class="one-line">{{i.posterName}}</h3>
                  </div>
                </div>
              </div>
              <div v-show="isIndependent == 2" class="left" @click="sendChatMessage('image', false, '', i.mediaId)"><img src="../../images/relay.png"
                     alt=""></div>
            </div>
          </van-list>
        </li>
      </ul>
      <div class="position-box">
        <!-- 转载公众号文章按钮 -->
        <div v-if="type == 0" class="reprint-box pointer" @click="goNextStep"></div>
        <!-- 上传文件按钮 -->
        <div v-if="type == 1" class="poster-box">
          <file-upload :needFileInfo="true"></file-upload>
        </div>
        <!-- 上传海报按钮 -->
        <div v-if="type == 2" class="poster-box">
          <img-upload :isCustomize="true" :customizeType="3" :needFileInfo="true"></img-upload>
        </div>
      </div>
    </template>

    <img-preview ref="imgPreview"></img-preview>

    <upload-poster v-if="showUploadPoster" :formData="posterData" @doShowUploadPoster="doShowUploadPoster"></upload-poster>
    <!-- 文章/文件预览 -->
    <content-preview v-show="showContentPreview" ref="contentPreview" @hideContentPreview="hideContentPreview"></content-preview>
    <!-- 文件上传 -->
    <reprint-edit v-if="showFileUpload" ref="reprintEdit" :type="2" @doShowFileUpload="doShowFileUpload"></reprint-edit>
  </div>
</template>
<script>
import { ArticleList, SaleDocumentList, PosterList } from '../../config/api'
import {
  sendChatMessage,
  byteConvert,
  getFileDefaultCover,
  qwShare,
} from '../../utils/tool'

import HeaderTitle from '../../components/MaterialTemplate/headerTitle'
import Search from '../../components/MaterialTemplate/search'
import ImgPreview from '../../components/MaterialTemplate/imgPreview'
import ImgUpload from '../../components/MaterialTemplate/imgUpload'
import UploadPoster from '../../components/MaterialTemplate/uploadPoster'
import ContentPreview from '../../components/MaterialTemplate/contentPreview'
import FileUpload from '../../components/MaterialTemplate/fileUpload'
import ReprintEdit from '../../components/MaterialTemplate/reprintEdit'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'materialTemplate',
  props: {
    isIndependent: {
      // 1: 素材是独立路由，2: 素材是组件
      default: 1,
    },
  },
  data() {
    return {
      type: 0,

      articleList: [],
      totalArticle: 0,
      articleListPage: 1,
      articleListLoading: false,
      articleListFinished: false,
      articleListTotal: 0,

      saleList: [],
      totalSale: 0,
      saleListPage: 1,
      saleListLoading: false,
      saleListFinished: false,
      saleListTotal: 0,

      posterList: [],
      totalPoster: 0,
      posterListPage: 1,
      posterListLoading: false,
      posterListFinished: false,
      posterListTotal: 0,

      originUrl: location.origin,

      showUploadPoster: false, // 是否展示海报上传页面
      posterData: {}, // 上传的海报图片信息
      showContentPreview: false,
      showFileUpload: false, // 是否展示文件上传页面
      fileData: {}, // 上传的文件信息
    }
  },
  computed: {
    ...mapState(['corpId', 'userNo']),
  },
  provide() {
    return {
      checkTable: this.checkTable,
      getImgUrl: this.getImgUrl,
      getFileUrl: this.getFileUrl,
      previewImg: this.previewImg,
      initType: null,
      goBack: this.goBack,
    }
  },
  created() {
    this.getCorpId().then(() => this.getList())
    this.doQwShare(false)
  },
  methods: {
    ...mapActions(['getCorpId']),
    changeNav(type) {
      this.type = type
      this.initPage(this.type)
      this.$nextTick(() => {
        this.$refs.search.searchText = ''
      })
      this.getList()
    },
    onLoad() {
      if (
        (this.type == 0 && this.articleListPage <= 1) ||
        (this.type == 1 && this.saleListPage <= 1) ||
        (this.type == 2 && this.posterListPage <= 1)
      ) {
        return
      }
      if (this.$refs.search.searchText) {
        this.getList(this.$refs.search.searchText)
        return
      }
      this.getList()
    },
    getList(title) {
      if (this.type == 0 && this.articleListPage == 1 || this.type == 1 && this.saleListPage == 1 || this.type == 2 && this.posterListPage == 1) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
          loadingType: 'spinner',
        })
      }

      let ApiOpts = ArticleList

      let params = {
        pageSize: 10,
        corpId: this.corpId,
      }

      if (this.type == 0) {
        params.title = title
        params.pageIndex = this.articleListPage
        ApiOpts = ArticleList
        this.articleListLoading = true
      } else if (this.type == 1) {
        params.name = title
        params.pageIndex = this.saleListPage
        ApiOpts = SaleDocumentList
        this.saleListLoading = true
      } else if (this.type == 2) {
        params.name = title
        params.pageIndex = this.posterListPage
        ApiOpts = PosterList
        this.posterListLoading = true
      }

      ApiOpts(params).then((res) => {
        this.handleRes(res)
      })
    },
    handleRes(res) {
      const { code, data, msg } = res

      this.$toast.clear()
      if (code === 'success') {
        this.getTotal(data)
        if (this.type == 0) {
          this.articleListLoading = false
          if (this.articleListPage == 1) {
            this.articleList = []
          }
          this.articleList = this.articleList.concat(data.page.records)
          this.articleListPage += 1
          this.articleListFinished = this.articleList.length >= data.page.total
        } else if (this.type == 1) {
          this.saleListLoading = false
          if (this.saleListPage == 1) {
            this.saleList = []
          }
          this.saleList = this.saleList.concat(data.page.records)
          this.saleListPage += 1
          this.saleListFinished = this.saleList.length >= data.page.total
        } else if (this.type == 2) {
          this.posterListLoading = false
          if (this.posterListPage == 1) {
            this.posterList = []
          }
          this.posterList = this.posterList.concat(data.page.records)
          this.posterListPage += 1
          this.posterListFinished = this.posterList.length >= data.page.total
        }
      } else {
        this.$toast(msg)
      }
    },
    getTotal(data) {
      this.articleListTotal = data.articleCount
      this.saleListTotal = data.documenetCount
      this.posterListTotal = data.posterCount
    },
    // 查询
    checkTable(data) {
      this.initPage(this.type)
      this.getList(data)
    },
    initPage(type) {
      if (type == 0) {
        this.articleListPage = 1
        this.articleList = []
      } else if (type == 1) {
        this.saleListPage = 1
        this.saleList = []
      } else if (type == 2) {
        this.posterListPage = 1
        this.posterList = []
      }
    },
    sendChatMessage,
    byteConvert,
    getFileDefaultCover,
    // 去往转载公众号文章页面
    goNextStep() {
      this.$router.push({
        path: '/talkTool/reprint',
        query: { isIndependent: this.isIndependent },
      })
    },
    getFileUrl(data) {
      this.ifShowFooter(false)
      this.fileData = data
      this.showFileUpload = true
      this.$nextTick(() => {
        this.$refs.reprintEdit.doShowFile(this.fileData)
      })
    },
    // 海报上传图片地址获取
    getImgUrl(data) {
      this.ifShowFooter(false)
      this.posterData = data
      this.showUploadPoster = true
    },
    doShowUploadPoster(data) {
      this.ifShowFooter(true)
      const { showUploadPoster, isRefresh } = data

      if (isRefresh) {
        this.changeNav(2)
      }
      this.showUploadPoster = showUploadPoster
    },
    doShowFileUpload(data) {
      this.ifShowFooter(true)
      const { showFileUpload, isRefresh } = data

      if (isRefresh) {
        this.changeNav(1)
      }
      this.showFileUpload = showFileUpload
    },
    hideContentPreview(data) {
      this.ifShowFooter(true)
      this.showContentPreview = data
      this.doQwShare(false)
    },
    preview(type, item) {
      this.ifShowFooter(false)
      this.showContentPreview = true
      let obj = {
        type,
        userNo: this.userNo,
        data: item,
      }

      document.getElementsByClassName('material-template')[0].scrollTop = 0

      this.$nextTick(() => {
        this.$refs.contentPreview.show(obj)
      })

      this.doQwShare(true, type, item)
    },
    previewImg(i) {
      this.$refs.imgPreview.show(1, [i.posterUrl])
    },
    // 是否显示footer-nav
    ifShowFooter(data) {
      if (this.isIndependent == 2) {
        this.$emit('ifShowFooter', data)
      }
    },
    // 顶部标题返回（工作台）
    goBack() {
      this.$router.push('/home')
    },
    // 企业微信分享
    doQwShare(showContentPreview, type, item) {
      let shareTitle = '内容素材-极洲互动',
        url = window.location.href,
        imgUrl = 'https://test-h5.jzcrm.com/static/img/neirongsucai.png',
        desc = '多种文章、文件及海报供你参阅'

      if (showContentPreview) {
        // 预览状态
        if (type == 1) {
          let { articleId, title, cover, contentAbstract } = item

          url = `${window.location.origin}/materialTemplate?materialId=${articleId}&type=1&userNo=${this.userNo}`
          shareTitle = title
          imgUrl =
            cover && cover.length
              ? cover
              : 'https://h5.jzcrm.com/static/img/default_article.png'
          desc = contentAbstract ? contentAbstract : title
        } else if (type == 2) {
          let { documentId, name, cover, fileSize } = item

          url = `${window.location.origin}/materialTemplate?materialId=${documentId}&type=2&userNo=${this.userNo}`
          shareTitle = name
          imgUrl =
            cover && cover.length
              ? cover
              : 'https://h5.jzcrm.com/static/img/default_pdf.png'
          desc = fileSize ? byteConvert(fileSize) : name
        }
        qwShare(true, shareTitle, url, imgUrl, desc)
      } else {
        qwShare(false, shareTitle, url, imgUrl, desc)
      }
    },
  },
  components: {
    HeaderTitle,
    Search,
    ImgPreview,
    ImgUpload,
    UploadPoster,
    ContentPreview,
    FileUpload,
    ReprintEdit,
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.material-template {
  height: 100%;
  background-color: @white;
  overflow-x: hidden;
  .header-nav {
    display: flex;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid @lineColor;
    li {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      line-height: 100px;
      text-align: center;
      span {
        height: 100%;
        margin: 0 auto;
        color: @fontSub2;
        font-size: 28px;
      }
    }
    .active {
      span {
        color: @main;
        border-bottom: 4px solid @main;
      }
    }
  }
  .list-box {
    padding-bottom: 132px;
    position: relative;
    &::after {
      content: '';
      height: 2px;
      background-color: @lineColor;
      transform: scaleY(0.5);
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
    }
    .item-box {
      /deep/ .van-list__finished-text {
        font-size: 24px;
        color: @lengthColor;
      }
      .item {
        display: flex;
        align-items: center;
        padding: 32px;
        position: relative;
        .left {
          width: 48px;
          min-width: 48px;
          height: 48px;
          margin-left: 24px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          width: 88%;
          .img {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 8px;
            vertical-align: middle;
            background-color: #f6f7f9;
            overflow: hidden;
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
          }
          .des {
            display: inline-block;
            height: 100px;
            max-width: 72%;
            margin-left: 20px;
            vertical-align: middle;
            div {
              display: flex;
              height: 100%;
              justify-content: space-between;
              flex-direction: column;
              h3 {
                font-size: 28px;
                color: @fontMain;
              }
              p {
                word-break: break-all;
                font-size: 24px;
                color: @fontSub2;
              }
            }
          }
        }
        &::after {
          content: '';
          height: 2px;
          background-color: @lineColor;
          transform: scaleY(0.5);
          position: absolute;
          right: 0;
          left: 32px;
          bottom: 0;
        }
      }
    }
    .poster {
      padding: 24px 0;
      .item {
        padding: 0;
        margin: 0 0 24px 24px;
      }
    }
    .is-independent {
      .item {
        .right {
          width: 100%;
          .des {
            max-width: 80%;
          }
        }
      }
    }
  }
  .position-box {
    width: 5rem;
    height: 104px;
    background-color: transparent;
    pointer-events: none;
    position: fixed;
    left: 50%;
    bottom: 140px;
    div {
      pointer-events: auto;
    }
  }
  .reprint-box {
    width: 104px;
    height: 104px;
    background-color: @main;
    border-radius: 50%;
    box-shadow: 0 6px 34px 0 rgba(65, 104, 246, 0.3);
    position: absolute;
    right: 32px;
    bottom: 0;
    &::before,
    &::after {
      content: '';
      border-radius: 100px;
      background-color: @white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      width: 44px;
      height: 6px;
    }
    &::after {
      width: 6px;
      height: 44px;
    }
  }
  .poster-box {
    width: 104px;
    height: 104px;
    position: absolute;
    right: 32px;
    bottom: 0;
  }
}
</style>