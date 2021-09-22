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
      addressName: '',
      addressDetail: '',
      cardDate: '',
      address: '',
      customer: '',
      customertype: '',
      customerAddress: '',
      remark: '',
    }
  },
  created() {},
  mounted() {
    this.getDateTime()
    this.getLocation()
  },
  methods: {
    formatDate,
    getDateTime() {
      setInterval(() => {
        this.nowDate = this.formatDate(new Date().getTime(), 'hh:mm')
      }, 1000)
    },
    returnPage() {
      this.$router.go(-1)
    },
    fnUpdate() {},
    clickCard() {
      this.$network
        .get('/user-service/m/user/getticket', {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: ['invoke', 'agentConfig', 'checkJsApi'],
          })
          var that = this
          wx.ready(function () {
            wx.invoke(
              'agentConfig',
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + '',
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: ['getContext', 'invoke'],
              },
              function (res) {
                wx.chooseImage({
                  count: 1, // 默认9
                  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  defaultCameraMode: 'normal', //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
                  isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
                  success: function (res) {
                    var localIds = res.localIds // 返回选定照片的本地ID列表，
                    alert('图片id为' + localIds)
                    // andriod中localId可以作为img标签的src属性显示图片；
                    // iOS应当使用 getLocalImgData 获取图片base64数据，从而用于img标签的显示（在img标签内使用 wx.chooseImage 的 localid 显示可能会不成功）
                    // alert(1111111111111111)
                    setTimeout(function () {
                      wx.uploadImage({
                        localId: localIds[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                          // alert(2222222222222222222)
                          alert('上传服务器端ID' + res.serverId)
                          var serverId = res.serverId // 返回图片的服务器端ID
                          that.addCodeSuccess(serverId)
                        },
                      })
                    }, 1000)
                  },
                })
              }
            )
          })
        })
    },
    addCodeSuccess(v) {
      let obj = JSON.parse(localStorage.getItem('addObj'))
      let params = {
        customerType: obj.radio,
        phone: obj.phone,
        customerPlace: obj.address,
        content: obj.remark,
        customerName: obj.client,
        clueCustomerNo: obj.clueCustomerNo,
        punchPlace: this.addressName,
      }
      this.$network
        .post('/user-service/punckClock/addPunckClock', params)
        .then()
      this.prepare = false
    },
    getLocation() {
      this.$network
        .get('/user-service/m/user/getticket', {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: ['invoke', 'agentConfig', 'checkJsApi'],
          })
          var that = this
          wx.ready(function () {
            wx.invoke(
              'agentConfig',
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + '',
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: ['getContext', 'invoke'],
              },
              function (res) {
                wx.getLocation({
                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function (res) {
                    alert(
                      '经纬度为：（' +
                        res.latitude +
                        '，' +
                        res.longitude +
                        '）'
                    )
                    // var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed // 速度，以米/每秒计
                    // that.addressName = res.accuracy // 位置精度
                  },
                })
              }
            )
          })
        })
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