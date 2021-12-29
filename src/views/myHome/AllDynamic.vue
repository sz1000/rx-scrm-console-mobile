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
        <li @click="changeNav(1)" :class="{active: type == 1}" ><span>线索动态</span></li>
        <!-- <li @click="changeNav(2)" :class="{active: type == 2}" ><span>商机动态</span></li> -->
        <li @click="changeNav(3)" :class="{active: type == 3}" ><span>客户动态</span></li>
      </ul>
    <div class="searchInput">
      <van-field v-model="value1" placeholder="关联客户名称/企业名称/…">
        <template #left-icon>
          <van-icon name="search"  @click="search" />
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
               <p class="tite_num"> 共 <span class="num">{{articletotal}}</span><span>客户动态，关联</span> <span class="num">{{articlecusCount}}</span>个客户</p>
            <div   class="client_list" v-for="(item ,index) in articleList" :key="index">
                 <div class="client_item" @click="goCustomer(item)" >
                     <div  class="client_img">
                         <div class="user_img">
                             <img :src="item.avatar" alt="" v-if="item.avatar">
                             <img src="../../images/nomal_avt.png" alt="" v-else>
                         </div>
                     </div>
                        <div class="client_message">
                             <div class="tite_name"> 
                                 <span class="name">{{item.customerCalled}}</span>
                                 <span class="company" v-if="item.cropFullName ">@{{item.cropFullName}}</span>
                             </div>
                             <div class="time">{{item.createTime}}</div>
                             <div class="department"><span v-if="item.optUserName">[{{item.optUserName}}]</span>{{getTextFun(item)}} 
                                 <!-- <span v-if="item.toUser">[{{item.toUser | optToString}}]</span> -->
                                <span v-if="item.fromUser && item.optType != 44 && fromUserNum.indexOf(item.optType) > -1">
                                    {{item.fromUser | optString}}
                                </span>
                                <span  v-if="item.optType && item.toUser && item.optType == 6">
                                    <span>{{item.toUser | optToString}}</span>
                                </span>
                                <span v-for="(us,ri) in item.toUser" :key="ri">
                                  <span v-if="item.fromUser && item.optType != 44 && fromUserNum.indexOf(item.optType) > -1">
                                    {{us | optString}}
                                  </span>
                                </span>
                                <span></span>
                            </div>
                        </div>

                 </div>
            </div>
            
          </van-list>
        </li>
        <li class="item-box" v-if="type == 2">
          <van-list v-model="saleListLoading" :immediate-check="false" :finished="saleListFinished" finished-text="没有更多了" @load="onLoad">
            <!-- <div class="item" v-for="(i,indext) in saleList" :key="indext"> -->
                 <p class="tite_num"> 共 <span class="num">{{saletotal}}</span><span>条商机动态，关联</span> <span class="num">{{salecusCount}}</span>个客户</p>
            <div   class="client_list" v-for="(item,indext) in saleList" :key="indext">
                 <div class="client_item" @click="goCustomer(item)" >
                     <div  class="client_img">
                         <div class="user_img">
                             <img :src="item.avatar" alt="" v-if="item.avatar">
                             <img src="../../images/nomal_avt.png" alt="" v-else>
                         </div>
                     </div>
                        <div class="client_message">
                             <div class="tite_name"> 
                                 <span class="name">{{item.customerCalled}}</span>
                                 <span class="company" v-if="item.cropFullName || item.customerName"> @{{item.cropFullName || item.customerName}}</span>
                             </div>
                             <div class="time">{{item.createTime}}</div>
                              <div class="department"><span v-if="item.optUserName">[{{item.optUserName}}]</span>{{getTextFun(item)}} 
                                 <!-- <span v-if="item.toUser">[{{item.toUser | optToString}}]</span> -->
                                <span v-if="item.fromUser && item.optType != 44 && fromUserNum.indexOf(item.optType) > -1">
                                    {{item.fromUser | optString}}
                                </span>
                                <span  v-if="item.optType && item.toUser && item.optType == 6">
                                    <span>{{item.toUser | optToString}}</span>
                                </span>
                                <span v-for="(us,ri) in item.toUser" :key="ri">
                                  <span v-if="item.fromUser && item.optType != 44 && fromUserNum.indexOf(item.optType) > -1">
                                    {{us | optString}}
                                  </span>
                                </span>
                                <span></span>
                            </div>
                        </div>

                 </div>
            </div>
              <!-- <div class="left" @click="sendChatMessage('news', false, { 'link': `${originUrl}/materialTemplate?materialId=${i.documentId}&type=2&userNo=${userNo}`, 'title': i.name, 'desc': i.fileSize ? byteConvert(i.fileSize) : i.name, 'imgUrl': i.cover ? i.cover : 'https://h5.jzcrm.com/static/img/default_pdf.png' })"><img src="../../images/relay.png" alt=""></div> -->
            <!-- </div> -->
          </van-list>
        </li>
        <li class="item-box" v-if="type == 3">
          <van-list v-model="posterListLoading" :immediate-check="false" :finished="posterListFinished" finished-text="没有更多了" @load="onLoad">
              <p class="tite_num"> 共 <span class="num">{{postertotal}}</span><span>条互动协同消息，关联</span> <span class="num">{{postercusCount}}</span>个客户</p>
            <div class="custom_content" v-for="(item,indexs) in posterList" :key="indexs" @click="goCustomer(item)" >
                <div class="card_box" >
                <div class="chat_warp">
                    <div class="chat_one" >
                    <div class="left_cnt">
                        <img :src="item.optAvatar" alt="" v-if="item.optAvatar">
                        <img src="../../images/nomal_avt.png" alt="" v-else>
                        <div class="content">
                        <div class="name_one">{{item.optUserName}}</div>
                        <div class="creat_time">{{item.createTime}}</div>
                        <div class="cont_text">
                            <span>{{item.context.receiveUserInfo | alt}}</span>
                            <span>{{item.context.content}}</span>
                        </div>
                        </div>
                    </div>
                    <!-- <img src="../../images/ico_pl.png" alt="" class="talk" @click="goCustomer(item)" /> -->
                    </div>
                </div>
                <div class="custom_msg">
                    <!-- <img :src="item.avatar" alt="" v-if="item.avatar" /> -->
                    <img :src="item.avatar" alt=""  />
                    <div class="name_text">{{item.customerCalled}}</div>
                    <span class="weixin" v-if="item.externalType == 1">@微信</span>
                    <span class="company_name" v-else> @{{item.customerName || item.cropFullName }}</span>
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
import { ArticleLists, SaleDocumentLists, PosterLists } from '../../config/api'
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
      articlecusCount:0,
      articletotal:0,

      saleList: [],
      totalSale: 0,
      saleListPage: 1,
      saleListLoading: true,
      saleListFinished: false,
      saleListTotal: 0,
      salecusCount:0,
      saletotal:0,

      posterList: [],
      totalPoster: 0,
      posterListPage: 1,
      posterListLoading: false,
      posterListFinished: false,
      posterListTotal: 0,
      postercusCount:0,
      postertotal:0,
      originUrl: location.origin,

      showUploadPoster: false, // 是否展示海报上传页面
      posterData: {}, // 上传的海报图片信息
      showContentPreview: false,
      showFileUpload: false, // 是否展示文件上传页面
      fileData: {}, // 上传的文件信息

      value1:'',
      showFilter: false,
      actions: [
        { name: '全部', id: 0 },
        { name: '负责人', id: 1 },
        { name: '协助人', id: 2 },],
        tabName: '全部',
        cardList:[],
        dynamicList:[],
        selectId:'',
        types:1,
        fromUserNum: [6],
        
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
    //    this.cataList()
    // this.getCorpId().then(() => {
      this.getList()
      this.getTotal(2)
      this.getTotal(3)
      this.type = this.$route.query.type || 1
     console.log(this.$route.query.type,"00p---=")
    // })
  },
  mounted() {},
  methods: {
          goCustomer(val) {
      console.log(val)
      // this.$router.push({
      //   path: '/customerPortrait',
      //   query: {
      //     id: val.followId,
      //     userNo: val.clueCustomerNo,
      //     num: val.rowAt,
      //   },
      // })
          this.$router.push({
        path: '/customerManage/customDetail',
        query: {
          userNo:  "",
          clueCustomerNo: val.clueCustomerNo
          
        },
      })
    },
    //   cataList(){
    //       let params = {
    //         page:1,
    //         limit:10,
    //         isMang:0,
    //         searchParam:"",
    //         punckStatus:1
    //       }
    //       queryFollowMsgPage(params).then((res) =>{
    //           console.log(res.data.data.records)
    //           this.dynamicList =  res.data.data.records
    //       })
    //   }, 
    search(){
        console.log(11)
        if(this.type == 1){
            this.articleListPage =1
          this.getList()
        }else if(this.type == 2){
            this.saleListPage = 1
              this.getList()
        }else{
            this.posterListPage = 1
            this.getList()
        }
    },
    goBack() {
      this.$router.go(-1)
    },
     filterCard() {
      this.showFilter = true
    },
    fnSelect(v) {
      this.tabName = v.name
      this.selectId = v.id
      console.log(v)
         if(this.type == 1){
            this.articleListPage =1
          this.getList()
        }else if(this.type == 2){
           this.saleListPage = 1
              this.getList()
        }else{
             this.posterListPage = 1
            this.getList()
        }
    //   this.getList()
    },
    
    // ...mapActions(['getCorpId']),
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
        console.log(type)
      this.type = type
      if (type == 1) {
          this.types = 1
          this.value1 = ""
          this.tabName = "全部"
           this.selectId = 0
        // this.indexps = 1000000
      } else if (type == 2) {
          this.types = 3
          this.value1 = ""
          this.tabName = "全部"
            this.selectId = 0
        // this.indexps = 1000000
      } else {
        // this.indexps = 1000000
         this.types = 4
           this.value1 = ""
           this.tabName = "全部"
             this.selectId = 0
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
        ApiOpts = SaleDocumentLists
      } else if (type == 3) {
        ApiOpts = PosterLists
      }

      ApiOpts({
        // pageIndex: 1,
        // pageSize: 10,
        // corpId: this.corpId,
        
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
  if (this.type == 1 && this.articleListPage == 1 || this.type == 2 && this.saleListPage == 1 || this.type == 3 && this.posterListPage == 1) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })
              }
      let ApiOpts = ArticleLists

      let params = {
        // pageSize: 10,
         limit: 10,
         isMang:this.selectId || 0,
         searchParam:this.value1,
         punckStatus:this.types
        // corpId: this.corpId,
      }

      if (this.type == 1) {
        params.title = title
        params.page = this.articleListPage
        ApiOpts = ArticleLists
        this.articleListLoading = true
      } else if (this.type == 2) {
        params.name = title
        params.page = this.saleListPage
        ApiOpts = SaleDocumentLists
        this.saleListLoading = true
      } else if (this.type == 3) {
        params.name = title
        params.page = this.posterListPage
        ApiOpts = PosterLists
        this.posterListLoading = true
      }

      ApiOpts(params).then((res) => {
        this.handleRes(res)
      })
    },
    handleRes(res) {
      const { code, data, msg } = res
     console.log(data,"00p",data.data.records)
      this.$toast.clear()
      if (code === 'success') {
        this.getTotal(data)
        if (this.type == 1) {
          this.articleListLoading = false
          if (this.articleListPage == 1) {
            this.articleList = []
          }
              console.log("搜索",this.articleList.concat(data.data.records))
          this.articleList = this.articleList.concat(data.data.records)
          console.log("-----",this.articleList)
          this.articlecusCount = data.cusCount
          this.articletotal = data.total
          this.articleListPage += 1
          this.articleListFinished = this.articleList.length >= data.total
        } else if (this.type == 2) {
          this.saleListLoading = false
          if (this.saleListPage == 1) {
            this.saleList = []
          }
          this.salecusCount = data.cusCount
          this.saletotal = data.total
          this.saleList = this.saleList.concat(data.data.records)
          this.saleListPage += 1
          this.saleListFinished = this.saleList.length >= data.total
        } else if (this.type == 3) {
          this.posterListLoading = false
          if (this.posterListPage == 1) {
            this.posterList = []
          }
            // let whiteList = [21]
            //   if(whiteList.indexOf(el.optType) > -1){
            //   el.context = JSON.parse(el.context)
            //   }
         this.postercusCount = data.cusCount
          this.postertotal = data.total
          this.posterList = this.posterList.concat(data.data.records)
          if(this.posterList && this.posterList.length > 0){
             this.posterList.forEach(el =>{
             let whiteList = [21]
              if(whiteList.indexOf(el.optType) > -1){
              el.context = JSON.parse(el.context)
              }
            })
          }
          this.posterListPage += 1
          this.posterListFinished = this.posterList.length >= data.total
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
     getTextFun(obj){
            // console.log('asd',obj)
            let val = obj.optType,str = ''
            switch (val) {
                case 0:
                    str = obj.context
                    break;
                case 1:
                    str = '建立了客户档案'
                    break;
                case 2:
                    str = '导入了客户信息'
                    break;
                case 3:
                    str = '从企微同步了'
                    break;
                     case 4:
                    str = obj.context
                    break;
                case 5:
                    str = '更新了客户信息'
                    break;
                case 6:
                    str = '将负责人从'
                    break;
                case 7:
                    str = '将客户分配给了'
                    break;
                case 8:
                    if(obj.optUserName){
                        str = '领取了客户'
                    }else{
                        str = obj.context
                    }
                    break;
                case 9:
                    str = '放弃了客户，客户已回到公海'
                    break;
                case 11:
                    str = '上传了附件'
                    break;
                case 12:
                    str = '删除了附件'
                    break;
                case 13:
                    str = `新增了一条记录“${obj.context}”`
                    break;
                case 14:
                    str = '拜访了客户'
                    break;
                case 15:
                    str = '新增了商机' + obj.context
                    break;
                case 16:
                    str = '更新了商机'
                    break;
                case 17:
                    str = '删除了商机'
                    break;
                case 18:
                    if(obj.optUserName){
                        if(obj.createBy){
                            str = '新增协作人'
                        }else{
                            str = obj.context
                        }
                    }else{
                        str = obj.context
                    }
                    break;
                case 20:
                    str = '删除了协作人'
                    break;
                case 26:
                    let name = obj.ossObjectname ? obj.ossObjectname : obj.context
                    str = `新增标签“${name}”`
                    break;
                case 28:
                    str = obj.context
                    break;
                case 29:
                    str = '发起激活客户'
                    break;
                case 30:
                    str = obj.context
                    break;
                case 36:
                    str = obj.context
                    break;
                case 39:
                    str = obj.context
                    break;
                case 40:
                    str = obj.context
                    break;
                case 44:
                    let _str = ''
                    if(obj.optResult == 1){
                        _str = '(已通过)'
                    }else if(obj.optResult == 0){
                        _str = '(已拒绝)'
                    }
                    str = '申请成为协助人' + _str
                    break;
                case 46:
                    str = '已自动成为协助人'
                    break;
                case 47:
                    break;
                case 48:
                    break;
                default:
                    break;
            }
            return str
        },
  },
     filters: {
        alt(list){
        let arr = []
        if(list && list.length){
         if(list.length == 1 && !list[0].userName){
            return '@所有人'
            }else{
             list.forEach(el => {
              let str = '@' + el.userName
                arr.push(str)
                    })
                return  arr.join(' ')
                }
            }
        
        },
        optString(val){
            // console.log('val',`${val.name}-${val.depId}`)
            return val.name && val.depId ? `${val.name}-${val.depId}` : val.name
        },
        optToString(val){
            let arr = []
            if(val && val.length){
                let str = ''
                val.forEach(el => {
                    str = el.name && el.depId ? `${el.name}-${el.depId}` : el.name
                })
                arr.push(str)
            }
            return arr && arr.length ? arr.join('、') : ''
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
      color: #737373;
      span {
        height: 100%;
        margin: 0 auto;
        // color: #262626;
        
        font-size: 28px;
      }
    }
    .active {
        //  color: #3c4353;
         color: #4168F6;
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
    background: #fff;
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
        mix-height: 244px;
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
                  display: flex;
                  align-items: center;
                    .name{
                        font-size: 32px;    
                        color: #262626;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        max-width: 180px;
                        display: inline-block;
                    }
                    .company{
                        font-size: 24px;
                        color: #FFB020;
                        margin-left: 6px;
                        width: 320px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
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
                   width: 526px;
                   word-break: break-all;
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
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                max-width: 180px;
              }
              .creat_time {
                color: #c0c4cc;
                font-size: 24px;
                margin: 8px 0 16px;
              }
              .cont_text {
                font-size: 28px;
                word-break: break-word;
                 width: 526px;
              
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
          font-weight: 600;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          max-width: 180px;
        }
          .weixin{
            font-weight: 400;
            color: #52BD94;    
            font-size: 24px;
          }
          .company_name{
            color: #FFB020;
            font-size: 24px;
            font-weight: 400;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            max-width: 380px;
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