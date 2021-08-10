<template>
  <div class="clueWarp">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">
        <span :class="{'active':tabClick==1}"
              class="mycule"
              @click="tabClick=1">我的客户</span>
        <span :class="{'active':tabClick==2}"
              class="mycule"
              @click="tabClick=2">客户公海</span>
      </div>
      <span class="addBtn"
            @click="addCules">
        <img src="../../images/icon_add@2x.png"
             alt="">
        新增
      </span>
    </div>
    <div class="searchInput">
      <input type="text"
             class="input"
             v-model="inputValue"
             placeholder="请输入客户简称/公司/手机号">
      <span class="searchBtn"
            @click="inquire">查询</span>
    </div>
    <div class="cardWarp">
      <div class="topInfo"
           v-for="(item,index) in cardList"
           :key="index">
        <div class="customInfo">
          <div class="iconName">
            <span>客户简称:</span>
            <span>{{customName}}</span>
          </div>
          <div class="detailBtn"
               @click="deleteCard(item,index)">
            <van-icon name="delete-o" />
            删除
          </div>
        </div>
        <div class="detailInfo"
             @click="goDetail(item,index)">
          <div class="left">
            <div class="rowStyle">
              <span>邮箱:</span>
              <span>{{item.email}}</span>
            </div>
            <div class="rowStyle">
              <span>邮箱:</span>
              <span>{{item.email}}</span>
            </div>
            <div class="rowStyle">
              <span>邮箱:</span>
              <span>{{item.email}}</span>
            </div>
          </div>
          <div class="right">
            <div class="rowStyle">
              <span>手机号码:</span>
              <span>{{item.email}}</span>
            </div>
            <div class="rowStyle">
              <span>公司名称:</span>
              <span>{{item.email}}</span>
            </div>
            <div class="rowStyle">
              <span>所属行业:</span>
              <span>{{item.email}}</span>
            </div>
          </div>
        </div>
        <div class="tjry">
          <div class="box">
            <span class="label">添加人员:</span>
            <span class="value">添加人员</span>
          </div>
          <div class="box1">
            <span class="label">添加时间:</span>
            <span class="value">添加人员</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _throttle } from '../../utils/tool'
export default {
  data() {
    return {
      tabClick: 1,
      inputValue: '',
      cardList: [
        { name: '小鱼儿', email: '1234567890@qq.com' },
        { name: '小鱼儿', email: '1234567890@qq.com' },
        { name: '小鱼儿', email: '1234567890@qq.com' },
        { name: '小鱼儿', email: '1234567890@qq.com' },
      ],
      customName: '大熊科技',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    addCules() {
      // console.log(this.tabClick)
      this.$router.push('addCustomer')
    },
    inquire: _throttle(function () {
      // console.log(this.inputValue)
    }, 2000),
    deleteCard(item, index) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除？',
          className: 'deleteBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    goDetail(item, index) {
      console.log(this.tabClick)
      if (this.tabClick == 1) {
        this.$router.push('customDetail')
      } else {
        this.$router.push('customerSeas')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.MyCustomer {
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
            content: '';
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
          height: 88px;
          border-bottom: 1px solid #f0f2f7;
          .iconName {
            // display: flex;
            font-size: 28px;
            span:nth-child(1) {
              color: #838a9d;
            }
            span:nth-child(2) {
              color: #3c4353;
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