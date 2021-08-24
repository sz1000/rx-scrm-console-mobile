<template>
  <div class="culeDeatil">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">线索详情</span>
    </div>
    <div class="iconName">
      <div v-if="imageUser">
        <img :src="imageUser"
             alt="" />
      </div>
      <div class="flag"
           v-else>
        {{basicInfo.name ? basicInfo.name.substr(0,1) : ''}}
      </div>
      <div class="nameSex">
        <span>{{ basicInfo.name }}</span>
        <img src="../../images/icon_female@2x.png"
             alt=""
             v-if="basicInfo.gender=='2'" />
        <img src="../../images/man.png"
             alt=""
             v-if="basicInfo.gender=='1'" />
      </div>
    </div>
    <div class="btnWarp">
      <div class="btnBox"
           @click="transCustom">
        <img src="../../images/icon_change@2x.png"
             alt="" />
        <span>转客户</span>
      </div>
      <div class="btnBox"
           @click="changeUser">
        <img src="../../images/icon_change2@2x.png"
             alt="" />
        <span>变更所属人</span>
      </div>
      <div class="btnBox"
           @click="giveUp()">
        <img src="../../images/icon_clear@2x.png"
             alt="" />
        <span>放弃</span>
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
          <el-form-item label="微信号:">
            <el-input v-model="basicInfo.weixin"
                      placeholder="请输入"
                      maxlength="20"
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
          <el-form-item label="线索来源">
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
          <el-form-item label="邮箱:">
            <el-input v-model="basicInfo.email"
                      placeholder="请输入"
                      maxlength="60"
                      @change="changeInput()"></el-input>
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
          <el-form-item label="描述"
                        class="describeBorder">
            <el-input v-model="basicInfo.describe"
                      maxlength="100"
                      placeholder="请输入"
                      @change="changeInput()"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div class="systemInformation">
      <span>
        <img src="../../images/icon_label.png"
             alt="" />
      </span>
      <span>系统信息</span>
      <div class="formEdit">
        <van-form v-model="systemList">
          <van-field v-for="(item, index) in systemList"
                     label-align="center"
                     :ref="'barcode' + index"
                     readonly
                     :key="index"
                     v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>
    <div class="infoContent">
      <div class="companyLabel">
        <div class="t_text">
          <span class="label_tag">企业标签</span>
          <div class="editButton"
               @click="showCompany(1)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !unfold }"
               ref="textBox">
            <div ref="spanBox">
              <span v-for="(list, index) in companyTagList"
                    :key="index"
                    class="tagBox">{{ list.name }}</span>
            </div>
          </div>
          <div class="btn"
               @click="unfold = !unfold"
               v-show="companyTagList.length>5">
            {{ unfold ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="personLabel">
        <div class="t_text">
          <span class="label_tag">个人标签</span>
          <div class="editButton"
               @click="showCompany(2)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !isShowPerson }"
               ref="textBox">
            <div ref="spanBox">
              <span v-for="(list, index) in personTagList"
                    :key="index"
                    class="tagBox"
                    v-show="list.isChecked">{{ list.name }}</span>
            </div>
          </div>
          <div class="btn"
               @click="isShowPerson = !isShowPerson"
               v-show="personTagList.length>5">
            {{ isShowPerson ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="dynamic">
        <div class="t_text">
          <span class="label_tag">动态</span>
          <div class="editButton"
               @click="showCompany(3)">
            <img src="../../images/icon_repair1@2x.png"
                 alt="" />
            <span>写跟进</span>
          </div>
        </div>
        <div class="allText">全部</div>
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in timeLineList"
                              :key="index"
                              color="#4168F6"
                              type="danger ">
              <div class="recordBox">
                <div class="descTxt">{{ item.title }}</div>
                <div class="inLineTwo">{{ item.context }}</div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ item.userName }}</div>
                  <span class="time_right">
                    {{ formatDate(item.createTime, "yyyy-MM-dd") }}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">
          <div class="tagWarp"
               v-if="isShowDialog == '1'">
            <div class="tagRow"
                 v-for="(item, index) in groupList"
                 :key="index">
              <div class="groupName">{{ item.name }}</div>
              <div class="tagStyle">
                <span class="creatTag"
                      :class="{ 'changeTag': highLightArr.findIndex(item=>{return item.tagid == list.tagid})>-1 }"
                      v-for="(list, index) in item.children"
                      :key="list.id"
                      v-show="list.name"
                      @click="selectTag(list, index)">{{ list.name }}</span>
              </div>
            </div>
          </div>

          <div class="tagWarp personWarp"
               v-if="isShowDialog == '2'">
            <div class="tagRow">
              <!-- <div class="groupName">{{item.name}}</div> -->
              <div class="tagStyle">
                <span class="addBtn pointer"
                      @click="addTag">+添加</span>
                <span class="perchInput"
                      v-if="isShow">
                  <input v-model.trim="tagName"
                         class="addInput"
                         placeholder="输入后按回车完成"
                         maxlength="30"
                         @keyup.enter="handleSearch()" />
                </span>
                <span class="creatTag"
                      :class="{ 'changeTag': list.isChecked }"
                      v-for="(list, index) in personTagList"
                      :key="list.id"
                      v-show="list.name">
                  <span @click="selectPersonTag(list, index)"
                        class="textTag">{{
                    list.name
                  }}</span>
                  <span class="deleteTag"
                        @click="deleteTag(list, index)">
                    <van-icon name="cross" />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="writerInput"
               v-if="isShowDialog == '3'">
            <van-field v-model="message"
                       type="textarea"
                       maxlength="200"
                       placeholder="记录好跟进，多签单哟~"
                       show-word-limit />
          </div>
          <div class="changeUser"
               v-if="isShowDialog == '4'">
            <div class="nowUser">
              <span>现有所属人:</span>
              <span>{{ nowUser }}</span>
            </div>
            <div class="selectUser">
              <span style="color: red">*</span><span>指定所属人:</span>
              <el-select v-model="userNo"
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.userNo"
                           :label="item.name"
                           :value="item.userNo"
                           @change="fnChangeUser">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog(isShowDialog)">取消</span>
            <span class="save"
                  @click="saveDialog(isShowDialog)">保存</span>
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
      item: {},
      name: '',
      imageUser: '',
      userName: '',
      optionSource: [],
      customList: [
        { label: '微信用户', customerType: 1 },
        { label: '企微用户', customerType: 2 },
      ],

      optionsCreat: [],
      optionsScale: [],
      basicInfo: {
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
      unfold: false,
      isShowPerson: false,
      companyTagList: [],
      groupList: [],
      personTagList: [],
      tagList: [],
      groupList: [],
      timeLineList: [],
      show: false,
      isShowDialog: null,
      titleName: '',
      highLightArr: [],
      picthList: [],
      message: '',
      showInput: null,
      isShow: false,
      type: '',
      tagName: '',
      nowUser: '',
      cluecustomerNo: '',
      objItem: JSON.parse(localStorage.getItem('detail')),
      userNo: '',
      options: [],
    }
  },
  created() {
    let tempObj = JSON.parse(localStorage.getItem('detail'))
    this.imageUser = tempObj.avatar
    this.getTimeline()
    this.getTagList()
    this.getDetailForm()
  },
  mounted() {},
  methods: {
    formatDate,
    formatDate,
    changeInput(val) {
      // console.log(val)
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
    getTimeline() {
      // console.log(this.objItem, '------')
      this.$network
        .get('/customer-service/cluecustomer/getMessage', {
          cluecustomerno: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.timeLineList = res.data
        })
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
          this.companyTagList.forEach((item) => {
            this.groupList.forEach((v, i) => {
              if (item.parenttag == v.tagid) {
                this.groupList[i].children.forEach((chItem, chIndex) => {
                  if (item.tagid == chItem.tagid) {
                    this.highLightArr.push(chItem)
                  }
                })
              }
            })
            // console.log(this.highLightArr)
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
          // this.name = res.data.clueCustomerEntity.name
          let tempSystem = this.systemList.map((item) => {
            return {
              name: item.name,
              value: this.basicInfo[item.mapName],
              mapName: item.mapName,
            }
          })
          // console.log(tempSystem)
          tempSystem.forEach((item) => {
            if (
              (item.mapName == 'turnTime' ||
                item.mapName == 'updateTime' ||
                item.mapName == 'followTime' ||
                item.mapName == 'getTime' ||
                item.mapName == 'createTime') &&
              JSON.stringify(item.value) !== 'null'
            ) {
              item.value = formatDate(item.value, 'yyyy-MM-dd')
            }
          })
          this.systemList = tempSystem

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
          if (res.result) {
            this.getDetailForm()
            this.$message({ type: 'success', message: '更新成功' })
          }
        })
    },
    goBack() {
      this.$router.go(-1)
    },

    showCompany(v) {
      this.isShowDialog = v
      this.show = true
      if (v == 1) {
        this.titleName = '企业标签'
      } else if (v == 2) {
        this.titleName = '个人标签'
      } else if (v == 3) {
        this.titleName = '写跟进'
        this.message = ''
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
            this.personTagList = res.data
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
    transCustom() {
      this.$router.push({
        path: 'turnCustomer',
        query: {
          customno: this.objItem.clueCustomerNo,
          type: this.$route.query.type,
        },
      })
    },
    changeUser() {
      this.isShowDialog = '4'
      this.show = true
      this.titleName = '变更所属人'
      let params = {
        clueCustomerNo: this.objItem.clueCustomerNo,
      }
      this.$network
        .get('/customer-service/cluecustomer/getuserList', params)
        .then((res) => {
          this.nowUser = res.data.userNo
          this.options = res.data.list
        })
    },
    giveUp() {
      this.$dialog
        .confirm({
          title: '放弃警告',
          message:
            '是否放弃返回公海？\n* 放弃到公海后，此客户数据将属于公共资源，原归属 人员不能再维护跟进和更新此客户数据。',
          className: 'giveUpBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .get('/customer-service/cluecustomer/giveUpType', {
              clueCustomerNo: this.objItem.clueCustomerNo,
              type: this.$route.query.type,
            })
            .then((res) => {
              if (res.result) {
                this.$router.go(-1)
                this.$message({
                  type: 'success',
                  message: '操作成功',
                })
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    fnChangeUser(val) {
      console.log(val)
    },
    closeDialog(v) {
      this.show = false
      console.log(v)
    },
    saveDialog: _throttle(function (v) {
      // console.log(v)
      if (v == 1) {
        this.$network
          .post(
            `/customer-service/cluecustomer/updCorptag/${this.objItem.clueCustomerNo}`,
            this.highLightArr
          )
          .then((res) => {
            if (res.result) {
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
              this.show = false
              this.$message({
                type: 'success',
                message: '修改成功',
              })
            }
          })
      } else if (v == 3) {
        this.$network
          .post('/customer-service/cluecustomer/addMessage', {
            clueCustomerNo: this.objItem.clueCustomerNo,
            context: this.message,
          })
          .then((res) => {
            if (res.result) {
              this.show = false
              this.getTimeline()
              this.getDetailForm()
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
    }, 2000),
  },
}
</script>
<style lang="less" scoped>
.DetailCules {
  .culeDeatil {
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
    .iconName {
      display: flex;
      padding: 24px;
      background: #fff;
      img {
        width: 88px;
        height: 88px;
      }
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
            flex: 1;
            height: 80px;

            .el-input__inner {
              height: 80px;
              width: 100%;
              font-size: 28px;
              border: 0;
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
      .dynamic {
        font-size: 28px;
        .t_text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
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
            width: 152px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            line-height: 68px;
            span {
              display: inline-block;
            }
            img {
              display: inline-block;
              vertical-align: middle;
              margin: -10px 10px 0 0;
              margin-right: 5px;
              width: 28px;
              height: 28px;
            }
          }
        }
        .allText {
          color: #4168f6;
          margin-bottom: 16px;
        }
        .timeLine {
          .el-timeline {
            padding-left: 0 !important;
          }
          .recordBox {
            // width: 676px;
            min-height: 180px;
            background: rgba(65, 104, 246, 0.06);
            border-radius: 8px;
            color: #3c4353;
            padding: 16px 16px 0;
            font-size: 28px;
            .inLine {
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
              .time_right {
                font-size: 28px;
                color: #838a9d;
              }
              img {
                width: 10px;
                height: 10px;
              }
            }
            .inLineTwo {
              margin-bottom: 16px;
              display: inline-block;
              word-break: normal;
              word-break: break-all;
              word-break: keep-all;
              word-break: break-word;
              // display: -webkit-box;
              // -webkit-box-orient: vertical;
              // -webkit-line-clamp: 2;
              // overflow: hidden;
            }
            .inLineEnd {
              text-align: right;
            }
            .descTxt {
              font-weight: 600;
              color: #3c4353;
              margin-bottom: 16px;
            }
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
                vertical-align: middle;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
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
              .textTag {
                vertical-align: middle;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
              }
              .deleteTag {
                width: 50px;
                vertical-align: middle;
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
          .nowUser {
            padding-left: 20px;
            margin-bottom: 28px;
            span {
              display: inline-block;
            }
            span:nth-child(2) {
              font-weight: normal;
              color: #838a9d;
              margin-left: 15px;
            }
          }
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
}
</style>