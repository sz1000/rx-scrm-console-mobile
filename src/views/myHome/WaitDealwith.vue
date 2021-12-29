<template>
  <div class="wait_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">企微朋友圈</span>
    </div>
    <!-- <div class="nav_tab">
      <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">个人发表</div>
      <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">企业发表</div>
    </div> -->
    <section v-if="tab==1">
      <div class="search_company inputPerson">
        <van-search v-model="searchValue" placeholder="标题/内容" @blur='fnSearch(1)' />
      </div>
      <div class="searchInput search_tab2">
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
        <div class="select_box" @click="filterCard">
          <span>{{tabName == 1 ? '已发表' :'未发表'}}</span>
          <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
        </div>
      </div>
      <div class="friend_warp">
        <div class="total_box">共<span>{{cardList.length}}</span>条朋友圈</div>
        <div class="published_btn" @click="shareToMoments">
          <span>发表朋友圈</span>
        </div>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='item.id'>
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
              <img :src="item.urls[1]" alt="" v-if="item.urls[1]" />
              <img src="../../images/article.png" alt="" v-else />
              <div class="lint_url">{{item.urls[2]}}</div>
            </div>
          </div>
          <div class="bot_content">
            <span>{{item.createTime}}</span>
            <div class="right_btm">
              <!-- <img :src="item.avatar" alt="">
              <span class="user_name">{{item.name}}</span>
              <span v-show="item.depId"> -{{item.depId}}</span> -->
              <span class="sure_btn" @click="surePublished(item)" v-if="item.jobStatus == 0">确认已发表</span>
              <span class="over_pub" v-else>已发表</span>
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
        <van-search v-model="searchValue" placeholder="标题/内容" @blur='fnSearch(2)' />
      </div>
      <div class="searchInput search_tab2">
        <div class="select_date">
          <img src="../../images/date_pick.png" alt="">
          <div v-if="startDate&&endDate" class="time_sty" @click="showPicker=true">
            <span>{{startDate}}</span>
            至
            <span>{{endDate}}</span>
          </div>
          <div v-else class="time_sty" @click="showPicker=true">
            <span>开始时间</span>
            -
            <span>结束时间</span>
          </div>
          <img src="../../images/close.png" alt="" class="close_icon" v-if="startDate&&endDate" @click="clearTime" />
        </div>
        <div class="select_box" @click="filterCard">
          <span>{{tabName == 1 ? '已发表' :'未发表'}}</span>
          <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
        </div>
      </div>
      <div class="friend_warp">
        <div class="total_box" v-if="tabName == 0">
          共<span>{{cardList.length}}</span>条朋友圈,<span>{{sendSum}}</span>人未发表
        </div>
        <div class="total_box" v-if="tabName == 1">共<span>{{cardList.length}}</span>条朋友圈</div>
        <div class="published_btn" @click="creatFriend">
          <span>创建朋友圈任务</span>
        </div>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='item.id'>
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
              <img :src="item.urls[1]" alt="" v-if="item.urls[1]" />
              <img src="../../images/article.png" alt="" v-else />
              <div class="lint_url">{{item.urls[2]}}</div>
            </div>
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
          <div class="no_publish" @click="fnShowPublish(item)">
            <div class="left">
              <img class="img" :src="itemChi.avatar" v-for="(itemChi) in item.userList.slice(0,3)" :key="itemChi.id" v-show="itemChi.avatar">
              <div class="text_name" v-for="(itemChi,index) in item.userList.slice(0,3)" :key="itemChi.corpId">
                <span>{{itemChi.name}}</span>
                <span :class="'a'+index">、</span>
              </div>
              <p class="color73">等<span class="color26 font24"> {{item.userList.length}} </span>人{{tabName == 1 ? '已':'未' }}发表</p>
            </div>
            <div class="right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 时间的弹窗 -->
    <div class="date_box">
      <van-popup v-model="showPicker" position="bottom" round>
        <van-date-picker show-toolbar v-model="currentDate" title="选择时间段" :min-date="minDate" :max-date="maxDate" @cancel="showPicker = false"
                         @confirm="onConfirm" @change="onChange">
        </van-date-picker>
      </van-popup>
    </div>
    <!-- 企业列表弹出 -->
    <div class="filter_box">
      <van-action-sheet v-model="showFilter" :actions="actions" cancel-text="取消" close-on-click-action @select='fnSelect' />
    </div>
    <!-- 未发表弹框 -->
    <div class="published_dialog">
      <van-popup v-model="showPubish" closeable position="bottom" :style="{ height: '75%' }" round get-container=".wait_warp">
        <div class="title_popup">员工发表情况</div>
        <div class="popup_content">
          <div class="user_text">
            <span>全部员工</span>
            <span>({{popupList.length}})</span>
          </div>
          <div class="search_popup">
            <van-field v-model="valPopup" placeholder="员工姓名/手机号码" @keyup.enter='searchUser'>
              <template #right-icon>
                <van-icon name="search" @click="searchUser" />
              </template>
            </van-field>
            <div class="select_box_p" @click="popupSendShow">
              <span>{{popupname == 1 ? '已发表' :'未发表'}}</span>
              <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showPopupSelect}" />
            </div>
          </div>
          <div class="one" v-for="list in popupList" :key="list.id">
            <div class="left">
              <img :src="list.avatar" alt="" v-if="list.avatar">
              <img src="../../images/img_head.png" alt="" v-else>
              <div class="name_warp">
                <span>{{list.name}}-{{list.department}}</span>
                <span>{{list.phone}}</span>
              </div>
            </div>
            <div class="right" :class="popupname == 1 ? 'noRight':'yeRight'">
              <span>{{popupname == 1 ? '已发表' :'未发表'}}</span>
            </div>
          </div>

        </div>
      </van-popup>
      <!-- 内部弹出 -->
      <div class="filter_box">
        <van-action-sheet v-model="showPopupSelect" :actions="actions" cancel-text="取消" close-on-click-action @select='fnSelectPopup' />
      </div>
    </div>
  </div>
