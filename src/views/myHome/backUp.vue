<template>
  <div class="wait_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">朋友圈</span>
    </div>
    <div class="nav_tab">
      <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">个人发表</div>
      <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">企业发表</div>
    </div>
    <section v-if="tab==1">
      <div class="searchInput">
        <div class="search_title">
          <van-field v-model="searchValue" left-icon="search" placeholder="标题/内容" />
        </div>
        <div class="select_date" @click="showPicker=true">
          <img src="../../images/date_pick.png" alt="">
          <div v-if="startDate&&endDate" class="time_sty">
            <span>{{startDate}}</span>
            至
            <span>{{endDate}}</span>
          </div>
          <div v-else class="time_sty">
            <span>开始时间</span>
            -
            <span>结束时间</span>
          </div>
        </div>

      </div>
      <div class="friend_warp">
        <div class="total_box">共<span>{{cardList.length}}</span>条朋友圈</div>
        <div class="published_btn" @click="shareToMoments">发表朋友圈</div>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index'>
          <!-- 图片 -->
          <div class="top_content" v-if="item.msgtype == 'image' && item.urls.length>0">
            <img :src="item.urls[0]" alt="" v-if="item.urls" />
            <span>{{item.content}}</span>
          </div>
          <!-- 视频 -->
          <div class="top_content" v-if="item.msgtype == 'video'">
            <div class="video_warp" @click="clickVideo('videoPlay' + index)">
              <video :id="'videoPlay' + index" preload='auto' poster="../../images/videosq.png" :src="item.urls[0]" v-if="item.urls"></video>
            </div>
            <span>{{item.content}}</span>
          </div>
          <!-- 文本 -->
          <div class="top_content" v-if="item.msgtype == 'image' && item.urls.length == 0">
            <span class="text_image">{{item.content}}</span>
          </div>
          <!-- 链接 -->
          <div class="top_content top_content_link" v-if="item.msgtype == 'link'">
            <p>{{item.content}}</p>
            <div class="link_warp">
              <img src="../../images/article.png" alt="">
              <div class="lint_url">{{item.urls[0]}}</div>
            </div>
          </div>
          <!-- 文件 -->
          <div class="bot_content">
            <span>{{item.createTime}}</span>
            <div class="right_btm">
              <img :src="item.avatar" alt="">
              <!-- <img src="../../images/ditu.png" alt=""> -->
              <span class="user_name">{{item.name}}</span>
              <span v-show="item.depId"> -{{item.depId}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="tab==2">
      <div class="tips_box">
        <img src="../../images/ico_warning@2x.png" alt="">
        <span v-if="tab ==1 ">请前往企微聊天面板-客户朋友圈进行发表</span>
        <span v-else>请前往企微聊天面板-应用通知进行相关操作</span>
      </div>
      <div class="search_company">
        <van-field v-model="companyValue" left-icon="search" placeholder="标题/内容" />
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index'>
          <!-- 链接 素材库-->
          <div class="top_content_link top_content" v-if="Object.keys(item.sendContent).length > 0">
            <p>{{item.massContent}}</p>
            <div class="link_warp" v-if="item.sendContent && item.sendContent.value">
              <img :src="item.sendContent.value[0].picurl" alt="" v-if="item.sendContent.value[0].picurl" />
              <img src="../../images/article.png" alt="" v-else />
              <div class="lint_url">{{item.sendContent.value[0].url}}</div>
            </div>
          </div>
          <div class="top_content_link top_content" v-if="Object.keys(item.sendContent).length == 0">
            <p>{{item.massContent}}</p>
            <!-- <div class="link_warp">
              <img :src="item.sendContent.value[0].picurl" alt="" v-if="item.sendContent.value[0].picurl" />
              <img src="../../images/article.png" alt="" v-else />
              <div class="lint_url">{{item.sendContent.value[0].url}}</div>
            </div> -->
          </div>
          <div class="bot_content">
            <span>{{item.createTime}}</span>
            <div class="right_btm">
              <img :src="item.avatar" alt="">
              <!-- <img src="../../images/ditu.png" alt=""> -->
              <span class="user_name">{{item.name}}</span>
              <span v-show="item.depId"> -{{item.depId}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="date_box">
      <van-popup v-model="showPicker" position="bottom" round>
        <van-date-picker show-toolbar v-model="currentDate" title="选择时间段" :min-date="minDate" :max-date="maxDate" @cancel="showPicker = false"
                         @confirm="onConfirm" @change="onChange">
        </van-date-picker>
      </van-popup>
    </div>
    <div class="filter_box">
      <van-action-sheet v-model="showFilter" :actions="actions" cancel-text="取消" close-on-click-action @select='fnSelect' />
    </div>
  </div>
</template>
<script>
import VanDatePicker from './VanDate.vue'
import { friendSend, groupSend } from '../../api/myHome'
export default {
  components: {
    VanDatePicker,
  },
  data() {
    return {
      showPicker: false,
      minDate: new Date(2010, 5, 15),
      maxDate: new Date(2025, 10, 15),
      currentDate: new Date(),
      startDate: '',
      endDate: '',
      tab: this.$route.query.tab,
      cardList: [],
      showFilter: false,
      actions: [],
      tabName: 0,
      depId: localStorage.getItem('depId'),
      searchValue: '',
      companyValue: '',
    }
  },
  computed: {
    myName() {
      return this.$store.getters.myName
    },
    avatar() {
      return this.$store.state.avatar
    },
  },
  created() {
    if (this.tab == 1) {
      // 朋友圈
      this.getDataList()
      this.actions = [
        { name: '未发表', id: 0 },
        { name: '已发表', id: 1 },
      ]
    } else {
      // 群发
      this.getGroupList()
      this.actions = [
        { name: '未发送', id: 0 },
        { name: '已发送', id: 1 },
      ]
    }
  },
  methods: {
    // 发送到朋友圈
    shareToMoments() {},
    clickVideo(id) {
      var video1 = document.getElementById(id)
      if (video1.requestFullscreen) {
        video1.requestFullscreen()
        video1.play()
      } else if (video1.webkitRequestFullScreen) {
        video1.webkitRequestFullScreen()
        video1.play()
      } else if (video1.mozRequestFullScreen) {
        video1.mozRequestFullScreen()
        video1.play()
      }
    },
    getDataList() {
      this.cardList = []
      let params = {
        status: this.tabName,
        createTimeSta: this.startDate ? this.startDate + ' 00:00:00' : '',
        createTimeEnd: this.endDate ? this.endDate + ' 23:59:59' : '',
      }

      friendSend(params).then((res) => {
        this.cardList = res.data
      })
    },
    getGroupList() {
      this.cardList = []
      let params = {
        sendStatus: this.tabName,
        createStartTime: this.startDate ? this.startDate + ' 00:00:00' : '',
        createEndTime: this.endDate ? this.endDate + ' 23:59:59' : '',
      }
      groupSend(params).then((res) => {
        let dataList = res.data
        dataList.forEach((item) => {
          if (
            item.sendContent &&
            item.sendContent.value &&
            item.sendContent.type !== 'image'
          ) {
            item.sendContent.value = JSON.parse(item.sendContent.value)
          }
        })
        this.cardList = dataList
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    tabClick(v) {
      this.tab = v
      this.tabName = 0
      if (v == 1) {
        this.getDataList()
        this.actions = [
          { name: '未发表', id: 0 },
          { name: '已发表', id: 1 },
        ]
      } else {
        this.getGroupList()
        this.actions = [
          { name: '未发送', id: 0 },
          { name: '已发送', id: 1 },
        ]
      }
    },

    fnSelect(v) {
      this.tabName = v.id
      if (this.tab == 1) {
        this.getDataList()
      } else {
        this.getGroupList()
      }
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.startDate = value.slice(0, 3).join('-')
      this.endDate = value.slice(4, 7).join('-')
      // this.value = this.startDate + '至' + this.endDate
      this.showPicker = false
      if (this.tab == 1) {
        this.getDataList()
      } else {
        this.getGroupList()
      }
    },

    onChange(picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`)
    },
  },
}
</script>
<style lang="less" scoped>
.wait_warp {
  background: #fff;
  height: 100%;
  overflow-y: scroll;
  padding-top: 87px;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 750px;
    transform: translateX(-50%);
    cursor: pointer;
    background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    line-height: 87px;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #e6e6e6;
    // border-bottom: 1px solid #e6e6e6;
    .backPage {
      width: 150px;
      .van-icon {
        vertical-align: -10%;
        width: 28px;
        height: 28px;
      }
    }
    .textTitle {
      flex: 1;
      display: inline-block;
      padding-left: 150px;
      font-size: 30px;
    }
  }
  .searchInput {
    margin: 32px 0;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search_title {
      .van-cell {
        padding: 16px;
        width: 330px;
        height: 68px;
        background: #f7f7f7;
        border-radius: 8px;
        .van-field__label {
          width: 0;
        }
      }
    }
    .select_date {
      padding: 22px 16px;
      width: 332px;
      height: 68px;
      background: #f7f7f7;
      border-radius: 8px;
      display: flex;
      .time_sty {
        margin-left: 16px;
        font-size: 28px;
        font-weight: 400;
        color: #c0c4cc;
        line-height: 28px;
        overflow: hidden;
        white-space: nowrap;
      }
      img {
        width: 28px;
        height: 28px;
      }
    }

    img {
      width: 40px;
      height: 40px;
    }
  }
  .nav_tab {
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
  .friend_warp {
    padding: 0 32px;
    display: flex;
    line-height: 64px;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .total_box {
      padding-bottom: 18px;
      // text-align: right;
      color: #838a9d;
      font-size: 24px;
      span {
        display: inline-block;
        margin: 0 8px;
        font-size: 28px;
        color: #3c4353;
      }
    }
    .published_btn {
      width: 220px;
      height: 64px;
      background: #4168f6;
      border-radius: 32px;
      color: #fff;
      font-size: 28px;
      text-align: center;
    }
  }
  .tips_box {
    display: flex;
    background: #fffcea;
    border-radius: 16px;
    height: 72px;
    margin: 32px;
    padding: 20px 32px;
    align-items: center;
    span {
      color: #804527;
      font-size: 24px;
    }
    img {
      width: 28px;
      height: 28px;
      margin-right: 24px;
    }
  }
  .search_company {
    .van-cell {
      padding: 16px;
      width: 686px;
      height: 68px;
      background: #f7f7f7;
      border-radius: 8px;
      margin: 0 auto;
      .van-field__label {
        width: 0;
      }
    }
  }
  .custom_content {
    padding: 0 32px 32px;
    .card_box {
      padding: 32px;
      // height: 222px;
      background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.04);
      border-radius: 16px;
      margin-top: 32px;
      .top_content {
        display: flex;
        span {
          display: inline-block;
          // margin-left: 24px;
          font-size: 28px;
          font-weight: 400;
          color: #3c4353;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          font-size: 28px;
          font-weight: 400;
          color: #3c4353;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 100px;
          height: 100px;
          margin-right: 24px;
        }
        .video_warp {
          width: 100px;
          height: 100px;
          background: rgba(0, 0, 0, 0.8);
          margin-right: 24px;
        }
        video {
          width: 100%;
          height: 100%;
          // margin-right: 24px;
        }
        .link_warp {
          display: flex;
          align-items: center;
          background: #f7f8fa;
          border-radius: 4px;
          width: 100%;
          padding: 16px;
          img {
            width: 85px;
            height: 85px;
            margin-right: 24px;
          }
          .lint_url {
            word-break: break-all;
            color: #3c4353;
            font-size: 24px;
          }
        }
      }
      .top_content_link {
        display: block;
      }
      .bot_content {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 24px;
          font-weight: 400;
          color: #c0c4cc;
          line-height: 34px;
        }
        .right_btm {
          display: flex;
          .user_name {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100px;
          }
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .filter_box {
    .van-action-sheet__item {
      border-bottom: 1px solid #e6e6e6;
    }
  }
}
</style>