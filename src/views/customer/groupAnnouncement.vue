<template>
  <div class="group_wrap">
    <TitleBack title="群公告"></TitleBack>
    <div class="content">
      <div class="top">
        <div class="userIcon">
          <img :src="avatar" alt="" />
        </div>
        <div class="userInfo">
          <span>{{ name }}</span>
          <p>{{ createTime }}</p>
        </div>
      </div>

      <div class="list" style="margin: 30px 0">
        <div>{{ notice }}</div>
        <!-- <div style="margin-bottom:20px;">本群主要为极洲互动用户提供交流平台和相关资源。严禁乱发广告、游戏小程序、无关链接和引战言论（包括但不限于）。</div>
          <div style="margin-bottom:20px;">进群后按“昵称-地区”修改群昵称，如：阿中-北京</div>
          <div>每天活动：每日一答，可自选无限卡或书币；</div>
          <div>每周二活动：好书翻出来，免费听书馆，免费领取书籍；</div>
          <div>每周三活动：本周飙升榜，好书共赏·分享得1天无限卡 </div>
          <div>每周四活动：集赞互赞得无限卡，最高得十二天；</div>
          <div>每周五活动：免费图书馆，免费领取书籍；</div>
          <div>每周六活动：组队抽取无限卡。</div>
          <div  style="margin-top:20px;">建议和举报@群主或管理员</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { TitleBack } from "@/components";

export default {
  components: {
    TitleBack,
  },
  data() {
    return {
      groupName: {},
      src: "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
      name: "",
      createTime: "",
      avatar:"",
    };
  },
  mounted() {
    console.log(1234444555555);
    // createTime: this.groupName.createTime,notice:this.groupName.notice,owmerName:this.groupName.owmerName, }
    console.log(this.$route.query.createTime);
    this.createTime = this.$route.query.createTime;
    this.name = this.$route.query.owmerName;
    this.notice = this.$route.query.notice;
    this.avatar= this.$route.query.avatar;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.group_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  .content {
    padding: 24px;
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      .userIcon {
        width: 80px;
        height: 80px;
        margin: 20px;

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .userInfo {
        flex: 1;
        span {
          color: #262626;
          font-weight: 600;
          font-size: 28px;
          line-height: 48px;
        }
        p {
          color: #b3b3b3;
          font-size: 24px;
          line-height: 36px;
        }
      }
    }
    .list {
      font-size: 28px;
      color: #262626;
      font-weight: 600;
    }
  }
}
</style>