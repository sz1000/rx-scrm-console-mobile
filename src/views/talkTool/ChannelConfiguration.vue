<template>
  <div class="channelConfig">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">渠道配置</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">全部渠道</div>
      <span class="addBtn"
            @click="addChannel">
        <img src="../../images/icon_add@2x.png"
             alt="" />
        新增
      </span>
    </div>
    <van-list v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad">
      <div class="cardCode"
           v-for="(item, index) in channelList"
           :key="index">
        <div class="operationTop">
          <div class="codeName">
            <span>渠道名称:</span>
            <span>{{ item.name }}</span>
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
        <div class="contentBox"
             @click="channelDetail(item, index)">
          <div class="codeNum">
            <span>活码数:</span>
            <span>{{ item.livecodeSum }}</span>
          </div>
          <div class="codeNum">
            <span>添加客户数:</span>
            <span>{{ item.cusSum }}</span>
          </div>
          <div class="welcomelable">
            <span>渠道欢迎语:</span>
            <span>{{ item.welText }}</span>
          </div>
        </div>
      </div>
    </van-list>
    <div class="bottom_model">
      <van-action-sheet v-model="showAdd"
                        :title="titleName"
                        ref="vantWarp"
                        class="vant_sheet">
        <div class="content">
          <div class="addForm">
            <el-form ref="form"
                     :model="addForm"
                     label-position="right">
              <el-form-item label="渠道名称:"
                            prop="name"
                            :rules="[
                  {
                    required: true,
                    message: '请输入渠道名称',
                    trigger: 'blur',
                  },
                ]">
                <el-input v-model="addForm.name"
                          placeholder="请输入渠道名称"
                          maxlength="15"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="欢迎语:"
                            class="textareaInput">
                <el-input type="textarea"
                          v-model="addForm.welText"
                          placeholder="快来设置欢迎语吧~ 设置个性化欢迎语，扫描该员工活码添加的客户，将自动推送该欢迎语"
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
                        :title="titleName"
                        class="vant_sheet">
        <div class="content">
          <div class="addForm">
            <el-form ref="form"
                     :model="editForm"
                     label-position="right">
              <el-form-item label="渠道名称:"
                            prop="name"
                            :rules="[
                  {
                    required: true,
                    message: '请输入渠道名称',
                    trigger: 'blur',
                  },
                ]">
                <el-input v-model="editForm.name"
                          placeholder="请输入渠道名称"
                          maxlength="15"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="欢迎语:"
                            class="textareaInput">
                <el-input type="textarea"
                          v-model="editForm.welText"
                          placeholder="快来设置欢迎语吧~ 设置个性化欢迎语，扫描该员工活码添加的客户，将自动推送该欢迎语"
                          maxlength="200"
                          show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeEdit()">取消</span>
            <span class="save"
                  @click="saveEdit()">保存</span>
          </div>
        </div>
      </van-action-sheet>
      <van-action-sheet v-model="showDetail"
                        :title="titleName">
        <div class="content">
          <div class="codeDetail">
            <el-form label-position="right"
                     :model="detailForm">
              <el-form-item label="渠道名称:">
                <span>{{ detailForm.name }}</span>
              </el-form-item>
              <el-form-item label="活码数:">
                <span>{{ detailForm.livecodeSum }}</span>
              </el-form-item>
              <el-form-item label="添加客户数:">
                <span>{{ detailForm.cusSum }}</span>
              </el-form-item>
              <el-form-item label="客户最近添加时间:">
                <span>{{
                  formatDate(detailForm.createTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </el-form-item>
              <el-form-item label="渠道创建人:">
                <span>{{ detailForm.createBy }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{
                  formatDate(detailForm.createTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </el-form-item>
              <el-form-item label="渠道欢迎语:">
                <span>{{ detailForm.welText }}</span>
              </el-form-item>
            </el-form>
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
      channelList: [],
      showAdd: false,
      showEdit: false,
      showDetail: false,
      titleName: '',
      addForm: {},
      editForm: {
        chanName: '',
        welcomTxt: '',
      },
      detailForm: {},
      saveEditObj: {},
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数

      docmHeight: 0, //默认屏幕高度
      showHeight: 0, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer,
    }
  },
  watch: {
    showHeight(val) {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    },
  },
  mounted() {
    window.onresize = () =>
      (() => {
        this.showHeight =
          document.getElementsByClassName('vant_sheet ')[0].clientHeight
        // console.log(this.showHeight, this.docmHeight)
      })()
  },
  created() {
    this.getData()
  },
  methods: {
    formatDate,
    onLoad() {
      this.page += 1
      this.getData()
    },
    getData() {
      this.loading = false
      this.$network
        .get('/user-service/channel/getChannelList', {
          page: this.page,
          limit: this.pageSize,
        })
        .then((res) => {
          this.loading = false
          let rows = res.data.channelEntityPage.records //请求返回当页的列表
          this.total = res.data.channelEntityPage.total
          if (rows == null || rows.length === 0) {
            this.finished = true
            return
          }
          let newSetArr = this.channelList.concat(rows)
          this.channelList = this.unique(newSetArr)
          console.log(this.channelList.length, this.total)
          if (this.channelList.length >= this.total) {
            this.finished = true
          } else {
            this.onLoad()
          }
        })
    },
    //去重一次
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
    // saveDialog: _throttle(function () {
    //   // console.log(this.addForm)
    // }),
    saveDialog() {
      if (this.addForm.name == null) {
        this.$message({
          type: 'error',
          message: '请输入渠道名称',
        })
        return
      }
      this.$network
        .post('/user-service/channel/addChannel', this.addForm)
        .then((res) => {
          if (res.result) {
            this.showAdd = false
            // this.page = 1
            this.addForm = {}
            this.getData()
          } else {
            this.$message({
              type: 'error',
              message: res.msg || '保存失败',
            })
          }
        })
    },
    //保存编辑
    saveEdit() {
      // console.log()
      // let params = {
      //   name: this.editForm.chanName,
      //   welText: this.editForm.welcomTxt,
      // }
      this.$network
        .post('/user-service/channel/updChannel', this.editForm)
        .then((res) => {
          if (res.result) {
            this.showEdit = false
            this.channelList = []
            this.page = 1
            this.getData()
          }
        })
    },

    //关闭弹框
    closeEdit() {
      this.showEdit = false
      this.editForm = {}
      this.getData()
    },
    closeDialog() {
      this.showAdd = false
      this.addForm = {}
    },
    goBack() {
      this.$router.go(-1)
    },
    addChannel() {
      this.showAdd = true
      this.titleName = '新增渠道'

      setTimeout(() => {
        this.docmHeight =
          document.getElementsByClassName('vant_sheet ')[0].clientHeight
        console.log(this.docmHeight)
      }, 200)
    },
    editBtn(item, index) {
      // console.log(item)
      this.titleName = '编辑渠道'
      this.showEdit = true
      this.editForm = JSON.parse(JSON.stringify(item))
      // this.editForm.chanName = item.name
      // this.editForm.welcomTxt = item.welText
      // this.saveEditObj = item
      setTimeout(() => {
        this.docmHeight =
          document.getElementsByClassName('vant_sheet ')[0].clientHeight
        console.log(this.docmHeight)
      }, 200)
    },
    channelDetail(item, index) {
      console.log(item)
      this.titleName = '渠道详情'
      this.showDetail = true
      this.detailForm = item
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
          this.$network
            .post('/user-service/channel/delChannel', v)
            .then((res) => {
              if (res.result) {
                this.page = 1
                this.channelList = []
                this.getData()
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg,
                })
              }
            })
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>
<style lang="less" scoped>
.channelConfig {
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
      padding: 24px 0;
      box-sizing: border-box;
      .codeNum {
        width: 50%;
        display: inline-block;
        span {
          display: inline-block;
          margin-bottom: 24px;
        }
        span:nth-child(1) {
          color: #838a9d;
        }
      }

      .welcomelable {
        width: 100%;
        display: flex;
        span:nth-child(1) {
          width: 190px;
          color: #838a9d;
          display: inline-block;
        }
        span:nth-child(2) {
          width: 540px;
          display: inline-block;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          word-break: break-all;
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
      .addForm,
      .codeDetail {
        // height: 800px;
        box-sizing: border-box;
        padding: 24px;
        font-size: 28px;
        font-weight: 500;
        // overflow-y: scroll;
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
            // width: 155px;
            font-size: 28px;
            line-height: 80px;
            color: #838a9d;
          }
          .el-form-item__content {
            flex: 1;
            height: 80px;
            word-break: break-all;
            line-height: 80px;
            .el-input__inner {
              height: 80px;
              border-radius: 8px;
              border: 0;
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
              margin-top: 20px;
              .el-textarea__inner {
                font-size: 28px;
                height: 400px;
                border: 2px solid #d9dae4 !important;
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
        height: 100%;
        /deep/.el-form {
          .el-form-item__label {
            width: 216px;
            font-size: 24px;
            line-height: 80px;
            color: #838a9d;
          }
          .el-form-item {
            margin-bottom: 0;
            span {
              font-size: 24px;
              line-height: 80px;
            }
          }
        }
      }
      .buttonWarp {
        display: flex;
        justify-content: space-around;
        font-size: 28px;
        width: 100%;
        // position: fixed;
        bottom: 24px;
        // margin-top: 80px;

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
@media screen and (min-width: 750px) {
  .van-action-sheet {
    width: 750px;
  }
  .buttonWarp {
    width: 750px !important;
  }
  .van-popup--bottom {
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>