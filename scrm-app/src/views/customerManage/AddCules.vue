<template>
  <div class="addWarp">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">新增线索</span>
    </div>
    <div class="addForm">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.AddCules {
  .addWarp {
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
    .addForm {
      background: #fff;
      padding: 24px;
      height: 100%;
    }
  }
}
</style>