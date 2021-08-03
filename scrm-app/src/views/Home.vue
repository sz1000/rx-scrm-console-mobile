<template>
  <div class="home">
    <div class="home_txt">
      我是home页面
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.$network.get('/customer-service/group/list').then((res) => {})
  },
}
</script>
<style lang='less' >
.home_txt {
  width: 700px;
  height: 200px;
  background: red;
  font-size: 75px;
}
</style>

