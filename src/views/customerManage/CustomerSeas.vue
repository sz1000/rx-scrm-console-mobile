<template>
  <div class="culeDeatil">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户详情</span>
    </div>

    <div class="customer-data">
      <customer-item :type="2" :fromType="'4'" :itemData="objItem"></customer-item>
    </div>
    
    <div class="infoContent">
      <ul class="header-nav">
        <li v-for="(i, index) in navList" :key="i" @click="changeNav(index)" :class="{active: contentType == index}"><span>{{ i }}</span></li>
      </ul>

      <!-- 客户动态 -->
      <dynamic v-if="contentType == 0" ref="dynamic" :comeType="2" :btnList="btnList"></dynamic>

      <!-- 商机 -->
      <opportunities v-if="contentType == 1" :customerNo="objItem && objItem.clueCustomerNo"></opportunities>
      
    	<div class="fujianBox" style="padding: 12px;" v-if="contentType == 2">
      	<Fujian></Fujian>
      </div>
    </div>

    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">
          <div class="changeUser">
            <div class="selectUser">
              <div class="pleSs"><span style="color: red;">*</span>指定所属人:</div>
              <input class="changeSsSec" type="text" readonly="readonly" placeholder="请选择"  :value="helperName" @click="openSsPop" />
		              
		              <van-action-sheet v-model="SsPop" title="选择所属人">
							  		<van-picker
											  title=""
											  show-toolbar
											  :columns="options"
											  @confirm="onConfirm"
											  @cancel="onCancel"
											  @change="onChange"
											  value-key="name"
											/>
						 			</van-action-sheet>
            </div>
          </div>
          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog(isShowDialog)">取消</span>
            <span class="save"
                  @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>

    <!-- 底部导航栏 -->
    <div class="btnWarp">
      <div class="btnBox"
           @click="getReceive"
           v-show="btnList.some(item=>item.enName == 'get')">
        <img src="../../images/icon_like@2x.png"
             alt="" />
        <span>领取</span>
      </div>
      <div class="btnBox"
           @click="distribution"
           v-show="btnList.some(item=>item.enName == 'allot')">
        <img src="../../images/icon_share@2x.png"
             alt="" />
        <span>分配</span>
      </div>
    </div>

    <!-- 新手引导 -->
    <guide-box ref="guideBox"></guide-box>

    <!-- 协作人消息输入框 -->
    <message-box v-if="contentType == 0" ref="messageBox" :class="{'details-message': btnList.some(item=>item.enName == 'get') || btnList.some(item=>item.enName == 'allot')}"></message-box>

    <!-- 协作人选择弹窗 -->
    <reminders-box ref="remindersBox" :fromType="'4'" :customerNo="objItem && objItem.clueCustomerNo"></reminders-box>
  </div>
