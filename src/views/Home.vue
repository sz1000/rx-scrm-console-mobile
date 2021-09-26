<template>
  <div class="settinWarp">
    <div class="main-warp">
      <div class="customAccont">客户统计</div>
      <div class="cardContent">
        <div class="box card1">
          <span>{{ clues }}</span>
          <span>我的线索</span>
        </div>
        <div class="box card2">
          <span>{{ cluSee }}</span>
          <span>线索公海</span>
        </div>
      </div>
      <div class="cardContent">
        <div class="box card3">
          <span>{{ customer }}</span>
          <span>我的客户</span>
        </div>
        <div class="box card4">
          <span>{{ customerSee }}</span>
          <span>客户公海</span>
        </div>
      </div>
      <div class="customAccont tool">拓客工具</div>
      <div class="btnRouter">
        <router-link to="/talkTool/enterpriseCode">
          <div class="commonBtn">
            <img src="../images/huoma.png" alt="" />
            <span>渠道活码</span>
          </div>
        </router-link>
        <router-link to="/talkTool/channelConfiguration">
          <div class="commonBtn">
            <img src="../images/qudao.png" alt="" />
            <span>渠道配置</span>
          </div>
        </router-link>
      </div>
      <div class="customAccont manage">客户管理</div>
      <div class="btnRouter custom">
        <router-link to="/customerManage/clues">
          <div class="commonBtn">
            <img src="../images/xiansuo.png" alt="" />
            <span>线索</span>
          </div>
        </router-link>
        <router-link to="/customerManage/myCustomer">
          <div class="commonBtn">
            <img src="../images/kehu.png" alt="" />
            <span>客户</span>
          </div>
        </router-link>
        <router-link to="/customerManage/grouplist">
          <div class="commonBtn">
            <img src="../images/grouplist.png" alt="" />
            <span>群列表</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="btm-box">
      <div class="bottom-warp">
        <div class="routerbtn" @click="goToCard">
          <img src="../images/daka2.png" alt="" />
          <span>打卡</span>
        </div>
        <div class="routerbtn">
          <img src="../images/gongju1.png" alt="" />
          <span class="textname">运营工具</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHome from "../utils/CommonHome";

export default {
  components: {},
  data() {
    return {
      userId: "",
      token: "",
      clues: "",
      cluSee: "",
      customer: "",
      customerSee: "",
    };
  },
  created() {
    this.$toast.loading({
      overlay: true,
      duration: 1000,
      loadingType: "spinner",
    });
    // CommonHome.getWxToken()
  },
  mounted() {
    setTimeout(() => {
      this.$network
        .get("/customer-service/cluecustomer/homedata")
        .then((res) => {
          this.clues = res.data.myThread;
          this.cluSee = res.data.derThread;
          this.customer = res.data.myCustomer;
          this.customerSee = res.data.derCustomer;
        });
    }, 2000);
    // this.$toast.clear()
  },
  methods: {
    goToCard() {
      this.$router.push("/punchCard");
    },
  },
};
</script>
<style lang='less' scoped>
// .HomeWarp {
.settinWarp {
  background: #fff;
  height: 100%;
  overflow: auto;
  .main-warp {
    padding: 24px;
  }
  .customAccont {
    position: relative;
    font-size: 28px;
    font-weight: 600;
    color: #3c4353;
    padding-left: 20px;
    margin-bottom: 24px;
    &::before {
      content: "";
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
      background: url("../images/three.png") no-repeat;
      background-size: contain;
    }
    .card2 {
      background: url("../images/one.png") no-repeat;
      background-size: contain;
    }
    .card3 {
      background: url("../images/four.png") no-repeat;
      background-size: contain;
    }
    .card4 {
      background: url("../images/two.png") no-repeat;
      background-size: contain;
    }
  }
  .btnRouter {
    display: flex;
    padding-left: 67px;
    .commonBtn {
      // width: 112px;
      margin-right: 88px;
      font-size: 28px;
      font-weight: 600;
      color: #3c4353;
      text-align: center;

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
.btm-box {
  position: fixed;
  bottom: 0;
  // width: 100%;
  width: 750px;
  .bottom-warp {
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    height: 112px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 168px;
    justify-content: space-between;
    .routerbtn {
      font-size: 28px;
      .textname {
        color: #4168f6;
      }
      img {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        margin-bottom: 12px;
      }
    }
  }
}
// }
</style>

