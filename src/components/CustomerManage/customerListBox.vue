<template>
  <ul class="customer-list-box">
    <!-- <li v-for="i in listData" :key="i.id"> -->
    <li class="list-item">
      <div class="list-item-left">
        <img src="@/assets/svg/avatar_default.svg" alt="">
      </div>
      <ul class="list-item-right">
        <li class="right-top">
          <div class="name-box">
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
          <span></span>
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
  .list-item {
    
  }
}
</style>