</template>
<script>
import CustomerItem from '../../components/CustomerManage/customerItem'
import Dynamic from '../../components/CustomerManage/dynamic'
import Opportunities from '../../components/BusinessOpportunities/opportunities'
import  Fujian  from "./comTip/fujian"
import GuideBox from "../../components/CustomerManage/guideBox"
import MessageBox from "../../components/CustomerManage/messageBox"
import RemindersBox from '../../components/CustomerManage/dialog/remindersBox'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      contentType: 0,
      navList: [ '客户动态', '商机', '附件' ],
      show: false,
      isShowDialog: null,
      titleName: '',
      message: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('customer')),
      btnList: [],
      SsPop:false,
      helperName:'',
      sendUserInfo: {},
    }
  },
  created() {
    this.btnList = JSON.parse(this.$route.query.alllist)
    this.getCorpId()
    this.showGuideBox()
  },
  provide() {
    return {
      goDetail: this.goDetail,
      showCompany: null,
      showGuideBox: this.showGuideBox,
      showRemindersBox: this.showRemindersBox,
      messageNotificatio: this.messageNotificatio,
      getPeople: this.getPeople,
    }
  },
  methods: {
  	openSsPop(){
  		this.SsPop = true;
  	},
  	onConfirm(value, index) {
     // console.log(`当前值：${value}, 当前索引：${index}`);
      console.log(value)
				this.userNo = value.userNo
       this.helperName = value.name
   			this.SsPop = false;
    },
    onChange(picker, value, index) {
    	/*console.log(value)
      console.log(`当前值：${value}, 当前索引：${index}`);*/
    },
    onCancel() {
    	this.SsPop = false;
      console.log('取消');
    },
    ...mapActions(["getCorpId"]),
    // 导航切换
    changeNav(index) {
      this.contentType = index
    },
    goBack() {
      this.$router.go(-1)
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

    // 去往下层详情页
    goDetail() {
      this.$router.push({
        path: 'customerDeepSeas',
        query: { type: this.$route.query.type, alllist: JSON.stringify(this.btnList) },
      })
    },
    getReceive() {
      this.$dialog
        .confirm({
          title: '领取提示',
          message: '是否确认领取所选择的线索？\n确认申领该条资源吗？',
          className: 'giveUpBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .get('/customer-service/cluecustomer/getclue', {
              clueCustomerNo: this.objItem.clueCustomerNo,
              type: this.$route.query.type,
            })
            .then((res) => {
              this.$message({ type: 'success', message: '领取成功' })
              this.$router.go(-1)
            })
        })
        .catch(() => {})
    },
    distribution() {
      // this.isShowDialog = '4'
      this.show = true
      this.titleName = '分配线索'
      this.$network
        .get('/customer-service/cluecustomer/getuserList', {
          clueCustomerNo: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.options = res.data.list
        })
    },
    fnChangeUser(val) {
      console.log(val)
    },
    closeDialog(v) {
      this.show = false
    },
    saveDialog(v) {
      this.show = false
      this.$network
        .get('/customer-service/cluecustomer/turnBlon', {
          cluecustomerno: this.objItem.clueCustomerNo,
          user_no: this.userNo,
        })
        .then((res) => {
          if (res.result) {
            this.$message({ type: 'success', message: '分配成功' })
            this.$router.go(-1)
          } else {
            this.$message({ type: 'success', message: res.data.msg })
          }
        })
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
        customerNo: this.objItem && this.objItem.clueCustomerNo,
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
  },
  components: {
    CustomerItem,
    Dynamic,
    Opportunities,
    Fujian,
    GuideBox,
    MessageBox,
    RemindersBox
  }
}
</script>
<style lang="less" scoped>
.culeDeatil {
  padding-bottom: 112px;
  .headerTitle {
    background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    line-height: 87px;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
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
    }
  }
  .customer-data {
    padding: 0 0 24px;
    background: #fff;
  }
  .btnWarp {
    display: flex;
    width: 100%;
    max-width: 750px;
    background-color: #fff;
    border-top: 2px solid #F0F2F7;
    z-index: 9;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    .btnBox {
      flex: 1;
      height: 112px;
      border-radius: 9px;
      text-align: center;
      font-size: 0;
      img {
        width: 40px;
        height: 40px;
        margin: 16px auto 12px;
      }
      span {
        font-size: 20px;
        color: #3C4353;
      }
    }
  }
  
  .infoContent {
    margin-top: 24px;
    background-color: #fff;
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
                display: block;
                width: 150px;
                height: 100%;
                margin: 0 auto;
                color: #838A9D;
                font-size: 28px;
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
      .tagWarp {
        height: 740px;
        overflow-y: auto;
        font-size: 28px;
        .tagRow {
          display: flex;
          min-height: 70px;
          margin-bottom: 24px;
          span {
            display: inline-block;
            color: #838a9d;
            text-align: center;
            line-height: 68px;
            height: 68px;
            border: 1px solid #d9dae4;
            margin-right: 16px;
            padding: 0 16px;
            border-radius: 4px;
            margin-bottom: 4px;
          }
          .groupName {
            border: none;
            width: 112px;
            line-height: 68px;
            word-wrap: break-word;
            word-break: normal;
            font-weight: 600;
            margin-right: 24px;
          }
          .tagStyle {
            flex: 1;
            .perchInput {
              border: none;
            }
            .creatTag {
              background: #fafbff;
              margin-bottom: 16px;
              // vertical-align: middle;
              // white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // max-width: 300px;
            }
            .changeTag {
              background: #4168f6;
              color: #fff;
              span {
                color: #fff;
              }
              .van-icon {
                color: #fff;
              }
            }
          }
        }
      }
      .personWarp {
        .tagRow {
          .addInput {
            width: 256px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            padding: 0 16px;
          }
          .creatTag {
            padding-right: 0;
            span {
              border: none;
              padding: 0;
              margin: 0;
            }
            .deleteTag {
              width: 50px;
            }
          }
        }
      }
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
      .changeUser {
        height: 490px;
        font-size: 28px;
        font-weight: 600;
        .selectUser {
          /deep/.el-select {
            width: 519px;
            height: 80px;
            margin-left: 16px;
            .el-input,
            .el-input__inner {
              width: 519px;
              height: 80px;
              border-radius: 8px;
              font-size: 28px;
              font-weight: normal;
              border: 1px solid #d9dae4;
            }
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
.changeSsSec{
	    height: 80px;
    	font-size: 30px;
    	padding-left: 15px;
    	border-radius: 8px;
    	margin-left: 17px;
    	color: #C0C4CC ;
    	line-height: 80px;
    	background: #FFFFFF;
			border: 1px solid #D9DAE4;
			border-radius: 8px;
			font-weight: 300;
}
.pleSs{
	display: inline-block;
	margin-left: 23px;
	margin-bottom: 25px;
	margin-top: 15px;
	font-size: 30px;
	font-weight: 400;
	color:  #3C4353;
}
</style>
<style lang="less">
.customer-data {
  .customInfo, .detailInfo, .tjry {
    padding: 0 24px;
  }
}
</style>