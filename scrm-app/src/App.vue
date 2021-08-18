<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  padding: 0;
  width: 100%;
  height: 100%;
  background: #f6f7f9;
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
//解决ios双击才能选中
.el-scrollbar {
  > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}
</style>

