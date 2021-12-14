<template>
  <ul class="customer-list-box">
    <!-- <li v-for="i in listData" :key="i.id"> -->
    <li class="list-item">
      <div class="list-item-left">
        <img src="@/assets/svg/avatar_default.svg" alt="">
      </div>
      <ul class="list-item-right">
        <li class="right-top">
          <div class="name-box one-line">
            <h3>黄少天</h3>
            <span>@企业</span>
          </div>
          <span class="time">2021.10.13</span>
        </li>
        <li class="right-middle">
          <span>沟通洽谈</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
          <span>活动推广</span>
        </li>
        <li class="right-bottom">
          <span>13580809191</span>
          <span>负责人：叶修</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'customerListBox',
  props: {
    type: {
      default: 0,
    },
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  inject: ['goDetail'],
  methods: {

  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.customer-list-box {
  height: 100%;
  .list-item {
    display: flex;
    padding: 32px;
    position: relative;
    &::after {
      content: '';
      height: 2px;
      background-color: @lineColor;
      position: absolute;
      left: 32px;
      right: 32px;
      bottom: 0;
      transform: scaleY(.5);
    }
    .list-item-left {
      width: 80px;
      min-width: 80px;
      height: 80px;
      margin-right: 24px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list-item-right {
      .right-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
        .name-box {
          max-width: 85%;
          h3 {
            display: inline-block;
            vertical-align: text-bottom;
            color: @fontSub3;
            font-size: 32px;
            font-weight: 600;
          }
          span {
            display: inline-block;
            vertical-align: text-bottom;
            margin-left: 10px;
          }
        }
        .time {
          min-width: 130px;
          text-align: right;
          color: @fontSub1;
          font-size: 24px;
        }
      }
      .right-middle {
        height: 62px;
        padding: 12px 0 0;
        overflow: hidden;
        span {
          display: inline-block;
          padding: 4px 12px;
          margin-bottom: 12px;
          border: 2px solid @lineColor;
          color: @fontSub1;
          font-size: 22px;
          &:not(:first-child) {
            margin-left: 16px;
          }
        }
      }
      .right-bottom {
        span {
          color: @fontSub1;
          font-size: 24px;
          &:not(:first-child) {
            margin-left: 24px;
          }
        }
      }
    }
  }
}
</style>