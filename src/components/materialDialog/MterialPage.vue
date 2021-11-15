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

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
      searchInput: '',
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
}
</style>