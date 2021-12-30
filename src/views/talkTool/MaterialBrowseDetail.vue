<template>
  <div class="matiral_detail">
    <template v-if="!showContentPreview">
      <div class="header-title pointer">
        <div class="back-page" @click="goBack">
          <img src="../../images/arrow_left.png" alt="">
        </div>
        <span class="text-title">浏览记录</span>
      </div>
      <div class="info_one" @click="previewImg">
        <div class="left">
          <img :src="materialObj.cover" alt="" v-if="materialObj.cover" />
          <img src="../../images/img_head.png" alt="" v-else />
          <div class="content_t">
            <h3>{{materialObj.materialName}}</h3>
            <p>{{materialObj.contentAbstract}}</p>
          </div>
        </div>
      </div>
      <div class="one">
        <div class="left" @click="goCustomer">
          <img :src="customerObj.avatar" alt="" v-if="customerObj.avatar">
          <img src="../../images/img_head.png" alt="" v-else>
          <div class="name_warp">
            <div class="top">
              <span>{{customerObj.customerName}}</span>
              <span
                    :class="customerObj.externalType == 1 ? 'green': 'yellow'">{{customerObj.externalType == 1 ? '@微信' : (customerObj.externalCorpFullName || customerObj.externalCorpName) ? `@${customerObj.externalCorpFullName || customerObj.externalCorpName}` : ''}}</span>
              <span v-show="customerObj.customerType == 3" class="newClues">新线索</span>
              <span v-show="customerObj.customerType == 2" class="clues">线索</span>
              <span v-show="customerObj.customerType == 1" class="customer">客户</span>
            </div>
            <p>共浏览{{customerObj.openCount}}次，总时长{{secondToDate(customerObj.duration)}}</p>
          </div>
        </div>
      </div>
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="brow_list">
          <li v-for="item in browList" :key="item.id">
            <div class="left_time">
              <p>浏览了{{secondToDate(item.duration)}}</p>
              <p>{{item.endTime}}</p>
            </div>
            <div class="right_user">
              <p>素材分享人</p>
              <p> <img :src="item.shareUserAvatar" alt="" v-if="item.shareUserAvatar" />
                <img src="../../images/default_header.jpg" alt="" v-else />
                <span>{{item.shareUserName | getNameLength}}</span>
              </p>
            </div>
          </li>
        </ul>
      </van-list>
    </template>
    <!-- 图片预览 -->
    <img-preview ref="imgPreview"></img-preview>
    <!-- 文章/文件预览 -->
    <content-preview v-show="showContentPreview" ref="contentPreview" @hideContentPreview="hideContentPreview"></content-preview>
  </div>
</template>
<script>
import { material_operation, material_operation_info } from '../../config/api'
import ImgPreview from '../../components/MaterialTemplate/imgPreview'
import ContentPreview from '../../components/MaterialTemplate/contentPreview'
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
      customerId: this.$route.query.customerId || '',
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      materialObj: {}, //素材信息
      customerObj: {},
      browList: [],
      showContentPreview: false,
    }
  },
  created() {
    this.getDetailList()
    this.getHeaderTop()
  },
  methods: {
    //到客户画像
    goCustomer() {
      // console.log(this.customerObj)
      this.$router.push({
        path: '/customerManage/customDetail',
        query: {
          userNo: this.customerObj.externalUseridIn || '',
          clueCustomerNo: this.customerObj.customerNo,
        },
      })
    },
    goBack() {
      this.$router.go(-1)
    },

    onLoad() {
      this.getDetailList()
    },
    getHeaderTop() {
      let params = {
        materialType: this.type,
        materialId: this.articleId,
        customerId: this.customerId,
        pageIndex: this.page,
        pageSize: this.pageSize,
      }
      material_operation_info(params).then((res) => {
        this.materialObj = res.data
      })
    },
    getDetailList() {
      // console.log(this.tabClick)
      this.$toast.loading({
        overlay: true,
        loadingType: 'spinner',
        duration: 0,
      })
      let params = {
        materialType: this.type,
        materialId: this.articleId,
        customerId: this.customerId,
        pageIndex: this.page,
        pageSize: this.pageSize,
      }
      material_operation(params).then((res) => {
        this.$toast.clear()
        if (res.result) {
          this.customerObj = res.data
          let rows = res.data.page.records //请求返回当页的列表
          this.loading = false
          if (this.page == 1) {
            this.browList = []
          }
          this.page++
          this.total = res.data.page.total
          this.browList = this.browList.concat(rows)
          if (this.browList.length >= this.total) {
            this.finished = true
          } else {
            this.finished = false
          }
        }
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
        this.$refs.imgPreview.show(1, [this.materialObj.posterUrl])
      } else {
        this.ifShowFooter(false)
        this.showContentPreview = true
        let obj = {
          type: this.type,
          userNo: this.userNo,
          data: this.materialObj,
        }
        document.getElementsByClassName('matiral_detail')[0].scrollTop = 0

        this.$nextTick(() => {
          this.$refs.contentPreview.show(obj)
        })

        // this.doQwShare(true, this.type, this.materialObj)
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
  filters: {
    getNameLength(name) {
      // console.log(name)
      if (name && name.length > 3) {
        return name.slice(0, 3) + '...'
      } else {
        return name
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.matiral_detail {
  height: 100%;
  background: @white;
  padding: 0 32px;
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
    padding: 32px 0;
    .left {
      background: #f7f7f7;
      display: flex;
      padding: 16px;
      width: 100%;
      .content_t {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 16px;
        h3 {
          width: 538px;
          font-size: 28px;
          color: #262626;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
  }

  .one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px 32px;
    border-bottom: 1px solid #e6e6e6; /* no */
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
  }
  .brow_list {
    li {
      font-size: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px;
      border-bottom: 1px solid #e6e6e6; /* no */
      .left_time {
        p:nth-child(1) {
          color: #262626;
        }
        p:nth-child(2) {
          margin-top: 16px;
          font-size: 24px;
          color: #b3b3b3;
        }
      }
      .right_user {
        border-radius: 8px;
        border: 2px solid #e6e6e6;
        p:nth-child(1) {
          // color: #4168f6;
          background: #f7f7f7;
          color: #b3b3b3;
          padding: 0 8px;
        }
        p:nth-child(2) {
          // margin-top: 16px;
          display: flex;
          align-items: center;
          color: #262626;
          padding: 0 8px 8px;
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            vertical-align: -9%;
            margin: 8px 8px 0 0;
          }
        }
      }
    }
  }
}
</style>