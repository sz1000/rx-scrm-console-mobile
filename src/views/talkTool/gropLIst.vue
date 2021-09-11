
<template>
  <div>
    <div class="tree-box">
      <div v-for="(item, i) in treeData" :key="i + 'out'" class="out-li">
        <div class="tree-header">
          <span class="header-left jianto">
            <span :class="item.isOpen ? 'cenr' : 'cenrs'"></span>
          </span>
          <span class="header-mid" @click.stop="groupNameList(item, i)"
            >{{ item.name }}
            <!-- <span class="gray">({{ treeData.length }})</span>
            (item.isOpen = true ? 'rotate' : '') :class="(showAll = true ? 'corner' : 'rotate')"-->
          </span>
          <div class="header-right" v-if="i == actDot">
            <div class="morePosition">
              <div class="" @click="moreDot">
                <img
                  style="width: 28px; height: 28px"
                  src="../../images/icon_more@2x.png"
                  alt=""
                />
              </div>
              <ul class="listAlat-box" v-if="listTite">
                <li @click="rechristen">重命名</li>
                <li @click="openDelete">删除</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tree-body" v-show="item.isOpen">
          <div class="out-panel" v-for="(group, gi) in item.items" :key="gi">
            <div>
              <!-- <p>{{ item.title }}</p> -->
              <div class="warp_group">
                <img
                  class="group_img"
                  src="../../images/group.png"
                  alt=""
                  @click="shareText(group)"
                />
                <p class="title_verba">{{ item.title }}</p>
              </div>
              <div class="item-box">
                <div
                  v-for="(chi, c) in group.contentList"
                  :key="c + 'in'"
                  class="cen_item"
                  @click.stop="_down(chi)"
                >
                  <!-- <img :src="chi.icon" alt="" />
                  <div>
                    <p>{{ chi.title }}</p>
                    <p class="gray">{{ chi.size }}</p>
                  </div> -->
                  <div class="text_img">
                    <img
                      class="share_img"
                      src="../../images/share_two@2x.png"
                      alt=""
                      @click="firstShare(chi)"
                    />
                  </div>
                  <div class="sop-text">
                    <div class="list_box">
                      <div class="sop_imgWarp">
                        <!-- <div class="img-up">
                          <img :src="chi.icon" alt="" />
                        </div> -->
                        <div class="center_img">
                          <p class="img_text">{{ chi.value }}</p>
                          <p class="img_size">{{ chi.size }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="up" @click.stop="item.isOpen = false">
                  {{ item.label }}-收起
                </div>
              </div>
            </div>
          </div>
          <div class="child-panel">
            <!-- 子分组 -->
            <div
              v-for="(sub, k) in item.children"
              :key="k + 'chi'"
              class="out-li"
            >
              <div class="tree-header">
                <span class="header-left">
                  <span :class="item.isOpen ? 'cenr' : 'cenrs'"></span>
                </span>
                <span class="header-mid" @click.stop="groupchildrenList(sub)"
                  >{{ sub.name }}
                  <!-- <span class="gray">({{ sub.length }})</span> -->
                </span>
                <!-- <span
                  class="header-right"
                  @click.stop="sub.isOpen = !sub.isOpen"
                >
                  展开
                 
                </span> -->
                <!-- <div class="header-right" v-if="k == actDots">
                  <div class="morePosition">
                    <div class="" @click="moreDots">
                      <img
                        style="width: 28px; height: 28px"
                        src="../../images/icon_more@2x.png"
                        alt=""
                      />
                    </div>
                    <ul class="listAlat-box" v-if="listTites">
                      <li @click="rechristens">重命名</li>
                      <li @click="openDeletes">删除</li>
                    </ul>
                  </div>
                </div> -->
              </div>
              <div
                v-show="sub.isOpen"
                class="out-panel"
                v-for="(ch, ci) in sub.items"
                :key="ci"
              >
                <p>{{ sub.title }}</p>
                <div class="item-box">
                  <div
                    v-for="(ss, s) in ch.contentList"
                    :key="s + 'in-in'"
                    class="item-li"
                    @click.stop="_down(ss)"
                  >
                    <img :src="ss.icon" alt="" />
                    <div>
                      <p>{{ ss.title }}</p>
                      <p class="gray">{{ ss.size }}</p>
                    </div>
                  </div>
                  <div class="up" @click.stop="sub.isOpen = false">
                    {{ item.label }}-{{ sub.label }}收起
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="rename" title="重命名">
      <div class="content">
        <div class="codeDetail">
          <div class="select-Tree"></div>
          <div class="input_text">
            <span class="groupname"
              ><span style="color: red">*</span> 重命名:</span
            >

            <el-input
              v-model="wordTitle"
              placeholder="请输入内容"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="cancel">取消</span>
            <span class="save" @click="saveBut">保存</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      treeData: [],
      showAll: true,
      dotList: false,
      listTite: false,
      rename: false,
      wordTitle: "",
      actDot: 0,
      groupId: "",
    };
  },
  created() {
    this.verbaltrickList();
  },
  methods: {
    // 点击点
    moreDot() {
      this.listTite = !this.listTite;
    },
    //重名名
    rechristen() {
      this.rename = true;
      this.listTite = false;
    },
    // 点击重命名取消
    cancel() {
      this.rename = false;
    },
    // 点击删除
    openDelete() {
      this.$confirm(
        "此操作将删除本分组及分组内全部内容，是否确认删除分组？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.deleteverbal();
          this.verbaltrickList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击删除接口
    deleteverbal() {
      this.$network
        .post("/material-service/verbaltrick/deleteverbal", {
          id: this.groupId,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            this.newclickList;
          }
        });
    },
    // 点击保存
    saveBut() {
      this.$network
        .post("/material-service/verbaltrickgroup/update", {
          id: this.groupId,
          name: this.wordTitle,
        })
        .then((res) => {
          // console.log(res);

          if (res.result) {
            this.rename = false;
            this.verbaltrickList();
          }
        });
    },
    _down(item) {
      // window.open(item.url)
    },
    verbaltrickList() {
      this.$network
        .get("/material-service/verbaltrickgroup/getlist", {
          parentId: 0,
          groupType: 1,
          type: 1,
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res);
          // this.options = res.data;
          this.treeData = res.data;
          if (res.result) {
          }
        });
    },
    // 点击分组列表名字
    groupNameList(value, i) {
      this.actDot = i;
      this.groupId = value.id;
      console.log(value.id);
      value.isOpen = !value.isOpen; //控制折叠与展开

      console.log(11111);
      this.$network
        .get("/material-service/verbaltrick/getlist", {
          page: 1,
          limit: 20,
          value: "",
          groupId: value.id,
          // groupType: this.tabClick,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            // this.newclickList
            this.$set(value, "items", res.data.iPage.records);
            console.log("--------", this.treeData);
          }
        });
    },
    // 子分组标题
    groupchildrenList(valuel) {
      valuel.isOpen = !valuel.isOpen;
      this.groupId = valuel.id;
      console.log(valuel.id);
      this.$network
        .get("/material-service/verbaltrick/getlist", {
          page: 1,
          limit: 20,
          value: "",
          groupId: "",
          // groupType: this.tabClick,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            // this.newclickList

            this.$set(valuel, "items", res.data.iPage.records);
            console.log("--------", this.treeData);
          }
        });
    },
    shareText(v) {
      console.log("---v-----v", v);
      this.$network
        .get("/user-service/user/getticket", {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              "sendChatMessage",
              "invoke",
              "agentConfig",
              "checkJsApi",
            ],
          });
          var that = this;
          wx.ready(function () {
            wx.invoke(
              "agentConfig",
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + "",
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: ["sendChatMessage", "getContext", "invoke"],
              },
              function (res) {
                wx.invoke(
                  "sendChatMessage",
                  {
                    msgtype: "text", //消息类型，必填
                    text: {
                      content: v.value, //文本内容
                    },
                  },
                  function (res) {
                    if (res.err_msg == "sendChatMessage:ok") {
                      //发送成功
                    }
                  }
                );
              }
            );
          });
        });
    },
    firstShare(v) {
      console.log("---v-----v", v);
      this.$network
        .get("/user-service/user/getticket", {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              "sendChatMessage",
              "invoke",
              "agentConfig",
              "checkJsApi",
            ],
          });
          var that = this;
          wx.ready(function () {
            wx.invoke(
              "agentConfig",
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + "",
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: ["sendChatMessage", "getContext", "invoke"],
              },
              function (res) {
                wx.invoke(
                  "sendChatMessage",
                  {
                    msgtype: "text", //消息类型，必填
                    text: {
                      content: v.value, //文本内容
                    },
                  },
                  function (res) {
                    if (res.err_msg == "sendChatMessage:ok") {
                      //发送成功
                    }
                  }
                );
              }
            );
          });
        });
    },
  },
};
</script>
<style scoped lang="less">
.listAlat-box {
  padding: 24px 0;
  width: 236px;
  height: 208px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: absolute;
  right: 0;
  text-align: center;
  box-sizing: border-box;
  li {
    width: 188px;
    height: 80px;
    margin: 0 auto;
    line-height: 80px;
  }
}
.morePosition {
  position: relative;
}
.rotate {
  transform: rotate(90deg);
}
.jianto {
}

