<template>
  <div class="group_wrap">
    <TitleBack class="title" title="SOP"></TitleBack>
    <div class="content">
      <!-- <div class="row tag" @click="toGroupAnnouncement">
        <div class="groupTxt">群公告</div>
        <div class="tag_wrap notice">
          <p>
            {{ notice || "暂无内容" }}
          </p>
          <img
            v-if="flag"
            class="icon"
            src="@/assets/svg/icon_next_gray.svg"
            alt=""
          />
        </div>
      </div>
      <div class="row lable_box">
        <div class="tag lable_top">
          <div class="tit">群标签</div>
          <img
            class="edit"
            @click="chooseCusSign = true"
            src="@/assets/svg/icon_edit.svg"
            alt=""
          />
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !isShowPerson }" ref="textBox">
            <div ref="spanBox">
              <span
                class="name_item tagBox"
                v-for="item in lableList"
                :key="item.id"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="btn" ref="tags" v-show="lableList.length > 10">
            <img
              class="icon"
              v-if="!isShowPerson"
              @click="isShowPerson = true"
              src="@/assets/svg/icon_down.svg"
              alt=""
            />
            <img
              class="icon"
              v-else
              @click="isShowPerson = false"
              src="@/assets/svg/icon_up.svg"
              alt=""
            />
          </div>
        </div>
      </div> -->

      <div class="item" v-for="(item, index) in sopList" :key="index">
        <div class="item_top">
          <p>{{ item.userNames }}</p>
          <div>
            定时推送：<span>{{ item.createTimeStr }}</span>
          </div>
        </div>
        <div
          class="customer_card"
          v-for="(item, index) in item.sopContentVOS"
          :key="index"
        >
          <div class="card_li">
            <span class="lable">内容名称</span>
            <div class="rightInfo">{{ item.name }}</div>
          </div>
          <div class="card_li">
            <span class="lable">推送时间</span>
            <div class="rightInfo">{{ item.createTime }}</div>
          </div>
          <div class="card_li">
            <span class="lable">推送内容</span>
            <div class="rightInfo">{{ item.promptTimeMsg }}</div>
          </div>
          <div class="card_li">
            <div class="rightInfo">
              <div class="list">
                <div
                  class="li"
                  v-for="(item, index) in item.sopContentAttachmentVOS"
                  :key="index"
                >
                  <p class="left"></p>
                  <div class="right">
                    <div class="leftImg">
                      <img :src="item.cover ? item.cover : null" alt="" />
                    </div>
                    <div class="rightText">
                      <p class="title">{{ item.title }}</p>
                      <span>{{ item.url }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 群标签 -->
    <van-popup
      v-model="chooseCusSign"
      round
      class="choose-warp-popup"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="_top">
        <div class="fill"></div>
        <div class="title">群标签</div>
        <img
          class="icon setting_btn"
          v-if="!isShowPerson"
          @click="chooseCusSign = false"
          src="@/assets/svg/icon_close.svg"
          alt=""
        />
      </div>
      <div class="_center">
        <div class="_item" v-for="(item, index) in cusSignList" :key="index">
          <div class="group-title">{{ item.name }}</div>
          <div class="group-label">
            <div
              class="label-item"
              :class="{
                active:
                  highLightArr.findIndex((item) => {
                    return item.tagid == signItm.tagid;
                  }) > -1,
              }"
              @click="clickSign(signItm, signItm.tagid)"
              v-for="(signItm, signIdx) in item.children"
              :key="`${index} - ${signIdx}`"
            >
              {{ signItm.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="_bottom">
        <div class="_button save" @click="saveCus">保存</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { formatDate, _throttle } from "../../utils/tool";
import { TitleBack } from "@/components";
import { sop_groupSopList } from "@/api/sop";
import {
  grouptag_list,
  groupUserTag_list,
  groupUserTag_addGroupTag,
  group_getGroupDetail,
  group_getGroupTodayDetail,
  group_getGroupUserPage,
} from "@/api/customer";
export default {
  components: {
    TitleBack,
  },
  data() {
    return {
      avatarList: [],
      datatTite: {},
      chooseCusSign: false, // 选择客户标签
      cusSignList: [],
      highLightArr: [],
      notice: "",
      flag: false,
      isShowPerson: false,
      lableList: [],
      groupName: {},
      group: this.$route.query.grouid,
      sopList: [],
      list: [
        {
          groupNames: "这是规则名称哈哈哈哈哈哈哈",
          createTimeStr: "2021.11.22",
          sopContentVOS: [
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "内容名称",
              sopContentAttachmentVOS: [
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "10.png",
                  title: "27.35kb",
                },
                {
                  url: "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  cover:
                    "https://jizhoucrm-sit.oss-cn-hangzhou.aliyuncs.com/verbalTrick/article/image/20211203141020464156/DA32DCC6CE6545C4925A3C62D19A7844.png",
                  title: "说明xx",
                },
              ],
            },
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "内容xxx",
              sopContentVOS: [],
            },
          ],
        },
        {
          groupNames: "这是规则哈",
          createTimeStr: "2021.11.22",
          sopContentVOS: [
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "推送内容",
              sopContentAttachmentVOS: [
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "2.png",
                  title: "说明xx",
                },
                {
                  cover:
                    "https://img0.baidu.com/it/u=2935589232,1367006843&fm=26&fmt=auto",
                  url: "1.png",
                  title: "说明xx",
                },
              ],
            },
            {
              name: "提醒发送素材文件",
              createTime: "2021.11.22",
              promptTimeMsg: "hweeeeow",
              sopContentAttachmentVOS: [],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    // this.$route.query.id = "wryPDZEQAA05rnMG9OBERqw7eABOW5sQ";
    this.getTagList();
    this.getSopList();
    this.groupList();
    this.getGroupDetailtop();
    this.getGroupDetail();
  },
  methods: {
    formatDate,
    clickSign(list, index) {
      var result = this.highLightArr.findIndex((item) => {
        return item.tagid == list.tagid;
      });
      console.log(result);
      if (result > -1) {
        this.highLightArr.forEach((item, index) => {
          if (item.tagid == list.tagid) {
            this.highLightArr.splice(index, 1);
          } else {
          }
        });
      } else {
        this.highLightArr.push(list);
      }

      let obj = {};

      let peon = this.highLightArr.reduce((cur, next) => {
        obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      this.datatupList = peon;
    },
    // 保存客户标签
    saveCus() {
      let obj = {};
      let peon = this.highLightArr.reduce((cur, next) => {
        obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      // console.log(peon);
      this.highLightArr = peon;

      // console.log(this.highLightArr, "点击保存---获取标签内容222");
      this.chooseCusSign = false;
      this.groupListadd();
    },
    groupListadd() {
      let id = this.$route.query.id
        ? this.$route.query.id
        : this.$store.getters.chatId;
      let data = {
        chatId: id,
        tagidList: this.highLightArr,
      };
      groupUserTag_addGroupTag(data).then((res) => {
        if (res.result) {
          this.groupList();
        }
      });
    },
    // 群标签
    groupList() {
      let id = this.$route.query.id
        ? this.$route.query.id
        : this.$store.getters.chatId;
      groupUserTag_list(id).then((res) => {
        console.log(res);
        console.log("获取 群标签接口+ " + res);
        if (res.result) {
          let obj = {};
          let peon = res.data.reduce((cur, next) => {
            obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
            return cur;
          }, []);
          this.lableList = peon;
          this.lableList.forEach((item) => {
            this.highLightArr.push(item);
          });
        }
      });
    },
    //客户标签列表
    getTagList() {
      this.highLightArr = [];
      this.namelabutArr = [];
      grouptag_list().then((res) => {
        console.log(res);
        console.log("获取客户标签接口+ " + res);
        if (res.result) {
          this.cusSignList = res.data;
          let allChildTag = res.data.map((item) => {
            return item.children;
          });
          this.namelabutArr = [].concat.apply([], allChildTag);
        }
      });
    },
    getStrLen(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length; //先把中文替换成两个字节的英文，在计算长度
    },
    getGroupDetail() {
      let id = this.$route.query.id
        ? this.$route.query.id
        : this.$store.getters.chatId;
      group_getGroupDetail(id).then((res) => {
        console.log("获取群公告2222222222222222222222");
        console.log(res);
        console.log("获取头部信息接口 getGroupDetail " + res);
        if (res.result) {
          this.notice = res.data.notice;
          // this.notice = "必要的财政支出规模，优化地方政府专项债券发行使用管理，开展全域无隐性债务试点，建立常态化财政资金直达机制并扩大范围，优化和落实减税降费政策，预计全年新增减税降费达到1万亿元。二是支持科技自立自强，加大对基础研究的支持，改革完善中央财政科研经费管理，打好关键核心技术攻坚战，启动支持专精特新中小企业高质量发展奖补政策，推动优化和稳定产业链供应链。";
          let len = this.getStrLen(this.notice);
          // console.log(len);
          if (len > 97) {
            this.flag = true;
          } else {
            this.flag = false;
          }
          // console.log(this.flag)
          // this.finished = true;
          this.groupId = res.data.id;
          if (res.data.owmer == res.data.userId) {
            console.log("我是群主");
            this.isOwmer = true;
            this.getSopList();
          }
          this.datatTite.name = res.data.name;
          this.datatTite.usersum = res.data.usersum;
          this.datatTite.owmerName = res.data.owmerName;
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            "yyyy-MM-dd hh:mm:ss"
          );
          this.datatTite.joinsum = res.data.joinsum;
          this.datatTite.leavesum = res.data.leavesum;
        }
      });
    },
    getGroupDetailtop() {
      let id = this.$route.query.id
        ? this.$route.query.id
        : this.$store.getters.chatId;
      group_getGroupTodayDetail(id).then((res) => {
        console.log(res);
        console.log("获取top接口 getGroupDetailtop + " + res);
        console.log(res.data);
        if (res.result) {
          this.groupName = res.data.group;
          let owmer = res.data.group.owmer;
          // 判断是不是群主
          console.log("判断是不是群主 " + this.$store.getters.userId);
          console.log(sessionStorage.getItem("userId"));
          console.log(owmer);
          if (owmer == this.$store.getters.userId) {
            this.isGroup = true;
          } else {
            this.isGroup = false;
          }
          console.log("groupName 123");
          console.log(this.groupName);
          this.groupNameList = res.data.groupUserEntityList;
          let imgArr = [];
          this.groupNameList.forEach((item) => {
            console.log(item.avatar);
            imgArr.push(item.avatar);
          });
          this.avatarList.push({
            imgList: imgArr,
          });
        }
      });
    },
    toGroupAnnouncement() {
      // if (this.flag) {
      this.$router.push({
        path: "/groupAnnouncement",
        query: {
          createTime: this.groupName.createTime,
          notice: this.groupName.notice,
          owmerName: this.groupName.owmerName,
          avatar: this.groupName.avatar,
        },
      });
      // }
    },
    getSopList() {
      console.log("sop111111111111111111111111111111");
      //获取sop规则列表
      // this.group = 1;
      sop_groupSopList(this.group).then((res) => {
        console.log("获取sop数据");
        console.log(res);
        if (res.result) {
          let list = res.data;
          this.sopList = list;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

@main: #4168f6;
@white: #fff;
@fontMain: #3c4353;
@fontSub2: #838a9d;
@bdColor: #d9dae4;
@dashedColor: #f0f2f7;
/deep/.van-overlay {
  // background-color: rgba(0, 0, 0, 0.3);
}
/deep/ .van-loading {
  // top: 50%;
  // left: 50%;
}
.b_content {
  .over-hidden {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .btn {
    margin: 10px 0;
    color: #4168f6;
    text-align: center;
    height: 40px;
    position: relative;
    img {
      width: 32px;
      height: 32px;
      position: absolute;
      left: 50%;
      bottom: 0;
    }
    // .van-icon {
    //   vertical-align: -11%;
    //   width: 28px;
    //   height: 28px;
    // }
  }
  .tagBox {
    display: inline-block;
    background: #fafbff;
    border-radius: 8px;
    border: 2px solid #d9dae4;
    color: #838a9d;
    padding: 14px 16px;
    margin-right: 16px;
    margin-top: 16px;
    position: relative;
  }
}
.group_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  /deep/.title {
    font-size: 32px;
  }
  .content {
    padding: 24px;
    .item {
      .item_top {
        margin: 20px 0;

        p {
          width: 320px;
          font-size: 32px;
          line-height: 48px;
          font-weight: 600;
          color: #262626;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .customer_card {
        border: 2px solid #e6e6e6;
        border-radius: 10px;
        padding: 24px;
        margin-bottom: 20px;
        .card_li {
          display: flex;
          font-size: 24px;
          padding: 10px 0;
          .lable {
            width: 120px;
            color: #b3b3b3;
            margin-right: 20px;
          }
          .rightInfo {
            flex: 1;
            color: #262626;

            .list {
              .li {
                display: flex;
                // justify-content: center;
                // align-items: center;
                // margin-bottom: 10px;
                // background: #f7f7f7;
                // border-radius: 4px;
                .left {
                  width: 120px;
                  margin-right: 20px;
                }
                .right {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 10px;
                  background: #f7f7f7;
                  border-radius: 4px;
                  .leftImg {
                    width: 80px;
                    height: 80px;
                    margin: 20px;
                    img {
                      width: 80px;
                      height: 80px;
                      object-fit: cover;
                    }
                  }
                  .rightText {
                    width: 360px;
                    .title {
                      word-break: break-all;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      font-size: 18px;
                    }
                    span {
                      display: inline-block;
                      color: #262626;
                      width: 360px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    p {
                      color: #b3b3b3;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .lable_box {
      width: 100%;
      min-height: 120px;
      background: @white;
      // margin-top: 24px;
      padding: 40px 0;
      .lable_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 0 24px;
        position: relative;

        .edit {
          width: 40px;
          height: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
        .lable_title {
          font-size: 28px;
          line-height: 40px;
          font-weight: bold;
          color: @fontMain;
          padding-left: 20px;
          position: relative;
          // &::before {
          //   content: "";
          //   width: 8px;
          //   height: 28px;
          //   background: @main;
          //   position: absolute;
          //   left: 0;
          //   top: 50%;
          //   transform: translateY(-50%);
          // }
        }
        .icon {
          width: 32px;
          height: 32px;
          // margin-left: 12px;
          display: inline-block;
          vertical-align: middle;
        }
        // .setting_btn {
        //   width: 124px;
        //   height: 68px;
        //   font-size: 28px;
        //   line-height: 66px;
        //   border: 1px solid @bdColor;
        //   border-radius: 8px;
        //   color: @fontSub2;
        //   padding-left: 52px;
        //   position: relative;
        //   cursor: pointer;
        //   &::before {
        //     content: "";
        //     width: 32px;
        //     height: 32px;
        //     background: url("../../assets/images/edit.png") no-repeat;
        //     background-size: 100%;
        //     position: absolute;
        //     left: 16px;
        //     top: 50%;
        //     transform: translateY(-50%);
        //   }
        // }
        .redact_btn {
          width: 124px;
          height: 68px;
          font-size: 28px;
          line-height: 66px;
          border: 1px solid @bdColor;
          border-radius: 8px;
          color: @fontSub2;
          padding-left: 52px;
          position: relative;
          cursor: pointer;
          &::before {
            content: "";
            width: 32px;
            height: 32px;
            background: url("../../assets/images/icon_setting.png") no-repeat;
            background-size: 100%;
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .lable_list {
        .btn {
          color: #4168f6;
          text-align: right;
          font-size: 28px;
          .van-icon {
            vertical-align: -11%;
            width: 28px;
            height: 28px;
          }
        }
        .lable_li {
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
          // overflow: hidden;
          display: flex;
          // height: 300px;
          // overflow: hidden;
          flex-wrap: wrap;
          .name_item {
            margin-right: 16px;
            margin-top: 16px;
            padding: 0 16px;
            height: 68px;
            line-height: 68px;
            background: #fafbff;
            border-radius: 8px;
            border: 1px solid #d9dae4;
            font-weight: 400;
            color: #838a9d;
            font-size: 28px;
            position: relative;

            img {
              width: 28px;
              width: 28px;
              position: absolute;
              right: -15px;
              top: -12px;
              background: #fff;
            }
          }
        }
      }
    }

    .row {
      width: 100%;
      position: relative;
      // padding-bottom: 20px;
      // margin-bottom: 32px;
      &.tag {
        padding-bottom: 40px;
        .tit {
          // margin-bottom: 32px;
        }
      }
      &.no .item_box .item .val {
        color: @fontSub1;
      }
      // &:last-child {
      //   margin-bottom: 0;
      //   &::after {
      //     display: none;
      //   }
      // }
      &::after {
        content: "";
        width: 100%;
        height: 1px; /* no */
        background: @lineColor;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .edit {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .groupTxt {
        margin-bottom: 20px;
        // font-size: 24px;
        // line-height: 32px;
        // color: @total;
      }
      .notice {
        position: relative;
        font-size: 28px;
        line-height: 36px;
        p {
          margin-right: 20px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .icon {
          width: 32px;
          line-height: 36px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .tag_wrap {
        width: 100%;
        max-height: 152px;
        // overflow: hidden;
        &.more {
          max-height: inherit;
          overflow: inherit;
        }
      }
      .tag_box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .tag {
          color: @fontSub1;
          line-height: 52px;
          height: 52px;
          background: @navBg;
          border-radius: 8px;
          padding: 0 16px;
          margin-right: 16px;
          margin-bottom: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .more {
        text-align: center;
        .icon {
          display: inline-block;
          width: 36px;
          height: 36px;
        }
      }
      .item_box {
        width: 100%;
        .item {
          display: flex;
          align-items: center;
          font-size: 28px;
          line-height: 36px;
          color: @fontMain;
          padding: 32px 0;
          &.lh {
            align-items: flex-start;
          }
          .label {
            width: 180px;
            font-weight: bold;
          }
          .val {
            width: calc(100% - 180px);
            text-align: right;
            // display: flex;
            // justify-content: right;
            .input {
              width: 100%;
              height: 100%;
              border: none;
              text-align: right;
            }
            .icon_select {
              // display: flex;
              // align-items: center;
              display: inline-block;
              span {
                display: inline-block;
                vertical-align: middle;
              }
              .icon {
                width: 32px;
                height: 32px;
                // margin-left: 12px;
                display: inline-block;
                vertical-align: middle;
              }
            }
            .placeholder {
              color: @total;
            }
          }
        }
      }
    }
  }
  .choose-warp-popup {
    border-radius: 16px 16px 0 0;
    ._top {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 24px;
      justify-content: space-between;
      height: 88px;
      background: #fafbff;
      border-radius: 16px 16px 0 0;
      line-height: 88px;
      text-align: center;
      font-size: 28px;
      color: #3c4353;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
      position: relative;
      border-bottom: 1px solid #f0f2f7;
      .title {
        font-weight: 600;
      }
      .fill {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 32px;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
    ._center {
      box-sizing: border-box;
      padding: 24px;
      // min-height: 740px;
      height: 78%;
      overflow: auto;
      ._item {
        // display: flex;
        // align-items: flex-start;
        margin-bottom: 12px;
        .group-title {
          height: 68px;
          line-height: 68px;
          width: 420px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28px;
          color: #3c4353;
          font-weight: 600;
          margin-right: 32px;
        }
        .group-label {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .label-item {
            box-sizing: border-box;
            margin-bottom: 16px;
            height: 68px;
            background: #fafbff;
            border: 1px solid #d9dae4;
            border-radius: 8px;
            line-height: 68px;
            padding: 0 16px;
            font-size: 28px;
            color: #838a9d;
            font-weight: 400;
            margin-right: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            //  width: 120px;
            max-width: 260px;
            overflow: hidden;
            text-align: center;
            &.active {
              background: #4168f6;
              border: 1px solid !important;
              color: #fff;
            }
          }
        }
      }
    }
    ._bottom {
      padding: 0 24px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ._button {
        width: calc((100% - 24px) / 1);
        height: 80px;
        box-sizing: border-box;
        line-height: 80px;
        font-size: 28px;
        text-align: center;
        border-radius: 8px;
        font-weight: 400;
        &.cancel {
          border: 1px solid #4168f6;
          color: #4168f6;
        }
        &.save {
          color: #fff;
          background: #4168f6;
        }
      }
    }
  }
}
</style>