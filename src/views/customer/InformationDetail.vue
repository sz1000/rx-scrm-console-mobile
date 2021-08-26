<template>
  <div class="detailWarp">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户资料详情</span>
    </div>
    <div class="iconName">
      <div v-if="imageUser">
        <img :src="imageUser"
             alt="" />
      </div>
      <div class="flag"
           v-else> {{name ? name.substr(0,1) : ''}}</div>
      <div class="nameSex">
        <span>{{name}}</span>
        <span v-show="nameFrom">{{ nameFrom == '1' ? '@微信':`@${basicInfo.customerName}` }}</span>
        <img src="../../images/icon_female@2x.png"
             alt=""
             v-if="basicInfo.gender=='2'" />
        <img src="../../images/man.png"
             alt=""
             v-if="basicInfo.gender=='1'" />

      </div>
    </div>
    <div class="basicInformation">
      <span>
        <img src="../../images/icon_label.png"
             alt="" />
      </span>
      <span>基本信息</span>
      <div class="formEdit">
        <el-form ref="form"
                 :model="basicInfo">
          <el-form-item label="客户简称">
            <el-input v-model="basicInfo.customerName"
                      placeholder="请输入"
                      maxlength="15"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select v-model="basicInfo.source"
                       placeholder="请选择"
                       @change="changeSource">
              <el-option v-for="item in optionSource"
                         :key="item.value"
                         :label="item.name"
                         :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="basicInfo.customerType"
                       placeholder="请选择"
                       @change="changeCustom">
              <el-option v-for="item in customList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.customerType">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="basicInfo.mobil"
                      placeholder="请输入"
                      maxlength="13"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="basicInfo.cropFullName"
                      placeholder="请输入"
                      maxlength="100"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-cascader size="large"
                         :props="{ expandTrigger: 'click',value:'id' ,label:'name'}"
                         :options="optionsCreat"
                         v-model="basicInfo.industry"
                         @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="企业规模">
            <el-select v-model="basicInfo.corpScale"
                       placeholder="请选择"
                       @change="scaleChange">
              <el-option v-for="item in optionsScale"
                         :key="item.value"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="basicInfo.address"
                      maxlength="100"
                      placeholder="请输入"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="备注"
                        class="textareaInput">
            <el-input v-model="basicInfo.remark"
                      maxlength="200"
                      placeholder="请输入文字(不得超过200个字符)"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="basicInfo.describe"
                      maxlength="100"
                      placeholder="请输入"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="basicInfo.name"
                      maxlength="15"
                      placeholder="请输入"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="basicInfo.phone"
                      maxlength="11"
                      placeholder="请输入"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="basicInfo.gender"
                       placeholder="请选择"
                       @change="changeGender">
              <el-option label="未知"
                         value="0"></el-option>
              <el-option label="男"
                         value="1"></el-option>
              <el-option label="女"
                         value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="职务:">
            <el-input v-model="basicInfo.position"
                      placeholder="请输入"
                      maxlength="20"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="微信号:">
            <el-input v-model="basicInfo.weixin"
                      placeholder="请输入"
                      maxlength="20"
                      @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:"
                        class="describeBorder">
            <el-input v-model="basicInfo.email"
                      placeholder="请输入"
                      maxlength="60"
                      @change="changeInput()"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="systemInformation ">
      <span>
        <img src="../../images/icon_label.png"
             alt="" />
      </span>
      <span>系统信息</span>
      <div class="formEdit">
        <van-form v-model="systemList">
          <van-field v-for="(item,index) in systemList"
                     label-align='center'
                     :ref="'barcode'+index"
                     readonly
                     :key="index"
                     v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>

  </div>
