<template>
  <div class="culeDeatil">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户详情</span>
    </div>
    <div class="iconName">
      <span>客户简称:</span>
      <span>{{customName}}</span>
    </div>
    <div class="btnWarp">
      <div class="btnBox"
           @click="getReceive">
        <img src="../../images/icon_like@2x.png"
             alt="" />
        <span>领取</span>
      </div>
      <div class="btnBox"
           @click="distribution">
        <img src="../../images/icon_share@2x.png"
             alt="" />
        <span>分配</span>
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
          <el-form-item label="客户简称"
                        class="nameBorder">
            <el-input v-model="basicInfo.customerName"
                      placeholder="请输入"
                      maxlength="30"
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
          <div class="custonInfo">
            <img src="../../images/icon_label.png"
                 alt="">
            <span>联系人信息</span>
          </div>
          <el-form-item label="姓名"
                        class="nameBorder">
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
          <el-form-item label="邮箱:">
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
    <div class="infoContent">
      <!-- <div class="companyLabel">
        <div class="t_text">
          <span class="label_tag">企业标签</span>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !unfold }"
               ref="textBox">
            <div ref="spanBox">
              <span v-for="(list,index) in tagList"
                    :key="index"
                    class="tagBox">{{list.name}}</span>
            </div>
          </div>
          <div class="btn"
               @click="unfold = !unfold"
               v-show="tagList.length">
            {{unfold ? '收起' : '展开'}}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div> -->
      <div class="dynamic">
        <div class="t_text">
          <span class="label_tag">动态</span>
        </div>
        <div class="allText">全部</div>
        <div class="timeLine"
             v-if="timeLineList.length">
          <el-timeline>
            <el-timeline-item v-for="(item,index) in timeLineList"
                              :key="index"
                              color='#4168F6'
                              type='danger '>
              <div class="recordBox">
                <div class="descTxt">{{item.title}}</div>
                <div class="inLineTwo">{{item.context}}</div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{item.userName}}</div>
                  <span class="time_right">
                    {{formatDate(item.createTime,'yyyy-MM-dd')}}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class='noTimeLine'
             v-else>此用户暂无动态</div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">
          <div class="changeUser">
            <div class="selectUser">
              <span style="color:red;">*</span><span>指定所属人:</span>
              <el-select v-model="userNo"
                         placeholder="请选择员工">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.name"
                           :value="item.userNo"
                           @change='fnChangeUser'>
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
import { formatDate } from '../../utils/tool'
export default {
  data() {
    return {
      customName: '',
      optionSource: [],
      customList: [
        { label: '微信用户', customerType: 1 },
        { label: '企微用户', customerType: 2 },
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
      unfold: false,
      isShowPerson: false,
      tagList: [],
      groupList: [],
      personList: [],
      timeLineList: [
        {
          title: '步骤一',
          userName: '描述信息',
          context: '描述信息描述信息描述信息描述信息',
          createTime: 1628128378602,
        },
      ],
      show: false,
      isShowDialog: null,
      titleName: '',
      highLightArr: [],
      tempList: [],
      message: '',
      showInput: null,
      isShow: false,
      tagName: '',
      nowUser: '',
      userNo: '',
      options: [],
      objItem: JSON.parse(localStorage.getItem('customer')),
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
    this.customName = tempObj.customerName
  },
  mounted() {
    this.getTimeline()
    this.getTagList()
    this.getDetailForm()
  },
  methods: {
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

    getReceive() {
      this.$dialog
        .confirm({
          title: '领取提示',
          message: '是否确认领取所选择的线索？\n确认申领该条资源吗？',
          className: 'giveUpBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .get('/customer-service/cluecustomer/getclue', {
              clueCustomerNo: this.objItem.clueCustomerNo,
              type: this.$route.query.type,
            })
            .then((res) => {
              this.$message({ type: 'success', message: '领取成功' })
              this.$router.go(-1)
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    distribution() {
      // this.isShowDialog = '4'
      this.show = true
      this.titleName = '分配线索'
      this.$network
        .get('/customer-service/cluecustomer/getuserList', {
          clueCustomerNo: this.objItem.clueCustomerNo,
        })
        .then((res) => {
          this.options = res.data.list
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
          // console.log(res)
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
.CustomerSeas {
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
      font-size: 28px;
      span:nth-child(1) {
        color: #838a9d;
      }
      span:nth-child(2) {
        color: #3c4353;
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
        min-height: 200px;
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
        .noTimeLine {
          text-align: center;
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