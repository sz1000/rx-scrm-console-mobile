<template>
  <div class="microCode">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">企微活码</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">
        全部活码
      </div>
      <span class="addBtn"
            @click="addCode">
        <img src="../../images/icon_add@2x.png"
             alt="">
        新增
      </span>
    </div>
    <div class="cardCode"
         v-for="(item,index) in liveList"
         :key="index">
      <div class="operationTop">
        <div class="codeName">
          <span>活码名称:</span>
          <span>{{item.livename}}</span>
        </div>
        <div class="editBtn">
          <span @click="editBtn(item)">
            <van-icon name="edit" />
            编辑
          </span>
          <span @click="deleteBtn(item)">
            <van-icon name="delete-o" />
            删除
          </span>
        </div>
      </div>
      <div class="contentBox">
        <div class="leftCode">
          <img :src="item.address"
               alt="">
          <div class="shareCode"
               @click="sendCode(item,index)">
            <span> <img src="../../images/send.png"
                   alt=""></span>
            发送二维码
          </div>
        </div>
        <div class="rightInfo"
             @click="checkDetail(item,index)">
          <div class="rowText">
            <span>渠道:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>创建人员:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>创建时间:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>使用员工:</span>
            <span>使用员工使用员工使用员工使用员工使用员工使用员工使用员工使用员工</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="showAdd"
                        :title="titleName">
        <div class="content">
          <div class="addForm">
            <el-form ref="form"
                     :model="addForm"
                     label-position='right'>
              <el-form-item label="活码名称:"
                            prop="name"
                            :rules="[ { required: true, message: '请输入活码名称'}]">
                <el-input v-model="addForm.name"
                          placeholder="请输入"
                          maxlength="12"
                          show-word-limit></el-input>
              </el-form-item>

              <el-form-item label="使用员工:"
                            prop="userNo"
                            :rules="[ { required: true, message: '请选择'}]">
                <el-select v-model="addForm.usreNo"
                           placeholder="请选择使用员工，可多选"
                           multiple
                           collapse-tags
                           @change="changeUsre"
                           clearable>
                  <el-option v-for="item in usreList"
                             :key="item.value"
                             :label="item.name"
                             :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="添加设置:">
                <el-checkbox v-model="addForm.checked"
                             true-label='1'
                             false-label='0'
                             @change="checkChange">设置添加时无需经过确认自动成为好友</el-checkbox>
              </el-form-item>

              <el-form-item label="渠道:">
                <el-select v-model="addForm.source"
                           placeholder="请选择"
                           @change="changeChannel"
                           clearable>
                  <el-option v-for="item in channelList"
                             :key="item.value"
                             :label="item.name"
                             :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:"
                            class="textareaInput">
                <el-input type="textarea"
                          v-model="addForm.remark"
                          placeholder="请输入文字(不得超过200个字符)"
                          maxlength="200"
                          show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog()">取消</span>
            <span class="save"
                  @click="saveDialog()">保存</span>
          </div>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="showEdit"
                        :title="titleName">
        <div class="content">
          <div class="addForm">
            <el-form ref="form"
                     :model="editForm"
                     label-position='right'>
              <el-form-item label="创建人员:">
                <span class="editText">{{editForm.creatBy}}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span class="editText">{{formatDate(editForm.creatTime,'yyyy-MM-dd')}}</span>
              </el-form-item>
              <el-form-item label="活码名称:"
                            prop="name"
                            :rules="[ { required: true, message: '请输入活码名称'}]">
                <el-input v-model="editForm.name"
                          placeholder="请输入"
                          maxlength="12"
                          show-word-limit></el-input>
              </el-form-item>

              <el-form-item label="使用员工:"
                            prop="userNo"
                            :rules="[ { required: true, message: '请选择'}]">
                <el-select v-model="editForm.usreNo"
                           placeholder="请选择使用员工，可多选"
                           multiple
                           collapse-tags
                           @change="changeUsre"
                           clearable>
                  <el-option v-for="item in usreList"
                             :key="item.value"
                             :label="item.name"
                             :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="添加设置:">
                <el-checkbox v-model="editForm.checked"
                             true-label='1'
                             false-label='0'
                             @change="checkChange">设置添加时无需经过确认自动成为好友</el-checkbox>
              </el-form-item>

              <el-form-item label="渠道:">
                <el-select v-model="editForm.source"
                           placeholder="请选择"
                           @change="changeChannel"
                           clearable>
                  <el-option v-for="item in channelList"
                             :key="item.value"
                             :label="item.name"
                             :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:"
                            class="textareaInput">
                <el-input type="textarea"
                          v-model="editForm.remark"
                          placeholder="请输入文字(不得超过200个字符)"
                          maxlength="200"
                          show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog()">取消</span>
            <span class="save"
                  @click="saveDialog()">保存</span>
          </div>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="showDetail"
                        :title="titleName">
        <div class="content">
          <div class="codeDetail">
            <el-form label-position="right"
                     :model="detailForm">
              <el-form-item label="活码展示:"
                            class="codeImg">
                <img :src="detailForm.address"
                     alt=""
                     style="width:120px;height:120px" />
              </el-form-item>
              <el-form-item label="使用员工:">
                <span>{{ detailForm.userNames }}</span>
              </el-form-item>
              <el-form-item label="创建人:">
                <span>{{ detailForm.createBy }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ formatDate( detailForm.createTime ,'yyyy-MM-dd') }}</span>
              </el-form-item>
              <el-form-item label="渠道:">
                <span>{{ detailForm.chName }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ detailForm.remark }}</span>
              </el-form-item>
            </el-form>
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
      liveList: [
        {
          livename:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        },
        {},
      ],
      showAdd: false,
      showEdit: false,
      showDetail: false,
      titleName: '',
      addForm: {},
      editForm: {
        creatBy: 'hahah',
        creatTime: 1628660777971,
      },
      detailForm: {},
      usreList: [{}, {}, {}],
      channelList: [],
    }
  },
  methods: {
    formatDate,
    goBack() {
      this.$router.go(-1)
    },
    addCode() {
      this.showAdd = true
      this.titleName = '新增企微活码'
    },
    changeUsre(val) {
      console.log(val)
    },
    checkChange(val) {
      console.log(val)
    },
    editBtn(v) {
      console.log(v)
      this.titleName = '编辑企微活码'
      this.showEdit = true
    },
    sendCode(item, index) {
      console.log(item, index)
      console.log(window.wx)
      // wx.ready(function () {
      //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      //   // 扫一扫功能例子
      //   wx.invoke({
      //     desc: 'scanQRCode desc',
      //     needResult: 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
      //     scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是条形码（一维码），默认二者都有
      //     success: function (res) {
      //       // 回调
      //     },
      //     error: function (res) {
      //       if (res.errMsg.indexOf('function_not_exist') > 0) {
      //         alert('版本过低请升级')
      //       }
      //     },
      //   })
      // })
    },
    checkDetail(item, index) {
      this.titleName = '企微活码详情'
      this.showDetail = true
    },
    deleteBtn(v) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '删除后将不可恢复，是否确认删除？',
          className: 'deleteBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    changeChannel() {},
    closeDialog() {},
    saveDialog(v) {
      console.log(v)
    },
    fnChangeUser(val) {
      console.log(val)
    },
  },
}
</script>
<style lang="less" scoped>
.EnterpriseCode {
  .microCode {
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
    .tabMenu {
      background: #fff;
      padding: 0 24px;
      box-sizing: border-box;
      height: 115px;
      font-size: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f2f7;
      span {
        display: inline-block;
      }
      .addBtn {
        width: 124px;
        height: 68px;
        background: #ffffff;
        border-radius: 6px;
        border: 2px solid #d9dae4;
        text-align: center;
        line-height: 68px;
        img {
          display: inline-block;
          width: 28px;
          height: 28px;
          vertical-align: -4%;
        }
      }
      .tabBtn {
        font-size: 28px;
        font-weight: 600;
        padding-left: 16px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 0;
          width: 8px;
          height: 28px;
          background: #4168f6;
        }
      }
    }
    .cardCode {
      width: 750px;
      // height: 406px;
      // min-height: 382px;
      background: #ffffff;
      margin-top: 16px;
      padding: 24px;
      box-sizing: border-box;
      font-size: 28px;
      .operationTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px;
        position: relative;
        &::after {
          content: '';
          height: 1px;
          width: 750px;
          background: #f0f2f7;
          position: absolute;
          bottom: 0;
          left: -24px;
        }
        .codeName {
          width: 476px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span:nth-child(1) {
            display: inline-block;
            margin-right: 16px;
            color: #838a9d;
          }
        }
        .editBtn {
          color: #838a9d;
          span {
            display: inline-block;
          }
          span:nth-child(1) {
            margin-right: 16px;
          }
          .van-icon {
            vertical-align: -10%;
          }
        }
      }
      .contentBox {
        height: 292px;
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        .leftCode {
          img {
            width: 182px;
            height: 182px;
          }
          .shareCode {
            margin-top: 16px;
            display: flex;
            align-items: center;
            width: 182px;
            height: 48px;
            background: rgba(65, 104, 246, 0.04);
            border-radius: 6px;
            border: 2px solid #4168f6;
            color: #4168f6;
            img {
              width: 24px;
              height: 24px;
              vertical-align: -11%;
            }
          }
        }
        .rightInfo {
          margin-left: 32px;
          .rowText {
            display: flex;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              color: #838a9d;
              text-align: right;
              width: 140px;
              margin-bottom: 15px;
              margin-right: 16px;
            }
            span:nth-child(2) {
              flex: 1;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
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
        height: 944px;
        // padding: 24px;
        .addForm,
        .codeDetail {
          height: 800px;
          box-sizing: border-box;
          padding: 24px;
          font-size: 28px;
          font-weight: 500;
          overflow-y: scroll;
          /deep/.el-form {
            height: 100%;
            .el-form-item {
              display: flex;
              margin-bottom: 26px;
              .editText {
                font-size: 28px;
                line-height: 80px;
              }
            }
            .el-form-item__label {
              width: 155px;
              font-size: 28px;
              line-height: 80px;
              color: #838a9d;
            }
            .el-form-item__content {
              flex: 1;
              height: 80px;

              .el-input__inner {
                height: 80px;
                border-radius: 8px;
                font-size: 28px;
                border: 2px solid #d9dae4;
              }
              .el-select,
              .el-cascader {
                width: 100%;
                // width: 562px;
                height: 80px;
              }
              .el-checkbox {
                width: 100%;
                line-height: 80px;
                .el-checkbox__inner {
                  border: 2px solid #d9dae4;
                  width: 28px;
                  height: 28px;

                  &::after {
                    width: 12px;
                    height: 12px;
                  }
                }
                .el-checkbox__input {
                  vertical-align: -10%;
                }
                .el-checkbox__label {
                  line-height: 80px;
                  font-size: 28px;
                }
              }
            }
            .textareaInput {
              height: 400px;
              .el-textarea {
                .el-textarea__inner {
                  font-size: 28px;
                  height: 400px;
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
        .codeDetail {
          /deep/.el-form {
            .codeImg {
              margin-bottom: 100px !important;
            }
            .el-form-item {
              margin-bottom: 0;
            }
            .el-form-item__label {
              font-size: 24px;
            }
            span {
              font-size: 24px;
              line-height: 80px;
            }
          }
        }
        .buttonWarp {
          display: flex;
          justify-content: space-around;
          font-size: 28px;
          width: 100%;
          position: fixed;
          bottom: 24px;

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