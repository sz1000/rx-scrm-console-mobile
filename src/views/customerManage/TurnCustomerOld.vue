<template>
  <div class="turnWarp">
    <header-title class="customer-title" title="转客户" :needLine="true"></header-title>
    <div class="addForm">
      <div class="custonInfo">
        <img src="../../images/icon_label.png" alt="">
        <span>客户信息</span>
      </div>
      <el-form ref="form" :model="formObj" label-position='right'>
        <KehuTip :addChildForm="formObj" v-on:getacf="getacf"></KehuTip>
        <el-form-item label="客户来源:" prop="source" :rules="[ { required: true, message: '请选择',trigger: 'change'}]">
          <el-select v-model="formObj.source" placeholder="请选择" @change="changeSource" clearable>
            <el-option v-for="item in optionSource" :key="item.value" :label="item.name" :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型:" prop="customerType" :rules="[ { required: true, message: '请选择',trigger: 'change'}]">
          <el-select v-model="formObj.customerType" placeholder="请选择" @change="changeCustom" clearable>
            <el-option v-for="item in optionsCustom" :key="item.customerType" :label="item.label" :value="item.customerType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户阶段:">
          <el-select v-model="formObj.stage" placeholder="请选择" @change="changeCustom" clearable>
            <el-option v-for="(item,index) in stageList" :key="index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="formObj.mobil" placeholder="请输入" maxlength="11"></el-input>
        </el-form-item>
        <GongsiTip :addChildForm="formObj" v-on:getgst="getgst"></GongsiTip>
        <el-form-item label="所属行业:">
          <el-cascader size="large" :props="{ expandTrigger: 'click',value:'id' ,label:'name'}" :options="optionsCreat" v-model="formObj.industry"
                       @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="企业规模:">
          <el-select v-model="formObj.corpScale" placeholder="请选择" @change="scaleChange" clearable>
            <el-option v-for="item in optionsScale" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="formObj.address" maxlength="100" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:" class="textareaInput">
          <el-input type="textarea" v-model="formObj.remark" maxlength="200" placeholder="请输入文字(不得超过200个字符)" show-word-limit></el-input>
        </el-form-item>
        <div class="custonInfo">
          <img src="../../images/icon_label.png" alt="">
          <span>联系人信息</span>
        </div>

        <el-form-item label="头像:" class="upload_avatar">
          <div class="demo-input-suffix">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="resetUpload" v-show="imageUrl">重新上传</div>
            </el-upload>
            <img src="../../images/dele.png" alt="" v-if="imageUrl" class="el-icon-circle-close" @click="deleteImg">
          </div>
        </el-form-item>

        <el-form-item label="联系人:" prop="name" :rules="[ { required: true, message: '请输入姓名',trigger: 'blur'}]">
          <el-input v-model="formObj.name" maxlength="15" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="formObj.phone" maxlength="11" placeholder="请输入"></el-input>
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
        <el-form-item label="微信号:">
          <el-input v-model="formObj.weixin" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formObj.email" placeholder="请输入" maxlength="60"></el-input>
        </el-form-item>
        <el-form-item class="submitBtn">
          <el-button type="primary" v-preventReClick @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import KehuTip from './comTip/kehuTip.vue'
import GongsiTip from './comTip/gongsiTip.vue'
import { uploadFile } from '../../api/friend'
export default {
  components: {
    HeaderTitle,
    KehuTip,
    GongsiTip,
  },
  data() {
    return {
      stageList: [],
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
        { label: '未知', customerType: 0 },
      ],
      optionsScale: [],
      optionsCreat: [],
      imageUrl: '',
    }
  },
  created() {
    this.getDataList()
  },
  provide() {
        return {
          goBack: this.goBack
        }
    },
  methods: {
    handleAvatarSuccess(request) {
      this.$toast.loading({ duration: 0 })
      if (this.beforeAvatarUpload(request.file)) {
        let formData = new FormData()
        formData.append('file', request.file)
        formData.append('filetype', 'image')
        formData.append('type', 'friend')
        uploadFile(formData).then((res) => {
          if (res.result) {
            this.imageUrl = res.data.url
            this.$toast.clear()
          }
        })
      }
    },
    deleteImg() {
      this.imageUrl = ''
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG || !isLt2M) {
        this.$toast('上传头像图片只能是 JPG,PNG,JEPG 格式，大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    getacf(acfValue) {
      this.formObj.customerName = acfValue.customerName
    },
    getgst(gstValue) {
      this.formObj.cropFullName = gstValue.cropFullName
    },
    getDataList() {
      this.$network.get('/customer-service/cluecustomer/toupdate', { clueCustomerNo: this.$route.query.customno }).then((res) => {
          this.formObj = res.data.clueCustomerEntity
          this.stageList = res.data.stageList
          this.processTree(res.data.comlist)
          this.optionSource = res.data.list
          this.optionsScale = res.data.corpScaleList

          if (res.data.clueCustomerEntity.cropSubIndustry) {
            let arr = res.data.clueCustomerEntity.cropSubIndustry.split(',')

            this.formObj.industry = arr.map(Number)
          } else {
            this.formObj.industry = []
          }
        })
    },
    processTree(data) {
      data.forEach((item) => {
        if (item.children.length) {
          this.optionsCreat.push(item)
          return this.processTree(item.children)
        } else {
          item.children = null
        }
      })
    },
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
          if (this.formObj.phone || this.formObj.weixin) {
            let cropSubIndustry = this.formObj.industry.toString()
            let params = {
              ...this.formObj,
              ...{
                cropSubIndustry: cropSubIndustry,
                type: this.$route.query.type,
                avatar: this.imageUrl,
              },
            }
            this.$network.post('/customer-service/cluecustomer/cluetocustomer', params).then((res) => {
                this.$router.push('/customerManage/clues')
                this.$toast('操作成功')
              })
          } else {
            this.$toast('手机号微信号请选填其一')
          }
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
.turnWarp {
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
        margin-bottom: 60px;
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
      .upload_avatar {
        height: 182px;
        .demo-input-suffix {
          display: flex;
          position: relative;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          width: 182px;
          height: 182px;
          border-radius: 6px;
          cursor: pointer;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 40px;
          color: #8c939d;
          line-height: 182px;
          text-align: center;
        }
        .avatar {
          width: 100%;
          height: 100%;
        }
        .resetUpload {
          position: absolute;
          left: 206px;
          bottom: 0;
          font-size: 28px;
          color: #4168f6;
          cursor: pointer;
        }
        .el-icon-circle-close {
          position: absolute;
          left: 165px;
          top: -8px;
          cursor: pointer;
          width: 28px;
          height: 28px;
        }
        .imgTip {
          font-size: 14px;
          color: #c0c4cc;
          letter-spacing: 0;
          font-weight: 400;
          position: absolute;
          bottom: 0;
          left: 144px;
        }
      }
    }
  }
}
/deep/.el-form-item__label {
  width: 155px;
  font-size: 28px;
  line-height: 80px;
  margin: 0px 24px 0 0;
  padding: 0;
}
</style>