// 展开
.cenr {
  top: 5px;
  width: 0px;
  height: 0px;
  border: 10px solid #a0a0a0;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  display: inline-block;
}

// 折叠
.cenrs {
  top: 5px;
  width: 0px;
  height: 0px;
  border: 10px solid #a0a0a0;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  display: inline-block;
}
.tetx {
  font-size: 50px;
}
.all_group {
  .custom-tree-node {
    font-size: 14px;
    width: 100%;
    .text_node {
      display: inline-block;
      width: 100%;
      .nodeName {
        display: inline-block;
        margin-left: 5px;
        width: 70%;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .look_more {
        position: absolute;
        right: 0;
      }
    }
  }
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
.van-nav-bar {
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
.ck-text {
  font-weight: 400;
  color: #838a9d;
  font-size: 24px;
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
.listData {
  transition: all 3s;
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
.group_img {
  width: 48px;
  height: 48px;
}
.warp_group {
  display: flex;
  align-items: center;
  margin: 28px auto;
}
.title_verba {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  margin-left: 16px;
}
.center_list {
  display: flex;
  align-items: center;
}
.share_img {
  width: 26px;
  height: 26px;
}
.content {
  // overflow: scroll;
  // padding: 24px;
  .addForm,
  .codeDetail {
    // overflow-y: scroll;
    height: 750px;
    box-sizing: border-box;
    padding: 24px;
    font-size: 28px;
    font-weight: 500;
    // overflow-y: scroll;
    /deep/.el-form {
      // height: 100%;
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
// 新建分组
.select-Tree {
  display: flex;
}
.groupname {
  display: flex;
  align-items: center;
  margin-right: 20px;
  // width: 250px;
}
.cent {
  justify-content: center;
}
/deep/.vue-treeselect__control {
  width: 547px;
  height: 80px;
  line-height: 80px;
}
/deep/.vue-treeselect__placeholder,
.vue-treeselect__single-value {
  top: 30%;
}
/deep/.vue-treeselect__single-value {
  top: 30%;
}
.input_text {
  display: flex;
  margin-top: 24px;
}
/deep/ .el-input,
.el-input__inner {
  width: 547px;
}
.el-dropdown-link {
  position: relative;
}
.dropdown_box {
  width: 236px;
  // height: 208px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.el-dropdown-link img {
  width: 28px;
  height: 28px;
}
// 底部按钮
.buttonWarp {
  display: flex;
  // justify-content: space-around;
  position: absolute;
  font-size: 28px;
  width: 100%;
  // position: fixed;
  bottom: 24px;
  // margin-top: 243px;

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
    margin-left: 10px;
  }
}
/deep/.van-action-sheet {
  width: 751.5px;
  // margin: 0 auto;
  left: 50%;
  transform: translate(-50%, 0);
}
//
.tree-box {
  background: white;
  font-size: 14px;
  color: #323232;
  .corner {
    position: absolute;
    top: 5px;
    width: 0px;
    height: 0px;
    border: 10px solid #a0a0a0;
    // border-bottom-color: transparent;
    // border-left-color: transparent;
    // border-right-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  .gray {
    color: gray;
  }
  .tree-header {
    display: flex;
    line-height: 20px;
    font-weight: 400;
    color: #3c4353;
    font-size: 28px;
    margin-top: 24px;
    .header-left {
      position: relative;
      flex: 1;
      min-width: 20px;
      max-width: 20px;
      margin-right: 5px;
    }
    .header-mid {
      flex: 1;
    }
    .header-right {
      position: relative;
      white-space: nowrap;
      max-width: 60px;
      min-width: 60px;
      flex: 1;
      margin-left: 5px;
    }
  }
  .out-panel {
    padding-left: 20px;
  }
  .out-li {
    margin-bottom: 20px;
  }
  .item-box {
    padding: 20px;
    background-color: #f5f5f5;
    .item-li {
      // display: flex;
      margin-bottom: 20px;
      background: white;
      border-radius: 6px;
      border: 1px solid #ccc;
      // img {
      //   width: 112px;
      //   height: 112px;
      // }
    }
  }
  .up {
    display: flex;
    justify-content: flex-end;
  }
}
.cen_item {
  display: flex;
  align-items: center;
}
.cen_img {
  flex: 1;
  // max-width: 60px;
  width: 112px;
  height: 112px;
  // min-width: 60px;
  margin-right: 10px;
}
// sop
.sop-box {
  height: 750px;
  background: #fafbff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  padding: 24px;
}
.sop-newsText {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .sop-time {
    margin-right: 20px;
  }
}
.line-border {
  width: 8px;
  height: 28px;
  background: #4168f6;
  display: inline-block;
  margin-right: 12px;
  margin-top: 4px;
}
.sop-num {
  color: #4168f6;
  margin: 0 5px;
}
.text_img {
  margin-right: 24px;
}
.sop-text {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.sop_title {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  width: 606px;
  height: 88px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  line-height: 88px;
  padding-left: 24px;
}
.list_box {
  // display: flex;
  width: 565px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_warp {
  // display: flex;
  width: 606px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_imgWarp {
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  // height: 160px;
  // padding-left: 24px;
  // background: #ffffff;
  // border-radius: 8px;
  // border: 1px solid #d9dae4;
}
.img-up img {
  width: 112px;
  height: 112px;
}
.img_text {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
}
.img_size {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
}
.center_img {
  line-height: 50px;
  margin-left: 16px;
}
// ////////////////////////
.tree-box {
  background: white;
  font-size: 14px;
  color: #323232;
  .corner {
    position: absolute;
    top: 5px;
    width: 0px;
    height: 0px;
    border: 10px solid #a0a0a0;
    // border-bottom-color: transparent;
    // border-left-color: transparent;
    // border-right-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  .gray {
    color: gray;
  }
  .tree-header {
    display: flex;
    line-height: 20px;
    .header-left {
      position: relative;
      flex: 1;
      min-width: 20px;
      max-width: 20px;
      margin-right: 5px;
    }
    .header-mid {
      flex: 1;
    }
    .header-right {
      position: relative;
      white-space: nowrap;
      max-width: 60px;
      min-width: 60px;
      flex: 1;
      margin-left: 5px;
    }
  }
  .out-panel {
    padding-left: 20px;
  }
  .child-panel {
    padding-left: 20px;
  }
  .out-li {
    margin-bottom: 20px;
  }
  .item-box {
    padding: 20px;
    background-color: #f5f5f5;
    .item-li {
      display: flex;
      margin-bottom: 20px;
      background: white;
      border-radius: 6px;
      border: 1px solid #ccc;
      img {
        flex: 1;
        max-width: 60px;
        min-width: 60px;
        margin-right: 10px;
      }
    }
  }
  .up {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
