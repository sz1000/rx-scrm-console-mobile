<template>
  <div class="custom_warp" :class="{'large-padding': contentType == 0}" v-if="showPortraitType == 1">
    <div class="customer-data">
      <customer-item :isPortrait="1" :itemData="item" :name="name" :imageUser="imageUser" :nameFrom="nameFrom"></customer-item>
    </div>

    <div class="infoContent">
      <ul class="header-nav">
        <li v-for="(i, index) in navList" :key="i" @click="changeNav(index)" :class="{active: contentType == index}"><span>{{ i }}</span></li>
      </ul>

      <!-- 客户动态 -->
      <dynamic v-if="contentType == 0" ref="dynamic" :comeType="1" :isPortrait="1" :sendUserInfo="sendUserInfo" @fillMessage="getPeople"></dynamic>

      <!-- 协助人 -->
      <div class="xiezuoBox" style="padding: 15px;" v-if="contentType == 1">
      	<HelperFile :isPortrait="1"></HelperFile>
      </div>

      <!-- 商机 -->
      <opportunities v-if="contentType == 2" :customerNo="item && item.clueCustomerNo" fromType="3"></opportunities>
      
      <!-- 附件 -->
      <div class="fujianBox" style="padding: 15px;" v-if="contentType == 3">
      	<Fujian :isPortrait="1"></Fujian>
      </div>
    </div>

    <div class="bottom_model">
      <van-action-sheet v-model="show" :lock-scroll="false" :title="titleName" @cancel="cancelIcon" @click-overlay="cancelIcon" class="vant_sheet">
        <div class="content">
          <div class="writerInput" v-if="isShowDialog == '3'">
            <van-field v-model="message" type="textarea" maxlength="200" placeholder="记录好跟进，多签单哟~" show-word-limit />
          </div>
          <div class="buttonWarp" v-show="hidshow">
            <span class="cancel" @click="closeDialog(isShowDialog)">取消</span>
            <span class="save" @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>

    <van-overlay :show="showSecret">
      <div class="wrapper" @click.stop>
        <div class="dialogImg" align="center">
          <img src="../../images/secreteig.png" alt="" />
        </div>
      </div>
    </van-overlay>
    <!-- <BackTop></BackTop> -->

    <!-- 新手引导 -->
    <guide-box ref="guideBox"></guide-box>

    <!-- 协助人消息输入框 -->
    <message-box v-if="contentType == 0" ref="messageBox"></message-box>

    <!-- 协助人选择弹窗 -->
    <reminders-box ref="remindersBox" :customerNo="item && item.clueCustomerNo"></reminders-box>
  </div>
  
  <div v-else-if="showPortraitType == 2">
    <Groupportrait></Groupportrait>
  </div>

</template>
<script>
import { MessageNotificatio } from '../../config/api'
// import wx from 'weixin-js-sdk'
import BackTop from '@/components/BackTop'
import commonFun from '../../utils/commonToken'
import Groupportrait from '../portrait/Groupportrait.vue'
import CustomerItem from '../../components/CustomerManage/customerItem'
import Dynamic from '../../components/CustomerManage/dynamic'
import Opportunities from '../../components/BusinessOpportunities/opportunities'
import HelperFile from "../customerManage/comTip/helperFile"
import Fujian from "../customerManage/comTip/fujian"
import GuideBox from "../../components/CustomerManage/guideBox"
import MessageBox from "../../components/CustomerManage/messageBox"
import RemindersBox from '../../components/CustomerManage/dialog/remindersBox'
import { mapState } from 'vuex'

