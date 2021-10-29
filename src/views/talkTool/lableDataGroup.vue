
<template>
  <div class="microCode group-setting-warp" v-loading="loading">
    <div class="headerTitleList">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">新增标签建群</span>
    </div>
    <div class="warp_box">
      <!-- 群发设置 -->
      <div class="group-setting">
        <div class="title">标签建群</div>
        <div class="form">
          <el-form ref="form" :rules="rules" :model="baseForm">
            <!-- 任务名称 -->
            <el-form-item label="任务名称:" prop="taskName">
              <el-input
                v-model="baseForm.taskName"
                placeholder="请输入任务名称"
                show-word-limit
                maxlength="30"
                :onkeyup="
                  (baseForm.taskName = baseForm.taskName.replace(/\s+/g, ''))
                "
              ></el-input>
            </el-form-item>
            <!-- 选择员工 -->
            <el-form-item label="选择员工:" prop="staffs">
              <el-select
                class="taskNameselect"
                v-model="baseForm.staffs"
                v-loadmore="loadMore"
                style="width: 100%"
                multiple
                placeholder="请选择群发员工（可多选）"
                @change="staffsListChange"
              >
                <el-option
                  :label="item.name"
                  :value="item.userNo"
                  v-for="item in staffsList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 选择客户 -->
            <el-form-item label="选择客户:" prop="selectCusType">
              <el-radio-group
                v-model="baseForm.selectCusType"
                @change="selecusChange"
              >
                <el-radio :label="2">全部客户</el-radio>
                <el-radio :label="1">筛选客户</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 筛选客户 -->
            <template v-if="baseForm.selectCusType == 1">
              <div class="filterCus">
                <el-form-item label="性别:" prop="cusSex">
                  <el-radio-group v-model="baseForm.cusSex" @change="sexChange">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                    <el-radio :label="0">未知</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="添加时间:"
                  class="tamedata"
                  prop="cusAddTime"
                >
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

                <el-form-item label="客户标签:" prop="includeCus">
                  <div
                    class="select-custom-sign-wrap el-icon-arrow-up"
                    @click="clickCus"
                  >
                    <template v-if="baseForm.includeCus.length > 0">
                      <div
                        class="item"
                        v-for="(item, index) in baseForm.includeCus"
                        :key="`${item.name}-${index}`"
                      >
                        {{ item.name }}
                        <i
                          class="el-icon-close"
                          @click.stop="delCustomSign(item, index)"
                        ></i>
                      </div>
                    </template>
                    <template v-else> 请按照标签筛选客户 </template>
                  </div>
                </el-form-item>
              </div>
            </template>
            <!-- 客户预计数量 -->
            <el-form-item label="">
              预计发送客户数量：{{ estimateCusNum }}
            </el-form-item>

            <!-- 设定时间 -->
            <el-form-item
              v-if="baseForm.sendRule == 2"
              label="设定时间 :"
              prop="sendDateTime"
            >
              <div style="display: flex">
                <div @click="selectDateTime('date')" class="dataTimecss">
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
      <div class="group-content miassContent">
        <div class="title">群发消息</div>
        <div class="tips">
          <span>注意：</span>
          <span
            >客户每个月最多接收来自同一企业的管理员的4条群发消息
            4条消息可在同一天发送</span
          >
        </div>
        <!-- 群发内容 -->
        <el-form
          :model="FormData"
          :rules="rulesCenter"
          ref="form1"
          class="centerListTime"
        >
          <el-form-item label="入群引导语:" prop="sendMsg">
            <el-input
              class="marB-24"
              type="textarea"
              placeholder="请输入入群引导语"
              v-model="FormData.sendMsg"
              maxlength="300"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 附件 -->
        <div class="appendix-list">
          <div
            v-for="(item, index) in appendixList"
            :key="index"
            style="display: flex"
          >
            <div class="qrcode">
              二维码<span>{{ index + 1 }}:</span>
            </div>
            <div class="item marB-24 itemLablewarp">
              <!-- 删除素材 -->
              <div class="delItem" @click="delItem(index, item)">
                <i class="el-icon-delete"></i>
              </div>

              <template>
                <van-uploader
                  v-model="item.picList"
                  :max-count="1"
                  :max-size="2 * 1024 * 1024"
                  @oversize="onOversize"
                  :after-read="
                    afterRead.bind(null, { index: index, data: item })
                  "
                />
                <!-- <span class="updataimg" :click-upload="afterRead">重新上传 </span> -->
                <div class="marB-24 picTipsyo">
                  当前可加用户<span class="picTipsnum">{{
                    item.groupUserNum
                  }}</span
                  >人
                </div>
                <div class="selsctWarpList">
                  <el-select
                    v-model="item.labelTime"
                    placeholder="请选择"
                    @change="labelGroupList(item)"
                  >
                    <el-option
                      v-for="item in labelListTimeData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.chatId"
                    >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- 添加素材 -->
        <div>
          <div class="appendix-add-warp butaddWarp">
            <button class="addAppendix-button NewAddList" @click="addAppendix">
              <i class="el-icon-circle-plus-outline"></i> 新增素材内容
            </button>
          </div>
          <p class="client_send">
            实际发送客户数量:
            <span class="sends_num">{{ fleltDatanum }}</span>
            <span class="colordata">（已在群聊中的客户将不会收到邀请）</span>
          </p>
        </div>

        <!-- 通知成员 -->
        <div class="btn-warp">
          <div class="send-request warpButtonSend" @click="sendRequest">
            通知成员发送
          </div>
        </div>
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
        :max-date="maxDate"
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
          <div class="group-title">{{ item.name }}</div>
          <div class="group-label">
            <div
              class="label-item"
              :class="[signItm.checked ? 'active' : '']"
              @click="clickSign(index, signIdx, signItm.tagid)"
              v-for="(signItm, signIdx) in item.children"
              :key="`${index} - ${signIdx}`"
            >
              {{ signItm.name }}
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
import { Toast } from "vant";
import { Dialog } from "vant";
import { Notify } from "vant";
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
      FormData: {
        sendMsg: "",
      },
      maxDate: new Date(),
      // minDate: new Date(2020, 0, 1),
      dataGroup: [],
      labelListTimeData: [],
      // minDate: new Date(),
      yuangongPage: 1,
      yuangongLimit: 10,
      qunliaoPage: 1,
      qunliaoLimit: 10,
      baseForm: {
        // 群发设置表单
        taskName: "",
        staffs: [],
        selectCusType: "",
        sendRule: "",
        sendDate: "", // formatDate(new Date().getTime(), "yyyy-MM-dd"),
        sendTime: "", //formatDate(new Date().getTime(), "hh:mm"),
        cusSex: null,
        chatGroup: "",
        includeCus: [],
        cusAddBeginTime: "", // formatDate(new Date().getTime(), "yyyy-MM-dd"),
        cusAddEndTime: "", //formatDate(new Date().getTime(), "yyyy-MM-dd"),
      },
      tagidList: [],
      loading: false,
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
      rulesCenter: {
        sendMsg: [
          { required: true, message: "请输入群引导语", trigger: "blur" },
        ],
      },
      estimateCusNum: 0, // 预计客户数量
      staffsList: [
        // {
        //   key: "张三",
        //   value: "张三",
        // },
        // {
        //   key: "张三1",
        //   value: "张三1",
        // },
        // {
        //   key: "张三2",
        //   value: "张三2",
        // },
      ], // 员工列表
      listImg: [],
      urlList: [],
      chatGroupList: [],
      listImgData: {
        url: "",
        objectname: "",
      },

      tagidList: [],
      sendMsg: "",
      appendixList: [
        // {
        //   url: "",
        //   objectname: "",
        //   appendixType: "图片",
        //   picList: [],
        //   href: "",
        //   hrefTitle: "",
        //   hrefDesc: "",
        //   hrefPic: [],
        // },
      ], // 素材列表
      groupUserNum: 0,
      chooseDateTime: false, // 选择日期、时间
      activeChoose: "date", // date || time 当前点击的日期或者时间输入框
      sendDateTime: "", // 日期时间需要的值
      chooseCusSign: false, // 选择客户标签
      tagidList: [],
      highLightArr: [],
      namelabutArr: [],
      arrImgList: [],
      activeIndex: 0,
      labename: [], //获取客户标签内容
      customerstagList: [],
      childTag: [],
      clueCustomerLists: [],
      clueCustomerListsTo: [],
      listAll: [],
      fleltDatanum: 0,
      groupListDataCopy: [],
      cusSignList: [
        // 客户标签列表
        {
          name: "客户管理",
          children: [{ checked: false, name: "222" }],
        },
        {
          name: "111",
          children: [
            { checked: false, name: "333" },
            { checked: false, name: "444" },
          ],
        },
      ],
      activeCusAddChoose: "Begin", // 选择用户添加起止或结束时间标志
      chooseCusAddDate: false, // 选择用户添加起止时间
      cusAddTime: "", // 起止时间需要的值
    };
  },
  watch: {
    // 监听includeCus改变将cusSignList里的checked改为false
    "baseForm.includeCus": {
      handler(val) {
        if (this.cusSignList.length) {
          const valTitle = val.map((item) => item.name);
          this.cusSignList.forEach((item) => {
            item.children.forEach((zitem) => {
              if (valTitle.includes(zitem.name)) {
                zitem.checked = true;
              } else {
                zitem.checked = false;
              }
            });
          });
        }
      },
    },
  },
  created() {
    this.getTagList(); //标签接口
    this.chooseCustomerMass(); //选择员工接口
    this.getGroupInfoList();
  },
  methods: {
    getGroupInfoList() {
      this.$network
        .get("/customer-service/tagEstablishGroup/chooseTagGroupSend")
        .then((res) => {
          this.labelListTimeData = res.data;
          this.groupListDataCopy = res.data;
          console.log(res);
        });
    },
    tagFilterCustomers() {
      this.$network
        .post("/customer-service/tagEstablishGroup/tagFilterCustomers", {
          clueCustomerList: this.clueCustomerLists,
          groupList: this.listAll,
        })
        .then((res) => {
          if (res.result) {
            console.log(res);
            this.clueCustomerListTo = res.data.clueCustomerList;
            this.fleltDatanum = res.data.estimateNum;
          } else {
            Toast("预计发送客户数量不可为空");
          }
          // this.$set(this.fleltDatanum, "showDisabled", true);
        });
    },

    onOversize(file) {
      console.log(file);
      Toast("文件大小不能超过 2M");
    },
    afterRead(event) {
      console.log(event);
    },
    loadMore() {
      this.yuangongPage++;
      this.chooseCustomerMass();
      // this.yuangongPage++;
      // this.chooseCustomerMass();
    },
    // loadMoreGroup() {
    //   console.log("+++");
    //   this.qunliaoPage++;
    //   // this.groupStaffset();
    // },
    afterRead(obj, file) {
      this.loading = true;
      console.log(file, "------------");
      console.log(obj, "------------obj");
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("type", "label");
      formData.append("filetype", "image");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$network
        .post("/common-service/oss/uploadfileparam", formData, config)
        .then((res) => {
          if (res.result) {
            this.loading = false;
            console.log(res, "------------图片");
            obj.data.url = res.data.url;
            obj.data.objectname = res.data.objectname;
          } else {
            Toast("上传失败");
          }

          // this.listImgData.url = res.data.url;
          // this.listImgData.objectname = res.data.objectname;
          // console.log(this.listImgData, "-------11");
          // this.arrImgList.push(this.listImgData);
          // console.log(this.arrImgList, "-----//");
        });
      // console.log(this.listImg, "----222--------");
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },

    labelGroupList(value) {
      console.log(value);
      let list = this.appendixList.map((item) => item.labelTime);
      this.listAll = list;
      // this.listAll = [];
      // console.log(this.labelListTimeData, "------");
      // this.listAll.push(value);
      this.tagFilterCustomers();
      this.labelListTimeData.forEach((item) => {
        if (item.chatId == value.labelTime) {
          value.groupUserNum = item.groupUserNum;

          console.log(item);
        }
      });
    },
    // 选择日期时间公共方法
    selectDateTime(type) {
      this.activeChoose = type;
      this.chooseDateTime = true;
      const { sendDate, sendTime } = this.baseForm;
      this.sendDateTime = type === "date" ? new Date(sendDate) : sendTime;

      // console.log(this.baseForm.sendTime);
    },
    // 选择人员添加时间公共方法
    selectCusDateTime(key) {
      console.log(key);

      this.activeCusAddChoose = key;
      this.chooseCusAddDate = true;
      const { cusAddBeginTime, cusAddEndTime } = this.baseForm;
      this.cusAddTime = new Date(
        key === "Begin" ? cusAddBeginTime : cusAddEndTime
      );
    },
    // 人员添加起止时间确认事件
    confirmCusAddDate(value) {
      // console.log(this.baseForm.cusAddBeginTime);
      // console.log(this.baseForm.cusAddEndTime);
      // this.Screeningcustomer();
      this.baseForm[`cusAdd${this.activeCusAddChoose}Time`] = formatDate(
        new Date(value).getTime(),
        "yyyy-MM-dd"
      );

      // console.log(formatDate(new Date(value).getTime(), "yyyy-MM-dd"));
      // this.baseForm.cusAddBeginTime = time;
      if (this.baseForm.cusAddBeginTime != "" && this.baseForm.cusAddEndTime) {
        this.Screeningcustomer();
      }
      // console.log(this.baseForm.cusAddBeginTime);
      // console.log(this.baseForm.cusAddEndTime);
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
      console.log(this.baseForm.sendDate);
      console.log(this.baseForm.sendTime);
    },
    // 选择素材类型改变
    appendixChange(index, value) {
      const appendixList = this.deepClone(this.appendixList);
      if (value === "图片") {
        appendixList[index] = {
          ...appendixList[index],
          // href: "",
          // hrefTitle: "",
          // hrefDesc: "",
          // hrefPic: [],
          appendixType: "图片",
        };
      } else {
        appendixList[index] = {
          ...appendixList[index],
          // picList: [],
          appendixType: "链接",
        };
      }
      this.$set(this, "appendixList", appendixList);
    },
    // 删除某素材
    delItem(index, item) {
      this.groupListDataCopy.forEach((val) => {
        if (val.chatId == item.labelTime) {
          this.labelListTimeData.push(val);
        }
      });
      this.appendixList.splice(index, 1);
      // this.tagFilterCustomers();
      // this.fleltDatanum = 0;
    },
    // 添加素材
    addAppendix() {
      // if (this.appendixList.length >= 9) {
      //   return;
      // }
      this.appendixList.push({
        appendixType: "图片",
        picList: [],
        href: "",
        hrefTitle: "",
        hrefDesc: "",
        hrefPic: [],
        labelTime: "",
        groupUserNum: 0,
      });
      let tempList = JSON.parse(JSON.stringify(this.labelListTimeData));
      this.appendixList.forEach((val) => {
        tempList.forEach((item, index) => {
          if (val.labelTime == item.chatId) {
            tempList.splice(index, 1);
          }
        });
      });
      this.labelListTimeData = tempList;
    },
    // 点击客户标签打开弹窗
    clickCus() {
      this.chooseCusSign = true;
    },
    // 删除用户标签
    delCustomSign(items, index) {
      console.log(items.tagid);
      // if(item.tagid)
      // this.baseForm.includeCus.splice(index, 1);
      this.highLightArr.forEach((item) => {
        console.log(item, "----------");
        if (item == items.tagid) {
          this.baseForm.includeCus.splice(index, 1);
          this.highLightArr.splice(index, 1);
        }
      });
      this.Screeningcustomer();
      console.log(this.highLightArr, "-------------");
    },
    // 点击标签
    clickSign(index, subindex, tagid) {
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
          // console.log(item.name);
          zitem.checked && checkedSign.push(zitem);
        });
      });
      this.highLightArr = [];
      checkedSign.forEach((item, index) => {
        // this.highLightArr.push(item.tagid);
        console.log(item.tagid);
        // if (item.tagid != item.tagid) {

        this.highLightArr.push(item.tagid);
        // }
      });
      // this.namelabutArr.forEach((item) => {
      //   this.highLightArr.forEach((items) => {
      //     if (item.tagid == items.tagid) {
      //       this.highLightArr.splice(index, 1);
      //     }
      //   });
      // });
      // var nwr = this.highLightArr;
      // let newList = [];
      // newList.push(new Set(this.highLightArr));
      console.log(checkedSign, "---------");
      console.log(this.highLightArr, "-------------------oooo");
      this.baseForm.includeCus = checkedSign;

      this.chooseCusSign = false;
      // this.getTagList();
      this.Screeningcustomer();
    },
    // 通知
    sendRequest() {
      console.log("sendMsg----->", this.sendMsg);
      console.log("baseForm------>", this.baseForm);
      console.log("appendixList------>", this.appendixList);
      let list = this.appendixList.map((item) => {
        return {
          url: item.url,
          Objectname: item.objectname,
          chatId: item.labelTime,
        };
      });
      this.dataGroup = [];
      let templist = this.appendixList.forEach((item) => {
        this.dataGroup.push(item.labelTime);
      });
      // this.appendixList.forEach(item =>{
      //   console.log(item.href)
      // })
      this.urlList = [];
      this.appendixList.forEach((item) => {
        this.urlList.push(item.href);
      });
      console.log(this.urlList, "-------------this.urlList");
      this.$refs["form"].validate((valid) => {
        this.$refs["form1"].validate((valid1) => {
          if (this.fleltDatanum == 0) {
            // this.$confirm("当前全部群可加用户数无法满足筛选条件", "温馨提示", {
            //   confirmButtonText: "确定",
            //   customClass: "clueConfirmClassLable",
            //   showCancelButton: false,
            //   type: "warning",
            // }).then(() => {
            //   this.$message({
            //     type: "error",
            //     message: "请重新删选",
            //   });
            // });
            Dialog.alert({
              title: "温馨提示",
              message: "当前全部群可加用户数无法满足筛选条件",
            }).then(() => {
              // on close
            });
          } else {
            if (valid && valid1) {
              let params = {
                taskName: this.baseForm.taskName,
                massType: "",
                massContent: this.FormData.sendMsg,
                userList: this.baseForm.staffs,
                gender: this.baseForm.cusSex,
                addStartTime: this.baseForm.cusAddBeginTime,
                addEndTime: this.baseForm.cusAddEndTime,
                groupList: this.dataGroup || [],
                lableList: this.highLightArr, //this.customerlistdata || [],
                sendType: this.baseForm.sendRule,
                sendTime: this.baseForm.sendDate + " " + this.baseForm.sendTime,
                urlList: [],
                allCustomer: this.baseForm.selectCusType,
                fileList: list, //[this.listImgData], //this.listImg,
                customerList: this.clueCustomerListTo, //this.clueCustomerLists,
              };

              this.$network
                .post(
                  "/customer-service/tagEstablishGroup/addTagCustomerScreen",
                  params
                )
                .then((res) => {
                  console.log(res);
                  if (res.result) {
                    this.$router.push({ path: "/home" });
                    Notify({ type: "success", message: res.msg });
                  } else {
                    Notify({ type: "danger", message: res.msg });
                  }
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          }
          // if (this.appendixList.length >= 1) {
          //   Toast("请上传素材内容");
          // } else {

          // }
        });
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
        // console.log(typeof []); // --> object
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
    //客户标签列表接口
    getTagList() {
      this.highLightArr = [];
      this.namelabutArr = [];
      this.$network.get("/customer-service/tag/list").then((res) => {
        console.log("------data-----", res.data);
        this.cusSignList = res.data;

        let allChildTag = res.data.map((item) => {
          return item.children;
        });
        let childTag = [].concat.apply([], allChildTag);
        console.log(childTag);
        this.namelabutArr = [].concat.apply([], allChildTag);
        console.log("-----列表----", this.baseForm.includeCus);
        this.baseForm.includeCus.forEach((item) => {
          console.log(item);
          childTag.forEach((chItem, chIndex) => {
            if (item.tagid == chItem.tagid) {
              this.highLightArr.push(chItem);
            }
          });
          // console.log("-----列表----", this.highLightArr);
        });
      });
    },
    // 获取选择群发员工接口
    chooseCustomerMass() {
      this.$network
        .get("/customer-service/tagEstablishGroup/chooseTagCustomerMass", {
          page: this.yuangongPage,
          limit: this.yuangongLimit,
        })
        .then((res) => {
          if (res.data.list == []) {
          } else {
            let tempList = res.data.list;
            let cent = this.staffsList.concat(tempList);
            console.log(cent, "-------");
            this.staffsList = cent;
          }
          // console.log(res);
          // this.staffsList = res.data.list;
        });
    },
    // 选择所在群聊接口
    staffsListChange(value) {
      console.log(value);
      this.baseForm.staffs = value;
      // this.groupStaffset();
      this.Screeningcustomer();
      if (value.length == 0) {
        this.estimateCusNum = 0;
      }
    },
    // groupStaffset(value) {
    //   // let groutList = this.grouprst;
    //   // if (value == false) {
    //   this.$network
    //     .post(
    //       `/customer-service/cluecustomerMass/chooseCustomerGroup`,
    //       // groutList
    //       {
    //         // params: {
    //         page: this.qunliaoPage,
    //         limit: this.qunliaoLimit,
    //         userList: this.baseForm.staffs,
    //         // },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res.data.groupList);
    //       if (res.data.groupList == []) {
    //       } else {
    //         let tempList = res.data.groupList;
    //         let cent = this.chatGroupList.concat(tempList);
    //         console.log(cent);
    //         this.chatGroupList = cent;
    //       }
    //       // this.chatGroupList = res.data.groupList;
    //     });
    //   // }
    // },
    // 选择群聊获取chatid
    chatGroupListChange(value) {
      console.log(value, "-----------选择群聊获取chatid");
      this.baseForm.chatGroup = value;
      this.Screeningcustomer();
    },
    //筛选客户接口
    Screeningcustomer() {
      this.$network
        .post("/customer-service/tagEstablishGroup/tagCustomerScreen", {
          userList: this.baseForm.staffs,
          gender: this.baseForm.cusSex, //性别
          addStarTime: this.baseForm.cusAddBeginTime,
          addEndTime: this.baseForm.cusAddEndTime,
          groupList: this.baseForm.chatGroup || [],
          lableList: this.highLightArr, //this.customerlistdata || [],
        })
        .then((res) => {
          if (res.result) {
            console.log(res);
            this.clueCustomerLists = res.data.clueCustomerList;
            this.estimateCusNum = res.data.estimateNum;
          } else {
            Toast("请选择员工");
          }
        });
    },
    // 选择客户
    selecusChange(value) {
      // if(baseForm.selectCusType )
      console.log(value);
      if (value == 1) {
        this.Screeningcustomer();
      } else {
        (this.baseForm.cusAddBeginTime = ""),
          (this.baseForm.cusAddEndTime = "");
        (this.baseForm.chatGroup = []),
          (this.customerlistdata = []),
          this.Screeningcustomer();
      }
    },
    // 性别
    sexChange(value) {
      console.log(value, "------性别");
      this.baseForm.cusSex = value;
      // if (value == null) {
      this.Screeningcustomer();
      // } else if (value == 0) {
      //   this.Screeningcustomer();
      // } else if (value == 1) {
      //   this.Screeningcustomer();
      // } else if (value == 2) {
      //   this.Screeningcustomer();
      // }
    },
    //时间
    cusAddBeginTimeChange(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="less" scoped>
.btn-warp {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background: #fff;
  width: 100%;
  padding: 24px;
  .send-request {
    height: 80px;
    width: 702px;
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
.butaddWarp {
  margin-bottom: 50px !important;
}
.picTipsnum {
  display: inline-block;
  font-size: 28px;
  color: #3c4353;
  letter-spacing: 0;
  line-height: 40px;
  font-weight: 400;
  margin: 0 5px;
}
.picTipsyo {
  font-size: 28px;
  color: #838a9d;
  letter-spacing: 0;
  line-height: 40px;
  font-weight: 400;
  margin-top: 20px;
}
.qrcode {
  margin-left: 60px;
  margin-right: 20px;
  font-size: 28px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 400;
}
.itemLablewarp {
  width: 510px;
  padding: 30px 20px 0 !important;
}
.selsctWarpList {
  position: absolute;
  top: 34%;
  left: 50%;
  width: 200px;
}
.warpButtonSend {
  width: 702px;
}
.NewAddList {
  margin-left: 180px;
}
.client_send {
  font-size: 28px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 400;
  padding-bottom: 160px;
}
.sends_num {
  font-size: 28px;
  color: #4168f6;
  letter-spacing: 0;
  font-weight: 400;
}
.colordata {
  font-size: 24px;
  color: #c0c4cc;
}

// .dataTimecss {
//   .el-input__suffix {
//     line-height: 82px;
//     .el-input__suffix-inner {
//       font-size: 30px;
//       // line-height: 20px;
//       margin-right: 50px;
//       // display: inline-block;
//       // line-height: 82px;
//     }
//   }
// }
// .tamedata {
//   /deep/.el-form-item__content {
//     .el-input {
//       .el-input__suffix {
//         font-size: 16px !important;
//         .el-input__suffix-inner {
//           font-size: 16px !important;
//         }
//       }
//     }
//   }
// }

// .taskNameselect {
//   .el-input__inner {
//     border: 1px solid #5e5f61 !important;
//   }
// }

// .taskName {
//   .el-input__inner {
//     border: 1px solid #5e5f61;
//   }
// }
.centerListTime {
  /deep/ .el-form-item {
    .el-form-item__label {
      // margin-left: 60px;
    }
    .el-form-item__content {
      width: 520px;
      margin-left: 180px !important;
    }
  }
}

.el-select {
  .el-tag--small {
    height: 50px;
    line-height: 50px;
  }
  .el-tag {
    font-size: 28px;
  }
}
.updataimg {
  position: absolute;
  bottom: 80px;
  font-size: 28px;
  color: #4168f6;
}

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
  .headerTitleList {
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
      padding-left: 135px !important;
      // text-align: center;
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
                border: 1px solid !important;
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
        margin-bottom: 40px;
        /deep/ .el-form-item__label {
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
              background-color: #fafbff;
              border-color: #d9dae4;
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
          width: 530px !important;
          margin-left: 20px;
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
                height: 28px;
                border: 2px solid #d9dae4;
                // border-radius: 100%;
                top: -14px;
                right: -14px;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;

                //               align-items: content;
                //               justify-content: center;
                // background-image: url("../../images/dele.png");
                // background-size: contain;
                // background-repeat: no-repeat;
              }
              //
              .van-icon-cross:before {
                font-size: 34px;
                position: relative;
                right: -6px !important;
                top: -6px !important;
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
      }
    }
    .select-custom-sign-wrap {
      width: 100%;
      min-height: 80px;
      box-sizing: border-box;
      background: #ffffff;
      border: 2px solid #d9dae4 !important;
      color: #c0c4cc;
      border-radius: 5px;
      padding: 10px 30px 10px 15px;
      position: relative;
      display: flex !important;
      align-items: center;
      flex-wrap: wrap;
      .item {
        padding: 8px 16px;
        background: #fafbff;
        height: 48px;
        box-sizing: border-box;
        border: 1px solid #d9dae4;
        border-radius: 8px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #838a9d;
        line-height: 32px;
        font-weight: 400;
        margin-right: 8px;
        .el-icon-close {
          margin-left: 9px;
        }
      }
      &::before {
        content: "\e6e1";
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%) rotateZ(180deg);
        font-size: 12px;
        color: #c0c4cc;
      }
    }
  }
}
</style>
