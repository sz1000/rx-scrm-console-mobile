<template>
  <div class="dynamics_box">
    <div class="type_box">
      <!-- <div
        class="type"
        @click="navClickFun(index)"
        :class="{ cur: activeIndex == index }"
        v-for="(item, index) in navList"
        :key="index"
      >
        {{ item }}
      </div> -->
    </div>
    <div class="time_list">
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="li" v-for="(item, index) in dataList" :key="index">
          <!-- <div class="li"> -->
          <div class="userIcon">
            <img :src="item.avatar" alt="" />
          </div>
          <!-- item.externalType==1等于客户跳转客户画像页面 -->
          <div
            class="userInfo"
            @click="item.externalType && toCustomerPage(item)"
          >
            <div class="topInfo">
              <span class="txt groupName">{{ item.name }}</span>
              <span
                class="txt type"
                :class="[
                  getColor(item.admintype, item.type, item.externalType),
                  { corporName: item.corpName },
                ]"
                >{{ getForm(item.admintype, item.type, item.externalType)
                }}{{ item.corpName || item.customerName }}</span
              ><span
                class="txt form"
                :class="[
                  getColor(item.admintype, item.type, item.externalType),
                ]"
                >{{
                  getType(item.admintype, item.type, item.externalType)
                }}</span
              >
            </div>

            <div class="groupType">
              <span class="grouptime">{{ item.joinTime }}</span>
              <div class="status">
                <span class="methods" v-if="item.joinScene == 1"
                  >直接邀请入群</span
                >
                <span class="methods" v-if="item.joinScene == 2"
                  >邀请链接入群</span
                >
                <span
                  class="methods"
                  v-if="item.joinScene != 1 && item.joinScene != 2"
                  >扫描群二维码入群</span
                >
              </div>
            </div>
          </div>
          <div class="link" v-if="item.externalType">
            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { _throttle } from "@/utils/tool";
