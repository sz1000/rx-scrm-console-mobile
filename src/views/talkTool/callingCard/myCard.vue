<template>
  <div class="wrap">
    <TopTitle title="我的名片">
      <span
        class="look_data"
        v-if="isSetting"
        @click="$router.push('/talkTool/lookData')"
        >浏览数据</span
      >
    </TopTitle>
    <div class="content">
      <div class="card" v-if="isSetting">
        <img class="bg" src="@/assets/images/card_bg1.png" alt="" />
        <div class="box">
          <div class="avatar">
            <img :src="detail.portrait" alt="" />
          </div>
          <div class="info">
            <div class="name">{{ detail.userName }}</div>
            <div class="company">{{ detail.companyName }}</div>
          </div>
          <div class="position">{{ detail.position }}</div>
        </div>
      </div>
      <div class="editor_box" v-if="isSetting">
        <div class="editor_title" v-if="detail.enterpriseTitle">
          {{ detail.enterpriseTitle }}
        </div>
        <div class="editor_des" v-html="detail.enterpriseDescription"></div>
      </div>
      <!-- 暂未设置信息 -->
      <div class="no_setting" v-else>
        <img class="img" src="@/assets/images/card_no_setting.png" />
      </div>
    </div>
    <!--    tag-read" -->
    <div class="footer_opera" v-if="isSetting">
      <div class="item">
        <div class="icon_btn  tag-read" :data-clipboard-text="titeActive" @click="copy">
          <img class="img" src="@/assets/images/share.png" alt="" />
          <div class="btn">分享名片</div>
        </div>
      </div>
  
      <div class="item">
        <div class="icon_btn" @click="$router.push('/talkTool/poster')">
          <img class="img" src="@/assets/images/download.png" alt="" />
          <div class="btn">生成海报</div>
        </div>
      </div>
          <div class="item">
        <div class="icon_btn" @click="shareText">
          <img class="img" src="@/assets/images/share.png" alt="" />
          <div class="btn">跳转小程序</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from "@/views/talkTool/groupCode/components/topTitle.vue";
import { userBusinessCard_personalCard } from "@/api/card";
import Clipboard from "clipboard";
import { Toast } from "vant";

export default {
  components: {
    TopTitle,
  },
  data() {
    return {
      detail: {},
      show: false,
      isSetting: true,
      titeActive: "",
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
          shareText(v) {
      // console.log('----分享分组----', v)
    var a = document.createElement("a");
    //   a.download = "";
    a.href =this.detail.miniProgramUrlLink;
        a.click();
    },

    copy() {
        var clipboard = new Clipboard(".tag-read");
        if(this.titeActive == ""){
           Toast("链接为空,复制失败！");
        }
        clipboard.on("success", (e) => {
        // console.log("复制成功");
            Toast("复制成功");
        //  释放内存
        // clipboard.destory();
        });
        clipboard.on("error", (e) => {
            // 不支持复制
            console.log("该浏览器不支持复制");
            Toast("复制失败");
            // 释放内存
            // clipboard.destory();
        });
    },
    getDetail() {
      //获取详情
      userBusinessCard_personalCard().then((res) => {
        if (res.result) {
            let data = res.data;
            this.detail = data;
            let dataLInk = data && data.miniProgramUrlLink ? data.miniProgramUrlLink.replace(/\"/g, "") : ''
            this.titeActive = dataLInk;
            if (res.data) {
                this.isSetting = true;
            } else {
                this.isSetting = false;
            }
            console.log(this.isSetting)
        }else{
            this.isSetting = false;
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
  .dialog_wrap {
    position: absolute;
    z-index: 99;
    .dialog_box {
      width: 458px;
      background-image: linear-gradient(90deg, #6ea3ff 0%, #5795ff 100%);
      position: absolute;
      top: 46px;
      right: 16px;
      border-radius: 8px;
      padding: 30px;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-right: 20px solid transparent;
        border-left: 20px solid transparent;
        border-bottom: 20px solid #5795ff;
        position: absolute;
        top: -16px;
        right: 16px;
      }
      .tips {
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 28px;
          line-height: 32px;
          color: @white;
          position: relative;
          &:first-child::before {
            content: "";
            width: 2px;
            height: 26px;
            background: rgba(@white, 0.3);
            position: absolute;
            right: -32px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  .look_data {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
  .content {
    width: 100%;
    height: calc(100vh - 200px);
    // overflow-y: scroll;
    overflow: auto;
    padding: 32px;
    .no_setting {
      width: 100%;
      display: flex;
      padding-top: 25vh;
      justify-content: center;
      align-items: center;
      .img {
        width: 300px;
      }
    }
    .card {
      width: 100%;
      height: 200px;
      // background-image: linear-gradient(270deg, #34B4F4 1%, #4168F6 100%);
      box-shadow: 0px 5px 20px 5px rgba(0, 27, 127, 0.08);
      border-radius: 12px;
      padding: 40px 32px;
      position: relative;
      margin-bottom: 40px;
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
          overflow: hidden;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: calc(100% - 140px);
          color: @white;
          .name {
            width: 64%;
            font-size: 36px;
            line-height: 40px;
            font-weight: bold;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        top: 28px;
      }
    }
    .editor_box {
      width: 100%;
      .editor_title {
        font-size: 32px;
        line-height: 46px;
        font-weight: bold;
        color: @fontMain;
        margin-bottom: 28px;
        word-break: break-all
      }
      .editor_des {
        width: 100%;
      }
    }
  }
  .footer_opera {
    width: 100%;
    height: 112px;
    background: @white;
    display: flex;
    .item {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon_btn {
        text-align: center;
      }
      .img {
        width: 27px;
        height: 27px;
        margin-bottom: 18px;
        display: inline-block;
      }
      .btn {
        font-size: 20px;
        line-height: 28px;
        color: @fontMain;
      }
    }
  }
}
</style>