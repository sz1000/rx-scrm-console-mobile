<template>
  <div class="wrap">
    <div class="content">
      <div class="line_title">推送详情</div>
      <div class="p" v-if="taskType == 6">
        客户联系人{{ detail.customerContactName }}在
        {{ detail.customerAddTimeStr }} 阅读了{{ detail.materialTitle }}，时长{{
          detail.customerViewedTimeStr
        }}
      </div>
      <div class="p" v-else>
        [{{ detail.promptTimeStr }}] 给以下客户联系人发送消息
      </div>
      <div class="item_wrap">
        <div class="item_title">{{ taskType == 2 ? "客户群" : "客户" }}</div>
        <div class="item_val">
          <div class="info_box">
            <div class="avatar">{{ avatar }}</div>
            <div class="info">
              <div class="name">
                {{ contractName }}<i v-if="taskType != 2">{{ detail.customerType }}}</i>
              </div>
              <!-- <div class="name" v-else>
                {{ detail.customerContactName
                }}<i v-if="taskType != 2">{{ detail.customerType }}}</i>
              </div> -->
              <div class="time" v-if="taskType == 2">
                群人数：{{ detail.customerGroupPeopleCount }}
              </div>
              <div class="time" v-else>
                添加时间：{{ detail.customerAddTimeStr }}
              </div>
            </div>
            <!-- <div class="btn">跟进</div> -->
          </div>
        </div>
      </div>
      <div class="item_wrap" v-if="taskType == 6">
        <div class="item_title">素材内容</div>
        <div class="item_val">
          <div class="file_box">
            <div class="img_box">
              <img src="@/assets/images/icon_link.png" alt="" />
            </div>
            <div class="val">
              <div class="tit">{{ detail.materialTitle }}</div>
              <div class="sub_tit">{{ detail.materialUrl }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item_wrap" v-else>
        <div class="item_title">推送内容</div>
        <div class="item_val">
          <div class="share_box" v-for="(el, index) in list" :key="index">
            <div class="s_val" v-if="!el.url">
              <div class="des">{{ el.attachmentName }}</div>
            </div>
            <div class="s_val" v-if="el.fileName">
              <div class="img_row">
                <div class="img_box">
                  <img :src="el.url" alt="" />
                </div>
                <div class="info_r">
                  <div class="name">{{ el.fileName }}</div>
                  <div class="size">{{ el.fileSize }}</div>
                </div>
              </div>
            </div>
            <div class="s_val" v-if="el.url && !el.fileName">
              <div class="share_link">{{ el.url }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { notice_getNoticeDetail } from "@/api/notice";
import CommonHome from "../../utils/CommonHome";
export default {
  data() {
    return {
      id: this.$route.query.noticeId, // || 114
      taskType: this.$route.query.taskType, // || 2  1-个人SOP，2-群SOP，3-客户群发，4-客户群群发，5-数据日报，6-客户浏览素材，7-客户浏览名片
      detail: {},
    };
  },
  computed: {
    avatar() {
      let str = "";
      switch (this.taskType) {
        case 2:
          str = "群";
          break;
        case 6:
          str = this.detail.customerCorpName
            ? this.detail.customerCorpName.substring(0, 1)
            : "";
          break;
        default:
          str = this.detail.customerContactName
            ? this.detail.customerContactName.substring(0, 1)
            : "";
          break;
      }
      return str;
    },
    list() {
      let list = [];
      if (this.detail.noticeSopDetailContentVO) {
        list = this.detail.noticeSopDetailContentVO;
      }
      return list;
    },
    contractName(){
        let _str = ''
        if(this.detail.customerType.indexOf('微信') > -1){
            _str = this.detail.customerContactName
        }else {
            _str = this.detail.customerCorpName
        }
        return _str
    }
  },
  created() {
    if (!localStorage.getItem("token")) {
      CommonHome.getWxToken();
      console.log("获取token")
    }
  },
  mounted() {
    setTimeout(() => {
      this.getDetail();
       console.log("请求接口")
 
    }, 2000);
  },
  methods: {
    getDetail() {
      //获取通知详情
      notice_getNoticeDetail(this.id).then((res) => {
        if (res.result) {
          this.detail = res.data;
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
  padding: 24px;
  background: @white;
  .content {
    width: 100%;
    .line_title {
      font-size: 32px;
      line-height: 45px;
      font-weight: bold;
      color: @fontMain;
      padding-left: 20px;
      position: relative;
      margin-bottom: 24px;
      &::before {
        content: "";
        width: 8px;
        height: 32px;
        background: @main;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .p {
      color: @fontSub2;
      font-size: 28px;
      line-height: 40px;
      margin-bottom: 24px;
    }
    .item_wrap {
      width: 100%;
      min-height: 224px;
      border: 1px solid @dashedColor;
      border-radius: 8px;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      .item_title {
        width: 100%;
        height: 88px;
        background: @headerBg;
        font-size: 28px;
        line-height: 88px;
        color: @fontMain;
        font-weight: bold;
        padding-left: 50px;
        position: relative;
        &::before {
          content: "";
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: @lengthColor;
          position: absolute;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .item_val {
        width: 100%;
        padding: 24px;
        .info_box {
          width: 100%;
          display: flex;
          align-items: center;
          .avatar {
            width: 88px;
            height: 88px;
            line-height: 88px;
            border-radius: 8px;
            background: @main;
            text-align: center;
            font-size: 36px;
            font-weight: bold;
            color: @white;
            margin-right: 16px;
          }
          .info {
            width: calc(100% - 200px);
            .name {
              font-size: 28px;
              line-height: 40px;
              font-weight: bold;
              color: @fontMain;
              margin-bottom: 16px;
              i {
                font-style: normal;
                color: @yellow;
              }
            }
            .time {
              font-size: 24px;
              line-height: 32px;
              color: @fontSub2;
            }
          }
          .btn {
            width: 96px;
            height: 48px;
            line-height: 44px;
            font-size: 24px;
            color: @main;
            border: 1px solid @main;
            background: rgba(@main, 0.02);
            text-align: center;
            border-radius: 4px;
          }
        }
        .share_box {
          width: 100%;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          &:last-child {
            margin-bottom: 0;
          }
          .s_val {
            width: 100%;
            min-height: 88px;
            background: @white;
            border: 1px solid @bdColor;
            border-radius: 8px;
            padding: 24px;
          }
          .des {
            line-height: 40px;
            font-size: 28px;
            color: @fontSub2;
            word-break: break-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .share_link {
            line-height: 40px;
            font-size: 28px;
            color: #c0c4cc;
            word-break: break-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .img_row {
            width: 100%;
            display: flex;
            align-items: center;
            .img_box {
              width: 112px;
              height: 112px;
              background: rgba(@main, 0.04);
              border-radius: 4px;
              overflow: hidden;
              margin-right: 24px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info_r {
              width: calc(100% - 136px);
              .name {
                line-height: 40px;
                font-size: 28px;
                color: @fontMain;
                margin-bottom: 12px;
                word-break: break-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .size {
                height: 32px;
                font-size: 24px;
                color: #c0c4cc;
              }
            }
          }
        }
      }
      .file_box {
        width: 100%;
        display: flex;
        align-items: center;
        .img_box {
          width: 112px;
          height: 112px;
          font-size: 0;
          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .val {
          width: calc(100% - 128px);
          .tit {
            color: @fontMain;
            font-size: 28px;
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sub_tit {
            color: @fontSub2;
            font-size: 24px;
            line-height: 32px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>