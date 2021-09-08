<template>
  <div class="dialogWarp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">快捷回复</span>
    </div>
    <div class="pd-warp">
      <div class="selectBox">
        <div class="select_group">
          <span class="groupname">分组:</span>
          <SelectTree
            :options="options"
            v-model="value"
            :multiple="false"
            :searchable="false"
            placeholder="请选择分组"
            :normalizer="normalizer"
            @select="changeSelect"
          >
            <label
              slot="option-label"
              slot-scope="{ node, labelClassName }"
              :class="labelClassName"
            >
              <img
                src="../../images/wenjian.png"
                alt=""
                style="width: 14px; height: 12px"
              />
              <span class="nodeName">{{ node.label }}</span>
            </label>
          </SelectTree>
        </div>
        <div class="input_text">
          <span class="groupname">话术标题:</span>

          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="wordTitle"
            maxlength="10"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="techniqueBox">
        <ComponentWord
          :single="index"
          :itemInfo="item"
          @fnDelete="fnDelete"
          v-for="(item, index) in wordsList"
          :key="index"
        ></ComponentWord>
      </div>
      <div class="operation flex">
        <div class="addBtn pointer" @click="newAddTech">
          <img src="../../images/icon_add@2x.png" alt="" />
          新增话术内容
        </div>
        <span>(最多可新增9条话术内容)</span>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormSure">确 定</el-button>
      </div> -->
      <div class="buttonWarp" slot="footer">
        <span class="cancel" @click="dialogFormCancel">取消</span>
        <span class="save" @click="dialogFormSure">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
import SelectTree from "@riophae/vue-treeselect";
import ComponentWord from "./ComponentWord.vue";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    SelectTree,
    ComponentWord,
  },
  props: {
    addVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      wordTitle: "",
      options: [
        {
          id: 1,
          label:
            "一级1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      value: null,
      normalizer(node) {
        return {
          id: node.id,
          label: node.label,
          children: node.children,
        };
      },
      wordsList: [
        {
          text: "",
          imageUrl: "",
          pdf: "",
          url: "",
        },
      ],
    };
  },
  created() {},
  methods: {
    dialogFormCancel() {
      this.$emit("closeAddDialog");
    },
    dialogFormSure() {},
    changeSelect(val) {
      // console.log('-----val---', val)
    },

    newAddTech() {
      this.wordsList.push({
        text: "",
        image: "",
        pdf: "",
        url: "",
      });
    },
    fnDelete(index) {
      console.log("2222222222------------", index, this.wordsList);
      if (this.wordsList.length > 1) {
        this.wordsList.splice(index, 1);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
// 头部
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
//
.el-dialog__title {
  font-size: 16px;
  font-weight: 500;
  color: #3c4353;
}
.rowStyle {
  margin-bottom: 20px;
  line-height: 32px;
}
.el-select,
.el-input__inner {
  width: 329px;
  height: 32px;
}

.el-input__icon {
  line-height: 32px;
}
.groupname {
  display: inline-block;
  width: 120px;
  line-height: 32px;
  text-align: right;
  margin-right: 8px;
}
/deep/.el-input {
  // height: 80px;
  // width: 562px;
  flex: 1;
}
.input_text {
  display: flex;
  margin-top: 20px;
  align-items: center;
  height: 80px;
  line-height: 80px;
}
.nodeName {
  color: #3c4353;
  font-size: 14px;
  font-weight: normal;
}
.select_group {
  display: flex;
  margin-top: 15px;
  align-items: center;
  height: 80px;
  line-height: 80px;
}

.vue-treeselect {
  flex: 1;
}
.addBtn {
  padding: 0 8px;
  width: 252px;
  height: 68px;
  line-height: 68px;
  background: rgba(65, 104, 246, 0.04);
  border-radius: 4px;
  border: 1px solid #4168f6;
  color: #4168f6;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-button {
  width: 60px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  padding: 0;
  border: 1px solid #d9dae4;
}
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  font-size: 14px;
  margin: 20px 0;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  span {
    color: #c0c4cc;
  }
}
.dialog-footer {
  height: 64px;
  line-height: 64px;
  padding-right: 16px;
  border-top: 1px solid #f0f2f7;
}
/deep/ .vue-treeselect__control {
  height: 80px;
  width: 580px;
}
/deep/.vue-treeselect__placeholder,
.vue-treeselect__single-value {
  top: 30%;
}
/deep/.el-input__inner {
  height: 80px;
  // width: 562px;
}

/deep/.vue-treeselect__single-value {
  top: 30%;
}
.buttonWarp {
  display: flex;
  justify-content: space-around;
  font-size: 28px;
  width: 100%;
  position: fixed;
  bottom: 24px;
  margin-top: 80px;

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
// .dialogWarp {
//   /deep/.el-dialog {
//     background: #ffffff;
//     box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
//     border-radius: 8px;
//     .el-dialog__header {
//       height: 50px;
//       background: #fafbff;
//       border-radius: 8px 8px 0px 0px;
//       border-bottom: 1px solid #f0f2f7;

//     }
//     .el-dialog__body {
//       padding: 16px;
//       height: 493px;
//       overflow-y: scroll;

//       .selectBox {

//       }
//       .techniqueBox {
//       }

//     }
//     .el-dialog__footer {
//       padding: 0;
//     }

//   }
// }
.pd-warp {
  padding: 20px;
}
</style>