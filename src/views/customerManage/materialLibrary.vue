<template>
  <div class="material_warp">
    <div>
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">从素材库选择</span>
      </div>
    
    </div>
       <div class="sc_warp">
           <div class="sc_tite" @click="titeClisk(0)" :class="[num == 0 ?'active': '']">文章</div>
           <div class="sc_tite" @click="titeClisk(1)" :class="[num == 1 ?'active': '']">文件</div>
           <div class="sc_tite" @click="titeClisk(2)" :class="[num == 2 ?'active': '']">海报</div>
       </div>
       <div>
         <p></p>
       </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
  num:0
    };
  },
  created() {
  
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
    titeClisk(i){
      console.log(i)
        this.num =i
    }
  },
};
</script>

<style lang="less" scoped>
.material_warp{
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
    cursor: default;
    .van-icon {
      vertical-align: -10%;
      width: 28px;
      height: 28px;
    }
  }
  .textTitle {
    flex: 1;
    display: inline-block;
    padding-left: 150px;
  }
}
.sc_warp{
  display: flex;
      justify-content: space-around;
      height: 88px;
      align-items: center;
  .sc_tite{
font-weight: 600;
color: #838A9D;
font-size: 28px;
  }
  .active{
  color: #4168F6;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid  #4168F6;
  height: 66px;
}
}
}



</style>