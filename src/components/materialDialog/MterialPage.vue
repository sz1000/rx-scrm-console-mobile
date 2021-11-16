<template>
  <div class="material_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">从素材库选择</span>
    </div>
    <div class="tabBar">
      <span class="title" :class="{'active' : tab==1}" @click="selectTab(1)">文章</span>
      <span class="title" :class="{'active' : tab==2}" @click="selectTab(2)">文件</span>
      <span class="title" :class="{'active' : tab==3}" @click="selectTab(3)">海报</span>
    </div>
    <div class="search_input">
      <input type="text" v-model="searchInput" placeholder="请输入搜索条件" class="inputArea">
      <van-icon name="search" size="28" class="searchIcon" />
    </div>
    
    <div class="article_warp" v-show="this.tab == 1">
            <p class="tite_list">文章列表</p>
            <ul>
              <li class="article_list">
                   <img src="../../images/ditu.png" alt="" class="article_img">
                   <span class="artice_text">近期必入的经典这么多！中超赛事！近期必</span>
                   <van-radio-group v-model="radio">
                     <van-radio name="1"></van-radio>
                   </van-radio-group>
              </li>
            </ul>
    </div>
    <div class="article_warp" v-show="this.tab == 2">
            <p class="tite_list">文件列表</p>
            <ul>
              <li class="article_list">
                   <img src="../../images/ditu.png" alt="" class="article_img">
                   <span class="artice_text">近期必入的经典这么多！中超赛事！近期必</span>
                   <van-radio-group v-model="radio">
                     <van-radio name="1"></van-radio>
                   </van-radio-group>
              </li>
            </ul>
    </div>
    <div class="article_warp" v-show="this.tab == 3">
            <p class="tite_list">海报列表</p>
            <ul>
              <li class="article_list">
                   <img src="../../images/ditu.png" alt="" class="article_img">
                   <span class="artice_text">近期必入的经典这么多！中超赛事！近期必</span>
                   <van-radio-group v-model="radio">
                     <van-radio name="1"></van-radio>
                   </van-radio-group>
              </li>
            </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
      searchInput: '',
      radio:""
    }
  },
  methods: {
    goBack() {},
    selectTab(v) {
      this.tab = v
      this.searchInput = ''
      if (v == 1) {
        // this.getArticle()
      } else if (v == 2) {
        // this.getFile()
      } else {
        // this.getPoster()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.material_warp {
  padding-top: 87px;
  min-height: 100vh;
  background: #fff;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 750px;
    transform: translateX(-50%);
    cursor: pointer;
    background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    align-items: center;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    .backPage {
      .van-icon {
        vertical-align: -10%;
        width: 28px;
        height: 28px;
      }
    }
    .textTitle {
      // flex: 1;
      display: inline-block;
      padding-left: 193px;
    }
  }
  .tabBar {
    display: flex;
    justify-content: space-around;
    height: 88px;
    align-items: center;
    .title {
      font-size: 32px;
      font-weight: 500;
      color: #838a9d;
      line-height: 45px;
      position: relative;
    }
    .active {
      color: #4168f6;
      &::after {
        content: '';
        position: absolute;
        bottom: -21px;
        left: 0;
        height: 4px;
        width: 100%;
        background: #4168f6;
      }
    }
  }
  .search_input {
    margin-top: 32px;
    padding: 0 32px;
    position: relative;
    .inputArea {
      width: 686px;
      height: 68px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #d9dae4;
      padding-left: 32px;
      font-size: 28px;
    }
    .searchIcon {
      position: absolute;
      right: 64px;
      top: 10px;
    }
  }
  .article_warp{
    padding: 0 32px;
    .tite_list{
         
      font-size: 28px;
      font-weight: 550;
      color: #3C4353;
      margin: 34px 0;
    }
    .article_list{
      display: flex;
      align-items: center;
    height: 122px;
    border-bottom: 1px solid #F0F2F7;
       .article_img{
         width: 70px;
         height: 70px;
         border-radius: 4px;
       }
       .artice_text{
         font-weight: 400;
        color: #3C4353;
        font-size: 28px;
          margin-left: 16px;
      margin-right: 30px;
       }
    }
  }
}
</style>