<template>
  <div class="wait_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">群发任务</span>
    </div>
    <div class="nav_tab">
      <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">客户群发</div>
      <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">客户群群发</div>
    </div>
    <section v-if="tab==1">
        <div class="tips_box">
        <img src="../../images/ico_warning@2x.png" alt="">
        <span >请前往企微聊天面板-客户朋友圈进行发表</span>
      </div>
      <div class="searchInput search_tab2">
        <!-- <div class="search_title">
          <van-field v-model="searchValue" left-icon="search" placeholder="标题/内容" />
        </div> -->
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
          <span>{{tabName == 1 ? '未发送' :'已发送'}}</span>
          <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
        </div>
      </div>
      <div class="friend_warp">
        <div class="total_box">共<span class="num">{{cardList.length}}</span>条群发 <span class="num" v-if="tabName == 1">{{SendNum}} <span class="numst"> 人未发送</span></span></div>
        <div class="published_btn" @click="shareToMoments">创建群发任务</div>
      </div>
      <div class="custom_content">

          <div class="card_box" v-for="(item,index) in cardList" :key='index + "t"'>

            <div class="warp_list">
                  <p class="content_mass">{{item.massContent}}</p>
              <!-- 链接 -->
                  <div class="top_content top_content_link" v-for="(el,index) in item.resourcesList" :key="index" v-show="el.type == 1">
                      <!-- <p v-if="el.title">{{el.title}}</p> -->
                       <div class="link_warp">
                        <img :src="el.picurl" alt="" v-if="el.picurl">
                        <img src="../../images/article.png" alt="" v-else>
                        <div class="lint_url">{{el.url}}</div>
                      </div>
                  </div>

                  <!-- 文件 -->
                  <div class="top_content" v-for="(el,index) in item.resourcesList" :key="index  + 'w'" v-show="el.type == 2">
                      
                       <div class="link_warp">
                        <img :src="el.picurl" alt="" v-if="el.picurl">
                        <img src="../../images/article.png" alt="" v-else>
                          <span>{{el.title}}</span>
                      </div>
                  </div>

                  <div class="top_content" v-for="(el,index) in item.resourcesList" :key="index + 'q'" v-show="el.type == 3">
                      
                       <div class="link_warp">
                        <img :src="el.url" alt="" v-if="el.url">
                        <img src="../../images/article.png" alt="" v-else>
                          <span>{{el.title}}</span>
                      </div>
                  </div>
            </div>
            <!-- <div v-for="(el,index) in listData" :key="index"> -->
          <!-- 图片 -->
          <!-- <div class="top_content" v-if="item.msgtype == 'image' && item.urls.length>0">
            <img :src="item.urls[0]" alt="" v-if="item.urls" />
            <span>{{item.content}}</span>
          </div> -->
          <!-- 视频 -->
          <!-- <div class="top_content" v-if="item.msgtype == 'video'">
            <div class="video_warp" @click="clickVideo('videoPlay' + index)">
              <video :id="'videoPlay' + index" preload='auto' poster="../../images/videosq.png" :src="item.urls[0]" v-if="item.urls"></video>
            </div>
            <span>{{item.content}}</span>
          </div> -->
          <!-- 文本 -->
          <!-- <div class="top_content" v-if="item.msgtype == 'image' && item.urls.length == 0">
            <span class="text_image">{{item.content}}</span>
          </div> -->
          <!-- 链接 -->
          <!-- <div class="top_content top_content_link" v-if="item.msgtype == 'link'">
            <p>{{item.content}}</p>
            <div class="link_warp">
              <img src="../../images/article.png" alt="">
              <div class="lint_url">{{item.urls[0]}}</div>
            </div>
          </div> -->
          <div class="bot_content">
            <span>{{item.createTime}}</span>
            <div class="right_btm">
              <img :src="item.avatar" alt="">
              <!-- <img src="../../images/ditu.png" alt=""> -->
              <span class="user_name">{{item.name}}</span>
              <span v-show="item.depId"> -{{item.depId}}</span>
             
            </div>
          </div>
          <div class="no_publish" @click="fnShowPublish(item)" v-if="tabName == 1">
              <div class="left">
                <div class="img_warp">

              <img class="img" :src="itemChi.avatar" v-for="(itemChi) in item.userchooseList" :key="itemChi.id + 'g'">
                </div>
                <div class="data_list">
                  
              <div class="text_name" v-for="(itemChi,indexs) in item.userchooseList" :key="indexs + 'h'">
                <span>{{itemChi.name}}</span>
                <span :class="'a'+index">、</span>
              </div>
                </div>
              <p class="color73">等<span class="color26 font24"> {{item.userchooseList.length}} </span>人未发表</p>
            </div>
            <div class="right">
              <van-icon name="arrow" />
            </div>
          </div>
        <!-- </div> -->
        </div>
      </div>
    </section>
    <section v-if="tab==2">
      <div class="tips_box">
        <img src="../../images/ico_warning@2x.png" alt="">
         <span >请前往企微聊天面板-客户朋友圈进行发表</span>
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
          <span>{{tabName == 1 ? '未发送' :'已发送'}}</span>
          <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
        </div>
      </div>
      <div class="friend_warp">
        <div class="total_box">共<span class="num">{{cardList.length}}</span>条群发 
        <span class="num" v-if="tabName == 1">{{SendNum}} <span class="numst"> 人未发送</span></span>
        </div>
        <div class="published_btn" @click="creatFriend">创建群发任务</div>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index + "k"'>
           <div class="warp_list">
             <!--  -->
             <p class="content_mass">{{item.massContent}}</p>
              <!-- 链接 -->
                  <div class="top_content top_content_link" v-for="(el,index) in item.resourcesList" :key="index" v-show="el.type == 1">
                      <p v-if="el.title">{{el.title}}</p>
                       <div class="link_warp">
                        <img :src="el.picurl" alt="" v-if="el.picurl">
                        <img src="../../images/article.png" alt="" v-else>
                        <div class="lint_url">{{el.url}}</div>
                      </div>
                  </div>

                  <!-- 文件 -->
                  <div class="top_content" v-for="(el,index) in item.resourcesList" :key="index  + 'w'" v-show="el.type == 2">
                      
                       <div class="link_warp">
                        <img :src="el.picurl" alt="" v-if="el.picurl">
                        <img src="../../images/article.png" alt="" v-else>
                          <span>{{el.title}}</span>
                      </div>
                  </div>

                  <div class="top_content" v-for="(el,index) in item.resourcesList" :key="index + 'q'" v-show="el.type == 3">
                      
                       <div class="link_warp">
                        <img :src="el.url" alt="" v-if="el.url">
                        <img src="../../images/article.png" alt="" v-else>
                          <span>{{el.title}}</span>
                      </div>
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
       <div class="no_publish" @click="fnShowPublish(item)" v-if="tabName == 1">
              <div class="left">
                     <div class="img_warp">

              <img class="img" :src="itemChi.avatar" v-for="(itemChi) in item.userchooseList" :key="itemChi.id + 'g'">
                </div>
              <div class="data_list">

              <div class="text_name" v-for="(itemChi,indexs) in item.userchooseList" :key="indexs + 'h'">
                <span>{{itemChi.name}}</span>
                <span :class="'a'+index">、</span>
              </div>
              </div>
              <p class="color73">等<span class="color26 font24"> {{item.userchooseList.length}} </span>人未发表</p>
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
            <van-field v-model="valPopup"  placeholder="员工姓名/手机号码" >
             <template #right-icon>
               <van-icon name="search"  @click="searchClick" />
            </template>
             </van-field>
            <div class="select_box_p" @click="popupSendShow">
              <span>{{popupname == 1 ? '未发送' :'已发送'}}</span>
              <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showPopupSelect}" />
            </div>
          </div>
          <div class="one" v-for="list in popupList" :key="list.id + 'l'">
            <div class="left">
              <img :src="list.avatar" alt="" v-if="list.avatar">
              <img src="../../images/img_head.png" alt="" v-else>
              <div class="name_warp">
                <span>{{list.name}}-{{list.depId}}</span>
                <span>{{list.phone}}</span>
              </div>
            </div>
            <div class="right" :class="popupname == 2 ? 'noRight':'yeRight'">
              <span>{{popupname == 1 ? '未发送' :'已发送'}}</span>
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
import { getCustomerMassSend,  getUserSendDetail } from '../../api/myHome'
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
      tab: this.$route.query.tab,
      cardList: [],
      showFilter: false,
      SendNum:0,
      actions: [
        { name: '未发送', id: 1 },
        { name: '已发送', id: 2 },
      ],
      tabName: 1,
      depId: localStorage.getItem('depId'),
      searchValue: '',
      companyValue: '',
      personList: [],
      showPubish: false,
      popupList: [],
      valPopup: '',
      popupname: 1,
      showPopupSelect: false,
      itemObj: {},

      tapeNum:1,
      massid:"",
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
    // 打开未发表弹框
    fnShowPublish(value) {
      this.showPubish = true
      this.itemObj = value
      this.massid = value.massNo
      console.log(value,"--==")
      this.getListPopup()
    },
    // 弹窗内的选择
    popupSendShow() {
      this.showPopupSelect = true
    },
    // 发送到朋友圈
    shareToMoments() {
      this.$router.push({
        path: '/talkTool/customerGroup',
      })
    },
    // 创建朋友圈任务
    creatFriend() {
       this.$router.push({path:'/talkTool/CustomergroupPlaye'});
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
        massType: this.tapeNum,
        sendStatus: this.tabName,
        createTimeSta: this.startDate ? this.startDate + ' 00:00:00' : '',
        createTimeEnd: this.endDate ? this.endDate + ' 23:59:59' : '',
      }

      getCustomerMassSend(params).then((res) => {
        localStorage.setItem("", res.data.newList.length);
        this.cardList = res.data.newList
        this.SendNum = res.data.noSendNum
        // this.cardList.forEach(item =>{

          // item.resourcesList.forEach(el =>{
          //   this.listData = JSON.parse(el.value)
          //    console.log(this.listData,"000p")
          // })
        // })
        // if (this.cardList.length > 0) {
        //   this.cardList.forEach(item=>{

        //   })
        // }
      })
    },
    searchClick(){
       this.getListPopup()
    },
    // 弹窗内列表
    getListPopup() {
      let params = {
        massNo: this.massid,
        // momentId: this.itemObj.momentId,
        namePhone: this.valPopup,
        sendStatus: this.popupname,
      }
      getUserSendDetail(params).then((res) => {
        if (res.result) {
          this.popupList = res.data
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    tabClick(v) {
      this.tab = v
      this.startDate = ''
      this.endDate = ''
      this.tabName = 1
      if (this.tab == 1) {
        // 个人发表
        this.tapeNum = 1
        this.type = 2
      } else {
           this.tapeNum = 2
        // 企业发表
        this.type = ''
      }
      this.getDataList()
    },
    // 外层选择
    fnSelect(v) {
      console.log(v,"---")
      this.tabName = v.id
      if (this.tab == 1) {
        this.type = 2
      } else {
        this.type = ''
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
      padding: 20px 16px;
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
      .num{
        font-weight: 600;
      }
      .numst{
         color: #838a9d;
      font-size: 24px;
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
      .warp_list{
        max-height: 320px;
        overflow: auto;
        .content_mass{
            overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .top_content {
        display: flex;
        margin-top: 16px;
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
          margin-bottom: 16px;
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
            overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
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
          .img_warp{
            max-width: 90px;
            overflow: hidden;
            display: flex;
             white-space: nowrap;
            text-overflow: ellipsis;
          }
          .data_list{
                max-width: 120px;
            overflow: hidden;
            display: flex;
             white-space: nowrap;
            text-overflow: ellipsis;
          }
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
              //  max-width: 120px;
            // overflow: hidden;
            // display: flex;
             white-space: nowrap;
            text-overflow: ellipsis;
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
            margin-top: 6px;
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