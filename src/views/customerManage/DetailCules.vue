<template>
  <div class="custom-detail">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">线索详情</span>
    </div>

    <div class="customer-data">
      <ClueItem :type="2" :itemData="objItem"></ClueItem>
    </div>

    <div class="infoContent">
      <ul class="header-nav">
        <li v-for="(i, index) in navList" :key="i" @click="changeNav(index)" :class="{active: contentType == index}"><span>{{ i }}</span></li>
      </ul>

      <!-- 线索动态 -->
      <div class="xiezuoBox" style="padding: 12px;" v-if="contentType == 0">
        <TimelineTabDiy ref="dynamic" :comeType="1" :btnList="btnList"></TimelineTabDiy>
      </div>
      <!-- 协作人 -->
      <div class="xiezuoBox" style="padding: 12px;" v-if="contentType == 1">
        <HelperFileLine></HelperFileLine>
      </div>

      <!-- 附件 -->
      <div class="fujianBox" style="padding: 12px;" v-if="contentType == 2">
        <Fujian></Fujian>
      </div>

    </div>

    <div class="bottom_model">
      <van-action-sheet v-model="show" :title="titleName" @cancel="cancelIcon" @click-overlay="cancelIcon" :lock-scroll="false">
        <div class="content">
          <div class="writerInput" v-if="isShowDialog == '3'">
            <van-field v-model="message" type="textarea" maxlength="200" placeholder="记录好跟进，多签单哟~" show-word-limit />
          </div>
          <div class="changeUser" v-if="isShowDialog == '4'">
            <div class="nowUser">
              <span>现有所属人:</span>
              <span>{{ nowUser }}</span>
            </div>
            <div class="selectUser">
              <div class="pleSs"><span style="color: red;">*</span>指定所属人:</div>
              <input class="changeSsSec" type="text" readonly="readonly" placeholder="请选择" :value="helperName" @click="openSsPop" />

              <van-action-sheet v-model="SsPop" title="选择所属人">
                <van-picker title="" show-toolbar :columns="options" @confirm="onConfirm" @cancel="onCancel" @change="onChange" value-key="name" />
              </van-action-sheet>
              <!--<el-select v-model="userNo"
		                         placeholder="请选择"
		                         popper-class="popper-select-class">
		                <el-option v-for="item in options"
		                           :key="item.value"
		                           :label="item.name"
		                           :value="item.userNo"
		                           @change="fnChangeUser">
		                </el-option>
		              </el-select>-->
            </div>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="closeDialog(isShowDialog)">取消</span>
            <span class="save" @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>

    <!-- 底部导航栏 -->
    <div class="btnWarp">
      <div class="btnBox" @click="transCustom" v-show="btnList.some(item=>item.enName == 'turn')">
        <img src="../../images/icon_change@2x.png" alt="" />
        <span>转客户</span>
      </div>
      <div class="btnBox" @click="changeUser" v-show="btnList.some(item=>item.enName == 'change')">
        <img src="../../images/icon_change2@2x.png" alt="" />
        <span>变更所属人</span>
      </div>
      <div class="btnBox" @click="giveUp" v-show="btnList.some(item=>item.enName == 'giveup')">
        <img src="../../images/icon_clear@2x.png" alt="" />
        <span>放弃</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import { _throttle } from '../../utils/tool'

