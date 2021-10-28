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
      <customer-item :type="2" :itemData="customerData"></customer-item>
    </div>
    
    <div class="infoContent">
      <ul class="header-nav">
        <li v-for="(i, index) in navList" :key="i" @click="changeNav(index)" :class="{active: contentType == index}"><span>{{ i }}</span></li>
      </ul>

      <!-- 客户动态 -->
      <div v-if="contentType == 0" class="content-item dynamic">
        <div class="t_text">
          <span class="label_tag">客户动态</span>
        </div>
        <!-- <div class="allText">全部</div> -->

        <ul class="dynamic-nav">
          <li v-for="(i, index) in dynamicNavList" :key="i" @click="changeDynamicNav(index)" :class="{active: dynamicContentType == index}">{{ i }}</li>
        </ul>

        <div class="timeLine"
             v-if="timeLineList && timeLineList.length">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in timeLineList"
                              :key="index"
                              color="#4168F6"
                              type="danger ">
              <div class="recordBox">
                <div class="descTxt">{{ item.title }}</div>
                <div class="inLineTwo">{{ item.context }}</div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ item.userName }}</div>
                  <span class="time_right">
                    {{ formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss") }}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="noTimeLine" v-else>此用户暂无动态</div>
      </div>

      <!-- 商机 -->
      <opportunities v-if="contentType == 1" :customerNo="customerData && customerData.clueCustomerNo"></opportunities>
    	<div class="fujianBox" style="padding: 15px;" v-if="contentType == 2">
      	<Fujian></Fujian>
      </div>
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

    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">
          <div class="changeUser">
            <div class="selectUser">
              <span style="color: red">*</span><span>指定所属人:</span>
              <el-select v-model="userNo"
                         placeholder="请选择员工"
                         popper-class="popper-select-class">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.name"
                           :value="item.userNo"
                           @change="fnChangeUser">
                </el-option>
              </el-select>
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
  </div>
</template>
<script>
import { SelectFollowMsgList } from '../../config/api'

import { formatDate } from '../../utils/tool'
import CustomerItem from '../../components/CustomerManage/customerItem'
import Opportunities from '../../components/BusinessOpportunities/opportunities'
import  Fujian  from "./comTip/fujian";

export default {
  data() {
    return {
      customerData: {},
      timeLineList: [
        {
          title: '步骤一',
          userName: '描述信息',
          context: '描述信息描述信息描述信息描述信息',
          createTime: 1628128378602,
        },
      ],
      contentType: 0,
      navList: [ '客户动态', '商机', '附件' ],
      dynamicContentType: 0,
      dynamicNavList: [ '全部', '客户动态', '商机动态', '跟进记录' ],
      show: false,
      isShowDialog: null,
      titleName: '',
      message: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('customer')),
      btnList: [],
    }
  },
  created() {
    this.customerData = JSON.parse(localStorage.getItem('customer')) || {}
    this.btnList = JSON.parse(this.$route.query.alllist)
  },
  mounted() {
    this.getTimeline()
  },
  provide() {
    return {
      goDetail: this.goDetail
    }
  },
  methods: {
    formatDate,
    getTimeline() {
      // console.log(this.objItem, '------')
      this.$network
        .get('/customer-service/cluecustomer/getMessage', {
          cluecustomerno: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.timeLineList = res.data
        })
    },
    // 导航切换
    changeNav(index) {
      this.contentType = index
    },
    // 动态导航切换
    changeDynamicNav(index) {
      this.dynamicContentType = index

      if(index == 0) {
        this.getTimeline()
      } else if(index == 1) {
        this.timeLineList = []
      } else if(index == 2) {
        this.selectFollowMsgList(3)
      } else if(index == 3) {
        this.selectFollowMsgList(1)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    // 去往下层详情页
    goDetail() {
      this.$router.push({
        path: 'customerDeepSeas',
        query: { type: this.$route.query.type, alllist: JSON.stringify(this.btnList) },
      })
    },
    // 获取商机动态
    async selectFollowMsgList(punckStatus) {
      let params = {
        clueCustomerNo: this.customerData.clueCustomerNo,
        punckStatus // 1：跟进动态，3：商机动态
      }

      let { code, data } = await SelectFollowMsgList(params)
      
      if(code == 'success') {
        this.timeLineList = data
      }
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
        .catch(() => {
          // on cancel
        })
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
          // console.log(res)
          if (res.result) {
            this.$message({ type: 'success', message: '分配成功' })
            this.$router.go(-1)
          } else {
            this.$message({ type: 'success', message: res.data.msg })
          }
        })
    },
  },
  components: {
    CustomerItem,
    Opportunities,
    Fujian
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
    height: 400px;
    padding: 0 0 24px;
    background: #fff;
  }
  .btnWarp {
    display: flex;
    width: 100%;
    background-color: #fff;
    border-top: 2px solid #F0F2F7;
    z-index: 9;
    position: fixed;
    left: 0;
    bottom: 0;
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
    .content-item {
      padding: 0 24px 24px;
    }
    .dynamic {
      font-size: 28px;
      min-height: 200px;
      .t_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        .label_tag {
          font-weight: 600;
          color: #3c4353;
          position: relative;
          padding-left: 10px;
          &::before {
            content: '';
            width: 8px;
            height: 28px;
            background: #4168f6;
            position: absolute;
            top: 7px;
            left: -10px;
          }
        }
        .editButton {
          color: #838a9d;
          width: 152px;
          height: 68px;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          text-align: center;
          line-height: 68px;
          span {
            display: inline-block;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            margin: -10px 10px 0 0;
            margin-right: 5px;
            width: 28px;
            height: 28px;
          }
        }
      }
      .dynamic-nav {
        width: 100%;
        height: 40px;
        margin-bottom: 24px;
        li {
          display: inline-block;
          line-height: 40px;
          padding: 0 16px;
          vertical-align: middle;
          text-align: center;
          color: #3C4353;
          font-size: 28px;
          position: relative;
          &:not(:first-child)::before {
            content: '';
            width: 2px;
            height: 70%;
            background-color: #F0F2F7;
            position: absolute;
            left: 0;
            top: 15%;
          }
        }
        .active {
          color: #4168F6;
        }
      }
      .timeLine {
        .el-timeline {
          padding-left: 0 !important;
        }
        .recordBox {
          // width: 676px;
          min-height: 180px;
          background: rgba(65, 104, 246, 0.06);
          border-radius: 8px;
          color: #3c4353;
          padding: 16px 16px 0;
          font-size: 28px;
          .inLine {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .time_right {
              font-size: 28px;
              color: #838a9d;
            }
            img {
              width: 10px;
              height: 10px;
            }
          }
          .inLineTwo {
            margin-bottom: 16px;
            display: inline-block;
            word-break: normal;
            word-break: break-all;
            word-break: keep-all;
            word-break: break-word;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 2;
            // overflow: hidden;
          }
          .inLineEnd {
            text-align: right;
          }
          .descTxt {
            font-weight: 600;
            color: #3c4353;
            margin-bottom: 16px;
          }
        }
      }
      .noTimeLine {
        text-align: center;
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
</style>
<style lang="less">
.customer-data {
  .customInfo, .detailInfo, .tjry {
    padding: 0 24px;
  }
}
</style>