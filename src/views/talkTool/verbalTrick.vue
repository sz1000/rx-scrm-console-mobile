<template>
  <div class="main-content">
    <!-- 话术 -->
    <verbal-trick-console v-if="showTemplate === 1"></verbal-trick-console>
    <!-- 素材 -->
    <material-template v-else @ifShowFooter="ifShowFooter" :isIndependent="2"></material-template>
    <!-- 底部导航 -->
    <div v-show="footerVisible" class="footer-nav">
      <div class="item" @click="showTemplate = 2">
        <img v-show="showTemplate == 1" :src="require('../../images/icon_material.png')" alt="" />
        <img v-show="showTemplate == 2" :src="require('../../images/icon_material_active.png')" alt="" />
        <span :class="{ active: showTemplate == 2 }">内容素材</span>
      </div>
      <div class="item" @click="showTemplate = 1">
        <img v-show="showTemplate == 1" :src="require('../../images/icon_huashu_active.png')" alt="" />
        <img v-show="showTemplate == 2" :src="require('../../images/icon_huashu.png')" alt="" />
        <span :class="{ active: showTemplate == 1 }">话术库</span>
      </div>
    </div>
  </div>
</template>
<script>
import VerbalTrickConsole from './verbalTrickConsole'
import MaterialTemplate from './materialTemplate'

export default {
  components: {
    MaterialTemplate,
    VerbalTrickConsole
  },
  data() {
    return {
      showTemplate: 2, // 1: 话术，2: 素材
      footerVisible: true
    }
  },
  created() {
    this.getComeFrom()
  },
  methods: {
    // 判断是否是从转载公众号返回的
    getComeFrom() {
      const { comeFrom } = this.$route.query

      if (comeFrom) {
        this.showTemplate = comeFrom
      }
    },
    ifShowFooter(data) {
      this.footerVisible = data
    }
  },
}
</script>

<style scoped lang="less">
.main-content {
  height: 100%;
  .footer-nav {
    display: flex;
    width: 10rem;
    height: 100px;
    // box-shadow: 0 0 10px 0 #ccc;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .item {
      flex: 1;
      font-size: 0;
      text-align: center;
      img {
        width: 40px;
        height: 40px;
        margin: 12px auto 4px;
      }
      span {
        font-size: 20px;
        color: #a2a5b4;
      }
      .active {
        color: #4168f6;
      }
    }
  }
}
</style>