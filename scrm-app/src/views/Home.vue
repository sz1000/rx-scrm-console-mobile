<template>
  <div class="settinWarp">
    <div class="customAccont">客户统计</div>
    <div class="cardContent">
      <div class="box card1">
        <span>1000</span>
        <span>客户总数</span>
      </div>
      <div class="box card2">
        <span>1000</span>
        <span>今日新增</span>
      </div>
    </div>
    <div class="cardContent">
      <div class="box card3">
        <span>1000</span>
        <span>客户流失数</span>
      </div>
      <div class="box card4">
        <span>1000</span>
        <span>发请申请数</span>
      </div>
    </div>
    <div class="customAccont tool">拓客工具</div>
    <div class="btnRouter">
      <div class="commonBtn"
           @click="fnToIndex(1)">
        <img src="../images/huoma.png"
             alt="" />
        <span>企微活码</span>
      </div>
      <div class="commonBtn"
           @click="fnToIndex(2)">
        <img src="../images/qudao.png"
             alt="" />
        <span>渠道配置</span>
      </div>
    </div>
    <div class="customAccont manage">客户管理</div>
    <div class="btnRouter custom">
      <div class="commonBtn"
           @click="fnToIndex(3)">
        <img src="../images/xiansuo.png"
             alt="" />
        <span>线索</span>
      </div>
      <div class="commonBtn"
           @click="fnToIndex(4)">
        <img src="../images/kehu.png"
             alt="" />
        <span>客户</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.$nextTick(() => {
      //   let wx = window.wx
      //   console.log(wx)
      //   wx.config({
      //     beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //     appId: '', // 必填，企业微信的corpID
      //     // timestamp: , // 必填，生成签名的时间戳
      //     nonceStr: '', // 必填，生成签名的随机串
      //     signature: '', // 必填，签名，见 附录-JS-SDK使用权限签名算法
      //     jsApiList: [], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      //   }),
      //     wx.ready(function () {
      //       // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      //       wx.invoke('getContext', {}, function (res) {
      //         if (res.err_msg == 'getContext:ok') {
      //           entry = res.entry //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools、chat_attachment
      //           shareTicket = res.shareTicket //可用于调用getShareInfo接口
      //         } else {
      //           //错误处理
      //         }
      //       })
      //     })
    })
  },
  created() {
    // this.$network.get('/customer-service/group/list').then((res) => {})
  },
  methods: {
    fnToIndex(v) {
      if (v == 1) {
        this.$router.push('/talkTool')
      } else if (v == 2) {
        this.$router.push('/talkTool/channelConfiguration')
      } else if (v == 3) {
        this.$router.push('/customerManage/clues')
      } else {
        this.$router.push('/customerManage/myCustomer')
      }
    },
  },
}
</script>
<style lang='less' scoped>
.HomeWarp {
  .settinWarp {
    padding: 24px;
    background: #fff;
    height: 100%;
    .customAccont {
      position: relative;
      font-size: 28px;
      font-weight: 600;
      color: #3c4353;
      padding-left: 20px;
      margin-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 0;
        width: 8px;
        height: 28px;
        background: #4168f6;
      }
    }
    .cardContent {
      display: flex;
      justify-content: space-between;
      .box {
        width: 339px;
        height: 142px;
        margin-bottom: 24px;
        color: #fff;
        padding: 32px 0 0 32px;
        box-sizing: border-box;
        span:nth-child(1) {
          display: block;
          font-size: 32px;
        }
        span:nth-child(2) {
          display: block;
          font-size: 24px;
        }
      }
      .card1 {
        background: url('../images/kehuzongshu.png') no-repeat;
        background-size: contain;
      }
      .card2 {
        background: url('../images/xinzeng.png') no-repeat;
        background-size: contain;
      }
      .card3 {
        background: url('../images/liushi.png') no-repeat;
        background-size: contain;
      }
      .card4 {
        background: url('../images/shenqing.png') no-repeat;
        background-size: contain;
      }
    }
    .btnRouter {
      display: flex;
      padding-left: 67px;
      .commonBtn {
        width: 112px;
        margin-right: 88px;
        font-size: 28px;
        font-weight: 600;
        color: #3c4353;
        span {
          display: inline-block;
          margin-left: -12px;
        }
        img {
          width: 88px;
          height: 88px;
          margin-bottom: 16px;
        }
      }
    }
    .tool {
      margin-top: 10px;
    }
    .manage {
      margin-top: 32px;
    }
    .custom {
      .commonBtn {
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