</template>
<script>
import { formatDate } from '../../utils/tool'
export default {
  data() {
    return {
      name: '',
      imageUser: '',
      nameFrom: '',
      optionSource: [],
      customList: [
        { label: '微信用户', customerType: 1 },
        { label: '企微用户', customerType: 2 },
        { label: '未知', customerType: 0 },
      ],

      optionsCreat: [],
      optionsScale: [],
      basicInfo: {
        industry: [],
        customerName: '',
        source: '',
        customerType: '',
        mobil: '',
        cropFullName: '',
        corpScale: '',
        address: '',
        remark: '',
        describe: '',
        name: '',
        phone: '',
        weixin: '',
        gender: '',
        position: '',
        cropFullName: '',
        cropSubIndustry: '',
        source: '',
        email: '',
      },
      systemList: [
        { name: '添加人员', mapName: 'createBy', value: '' },
        { name: '添加时间', mapName: 'createTime', value: '' },
        { name: '所属人', mapName: 'uname', value: '' },
        { name: '领取时间', mapName: 'getTime', value: '' },
        { name: '最近跟进记录', mapName: 'followRecord', value: '' },
        { name: '最近跟进时间', mapName: 'followTime', value: '' },
        { name: '最近修改人', mapName: 'updateBy', value: '' },
        { name: '最近修改时间', mapName: 'updateTime', value: '' },
        { name: '前所属人', mapName: 'beBelongBy', value: '' },
        { name: '转换时间', mapName: 'turnTime', value: '' },
      ],
      fieldIndex: null,
    }
  },
  created() {
    this.getDetailForm()
  },
  methods: {
    changeInput(val) {
      console.log(val)
      this.update()
    },
    changeCustom(val) {
      this.update()
    },
    changeSource(val) {
      this.update()
    },
    changeGender(val) {
      // console.log(val, this.basicInfo)
      this.update()
    },
    handleChange(val) {
      this.basicInfo.cropSubIndustry = val.toString()
      this.update()
    },
    scaleChange(val) {
      // console.log(val, this.basicInfo)
      this.update()
    },
    getDetailForm() {
      this.$network
        .get('/customer-service/cluecustomer/toupdate', {
          clueCustomerNo: this.$route.params.userid,
        })
        .then((res) => {
          this.processTree(res.data.comlist)
          this.optionSource = res.data.list
          this.optionsScale = res.data.corpScaleList
          this.basicInfo = res.data.clueCustomerEntity
          this.imageUser = res.data.clueCustomerEntity.avatar
          this.name = res.data.clueCustomerEntity.name
          this.nameFrom = res.data.clueCustomerEntity.customerType
          if (res.data.clueCustomerEntity.cropSubIndustry) {
            let arr = res.data.clueCustomerEntity.cropSubIndustry.split(',')
            this.basicInfo.industry = arr.map(Number)
          } else {
            this.basicInfo.industry = []
          }
          let tempObj = res.data.clueCustomerEntity
          let tempSystem = this.systemList.map((item) => {
            return {
              name: item.name,
              value: tempObj[item.mapName],
              mapName: item.mapName,
            }
          })
          tempSystem.forEach((item) => {
            if (
              item.name.includes('时间') &&
              JSON.stringify(item.value) !== 'null'
            ) {
              item.value = formatDate(item.value, 'yyyy-MM-dd')
            }
          })
          this.systemList = tempSystem
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
    update() {
      this.$network
        .post('/customer-service/cluecustomer/update', {
          type: this.$route.query.type,
          clueCustomerNo: this.$route.query.userid,
          ...this.basicInfo,
        })
        .then((res) => {
          this.$message({ type: 'success', message: '更新成功' })
        })
    },
    goBack() {
      this.$router.push('/customTransition')
      // this.$router.go(-1)
    },
    inputEdit(item, index) {
      // console.log(item, index)
      this.fieldIndex = null
    },
    keyupClick(item, index) {
      let p = 'barcode' + index
      this.$refs[p][0].blur()
      // console.log(22222, this.$refs[p])
    },
    fnFocus(item, index) {
      this.fieldIndex = index
    },
  },
}
</script>
<style lang="less" scoped>
.InformationDetail {
}
.detailWarp {
  background: #fff;
  padding: 0 24px;
  .headerTitle {
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
  .iconName {
    display: flex;
    margin: 24px 0;
    .flag {
      width: 88px;
      height: 88px;
      background: #4168f6;
      border-radius: 12px;
      text-align: center;
      line-height: 88px;
      color: #fff;
      font-size: 35px;
    }
    .nameSex {
      margin-left: 16px;
      span:nth-child(1) {
        font-size: 28px;
        font-weight: 600;
      }
      span:nth-child(2) {
        font-size: 24px;
        color: #ffb020;
      }
      span {
        display: inline-block;
      }
      img {
        margin-top: 21px;
        width: 28px;
        height: 28px;
      }
    }
  }
  .basicInformation,
  .systemInformation {
    font-size: 28px;
    span {
      display: inline-block;
      font-weight: 600;
      line-height: 40px;
    }
    img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }
    .formEdit {
      margin: 24px 0;
      /deep/.van-form {
        border: 1px solid #f0f2f7;
        .van-cell {
          padding: 0;
          font-size: 28px;
        }
        .van-field__label {
          width: 234px;
          height: 80px;
          background: #fafbff;
          border: 1px solid #f0f2f7;
          line-height: 80px;
        }
        .van-field__body {
          height: 80px;
        }
      }
      /deep/.el-form {
        height: 100%;
        .el-form-item {
          display: flex;
          margin-bottom: 0;
        }
        .describeBorder {
          .el-input__inner {
            border-bottom: 1px solid #d9dae4 !important;
          }
        }
        .el-form-item__label {
          font-size: 28px;
          width: 234px;
          height: 80px;
          background: #fafbff;
          border: 1px solid #f0f2f7;
          line-height: 80px;
          text-align: center;
        }
        .el-form-item__content {
          // width: 562px;
          flex: 1;
          height: 80px;

          .el-input__inner {
            height: 80px;
            width: 100%;
            border-radius: 8px;
            font-size: 28px;
            border-top: 1px solid #d9dae4;
            border-right: 1px solid #d9dae4;
            border-radius: 0;
          }
          .el-select,
          .el-cascader {
            width: 100%;
            height: 80px;
          }
        }
        .textareaInput {
          // height: 400px;
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