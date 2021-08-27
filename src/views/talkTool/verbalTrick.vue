<template>
  <div>
    <div class="warp-bg">
      <!-- 标题 -->
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">快捷回复</span>
      </div>
      <!-- 头部 -->
      <div class="warp-box">
        <div class="head">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1" value="查看">
              <template #title>
                <div class="head-warp">
                  <van-icon name="bell" /><span class="sop-tite family-regular"
                    >[个人SOP]</span
                  >
                  <span class="message">1条消息待发送</span>
                </div>
              </template>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <!-- tabMenu -->
      <div class="tabMenu">
        <div class="tabBtn">
          <span
            :class="{ active: tabClick == 1 }"
            class="mycule"
            @click="myclue(1)"
            >个人话术</span
          >
          <span
            :class="{ active: tabClick == 2 }"
            class="mycule"
            @click="myclue(2)"
            >公共话术</span
          >
        </div>
        <span class="addBtn" @click="newaddClick">
          <img src="../../images/icon_add@2x.png" alt="" />
          新增
        </span>
      </div>
      <!-- 查询 -->
      <div class="searchInput">
        <input
          type="text"
          class="input"
          v-model="inputValue"
          placeholder="请输入姓名/公司/手机号"
        />
        <span class="searchBtn">查询</span>
      </div>
      <!-- center列表 -->
      <div v-if="tabClick == 1" class="pd-24">
        <div class="newgrouping">
          <img class="newgrp-img" src="../../images/iconadd.png" alt="" />
          <span class="add-grp">添加分组</span>
        </div>
        <div>
          <template>
            <el-tree
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            >
            </el-tree>
          </template>
        </div>
      </div>
      <!--  -->
      <div v-if="tabClick == 2">
        <div>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="4">
              <template slot="title">
                <div class="relative">
                  <div class="content-list">
                    <div>
                      <i class="el-icon-caret-right"></i>
                      <span slot="title">列表一</span>
                    </div>
                    <div @click="callOclick">
                      <i class="el-icon-more"></i>
                    </div>
                  </div>
                  <div class="call" v-if="callbox">
                    <p @click="newgroup">新建分组</p>
                    <p>重命名</p>
                    <p>删除</p>
                  </div>
                </div>
              </template>
              <el-menu-item index="3">列表1</el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <div class="relative">
                    <div class="content-list">
                      <div>
                        <i class="el-icon-caret-right"></i>
                        <span slot="title">列表一</span>
                      </div>
                      <div>
                        <i class="el-icon-more"></i>
                      </div>
                    </div>
                    <!-- <div class="call" v-if="callbox">
                      <p>新建分组</p>
                      <p>重命名</p>
                      <p>删除</p>
                    </div> -->
                  </div>
                </template>
                <el-menu-item index="1">列表2</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <!-- 新增弹框 -->
    <van-action-sheet v-model="newshow" title="新增话术">
      <div class="content">
        <div class="codeDetail">
          <el-form :model="newform">
            <el-form-item label="分组">
              <el-select placeholder="请选择分组" v-model="newform.grouping">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活码名称">
              <el-input v-model="newform.verbaltite"></el-input>
            </el-form-item>

            <template>
              <el-radio-group v-model="radio" @change="redioClick">
                <el-radio :label="1" size="medium">文字</el-radio>
                <el-radio :label="2" size="small">图片</el-radio>
                <el-radio :label="3" size="mini">PDF</el-radio>
                <el-radio :label="4">链接</el-radio>
              </el-radio-group>
            </template>
            <!-- 文字 -->
            <div v-if="tablist == 1">
              <el-form-item>
                <el-input
                  type="textarea"
                  v-model="newform.remark"
                  placeholder="请输入文字内容"
                  maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
            <!-- 图片 -->
            <div v-if="tablist == 2">
              <template>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"><p>上传图片</p></i>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </template>
            </div>
            <!-- PDF -->
            <div v-if="tablist == 3">
              <template>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  accept=".pdf"
                >
                  <i class="el-icon-plus"><p>上传pdf</p></i>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </template>
            </div>
            <!-- 链接 -->
            <div v-if="tablist == 4">
              <el-form-item>
                <el-input
                  v-model="newform.link"
                  placeholder="请输入链接"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="buttonWarp">
            <span class="cancel" @click="cancel">取消</span>
            <span class="save">保存</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      callbox: false,
      dialogImageUrl: "",
      dialogVisible: false,
      newform: {
        grouping: "",
        verbaltite: "",
        remark: "",
        link: "",
      },
      radio: 1,
      newshow: false, //新增弹框
      tablist: 1, //弹框tab列表
      activeNames: [],
      tabClick: 1,
      inputValue: "",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //列表页面
    myclue(v) {
      console.log(v);
      this.tabClick = v;
    },
    // 点击树形结构
    handleNodeClick(data) {
      console.log(data);
    },
    // 点击新增按钮
    newaddClick() {
      this.newshow = true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    redioClick(value) {
      this.tablist = value;
      console.log(value);
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 点击取消
    cancel() {
      this.newshow = false;
    },
    // 点击点点点，出来卡片
    callOclick() {
      this.callbox = true;
    },
    newgroup() {
      console.log(123);
    },
  },
};
</script>

<style scoped lang="less">
.tetx {
  font-size: 50px;
}

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
    padding-left: 150px;
  }
}
.warp-box {
  padding: 0 24px;
  margin-top: 32px;
}
.pd-24 {
  padding: 0 24px;
}
.warp-bg {
  background: #fff;
}
// 头部
.van-collapse {
  padding: 10px;
  background: rgba(65, 104, 246, 0.04);
  border-radius: 8px;
  border: 1px solid #4168f6;
}
/deep/.van-cell {
  background: none;
}

