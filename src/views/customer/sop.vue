<template>
  <div class="group_wrap">
    <TitleBack title="SOP"></TitleBack>
    <div class="content">
      <!-- 群公告 -->
        <div class="row tag" @click="toGroupAnnouncement">
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
      <div class="item" v-for="(item, index) in sopList" :key="index">
        <div class="item_top">
          <p>{{ item.groupNames }}</p>
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
                      <img :src="item.cover" alt="" />
                    </div>
                    <div class="rightText">
                      <p>{{ item.title }}</p>
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
      datatTite:{},
      notice:'',
      flag:false,
      groupName: {
      },
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
    this.$route.query.id = "wryPDZEQAA05rnMG9OBERqw7eABOW5sQ";
    this.getSopList();
    this.getGroupDetailtop();
     this.getGroupDetail();
  },
  methods: {
    formatDate,
    getStrLen(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length; //先把中文替换成两个字节的英文，在计算长度
    },
    getGroupDetail() {
      group_getGroupDetail(this.$route.query.id).then((res) => {
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
      group_getGroupTodayDetail(this.$route.query.id).then((res) => {
        console.log(res);
        console.log("获取top接口 getGroupDetailtop + " + res);
        console.log(res.data);
        if (res.result) {
          this.groupName = res.data.group;
          let owmer = res.data.group.owmer;
          // 判断是不是群主
          console.log("判断是不是群主 " + this.$store.getters.userId);
          console.log(sessionStorage.getItem('userId'))
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
      console.log('asd')
      //获取sop规则列表
      this.group = 1;
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
.group_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  .content {
    padding: 24px;
    .item {
      .item_top {
        margin: 20px 0;

        p {
          font-size: 32px;
          line-height: 48px;
          font-weight: 600;
          color: #262626;
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
                      object-fit:cover;
                    }
                  }
                  .rightText {
                    width: 360px;
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
}
</style>