<template>
  <div class="material-template">
    <header-title v-if="isIndependent == 1 && !showUploadPoster && !showContentPreview && !showFileUpload" title="素材库"></header-title>
    <div class="material-tab">
      <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">个人素材库</div>
      <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">企业素材库</div>
    </div>
    <template v-if="!showUploadPoster && !showContentPreview && !showFileUpload">
      <ul class="header-nav pointer">
        <li @click="changeNav(0)" :class="{active: type == 0}"><span>种草文章</span></li>
        <li @click="changeNav(1)" :class="{active: type == 1}"><span>销售文件</span></li>
        <li @click="changeNav(2)" :class="{active: type == 2}"><span>营销海报</span></li>
      </ul>
      <div class="search_warp">
        <search ref="search" :type="type"></search>
        <div class="file_add">
          <jzIcon class="iconAdd" @click.native.stop="fnAddMaterial(type)" type="icon-a-bianzu77"></jzIcon>
          <file-upload :needFileInfo="true" v-show="type==1"></file-upload>
          <img-upload :isCustomize="true" :customizeType="3" :needFileInfo="true" v-show="type==2"></img-upload>
        </div>
      </div>
      <ul class="list-box">
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 0">
          <van-list v-model="articleListLoading" :immediate-check="false" :finished="articleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class=" pointer" v-for="i in articleList" :key="i.articleId">
              <div class="item">
                <!-- <div class="right" @click="fnMaterialDetail(i,type)"> -->
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
              <div class="li_bot">
                <div class="browse" @click="fnMaterialDetail(i,type)">
                  浏览次数 <span> {{i.openCount}} </span>
                  <img src="../../images/arrow_right.png" alt="">
                </div>
                <div class="share_img">
                  <img src="../../images/shareimg.png" alt="" v-show="tab==1" @click="fnShare(i,type)" />
                  <img src="../../images/sharecopy.png" alt="" v-show="tab==2" @click="fnCopy(i,type)" />
                </div>
              </div>
            </div>
          </van-list>
        </li>
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 1">
          <van-list v-model="saleListLoading" :immediate-check="false" :finished="saleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="pointer" v-for="i in saleList" :key="i.documentId">
              <div class="item">
                <!-- <div class="right" @click="fnMaterialDetail(i,type)"> -->
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
              <div class="li_bot">
                <div class="browse" @click="fnMaterialDetail(i,type)">
                  浏览次数<span> {{i.openCount}} </span>
                  <img src="../../images/arrow_right.png" alt="">
                </div>
                <div class="share_img">
                  <img src="../../images/shareimg.png" alt="" v-show="tab==1" @click="fnShare(i,type)" />
                  <img src="../../images/sharecopy.png" alt="" v-show="tab==2" @click="fnCopy(i,type)" />
                </div>
              </div>
            </div>
          </van-list>
        </li>
        <li class="item-box" :class="{'is-independent': isIndependent == 1}" v-if="type == 2">
          <van-list v-model="posterListLoading" :immediate-check="false" :finished="posterListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="pointer" v-for="i in posterList" :key="i.posterId">
              <div class="item">
                <!-- <div class="right" @click="fnMaterialDetail(i,type)"> -->
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
                <div v-show="isIndependent == 2" class="left" @click="sendChatMessage('image', false, '', i.mediaId)"><img
                       src="../../images/relay.png" alt="">
                </div>
              </div>
              <div class="li_bot">
                <div class="browse" @click="fnMaterialDetail(i,type)">
                  浏览次数 <span> {{i.openCount}} </span>
                  <img src="../../images/arrow_right.png" alt="">
                </div>
                <div class="share_img">
                  <img src="../../images/shareimg.png" alt="" v-show="tab==1" @click="fnShare(i,type)" />
                  <img src="../../images/sharecopy.png" alt="" v-show="tab==2" @click="fnCopy(i,type)" />
                </div>
              </div>
            </div>
          </van-list>
        </li>
      </ul>
      <!-- 2:上传海报按钮  1:上传文件按钮  0:转载公众号文章按钮 -->
      <!-- <div class="position-box">
        <div v-if="type == 0" class="reprint-box pointer" @click="goNextStep"></div>
        <div v-if="type == 1" class="poster-box">
          <file-upload :needFileInfo="true"></file-upload>
        </div>
        <div v-if="type == 2" class="poster-box">
          <img-upload :isCustomize="true" :customizeType="3" :needFileInfo="true"></img-upload>
        </div>
      </div> -->
    </template>
    <!-- 图片预览 -->
    <img-preview ref="imgPreview"></img-preview>

    <upload-poster v-if="showUploadPoster" :formData="posterData" @doShowUploadPoster="doShowUploadPoster"></upload-poster>
    <!-- 文章/文件预览 -->
    <content-preview v-show="showContentPreview" ref="contentPreview" @hideContentPreview="hideContentPreview"></content-preview>
    <!-- 文件上传 -->
    <reprint-edit v-if="showFileUpload" ref="reprintEdit" :type="2" @doShowFileUpload="doShowFileUpload"></reprint-edit>
    <!-- 分享弹窗 -->
    <van-action-sheet v-model="showShare" cancel-text="取消" close-on-click-action @cancel="onCancel">
      <div class="action_content pointer">
        <div class="text">分享到</div>
        <img src="../../images/shareWc.png" alt="" @click="sendChart">
        <div class="wxCircle">微信朋友圈</div>
      </div>
    </van-action-sheet>
    <!-- 复制的提示 -->
    <div class="copy_area" v-if="showCopy && tab==2" @click="clickView">
      <div class="icon_img">
        <img src="../../images/bell_l.png" alt="">
        <span>已复制到个人素材库</span>
      </div>
      <span>点击查看</span>
    </div>
  </div>
