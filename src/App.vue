<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { hideQwOptionMenu } from './utils/tool'

export default {
  created() {
    if (window.location.pathname != '/materialTemplate') {
      hideQwOptionMenu()
    }
  }
}
</script>
<style lang="less">
@supports (bottom: env(safe-area-inset-bottom)){
    #app {
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
}
#app {
  padding: 0;
  width: 750px;
  height: 100%;
  margin: 0 auto;
  background: #f6f7f9;
}
// .body {
//   overflow: visible !important;
//   overflow-x: visible !important;
//   overflow-y: visible !important;
// }
//解决ios双击才能选中
.el-scrollbar {
  > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}
.el-select-dropdown {
  .el-select-dropdown__item {
    font-size: 28px;
    line-height: 60px;
    height: 60px;
  }
}
.el-cascader__dropdown {
  .el-cascader-panel {
    .el-cascader-menu {
      min-width: 200px;
      .el-cascader-node {
        font-size: 24px !important;
        line-height: 60px;
        height: 60px;
      }
    }
  }
}
/deep/.popper-select-class {
  z-index: 3000 !important;
}
</style>
