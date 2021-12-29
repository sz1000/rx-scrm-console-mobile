<template>
  <div class="customer-list-box">
    <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(i, index) in list" :key="index + i.clueCustomerNo" class="list-item pointer" @click="goDetail(i)">
        <div class="list-item-left">
          <img v-if="i.avatar" class="header-img" :src="i.avatar" alt="">
          <span v-else class="default-img">{{ i.customerCalled ? i.customerCalled.slice(0, 1) :  ''}}</span>
          <img v-if="i.isWcCus == 1 && i.externalType == 2" class="icon" src="../../assets/svg/icon_qiyeweixin.svg" alt="">
          <img v-if="i.isWcCus == 1 && i.externalType == 1" class="icon" src="../../assets/svg/icon_weixin.svg" alt="">
        </div>
        <ul class="list-item-right">
          <li class="right-top">
            <div class="name-box" :class="{'clues-name-box': customerType == '1' || customerType == '2'}">
              <h3 class="one-line">{{ i.customerCalled }}</h3>
              <span v-if="(i.customerName || i.cropFullName) && i.externalType != 0" class="crop-name one-line">@{{ i.customerName || i.cropFullName }}</span>
            </div>
            <span class="time" :class="{'clues-time': customerType == '1' || customerType == '2'}">
              {{ i.createTime ? formatDate(i.createTime, 'yyyy-MM-dd') : '' }}
              <span v-if="customerType == '1' || customerType == '2'">{{ i.createBy }}创建</span>
            </span>
          </li>
          <li class="right-middle">
            <span v-if="(customerType == '3' || customerType == '4' ) && i.stage" :class="{first: i.stage == '沟通洽谈', second: i.stage == '合同签约', third: i.stage == '维护运营', fourth: i.stage == '暂停', fifth: i.stage == '终止'}">{{ i.stage }}</span>
            <span v-if="i.source" :class="{first: customerType == '1' || customerType == '2'}">{{ i.source }}</span>
            <span v-if="(customerType == '1' || customerType == '2') && i.clueType">{{ i.clueType }}</span>
            <span v-if="(customerType == '3' || customerType == '4') && i.customerType">{{ i.customerType }}</span>
            <span v-show="i.customerTagNames && i.customerTagNames.length" v-for="(item, index) in i.customerTagNames" :key="index + item">{{ item }}</span>
          </li>
          <li v-if="customerType == '1' || customerType == '3'" class="right-bottom">
            <span v-if="i.phone">{{ i.phone }}</span>
            <span v-if="customerType == '1' && i.cropFullName">{{ i.cropFullName }}</span>
            <span v-if="customerType == '3' && i.userNo">负责人：{{ i.userNo }}</span>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>
<script>
import { getcluecustomerlist } from '@/api/customer'
import { throttle, formatDate } from '@/utils/tool'

export default {
  name: 'customerListBox',
  props: {
    customerType: {  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
      default: 0,
    },
    form: {
      default() {
        return {}
      }
    },
    searchParam: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageLoading: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 20,
      list: [],
    }
  },
  methods: {
    formatDate,
    initData() {
      Object.assign(this.$data, this.$options.data())
    },
    // 获取客户列表
    getList() {
      if(this.customerType == '3' && !throttle()) {
        return
      }

      if (this.page == 1) {
        this.pageLoading = false
      } else {
        this.pageLoading = true
      }

      this.loading = true

      let params = {
        page: this.page,
        limit: this.limit,
        type: this.customerType,
        ...this.form,
        searchParam: this.searchParam
      }

      getcluecustomerlist(params, this.pageLoading).then(res => {
        let { result, data, msg } = res

        this.loading = false
        if (result) {
          if (this.page == 1) {
            this.list = []
          }
          this.list = this.list.concat(data.iPage.records)
          this.page += 1
          this.finished = this.list.length >= data.iPage.total
        } else {
          this.$toast(msg)
        }
      })
    },
    onLoad() {
      if (this.page <= 1) {
        return
      }
      this.getList()
    },
    // 去往客户详情
    goDetail(item) {
      this.$router.push({
        path: '/customerManage/customDetail',
        query: { userNo: item.externalUseridIn, clueCustomerNo: item.clueCustomerNo},
      })
    },
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
      position: relative;
      .header-img, .default-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .default-img {
        display: block;
        line-height: 80px;
        color: @white;
        font-size: 28px;
        background-color: @main;
        text-align: center;
      }
      .icon {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .list-item-right {
      width: 85%;
      .right-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
        .name-box {
          display: flex;
          align-items: flex-end;
          max-width: calc(100% - 140px);
          h3 {
            max-width: 100%;
            color: @fontSub3;
            font-size: 32px;
            font-weight: 600;
          }
          .crop-name {
            margin-left: 10px;
            color: @yellow;
            font-size: 20px;
          }
        }
        .clues-name-box {
          max-width: calc(100% - 280px);
        }
        .time {
          min-width: 130px;
          text-align: right;
          color: @fontSub1;
          font-size: 24px;
        }
        .clues-time {
          min-width: 240px;
          color: @total;
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
          border-radius: 4px;
          color: @fontSub1;
          font-size: 22px;
          &:not(:first-child) {
            margin-left: 16px;
          }
        }
        .first {
          border-color: @main;
          color: @main;
          background: rgba(65, 104, 246, 0.06);
        }
        .second {
          border-color: @green;
          color: @green;
          background: rgba(54, 179, 158, 0.06);
        }
        .third {
          border-color: @main;
          color: @main;
          background: rgba(65, 104, 246, 0.06);
        }
        .fourth {
          border-color: @yellow2;
          color: @yellow2;
          background: rgba(251, 143, 40, 0.06);
        }
        .fifth {
          border-color: @red;
          color: @red;
          background: rgba(209, 67, 67, 0.06);
        }
      }
      .right-bottom {
        span {
          color: @fontSub1;
          font-size: 24px;
          &:first-child {
            margin-right: 24px;
          }
        }
      }
    }
  }
}
</style>