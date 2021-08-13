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
        <van-form v-model="formList">
          <van-field v-for="(item,index) in formList"
                     label-align='center'
                     placeholder="请输入"
                     :ref="'barcode'+index"
                     :key="index"
                     v-model="item.value"
                     :label="item.name"
                     @blur='inputEdit(item,index)'
                     @focus='fnFocus(item,index)'
                     @keyup.enter.native="keyupClick(item,index)">
            <template slot="right-icon">
              <i class="el-icon-edit"
                 v-show="fieldIndex == index"></i>
            </template>
          </van-field>

        </van-form>
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
      <div class="companyLabel">
        <div class="t_text">
          <span class="label_tag">企业标签</span>
          <!-- <div class='editButton'
               @click="showCompany(1)">
            <i class="el-icon-edit"></i>
            编辑
          </div> -->
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
      </div>
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
      customName: '小鱼儿',
      formList: [
        { name: '姓名', value: '', mapName: 'name' },
        { name: '手机号', value: '', mapName: 'phone' },
        { name: '微信号', value: '', mapName: 'weixin' },
        { name: '性别', value: '', mapName: 'gender' },
        { name: '职务', value: '', mapName: 'position' },
        { name: '公司名称', value: '', mapName: 'cropFullName' },
        { name: '所属行业', value: '', mapName: 'cropSubIndustry' },
        { name: '线索来源', value: '', mapName: 'source' },
        { name: '邮箱', value: '', mapName: 'email' },
        { name: '地址', value: '', mapName: 'address' },
        { name: '备注', value: '', mapName: 'remark' },
        { name: '描述', value: '', mapName: 'describe' },
      ],
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
  created() {
    let tempObj = JSON.parse(localStorage.getItem('customer'))
    // console.log(tempObj)
    let tempList = this.formList.map((item) => {
      return {
        name: item.name,
        value: tempObj[item.mapName],
      }
    })
    tempList.forEach((item) => {
      // console.log(item)
      if (item.name === '性别')
        item.value =
          item.value == '1' ? '男' : item.value == '2' ? '女' : '未知'
    })
    this.formList = tempList
    let tempSystem = this.systemList.map((item) => {
      return {
        name: item.name,
        value: tempObj[item.mapName],
      }
    })
    tempSystem.forEach((item) => {
      if (item.name.includes('时间') && JSON.stringify(item.value) !== 'null') {
        item.value = formatDate(item.value, 'yyyy-MM-dd')
      }
    })
    this.systemList = tempSystem
  },
  mounted() {
    this.getTimeline()
    this.getTagList()
  },
  methods: {
    formatDate,
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
    goBack() {
      this.$router.go(-1)
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
              this.$toast('领取成功!')
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
      console.log(v)
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
        padding-left: 120px;
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
                border: 2px solid #d9dae4;
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