<template>
  <div class="culeDeatil">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户详情</span>
    </div>
    <!-- 基本信息 -->
    <div class="basicInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>基本信息</span>
      <div class="formEdit">
        <el-form ref="form" :model="basicInfo">
          <KehuTip :addChildForm="basicInfo" v-on:getacf="getacf"></KehuTip>
          <el-form-item label="固定电话">
            <el-input v-model="basicInfo.mobil" placeholder="请输入" :disabled='disabled' maxlength="13" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select v-model="basicInfo.source" placeholder="请选择" :disabled='disabled' @change="changeSource">
              <el-option v-for="item in optionSource" :key="item.value" :label="item.name" :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="basicInfo.customerType" placeholder="请选择" :disabled='disabled' @change="changeCustom">
              <el-option v-for="item in customList" :key="item.value" :label="item.label" :value="item.customerType">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户阶段">
            <el-input v-model="basicInfo.cropFullName" placeholder="请输入" maxlength="100" :disabled='disabled' @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="basicInfo.cropFullName" placeholder="请输入" maxlength="100" :disabled='disabled' @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="企业规模">
            <el-select v-model="basicInfo.cropscale" placeholder="请选择" :disabled='disabled' @change="scaleChange">
              <el-option v-for="item in optionsScale" :key="item.value" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-cascader size="large" :props="{ expandTrigger: 'click', value: 'id', label: 'name' }" :options="optionsCreat"
                         v-model="basicInfo.industry" :disabled='disabled' @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="basicInfo.address" maxlength="100" :disabled='disabled' placeholder="请输入" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="备注" class="textareaInput">
            <el-input v-model="basicInfo.remark" maxlength="200" :disabled='disabled' placeholder="请输入文字(不得超过200个字符)" @change="changeInput()">
            </el-input>
          </el-form-item>
          <!-- <GongsiTip :addChildForm="basicInfo" v-on:getgst="getgst"></GongsiTip> -->
        </el-form>
      </div>
    </div>
    <!-- 联系人信息 -->
    <div class="systemInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>联系人信息</span>
      <div class="contactInformation">
        <div class="inputBox">
          <span>头像</span>
          <span><img :src="basicInfo.avatar" alt="" v-show="basicInfo.avatar" /></span>
        </div>
        <van-cell-group>
          <van-field label="联系人" v-model="basicInfo.name" label-align="center" readonly />
          <van-field label="性别" :value="basicInfo.gender == '1' ? '男' : basicInfo.gender == '2' ? '女': '未知'" label-align="center" readonly />
          <van-field label="手机号" v-model="basicInfo.phone" label-align="center" readonly />
          <van-field label="微信号" v-model="basicInfo.weixin" label-align="center" readonly />
          <van-field label="微信昵称" v-model="basicInfo.name" label-align="center" readonly />
          <van-field label="职务" v-model="basicInfo.position" label-align="center" readonly />
          <van-field label="邮箱" v-model="basicInfo.email" label-align="center" readonly />
        </van-cell-group>
      </div>
    </div>
    <!-- 自定义信息 -->
    <div class="customInformation systemInformation" v-show="customerList.length">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>自定义信息</span>
      <div class="formEdit">
        <van-form v-model="customerList">
          <van-field v-for="(item, index) in customerList" label-align="center" :ref="'barcode' + index" readonly :key="index" v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>
    <!-- 系统信息 -->
    <div class="systemInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>系统信息</span>
      <div class="formEdit">
        <van-form v-model="systemList">
          <van-field v-for="(item, index) in systemList" label-align="center" :ref="'barcode' + index" readonly :key="index" v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>
    <!-- 企微信息 -->
    <div class="systemInformation microInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>企微信息</span>
      <div class="formEdit">
        <van-form v-model="microList">
          <van-field v-for="(item, index) in microList" label-align="center" :ref="'barcode' + index" readonly :key="index" v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>
    <div class="infoContent">
      <div class="companyLabel">
        <div class="t_text">
          <span class="label_tag">企业标签</span>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !unfold }" ref="textBox">
            <div ref="spanBox">
              <span v-for="(list, index) in tagList" :key="index" class="tagBox">{{ list.name }}</span>
            </div>
          </div>
          <div class="btn" @click="unfold = !unfold" v-show="tagList.length">
            {{ unfold ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
    </div>

    <div class="bottom_model">
      <van-action-sheet v-model="show" :title="titleName">
        <div class="content">
          <div class="changeUser">
            <div class="selectUser">
              <span style="color: red">*</span><span>指定所属人:</span>
              <el-select v-model="userNo" placeholder="请选择员工" popper-class="popper-select-class">
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.userNo" @change="fnChangeUser">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="closeDialog(isShowDialog)">取消</span>
            <span class="save" @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../utils/tool'
import KehuTip from './comTip/kehuTip.vue'
import GongsiTip from './comTip/gongsiTip.vue'
export default {
  components: {
    KehuTip,
    GongsiTip,
  },
  data() {
    return {
      optionSource: [],
      customList: [
        { label: '微信用户', customerType: 1 },
        { label: '企微用户', customerType: 2 },
        { label: '未知', customerType: 0 },
      ],

      optionsCreat: [],
      optionsScale: [],
      basicInfo: {
        avatar: '',
        industry: [],
        customerName: '',
        source: '',
        customerType: '',
        mobil: '',
        cropFullName: '',
        cropscale: '',
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
        { name: '添加客户时间', mapName: 'createTime', value: '' },
        { name: '前负责人', mapName: 'beBelongBy', value: '' },
        { name: '转换时间', mapName: 'turnTime', value: '' },
      ],
      customerList: [],
      microList: [
        { name: '企业简称', mapName: 'externalCorpName', value: '' },
        { name: '客户来源', mapName: 'externalSource', value: '' },
        { name: '企业名称', mapName: 'externalCorpFullName', value: '' },
        { name: '客户类型', mapName: 'externalType', value: '' },
        { name: '姓名', mapName: 'externalName', value: '' },
        { name: '性别', mapName: 'externalGender', value: '' },
        { name: '职务', mapName: 'externalPosition', value: '' },
        { name: '添加人员', mapName: 'createBy', value: '' },
        { name: '添加客户时间', mapName: 'createTime', value: '' },
        { name: '备注', mapName: 'remark', value: '' },
      ],
      unfold: false,
      tagList: [],
      show: false,
      isShowDialog: null,
      titleName: '',
      message: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('customer')),
      disabled: true,
      btnList: [],
    }
  },
  watch: {
    // basicInfo: {
    //   handler: function (val) {
    //     console.log(val)
    //     //可以做些相应的处理
    //     this.update()
    //   },
    //   deep: true,
    // },
  },
  created() {
    let tempObj = JSON.parse(localStorage.getItem('customer'))
    this.btnList = JSON.parse(this.$route.query.alllist)
    this.disabled = !this.btnList.some((item) => item.enName == 'edit')
  },
  mounted() {
    this.getTagList()
    this.getDetailForm()
  },
  methods: {
    getacf(acfValue) {
      // acfValue就是子组件传过来的值
      console.log('acfValue--->>', acfValue)
      this.basicInfo.customerName = acfValue.customerName
    },
    getgst(gstValue) {
      // gstValue就是子组件传过来的值
      console.log('gstValue--->>', gstValue)
      this.basicInfo.cropFullName = gstValue.cropFullName
    },
    formatDate,
    changeInput(val) {
      this.update()
    },
    changeCustom(val) {
      this.update()
    },
    changeSource(val) {
      this.update()
    },
    changeGender(val) {
      this.update()
    },
    handleChange(val) {
      this.basicInfo.cropSubIndustry = val.toString()
      this.update()
    },
    scaleChange(val) {
      this.basicInfo.cropscale = val
      this.update()
    },
    getTagList() {
      this.$network
        .get('/customer-service/cluecustomer/gettag', {
          clueCustomerNo: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.tagList = res.data.corpTagList
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
    getDetailForm() {
      this.$network
        .get('/customer-service/cluecustomer/toupdate', {
          clueCustomerNo: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.processTree(res.data.comlist)
          this.optionSource = res.data.list
          this.optionsScale = res.data.corpScaleList
          this.basicInfo = res.data.clueCustomerEntity
          let tempSystem = this.systemList.map((item) => {
            return {
              name: item.name,
              value: this.basicInfo[item.mapName],
              mapName: item.mapName,
            }
          })
          tempSystem.forEach((item) => {
            if (
              item.name.includes('时间') &&
              JSON.stringify(item.value) !== 'null'
            ) {
              item.value = formatDate(item.value, 'yyyy-MM-dd hh:mm:ss')
            }
          })
          this.systemList = tempSystem

          let tempMicro = this.microList.map((item) => {
            return {
              name: item.name,
              value: this.basicInfo[item.mapName],
              mapName: item.mapName,
            }
          })
          tempMicro.forEach((item) => {
            if (
              item.name.includes('时间') &&
              JSON.stringify(item.value) !== 'null'
            ) {
              item.value = formatDate(item.value, 'yyyy-MM-dd hh:mm:ss')
            }
            if (item.name.includes('性别')) {
              if (item.value == '1') {
                item.value = '男'
              } else if (item.value == '2') {
                item.value = '女'
              } else {
                item.value = '未知'
              }
            }
            if (item.name.includes('客户类型')) {
              if (item.value == '1') {
                item.value = '微信用户'
              } else if (item.value == '2') {
                item.value = '企微用户'
              } else {
                item.value = '未知'
              }
            }
          })
          this.microList = tempMicro

          if (res.data.clueCustomerEntity.cropSubIndustry) {
            let arr = res.data.clueCustomerEntity.cropSubIndustry.split(',')
            this.basicInfo.industry = arr.map(Number)
          } else {
            this.basicInfo.industry = []
          }
          let tempColum = res.data.clueCustomerEntity.corpCustomColumnMap
          let nameList = []
          res.data.head.forEach((item) => {
            if (item.columnType) {
              nameList.push(item)
            }
          })
          // console.log('---nameList---', nameList)
          this.customerList = []
          nameList.forEach((item) => {
            let obj = {}
            obj.name = item.columnName
            obj.value = tempColum ? tempColum[item.columnValue] : ''
            this.customerList.push(obj)
            // console.log('------', this.customerList)
          })
        })
    },
    goBack() {
      this.$router.go(-1)
    },
    update() {
      this.$network
        .post('/customer-service/cluecustomer/update', {
          type: this.$route.query.type,
          clueCustomerNo: this.objItem.clueCustomerNo,
          ...this.basicInfo,
        })
        .then((res) => {
          this.$message({ type: 'success', message: '更新成功' })
        })
    },
    fnChangeUser(val) {
      console.log(val)
    },
    closeDialog(v) {
      this.show = false
      console.log(v)
    },
    saveDialog(v) {
      this.show = false
      this.$network
        .get('/customer-service/cluecustomer/turnBlon', {
          cluecustomerno: this.objItem.clueCustomerNo,
          user_no: this.userNo,
        })
        .then((res) => {
          if (res.result) {
            this.$message({ type: 'success', message: '分配成功' })
            this.$router.go(-1)
          } else {
            this.$message({ type: 'success', message: res.data.msg })
          }
        })
    },
  },
}
</script>
<style lang="less" scoped>
.culeDeatil {
  padding-bottom: 112px;
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
  .basicInformation,
  .systemInformation {
    background: #fff;
    font-size: 28px;
    padding: 0 24px;
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
      padding: 24px 0;
      /deep/.van-form {
        border: 2px solid #f0f2f7;
        .van-cell {
          padding: 0;
          font-size: 28px;
          border: 1px solid #f0f2f7;
          &::after {
            border-bottom: 0;
          }
        }
        .van-field__label {
          width: 234px;
          height: 80px;
          background: #fafbff;
          border-right: 1px solid #f0f2f7;
          line-height: 80px;
        }
        .van-field__body {
          height: 80px;
        }
      }
      .custonInfo {
        font-size: 28px;
        font-weight: 600;
        margin: 24px 0;
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
          margin-bottom: 0;
        }
        .nameBorder {
          .el-input__inner {
            // border-top: 1px solid #d9dae4 !important;
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
          // padding-left: 24px;
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
            // border: 0;
            // border-right: 1px solid #d9dae4;
            // border-bottom: 1px solid #d9dae4;
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
  .contactInformation {
    padding-bottom: 24px;
    .inputBox {
      margin-top: 24px;
      display: flex;
      span:nth-child(1) {
        font-weight: 400;
        width: 234px;
        height: 80px;
        text-align: center;
        background: #fafbff;
        border: 1px solid #f0f2f7;
        border-bottom: 0;
        line-height: 80px;
      }
      span:nth-child(2) {
        flex: 1;
        font-weight: 400;
        display: inline-block;
        border: 1px solid #f0f2f7;
        border-bottom: 0;
        line-height: 80px;
        padding-left: 24px;
        padding-top: 10px;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
    .van-cell {
      padding: 0;
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      border: 1px solid #f0f2f7;
      &::after {
        border-bottom: 0;
      }
    }
    /deep/.van-field__label {
      width: 234px;
      height: 80px;
      background: #fafbff;
      border-right: 1px solid #f0f2f7;
      line-height: 80px;
    }
    .van-field__body {
      height: 80px;
    }
  }
  .basicInformation {
    padding-top: 24px;
  }
  .infoContent {
    margin-top: 24px;
    background: #fff;
    padding: 24px 24px 0;
    .companyLabel,
    .personLabel {
      min-height: 292px;
      font-size: 28px;
      border-bottom: 1px solid #f0f2f7;
      margin-bottom: 24px;
      .t_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label_tag {
          font-weight: 600;
          color: #3c4353;
          position: relative;
          padding-left: 10px;
          &::before {
            content: '';
            width: 8px;
            height: 28px;
            background: #4168f6;
            position: absolute;
            top: 7px;
            left: -10px;
          }
        }
        .editButton {
          color: #838a9d;
          width: 124px;
          height: 68px;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          text-align: center;
          line-height: 68px;
        }
      }
      .b_content {
        .over-hidden {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .btn {
          color: #4168f6;
          text-align: right;
          .van-icon {
            vertical-align: -11%;
            width: 28px;
            height: 28px;
          }
        }
        .tagBox {
          display: inline-block;
          background: #fafbff;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          color: #838a9d;
          padding: 14px 16px;
          margin-right: 16px;
          margin-top: 16px;
        }
      }
    }
  }
  .bottom_model {
    /deep/.van-overlay {
      background-color: rgba(0, 0, 0, 0.3);
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
    .content {
      // height: 845px;
      padding: 24px;
      .tagWarp {
        height: 740px;
        overflow-y: auto;
        font-size: 28px;
        .tagRow {
          display: flex;
          min-height: 70px;
          margin-bottom: 24px;
          span {
            display: inline-block;
            color: #838a9d;
            text-align: center;
            line-height: 68px;
            height: 68px;
            border: 1px solid #d9dae4;
            margin-right: 16px;
            padding: 0 16px;
            border-radius: 4px;
            margin-bottom: 4px;
          }
          .groupName {
            border: none;
            width: 112px;
            line-height: 68px;
            word-wrap: break-word;
            word-break: normal;
            font-weight: 600;
            margin-right: 24px;
          }
          .tagStyle {
            flex: 1;
            .perchInput {
              border: none;
            }
            .creatTag {
              background: #fafbff;
              margin-bottom: 16px;
              // vertical-align: middle;
              // white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // max-width: 300px;
            }
            .changeTag {
              background: #4168f6;
              color: #fff;
              span {
                color: #fff;
              }
              .van-icon {
                color: #fff;
              }
            }
          }
        }
      }
      .personWarp {
        .tagRow {
          .addInput {
            width: 256px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            padding: 0 16px;
          }
          .creatTag {
            padding-right: 0;
            span {
              border: none;
              padding: 0;
              margin: 0;
            }
            .deleteTag {
              width: 50px;
            }
          }
        }
      }
      .writerInput {
        height: 490px;
        .van-cell,
        .van-field,
        .van-field--min-height {
          font-size: 28px;
          height: 400px;
          background: #ffffff;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          /deep/.van-field__control {
            height: 350px;
            padding-top: 10px;
          }
        }
      }
      .changeUser {
        height: 490px;
        font-size: 28px;
        font-weight: 600;
        .selectUser {
          /deep/.el-select {
            width: 519px;
            height: 80px;
            margin-left: 16px;
            .el-input,
            .el-input__inner {
              width: 519px;
              height: 80px;
              border-radius: 8px;
              font-size: 28px;
              font-weight: normal;
              border: 1px solid #d9dae4;
            }
          }
        }
      }
      .buttonWarp {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
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
    }
  }
}
</style>