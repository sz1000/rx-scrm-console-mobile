<template>
  <div class="custom_warp">
    <div class="topInfo">
      <div class="customInfo">
        <div class="iconName">
          <div class="flag">鱼</div>
          <div class="nameSex">
            <span>{{name}}</span>
            <span>{{nameFrom}}</span>
            <img src="../../images/icon_female@2x.png"
                 alt="" />

          </div>
        </div>
        <div class="detailBtn">
          详情
          <van-icon name="arrow"
                    color="#4168F6" />
        </div>
      </div>
      <div class="detailInfo">
        <div class="left">
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
        </div>
        <div class="right">
          <div class="rowStyle">
            <span>手机号码:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>公司名称:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>所属行业:</span>
            <span>{{email}}</span>
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
    <div class="infoContent"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '客户资料详情',
      name: '小鱼儿',
      nameFrom: '@微信/企业',
      email: '1234567890@qq.com',
    }
  },
}
</script>
<style lang="less" scoped>
.custom_warp {
  .topInfo {
    height: 400px;
    background: #fff;
    padding: 25px 24px 0 24px;
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
        color: #4168f6;
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
  .infoContent {
    margin-top: 24px;
    min-height: 400px;
    background: #fff;
  }
}
</style>