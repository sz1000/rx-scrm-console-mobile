
<template>
  <div class="microCode group-setting-warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">渠道活码</span>
    </div>
    <div class="warp_box">
      <!-- 群发设置 -->
      <div class="group-setting">
        <div class="title">群发设置</div>
        <div class="form">
          <el-form ref="form" :rules="rules" :model="baseForm">
            <!-- 任务名称 -->
            <el-form-item label="任务名称 :" prop="taskName">
              <el-input
                v-model="baseForm.taskName"
                maxlength="10"
                placeholder="请输入任务名称"
                show-word-limit
              ></el-input>
            </el-form-item>
            <!-- 选择员工 -->
            <el-form-item label="选择员工 :" prop="staffs">
              <el-select
                v-model="baseForm.staffs"
                style="width: 100%"
                multiple
                collapse-tags
                placeholder="请选择群发员工（可多选）"
              >
                <el-option
                  :label="item.key"
                  :value="item.value"
                  v-for="item in staffsList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 选择客户 -->
            <el-form-item label="选择客户 :" prop="selectCusType">
              <el-radio-group
                v-model="baseForm.selectCusType"
                @change="
                  baseForm.cusSex = '全部';
                  baseForm.chatGroup = '';
                  baseForm.includeCus = [];
                  baseForm.cusAddEndTime = '';
                  baseForm.cusAddBeginTime = '';
                "
              >
                <el-radio label="全部客户"></el-radio>
                <el-radio label="筛选客户"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 筛选客户 -->
            <template v-if="baseForm.selectCusType === '筛选客户'">
              <div class="filterCus">
                <el-form-item label="性别 :" prop="cusSex">
                  <el-radio-group v-model="baseForm.cusSex">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    <el-radio label="未知"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="添加时间 :" prop="cusAddTime">
                  <div style="display: flex">
                    <div @click="selectCusDateTime('Begin')">
                      <el-input
                        placeholder="请选择日期"
                        class="marR-24"
                        suffix-icon="el-icon-date"
                        readonly
                        v-model="baseForm.cusAddBeginTime"
                      >
                      </el-input>
                    </div>
                    <div class="fillline">-</div>
                    <div @click="selectCusDateTime('End')">
                      <el-input
                        placeholder="请选择日期"
                        suffix-icon="el-icon-date"
                        readonly
                        v-model="baseForm.cusAddEndTime"
                      >
                      </el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="选择群聊 :" prop="chatGroup">
                  <el-select
                    v-model="baseForm.chatGroup"
                    style="width: 100%"
                    placeholder="请选择群聊"
                  >
                    <el-option
                      :label="item.key"
                      :value="item.value"
                      v-for="item in chatGroupList"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="客户标签 :" prop="includeCus">
                  <div style="position: relative">
                    <el-select
                      popper-class="selectCus"
                      style="width: 100%"
                      v-model="baseForm.includeCus"
                      multiple
                      filterable
                      allow-create
                      readonly
                      placeholder="请选择客户标签"
                    >
                    </el-select>
                    <div
                      @click="clickCus"
                      style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 11;
                      "
                    ></div>
                  </div>
                </el-form-item>
              </div>
            </template>
            <!-- 客户预计数量 -->
            <el-form-item label="">
              预计发送客户数量：{{ estimateCusNum }}
            </el-form-item>
            <!-- 发送规则 -->
            <el-form-item label="发送规则 :" prop="sendRule">
              <el-radio-group
                v-model="baseForm.sendRule"
                @change="
                  baseForm.sendDate = '';
                  baseForm.sendTime = '';
                "
              >
                <el-radio label="立即发送"></el-radio>
                <el-radio label="定时发送"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 设定时间 -->
            <el-form-item
              v-if="baseForm.sendRule === '定时发送'"
              label="设定时间 :"
              prop="sendDateTime"
            >
              <div style="display: flex">
                <div @click="selectDateTime('date')">
                  <el-input
                    placeholder="请选择日期"
                    class="marR-24 selectDate"
                    suffix-icon="el-icon-date"
                    readonly
                    v-model="baseForm.sendDate"
                  >
                  </el-input>
                </div>
                <div @click="selectDateTime('time')">
                  <el-input
                    placeholder="请选择时间"
                    suffix-icon="el-icon-time"
                    readonly
                    v-model="baseForm.sendTime"
                  >
                  </el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 群发消息 -->
      <div class="group-content">
        <div class="title">群发消息</div>
        <div class="tips">
          <span>注意：</span>
          <span
            >客户每个月最多接收来自同一企业的管理员的4条群发消息
            4条消息可在同一天发送</span
          >
        </div>
        <!-- 群发内容 -->
        <div class="txt-28 marB-24">群发内容：</div>
        <el-input
          class="marB-24"
          type="textarea"
          placeholder="请输入群发内容"
          v-model="sendMsg"
          maxlength="500"
          show-word-limit
        >
        </el-input>
        <!-- 附件 -->
        <div class="appendix-list">
          <div
            class="item marB-24"
            v-for="(item, index) in appendixList"
            :key="index"
          >
            <!-- 删除素材 -->
            <div class="delItem" @click="delItem(index)">
              <i class="el-icon-delete"></i>
            </div>
            <!-- 选择素材类型 -->
            <div class="appendixType">
              <span class="_t txt-28"> 选择素材类型 </span>
              <el-radio-group
                class="radio"
                @change="appendixChange(index, $event)"
                v-model="item.appendixType"
              >
                <el-radio label="图片"></el-radio>
                <el-radio label="链接"></el-radio>
              </el-radio-group>
            </div>
            <!-- 图片 -->
            <template v-if="item.appendixType === '图片'">
              <van-uploader v-model="item.picList" :max-count="1" />
              <div class="picTips marB-24">
                建议上传大小不超过2MB的图片，格式支持jpeg、jpg、png
              </div>
            </template>
            <!-- 链接 -->
            <template v-if="item.appendixType === '链接'">
              <el-input
                class="marB-24"
                v-model="item.href"
                placeholder="链接地址请以http或https开头"
              ></el-input>
              <el-form ref="form" :model="item">
                <!-- <el-form-item label="链接标题 :">
                  <el-input
                    v-model="item.hrefTitle"
                    placeholder="请输入链接标题"
                  ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="链接摘要 :">
                  <el-input
                    v-model="item.hrefDesc"
                    placeholder="请输入链接摘要"
                  ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="链接封面 :">
                  <van-uploader v-model="item.hrefPic" :max-count="1" />
                </el-form-item> -->
              </el-form>
            </template>
          </div>
        </div>
        <!-- 添加素材 -->
        <div class="appendix-add-warp">
          <button class="addAppendix-button" @click="addAppendix">
            <i class="el-icon-circle-plus-outline"></i> 新增素材内容
          </button>
          <span class="add-tips" style="margin-left: 24px"
            >（最多可添加9个附件）</span
          >
        </div>
        <!-- 通知成员 -->
        <span class="sendRequest" @click="sendRequest">通知成员发送</span>
      </div>
    </div>
    <!-- 日期、时间选择框 -->
    <van-popup v-model="chooseDateTime" position="bottom">
      <van-datetime-picker
        @cancel="chooseDateTime = false"
        v-model="sendDateTime"
        :type="activeChoose"
        @confirm="confirmDateTime"
        :title="activeChoose === 'date' ? '选择年月日' : '选择时间'"
      />
    </van-popup>
    <!-- 用户添加起止时间 -->
    <van-popup v-model="chooseCusAddDate" position="bottom">
      <van-datetime-picker
        @cancel="chooseCusAddDate = false"
        v-model="cusAddTime"
        type="date"
        @confirm="confirmCusAddDate"
        title="选择年月日"
      />
    </van-popup>
    <!-- 选择客户标签 -->
    <van-popup
      class="choose-cus-popup"
      v-model="chooseCusSign"
      position="bottom"
    >
      <!-- 标题 -->
      <div class="_top">
        <div class="fill"></div>
        <div>选择客户标签</div>
        <div class="fill" @click="chooseCusSign = false">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <!-- 标签组 -->
      <div class="_center">
        <div class="_item" v-for="(item, index) in cusSignList" :key="index">
          <div class="group-title">{{ item.title }}</div>
          <div class="group-label">
            <div
              class="label-item"
              :class="[signItm.checked ? 'active' : '']"
              @click="clickSign(index, signIdx)"
              v-for="(signItm, signIdx) in item.children"
              :key="`${index} - ${signIdx}`"
            >
              {{ signItm.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="_bottom">
        <div class="_button cancel" @click="chooseCusSign = false">取消</div>
        <div class="_button save" @click="saveCus">保存</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { formatDate } from "../../utils/tool.js";
export default {
  data() {
    var validateSendDateTime = (rule, value, callback) => {
      if (this.baseForm.sendRule === "立即发送") {
        callback();
      } else {
        if (this.baseForm.sendDate === "" || this.baseForm.sendTime === "") {
          callback(new Error("请选择发送日期和时间"));
        }
        callback();
      }
    };
    return {
      baseForm: {
        // 群发设置表单
        taskName: "",
        staffs: [],
        selectCusType: "全部客户",
        sendRule: "立即发送",
        sendDate: "",
        sendTime: "",
        cusSex: "全部",
        chatGroup: "",
        cusAddBeginTime: "",
        cusAddEndTime: "",
      },
      rules: {
        // 表单规则
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        staffs: [{ required: true, message: "请选择员工", trigger: "change" }],
        selectCusType: [
          { required: true, message: "请选择客户", trigger: "change" },
        ],
        sendRule: [
          { required: true, message: "请选择发送规则", trigger: "change" },
        ],
        sendDateTime: [{ validator: validateSendDateTime, trigger: "change" }],
      },
      estimateCusNum: 0, // 预计客户数量
      staffsList: [
        {
          key: "张三",
          value: "张三",
        },
      ], // 员工列表
      chatGroupList: [],
      sendMsg: "",
      appendixList: [
        {
          appendixType: "图片",
          picList: [],
          href: "",
          hrefTitle: "",
          hrefDesc: "",
          hrefPic: [],
        },
      ], // 素材列表
      chooseDateTime: false, // 选择日期、时间
      activeChoose: "date", // date || time 当前点击的日期或者时间输入框
      sendDateTime: "", // 日期时间需要的值
      chooseCusSign: false, // 选择客户标签
      cusSignList: [
        // 客户标签列表
        {
          title: "客户管理",
          children: [{ checked: false, title: "222" }],
        },
        {
          title: "111",
          children: [
            { checked: false, title: "333" },
            { checked: false, title: "444" },
          ],
        },
      ],
      activeCusAddChoose: "Begin", // 选择用户添加起止或结束时间标志
      chooseCusAddDate: false, // 选择用户添加起止时间
      cusAddTime: "", // 起止时间需要的值
    };
  },
  methods: {
    // 返回
    goBack() {},
    // 选择日期时间公共方法
    selectDateTime(type) {
      this.activeChoose = type;
      this.chooseDateTime = true;
      const { sendDate, sendTime } = this.baseForm;
      this.sendDateTime = type === "date" ? sendDate : sendTime;
    },
    // 选择人员添加时间公共方法
    selectCusDateTime(key) {
      this.activeCusAddChoose = key;
      this.chooseCusAddDate = true;
      const { cusAddBeginTime, cusAddEndTime } = this.baseForm;
      this.cusAddTime = key === "Begin" ? cusAddBeginTime : cusAddEndTime;
    },
    // 人员添加起止时间确认事件
    confirmCusAddDate(value) {
      this.baseForm[`cusAdd${this.activeCusAddChoose}Time`] = formatDate(
        new Date(value).getTime(),
        "yyyy-MM-dd"
      );
      this.chooseCusAddDate = false;
    },
    // 日期、时间选择框确认事件
    confirmDateTime(value) {
      if (this.activeChoose === "date") {
        this.baseForm.sendDate = formatDate(
          new Date(value).getTime(),
          "yyyy-MM-dd"
        );
      } else {
        this.baseForm.sendTime = value;
      }
      this.chooseDateTime = false;
    },
    // 选择素材类型改变
    appendixChange(index, value) {
      const appendixList = this.deepClone(this.appendixList);
      if (value === "图片") {
        appendixList[index] = {
          ...appendixList[index],
          appendixType: "图片",
        };
      } else {
        appendixList[index] = {
          ...appendixList[index],
          appendixType: "链接",
        };
      }
      this.$set(this, "appendixList", appendixList);
    },
    // 删除某素材
    delItem(index) {
      this.appendixList.splice(index, 1);
    },
    // 添加素材
    addAppendix() {
      if (this.appendixList.length >= 9) {
        return;
      }
      this.appendixList.push({
        appendixType: "图片",
        picList: [],
        href: "",
        hrefTitle: "",
        hrefDesc: "",
        hrefPic: [],
      });
    },
    // 点击客户标签打开弹窗
    clickCus() {
      this.chooseCusSign = true;
    },
    // 点击标签
    clickSign(index, subindex) {
      const cusSignList = this.deepClone(this.cusSignList);
      let checked = cusSignList[index].children[subindex].checked;
      if (checked) {
        cusSignList[index].children[subindex].checked = false;
      } else {
        cusSignList[index].children[subindex].checked = true;
      }
      this.$set(this, "cusSignList", cusSignList);
    },
    // 保存客户标签
    saveCus() {
      let checkedSign = [];
      this.cusSignList.forEach((item) => {
        item.children.forEach((zitem) => {
          zitem.checked && checkedSign.push(zitem.title);
        });
      });
      this.baseForm.includeCus = checkedSign;
      this.chooseCusSign = false;
    },
    // 通知
    sendRequest() {
      console.log("sendMsg----->", this.sendMsg);
      console.log("baseForm------>", this.baseForm);
      console.log("appendixList------>", this.appendixList);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deepClone(o) {
      // 判断如果不是引用类型，直接返回数据即可
      if (
        typeof o === "string" ||
        typeof o === "number" ||
        typeof o === "boolean" ||
        typeof o === "undefined"
      ) {
        return o;
      } else if (Array.isArray(o)) {
        // 如果是数组，则定义一个新数组，完成复制后返回
        // 注意，这里判断数组不能用typeof，因为typeof Array 返回的是object
        console.log(typeof []); // --> object
        var _arr = [];
        o.forEach((item) => {
          _arr.push(item);
        });
        return _arr;
      } else if (typeof o === "object") {
        var _o = {};
        for (let key in o) {
          _o[key] = deepClone(o[key]);
        }
        return _o;
      }
    },
  },
};
</script>
<style lang="less">
.el-select-dropdown.selectCus {
  display: none !important;
}
.microCode.group-setting-warp {
  font-family: PingFangSC-Regular !important;
  .el-radio__input.is-checked + .el-radio__label {
    color: #4168f6;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #4168f6;
    background: #4168f6;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #4168f6;
  }
  .fillline {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }
  .txt-28 {
    font-size: 28px;
  }
  .marB-24 {
    margin-bottom: 24px;
  }
  .marR-24 {
    margin-right: 24px;
  }
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
  .choose-cus-popup {
    border-radius: 16px 16px 0 0;
    ._top {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 24px;
      justify-content: space-between;
      height: 88px;
      background: #fafbff;
      border-radius: 16px 16px 0 0;
      line-height: 88px;
      text-align: center;
      font-size: 28px;
      color: #3c4353;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
      position: relative;
      border-bottom: 1px solid #f0f2f7;
      .fill {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 32px;
      }
    }
    ._center {
      box-sizing: border-box;
      padding: 24px;
      min-height: 740px;
      ._item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        .group-title {
          height: 68px;
          line-height: 68px;
          width: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28px;
          color: #3c4353;
          font-weight: 500;
          margin-right: 32px;
        }
        .group-label {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .label-item {
            box-sizing: border-box;
            margin-bottom: 16px;
            height: 68px;
            background: #fafbff;
            border: 1px solid #d9dae4;
            border-radius: 8px;
            line-height: 68px;
            padding: 0 16px;
            font-size: 28px;
            color: #838a9d;
            font-weight: 400;
            margin-right: 16px;
            &.active {
              background: #4168f6;
              border: none;
              color: #fff;
            }
          }
        }
      }
    }
    ._bottom {
      padding: 0 24px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ._button {
        width: calc((100% - 24px) / 2);
        height: 80px;
        box-sizing: border-box;
        line-height: 80px;
        font-size: 28px;
        text-align: center;
        border-radius: 8px;
        font-weight: 400;
        &.cancel {
          border: 1px solid #4168f6;
          color: #4168f6;
        }
        &.save {
          color: #fff;
          background: #4168f6;
        }
      }
    }
  }
  .van-picker__toolbar {
    height: 88px;
    .van-picker__cancel,
    .van-picker__confirm,
    .van-picker__title {
      font-size: 28px;
    }
    .van-picker__title {
      line-height: 88px;
      height: 88px;
    }
  }
  .warp_box {
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 24px 12px;
    .el-radio-group {
      .el-radio {
        line-height: 28px;
      }
      .el-radio__input {
        .el-radio__inner {
          width: 28px;
          height: 28px;
          &::after {
            width: 10px;
            height: 10px;
          }
        }
      }
      .el-radio__label {
        font-size: 28px;
      }
    }
    .el-input__inner,
    .el-radio-button__inner,
    .el-radio-group {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      &.el-input__inner .el-input__suffix {
        .el-input__count {
          font-size: 28px !important;
          color: #c0c4cc;
        }
      }
    }
    .filterCus {
      padding: 24px 0;
      padding-right: 12px;
      margin-bottom: 30px;
      box-sizing: border-box;
      border: 1px solid #d9dae4;
      background-color: #fafbff;
      border-radius: 8px;
    }
    .el-form-item {
      margin-bottom: 30px;
      .el-form-item__label {
        line-height: 80px;
        font-size: 28px;
        width: 155px;
        white-space: nowrap;
      }
      .el-form-item__content {
        margin-left: 155px;
        font-size: 28px;
        .el-select__tags {
          .el-tag--small {
            height: 48px;
            padding: 0 16px;
            line-height: 48px;
          }
          .el-tag {
            &:first-child {
              margin-left: 16px;
            }
          }
          .el-tag .el-icon-close {
            width: 28px;
            height: 28px;
            background: transparent;
            &::before {
              color: #c0c4cc;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .selectDate {
        width: 307px;
      }
    }
    .group-setting,
    .group-content {
      .title {
        padding-left: 20px;
        position: relative;
        height: 40px;
        font-family: PingFangSC-Medium !important;
        font-size: 28px;
        color: #3c4353;
        letter-spacing: 0;
        font-weight: 500;
        line-height: 40px;
        &::before {
          content: "";
          display: block;
          width: 8px;
          height: 28px;
          background-color: #4168f6;
          left: 0;
          top: 50%;
          margin-top: -14px;
          position: absolute;
        }
      }
    }
    .group-setting {
      .title {
        margin-bottom: 24px;
      }
    }
    .group-content {
      .title {
        margin-bottom: 12px;
      }
      .tips {
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        margin-bottom: 24px;
        span {
          display: block;
          font-size: 24px;
          color: #c0c4cc;
          letter-spacing: 0;
          font-weight: 400;
          line-height: 32px;
          &:first-child {
            white-space: nowrap;
          }
        }
      }
      .el-textarea__inner {
        padding: 24px;
        font-size: 28px;
        line-height: 30px;
        min-height: 400px !important;
      }
      .appendix-list {
        .item {
          padding: 0 24px;
          box-sizing: border-box;
          border-radius: 8px;
          border: 1px solid #d9dae4;
          position: relative;
          .appendixType {
            display: flex;
            align-items: center;
            ._t {
              margin-right: 24px;
            }
          }
          .delItem {
            position: absolute;
            top: 24px;
            right: 24px;
            font-size: 32px;
          }
          .van-uploader {
            .van-uploader__upload,
            .van-uploader__preview {
              margin: 0 24px 0 0;
            }
            .van-uploader__upload,
            .van-uploader__preview .van-uploader__preview-image {
              width: 182px;
              height: 182px;
            }
            .van-uploader__upload-icon {
              font-size: 36px;
            }
            .van-uploader__preview-delete {
              width: 28px;
              height: 28px;
              border: 2px solid #d9dae4;
              border-radius: 50%;
              top: -14px;
              right: -14px;
              background-color: #fff;
            }
            .van-icon-cross:before {
              font-size: 34px;
              position: relative;
              right: -2px;
              top: -2px;
              color: #d9dae4;
            }
          }
          .picTips {
            margin-top: 24px;
            font-size: 24px;
            color: #c0c4cc;
            letter-spacing: 0;
            font-weight: 400;
          }
        }
      }
      .appendix-add-warp {
        margin-bottom: 103px;
        display: flex;
        align-items: center;
        .addAppendix-button {
          padding: 0 24px;
          box-sizing: border-box;
          height: 68px;
          background: rgba(65, 104, 246, 0.04);
          border: 1px solid #4168f6;
          border-radius: 8px;
          line-height: 68px;
          font-size: 28px;
          color: #4168f6;
          letter-spacing: 0;
          font-weight: 400;
        }
        .add-tips {
          font-size: 28px;
          color: #c0c4cc;
        }
      }
      .el-button {
        padding: 14px 24px;
        font-size: 28px;
        color: #4168f6;
        border-color: #4168f6;
      }
      .sendRequest {
        height: 80px;
        background: #4168f6;
        border-radius: 8px;
        line-height: 80px;
        text-align: center;
        border-radius: 8px;
        font-size: 28px;
        color: #ffffff;
        display: block;
      }
    }
  }
}
</style>
