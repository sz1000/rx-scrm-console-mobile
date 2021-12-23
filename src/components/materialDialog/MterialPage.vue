<template>
  <div class="material-template">
    <template v-if="!showUploadPoster && !showContentPreview && !showFileUpload">
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">从素材库选择</span>
      </div>
      <div class="material-tab">
        <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">个人素材库</div>
        <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">企业素材库</div>
      </div>
      <ul class="header-nav">
        <li @click="changeNav(1)" :class="{active: type == 1}"><span>种草文章</span></li>
        <li @click="changeNav(2)" :class="{active: type == 2}"><span>销售文件</span></li>
        <li @click="changeNav(3)" :class="{active: type == 3}"><span>营销海报</span></li>
      </ul>
      <search ref="search" :type="type"></search>
      <ul class="list-box">
        <li class="item-box" v-if="type == 1">
          <van-list v-model="articleListLoading" :immediate-check="false" :finished="articleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item" v-for="(i,indexp) in articleList" :key="indexp">
              <div class="flex_data right" @click="preview(i,indexp)">
                <div class="right">
                  <div class="img">
                    <span><img
                           :src="i.cover ? i.cover : 'https://jizhoucrm.oss-cn-shanghai.aliyuncs.com/verbalTrick/verbal/image/20211221113202895032/default_article.png'"
                           alt=""></span>
                  </div>
                  <div class="des">
                    <div>
                      <h3 class="one-line">{{i.title}}</h3>
                      <p class="one-line" v-html="i.contentAbstract"></p>
                    </div>
                  </div>
                </div>
                <div>
                  <span v-if="indexps == indexp">
                    <img src="../../images/duihao.png" class="duihao_img" alt="">
                  </span>
                  <span v-else class="roud_yun"></span>
                </div>
              </div>
              <!-- <div class="left" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.articleId}&type=1&userNo=${userNo}`, 'title': i.title, 'desc': i.contentAbstract ? i.contentAbstract : i.title, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_article.png' })"><img src="../../images/relay.png" alt=""></div> -->
            </div>
          </van-list>
        </li>
        <li class="item-box" v-if="type == 2">
          <van-list v-model="saleListLoading" :immediate-check="false" :finished="saleListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item" v-for="(i,indext) in saleList" :key="indext">
              <div class="flex_data right" @click="preview(i,indext)">

                <div class="right" @click="preview(i,indext)">
                  <img class="img" :src="i.cover ? i.cover : getFileDefaultCover(i.name)" alt="">
                  <div class="des">
                    <div>
                      <h3 class="one-line">{{i.name}}</h3>
                      <!-- <p class="one-line">{{i.fileSize ? byteConvert(i.fileSize) : ''}}</p> -->
                    </div>
                  </div>
                </div>
                <div>
                  <span v-if="indexps == indext">
                    <img src="../../images/duihao.png" class="duihao_img" alt="">
                  </span>
                  <span v-else class="roud_yun"></span>
                </div>
              </div>
              <!-- <div class="left" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`, 'title': i.name, 'desc': i.fileSize ? byteConvert(i.fileSize) : i.name, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png' })"><img src="../../images/relay.png" alt=""></div> -->
            </div>
          </van-list>
        </li>
        <li class="item-box" v-if="type == 3">
          <van-list v-model="posterListLoading" :immediate-check="false" :finished="posterListFinished" finished-text="没有更多了" @load="onLoad">
            <div class="item" v-for="(i,indexs) in posterList" :key="indexs">
              <div class="flex_data right" @click="preview(i,indexs)">

                <div class="right" @click="preview(i,indexs)">
                  <div class="img">
                    <span><img :src="i.posterUrl" alt=""></span>
                  </div>
                  <div class="des">
                    <div>
                      <h3 class="one-line">{{i.posterName}}</h3>
                    </div>
                  </div>
                </div>
                <div>

                  <span v-if="indexps == indexs" class="span_img">
                    <img src="../../images/duihao.png" class="duihao_img" alt="">
                  </span>
                  <span v-else class="roud_yun"></span>
                </div>
              </div>
              <!-- <div class="left" @click="sendChatMessage('image', false, '', i.mediaId)"><img src="../../images/relay.png" alt=""></div> -->
            </div>
          </van-list>
        </li>
      </ul>

      <!-- 转载公众号文章按钮 -->
      <!-- <div v-if="type == 0" class="reprint-box" @click="goNextStep"></div> -->
      <!-- 上传文件按钮 -->
      <!-- <div v-if="type == 1" class="poster-box">
                <file-upload :needFileInfo="true"></file-upload>
            </div> -->
      <!-- 上传海报按钮 -->
      <!-- <div v-if="type == 2" class="poster-box">
                <img-upload :isCustomize="true" :customizeType="3" :needFileInfo="true"></img-upload>
            </div> -->

      <div class="but_warp">
        <div class="cancel" @click="cancel">取消</div>
        <div class="determine" @click="determine">确认选择</div>
      </div>
    </template>

    <!-- <img-preview ref="imgPreview"></img-preview> -->

  </div>
