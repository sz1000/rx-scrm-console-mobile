<template>
  <div class="clueWarp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">线索</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">
        <span
          :class="{ active: tabClick == 1 }"
          class="mycule"
          @click="myclue((tabClick = 1))"
          >我的线索</span
        >
        <span
          :class="{ active: tabClick == 2 }"
          class="mycule"
          @click="myclue((tabClick = 2))"
          >线索公海</span
        >
      </div>
      <span class="addBtn" @click="addCules">
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span>
    </div>
    <div class="searchInput">
      <input
        type="text"
        class="input"
        v-model="inputValue"
        placeholder="请输入姓名/公司/手机号"
      />
      <span class="searchBtn" @click="inquire">查询</span>
    </div>
    <div class="cardWarp">
      <div class="topInfo" v-for="(item, index) in cardList" :key="index">
        <div class="customInfo">
          <div class="iconName">
            <!-- <div class="flag">{{ item.avatar }}</div> -->
            <img :src="item.avatar" alt="" class="flag" />
            <div class="nameSex">
              <span>{{ item.name }}</span>
              <!-- <span>{{item.nameFrom}}</span> -->
              <img src="../../images/icon_female@2x.png" alt="" />
            </div>
          </div>
          <!-- <div class="detailBtn" @click="deleteCard(item, index)">
            <van-icon name="delete-o" />
            删除
          </div> -->
        </div>
        <div class="detailInfo" @click="goDetail(item, index)">
          <div class="left">
            <div class="rowStyle">
              <span>邮箱:</span>
              <span>{{ item.email }}</span>
            </div>
            <div class="rowStyle">
              <span>来源:</span>
              <span>{{ item.source }}</span>
            </div>
            <div class="rowStyle">
              <span>职务:</span>
              <span>{{ item.position }}</span>
            </div>
          </div>
          <div class="right">
            <div class="rowStyle">
              <span>手机号码:</span>
              <span>{{ item.phone }}</span>
            </div>
            <div class="rowStyle">
              <span>公司名称:</span>
              <span>{{ item.cropFullName }}</span>
            </div>
            <div class="rowStyle">
              <span>所属行业:</span>
              <span>{{ item.cropSubIndustry }}</span>
            </div>
          </div>
        </div>
        <div class="tjry">
          <div class="box">
            <span class="label">添加人员:</span>
            <span class="value">{{ item.createBy }}</span>
          </div>
          <div class="box1">
            <span class="label">添加时间:</span>
            <span class="value">{{ item.createTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _throttle } from "../../utils/tool";
export default {
  data() {
    return {
      tabClick: 1,
      inputValue: "",
      cardList: [],
    };
  },
  watch: {
    inputValue(val) {
      // console.log(val)
      if (val == "") {
        this.getData();
      }
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.tabClick);
      this.$network
        .get("/customer-service/m/cluecustomer/getcluecustomerlist", {
          page: this.page,
          type: this.tabClick,
        })
        .then((res) => {
          // this.cardList = res.data;
          let rows = res.data.iPage.records; //请求返回当页的列表
          this.loading = false;
          this.total = res.data.iPage.total;

          if (rows == null || rows.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          // 将新数据与老数据进行合并
          // this.cardList = this.cardList.concat(rows)
          this.cardList = rows;
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.cardList.length >= this.total) {
            this.finished = true;
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    //新增
    addCules() {
      // console.log(this.tabClick)
      localStorage.setItem("type", this.tabClick);
      this.$router.push("addCules");
    },

    //列表页面
    myclue() {
      console.log(this.tabClick);
      this.cardList = [];
      this.inputValue = "";
      this.getData();
    },
    inquire: _throttle(function () {
      this.$network
        .get("/customer-service/m/cluecustomer/getcluecustomerlist", {
          page: 1,
          type: this.tabClick,
          allname: this.inputValue,
        })
        .then((res) => {
          // this.cardList = res.data;
          let rows = res.data.iPage.records; //请求返回当页的列表
          this.loading = false;
          this.total = res.data.iPage.total;
          // 将新数据与老数据进行合并
          // this.cardList = this.cardList.concat(rows)
          this.cardList = rows;
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.cardList.length >= this.total) {
            this.finished = true;
          }
        });
    }, 2000),
    deleteCard(item, index) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "删除后将不可恢复，是否确认删除？",
          className: "deleteBtn",
          confirmButtonText: "是",
          cancelButtonText: "否",
          messageAlign: "left",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    goDetail(item, index) {
      console.log(this.item);
      localStorage.setItem("detail", JSON.stringify(item));
      if (this.tabClick == 1) {
        this.$router.push({ name: "detailCules", params: { list: item } });
        // this.$router.push("detailCules");
      } else {
        this.$router.push("CluesSeas");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Clues {
  .clueWarp {
    height: 100%;
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
        padding-left: 120px;
      }
    }
    .tabMenu {
      background: #fff;
      padding: 0 24px;
      box-sizing: border-box;
      height: 115px;
      font-size: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f2f7;
      span {
        display: inline-block;
      }
      .addBtn {
        width: 124px;
        height: 68px;
        background: #ffffff;
        border-radius: 6px;
        border: 2px solid #d9dae4;
        text-align: center;
        line-height: 68px;
        img {
          display: inline-block;
          width: 28px;
          height: 28px;
          vertical-align: -4%;
        }
      }
      .tabBtn {
        .mycule {
          margin-right: 32px;
        }
        .active {
          color: #4168f6;
          position: relative;
          &::after {
            content: "";
            width: 112px;
            height: 4px;
            background: #4168f6;
            position: absolute;
            bottom: -40px;
            left: 0;
          }
        }
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
    .cardWarp {
      .topInfo {
        margin-top: 24px;
        height: 400px;
        background: #fff;
        padding: 24px 24px 0;
        .customInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconName {
            display: flex;
            .flag {
              width: 88px;
              height: 88px;
              background: #4168f6;
              border-radius: 12px;
              text-align: center;
              line-height: 88px;
              color: #fff;
              font-size: 35px;
            }
            .nameSex {
              margin-left: 16px;
              span:nth-child(1) {
                font-size: 28px;
                font-weight: 600;
              }
              span:nth-child(2) {
                font-size: 24px;
                color: #ffb020;
              }
              span {
                display: inline-block;
              }
              img {
                margin-top: 21px;
                width: 28px;
                height: 28px;
              }
            }
          }
          .detailBtn {
            font-size: 28px;
            color: #838a9d;
            .van-icon {
              vertical-align: -11%;
              width: 28px;
              height: 28px;
            }
          }
        }
        .detailInfo {
          display: flex;
          margin-top: 21px;
          .left,
          .right {
            width: 50%;
            .rowStyle {
              line-height: 40px;
              font-size: 28px;
              margin-bottom: 24px;
              display: flex;
              span {
                display: inline-block;
              }
              span:nth-child(1) {
                width: 84px;
                color: #838a9d;
                overflow: hidden;
              }
              span:nth-child(2) {
                flex: 1;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #3c4353;
                font-weight: 400;
              }
            }
          }
          .right {
            margin-left: 19px;
            .rowStyle {
              span:nth-child(1) {
                width: 140px;
              }
            }
          }
        }
        .tjry {
          height: 87px;
          border-top: 1px solid #f0f2f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 28px;
          span {
            display: inline-block;
          }
          .label {
            width: 140px;
            color: #838a9d;
          }
          .value {
            width: 140px;
            color: #3c4353;
          }
          .box {
            width: 50%;
          }
          .box1 {
            width: 50%;
            margin-left: 29px;
          }
        }
      }
    }
  }
}
</style>