import ClueItem from '../../components/CustomerManage/clueItem'
import Opportunities from '../../components/BusinessOpportunities/opportunities'
import HelperFileLine from './comTip/helperFileLine'
import Fujian from './comTip/fujian'
import TimelineTabDiy from '../../components/CustomerManage/timelineTabDiy'
export default {
  data() {
    return {
      timeLineList: [],
      contentType: 0,
      navList: ['线索动态', '协作人', '附件'],
      dynamicContentType: 1,
      dynamicNavList: ['全部', '线索动态', '跟进记录'],
      show: false,
      isShowDialog: null,
      titleName: '',
      message: '',
      isShow: false,
      nowUser: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('detail')),
      btnList: [],
      SsPop: false,
      helperName: '',
    }
  },
  created() {
    this.btnList = JSON.parse(this.$route.query.mylist)
  },
  mounted() {
    this.$refs.dynamic.selectFollowMsgList(2)
  },
  provide() {
    return {
      showCompany: this.showCompany,
      goDetail: this.goDetail,
    }
  },
  methods: {
    openSsPop() {
      this.SsPop = true
    },
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      console.log(value)
      this.userNo = value.userNo
      this.helperName = value.name
      this.SsPop = false
    },
    onChange(picker, value, index) {
      /*console.log(value)
      console.log(`当前值：${value}, 当前索引：${index}`);*/
    },
    onCancel() {
      this.SsPop = false
      console.log('取消')
    },
    transCustom() {
      this.$router.push({
        path: 'turnCustomer',
        query: {
          customno: this.objItem.clueCustomerNo,
          type: this.$route.query.type,
        },
      })
    },
    // 导航切换
    changeNav(index) {
      console.log('contentType---->', index)
      this.contentType = index
    },
    goBack() {
      this.$router.go(-1)
    },

    // 去往下层详情页
    goDetail() {
      this.$router.push({
        path: 'CuleFileGo',
        query: {
          type: this.$route.query.type,
          mylist: JSON.stringify(this.btnList),
        },
      })
    },
    cancelIcon() {
      document.getElementById('html').style.overflow = 'auto'
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
    changeUser() {
      this.isShowDialog = '4'
      this.show = true
      this.titleName = '变更所属人'
      let params = {
        clueCustomerNo: this.objItem.clueCustomerNo,
      }
      this.$network
        .get('/customer-service/cluecustomer/getuserList', params)
        .then((res) => {
          this.nowUser = res.data.userNo
          this.options = res.data.list
        })
    },
    giveUp() {
      this.$dialog
        .confirm({
          title: '是否放弃至公海',
          message:
            '放弃到公海后，此客户数据将属于公共资源，原归属 人员不能再维护跟进和更新此客户数据。',
          confirmButtonColor: '#4168f6',
          className: 'giveUpBtn',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .get('/customer-service/cluecustomer/giveUpType', {
              clueCustomerNo: this.objItem.clueCustomerNo,
              type: this.$route.query.type,
            })
            .then((res) => {
              if (res.result) {
                this.$router.go(-1)
                this.$message({
                  type: 'success',
                  message: '操作成功',
                })
              }
            })
        })
        .catch(() => {})
    },
    fnChangeUser(val) {
      console.log('fnChangeUser', val)
      this.userNo = val.userNo
    },
    closeDialog(v) {
      this.show = false
      document.getElementById('html').style.overflow = 'auto'
      if (v == 3) {
        this.message = ''
      } else if (v == 4) {
      }
    },
    saveDialog: _throttle(function (v) {
      if (v == 3) {
        this.$network
          .post('/customer-service/cluecustomer/addMessage', {
            clueCustomerNo: this.objItem.clueCustomerNo,
            context: this.message,
          })
          .then((res) => {
            if (res.result) {
              document.getElementById('html').style.overflow = 'auto'
              this.show = false
              this.$refs.dynamic.dynamicContentType = 3
              this.$refs.dynamic.selectFollowMsgList(1)
              this.$message({
                type: 'success',
                message: '修改成功',
              })
            }
          })
      } else if (v == 4) {
        let params = {
          cluecustomerno: this.objItem.clueCustomerNo,
          user_no: this.userNo,
          oldname: this.nowUser,
        }
        this.$network
          .get('/customer-service/cluecustomer/turnBlon', params)
          .then((res) => {
            if (res.result) {
              this.show = false
              this.$router.go(-1)
              this.$message({
                type: 'success',
                message: '编辑成功!',
              })
            } else {
              this.show = false
              this.$message({
                type: 'error',
                message: res.msg,
              })
            }
          })
      }
    }, 5000),
  },
  components: {
    ClueItem,
    Opportunities,
    HelperFileLine,
    Fujian,
    TimelineTabDiy,
  },
}
</script>
<style lang="less" scoped>
.custom-detail {
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
    height: 400px;
    padding: 0 0 24px;
    background: #fff;
  }
  .btnWarp {
    display: flex;
    width: 100%;
    max-width: 750px;
    background-color: #fff;
    border-top: 2px solid #f0f2f7;
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
        color: #3c4353;
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
      border-bottom: 1px solid #f0f2f7;
      li {
        flex: 1;
        height: 100%;
        line-height: 100px;
        text-align: center;
        span {
          display: inline-block;
          height: 100%;
          margin: 0 auto;
          color: #838a9d;
          font-size: 28px;
          font-weight: 600;
        }
      }
      .active {
        span {
          color: #4168f6;
          border-bottom: 4px solid #4168f6;
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
      .changeUser {
        height: 490px;
        font-size: 28px;
        font-weight: 600;
        .nowUser {
          display: inline-block;
          margin-left: 38px;
          margin-bottom: 25px;
          margin-top: 15px;
          font-size: 30px;
          font-weight: 400;
          color: #3c4353;
          /* padding-left: 20px;
          margin-bottom: 28px;
          span {
            display: inline-block;
          }*/
          span:nth-child(2) {
            font-weight: normal;
            color: #838a9d;
            margin-left: 15px;
          }
        }
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
.changeSsSec {
  height: 80px;
  font-size: 30px;
  padding-left: 15px;
  border-radius: 8px;
  margin-left: 17px;
  color: #c0c4cc;
  line-height: 80px;
  background: #ffffff;
  border: 2px solid #d9dae4;
  border-radius: 8px;
  width: 440px;
}
.pleSs {
  display: inline-block;
  margin-left: 23px;
  margin-bottom: 25px;
  margin-top: 15px;
  font-size: 30px;
  font-weight: 400;
  color: #3c4353;
}
</style>
<style lang="less">
.customer-data {
  .customInfo,
  .detailInfo,
  .tjry {
    padding: 0 24px;
  }
}
</style>