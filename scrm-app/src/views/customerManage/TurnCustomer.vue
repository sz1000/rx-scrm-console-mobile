<template>
  <div class="addWarp">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">转客户</span>
    </div>
    <div class="addForm">
      <div class="custonInfo">
        <img src="../../images/icon_label.png"
             alt="">
        <span>客户信息</span>
      </div>
      <el-form ref="form"
               :model="formObj"
               label-position='right'>
        <el-form-item label="客户简称:"
                      prop="customerName"
                      :rules="[ { required: true, message: '请输入姓名',trigger: 'blur'}]">
          <el-input v-model="formObj.customerName"
                    placeholder="请输入"
                    maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="客户来源:"
                      prop="source"
                      :rules="[ { required: true, message: '请选择',trigger: 'change'}]">
          <el-select v-model="formObj.source"
                     placeholder="请选择"
                     @change="changeSource"
                     clearable>
            <el-option v-for="item in optionSource"
                       :key="item.value"
                       :label="item.name"
                       :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型:">
          <el-select v-model="formObj.customerType"
                     placeholder="请选择"
                     @change="changeCustom"
                     clearable>
            <el-option v-for="item in optionsCustom"
                       :key="item.value"
                       :label="item.name"
                       :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="formObj.mobil"
                    placeholder="请输入"
                    maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:">
          <el-input v-model="formObj.cropFullName"
                    placeholder="请输入"
                    maxlength="60"></el-input>
        </el-form-item>
        <el-form-item label="所属行业:">
          <el-cascader size="large"
                       :props="{ expandTrigger: 'click',value:'id' ,label:'name'}"
                       :options="optionsCreat"
                       v-model="formObj.industry"
                       @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="企业规模:">
          <el-select v-model="formObj.corpScale"
                     placeholder="请选择"
                     @change="scaleChange"
                     clearable>
            <el-option v-for="item in optionsScale"
                       :key="item.value"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="formObj.address"
                    maxlength="100"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:"
                      class="textareaInput">
          <el-input type="textarea"
                    v-model="formObj.remark"
                    maxlength="200"
                    placeholder="请输入文字(不得超过200个字符)"
                    show-word-limit></el-input>
        </el-form-item>
        <div class="custonInfo">
          <img src="../../images/icon_label.png"
               alt="">
          <span>联系人信息</span>
        </div>
        <el-form-item label="姓名:"
                      prop="name"
                      :rules="[ { required: true, message: '请输入姓名',trigger: 'blur'}]">
          <el-input v-model="formObj.name"
                    maxlength="15"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="formObj.phone"
                    maxlength="11"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="formObj.gender"
                     placeholder="请选择">
            <el-option label="男"
                       value="1"></el-option>
            <el-option label="女"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务:">
          <el-input v-model="formObj.position"
                    placeholder="请输入"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="formObj.weixin"
                    placeholder="请输入"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formObj.email"
                    placeholder="请输入"
                    maxlength="60"></el-input>
        </el-form-item>
        <el-form-item class="submitBtn">
          <el-button type="primary"
                     v-preventReClick
                     @click="onSubmit('form')">提交</el-button>
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
        customerName: '',
        mobil: '',
        source: '',
        customerType: '',
        cropFullName: '',
        corpScale: '',
        industry: '',
        address: '',
        remark: '',
        name: '',
        phone: '',
        gender: '',
        position: '',
        weixin: '',
        email: '',
      },
      optionSource: [],
      optionsCustom: [
        { label: '微信用户', customerType: 1 },
        { label: '企微用户', customerType: 2 },
      ],
      optionsScale: [],
      optionsCreat: [],
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changeCustom(val) {
      console.log(val)
    },
    handleChange(val) {
      console.log(val)
    },
    scaleChange(val) {
      console.log(val)
    },
    changeSource(val) {
      console.log(val)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.TurnCustomer {
  .addWarp {
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
        padding-left: 120px;
      }
    }
    .addForm {
      background: #fff;
      padding: 24px;
      height: 100%;
      font-size: 28px;
      .custonInfo {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 24px;
        img {
          width: 28px;
          height: 28px;
          vertical-align: -11%;
          display: inline-block;
          margin-right: 8px;
        }
      }
      /deep/.el-form {
        height: 100%;
        .el-form-item {
          display: flex;
          margin-bottom: 26px;
        }
        .el-form-item__label {
          width: 155px;
          font-size: 28px;
          line-height: 80px;
        }
        .el-form-item__content {
          width: 562px;
          height: 80px;

          .el-input__inner {
            height: 80px;
            width: 100%;
            border-radius: 8px;
            font-size: 28px;
            border: 2px solid #d9dae4;
          }
          .el-select,
          .el-cascader {
            width: 100%;
            height: 80px;
          }
        }
        .textareaInput {
          height: 400px;
          .el-textarea {
            .el-textarea__inner {
              height: 400px;
              font-size: 28px;
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
}
</style>