</template>
<script>
import VanDatePicker from './VanDate.vue'
import {
  friendSend,
  friendCircleUserList,
  sure_confirm,
} from '../../api/myHome'
export default {
  components: {
    VanDatePicker,
  },
  data() {
    return {
      type: null,
      showPicker: false,
      minDate: new Date(2010, 5, 15),
      maxDate: new Date(2025, 10, 15),
      currentDate: new Date(),
      startDate: '',
      endDate: '',
      // tab: 2,
      tab: this.$route.query.tab,
      cardList: [],
      showFilter: false,
      actions: [
        { name: '未发表', id: 0 },
        { name: '已发表', id: 1 },
      ],
      tabName: 0,
      depId: localStorage.getItem('depId'),
      searchValue: '',
      personList: [],
      showPubish: false,
      popupList: [],
      valPopup: '',
      popupname: 0,
      showPopupSelect: false,
      itemObj: {},
      sendSum: '',
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
      // 个人发表
      this.type = 2
    } else {
      // 企业发表
      this.type = 1
    }
    this.getDataList()
  },
  methods: {
    // 清除时间
    clearTime() {
      this.startDate = ''
      this.endDate = ''
      this.getDataList()
    },
    // 打开未发表弹框
    fnShowPublish(value) {
      this.showPubish = true
      this.popupname = this.tabName
      this.itemObj = value
      this.getListPopup()
    },
    // 弹窗内的选择
    popupSendShow() {
      this.showPopupSelect = true
    },
    // 个人发送到朋友圈
    shareToMoments() {
      this.$router.push({
        path: '/talkTool/mterialPage',
        query: {
          friendtype: 'person',
        },
      })
    },
    // 企业创建朋友圈任务
    creatFriend() {
      this.$router.push({
        path: '/talkTool/mterialPage',
        query: {
          friendtype: 'company',
        },
      })
    },
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

    filterCard() {
      this.showFilter = true
    },
    // 外层列表
    getDataList() {
      this.cardList = []
      let params = {
        type: this.type,
        status: this.tabName,
        title: this.searchValue,
        createTimeSta: this.startDate ? this.startDate + ' 00:00:00' : '',
        createTimeEnd: this.endDate ? this.endDate + ' 23:59:59' : '',
      }

      friendSend(params).then((res) => {
        // this.cardList = res.data.page.records
        this.cardList = res.data.voList
        this.sendSum = res.data.sendSum
        // if (this.cardList.length > 0) {
        //   this.cardList.forEach(item=>{

        //   })
        // }
      })
    },
    // 弹窗内列表
    getListPopup() {
      let params = {
        momentId: this.itemObj.momentId,
        name: this.valPopup,
        status: this.popupname,
      }
      friendCircleUserList(params).then((res) => {
        if (res.result) {
          this.popupList = res.data.records
        }
      })
    },
    // 弹框内查询
    searchUser() {
      this.getListPopup()
    },
    goBack() {
      this.$router.go(-1)
    },
    tabClick(v) {
      this.tab = v
      this.startDate = ''
      this.endDate = ''
      this.tabName = 0
      this.searchValue = ''
      if (this.tab == 1) {
        // 个人发表
        this.type = 2
      } else {
        // 企业发表
        this.type = 1
      }
      this.getDataList()
    },
    // 搜索
    fnSearch(val) {
      this.tab = val
      this.getDataList()
    },
    // 外层选择
    fnSelect(v) {
      this.tabName = v.id
      if (this.tab == 1) {
        this.type = 2
      } else {
        this.type = 1
      }
      this.getDataList()
    },
    // 弹框选择
    fnSelectPopup(el) {
      this.popupname = el.id
      this.getListPopup()
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.startDate = value.slice(0, 3).join('-')
      this.endDate = value.slice(4, 7).join('-')
      // this.value = this.startDate + '至' + this.endDate
      this.showPicker = false
      if (this.tab == 1) {
        this.type = 1
      } else {
        this.type = ''
      }
      this.getDataList()
    },
    onChange(picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`)
    },

    // 确认发表
    surePublished(data) {
      console.log('----data---', data)
      sure_confirm(data).then((res) => {
        this.getDataList()
      })
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
      padding: 0 16px;
      width: 332px;
      background: #f7f7f7;
      border-radius: 8px;
      display: flex;
      align-items: center;
      position: relative;
      .time_sty {
        margin-left: 16px;
        font-size: 28px;
        font-weight: 400;
        color: #c0c4cc;
        line-height: 68px;
        height: 68px;
        overflow: hidden;
        white-space: nowrap;
        span {
          display: inline-block;
          line-height: 28px;
        }
      }
      img {
        width: 28px;
        height: 28px;
      }
      .close_icon {
        position: absolute;
        right: 8px;
        // display: none;
      }
    }

    img {
      width: 40px;
      height: 40px;
    }
  }
  .search_tab2 {
    .select_date {
      width: 432px;
    }
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
    align-items: center;
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
      // width: 220px;
      // height: 64px;
      display: flex;
      align-items: center;
      padding: 0 32px;
      background: #4168f6;
      border-radius: 32px;
      color: #fff;
      font-size: 28px;
      // text-align: center;
    }
  }
  .inputPerson {
    margin-top: 32px;
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
          align-items: center;
          .sure_btn {
            display: flex;
            align-items: center;
            border: 1px solid #4168f6; /* no */
            color: #4168f6;
            font-size: 20px;
            // height: 36px;
            // line-height: 30px;
            padding: 2px 6px;
          }
          .over_pub {
            display: flex;
            align-items: center;
            // height: 36px;
            // line-height: 36px;
            border: 1px solid #b3b3b3; /* no */
            font-size: 20px;
            padding: 2px 16px;
          }
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
      .no_publish {
        padding: 32px 0 0;
        margin-top: 32px;
        border-top: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .img {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            border-radius: 50%;
            &:nth-child(2) {
              transform: translateX(-25%);
            }
            &:nth-child(3) {
              transform: translateX(-50%);
            }
          }
          .text_name {
            font-size: 24px;
            color: #737373;
          }
          .color73 {
            color: #737373;
            .color26 {
              color: #262626;
            }

            .font24 {
              font-size: 24px;
            }
          }
          .a2 {
            display: none;
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

  .van-popup {
    padding: 32px 32px 0;
    .title_popup {
      text-align: center;
      font-size: 32px;
      font-weight: 600;
      color: #262626;
    }
    .user_text {
      margin-top: 48px;
      margin-bottom: 24px;
      color: #737373;
      font-size: 28px;
    }
    .search_popup {
      display: flex;
      .van-cell {
        padding: 16px;
        width: 432px;
        height: 72px;
        background: #f7f7f7;
        border-radius: 8px;
        margin: 0 auto;
        .van-field__label {
          width: 0;
        }
      }
      .select_box_p {
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #838a9d;
        width: 230px;
        height: 72px;
        background: #f7f8fa;
        border-radius: 16px;
        justify-content: space-between;
        padding: 0 32px;
        .rotate {
          transform: rotate(180deg);
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .one {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 0;
      .left {
        display: flex;
        .name_warp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          span:nth-child(1) {
            font-size: 28px;
            color: #262626;
          }
          span:nth-child(2) {
            display: inline-block;
            margin-top: 8px;
            font-size: 24px;
            color: #b3b3b3;
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
        border: 1px solid #e6e6e6;
        color: #b3b3b3;
        padding: 4px 16px;
      }
      .yeRight {
        color: #ffb020;
        border-color: #ffb020;
      }
    }

    /deep/.van-popup__close-icon {
      color: #262626;
    }
  }
}
</style>