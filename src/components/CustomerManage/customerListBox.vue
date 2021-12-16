<template>
  <div class="customer-list-box">
    <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="i in list" :key="i.id" class="list-item">
        <div class="list-item-left">
          <img :src="i.avatar | $setAvatar" alt="">
        </div>
        <ul class="list-item-right">
          <li class="right-top">
            <div class="name-box one-line">
              <h3>{{ i.name }}</h3>
              <span v-if="i.cropFullName" class="crop-name">@{{ i.cropFullName }}</span>
            </div>
            <span class="time">{{ i.createTime ? formatDate(i.createTime, 'yyyy-MM-dd') : '' }}</span>
          </li>
          <li class="right-middle">
            <span v-if="i.stage" :class="{first: i.stage == '沟通洽谈', second: i.stage == '合同签约', third: i.stage == '维护运营', fourth: i.stage == '暂停', fifth: i.stage == '终止'}">{{ i.stage }}</span>
            <span v-if="i.source">{{ i.source }}</span>
            <span v-if="i.customerType">{{ i.customerType }}</span>
          </li>
          <li class="right-bottom">
            <span v-if="i.phone">{{ i.phone }}</span>
            <span v-if="i.userNo">负责人：{{ i.userNo }}</span>
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
    customerType: {
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
      this.$toast.loading({
        message: '',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })

      this.loading = true

      let params = {
        page: this.page,
        limit: this.limit,
        type: this.customerType,
        ...this.form,
        searchParam: this.searchParam
      }

      getcluecustomerlist(params).then(res => {
        let { code, data, msg } = res

        this.$toast.clear()
        this.loading = false
        if (code == 'success') {
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
    goDetail(item, index) {
      // localStorage.setItem('customer', JSON.stringify(item))

      // if (this.type == 3) {
      //     this.$router.push({
      //     path: 'customDetail',
      //     query: { type: this.type, mylist: JSON.stringify(this.mylist) },
      //     })
      // } else if (this.type == 4) {
      //     this.$router.push({
      //     path: 'customerSeas',
      //     query: { type: this.type, alllist: JSON.stringify(this.alllist) },
      //     })
      // }
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
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
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
          max-width: 85%;
          h3 {
            display: inline-block;
            vertical-align: bottom;
            color: @fontSub3;
            font-size: 32px;
            font-weight: 600;
          }
          .crop-name {
            display: inline-block;
            vertical-align: bottom;
            margin-left: 10px;
            color: @yellow;
            font-size: 20px;
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