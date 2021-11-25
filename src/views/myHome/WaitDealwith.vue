<template>
  <div class="wait_warp">
    <div class="nav_tab">
      <span :class="{'avtive' : tab == 1}" @click="tabClick(1)">朋友圈(10)</span>
      <span :class="{'avtive' : tab == 2}" @click="tabClick(2)">群发(10)</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
    }
  },
  methods: {
    tabClick(v) {
      this.tab = v
    },
  },
}
</script>
<style lang="less" scoped>
.wait_warp {
  .nav_tab {
    .avtive {
      color: #4168f6;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 1px;
        width: 100%;
        background: #4168f6;
      }
    }
  }
}
</style>