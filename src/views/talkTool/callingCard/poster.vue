<template>
  <div class="wrap">
    <TopTitle title="我的名片"></TopTitle>
    <div class="content">
      <div class="card_box">
        <div class="card">
          <img class="bg" src="@/assets/images/card_bg2.png" alt="" />
          <div class="box">
            <div class="avatar">
              <img :src="detail.portrait" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ detail.userName }}</div>
              <div class="company">{{ detail.companyName }}</div>
            </div>
          </div>
          <div class="position">{{ detail.position }}</div>
        </div>
        <div class="code_box">
          <div class="img_box">
            <img class="img" :src="detail.employeeQrAddress" alt="" />
          </div>
          <div class="tips">可扫描二维码添加我的企业微信</div>
        </div>
      </div>
    </div>
    <div class="footer_opera">
      <div class="btn" @click="wxPreviewImage(detail.employeeQrAddress)">
        保存图片
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from "@/views/talkTool/groupCode/components/topTitle.vue";
import { userBusinessCard_personalCard } from "@/api/card";
import { wxPreviewImage } from "@/utils/tool";
export default {
  components: {
    TopTitle,
  },
  data() {
    return {
      detail: {},
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    wxPreviewImage,
    getDetail() {
      //获取详情
      userBusinessCard_personalCard().then((res) => {
        if (res.result) {
          let data = res.data;
          this.detail = data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  .content {
    width: 100%;
    height: calc(100vh - 232px);
    overflow-y: scroll;
    padding: 130px 70px 40px;
    .card_box {
      width: 100%;
      box-shadow: 0px 5px 20px 5px rgba(0, 27, 127, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }
    .card {
      width: 100%;
      height: 200px;
      // background-image: linear-gradient(270deg, #34B4F4 1%, #4168F6 100%);
      padding: 40px 32px;
      position: relative;
      overflow: hidden;
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .box {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 2;
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: @white;
          overflow: hidden;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          color: @white;
          .name {
            font-size: 36px;
            line-height: 40px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .company {
            font-size: 24px;
            line-height: 28px;
          }
        }
      }
      .position {
        font-size: 24px;
        line-height: 28px;
        color: @white;
        position: absolute;
        right: 32px;
        top: 64px;
      }
    }
    .code_box {
      width: 100%;
      height: calc(100vw - 140px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img_box {
        width: 400px;
        height: 400px;
        border: 1px solid @dashedColor;
        border-radius: 4px;
        padding: 8px;
        margin-top: -20;
        .img {
          width: 100%;
          height: 100%;
          // background: rgba(0,0,0,0.04);
        }
      }
      .tips {
        margin-top: 28px;
        font-size: 24px;
        line-height: 32px;
        color: @fontMain;
      }
    }
  }
  .footer_opera {
    width: 100%;
    height: 144px;
    padding: 24px 32px;
    background: @white;
    border-top: 1px solid @dashedColor;
    box-shadow: inset 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    .btn {
      width: 100%;
      height: 96px;
      color: @white;
      font-size: 32px;
      line-height: 96px;
      font-weight: bold;
      background: @main;
      border-radius: 8px;
      text-align: center;
      transition: all 0.2s;
      &:active {
        background: rgba(@main, 0.85);
      }
    }
  }
}
</style>