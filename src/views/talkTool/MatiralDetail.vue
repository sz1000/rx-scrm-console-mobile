<template>
  <div class="matiral_detail">
    <template v-if="!showContentPreview">
      <div class="header-title pointer">
        <div class="back-page" @click="goBack">
          <img src="../../images/arrow_left.png" alt="">
        </div>
        <span class="text-title">浏览详情</span>
      </div>
      <div class="info_one" @click="previewImg">
        <div class="left">
          <img :src="formObj.cover" alt="" v-if="formObj.cover" />
          <img src="../../images/img_head.png" alt="" v-else />
          <div class="content_t">
            <h3 class="one-line">{{formObj.materialName}}</h3>
            <p>{{formObj.contentAbstract}}</p>
          </div>
        </div>
        <!-- <div class="right pointer">
        <img src="../../images/ckpre.png" alt="">
      </div> -->
      </div>
      <div class="view_hour">
        共 {{formObj.openCount}}次浏览,带来{{formObj.visitorsCount}}人,总时长{{secondToDate(formObj.browseDuration)}}
      </div>
      <div class="tab_warp">
        <div class="nomalText" @click="changeNav(0)" :class="{active: indexLi == 0}">
          <span>全部</span>
        </div>
        <div class="nomalText" @click="changeNav(3)" :class="{active: indexLi == 3}">
          <span>新线索({{newTotal > 99 ? '99+' : newTotal}})</span>
        </div>
        <div class="nomalText" @click="changeNav(2)" :class="{active: indexLi == 2}">
          <span>线索({{cluesTotal > 99 ? '99+' : cluesTotal}})</span>
        </div>
        <div class="nomalText" @click="changeNav(1)" :class="{active: indexLi == 1}">
          <span>客户({{customerTotal > 99 ? '99+' : customerTotal}})</span>
        </div>
      </div>
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了~" @load="onLoad">
        <div class="one" v-for="list in popupList" :key="list.id">
          <div class="left" @click="goCustomer(list)">
            <img :src="list.avatar" alt="" v-if="list.avatar">
            <img src="../../images/img_head.png" alt="" v-else>
            <div class="name_warp">
              <div class="top">
                <span>{{list.customerName}}</span>
                <span
                      :class="list.externalType == 1 ? 'green': 'yellow'">{{list.externalType == 1 ? '@微信' : (list.externalCorpFullName || list.externalCorpName) ? `@${list.externalCorpFullName || list.externalCorpName}` : ''}}</span>
                <span v-show="list.customerType == 3" class="newClues">新线索</span>
                <span v-show="list.customerType == 2" class="clues">线索</span>
                <span v-show="list.customerType == 1" class="customer">客户</span>
                <!-- <span>{{ list.externalType | getType }}</span> -->
              </div>
              <p>共浏览{{list.openCount}}次，总时长{{secondToDate(list.duration)}}</p>
            </div>
          </div>
          <div class="right">
            <img src="../../images/arrow_right.png" alt="" @click="fnToBrowse(list)" />
          </div>
        </div>
      </van-list>
    </template>
    <!-- 图片预览 -->
    <img-preview ref="imgPreview"></img-preview>
    <!-- 文章/文件预览 -->
    <content-preview v-show="showContentPreview" ref="contentPreview" @hideContentPreview="hideContentPreview"></content-preview>
  </div>
