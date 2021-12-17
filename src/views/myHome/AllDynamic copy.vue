<template>
  <div class="material-template">
    <template v-if="!showUploadPoster && !showContentPreview && !showFileUpload">
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">全部动态</span>
      </div>
      <ul class="header-nav">
        <li @click="changeNav(1)" :class="{active: type == 1}" ><span>客户动态</span></li>
        <li @click="changeNav(2)" :class="{active: type == 2}" ><span>商机动态</span></li>
        <li @click="changeNav(3)" :class="{active: type == 3}" ><span>互动协同</span></li>
      </ul>
    <div class="searchInput">
      <van-field v-model="value1" placeholder="客户名称/公司/手机号码">
        <template #left-icon>
          <van-icon name="search" />
        </template>
      </van-field>
   
      <div class="select_box" @click="filterCard">
        <span>{{tabName}}</span>
        <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
      </div>
      
    </div>
      
     
       
      <!-- <search ref="search" :type="type"></search> -->
      <ul class="list-box">
        <li class="item-box" v-if="type == 1">
           <!-- v-for="(i,indexp) in articleList" :key="indexp" -->
          <van-list v-model="articleListLoading" :immediate-check="false" :finished="articleListFinished" finished-text="没有更多了" @load="onLoad">
               <p class="tite_num"> 共 <span class="num">3</span><span>客户动态，关联</span> <span class="num">2</span>个客户</p>
            <div   class="client_list" v-for="(item ,index) in dynamicList" :key="index">
                 <div class="client_item">
                     <div  class="client_img">
                         <div class="user_img">
                             <img :src="item.optAvatar" alt="" v-if="item.optAvatar">
                             <img src="../../images/nomal_avt.png" alt="" v-else>
                         </div>
                     </div>
                        <div class="client_message">
                             <div class="tite_name"> 
                                 <span class="name">{{item.userName}}</span>
                                 <span class="company"> @车速派二手车销售服务有限公司</span>
                             </div>
                             <div class="time">{{item.createTime}}</div>
                             <div class="department">[陈良-运营部] 新增了协助人 [王扬-</div>
                        </div>

                 </div>
            </div>
            
          </van-list>
        </li>
        <li class="item-box" v-if="type == 2">
          <van-list v-model="saleListLoading" :immediate-check="false" :finished="saleListFinished" finished-text="没有更多了" @load="onLoad">
            <!-- <div class="item" v-for="(i,indext) in saleList" :key="indext"> -->
                 <p class="tite_num"> 共 <span class="num">3</span><span>条商机动态，关联</span> <span class="num">2</span>个客户</p>
            <div   class="client_list">
                 <div class="client_item">
                     <div  class="client_img">
                         <div class="user_img">
                             <img src="../../images/nomal_avt.png" alt="">
                         </div>
                     </div>
                        <div class="client_message">
                             <div class="tite_name"> 
                                 <span class="name">自在随原</span>
                                 <span class="company"> @车速派二手车销售服务有限公司</span>
                             </div>
                             <div class="time">2021-9-12 12:30:20</div>
                             <div class="department">[陈良-运营部] 新增了协助人 [王扬-</div>
                        </div>

                 </div>
            </div>
              <!-- <div class="left" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`, 'title': i.name, 'desc': i.fileSize ? byteConvert(i.fileSize) : i.name, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png' })"><img src="../../images/relay.png" alt=""></div> -->
            <!-- </div> -->
          </van-list>
        </li>
        <li class="item-box" v-if="type == 3">
          <van-list v-model="posterListLoading" :immediate-check="false" :finished="posterListFinished" finished-text="没有更多了" @load="onLoad">
            
            <div class="custom_content">
                <div class="card_box" >
                <div class="chat_warp">
                    <div class="chat_one" >
                    <div class="left_cnt">
                        <img src="../../images/nomal_avt.png" alt="">
                        <div class="content">
                        <div class="name_one">111</div>
                        <div class="creat_time">222}</div>
                        <div class="cont_text">
                            <span>@我</span>
                            &nbsp;
                            <span>11122</span>
                        </div>
                        </div>
                    </div>
                    <img src="../../images/ico_pl.png" alt="" class="talk" @click="goCustomer(list)" />
                    </div>
                </div>
                <div class="custom_msg">
                    <!-- <img :src="item.avatar" alt="" v-if="item.avatar" /> -->
                    <img src="../../images/xiansuo.png" alt=""  />
                    <div class="name_text">223</div>
                    <span>444</span>
                </div>
                </div>
            </div>

          </van-list>
        </li>
      </ul>


    </template>

    <!-- <img-preview ref="imgPreview"></img-preview> -->
       <div class="filter_box">
      <van-action-sheet v-model="showFilter" :actions="actions" cancel-text="取消" close-on-click-action @select='fnSelect' />
    </div>
  </div>
</template>
<script>
import { ArticleList, SaleDocumentList, PosterList } from '../../config/api'
import {
  sendChatMessage,
  byteConvert,
  getFileDefaultCover,
} from '../../utils/tool'
import {queryFollowMsgPage} from "../../api/myHome"
// import Search from './search'
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
      type: 1,
      centquer: {},
      indexps: 1000000,
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

      value1:'',
      showFilter: false,
      actions: [
        { name: '从未联系', id: 0 },
        { name: '超过1天', id: 1 },
        { name: '超过3天', id: 2 },],
        tabName: '',
        cardList:[],
        dynamicList:[],
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
       this.cataList()
    this.getCorpId().then(() => {
      this.getList()
      this.getTotal(2)
      this.getTotal(3)
     
    })
  },
  mounted() {},
  methods: {
      cataList(){
          let params = {
            page:1,
            limit:10,
            isMang:0,
            searchParam:"",
            punckStatus:1
          }
          queryFollowMsgPage(params).then((res) =>{
              console.log(res.data.data.records)
              this.dynamicList =  res.data.data.records
          })
      }, 
    goBack() {
      this.$router.go(-1)
    },
     filterCard() {
      this.showFilter = true
    },
    fnSelect(v) {
      this.tabName = v.name
      console.log(v)
    },
    
    ...mapActions(['getCorpId']),
    preview(item, val) {
      console.log(item, val)
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
    //   this.$nextTick(() => {
    //     this.$refs.search.searchText = ''
    //   })
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })

      let ApiOpts = ArticleList

      let params = {
        pageSize: 10,
        corpId: this.corpId,
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
    // Search,
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
//   min-height: 100vh;
    background-color: @white;
    // overflow-x: hidden;
//   .tite_num{
//        padding: 0 32px;
//        margin-top: 36px;
//        font-size: 24px;
//         font-weight: 500;
//        color: #737373;
//        .num{
//           font-weight: 600;
//           color: #262626;
//           font-size: 28px;
//           margin: 0 4px;
//         }
//       }
    .searchInput {
    margin-top: 32px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-field {
      height: 68px;
      width: 424px;
      background: #f7f8fa;
      border-radius: 16px;
      padding: 0;
      padding-left: 32px;
      line-height: 68px;
    }
    .select_box {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #838a9d;
      width: 230px;
      height: 68px;
      background: #f7f8fa;
      border-radius: 16px;
      justify-content: space-between;
      padding: 0 32px;
      .rotate {
        transform: rotate(180deg);
      }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
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
        color: #262626;
        font-size: 28px;
      }
    }
    .active {
         color: #3c4353;
      font-weight: bold;
      position: relative;
           &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 40%;
        width: 56px;
        height: 8px;
        background: #4168f6;
        border-radius: 4px;
      }
    //   span {
    //     // color: @main;
    //     // border-bottom: 4px solid @main;
    //       content: '';
    //     position: absolute;
    //     bottom: 0;
    //     left: 40%;
    //     width: 56px;
    //     height: 8px;
    //     background: #4168f6;
    //     border-radius: 4px;
    //   }
    }
  }
  .list-box {
    padding-bottom: 132px;
    position: relative;
    &::after {
      content: '';
      height: 2px;
    //   background-color: @lineColor;
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
        .tite_num{
       padding: 36px 32px 0;
    //    margin-top: 36px;
       font-size: 24px;
        font-weight: 500;
       color: #737373;
       .num{
          font-weight: 600;
          color: #262626;
          font-size: 28px;
          margin: 0 4px;
        }
      }
      .client_list{
        width: 686px;
        height: 244px;
        background: #FFFFFF;
        box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.04);
        border-radius: 16px;
         padding: 32px;
          margin: 18px auto 0;
          .client_item{
              display: flex;
           .client_img{
            //    display: flex;
            //    align-items: center;
            .user_img{
               img{
                   width: 80px;
                   height: 80px;
                   border-radius: 50% ;
               }
            }
             }
            .client_message{
                margin-left: 16px;
                .tite_name{
                    .name{
                        font-size: 32px;    
                        color: #262626;
                        font-weight: 600;
                    }
                    .company{
                        font-size: 24px;
                        color: #FFB020;
                    }
                }
               .time{
                   font-size: 24px;
                   color: #B3B3B3;
                   margin-top: 12px;
               }
               .department{
                   font-size: 28px;
                   color: #737373;
                   margin-top: 16px;
               }
            }
          }
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
          border: 1px solid #b3b3b3;
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
        .custom_content {
    padding: 0 32px 32px;
    .card_box {
      padding: 0 32px;
      // background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.04);
      border-radius: 16px;
      margin-top: 32px;
      .chat_warp {
        padding-top: 32px;
        .chat_one {
          display: flex;
          margin-bottom: 56px;
          justify-content: space-between;
          .left_cnt {
            display: flex;
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin-right: 16px;
            }
            .content {
              .name_one {
                font-size: 28px;
                color: #3c4353;
                font-weight: bold;
              }
              .creat_time {
                color: #c0c4cc;
                font-size: 24px;
                margin: 8px 0 16px;
              }
              .cont_text {
                font-size: 28px;
                span:nth-child(1) {
                }
                span:nth-child(2) {
                  color: #c0c4cc;
                }
              }
            }
          }
          .talk {
            width: 32px;
            height: 32px;
          }
        }
      }
      .custom_msg {
        display: flex;
        align-items: center;
        border-top: 1px solid #e6e6e6;
        height: 110px;
        .name_text {
          font-size: 32px;
          color: #3c4353;
          margin: 0 8px;
        }
        .weixin {
          display: inline-block;
          font-size: 24px;
          color: #52bd94;
          margin-right: 8px;
        }
        .qiye {
          display: inline-block;
          font-size: 24px;
          color: #ffb020;
          margin-right: 8px;
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }
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