</template>
<script>
import {
  ArticleList,
  SaleDocumentList,
  PosterList,
  copy_material,
} from '../../config/api'
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
      tab: 1,
      type: 0,
      showShare: false,

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
      shareObj: {}, //分享信息
      showCopy: false,
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
    tabClick(val) {
      this.tab = val
      this.type = 0
      this.initPage(this.type)
      this.getList()
    },
    // 去素材详情页
    fnMaterialDetail(val, type) {
      console.log(val, '----详情页----')
      let id
      if (type == 0) {
        id = val.articleId
      } else if (val == 1) {
        id = val.documentId
      } else {
        id = val.posterId
      }
      this.$router.push({
        path: '/talkTool/matiralDetail',
        query: {
          type: type + 1,
          articleId: id,
        },
      })
    },
    //分享
    fnShare(val, type) {
      this.showShare = true
      this.shareObj = val
    },
    onCancel() {
      this.showShare = false
    },
    // 复制
    fnCopy(val, type) {
      this.shareObj = val
      let id
      if (type == 0) {
        id = val.articleId
      } else if (val == 1) {
        id = val.documentId
      } else {
        id = val.posterId
      }
      copy_material({ materialId: id, materialType: type + 1 }).then((res) => {
        if (res.result) {
          this.showCopy = true
          setTimeout(() => {
            this.showCopy = false
          }, 3000)
        }
      })
    },
    // 添加素材
    fnAddMaterial(v) {
      console.log(v)
      // 去往转载公众号文章页面
      if (v == 0) {
        this.$router.push({
          path: '/talkTool/reprint',
          query: { isIndependent: this.isIndependent },
        })
      }
    },
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
      if (
        (this.type == 0 && this.articleListPage == 1) ||
        (this.type == 1 && this.saleListPage == 1) ||
        (this.type == 2 && this.posterListPage == 1)
      ) {
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
        isPersonal: this.tab == 1 ? true : false,
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
    // 分享朋友圈
    sendChart() {
      console.log(this.shareObj, '-------llll----')
      this.$network
        .get('/user-service/m/user/getinticket', {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'getContext',
              'invoke',
              'shareToExternalContact',
              'shareToExternalChat',
              'navigateToAddCustomer',
              'shareToExternalMoments',
              'createChatWithMsg',
              'openExistedChatWithMsg',
            ],
          })

          wx.ready(function () {
            wx.invoke(
              'agentConfig',
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + '',
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: [
                  'getContext',
                  'invoke',
                  'shareToExternalContact',
                  'shareToExternalChat',
                  'navigateToAddCustomer',
                  'shareToExternalMoments',
                  'createChatWithMsg',
                  'openExistedChatWithMsg',
                ],
              },
              function (res) {
                let that = this,
                  url
                if (mediaObj.tab == 1) {
                  url = `${that.shareUrlOrigin}/materialTemplate?materialId=${mediaObj.articleId}&type=${mediaObj.tab}&corpId=${that.corpId}`
                } else if (mediaObj.tab == 2) {
                  url = `${that.shareUrlOrigin}/materialTemplate?materialId=${mediaObj.documentId}&type=${mediaObj.tab}&corpId=${that.corpId}`
                } else {
                  url = `${that.shareUrlOrigin}/materialTemplate?materialId=${mediaObj.articleId}&type=${mediaObj.tab}&corpId=${that.corpId}`
                }
                wx.invoke(
                  'shareToExternalMoments',
                  {
                    attachments: [
                      {
                        msgtype: 'link', // 消息类型，必填
                        link: {
                          title: mediaObj.title, // H5消息标题
                          imgUrl: mediaObj.cover, // H5消息封面图片URL
                          // url: '', // H5消息页面url 必填
                          url: url,
                        },
                      },
                    ],
                  },
                  function (res) {
                    alert(JSON.stringify(res))
                    if (res.err_msg == 'shareToExternalMoments:ok') {
                    }
                  }
                )
              }
            )
          })
        })
    },
    // 返回个人素材
    clickView() {
      console.log(this.shareObj)
      this.tab = 1
      this.initPage(this.type)
      this.getList()
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
  position: relative;
  .header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid @lineColor;
    li {
      width: 212px;
      height: 64px;
      background: #f7f7f7;
      border-radius: 32px;
      text-align: center;
      line-height: 64px;
      span {
        height: 100%;
        margin: 0 auto;
        color: @fontSub2;
        font-size: 28px;
      }
    }
    .active {
      background: @white;
      border: 1px solid @main;
      span {
        color: @main;
      }
    }
  }
  .search_warp {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 32px;
    .iconAdd {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .file_add {
      width: 100px;
      height: 100px;
      position: relative;
    }
  }
  .material-tab {
    height: 88px;
    line-height: 88px;
    display: flex;
    font-size: 28px;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .nomalText {
      color: #838a9d;
      width: 375px;
      text-align: center;
    }
    .active {
      color: #3c4353;
      font-weight: bold;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 43%;
        width: 56px;
        height: 8px;
        background: #4168f6;
        border-radius: 4px;
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
        padding: 26px 32px;
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
          background: #f7f7f7;
          padding: 16px;
          box-sizing: border-box;
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
      }
      .li_bot {
        padding: 0 32px 34px;
        display: flex;
        justify-content: space-between;
        position: relative;
        .browse {
          display: flex;
          align-items: center;
          line-height: 32px;
          color: #b3b3b3;
          font-size: 24px;
          span {
            display: inline-block;
          }
          img {
            width: 32px;
            height: 32px;
          }
        }
        .share_img {
          width: 36px;
          height: 36px;
          img {
            width: 100%;
          }
        }
        &::after {
          content: '';
          height: 2px;
          background-color: @lineColor;
          transform: scaleY(0.5);
          position: absolute;
          right: 0;
          left: 0;
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
            max-width: 78%;
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
    top: 0;
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
  .van-popup {
    .van-action-sheet__content {
      .action_content {
        height: 316px;
        font-size: 28px;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .text {
          color: #b3b3b3;
          margin-bottom: 40px;
        }
        img {
          width: 100px;
          height: 100px;
        }
        .wxCircle {
          color: #262626;
          margin-top: 16px;
        }
      }
    }
  }
  .copy_area {
    position: fixed;
    bottom: 32px;
    left: 32px;
    width: 686px;
    height: 104px;
    // opacity: 0.7;
    background: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    cursor: pointer;
    .icon_img {
      display: flex;
      align-items: center;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }
}
</style>