export default {
  components: {
    BackTop,
    Groupportrait,
    CustomerItem,
    Dynamic,
    Opportunities,
    HelperFile,
    Fujian,
    GuideBox,
    MessageBox,
    RemindersBox
  },
  data() {
    return {
      showPortraitType: 0,
      title: '',
      name: '',
      nameFrom: '',
      imageUser: '',
      item: {
        createTime: 1609434061,
      },
      sendUserInfo: {},
      timeLineList: [],
      contentType: 0,
      navList: [ '客户动态', '协助人', '商机', '附件' ],
      show: false,
      isShowDialog: null,
      titleName: '',
      message: '',
      docmHeight: 0, //默认屏幕高度
      showHeight: 0, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer,
      loadingShow: false,
      showSecret: false,
    }
  },
  computed: {
    // ...mapState(['userId']),
    chatId() {
      return this.$store.getters.chatId || sessionStorage.getItem('chatId')
    },
    entry() {
      // return 'single_chat_tools'
      // console.log("this.$store.getters.entry???", this.$store.getters.entry)
      return this.$store.getters.entry || sessionStorage.getItem('entry')
    },
    userId() {
      // return 'wmY-gRDAAAeWi_4fz3ic79XYqKRG7EZg'
      return this.$store.getters.userId || sessionStorage.getItem('userId')
    },
  },
  watch: {
    chatId(val) {
      console.log("chat>>>???", val)
      if(val) {
        this.showPortraitType = 2
      }
    },
    userId(val) {
      console.log("???>>>???", val)
      if(val) {
        this.getClueCustomerByid()
      } else {
        commonFun.getWxAppid()
      }
    }
  },
  created() {
    this.getMethod()
  },
  mounted() {
    window.onresize = () => (() => {
      if (document.getElementsByClassName('vant_sheet ')) {
        this.showHeight =  document.getElementsByClassName('vant_sheet ')[0].clientHeight
      }
      // console.log(this.showHeight, this.docmHeight)
    })()
  },
  provide() {
    return {
      goDetail: this.goDetail,
      showCompany: this.showCompany,
      showGuideBox: this.showGuideBox,
      showRemindersBox: this.showRemindersBox,
      messageNotificatio: this.messageNotificatio,
      getPeople: this.getPeople,
    }
  },
  methods: {
    // 导航切换
    changeNav(index) {
      this.contentType = index
    },
    showGuideBox(fromType) {
      let isFirstTimeEnter = localStorage.getItem('JZCRM_ISFIRSTTIMEENTER')

      if (!fromType && !isFirstTimeEnter) {
        localStorage.setItem('JZCRM_ISFIRSTTIMEENTER', 1)
        this.doShowGuideBox(1)
      } else if (fromType == 1 && isFirstTimeEnter && isFirstTimeEnter == 1) {
        localStorage.setItem('JZCRM_ISFIRSTTIMEENTER', 2)
        this.doShowGuideBox(2)
      }
    },
    doShowGuideBox(type) {
      this.$refs.guideBox.show(type)
    },
    goDetail() {
      this.$router.push({
        name: 'informationDetail',
        query: { id: this.item.clueCustomerNo },
      })
    },
    getUserName() {
      return new Promise((resolve, reject) => {
        this.$network.get('/user-service/user/getUserName', { endPoint: 'mobile' }).then(res => {
          let {code, data} = res
          
          if (code === 'success' && data) {
            this.showSecret = !data.haveSecret
            this.sendUserInfo = data && data.userEntity
            resolve()
          } else {
            reject()
          }
        }).catch(reject)
      })
    },
    getMethod() {
      this.loadingShow = true
      if (!this.userId) {
        commonFun.getWxAppid()
      } else {
        this.getClueCustomerByid()
      }
    },
    //获取客户详情
    getClueCustomerByid() {
      this.$toast.loading({
        overlay: true,
        loadingType: 'spinner',
        duration: 0,
      })
      this.$network.get('/customer-service/m/cluecustomer/getClueCustomerByid', {
        // id: 'woY-gRDAAAwqsxbqJZT0etf3nkVE9NLg',
        id: this.userId,
      }).then((res) => {
        console.log('entry', this.entry)
        this.getUserName().then(() => {
          this.$toast.clear()
          this.loadingShow = false
          this.name = res.data.clueCustomerVO.name
          this.nameFrom = res.data.clueCustomerVO.customerType
          this.item = res.data.clueCustomerVO
          this.imageUser = res.data.clueCustomerVO.avatar
          // this.timeLineList = res.data.followMessageEntity
          localStorage.removeItem('userId')

          localStorage.setItem("ISPORTRIAT_customer", JSON.stringify(this.item))

          this.getShowPortraitType()
        })
      })
    },
    getShowPortraitType() {
      if (this.entry && this.entry == 'single_chat_tools') {
        this.showPortraitType = 1
        this.showGuideBox()
        console.log("comeFrom", this.$route.query)
        if (this.$route.query && this.$route.query.comeFrom == 'messageCard') {
          this.$nextTick(() => {
            this.$refs.dynamic.dynamicContentType = 3
            this.$refs.dynamic.selectFollowMsgList(4)
          })
        }
      } else if(this.entry && this.entry == 'group_chat_tools') {
        this.showPortraitType = 2
      }
    },
    showCompany(v) {
      document.getElementById('html').style.overflow = 'hidden'
      this.isShowDialog = v
      this.show = true
      if (v == 3) {
        this.titleName = '写跟进'
        this.message = ''
      }
    },
    cancelIcon() {
      document.getElementById('html').style.overflow = 'auto'
    },
    closeDialog(v) {
      this.show = false
      document.getElementById('html').style.overflow = 'auto'
      if (v == 3) {
        this.message = ''
      }
    },
    saveDialog(v) {
      if (v == 3) {
        this.$network
          .post('/customer-service/cluecustomer/addMessage', {
            clueCustomerNo: this.item.clueCustomerNo,
            context: this.message,
          })
          .then((res) => {
            if (res.result) {
              this.show = false
              document.getElementById('html').style.overflow = 'auto'
              // this.getTimeline()
              // this.getMethod()
              this.$message({
                type: 'success',
                message: '修改成功',
              })
            }
          })
      }
    },
    showRemindersBox() {
      this.$refs.remindersBox.show()
    },
    getPeople(data) {
      let arr = JSON.parse(JSON.stringify(this.$refs.messageBox.receiveUserInfo))

      arr.push(data)
      this.$refs.messageBox.receiveUserInfo = this.resetReceiveUserInfo(arr)
      this.$refs.remindersBox.hide()
    },
    resetReceiveUserInfo(arr) {
      let newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (this.noHas(newArr, arr[i].userNo)) {
          newArr.push(arr[i])
        }
      }
      return newArr
    },
    noHas(arr, userNo) {
      let result = arr.filter((item) =>{
        return item.userNo == userNo;
      })
      return result.length == 0 ? true : false;
    },
    checkBeforeSend(receiveUserInfo, message) {
      if (!receiveUserInfo || receiveUserInfo && !receiveUserInfo.length) {
        this.$toast('接收人不能为空')
        return false
      } else if (!message) {
        this.$toast('消息内容不能为空')
        return false
      }
      return true
    },
    async messageNotificatio(receiveUserInfo, message) {
      if (!this.checkBeforeSend(receiveUserInfo, message)) {
        return
      }
      const { avatar = '', name = '', userNo = '' } = this.sendUserInfo

      let params = {
        content: message,
        customerNo: this.item && this.item.clueCustomerNo,
        receiveUserInfo,
        sendUserInfo: {
          avatar,
          userName: name,
          userNo
        }
      }

      let { code, msg } = await MessageNotificatio(params)

      if (code == 'success') {
        this.$refs.dynamic.dynamicContentType = 3
        this.$refs.dynamic.selectFollowMsgList(4)
        this.$refs.messageBox.initData()
      }
      this.$toast(msg)
    },
  }
}
</script>
<style lang="less" scoped>
.large-padding {
  padding-bottom: 100px;
}
.custom_warp {
  min-height: 100vh;
  .customer-data {
    height: 400px;
    padding: 25px 0 0;
    background: #fff;
  }

  .infoContent {
    margin-top: 24px;
    background: #fff;
    .header-nav {
        display: flex;
        width: 100%;
        height: 100px;
        margin-bottom: 24px;
        border-bottom: 1px solid #F0F2F7;
        li {
            flex: 1;
            height: 100%;
            line-height: 100px;
            text-align: center;
            span {
                display: inline-block;
                height: 100%;
                margin: 0 auto;
                color: #838A9D;
                font-size: 28px;
                font-weight: 600;
            }
        }
        .active {
            span {
                color: #4168F6;
                border-bottom: 4px solid #4168F6;
            }
        }
    }
  }
  .bottom_model {
    /deep/.van-overlay {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .van-action-sheet__header {
      height: 88px;
      line-height: 88px;
      background: #fafbff;
      border-radius: 16px 16px 0px 0px;
      font-size: 28px;
      color: #3c4353;
      font-weight: 600;
    }
    .content {
      // height: 845px;
      padding: 24px;
      .writerInput {
        height: 490px;
        .van-cell,
        .van-field,
        .van-field--min-height {
          font-size: 28px;
          height: 400px;
          background: #ffffff;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          /deep/.van-field__control {
            height: 350px;
            padding-top: 10px;
          }
        }
      }
      .buttonWarp {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        span {
          display: inline-block;
          width: 339px;
          height: 80px;
          border-radius: 8px;
          border: 2px solid #4168f6;
          text-align: center;
          line-height: 80px;
        }
        .cancel {
          color: #4168f6;
          background: #fff;
        }
        .save {
          background: #4168f6;
          color: #fff;
        }
      }
    }
  }
}
.main_warp {
  height: 100%;
  width: 100%;
}
.loadingStyle {
  height: 200px;
  width: 200px;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background: rgba(24, 27, 32, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80px;
    height: 80px;
  }
}
.state {
  min-height: 292px;
  align-items: flex-start !important;
}
.dialogImg {
  margin-top: 20%;
  img {
    width: 702px;
  }
}
</style>