<template>
  <div class="warp-portrait">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">群列表</span>
    </div>
    <div class="portrait-box">
      <div class="flex">
        <div class="portrait_img">
          <!-- <img src="../../images/groupico.png" alt="" /> -->
          <div class="flag">群</div>
        </div>
        <div>
          <p class="portrait_tite">
            {{ datatTite.name || "暂无" }}
          </p>
          <p class="portrait_message">
            <span class="grom_name"
              >群主：{{ datatTite.owmerName || "暂无" }}</span
            >
            <span class="ml24 in_block"
              >共 {{ datatTite.usersum || "0" }} 位群成员</span
            >
          </p>
        </div>
      </div>
      <div class="group_num">
        <div>
          <p class="num">{{ datatTite.usersum || "0" }}</p>
          <p class="num_tite">总人数</p>
        </div>
        <div>
          <p class="num">{{ datatTite.joinsum || "0" }}</p>
          <p class="num_tite">今日新增</p>
        </div>
        <!-- <div>
          <p class="num">{{ datatTite.leavesum }}</p>
          <p class="num_tite">今日退群</p>
        </div> -->
      </div>
    </div>
    <!-- 群标签 -->

    <!-- 群sop -->
    <div class="sop_box">
      <div class="sop_top">
        <div class="sop_title">群SOP</div>
        <div class="setting_btn" @click="settingSopFun">设置</div>
      </div>
      <div class="sop_list">
        <div class="sop_li" v-for="item in sopList" :key="item.id">
          <div class="item">
            <div class="label">SOP名称：</div>
            <div class="val">{{ item.ruleName }}</div>
          </div>
          <div class="item">
            <div class="label">推送规则：</div>
            <div class="val">
              {{ item.promptRule ? "周期推送" : "定时推送" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->

    <div>
      <div class="tabBtn flex">
        <div @click="myclue(1)">
          <div :class="{ active: tabClick == 1 }" class="mycule">群动态</div>
          <!-- <p :class="{ activeline: tabClick == 1 }"></p> -->
        </div>
        <div @click="myclue(2)">
          <div :class="{ active: tabClick == 2 }" class="mycule">群内成员</div>
          <!-- <p :class="{ activeline: tabClick == 2 }"></p> -->
        </div>
      </div>
      <div v-if="tabClick == 1">
        <!-- <div class="allText">全部</div> -->
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item color="#4168F6" type="danger ">
              <div class="recordBox">
                <div class="descTxt">创建</div>
                <div class="inLineTwo">
                  {{ groupName.owmerName }}:创建了群聊
                </div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ groupName.owmerName }}</div>
                  <span class="time_right">
                    {{
                      formatDate(groupName.createTime, "yyyy-MM-dd hh:mm:ss")
                    }}</span
                  >
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in groupNameList"
              :key="index"
              color="#4168F6"
              type="danger "
            >
              <div class="recordBox">
                <div class="descTxt">加入群聊</div>
                <div class="inLineTwo">
                  {{ item.name }}通过
                  <span v-if="item.joinScene == 1">直接邀请入群</span>
                  <span v-if="item.joinScene == 2">邀请链接入群</span>
                  <span v-if="item.joinScene != 1 && item.joinScene != 2"
                    >扫描群二维码入群</span
                  >方式加入了群聊
                </div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ item.invitorName }}</div>
                  <span class="time_right">
                    {{ formatDate(item.joinTime, "yyyy-MM-dd hh:mm:ss") }}</span
                  >
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <p class="text_ta">没有更多了</p>
        </div>
      </div>
      <div v-if="tabClick == 2">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul>
            <!--  -->
            <li
              class="lsits list-warp"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div class="flex">
                <div class="portrait_img">
                  <img v-if="item.avatar != ''" :src="item.avatar" alt="" />
                  <div class="flag" v-if="item.avatar == ''">
                    {{ item.name.substr(0, 1) }}
                  </div>
                </div>
                <div>
                  <p class="portrait_tite">
                    {{ item.name }}
                    <span class="firm" v-if="item.customerType == 2"
                      >@{{ item.corpName }}</span
                    >
                    <span class="weix" v-if="item.customerType == 1"
                      >@微信</span
                    >
                  </p>
                  <p class="portrait_message">
                    {{ item.type }}
                  </p>
                </div>
              </div>
              <div class="list-box">
                <p class="list_tite">
                  入群时间：<span class="num">{{ item.joinTime }}</span>
                </p>
                <p class="list_tite">
                  入群方式： <span class="num">{{ item.joinScene }}</span>
                </p>
                <p class="list_tite">
                  邀请员工： <span class="num">{{ item.invitorName }}</span>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
    <!-- <p class="no_more">没有更多</p> -->
    <van-overlay :show="show">
      <van-loading class="loding" type="spinner" color="#fff" size="24" />
    </van-overlay>
  </div>
</template>         
<script>
import { formatDate } from "../../utils/tool.js";

