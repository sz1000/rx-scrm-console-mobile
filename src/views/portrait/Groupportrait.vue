<template>
  <div class="warp-portrait">
    <div class="portrait-box">
      <div class="flex">
        <div class="portrait_img">
          <!-- <img src="../../images/groupico.png" alt="" /> -->
          <div class="flag">群</div>
        </div>
        <div>
          <p class="portrait_tite">
            {{ datatTite.name || "暂无" }}
            <span>({{ datatTite.usersum }})</span>
          </p>
          <p class="portrait_message">
            <span class="grom_name">
              群主：{{ datatTite.owmerName || "暂无" }}</span
            >
            <span class="ml24"
              >建群时间 ：{{ datatTite.createTime || "暂无" }}</span
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
    <!-- 列表 -->
    <div>
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
                  <span class="firm" v-if="item.customerType == 0">@企业</span>
                  <span class="weix" v-if="item.customerType == 1">@微信</span>
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
    <!-- <p class="no_more">没有更多</p> -->
  </div>
</template>         
<script>
import { formatDate } from "../../utils/tool.js";
import commonFun from "../../utils/commonToken";
export default {
  data() {
    return {
      loading: false,
      finished: true,
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
      },
      pageInfo: {
        page: 1,
        limit: 20,
      },
      // 群用户列表
      dataList: [],
    };
  },
  created() {
    // alert(localStorage.getItem("chatId"), "获取chatid");
    // commonFun.getWxAppid();
    // this.getGroupDetail();
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.$route.query.id + "----id--");
      this.getGroupDetail();
      this.getList();
    }, 3000);
  },
  methods: {
    onLoad() {
      this.page++;
      this.getList();
    },
    getGroupDetail() {
      this.$network
        .get("/customer-service/group/getGroupDetail", {
          // chatId: this.$route.query.id,
          chatId: "wrY-gRDAAALApfvGUiZiPu09NtjwCyGw",
          // chatId: localStorage.getItem("chatId"),
        })
        .then((res) => {
          console.log(res);
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
    getList() {
      this.$network
        .get("/customer-service/group/getGroupUserPage", {
          // chatId: this.$route.query.id,
          chatId: "wrY-gRDAAALApfvGUiZiPu09NtjwCyGw",
          // wrY-gRDAAA0w-s-nmhpGiOpbpDQvHCvQ
          // chatId: localStorage.getItem("chatId"),
          ...this.pageInfo,
        })
        .then((res) => {
          let tempList = res.data.data.records;
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
          });
          this.dataList = tempList;
          // this.total = res.data.data.total;
        });
    },
  },
};
</script>
<style scoped>
.warp-portrait {
  /* padding: 24px; */
  /* background: #838a9d; */
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
  margin-top: 24px;
}
.lsits {
  padding: 24px;
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
  width: 150px;
  /* color: #3c4353; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>