</template>
<script>
import { ArticleList, SaleDocumentList, PosterList } from '../../config/api'
import { uploadTemporaryMaterial } from '../../api/myHome'
import {
  sendChatMessage,
  byteConvert,
  getFileDefaultCover,
} from '../../utils/tool'

import Search from './search'
import ImgPreview from '../../components/MaterialTemplate/imgPreview'
import ImgUpload from '../../components/MaterialTemplate/imgUpload'
import UploadPoster from '../../components/MaterialTemplate/uploadPoster'
import ContentPreview from '../../components/MaterialTemplate/contentPreview'
import FileUpload from '../../components/MaterialTemplate/fileUpload'
import ReprintEdit from '../../components/MaterialTemplate/reprintEdit'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'materialTemplate',
  data() {
    return {
      tab: 1,
      type: 1,
      centquer: {},
      indexps: null,
      articleList: [],
      totalArticle: 0,
      articleListPage: 1,
      articleListLoading: true,
      articleListFinished: false,
      articleListTotal: 0,

      saleList: [],
      totalSale: 0,
      saleListPage: 1,
      saleListLoading: true,
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

      shareUrlOrigin: '',
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
      // previewImg: this.previewImg,
      initType: null,
      goBack: null,
    }
  },
  created() {
    this.getCorpId().then(() => {
      this.getList()
      this.getTotal(2)
      this.getTotal(3)
    })
  },
  mounted() {},
  methods: {
    ...mapActions(['getCorpId']),
    goBack() {
      this.$router.go(-1)
    },
    tabClick(val) {
      this.tab = val
      this.type = 1
      this.initPage(this.type)
      this.getList()
    },
    cancel() {
      this.$router.go(-1)
      //         this.$router.push({
      //   path:"/talkTool/circleFriend",
      //   query:{
      //     datalist:this.centquer,
      //     tablable:"material"
      //   }
      // })
    },
    determine() {
      // this.$router.push({
      //   path: '/talkTool/circleFriend',
      //   query: {
      //     datalist: this.centquer,
      //     tablable: 'material',
      //   },
      // })
      let { friendtype } = this.$route.query
      if (Object.keys(this.centquer).length > 0) {
        if (friendtype == 'person') {
          // this.sendChart()
          this.getMediaId(this.centquer)
        } else if (friendtype == 'company') {
          this.$router.push({
            path: '/talkTool/circleFriend',
            query: {
              datalist: this.centquer,
              tablable: 'material',
            },
          })
        }
      }
    },
    // 获取mediaid
    getMediaId(val) {
      console.log(val, 'ppppppp----------')
      if (window.location.origin == 'https://console.jzcrm.com') {
        this.shareUrlOrigin = 'https://h5.jzcrm.com'
      } else {
        this.shareUrlOrigin = 'https://test-h5.jzcrm.com'
      }
      this.sendChart(val)
    },

    sendChart(mediaObj) {
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

    preview(item, val) {
      // console.log(item, val)
      this.centquer = item
      this.indexps = val
      this.$set(this.centquer, 'tab', this.type)
      // this.ifShowFooter(false)
      // this.showContentPreview = true
      // let obj = {
      //     type,
      //     userNo: this.userNo,
      //     data: item
      // }
      // this.$nextTick(() => {
      //     this.$refs.contentPreview.show(obj)
      // })
    },
    changeNav(type) {
      this.type = type
      if (type == 1) {
        this.indexps = 1000000
      } else if (type == 2) {
        this.indexps = 1000000
      } else {
        this.indexps = 1000000
      }
      this.type = type
      this.initPage(this.type)
      this.$nextTick(() => {
        this.$refs.search.searchText = ''
      })
      this.getList()
    },
    getTotal(type) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })
      let ApiOpts = null

      if (type == 2) {
        ApiOpts = SaleDocumentList
      } else if (type == 3) {
        ApiOpts = PosterList
      }

      ApiOpts({
        pageIndex: 1,
        pageSize: 10,
        corpId: this.corpId,
      }).then((res) => {
        this.handleTotalRes(type, res)
      })
    },
    // 获取总数
    handleTotalRes(type, res) {
      const { code, data } = res

      this.$toast.clear()
      if (code === 'success') {
        if (type == 2) {
          this.saleListTotal = data.total
        } else if (type == 3) {
          this.posterListTotal = data.total
        }
      }
    },
    onLoad() {
      if (
        (this.type == 1 && this.articleListPage <= 1) ||
        (this.type == 2 && this.saleListPage <= 1) ||
        (this.type == 3 && this.posterListPage <= 1)
      ) {
        return
      }
      this.getList()
    },
    getList(title) {
      if (
        (this.type == 1 && this.articleListPage == 1) ||
        (this.type == 2 && this.saleListPage == 1) ||
        (this.type == 3 && this.posterListPage == 1)
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

      if (this.type == 1) {
        params.title = title
        params.pageIndex = this.articleListPage
        ApiOpts = ArticleList
        this.articleListLoading = true
      } else if (this.type == 2) {
        params.name = title
        params.pageIndex = this.saleListPage
        ApiOpts = SaleDocumentList
        this.saleListLoading = true
      } else if (this.type == 3) {
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
        if (this.type == 1) {
          this.articleListLoading = false
          if (this.articleListPage == 1) {
            this.articleList = []
          }
          this.articleList = this.articleList.concat(data.page.records)
          this.articleListPage += 1
          this.articleListFinished = this.articleList.length >= data.page.total
        } else if (this.type == 2) {
          this.saleListLoading = false
          if (this.saleListPage == 1) {
            this.saleList = []
          }
          this.saleList = this.saleList.concat(data.page.records)
          this.saleListPage += 1
          this.saleListFinished = this.saleList.length >= data.page.total
        } else if (this.type == 3) {
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
      if (type == 1) {
        this.articleListPage = 1
        this.articleList = []
      } else if (type == 2) {
        this.saleListPage = 1
        this.saleList = []
      } else if (type == 3) {
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
        // query: {},
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

    // previewImg(i) {
    //     this.$refs.imgPreview.show(1, [i.posterUrl])
    // },
    ifShowFooter(data) {
      this.$emit('ifShowFooter', data)
    },
  },
  components: {
    Search,
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
  //   height: 100%;
  .but_warp {
    padding-left: 24px;
    width: 750px;
    height: 100px;
    background: #fff;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .cancel {
      width: 339px;
      height: 80px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #4168f6;
      color: #4168f6;
      font-size: 28px;
      line-height: 80px;
      text-align: center;
      margin-right: 24px;
    }
    .determine {
      width: 339px;
      height: 80px;
      background: #4168f6;
      border-radius: 8px;
      color: #ffffff;
      font-size: 28px;
      line-height: 80px;
      text-align: center;
    }
  }
  min-height: 100vh;
  background-color: @white;
  overflow-x: hidden;
  .headerTitle {
    // position: fixed;
    // top: 0;
    // left: 50%;
    // z-index: 10;
    width: 750px;
    // transform: translateX(-50%);
    cursor: pointer;
    background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    align-items: center;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    .backPage {
      .van-icon {
        vertical-align: -10%;
        width: 28px;
        height: 28px;
      }
    }
    .textTitle {
      // flex: 1;
      display: inline-block;
      padding-left: 193px;
    }
  }
  .header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid @lineColor; /* no */
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
      border: 2px solid @main; /* no */
      span {
        color: @main;
      }
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
        .flex_data {
          display: flex;
          align-items: center;
        }
        .roud_yun {
          width: 38px;
          height: 38px;
          background: #ffffff;
          border: 1px solid #e6e6e6;
          display: inline-block;
          border-radius: 50%;
        }
        .span_img {
          display: inline-block;
          width: 38px;
          height: 38px;
        }
        .duihao_img {
          width: 38px;
          height: 38px;
        }
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
          width: 94%;
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
            // height: 100px;
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
  }

  .poster-box {
    width: 104px;
    height: 104px;
    position: fixed;
    right: 32px;
    bottom: 140px;
  }
}
</style>