import { sop_groupSopList } from "@/api/sop";
export default {
  data() {
    return {
      groupNameList: [],
      groupName: {},
      tabClick: 1,
      channelList: [],
      show: true,
      loading: false,
      finished: false,
      refreshing: false,
      chatId: "",
      // 群信息
      datatTite: {
        name: "",
        usersum: "",
        createTime: "",
        owmerName: "",
        usersum: "",
        leavesum: "",
        joinsum: "",
        total: 0, //总共的数据条数
      },
      pageInfo: {
        page: 1,
        limit: 10,
      },
      // 群用户列表
      dataList: [],

      sopList: [], //群 sop 列表
      groupId: "",
      group: "",
      isOwmer: false, //是否群主
    };
  },
  created() {
    this.group = this.$route.query.grouid;
  },
  mounted() {
    setTimeout(() => {
      this.pageInfo.page = 1;
      this.getGroupDetailtop();
      this.getGroupDetail();

      this.getList();
    }, 3000);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatDate,
    onLoad() {
      console.log("屏幕滚动");

      this.pageInfo.page += 1;

      this.getList();
    },
    getSopList() {
      //获取sop规则列表
      sop_groupSopList(this.group).then((res) => {
        if (res.result) {
          let list = res.data;
          this.sopList = list;
        }
      });
    },
    settingSopFun() {
      //设置sop规则
      this.$router.push({
        path: "/settingSop",
        query: {
          id: this.group,
        },
      });
    },
    getGroupDetail() {
      this.$network
        .get("/customer-service/group/getGroupDetail", {
          chatId: this.$route.query.id,
        })
        .then((res) => {
          if (res.result) {
            this.show = false;
            // this.finished = true;
            this.groupId = res.data.id;
            if (res.data.owmer == res.data.userId) {
              console.log("我是群主");
              this.isOwmer = true;
              this.getSopList();
            }
          }
          //   this.getSopList(); //本地调试用
          // this.show = false;  //画页面用 2021/10/11
          this.datatTite.name = res.data.name;
          this.datatTite.usersum = res.data.usersum;
          this.datatTite.owmerName = res.data.owmerName;
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            "yyyy-MM-dd hh:mm:ss"
          );
          this.datatTite.joinsum = res.data.joinsum;
          this.datatTite.leavesum = res.data.leavesum;
        });
    },
    getGroupDetailtop() {
      this.$network
        .get("/customer-service/group/getGroupTodayDetail", {
          chatId: this.$route.query.id,
        })
        .then((res) => {
          this.groupName = res.data.group;
          this.groupNameList = res.data.groupUserEntityList;
          console.log(res.data.group, "---------");
        });
    },
    getList() {
      this.$network
        .get("/customer-service/group/getGroupUserPage", {
          chatId: this.$route.query.id,
          ...this.pageInfo,
        })
        .then((res) => {
          let tempList = res.data.data.records; //请求返回当页的列表
          this.loading = false;
          this.total = res.data.data.total;
          if (tempList == null || tempList.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }

          tempList.forEach((item) => {
            item.joinTime = item.joinTime
              ? formatDate(item.joinTime, "yyyy-MM-dd hh:mm:ss")
              : "-";
            item.type = item.type == "1" ? "企业成员" : "外部联系人";
            if (item.joinScene == "1") {
              item.joinScene = "直接邀请入群";
            } else if (item.joinScene == "2") {
              item.joinScene = "通过邀请链接入群";
            } else {
              item.joinScene = "通过扫描群二维码入群";
            }
            item.showName = item.showName ? item.showName : item.name;
            console.log(item.id);
          });
          // 将新数据与老数据进行合并
          let newSetArr = this.dataList.concat(tempList);
          // this.dataList = this.dataList.concat(tempList);
          this.dataList = this.unique(newSetArr);
          // this.dataList = tempList;
          console.log(this.dataList);
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.dataList.length >= this.total) {
            this.finished = true;
          }
        });
    },
    // onRefresh() {
    //   // 清空列表数据
    //   console.log("清空列表数据");
    // },
    // 去重一次
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    myclue(v) {
      console.log(v);
      this.tabClick = v;
      //   this.cardList = [];
      //   this.page = 1;
      //   this.inputValue = "";
      //   this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
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
.headerTitle {
  background: #fff;
  padding: 0 24px;
  font-weight: 600;
  display: flex;
  height: 87px;
  line-height: 87px;
  font-size: 28px;
  color: #3c4353;
  border-top: 1px solid #f0f2f7;
  border-bottom: 1px solid #f0f2f7;
  .backPage {
    width: 150px;
    cursor: default;
    .van-icon {
      vertical-align: -10%;
      width: 28px;
      height: 28px;
    }
  }
  .textTitle {
    flex: 1;
    display: inline-block;
    padding-left: 150px;
  }
}
.doing {
  width: 24px;
  height: 24px;
  background: #4168f6;
  border-radius: 50%;
}
.loding {
  top: 50%;
  left: 50%;
  transform: translate(-2%, -50%);
  // transform: translate(-50%, -50%);
}
.text_ta {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
  text-align: center;
  padding-bottom: 20px;
}
.warp-portrait {
  /* padding: 24px; */
  /* background: #838a9d; */
  .sop_box {
    width: 100%;
    min-height: 120px;
    background: @white;
    margin-top: 24px;
    padding-top: 24px;
    .sop_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      .sop_title {
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
        color: @fontMain;
        padding-left: 20px;
        position: relative;
        &::before {
          content: "";
          width: 8px;
          height: 28px;
          background: @main;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .setting_btn {
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
    .sop_list {
      width: 100%;
      .sop_li {
        width: 100%;
        position: relative;
        border-bottom: 1px dashed @dashedColor;
        padding: 24px;
        display: flex;
        &:last-child {
          border: none;
        }
        .item {
          width: calc(50% - 30px);
          display: flex;
          font-size: 28px;
          line-height: 40px;
          &:last-child {
            margin-left: 12px;
          }
          .label {
            color: @fontSub2;
            white-space: nowrap;
          }
          .val {
            color: @fontMain;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
  .tabBtn {
    justify-content: space-around;
    margin-top: 20px;
    height: 87px;
    line-height: 87px;
    background: #fff;
    border-bottom: 0.013333rem solid #f0f2f7;

    .mycule {
      // margin-right: 32px;
      font-size: 28px;
      color: #838a9d;
      letter-spacing: 0;
      font-weight: 500;
    }
    .active {
      //   width: 112px;
      //   text-align: center;
      color: #4168f6;
      position: relative;
      font-size: 28px;
      letter-spacing: 0;
      font-weight: 500;

      &::after {
        content: "";
        width: 112px;
        height: 4px;
        background: #4168f6;
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  .allText {
    color: #4168f6;
    margin-bottom: 16px;
  }
  .timeLine {
    padding: 30px 24px 0;
    background: #fff;
    .el-timeline {
      padding-left: 0 !important;
    }
    .recordBox {
      // width: 676px;
      min-height: 180px;
      background: rgba(65, 104, 246, 0.06);
      border-radius: 8px;
      color: #3c4353;
      padding: 16px;
      font-size: 28px;
      .inLine {
        display: flex;
        justify-content: space-between;
        .time_right {
          font-size: 28px;
          color: #838a9d;
        }
        img {
          width: 10px;
          height: 10px;
        }
      }
      .inLineTwo {
        margin-bottom: 16px;
        display: inline-block;
        word-break: normal;
        word-break: break-all;
        word-break: keep-all;
        word-break: break-word;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
        // overflow: hidden;
      }
      .inLineEnd {
        // text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
      }
      .descTxt {
        font-weight: 600;
        color: #3c4353;
        margin-bottom: 16px;
      }
    }
  }
}

.portrait-box {
  padding: 24px;
  background: #fff;
}
.portrait_img img {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  margin-right: 20px;
}
.portrait_tite {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #3c4353;
  font-weight: 500;
}
.portrait_message {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  color: #838a9d;
  font-weight: 400;
  margin-top: 16px;
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
}
/* 群数量 */
.group_num {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  width: 702px;
  height: 138px;
  background: rgba(65, 104, 246, 0.02);
  border: 1px solid #4168f6;
  border-radius: 4px;
  margin: 24px auto 0;
}
.num {
  font-size: 32px;
  color: #3c4353;
  text-align: center;
  font-weight: 600;
}
.num_tite {
  font-size: 24px;
  color: #838a9d;
  text-align: center;
  font-weight: 400;
}
/* 列表 */
.list-box {
  margin-top: 24px;
}
.list_tite {
  font-size: 28px;
  color: #838a9d;
  font-weight: 400;
  margin-bottom: 16px;
}
.list-warp {
  margin-bottom: 24px;
  // height: 1000px;
}
.lsits {
  padding: 34px;
  background: #fff;
}
.no_more {
  font-size: 24px;
  color: #c0c4cc;
  letter-spacing: 0;
  font-weight: 400;
  text-align: center;
  margin-top: 24px;
}
.num {
  font-size: 28px;
  color: #3c4353;
  font-weight: 400;
}
.ml24 {
  margin-left: 24px;
}
.firm {
  font-size: 24px;
  color: #ffb020;
  font-weight: 400;
}
.weix {
  font-size: 24px;
  color: #52bd94;
  font-weight: 400;
}
.flag {
  width: 88px;
  height: 88px;
  background: #4168f6;
  border-radius: 12px;
  text-align: center;
  line-height: 88px;
  color: #fff;
  font-size: 35px;
  margin-right: 20px;
}
.grom_name {
  width: 180px;
  /* color: #3c4353; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}
.in_block {
  display: inline-block;
}
</style>