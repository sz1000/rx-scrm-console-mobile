<template>
  <div>
    <div>
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">群列表</span>
      </div>
      <div class="searchInput">
        <input
          type="text"
          class="input"
          v-model="inputValue"
          placeholder="请输入群名称"
        />
        <span class="searchBtn" @click="inquire">查询</span>
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
      >
        <ul>
          <li
            v-for="(item, index) in dataList"
            :key="index"
            @click="clickChatid(item.chatId)"
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
              <!-- <p class="name_tite">
                当日退群：<span class="num">{{ item.leavesum }}</span>
              </p> -->
            </div>
          </li>
        </ul>
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
      finished: true,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      dataList: [],
    };
  },
  created() {
    this.getGroupList();
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
    // 获取输入群名称
    // groupName(value) {
    //   // console.log(value);
    //   // this.inputValue = value;
    //   // this.getGroupList();
    // },
    // 点击查询
    inquire() {
      console.log(this.inputValue);
      this.getGroupList();
    },
    onLoad() {
      // console.log(1)
      this.page++;
      this.getGroupList();
    },
    // 请求群列表
    getGroupList() {
      this.$network
        .get("/customer-service/group/list", {
          page: this.page,
          limit: this.pageSize,
          name: this.inputValue,
          owmer: "",
          createTimeSta: "",
          createTimeEnd: "",
        })
        .then((res) => {
          console.log(res);
          let tempList = res.data.groupEntityPage.records;
          tempList.forEach((item) => {
            item.createTime = item.createTime
              ? formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss")
              : "-";
          });
          this.dataList = tempList;
        });
    },
    //获取群id跳转
    clickChatid(id) {
      // console.log(id);
      // this.$router.push({ path: "/groupportrait", query: { id: id } });
      // this.$router.push({
      //   name: "groupportrait",
      //   params: {
      //     name: "groupportrait",
      //     id: id,
      //   },
      // });
    },
  },
};
</script>

<style lang="less" scoped>
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