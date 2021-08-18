<template>
  <div class="custom_warp">
    <div class="topInfo">
      <div class="customInfo">
        <div class="iconName">
          <div v-if="imageUser">
            <img :src="imageUser"
                 alt="" />
          </div>
          <div class="flag"
               v-else> {{name ? name.substr(0,1) : ''}}</div>
          <div class="nameSex">
            <span>{{ name }}</span>
            <span v-show="nameFrom">{{ nameFrom == '1' ? '@微信':`@${basicInfo.customerName}` }}</span>
            <img src="../../images/icon_female@2x.png"
                 alt=""
                 v-if="basicInfo.gender=='2'" />
            <img src="../../images/man.png"
                 alt=""
                 v-if="basicInfo.gender=='1'" />
          </div>
        </div>
        <div class="detailBtn"
             @click="goToDetail">
          详情
          <van-icon name="arrow"
                    color="#4168F6" />
        </div>
      </div>
      <div class="detailInfo">
        <div class="left">
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{ item.email }}</span>
          </div>
          <div class="rowStyle">
            <span>来源:</span>
            <span>{{ item.source }}</span>
          </div>
          <div class="rowStyle">
            <span>职务:</span>
            <span>{{ item.position }}</span>
          </div>
        </div>
        <div class="right">
          <div class="rowStyle">
            <span>手机号码:</span>
            <span>{{ item.phone }}</span>
          </div>
          <div class="rowStyle">
            <span>公司名称:</span>
            <span>{{ item.cropFullName }}</span>
          </div>
          <div class="rowStyle">
            <span>所属行业:</span>
            <span>{{ item.cropSubIndustry }}</span>
          </div>
        </div>
      </div>
      <div class="tjry">
        <div class="box">
          <span class="label">添加人员:</span>
          <span class="value">{{ item.createBy }}</span>
        </div>
        <div class="box1">
          <span class="label">添加时间:</span>
          <span class="value">{{ item.createTime }}</span>
        </div>
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
               v-show="companyTagList.length > 8">
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
               v-show="personTagList.length > 8">
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
                      :class="{ 'changeTag': highLightArr.findIndex(item=>{return item.tagid == list.tagid})>-1}"
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
                      :class="{ 'changeTag':list.isChecked }"
                      v-for="(list, index) in personTagList"
                      :key="list.id"
                      v-show="list.name">
                  <span @click="selectPersonTag(list, index)">{{
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
          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog(isShowDialog)">取消</span>
            <span class="save"
                  @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <BackTop></BackTop>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import BackTop from '@/components/BackTop'
import { formatDate } from '../../utils/tool'
export default {
  components: {
    BackTop,
  },

  data() {
    return {
      title: '',
      name: '',
      nameFrom: '',
      customerName: '',
      imageUser: '',
      email: '',
      unfold: false,
      isShowPerson: false,
      tagList: [], //企业标签
      tagpersonList: [],
      personTagList: [],
      companyTagList: [],
      item: {},
      groupList: [],
      personList: [],
      timeLineList: [],
      show: false,
      isShowDialog: null,
      titleName: '',
      highLightArr: [],
      tempList: [],
      message: '',
      avatar: '',
      showInput: null,
      isShow: false,
      tagName: '',
      userId: '',
      obj: {},
    }
  },
  created() {
    let href = window.location.href.split('?')[1]
    let p = href.split('&')[0]
    let authCode = p.split('=')[1]
    this.getData(authCode)
  },
  mounted() {
    this.$nextTick(() => {
      // alert(this.userId)
      // this.getMethod(this.userId)
      // this.getTimeline(this.userId)
      // this.getTagList(this.userId)
    })
  },

  methods: {
    formatDate,
    getData(v) {
      this.$network
        .get('/user-service/m/user/getloguser', {
          code: v,
          url: location.href,
        })
        .then((res) => {
          // alert(res.data.corpId)
          // alert(res.data.timestamp)
          // alert(res.data.signature)
          // alert(res.data.nonceStr)
          // alert(res.data.signature)
          // alert(res.data.agent_config_data.signature)
          // this.obj = res.data
          // alert(JSON.stringify(this.obj))
          this.token = res.data.accessToken
          this.appid = res.data.corpId
          localStorage.setItem('token', res.data.accessToken)

          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.corpId, // 必填，企业微信的corpID
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: [
              'getCurExternalContact',
              'invoke',
              'agentConfig',
              'checkJsApi',
            ], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          })
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          var that = this
          wx.ready(function () {
            wx.invoke(
              'agentConfig',
              {
                corpid: res.data.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                agentid: res.data.agent_id + '', // 必填，企业微信的应用id （e.g. 1000247）
                timestamp: res.data.agent_config_data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.agent_config_data.noncestr, // 必填，生成签名的随机串
                signature: res.data.agent_config_data.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                jsApiList: ['getCurExternalContact', 'getContext', 'invoke'], //必填，传入需要使用的接口名称飞)
              },
              function (res) {
                that.obj = res
                wx.invoke('getCurExternalContact', {}, function (res) {
                  if (res.err_msg == 'getCurExternalContact:ok') {
                    that.userId = res.userId //返回当前外部联系人userId
                    // alert(JSON.stringify(that.userId))
                    // alert(JSON.stringify(that.obj))
                    that.getMethod()
                    that.getTimeline()
                    that.getTagList()
                  } else {
                    //错误处理
                  }
                })
                wx.invoke('getContext', {}, function (res) {
                  // alert(JSON.stringify(res))
                  // alert(JSON.stringify(res.entry))
                  if (res.err_msg == 'getContext:ok') {
                    // entry = res.entry
                    // shareTicket = res.shareTicket
                  } else {
                    //错误处理
                  }
                })
              }
            )
          })
        })
    },

    goToDetail() {
      // alert(this.userId)
      this.$router.push({
        name: 'informationDetail',
        params: {
          userid: this.userId,
        },
      })
    },
    //获取客户详情
    getMethod() {
      this.$network
        .get('/customer-service/m/cluecustomer/getClueCustomerByid', {
          id: this.userId,
        })
        .then((res) => {
          // console.log(res)
          this.name = res.data.clueCustomerVO.name
          this.nameFrom = res.data.clueCustomerVO.customerType
          this.customerName = res.data.clueCustomerVO.customerName
          this.item = res.data.clueCustomerVO
          this.imageUser = res.data.clueCustomerVO.avatar
        })
    },
    getTimeline() {
      // console.log(this.objItem, '------')
      this.$network
        .get('/customer-service/cluecustomer/getMessage', {
          cluecustomerno: this.userId,
        })
        .then((res) => {
          this.timeLineList = res.data
        })
    },
    getTagList() {
      this.highLightArr = []
      this.$network
        .get('/customer-service/cluecustomer/gettag', {
          clueCustomerNo: this.userId,
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
    showCompany(v) {
      this.isShowDialog = v
      this.show = true
      if (v == 1) {
        this.titleName = '企业标签'
      } else if (v == 2) {
        this.titleName = '个人标签'
      } else {
        this.titleName = '写跟进'
        this.message = ''
      }
    },
    addTag(item, index) {
      this.tagName = ''
      this.isShow = !this.isShow
    },
    handleSearch() {
      // console.log(this.tagName)
      if (this.tagName !== '') {
        this.$network
          .post('/customer-service/cluecustomer/addtag', {
            name: this.tagName,
            clueCustomerNo: this.userId,
          })
          .then((res) => {
            this.personTagList = res.data
          })
      }
      this.showInput = null
      this.isShow = false
    },
    selectTag(list, index) {
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
    closeDialog(v) {
      this.show = false
      if (v == 1) {
        this.getTagList()
      } else if (v == 2) {
      } else if (v == 3) {
        this.message = ''
      }
    },
    saveDialog(v) {
      if (v == 1) {
        // console.log(this.highLightArr)
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
            clueCustomerNo: this.userId,
            context: this.message,
          })
          .then((res) => {
            if (res.result) {
              this.show = false
              this.getTimeline()
              this.$message({
                type: 'success',
                message: '修改成功',
              })
            }
          })
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
  },
}
</script>
<style lang="less" scoped>
.CustomerPortrait {
  .custom_warp {
    .topInfo {
      height: 400px;
      background: #fff;
      padding: 25px 24px 0 24px;
      .customInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconName {
          display: flex;
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
        .detailBtn {
          font-size: 28px;
          color: #4168f6;
          .van-icon {
            vertical-align: -11%;
            width: 28px;
            height: 28px;
          }
        }
      }
      .detailInfo {
        display: flex;
        margin-top: 21px;
        .left,
        .right {
          width: 50%;
          .rowStyle {
            line-height: 40px;
            font-size: 28px;
            margin-bottom: 24px;
            display: flex;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              width: 84px;
              color: #838a9d;
              overflow: hidden;
            }
            span:nth-child(2) {
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #3c4353;
              font-weight: 400;
            }
          }
        }
        .right {
          margin-left: 19px;
          .rowStyle {
            span:nth-child(1) {
              width: 140px;
            }
          }
        }
      }
      .tjry {
        height: 87px;
        border-top: 1px solid #f0f2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        span {
          display: inline-block;
        }
        .label {
          width: 200px;
          color: #838a9d;
        }
        .value {
          width: 100%;
          color: #3c4353;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .box {
          display: flex;
          width: 50%;
        }
        .box1 {
          display: flex;
          width: 50%;
          margin-left: 29px;
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
            padding: 16px;
            font-size: 28px;
            .inLine {
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
          .tagRow {
            display: flex;
            min-height: 70px;
            margin-bottom: 24px;
            font-size: 28px;
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
              margin-right: 16px;
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