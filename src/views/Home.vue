<template>
  <div class="settinWarp">
    <div class="main-warp">
      <div class="customAccont">客户统计</div>
      <div class="statiStical">
        <div class="numResult afterLine">
          <span>{{ clues }}</span>
          <span>我的线索</span>
        </div>
        <div class="numResult afterLine">
          <span>{{ cluSee }}</span>
          <span>线索公海</span>
        </div>
        <div class="numResult afterLine">
          <span>{{ customer }}</span>
          <span>我的客户</span>
        </div>
        <div class="numResult">
          <span>{{ customerSee }}</span>
          <span>客户公海</span>
        </div>
      </div>
      <div class="customAccont tool">引流获客</div>
      <div class="btnRouter">
        <router-link
          to="/talkTool/enterpriseCode"
          v-show="menulist.includes('livecode')"
        >
          <div class="commonBtn">
            <img src="../images/huoma.png" alt="" />
            <span>获客活码</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/channelConfiguration"
          v-show="menulist.includes('channle')"
        >
          <div class="commonBtn">
            <img src="../images/qudao.png" alt="" />
            <span>渠道配置</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/customerGroup"
          v-show="menulist.includes('customerSend')"
        >
          <div class="commonBtn">
            <img src="../images/qunfa.png" alt="" />
            <span>客户群发</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/CustomergroupPlaye"
          v-show="menulist.includes('groupSend')"
        >
          <div class="commonBtn">
            <img src="../images/qunqnfa.png" alt="" />
            <span>客户群群发</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/lableDataGroup"
          v-show="menulist.includes('labelGroup')"
        >
          <div class="commonBtn">
            <img src="../images/yjlqon.png" alt="" />
            <span>标签建群</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/groupCodeList"
          v-show="menulist.includes('groupLivecode')"
        >
          <div class="commonBtn">
            <img src="../images/qhm.png" alt="" />
            <span>群活码</span>
          </div>
        </router-link>
        <router-link
          to="/talkTool/myCard"
          v-show="menulist.includes('business')"
        >
          <div class="commonBtn">
            <img src="../images/card.png" alt="" />
            <span>智能名片</span>
          </div>
        </router-link>

        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/lzbd.png" alt="" />
            <span class="nomaltext">留资表单</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/znsk2.png" alt="" />
            <span class="nomaltext">智能搜客</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/xstc2.png" alt="" />
            <span class="nomaltext">线索探查</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/dthk.png" alt="" />
            <span class="nomaltext">地图获客</span>
          </div>
        </router-link>
      </div>
      <div class="customAccont manage">客户管理</div>
      <div class="btnRouter custom">
        <router-link
          to="/customerManage/clues"
          v-show="menulist.includes('clew')"
        >
          <div class="commonBtn">
            <img src="../images/xiansuo.png" alt="" />
            <span>线索</span>
          </div>
        </router-link>
        <router-link
          to="/customerManage/myCustomer"
          v-show="menulist.includes('customer')"
        >
          <div class="commonBtn">
            <img src="../images/kehu.png" alt="" />
            <span>客户</span>
          </div>
        </router-link>
        <router-link
          to="/customerManage/grouplist"
          v-show="menulist.includes('group')"
        >
          <div class="commonBtn">
            <img src="../images/grouplist.png" alt="" />
            <span>群列表</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/lskh2.png" alt="" />
            <span class="nomaltext">流失客户</span>
          </div>
        </router-link>
      </div>
      <div class="customAccont manage">办公协同</div>
      <div class="btnRouter custom">
        <router-link to="/punchCard" v-show="menulist.includes('punchCode')">
          <div class="commonBtn">
            <img src="../images/wcdk.png" alt="" />
            <span>外出打卡</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/bfjh.png" alt="" />
            <span class="nomaltext">拜访计划</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/dbsx.png" alt="" />
            <span class="nomaltext">待办事项</span>
          </div>
        </router-link>
        <router-link to="">
          <div class="commonBtn" @click="showMsg">
            <img src="../images/wdbb2.png" alt="" />
            <span class="nomaltext">我的报表</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <div class="btm-box">
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
    </div> -->
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="dialogImg" align="center">
          <img src="../images/secreteig.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import CommonHome from "../utils/CommonHome";
import { Notify } from "vant";
export default {
  components: {},
  data() {
    return {
      userId: "",
      token: "",
      clues: "0",
      cluSee: "0",
      customer: "0",
      customerSee: "0",
      menulist: [],
      show: false,
    };
  },
  created() {
    this.$toast.loading({
      overlay: true,
      duration: 1000,
      loadingType: "spinner",
    });
    // CommonHome.getWxToken();
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
      this.getUserName();
    }, 2000);
  },
  methods: {
    showMsg() {
      Notify({
        message: "功能即将上线，请耐心等待~",
        type: "success",
        duration: 1000,
        className: "msgTitle",
        background: "#52BD94",
      });
    },
    getUserName() {
      this.$network
        .get("/user-service/user/getUserName", { endPoint: "mobile" })
        .then((res) => {
          if (res.code == "error_corp_forbid") {
            this.show = true;
          }
          this.show = !res.data.haveSecret;
          let tempMenuList = res.data.userEntity.permissionList;
          sessionStorage.setItem(
            "permissionsList",
            JSON.stringify(tempMenuList)
          );
          this.menulist = tempMenuList.map((item) => item.enName);
          // console.log(this.menulist)
        });
    },
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
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .main-warp {
    -webkit-overflow-scrolling: touch;
    height: 100%;
    box-sizing: border-box;
    padding: 24px 0px 24px 24px;
    overflow-y: scroll;
    scrollbar-width: 0;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .dialogImg {
    margin-top: 20%;
    img {
      width: 702px;
    }
  }
  .statiStical {
    width: 702px;
    height: 138px;
    background: rgba(65, 104, 246, 0.02);
    border: 2px solid #f0f2f7;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    box-sizing: border-box;
    .numResult {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span:nth-child(1) {
        font-size: 32px;
        color: #3c4353;
        font-weight: 600;
        line-height: 45px;
      }
      span:nth-child(2) {
        font-size: 24px;
        color: #838a9d;
      }
    }
    .afterLine {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        height: 60px;
        width: 2px;
        background: #f0f2f7;
        top: 39px;
        left: 130px;
      }
    }
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
    // padding: 0 35px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;
    .commonBtn {
      font-size: 28px;
      margin-bottom: 20px;
      font-weight: 500;
      color: #3c4353;
      text-align: center;
      width: 175px;
      .nomaltext {
        color: #c0c4cc;
      }
      span {
        display: inline-block;
      }
      img {
        width: 88px;
        height: 88px;
        margin: 0 auto 16px auto;
      }
    }
  }
  .tool {
    margin-top: 48px;
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
  // left: 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
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

