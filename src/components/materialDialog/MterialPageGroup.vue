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
            <ul class="header-nav">
                <li @click="changeNav(1)" :class="{active: type == 1}"><span>文章({{articleListTotal > 99 ? '99+' : articleListTotal}})</span></li>
                <li @click="changeNav(2)" :class="{active: type == 2}"><span>文件({{saleListTotal > 99 ? '99+' : saleListTotal}})</span></li>
                <li @click="changeNav(3)" :class="{active: type == 3}"><span>海报({{posterListTotal > 99 ? '99+' : posterListTotal}})</span></li>
            </ul>
            <search ref="search" :type="type"></search>
            <ul class="list-box">
                <li class="item-box" v-if="type == 1">
                    <van-list
                        v-model="articleListLoading"
                        :immediate-check="false"
                        :finished="articleListFinished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                        <div class="item" v-for="(i,indexp) in articleList" :key="indexp">
                             <div class="flex_data right"  @click="preview(i,indexp)">
                            <div class="right" >
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
                    <van-list
                        v-model="saleListLoading"
                        :immediate-check="false"
                        :finished="saleListFinished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
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
                    <van-list
                        v-model="posterListLoading"
                        :immediate-check="false"
                        :finished="posterListFinished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
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

                             <span v-if="indexps == indexs">
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
           <div class="determine" @click="determine">确定</div>
      </div>
        </template>

        <!-- <img-preview ref="imgPreview"></img-preview> -->

     
    </div>
</template>
<script>
import { ArticleList, SaleDocumentList, PosterList } from "../../config/api"
import { sendChatMessage, byteConvert, getFileDefaultCover } from '../../utils/tool'

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
    data() {
        return {
            type: 1,
             centquer:{},
              indexps:1000000,
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

            showUploadPoster: false,  // 是否展示海报上传页面
            posterData: {}, // 上传的海报图片信息
            showContentPreview: false,
            showFileUpload: false, // 是否展示文件上传页面
            fileData: {}, // 上传的文件信息
        }
    },
    computed: {
        ...mapState(["corpId", "userNo"]),
    },
    provide() {
        return {
            checkTable: this.checkTable,
            getImgUrl: this.getImgUrl,
            getFileUrl: this.getFileUrl,
            previewImg: this.previewImg,
            initType: null,
            goBack: null,
        }
    },
    created() {
        this.getCorpId().then(() => {
            this.getList()
            this.getTotal(1)
            this.getTotal(2)
        })
    },
    methods: {
          goBack() {
     this.$emit('sureTab', 0)
    },
        cancel(){
            this.$emit('sureTab', 0)
              // this.$emit('sure', {})
    },
        determine(){
      console.log("000")
           this.$emit('sureTab', 0)
        this.$emit('sure', this.centquer)

    },
        ...mapActions(["getCorpId"]),
                preview(item,val) {
           console.log(item,val)
            this.centquer = item
            this.indexps = val
              this.$set(this.centquer, "tab", this.type);
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
           if(type == 1){
               this.indexps = 1000000
           }else if(type == 2){
                  this.indexps = 1000000
           }else{
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
                corpId: this.corpId
            }).then(res => {
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
            if (this.type == 1 && this.articleListPage <= 1 || this.type == 2 && this.saleListPage <= 1 || this.type == 3 && this.posterListPage <= 1) {
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
                corpId: this.corpId
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

            ApiOpts(params).then(res => {
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
 
 


        previewImg(i) {
            this.$refs.imgPreview.show(1, [i.posterUrl])
        },
        ifShowFooter(data) {
            this.$emit('ifShowFooter', data)
        }
    },
    components: {
        Search,
        ImgUpload,
        UploadPoster,
        ContentPreview,
        FileUpload,
        ReprintEdit
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.material-template {
     min-height: 100vh;
    // width: 750px;
    // margin: 0 auto;
    background-color: @white;
      // position: fixed;
    // top: 0;
    // left: 50%;
    // z-index: 10;
    overflow-x: hidden;
    .but_warp{
    background: #fff;
    display: flex;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    .cancel{
    width: 339px;
height: 80px;
background: #FFFFFF;
border-radius: 8px;
border: 1px solid #4168F6;
color: #4168F6;
font-size: 28px;
line-height: 80px;
text-align: center;
margin-right: 24px;
  }
    .determine{
    width: 339px;
    height: 80px;
    background: #4168F6;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 28px;
    line-height: 80px;
    text-align: center;
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
            transform: scaleY(.5);
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
             .flex_data{
               display: flex;
               align-items: center;
             }
                .roud_yun{
         width: 38px;
         height: 38px;
         background: #FFFFFF;
         border: 1px solid #D9DAE4;
         display: inline-block;
         border-radius: 50%;
       }
       .duihao_img{
         width: 38px;
         height: 38px;
       }
                display: flex;
                align-items: center;
                padding:  32px;
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
                        background-color: #F6F7F9;
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
                    transform: scaleY(.5);
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