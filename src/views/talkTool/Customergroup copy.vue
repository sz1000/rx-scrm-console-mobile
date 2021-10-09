<template>
  <div class="microCode">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">新增客户群发</span>
    </div>
    <div class="warp_box">
      <div class="flex">
        <div class="leng"></div>
        <div class="group_name">群发设置</div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="任务名称:" prop="name" class="taskName">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="请输入任务名称"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="选择员工:" prop="selectname" class="selectgroup">
          <el-select
            v-model="ruleForm.selectname"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择客户:" prop="resource" class="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio :label="1">全部客户</el-radio>
            <el-radio :label="2">删选客户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="num_grop" v-if="ruleForm.resource == 1">
          预计发送客户数量:<span class="num">5</span>
        </el-form-item>
        <div v-if="ruleForm.resource == 2" class="filtrate_warp">
          <el-form-item label="性别:" class="resource">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">男</el-radio>
              <el-radio :label="3">女</el-radio>
              <el-radio :label="4">未知</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="添加时间：" class="addtimelist">
            <el-date-picker
              v-model="ruleForm.addtime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        selectname: "",
        resource: 1,
        gender: 1,
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        selectname: [
          { required: true, message: "请选择员工", trigger: "blur" },
        ],
        resource: [{ required: true, message: "请选择客户", trigger: "blur" }],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },

  created() {},

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.microCode {
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
}
.warp_box {
  height: 100%;
  background: #fff;
  padding: 23px;
}
/deep/.el-form-item__label {
  font-size: 28px;
  color: #3c4353;
  font-weight: 400;
}
/deep/ .el-form-item {
  margin-bottom: 35px;
}
.taskName {
  /deep/ .el-form-item__label {
    width: 150px !important;
    height: 80px;
    line-height: 80px;
  }
  /deep/ .el-form-item__content {
    margin-left: 150px !important;

    .el-input {
      height: 80px;
      width: 547px;
      .el-input__inner {
        height: 80px;
        width: 547px;
      }
    }
  }
}
.resource {
  /deep/ .el-form-item__label {
    width: 150px !important;
    height: 80px;
    line-height: 80px;
  }
  /deep/ .el-form-item__content {
    margin-left: 150px !important;
    .el-radio-group {
      height: 80px;
      line-height: 80px;
      .el-radio {
        margin-top: 30px;
        .el-radio__input {
          .el-radio__inner {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    // .el-radio-group {
    //   height: 80px;
    //   width: 547px;
    //   .el-input__inner {
    //     height: 80px;
    //     width: 547px;
    //   }
    // }
  }
}
.addtimelist {
  /deep/ .el-form-item__label {
    // width: 150px !important;
    height: 80px;
    line-height: 80px;
  }
  /deep/ .el-form-item__content {
    height: 80px;
    line-height: 80px;
    // margin-left: 20px !important;
    .el-date-editor {
      height: 80px;
      width: 450px;
      // box-sizing: border-box;
      .el-range-separator {
        line-height: 60px;
      }
    }
  }
}
.num_grop {
  /deep/ .el-form-item__content {
    margin-left: 150px !important;
    margin-top: -40px;
    // height: 80px;
    // line-height: 80px;
  }
}
.selectgroup {
  /deep/ .el-form-item__label {
    width: 150px !important;
    height: 80px;
    line-height: 80px;
  }
  /deep/ .el-form-item__content {
    margin-left: 150px !important;

    .el-select {
      // height: 80px;
      // width: 547px;
      .el-input {
        height: 80px;
        width: 547px;
        .el-input__inner {
          height: 80px;
          width: 547px;
        }
      }
      .el-select__tags {
        // width: 547px;
        .el-tag--small {
          height: 50px !important;
          line-height: 50px !important;
        }
      }
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  // margin-left: 30px;
  margin-bottom: 20px;
}
.leng {
  width: 8px;
  height: 28px;
  background: #4168f6;
}
.group_name {
  font-size: 28px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 500;
  margin-left: 12px;
}
.num {
  color: #4168f6;
}
.filtrate_warp {
  width: 702px;
  height: 456px;
  background: #fafbff;
  border: 1px solid #d9dae4;
  border-radius: 8px;
  margin: -30px auto;
}
</style>