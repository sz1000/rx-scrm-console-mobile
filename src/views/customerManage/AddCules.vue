<template>
  <div class="addWarp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">新增线索</span>
    </div>
    <div class="addForm">
      <el-form ref="form" :model="formObj" label-position="right">
        <el-form-item label="姓名:" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
          <el-input v-model="formObj.name" placeholder="请输入" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="formObj.phone" placeholder="手机号与微信号选填一个即可" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="formObj.weixin" placeholder="手机号与微信号选填一个即可" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="formObj.gender" placeholder="请选择">
            <el-option label="未知" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务:">
          <el-input v-model="formObj.position" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:">
          <el-input v-model="formObj.cropFullName" placeholder="请输入" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="所属行业:" class="selectLabel">
          <el-cascader size="large" :props="{ expandTrigger: 'click', value: 'id', label: 'name' }" :options="optionsCreat"
                       v-model="formObj.cropSubIndustry" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="线索来源:" class="selectLabel">
          <el-select v-model="formObj.source" placeholder="请选择线索来源" @change="changeSource" clearable>
            <el-option v-for="item in optionsSource" :key="item.value" :label="item.name" :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formObj.email" maxlength="60" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="formObj.address" maxlength="100" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:" class="textareaInput">
          <el-input type="textarea" v-model="formObj.remark" maxlength="200" placeholder="请输入文字(不得超过200个字符)" show-word-limit></el-input>
        </el-form-item>
        <el-form-item class="submitBtn">
          <el-button type="primary" v-preventReClick @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formObj: {
        name: '',
        phone: '',
        wechat: '',
        position: '',
        gender: '',
        cropSubIndustry: '',
        address: '',
        source: '',
        remark: '',
        email: '',
      },
      optionsCreat: [],
      optionsSource: [],
      type: '',
    }
  },
  created() {
    this.type = localStorage.getItem('type')
    // console.log("type", this.type);
    this.getselect()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleChange(val) {
      console.log(val)
    },
    changeSource(val) {
      console.log(val)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formObj.type = this.type
          this.formObj.cropSubIndustry = this.formObj.cropSubIndustry.toString()
          // console.log(this.formObj)
          this.$network
            .post('/customer-service/cluecustomer/addCul', this.formObj)
            .then((res) => {
              if (res.result) {
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg || '新增失败',
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //下拉框信息
    getselect() {
      this.$network
        .get('/customer-service/cluecustomer/toadd', {})
        .then((res) => {
          this.processTree(res.data.comlist)
          this.optionsSource = res.data.list
        })
    },
    processTree(data) {
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].children.length < 1) {
      //     /**children长度小于1, 将children置为null */
      //     data[i].children = null
      //   } else {
      //     this.processTree(data[i].children)
      //   }
      // }
      // this.optionsCreat = JSON.parse(JSON.stringify(data))
      data.forEach((item) => {
        if (item.children.length) {
          this.optionsCreat.push(item)
          return this.processTree(item.children)
        } else {
          item.children = null
        }
      })
      // console.log(this.optionsCreat)
    },
  },
}
</script>
<style lang="less" scoped>
.AddCules {
}
.addWarp {
  padding-top: 87px;
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
  .addForm {
    background: #fff;
    padding: 24px;
    height: 100%;
    font-size: 28px;
    /deep/.el-form {
      height: 100%;
      .el-form-item {
        display: flex;
        margin-bottom: 60px;
      }
      .el-form-item__label {
        min-width: 170px !important;
        font-size: 28px;
        line-height: 80px;
      }

      .el-form-item__content {
        // width: 562px;
        flex: 1;
        height: 80px;
        // .el-input,
        // .el-select,
        // .el-cascader {
        //   border: 1px solid #d9dae4;
        //   border-radius: 8px;
        // }
        .el-input__inner {
          height: 80px;
          border-radius: 8px;
          font-size: 28px;
          // border: 0;
          // border: 1px solid #d9dae4;
        }
        .el-select,
        .el-cascader {
          // flex: 1;
          width: 100%;
          height: 80px;
        }
      }
      .textareaInput {
        height: 400px;
        .el-textarea {
          // border: 1px solid #d9dae4;
          .el-textarea__inner {
            font-size: 28px;
            height: 400px;
            // border: 0;
            // border: 1px solid #d9dae4;
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
}
</style>