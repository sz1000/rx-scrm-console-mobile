<template>
  <div class="custom-deep-deatil">
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
          <el-form-item label="客户简称" class="nameBorder">
            <el-input v-model="basicInfo.customerName" placeholder="请输入" maxlength="30" :disabled='disabled' @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="固定电话">
            <el-input v-model="basicInfo.mobil" placeholder="请输入" maxlength="13" :disabled='disabled' @change="changeInput()"></el-input>
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
          <el-form-item label="公司名称">
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
          <!-- <el-form-item label="描述">
            <el-input v-model="basicInfo.describe" maxlength="100" :disabled='disabled' placeholder="请输入" @change="changeInput()"></el-input>
          </el-form-item>
          <div class="custonInfo">
            <img src="../../images/icon_label.png" alt="" />
            <span>联系人信息</span>
          </div>
          <el-form-item label="姓名" class="nameBorder">
            <el-input v-model="basicInfo.name" maxlength="15" placeholder="请输入" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="basicInfo.phone" maxlength="11" placeholder="请输入" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="basicInfo.gender" placeholder="请选择" @change="changeGender">
              <el-option label="未知" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="职务:">
            <el-input v-model="basicInfo.position" placeholder="请输入" maxlength="20" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="微信号:">
            <el-input v-model="basicInfo.weixin" placeholder="请输入" maxlength="20" @change="changeInput()"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="basicInfo.email" placeholder="请输入" maxlength="60" @change="changeInput()"></el-input>
          </el-form-item> -->
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
          <div class="editButton" @click="showCompany(1)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !unfold }" ref="textBox">
            <div ref="spanBox">
              <span v-for="(list, index) in companyTagList" :key="index" class="tagBox">{{ list.name }}</span>
            </div>
          </div>
          <div class="btn" @click="unfold = !unfold" v-show="companyTagList.length > 5">
            {{ unfold ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="personLabel">
        <div class="t_text">
          <span class="label_tag">个人标签</span>
          <div class="editButton" @click="showCompany(2)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !isShowPerson }" ref="textBox">
            <div ref="spanBox">
              <span v-for="(list, index) in personTagList" :key="index" class="tagBox" v-show="list.isChecked">{{ list.name }}</span>
            </div>
          </div>
          <div class="btn" @click="isShowPerson = !isShowPerson" v-show="
              personTagList.filter((item) => {
                return item.isChecked == 1;
              }).length > 5
            ">
            {{ isShowPerson ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="show" :title="titleName" @cancel="cancelIcon" @click-overlay="cancelIcon" :lock-scroll="false">
        <div class="content">
          <div class="tagWarp" v-if="isShowDialog == '1'">
            <div class="tagRow" v-for="(item, index) in groupList" :key="index">
              <div class="groupName">{{ item.name }}</div>
              <div class="tagStyle">
                <span class="creatTag" :class="{
                    changeTag:
                      highLightArr.findIndex((item) => {
                        return item.tagid == list.tagid;
                      }) > -1,
                  }" v-for="(list, index) in item.children" :key="list.id" v-show="list.name" @click="selectTag(list, index)">{{ list.name }}</span>
              </div>
            </div>
          </div>

          <div class="tagWarp personWarp" v-if="isShowDialog == '2'">
            <div class="tagRow">
              <!-- <div class="groupName">{{item.name}}</div> -->
              <div class="tagStyle">
                <span class="addBtn pointer" @click="addTag">+添加</span>
                <span class="perchInput" v-if="isShow">
                  <input v-model.trim="tagName" class="addInput" placeholder="输入后按回车完成" maxlength="30" @keyup.enter="handleSearch()" />
                </span>
                <span class="creatTag" :class="{ changeTag: list.isChecked }" v-for="(list, index) in personTagList" :key="list.id"
                      v-show="list.name">
                  <span @click="selectPersonTag(list, index)">{{
                    list.name
                  }}</span>
                  <span class="deleteTag" @click="deleteTag(list, index)">
                    <van-icon name="cross" />
                  </span>
                </span>
              </div>
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
import { formatDate, _throttle } from '../../utils/tool'
export default {
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
        { name: '添加客户时间', mapName: 'createTime', value: '' },
        { name: '前负责人', mapName: 'beBelongBy', value: '' },
        { name: '转换时间', mapName: 'turnTime', value: '' },
      ],
      customerList: [],
      microList: [
        { name: '客户简称', mapName: 'customerName', value: '' },
        { name: '客户来源', mapName: 'source', value: '' },
        { name: '公司名称', mapName: 'cropFullName', value: '' },
        { name: '客户类型', mapName: 'customerType', value: '' },
        { name: '姓名', mapName: 'name', value: '' },
        { name: '性别', mapName: 'gender', value: '' },
        { name: '职务', mapName: 'position', value: '' },
        { name: '添加人员', mapName: 'createBy', value: '' },
        { name: '添加客户时间', mapName: 'createTime', value: '' },
        { name: '备注', mapName: 'remark', value: '' },
      ],
      unfold: false,
      isShowPerson: false,
      companyTagList: [],
      groupList: [],
      personTagList: [],
      tagList: [],
      show: false,
      isShowDialog: null,
      titleName: '',
      highLightArr: [],
      message: '',
      showInput: null,
      isShow: false,
      tagName: '',
      nowUser: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('customer')),
      btnList: [],
      disabled: false,
    }
  },
  watch: {
    // basicInfo: {
    //   handler: function (newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //     // if(){
    //     // }
    //     //可以做些相应的处理
    //     this.update()
    //   },
    //   deep: true,
    // },
  },
  created() {
    this.btnList = JSON.parse(this.$route.query.mylist)
    this.disabled = !this.btnList.some((item) => item.enName == 'edit')
    // console.log(this.btnList)
  },
  mounted() {
    this.getTagList()
    this.getDetailForm()
  },
  methods: {
    formatDate,
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
      this.basicInfo.corpScale = val
      this.update()
    },
    getTagList() {
      this.highLightArr = []
      this.$network
        .get('/customer-service/cluecustomer/gettag', {
          clueCustomerNo: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.companyTagList = res.data.corpTagList
          this.groupList = res.data.tagCorpList
          this.personTagList = res.data.personTagList

          let allChildTag = res.data.tagCorpList.map((item) => {
            return item.children
          })
          // let childTag = allChildTag.flat()
          let childTag = [].concat.apply([], allChildTag)
          // console.log('---allChildTag---', allChildTag, childTag)

          this.companyTagList.forEach((item) => {
            childTag.forEach((chItem, chIndex) => {
              if (item.tagid == chItem.tagid) {
                this.highLightArr.push(chItem)
              }
            })
            console.log('-----列表----', this.highLightArr)
          })
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
        })
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
    goBack() {
      this.$router.go(-1)
    },
    cancelIcon() {
      document.getElementById('html').style.overflow = 'auto'
    },
    showCompany(v) {
      document.getElementById('html').style.overflow = 'hidden'
      this.isShowDialog = v
      this.show = true
      if (v == 1) {
        this.titleName = '企业标签'
      } else if (v == 2) {
        this.titleName = '个人标签'
      }
    },
    addTag(item, index) {
      this.tagName = ''
      this.isShow = !this.isShow
    },
    handleSearch() {
      console.log(this.tagName)
      if (this.tagName !== '') {
        this.$network
          .post('/customer-service/cluecustomer/addtag', {
            name: this.tagName,
            clueCustomerNo: this.objItem.clueCustomerNo,
          })
          .then((res) => {
            if (res.result) {
              this.personTagList = res.data
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '添加失败',
              })
            }
          })
      }
      this.showInput = null
      this.isShow = false
    },
    selectTag(list, index) {
      // console.log(list)
      var result = this.highLightArr.findIndex((item) => {
        return item.tagid == list.tagid
      })
      if (result > -1) {
        // console.log(111111111111)
        this.highLightArr.forEach((item, index) => {
          if (item.tagid == list.tagid) {
            this.highLightArr.splice(index, 1)
          }
        })
      } else {
        this.highLightArr.push(list)
      }
      // console.log(this.highLightArr)
    },
    selectPersonTag(list, index) {
      console.log(list)
      if (list.isChecked == 1) {
        list.isChecked = 0
      } else {
        list.isChecked = 1
      }
    },
    deleteTag(v, i) {
      // console.log(v)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除',
          className: 'deleteBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .post('/customer-service/cluecustomer/deltag', v)
            .then((res) => {
              if (res.result) {
                this.personTagList = res.data
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    closeDialog(v) {
      this.show = false
      document.getElementById('html').style.overflow = 'auto'
      if (v == 1) {
        this.getTagList()
      } else if (v == 2) {
      } else if (v == 4) {
      }
    },
    saveDialog: _throttle(function (v) {
      if (v == 1) {
        this.$network
          .post(
            `/customer-service/cluecustomer/updCorptag/${this.objItem.clueCustomerNo}`,
            this.highLightArr
          )
          .then((res) => {
            if (res.result) {
              document.getElementById('html').style.overflow = 'auto'
              this.show = false
              this.getTagList()
            } else {
              this.message({
                type: 'error',
                message: '添加失败',
              })
            }
          })
      } else if (v == 2) {
        this.$network
          .post('/customer-service/cluecustomer/updPertag', this.personTagList)
          .then((res) => {
            if (res.result) {
              document.getElementById('html').style.overflow = 'auto'
              this.show = false
              this.$message({
                type: 'success',
                message: '修改成功',
              })
            }
          })
      } else if (v == 4) {
        let params = {
          cluecustomerno: this.objItem.clueCustomerNo,
          user_no: this.userNo,
          oldname: this.nowUser,
        }
        this.$network
          .get('/customer-service/cluecustomer/turnBlon', params)
          .then((res) => {
            if (res.result) {
              this.show = false
              this.$router.go(-1)
              this.$message({
                type: 'success',
                message: '编辑成功!',
              })
            } else {
              this.show = false
              this.$message({
                type: 'error',
                message: res.msg,
              })
            }
          })
      }
    }, 5000),
  },
}
</script>
<style lang="less" scoped>
.custom-deep-deatil {
  .headerTitle {
    display: flex;
    height: 87px;
    line-height: 87px;
    padding: 0 24px;
    background-color: #fff;
    font-weight: 600;
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
  .btnWarp {
    display: flex;
    background: #fff;
    padding: 0 24px 24px;
    .btnBox {
      display: flex;
      font-size: 28px;
      // width: 152px;
      padding: 0 16px;
      height: 68px;
      background: #ffffff;
      border-radius: 9px;
      border: 2px solid #d9dae4;
      justify-content: center;
      align-items: center;
      margin-right: 24px;
      img {
        width: 28px;
        height: 28px;
      }
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
            border-top: 1px solid #d9dae4 !important;
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
            border: 0;
            border-right: 1px solid #d9dae4;
            border-bottom: 1px solid #d9dae4;
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
            span:nth-child(1) {
              vertical-align: middle;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 300px;
            }
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