import { formatDate } from "../../utils/tool.js";
import {
  grouptag_list,
  groupUserTag_list,
  groupUserTag_addGroupTag,
  group_getGroupDetail,
  group_getGroupTodayDetail,
  group_getGroupUserPage,
  group_getMobileGroupUserlist,
} from "@/api/customer";
export default {
  name: "Dynamics",
  props: {
    id: {
      type: String,
      default: "",
    },
    did: {
      //负责人Id
      type: String,
      default: "",
    },
  },
  data() {
    return {
      /**
     *  type: "1",//员工
        admintype: 0,//群主
        externalType: 1,// 1客户  2企业客户
     */
      staffArray: [], //员工 新数组
      enterpriseArray: [], //企业客户 新数组
      customerArray: [], //客户 新数组
      leaderArray: [], //群主
      arr: [
        {
          name: "企业客户",
          type: "2",
          admintype: 0,
          externalType: "2",
        },
        {
          name: "员工",
          type: "1",
          admintype: 0,
          externalType: null,
        },
        {
          name: "员工",
          type: "1",
          admintype: 0,
          externalType: null,
        },
        {
          name: "企业客户",
          type: "2",
          admintype: 0,
          externalType: "2",
        },
        {
          name: "客户",
          type: "2",
          admintype: 0,
          externalType: "1",
        },
      ],
      finished: false,
      navList: ["全部", "群主", "员工", "客户", "企业客户"],
      dataList: [],
      list: [],
      activeIndex: 0,
      loading: false,
    };
  },
  computed: {},
  mounted() {
    // this.$route.query.id = "wryPDZEQAA05rnMG9OBERqw7eABOW5sQ";
    this.getList();
  },
  methods: {
    toCustomerPage(val) {
      console.log(val)
      this.$router.push({
        path: '/customerManage/customDetail',
        query: { userNo: val.userid},
      });
    },
    toGroupDetail(val) {
      console.log(val);
    },
    /**
     *  type: "1",//员工
        admintype: 0,//群主
        externalType: 1,// 1客户  2企业客户
     */
    getTypeInfo(type, admintype, externalType) {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      //查找符合条件值并存入新数组
      for (let i in this.dataList) {
        if (this.dataList[i].type == 1) {
          //员工
          this.staffArray[a++] = this.dataList[i];
        }
        if (this.dataList[i].externalType == 2) {
          //企业客户
          this.enterpriseArray[b++] = this.dataList[i];
        }
        if (this.dataList[i].externalType == 1) {
          //客户
          this.customerArray[c++] = this.dataList[i];
        }
        if (this.dataList[i].admintype == 1) {
          //群主
          this.leaderArray[d++] = this.dataList[i];
        }
      }
    },
    formatDate,
    navClickFun(index) {
      this.activeIndex = index;
      if (index == 1) {
        //群主
        this.dataList = this.leaderArray;
      } else if (index == 2) {
        this.dataList = this.staffArray;
        //员工
      } else if (index == 3) {
        this.dataList = this.customerArray;
        //客户
      } else if (index == 4) {
        this.dataList = this.enterpriseArray;
        //企业客户
      } else {
        this.getList();
      }
    },
    // getClass(val) {
    //   let active = "";
    //   if (val == "企业成员") {
    //     active = "red";
    //   } else if (val == "外部联系人") {
    //     active = "yellow";
    //   } else {
    //     active = "green";
    //   }
    //   return active;
    // },
    getColor(admintype, type, externalType) {
      this.getTypeInfo(admintype, type, externalType);
      let color = "";
      if (admintype == 1) {
        //群主
        color = "red";
      } else if (type == 1) {
        //员工
        color = "green";
      } else if (Number(externalType) == 2) {
        //企业客户
        color = "yellow";
      } else if (Number(externalType) == 1) {
        //微信
        color = "bule";
      } else {
        color = "";
      }
      return color;
    },
    // getColor(admintype, type, externalType) {
    //   let color = "";
    //   if (admintype == 1) {
    //     //群主
    //     color = "red";
    //   } else if (admintype != 1 && type == 1) {
    //     //员工
    //     color = "green";
    //   } else if (admintype != 1 && type == 2 && Number(externalType) == 2) {
    //     //企业微信
    //     color = "yellow";
    //   } else if (admintype != 1 && type == 2 && Number(externalType) == 1) {
    //     //微信
    //     color = "bule";
    //   } else {
    //     color = "";
    //   }
    //   return color;
    // },
    getForm(admintype, type, externalType) {
      let status = "";
      if (Number(externalType) == 1) {
        status = "@微信";
      } else if (Number(externalType) == 2) {
        status = "@";
      }
      return status;
    },
    // getForm(admintype, type, externalType) {
    //   let status = "";
    //   if (admintype != 1 && type == 2 && Number(externalType) == 1) {
    //     status = "@微信";
    //   } else if (admintype != 1 && type == 2 && Number(externalType) == 2) {
    //     status = "@";
    //   }
    //   return status;
    // },
    /**
     *  <div class="alt" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 1">@微信</div>
        <div class="alt yellow" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 2">@{{item.customerName || item.corpName}}</div>
        <div class="tag red" v-if="item.admintype == 1">群主</div>
        <div class="tag" v-if="item.admintype != 1 && item.type == 1">员工</div>
        <div class="tag green" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 1">客户</div>
        <div class="tag yellow" v-if="item.admintype != 1 && item.type == 2 && Number(item.externalType) == 2">企业客户</div>
      * 
      */
    getType(admintype, type, externalType) {
      let status = "";
      if (admintype == 1) {
        status = "群主";
      } else if (type == 1) {
        status = "员工";
      } else if (Number(externalType) == 1) {
        status = "客户";
      } else if (Number(externalType) == 2) {
        status = "企业客户";
      } else {
        status = "null";
      }
      return status;
    },
    // getType(admintype, type, externalType) {
    //   let status = "";
    //   if (admintype == 1) {
    //     status = "群主";
    //   } else if (admintype != 1 && type == 1) {
    //     status = "员工";
    //   } else if (admintype != 1 && type == 2 && Number(externalType) == 1) {
    //     status = "客户";
    //   }
    //   else if (admintype != 1 && type == 2 && Number(externalType) == 2) {
    //     status = "企业客户";
    //   }else {
    //     status=""
    //   }
    //   return status;
    // },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    getList() {
      let id = this.$route.query.id ? this.$route.query.id : this.$store.getters.chatId
      let obj = {
        chatId: id,
        ...this.pageInfo,
      };
      // group_getMobileGroupUserlist
      // group_getGroupUserPage
      group_getMobileGroupUserlist(id).then((res) => {
        console.log(res);
        console.log("获取接口 getList + " + res);

        if (res.result) {
          // let tempList = res.data.data.records; //请求返回当页的列表
          //  this.total = res.data.data.total;
          let tempList = res.data.allList;
          this.total = res.data.dataCount.total;
          // this.loading = false;
          this.dataList = tempList;
          if (tempList == null || tempList.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }

          let arr = this.dataList.sort(function (a, b) {
            console.log(a);
            console.log(128900000);
            console.log(b);
            return b.admintype - a.admintype;
          });
          console.log(arr);
          console.log(128900000);
          this.dataList = arr;

          if (this.dataList.length >= this.total) {
            this.finished = true;
          }
        }
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dynamics_box {
  width: 100%;
  padding-bottom: 90px;
  .type_box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    .type {
      height: 52px;
      color: @fontSub1;
      font-size: 24px;
      line-height: 50px;
      padding: 0 26px;
      border: 1px solid @navBg; /*no*/
      background: @navBg;
      border-radius: 26px;
      margin-right: 24px;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      &.cur {
        background: @white;
        border-color: @main;
        color: @main;
      }
      &.dot::before {
        content: "";
        width: 16px;
        height: 16px;
        background: @red;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: -8px;
      }
    }
  }
  .time_list {
    width: 100%;
    .li {
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
      .link {
        width: 40px;
        margin-right: 30px;
        position: relative;
        .icon {
          width: 40px;
          height: 40px;
          // margin-left: 12px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .userInfo {
        flex: 1;

        .topInfo {
          display: flex;
          justify-content: flex-start;
          // align-items: center;
          padding: 8px 0;
          // line-height: 2;
line-height: 1.5;
          span {
            color: #262626;
            font-size: 28px;
          }
          .txt {
            margin-right: 10px;
          }
          .groupName {
            font-weight: 600;
            max-width: 210px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .corporName {
            // flex: 1;
            max-width: 210px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .red {
            color: #ff0000;
          }
          .bule {
            color: #36b39e;
          }
          .green {
            color: #4168f6;
          }
          .yellow {
            color: #fb8f28;
          }
          .form {
            height: 32px;
            line-height: 32px;
            margin: 6px 0;
            border: 1px solid;
            font-size: 24px;
            padding: 0 16px;
            border-radius: 26px;
          }
        }
        .groupType {
          display: flex;
          justify-content: center;
          align-items: center;
          .grouptime {
            flex: 1;
            color: #b3b3b3;
          }
          .status {
            flex: 1;
            margin-right: 20px;
            color: #b3b3b3;
          }
        }

        p {
          color: #b3b3b3;
          font-size: 24px;
        }
      }
    }
  }
}
</style>