<template>
  <div class="card-warp">
    <div class="title-area">外出打卡</div>
    <div class="backUp"
         @click="returnPage"
         v-show="prepare">
      <van-icon name="arrow-left" />
      <span>上一步</span>
    </div>
    <div class="main-click"
         v-show="prepare">
      <div class="click_round"
           @click="clickCard">
        <span> 打卡</span>
        <span>{{nowDate}}</span>
      </div>
      <div class="now-address">
        <span>当前地址:</span>
        <span>{{addressName}}</span>
        <span>{{addressDetail}}</span>
      </div>
      <div class="updateAddress"
           @click="fnUpdate">
        刷新地址
      </div>
    </div>
    <div class="success-main"
         v-show="!prepare">
      <div class="icon-success">
        <img src="../../images/success-img.png"
             alt="">
      </div>
      <div class="text-success">打卡成功</div>
      <div class="detail-info">
        <div class="box">
          <span>打卡时间:</span>
          <span>{{cardDate}}</span>
        </div>
        <div class="box">
          <span>打卡地址:</span>
          <span>{{address}}</span>
        </div>
        <div class="box">
          <span>客户类型:</span>
          <span>{{customertype}}</span>
        </div>
        <div class="box">
          <span>对应客户:</span>
          <span>{{customer}}</span>
        </div>
        <div class="box">
          <span>客户地址:</span>
          <span>{{customerAddress}}</span>
        </div>
        <div class="box">
          <span>备注:</span>
          <span>{{remark}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../utils/tool.js'
export default {
  data() {
    return {
      prepare: true,
      nowDate: '',
      addressName: '上海市',
      addressDetail: '杨浦区',
      cardDate: '',
      address: '',
      customer: '',
      customertype: '',
      customerAddress: '',
      remark: '111111',
    }
  },
  mounted() {
    setInterval(() => {
      this.nowDate = this.formatDate(new Date().getTime(), 'hh:mm')
    }, 1000)
  },
  methods: {
    formatDate,
    returnPage() {
      this.$router.go(-1)
    },
    fnUpdate() {},
    clickCard() {
      console.log('1111111111111111111')
      this.prepare = false
    },
  },
}
</script>
<style lang="less" scoped>
.card-warp {
  height: 100%;
  background: #fff;
  padding: 48px 24px;
  .title-area {
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #3c4353;
    font-weight: 500;
    margin-bottom: 48px;
  }
  .backUp {
    color: #4168f6;
    font-size: 28px;
    .van-icon {
      color: #4168f6;
      vertical-align: -10%;
    }
  }
  .main-click {
    padding-top: 228px;
    .click_round {
      width: 272px;
      height: 272px;
      border-radius: 50%;
      border: 30px solid #4168f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: auto;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        font-size: 38px;
        color: #3c4353;
        font-weight: 600;
        line-height: 53px;
      }
      span:nth-child(2) {
        font-size: 28px;
        color: #838a9d;
      }
    }
    .now-address {
      text-align: center;
      margin-top: 48px;
      span {
        display: inline-block;
        margin-right: 16px;
        font-size: 28px;
      }
    }
    .updateAddress {
      text-align: center;
      color: #4168f6;
      margin-top: 48px;
      font-size: 28px;
    }
  }
  .success-main {
    padding-top: 136px;
    .icon-success {
      display: flex;
      justify-content: center;
      img {
        width: 272px;
      }
    }
    .text-success {
      text-align: center;
      font-size: 38px;
      font-weight: 600;
    }
    .detail-info {
      padding: 48px 132px 0;
      margin-top: 48px;
      border-top: 1px solid #f0f2f7;
      border-bottom: 1px solid #f0f2f7;
      .box {
        font-size: 28px;
        margin-bottom: 24px;
        span {
          display: inline-block;
        }
        span:nth-child(1) {
          width: 140px;
          text-align: right;
          color: #838a9d 100%;
          margin-right: 16px;
        }
        span:nth-child(2) {
          color: #3c4353 100%;
        }
      }
    }
  }
}
</style>