<template>
  <div class="warp-box">
    <div>
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">群列表</span>
      </div>
      <div class="searchInput">
        <el-input
          type="text"
          v-model="inputValue"
          prefix-icon="el-icon-search"
          placeholder="请输入群名称"
          @focus="inquire"
        />
        <!-- <span class="searchBtn" @click="inquire">查询</span> -->
      </div>
    </div>
    <!-- 列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="20"
        :immediate-check="false"
      >
        <!-- @click="toFun(item.chatId)" -->
        <div
          class="list"
          v-for="(item, index) in dataList"
          :key="index"
          @click="clickChatid(item)"
        >
          <div class="left">
            <div
              class="group_img"
              :class="{
                len5:
                  item.groupUserList &&
                  item.groupUserList.length > 4 &&
                  item.groupUserList.length < 7,
              }"
            >
              <div
                class="img_box"
                :class="{
                  w33: item.groupUserList && item.groupUserList.length > 4,
                }"
                v-for="(url, i) in item.groupUserList.slice(0, 9)"
                :key="i"
              >
                <img class="img" :src="url.avatar | $setAvatar" alt="" />
              </div>
            </div>
            <!-- <img class="avatar" :src="form.avatar | $setAvatar" alt=""> -->
            <!-- <div
              class="leftImgs"
            >
              <img src="" alt="" />
              <div
                class="group_img"
                :class="{
                  len5:
                    item.groupUserList &&
                    item.groupUserList.length > 4 &&
                    item.groupUserList.length < 7,
                }"
              >
                <div
                  class="img_box"
                  :class="{ w33: item.groupUserList && item.groupUserList.length > 4  }"
                  v-for="(url, i) in item.groupUserList"
                  :key="i"
                >
                  <img class="img" :src="url" alt="" />
                </div>
              </div>
            </div> -->
          </div>
          <div class="right">
            <div class="rightTitle">
              <p class="title">
                {{ item.name }}(<span>{{ item.usersum }}</span
                >)
              </p>
            </div>
            <div class="rightInfo">
              <div class="groupTime">
                <span>建群时间：</span>
                <span>{{ item.createTime }}</span>
              </div>
              <div class="name">
                <img :src="item.avatar ? item.avatar : ''" alt="" />
                <span>{{ item.owmerName }}</span
                >-<span class="deptName">{{ item.deptName }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <ul>
          <li
            v-for="(item, index) in dataList"
            :key="index"
            @click="clickChatid(item)"
          >
            <div class="lsits">
              <p class="name_tite">
                群名称： <span class="num">{{ item.name || "暂无" }}</span>
              </p>
              <p class="name_tite">
                群主：<span class="num">{{ item.owmerName || "暂无" }}</span>
              </p>
              <p class="name_tite">
                创建时间：<span class="num">{{
                  item.createTime || "暂无"
                }}</span>
              </p>
            </div>
            <div class="ling"></div>
            <div class="flex">
              <p class="name_tite">
                群人数：<span class="num">{{ item.usersum || "暂无" }}</span>
              </p>
              <p class="name_tite ml-205">
                当日入群：<span class="num">{{ item.joinsum || "暂无" }}</span>
              </p>
            </div>
          </li>
        </ul> -->
      </van-list>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../utils/tool.js";
export default {
  data() {
    return {
      inputValue: "",
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      dataList: [],
      total: 0, //总共的数据条数
      urlArr: [],
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  created() {
    this.page = 1;
    this.getGroupList();
    console.log(this.$route.query.userId, "pppppolk");
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.push("/home");
    },
    // 获取输入群名称
    // groupName(value) {
    //   // console.log(value);
    //   // this.inputValue = value;
    //   // this.getGroupList();
    // },
    // 点击查询
    inquire() {
      // this.page = 1;
      // this.getGroupList();
      // this.dataList = [];
      this.$network
        .get("/customer-service/group/list", {
          page: 1,
          // limit: this.pageSize,
          name: this.inputValue,
          owmer: "",
          createTimeSta: "",
          createTimeEnd: "",
          // flag:"2"
        })
        .then((res) => {
          console.log("9999999999999999999");
          console.log(res);
          this.total = res.data.groupEntityPage.total;
          this.loading = false;
          this.dataList = res.data.groupEntityPage.records;
          console.log("9999999999999999999");
          console.log(this.dataList);
          let tempList = res.data.groupEntityPage.records;
          if (tempList == null || tempList.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          this.dataList = tempList;
          // tempList.forEach((item) => {
          //   item.createTime = item.createTime
          //     ? formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss")
          //     : "-";
          // });
          console.log(res.data.groupEntityPage.records, "11");
        });
    },
    onLoad() {
      // console.log(1)
      // this.page++;
      this.getGroupList();
    },
    // 请求群列表
    getGroupList() {
      // this.dataList = [];
      this.$network
        .get("/customer-service/group/list", {
          page: this.page,
          limit: this.pageSize,
          name: this.inputValue,
          owmer: "",
          createTimeSta: "",
          createTimeEnd: "",
          flag: "2",
        })
        .then((res) => {
          console.log(res);
          let tempList = res.data.groupEntityPage.records;
          this.loading = false;

          if (this.page == 1) {
            this.dataList = [];
          }
          this.page++;
          this.total = res.data.groupEntityPage.total;

          this.dataList = this.dataList.concat(tempList);
          this.dataList.forEach((item) => {
            item.createTime = item.createTime
              ? formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss")
              : "-";
          });
          // 如果列表数据条数>=总条数，不再触发滚动加载
          if (this.dataList.length >= this.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        });
    },
    // unique(arr) {
    //   const res = new Map();
    //   return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    // },
    //获取群id跳转
    clickChatid(id) {
      // console.log(id.chatId);
      // console.log(id.id);
      this.$router.push({
        path: "./groupListDetails",
        query: { id: id.chatId, grouid: id.id },
      });
      // this.$router.push({
      //   name: "groupListDetails",
      //   params: {
      //     name: "groupListDetails",
      //     id: id,
      //   },
      // });
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
.warp-box {
  height: 100%;
  background: #fff;
  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 164px;
    position: relative;
    &::before {
      content: "";
      width: 100%;
      height: 1px; /* no */
      background: @lineColor;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: scaleY(0.5);
    }
    .left {
      // flex: 1;
      width: 80px;
      height: 80px;
      margin: 42px 32px;
      .group_img {
        width: 80px;
        height: 80px;
        background: @navBg;
        margin-right: 24px;
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: center;
        align-items: center;
        &.len5 {
          padding: calc(80px / 6) 0;
        }
        .img_box {
          // width: 33.33%;
          // height: calc(80px / 3);
          // background: chocolate;
          border: 1px solid @white; /*no*/
          text-align: center;
          &:first-child:nth-last-child(2),
          &:first-child:nth-last-child(2) ~ .img_box {
            width: calc(80px / 2);
            height: calc(80px / 2);
          }
          &:first-child:nth-last-child(3),
          &:first-child:nth-last-child(3) ~ .img_box {
            width: calc(80px / 2);
            height: calc(80px / 2);
          }
          &:first-child:nth-last-child(4),
          &:first-child:nth-last-child(4) ~ .img_box {
            width: calc(80px / 2);
            height: calc(80px / 2);
          }
          // &:first-child:nth-last-child(5),&:first-child:nth-last-child(5) ~ .img_box{
          //     width: calc(80px / 3);
          //     height: calc(80px / 3);
          // }
          // &:first-child:nth-last-child(6),&:first-child:nth-last-child(6) ~ .img_box{
          //     width: calc(80px / 3);
          //     height: calc(80px / 3);
          // }
          &.w33 {
            width: calc(80px / 3);
            height: calc(80px / 3);
          }
          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .right {
      flex: 1;
      .rightTitle {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 48px;
        line-height: 48px;
        .title {
          width: 375px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 32px;
          color: #262626;
          font-weight: 600;
        }
        .sop {
          margin-right: 30px;
          position: relative;
          span {
            margin-right: 30px;
            color: #262626;
          }
          .icon {
            width: 32px;
            height: 32px;
            position: absolute;
            right: 0;
            top: 24px;
            transform: translateY(-50%);
          }
        }
      }
      .rightInfo {
        display: flex;
        font-size: 24px;
        line-height: 32px;
        color: #b3b3b3;
        .groupTime {
          display: flex;
          justify-content: left;
          align-items: center;
        }
        .name {
          display: flex;
          flex: 1;
          margin-right: 30px;
          justify-content: right;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .deptName {
            width: 85px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
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
.searchInput {
  background: #fff;
  padding: 24px 24px;
  .input {
    width: 582px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid #d9dae4;
    font-size: 28px;
    padding-left: 24px;
    box-sizing: border-box;
  }
  .searchBtn {
    display: inline-block;
    width: 104px;
    height: 80px;
    background: #4168f6;
    border-radius: 8px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 80px;
    margin-left: 16px;
    cursor: default;
  }
}
.name_tite {
  font-size: 28px;
  color: #838a9d;
  letter-spacing: 0;
  font-weight: 400;
  margin-bottom: 24px;
}
.lsits {
  padding: 24px;
  background: #fff;
  margin-top: 24px;
}
.flex {
  display: flex;
  // justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  height: 87px;
  line-height: 87px;
  //   border-top: 1px solid #f0f2f7;
}
.ling {
  height: 1px;
  background: #f0f2f7;
}
.num {
  font-size: 28px;
  color: #3c4353;
  font-weight: 400;
}
.ml-205 {
  margin-left: 205px;
}
</style>