</template>
<script>
import { material_operation_info } from '../../config/api'
import ImgPreview from '../../components/MaterialTemplate/imgPreview'
import ContentPreview from '../../components/MaterialTemplate/contentPreview'
import {
  sendChatMessage,
  byteConvert,
  getFileDefaultCover,
  qwShare,
} from '../../utils/tool'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    ImgPreview,
    ContentPreview,
  },
  computed: {
    ...mapState(['corpId', 'userNo']),
  },
  data() {
    return {
      type: this.$route.query.type || '',
      articleId: this.$route.query.articleId || '',
      formObj: {},
      indexLi: 0,
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      newTotal: '',
      cluesTotal: '',
      customerTotal: '',
      popupList: [],
      showContentPreview: false,
    }
  },
  created() {
    this.getDetailList()
  },
  filters: {
    getType(type) {
      if (type == 1) {
        return '客户'
      } else if (type == 2) {
        return '线索'
      } else if (type == 3) {
        return '新线索'
      }
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changeNav(v) {
      this.indexLi = v
      this.page = 1
      this.popupList = []
      this.getDetailList()
    },
    onLoad() {
      this.getDetailList()
    },
    getDetailList() {
      this.$toast.loading({
        overlay: true,
        loadingType: 'spinner',
        duration: 0,
      })
      let params = {
        materialType: this.type,
        materialId: this.articleId,
        pageIndex: this.page,
        pageSize: this.pageSize,
        customerType: this.indexLi,
      }
      material_operation_info(params).then((res) => {
        this.$toast.clear()
        if (res.result && res.data) {
          this.formObj = res.data
          this.newTotal = res.data.newClueCount
          this.cluesTotal = res.data.clueCount
          this.customerTotal = res.data.customerCount
          let rows = res.data.page.records //请求返回当页的列表
          this.loading = false
          if (this.page == 1) {
            this.popupList = []
          }
          this.page++
          this.total = res.data.page.total
          this.popupList = this.popupList.concat(rows)

          if (this.popupList.length >= this.total) {
            this.finished = true
          } else {
            this.finished = false
          }
        }
      })
    },
    // 到详情页
    fnToBrowse(v) {
      this.$router.push({
        path: '/talkTool/materialBrowseDetail',
        query: {
          type: this.type,
          articleId: this.articleId,
          customerId: v.customerId,
        },
      })
    },
    //到客户画像
    goCustomer(val) {
      console.log(val)
      this.$router.push({
        path: '/customerManage/customDetail',
        query: {
          userNo: val.externalUseridIn || '',
          clueCustomerNo: val.customerNo,
        },
      })
    },
    secondToDate(result) {
      let _str = ''
      var h =
        Math.floor(result / 3600) < 10
          ? '0' + Math.floor(result / 3600)
          : Math.floor(result / 3600)
      var m =
        Math.floor((result / 60) % 60) < 10
          ? '0' + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60)
      var s =
        Math.floor(result % 60) < 10
          ? '0' + Math.floor(result % 60)
          : Math.floor(result % 60)
      if (Number(h)) {
        _str = h + '小时' + m + '分' + s + '秒'
      } else if (Number(m)) {
        _str = m + '分' + s + '秒'
      } else {
        if (Number(s) > 0) {
          _str = Number(s) + '秒'
        } else {
          _str = '0秒'
        }
      }
      return _str
    },
    previewImg() {
      if (this.type == 3) {
        this.$refs.imgPreview.show(1, [this.formObj.posterUrl])
      } else {
        this.ifShowFooter(false)
        this.showContentPreview = true
        let obj = {
          type: this.type,
          userNo: this.userNo,
          data: this.formObj,
        }
        document.getElementsByClassName('matiral_detail')[0].scrollTop = 0

        this.$nextTick(() => {
          this.$refs.contentPreview.show(obj)
        })

        // this.doQwShare(true, this.type, this.formObj)
      }
    },
    hideContentPreview(data) {
      this.ifShowFooter(true)
      this.showContentPreview = data
      // this.doQwShare(false)
    },
    // doQwShare(showContentPreview, type, item) {
    //   let shareTitle = '内容素材-极洲互动',
    //     url = window.location.href,
    //     imgUrl = 'https://test-h5.jzcrm.com/static/img/neirongsucai.png',
    //     desc = '多种文章、文件及海报供你参阅'

    //   if (showContentPreview) {
    //     // 预览状态
    //     if (type == 1) {
    //       let { articleId, title, cover, contentAbstract } = item

    //       url = `${window.location.origin}/materialTemplate?materialId=${articleId}&type=1&userNo=${this.userNo}`
    //       shareTitle = title
    //       imgUrl =
    //         cover && cover.length
    //           ? cover
    //           : 'https://h5.jzcrm.com/static/img/default_article.png'
    //       desc = contentAbstract ? contentAbstract : title
    //     } else if (type == 2) {
    //       let { documentId, name, cover, fileSize } = item

    //       url = `${window.location.origin}/materialTemplate?materialId=${documentId}&type=2&userNo=${this.userNo}`
    //       shareTitle = name
    //       imgUrl =
    //         cover && cover.length
    //           ? cover
    //           : 'https://h5.jzcrm.com/static/img/default_pdf.png'
    //       desc = fileSize ? byteConvert(fileSize) : name
    //     }
    //     qwShare(true, shareTitle, url, imgUrl, desc)
    //   } else {
    //     qwShare(false, shareTitle, url, imgUrl, desc)
    //   }
    // },
    // // 是否显示footer-nav
    ifShowFooter(data) {
      // if (this.isIndependent == 2) {
      // }
      this.$emit('ifShowFooter', data)
    },
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.matiral_detail {
  height: 100%;
  background: @white;
  .header-title {
    width: 10rem;
    height: 87px;
    line-height: 87px;
    padding: 0 24px;
    background-color: @white;
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 2px solid #e6e6e6;
    .back-page {
      position: absolute;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
      img {
        display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
      }
      .reback {
        display: inline-block;
        vertical-align: middle;
        font-size: 28px;
        color: @fontMain;
      }
    }
    .text-title {
      font-size: 30px;
      color: @fontMain;
      font-weight: 600;
    }
  }
  .info_one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    .left {
      display: flex;
      background: #f7f7f7;
      padding: 16px;
      width: 100%;
      // margin-right: 32px;
      // flex: 1;
      .content_t {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 16px;
        .one-line {
          width: 538px;
          font-size: 28px;
          color: #262626;
          white-space: nowrap;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
    .right {
      img {
        width: 84px;
        height: 84px;
      }
    }
  }
  .view_hour {
    padding: 0 32px 32px;
    color: #b3b3b3;
    font-size: 24px;
    border-bottom: 1px solid #e6e6e6; /* no */
  }
  .tab_warp {
    display: flex;
    justify-content: space-around;
    height: 96px;
    line-height: 96px;
    font-size: 28px;
    border-bottom: 1px solid #e6e6e6; /* no */
    .nomalText {
      color: #838a9d;
      // width: 375px;
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
        left: 50%;
        width: 56px;
        height: 4px;
        background: #4168f6;
        border-radius: 2px;
        transform: translateX(-60%);
      }
    }
  }
  .one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    .left {
      display: flex;
      max-width: 80%;
      .name_warp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .top {
          span {
            display: inline-block;
          }
          span:nth-child(1) {
            font-size: 28px;
            color: #262626;
            font-weight: bold;
          }
          .green {
            font-size: 24px;
            display: inline-block;
            color: #52bd94;
            margin-right: 8px;
            margin-left: 4px;
          }
          .yellow {
            font-size: 24px;
            display: inline-block;
            color: #ffb020;
            margin-right: 8px;
            margin-left: 4px;
          }
          .newClues {
            font-size: 20px;
            border: 1px solid #fb8f28; /* no */
            color: #fb8f28;
            padding: 2px 16px;
            border-radius: 21px;
          }
          .clues {
            font-size: 20px;
            border: 1px solid #55a7fe; /* no */
            color: #55a7fe;
            padding: 2px 16px;
            border-radius: 21px;
          }
          .customer {
            font-size: 20px;
            border: 1px solid #4168f6; /* no */
            color: #4168f6;
            padding: 2px 16px;
            border-radius: 21px;
          }
        }
        p {
          margin-top: 16px;
          color: #b3b3b3;
          font-size: 24px;
        }
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
    .right {
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>