.sop-tite {
  font-size: 28px;
  font-weight: 400;
  color: #3c4353;
  margin-left: 16px;
}
.message {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  margin-left: 16px;
}
.head-warp {
  width: 30vh;
}
// 查询
.searchInput {
  background: #fff;
  padding: 24px 24px;
  .input {
    width: 582px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid #d9dae4;
    font-size: 28px;
    padding-left: 24px;
    box-sizing: border-box;
  }
  .searchBtn {
    display: inline-block;
    width: 104px;
    height: 80px;
    background: #4168f6;
    border-radius: 8px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 80px;
    margin-left: 16px;
  }
}
// tabMenu
.tabMenu {
  padding: 0 24px;
  box-sizing: border-box;
  height: 115px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f2f7;
  span {
    display: inline-block;
  }
  .addBtn {
    width: 124px;
    height: 68px;
    background: #ffffff;
    border-radius: 6px;
    border: 2px solid #d9dae4;
    text-align: center;
    line-height: 68px;
    img {
      display: inline-block;
      width: 28px;
      height: 28px;
      vertical-align: -4%;
    }
  }
  .tabBtn {
    .mycule {
      margin-right: 32px;
    }
    .active {
      color: #4168f6;
      position: relative;
      &::after {
        content: "";
        width: 112px;
        height: 4px;
        background: #4168f6;
        position: absolute;
        bottom: -40px;
        left: 0;
      }
    }
  }
}
// 过渡动画
.transform {
  transform: rotate(95deg);
  /* transform: initial; */
  transition: all 0.3s;
}
// 新增弹框样式
.el-radio {
  width: 100px;
}
/deep/.el-radio__inner {
  width: 30px;
  height: 30px;
}
/deep/ .el-radio__inner::after {
  width: 10px;
  height: 10px;
}
/deep/ .el-input__inner {
  height: 80px;
  line-height: 80px;
}
.van-action-sheet__header {
  height: 88px;
  line-height: 88px;
  background: #fafbff;
  border-radius: 16px 16px 0px 0px;
  font-size: 28px;
  color: #3c4353;
  font-weight: 600;
}
/deep/ .el-textarea__inner {
  font-size: 28px;
  height: 400px;
  border: 2px solid #d9dae4 !important;
}

// center列表
/deep/ .el-radio-group {
  margin-bottom: 30px;
}
/deep/ .el-icon-arrow-down:before {
  content: "";
}
.content-list {
  display: flex;
  justify-content: space-between;
}
.relative {
  position: relative;
}
.call {
  position: absolute;
  right: 20px;
  width: 100px;
  background: #fff;
  z-index: 10;
}
.newgrouping {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.newgrp-img {
  width: 28px;
  height: 28px;
}
.add-grp {
  font-weight: 400;
  color: #4168f6;
  font-size: 28px;
  margin-left: 8px;
}
.content {
  // overflow: scroll;
  // padding: 24px;
  .addForm,
  .codeDetail {
    overflow-y: scroll;
    height: 800px;
    box-sizing: border-box;
    padding: 24px;
    font-size: 28px;
    font-weight: 500;
    overflow-y: scroll;
    /deep/.el-form {
      height: 100%;
      .el-form-item {
        display: flex;
        margin-bottom: 26px;
        .editText {
          font-size: 28px;
          line-height: 80px;
        }
      }
      .el-form-item__label {
        width: 155px;
        font-size: 28px;
        line-height: 80px;
        color: #838a9d;
        margin-bottom: 30px;
      }
      .el-form-item__content {
        flex: 1;
        height: 80px;
        line-height: 80px;
        word-break: break-all;
        .el-input__inner {
          height: 80px;
          border-radius: 8px;
          font-size: 28px;
          border: 0;
          border: 2px solid #d9dae4;
        }
        .el-select,
        .el-cascader {
          width: 100%;
          // width: 562px;
          height: 80px;
        }
        .el-select {
          .el-tag--small {
            height: 50px;
            line-height: 50px;
          }
          .el-tag {
            font-size: 28px;
          }
        }
        .el-checkbox {
          width: 100%;
          line-height: 80px;
          .el-checkbox__inner {
            border: 2px solid #d9dae4;
            width: 28px;
            height: 28px;

            &::after {
              width: 12px;
              height: 12px;
            }
          }
          .el-checkbox__input {
            vertical-align: -10%;
          }
          .el-checkbox__label {
            line-height: 80px;
            font-size: 28px;
          }
        }
      }
      .textareaInput {
        height: 400px;
        .el-textarea {
          .el-textarea__inner {
            font-size: 28px;
            height: 400px;
            border: 2px solid #d9dae4 !important;
          }
        }
      }
      .submitBtn {
        .el-button--primary {
          font-size: 28px;
          width: 702px;
          height: 80px;
          background: #4168f6;
          border-radius: 8px;
        }
      }
    }
  }
  .codeDetail {
    // height: 100%;
    /deep/.el-form {
      .codeImg {
        margin-bottom: 100px !important;
        img {
          width: 182px;
          height: 182px;
        }
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__label {
        font-size: 24px;
      }
      span {
        font-size: 24px;
        // line-height: 80px;
      }
    }
  }
}
// 底部按钮
.buttonWarp {
  display: flex;
  justify-content: space-around;
  font-size: 28px;
  width: 100%;
  // position: fixed;
  bottom: 24px;

  span {
    display: inline-block;
    width: 339px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid #4168f6;
    text-align: center;
    line-height: 80px;
  }
  .cancel {
    color: #4168f6;
    background: #fff;
  }
  .save {
    background: #4168f6;
    color: #fff;
  }
}
</style>