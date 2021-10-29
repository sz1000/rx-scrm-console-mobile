<template>
  <div class="info_warp">
    <div class="title_info">
      请填写个人信息
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
      </el-form-item>
      <div class="submit">
        <el-button type="primary" :class="disabled ? 'disableBtn' :''" @click.once="submitForm('ruleForm')" :disabled='disabled'>提交</el-button>
      </div>
    </el-form>
    <!-- <input type="text"> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        phone: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: this.checkPhone,
          },
        ],
      },
      disabled: false,
    }
  },
  created() {
    // console.log('------', this.$route.query)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            corp_id: this.$route.query.corpid,
            permanent_code: this.$route.query.permanent_code,
            ...this.ruleForm,
          }
          this.$network
            .post('/user-service/user/getWXaddUser', params)
            .then((res) => {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.disabled = true
            })
          // window.open('about:blank', '_self').close()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
.info_warp {
  background: #fff;
  padding-top: 17px;
  // padding-right: 18px;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
.title_info {
  text-align: left;
  margin-bottom: 18px;
  font-size: 17px;
  font-weight: 600;
  padding-left: 17px;
}
.demo-ruleForm {
  padding-right: 18px;
}
.submit {
  position: fixed;
  bottom: 36px;
  width: 100%;
  padding: 0 36px;
  .el-button {
    width: 100%;
    background: #4168f6;
  }
  .disableBtn {
    background: #f5f6fa;
    color: #000;
    border-color: #e7e8f0;
    &:hover {
      background: #f5f6fa;
      color: #000;
      border-color: #e7e8f0;
    }
  }
}
</style>