<template>
  <div class="microCode">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">渠道活码</span>
    </div>
    <div class="tabMenu">
      <!-- <div class="tabBtn">全部活码</div> -->
      <div class="tabBtn">
        <span :class="{ active: type == 1 }" class="mycule" @click="tabClick(1)"
          >我的活码</span
        >
        <span
          :class="{ active: type == 2 }"
          class="mycule"
          v-show="showAll !== 'employee'"
          @click="tabClick(2)"
          >全部活码</span
        >
      </div>
      <span
        class="addBtn"
        @click="addCode"
        v-show="type == 1 && mylist.some((item) => item.enName == 'add')"
      >
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span>
      <!-- <span class="addBtn" @click="addCode">
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span> -->
      <span
        class="addBtn"
        @click="addCode"
        v-show="type == 2 && alllist.some((item) => item.enName == 'add')"
      >
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span>
    </div>
    <div class="searchInput">
      <input
        type="text"
        class="input"
        v-model="inputValue"
        placeholder="请输入活码名称"
      />
      <span class="searchBtn" @click="inquire">查询</span>
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        ref="vanlist"
        :offset="20"
      >
        <div class="cardCode" v-for="(item, index) in liveList" :key="index">
          <div class="operationTop">
            <div class="codeName">
              <span>活码名称:</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="editBtn" v-show="type == 1">
              <span
                @click="editBtn(item)"
                v-show="mylist.some((item) => item.enName == 'edit')"
              >
                <van-icon
                  name="
                    edit"
                />
                编辑
              </span>
              <span
                @click="deleteBtn(item)"
                v-show="mylist.some((item) => item.enName == 'delete')"
              >
                <van-icon name="delete-o" />
                删除
              </span>
            </div>
            <div class="editBtn" v-show="type == 2">
              <span
                @click="editBtn(item)"
                v-show="alllist.some((item) => item.enName == 'edit')"
              >
                <van-icon name="edit" />
                编辑
              </span>
              <span
                @click="deleteBtn(item)"
                v-show="alllist.some((item) => item.enName == 'delete')"
              >
                <van-icon name="delete-o" />
                删除
              </span>
            </div>
          </div>
          <div class="contentBox">
            <div class="leftCode">
              <img :src="item.address" alt="" />
              <div class="shareCode" @click="sendCode(item, index)">
                <!-- <span> <img src="../../images/send.png"
                       alt=""></span> -->
                查看二维码
              </div>
            </div>
            <div class="rightInfo" @click="checkDetail(item, index)">
              <div class="rowText">
                <span>渠道:</span>
                <span>{{ item.chName }}</span>
              </div>
              <div class="rowText">
                <span>创建人员:</span>
                <span>{{ item.createBy }}</span>
              </div>
              <div class="rowText">
                <span>创建时间:</span>
                <span>{{
                  formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </div>
              <div class="rowText">
                <span>使用员工:</span>
                <span>{{ item.userNames }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="bottom_model">
      <div v-if="showAdd">
        <van-action-sheet
          v-model="showAdd"
          :title="titleName"
          :overlay="overlay"
          lock-scroll
          :get-container="getContainer"
          class="vant_sheet"
        >
          <div class="content">
            <div class="addForm">
              <el-form ref="form" :model="addForm" label-position="right">
                <el-form-item
                  label="活码名称:"
                  prop="name"
                  :rules="[
                    {
                      required: true,
                      message: '请输入活码名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.trim="addForm.name"
                    placeholder="请输入"
                    maxlength="12"
                    show-word-limit
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="使用员工:"
                  prop="userArr"
                  :rules="[
                    { required: true, message: '请选择', trigger: 'change' },
                  ]"
                >
                  <el-select
                    v-model="addForm.userArr"
                    placeholder="请选择使用员工，可多选"
                    multiple
                    collapse-tags
                    @change="changeUsre"
                    popper-append-to-body
                    clearable
                    popper-class="popper-select-class"
                  >
                    <el-option
                      v-for="item in usreList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.userNo"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="添加设置:">
                  <el-checkbox
                    v-model="addForm.status"
                    true-label="1"
                    false-label="0"
                    @change="checkChange"
                    >设置添加时无需经过确认自动成为好友</el-checkbox
                  >
                </el-form-item>

                <el-form-item
                  label="渠道:"
                  prop="chId"
                  :rules="[
                    { required: true, message: '请选择', trigger: 'change' },
                  ]"
                >
                  <el-select
                    v-model="addForm.chId"
                    placeholder="请选择"
                    @change="changeChannel"
                    clearable
                    popper-class="popper-select-class"
                  >
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.chId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注:" class="textareaInput">
                  <el-input
                    type="textarea"
                    v-model="addForm.remark"
                    placeholder="请输入文字(不得超过200个字符)"
                    maxlength="200"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="buttonWarp" slot="footer">
              <span class="cancel" @click="closeDialog()">取消</span>
              <span class="save" @click="saveDialog()">保存</span>
            </div>
          </div>
        </van-action-sheet>
      </div>
      <div v-if="showEdit">
        <van-action-sheet
          v-model="showEdit"
          :title="titleName"
          :overlay="overlay"
          lock-scroll
          :get-container="getContainer"
          class="vant_sheet"
        >
          <div class="content">
            <div class="addForm">
              <el-form ref="form" :model="editForm" label-position="right">
                <el-form-item label="创建人员:">
                  <span class="editText">{{ editForm.createBy }}</span>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <span class="editText">{{
                    formatDate(editForm.createTime, "yyyy-MM-dd hh:mm:ss")
                  }}</span>
                </el-form-item>
                <el-form-item
                  label="活码名称:"
                  prop="name"
                  :rules="[{ required: true, message: '请输入活码名称' }]"
                >
                  <el-input
                    v-model.trim="editForm.name"
                    placeholder="请输入"
                    maxlength="12"
                    show-word-limit
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="使用员工:"
                  prop="userArr"
                  :rules="[{ required: true, message: '请选择' }]"
                >
                  <el-select
                    v-model="editForm.userArr"
                    placeholder="请选择使用员工，可多选"
                    multiple
                    collapse-tags
                    @change="changeUsre"
                    popper-append-to-body
                    clearable
                    popper-class="popper-select-class"
                  >
                    <el-option
                      v-for="item in usreList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.userNo"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="添加设置:">
                  <el-checkbox
                    v-model="editForm.status"
                    true-label="1"
                    false-label="0"
                    @change="checkChange"
                    >设置添加时无需经过确认自动成为好友</el-checkbox
                  >
                </el-form-item>
                <el-form-item
                  label="渠道:"
                  prop="chId"
                  :rules="[
                    { required: true, message: '请选择', trigger: 'change' },
                  ]"
                >
                  <el-select
                    v-model="editForm.chId"
                    placeholder="请选择"
                    @change="changeChannel"
                    clearable
                    popper-class="popper-select-class"
                  >
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.chId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注:" class="textareaInput">
                  <el-input
                    type="textarea"
                    v-model="editForm.remark"
                    placeholder="请输入文字(不得超过200个字符)"
                    maxlength="200"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="buttonWarp2">
              <span class="cancel" @click="closeDialog()">取消</span>
              <span class="save" @click="saveEdit('form')">保存</span>
            </div>
          </div>
        </van-action-sheet>
      </div>
      <van-action-sheet
        v-model="showDetail"
        :title="titleName"
        :overlay="overlay"
      >
        <div class="content">
          <div class="codeDetail">
            <el-form label-position="right" :model="detailForm">
              <el-form-item label="活码展示:" class="codeImg">
                <img :src="detailForm.address" alt="" />
              </el-form-item>
              <el-form-item label="活码名称:">
                <span>{{ detailForm.name }}</span>
              </el-form-item>
              <el-form-item label="使用员工:">
                <span>{{ detailForm.userNames }}</span>
              </el-form-item>
              <el-form-item label="创建人员:">
                <span>{{ detailForm.createBy }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{
                  formatDate(detailForm.createTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </el-form-item>
              <el-form-item label="渠道:">
                <span>{{ detailForm.chName }}</span>
              </el-form-item>
              <el-form-item label="备注:" class="remark">
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
import { formatDate, _throttle } from "../../utils/tool";
import MyMixin from "../../mixins/permissionsList";
export default {
  mixins: [MyMixin],
  data() {
    return {
      showAll: true,
      type: 1,
      inputValue: "",
      liveList: [],
      showAdd: false,
      showEdit: false,
      showDetail: false,
      titleName: "",
      addForm: {
        name: "",
        userArr: [],
        status: "1",
        chId: "",
        remark: "",
      },
      editForm: {
        name: "",
        userArr: [],
        status: "1",
        chId: "",
        remark: "",
      },
      detailForm: {},
      usreList: [],
      channelList: [],
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      overlay: true,
      docmHeight: 0, //默认屏幕高度
      showHeight: 0, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer,
      mylist: [],
      alllist: [],
    };
  },
  watch: {
    showHeight(val) {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
    inputValue(val) {
      if (val == "") {
        this.getData();
      }
    },
  },
  mounted() {
    // console.log('--this.expandedKeys--', this.expandedKeys, this.type)
    for (var i in this.expandedKeys) {
      if (this.expandedKeys[i].enName == "myLivecode") {
        this.mylist = this.expandedKeys[i].childrenList;
      } else {
        this.alllist = this.expandedKeys[i].childrenList;
      }
    }
    window.onresize = () =>
      (() => {
        this.showHeight =
          document.getElementsByClassName("vant_sheet ")[0].clientHeight;
      })();
  },
  created() {
    this.page = 1;
    this.getUserAuth();
    this.getData();
  },
  methods: {
    formatDate,
    getUserAuth() {
      this.$network.get("/user-service/m/user/getuserrole").then((res) => {
        this.showAll = res.data.code;
      });
    },
    tabClick(v) {
      this.type = v;
      this.page = 1;
      this.liveList = [];
      this.inputValue = "";
      this.getData();
    },

    inquire: _throttle(function () {
      this.page = 1;
      this.liveList = [];
      this.getData();
    }, 3000),

    getContainer() {
      return document.querySelector(".bottom_model");
    },
    onLoad() {
      this.page++;
      this.getData();
    },
    getData() {
      this.$toast.loading({
        overlay: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$network
        .get("/user-service/livecode/getLivecodeList", {
          page: this.page,
          limit: this.pageSize,
          livename: this.inputValue,
          type: this.type,
        })
        .then((res) => {
          this.$toast.clear();
          this.loading = false;
          let rows = res.data.iPage.records; //请求返回当页的列表
          this.total = res.data.iPage.total;
          if (rows == null || rows.length === 0) {
            this.finished = true;
            return;
          }
          // this.liveList = this.liveList.concat(rows)
          let newSetArr = this.liveList.concat(rows);
          this.liveList = this.unique(newSetArr);
          if (this.liveList.length >= this.total) {
            this.finished = true;
          } else {
            this.onLoad();
          }
        });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    goBack() {
      this.$router.push("/home");
    },
    addCode() {
      this.showAdd = true;
      this.addForm.status = "1";
      this.titleName = "新增企微活码";
      // this.$nextTick(() => {
      this.getSelect();
      // })
      setTimeout(() => {
        this.docmHeight =
          document.getElementsByClassName("vant_sheet ")[0].clientHeight;
      }, 200);
    },
    getSelect() {
      this.$network.get("/user-service/livecode/toadd").then((res) => {
        this.usreList = res.data.userlist;
        this.channelList = res.data.chlist;
      });
    },
    changeUsre(val) {
      console.log(document.getElementsByClassName("popper-select-class"));

      this.addForm.userArr = val;
    },
    checkChange(val) {
      // console.log(val)
    },
    editBtn(v) {
      // console.log(this.editForm)
      this.titleName = "编辑企微活码";
      this.showEdit = true;
      this.editForm = JSON.parse(JSON.stringify(v));
      this.editForm.status = this.editForm.status.toString();
      this.$network.get("/user-service/livecode/toadd").then((res) => {
        this.usreList = res.data.userlist;
        this.channelList = res.data.chlist;
        let tempArr = v.userNames.split(",");
        // console.log('----tempArr', tempArr)
        let finalArr = this.usreList.filter(
          (item) => tempArr.indexOf(item.name) > -1
        );
        this.editForm.userArr = finalArr.map((item) => {
          return item.userNo;
        });
        // console.log('----finalArr', finalArr)
        // console.log('----finalArr', this.editForm.userArr)
      });
      setTimeout(() => {
        this.docmHeight =
          document.getElementsByClassName("vant_sheet ")[0].clientHeight;
      }, 500);
    },
    sendCode(item, index) {
      var a = document.createElement("a");
      a.download = "";
      a.href = item.address;
      a.click();
    },

    checkDetail(item, index) {
      // console.log(item)
      this.titleName = "企微活码详情";
      this.showDetail = true;
      this.detailForm = item;
    },
    deleteBtn(v) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "删除后将不可恢复，是否确认删除？",
          className: "deleteBtn",
          confirmButtonText: "是",
          cancelButtonText: "否",
          messageAlign: "left",
        })
        .then(() => {
          this.$network
            .post("/user-service/livecode/delLivecode", v)
            .then((res) => {
              if (res.result) {
                this.page = 1;
                this.liveList = [];
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    changeChannel() {},
    closeDialog() {
      this.showAdd = false;
      this.showEdit = false;
    },
    saveDialog: _throttle(function () {
      // console.log(this.addForm)
      let params = {
        livecodeEntity: { ...this.addForm },
        userArr: this.addForm.userArr,
      };
      this.$network
        .post("/user-service/livecode/addLivecode", params)
        .then((res) => {
          if (res.result) {
            this.page = 1;
            this.showAdd = false;
            this.liveList = [];
            this.addForm = {};
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: res.msg || "保存失败",
            });
          }
        });
    }, 5000),
    saveEdit: _throttle(function () {
      // console.log(this.editForm)
      let params = {
        livecodeEntity: { ...this.editForm },
        userArr: this.editForm.userArr,
      };

      this.$network
        .post("/user-service/livecode/updLivecode", params)
        .then((res) => {
          if (res.result) {
            this.page = 1;
            this.showEdit = false;
            this.liveList = [];
            this.editForm = {};
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: res.msg || "修改失败",
            });
          }
        });
    }, 5000),
    fnChangeUser(val) {
      console.log(val);
    },
    sendMessage(mediaid) {
      this.$network
        .get("/user-service/user/getticket", {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              "sendChatMessage",
              "invoke",
              "agentConfig",
              "checkJsApi",
            ],
          });
          var that = this;
          wx.ready(function () {
            wx.invoke(
              "agentConfig",
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + "",
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: ["sendChatMessage", "getContext", "invoke"],
              },
              function (res) {
                wx.invoke(
                  "sendChatMessage",
                  {
                    msgtype: "image", //消息类型，必填
                    text: {
                      content: "你好", //文本内容
                    },
                    image: {
                      mediaid: mediaid, //图片的素材id
                    },
                  },
                  function (res) {
                    if (res.err_msg == "sendChatMessage:ok") {
                      //发送成功
                    }
                  }
                );
              }
            );
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.EnterpriseCode {
}
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
      // font-weight: 600;
      // padding-left: 16px;
      position: relative;
      span:nth-child(2) {
        display: inline-block;
        margin-left: 16px;
      }
      .active {
        color: #4168f6;
        position: relative;
        &::after {
          content: "";
          width: 112px;
          height: 4px;
          background: #4168f6;
          position: absolute;
          bottom: -40px;
          left: 0;
        }
      }
    }
  }
  .searchInput {
    background: #fff;
    padding: 24px 24px;
    .input {
      width: 582px;
      height: 80px;
      border-radius: 8px;
      border: 2px solid #d9dae4;
      font-size: 28px;
      padding-left: 24px;
      box-sizing: border-box;
    }
    .searchBtn {
      display: inline-block;
      width: 104px;
      height: 80px;
      background: #4168f6;
      border-radius: 8px;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 80px;
      margin-left: 16px;
    }
  }
  .cardCode {
    width: 750px;
    // height: 406px;
    // min-height: 382px;
    background: #ffffff;
    margin-top: 16px;
    // padding: 24px;
    padding: 0 24px;
    box-sizing: border-box;
    font-size: 28px;
    .operationTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      position: relative;
      &::after {
        content: "";
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
          justify-content: center;
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
    -webkit-overflow-scrolling: touch;
    /deep/.vant_sheet {
      z-index: 2002 !important;
    }
    /deep/.van-overlay {
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 2000 !important;
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
    .van-action-sheet__content {
      height: 944px;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      // &::-webkit-scrollbar {
      //   height: 30px;
      // }
    }
    .content {
      // overflow: scroll;
      // padding: 24px;
      .addForm,
      .codeDetail {
        // overflow-y: scroll;
        box-sizing: content-box;
        // height: 800px;
        // box-sizing: border-box;
        padding: 24px;
        font-size: 28px;
        font-weight: 500;
        /deep/.el-form {
          height: 100%;
          .el-form-item {
            display: flex;
            margin-bottom: 40px;
            .editText {
              font-size: 28px;
              line-height: 80px;
            }
          }
          .el-form-item__label {
            // width: 155px;
            font-size: 28px;
            line-height: 80px;
            // color: #838a9d;
            color: #606266;
          }
          .el-form-item__content {
            flex: 1;
            height: 80px;
            line-height: 80px;
            word-break: break-all;
            .el-input__inner {
              height: 80px;
              border-radius: 8px;
              font-size: 28px;
              border: 0;
              border: 2px solid #d9dae4;
            }
            .el-select,
            .el-cascader {
              width: 100%;
              // width: 562px;
              height: 80px;
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
                height: 300px;
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
        // height: 100%;
        /deep/.el-form {
          .codeImg {
            margin-bottom: 100px !important;
            img {
              width: 182px;
              height: 182px;
            }
          }
          .el-form-item {
            margin-bottom: 0;
          }
          .el-form-item__label {
            font-size: 24px;
          }
          span {
            font-size: 24px;
            // line-height: 80px;
          }
        }
      }
      .buttonWarp {
        display: flex;
        justify-content: space-around;
        font-size: 28px;
        width: 100%;
        margin-bottom: 20px;
        position: fixed;
        bottom: 2px;
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
      .buttonWarp2 {
        display: flex;
        justify-content: space-around;
        font-size: 28px;
        width: 100%;
        margin-bottom: 20px;
        position: fixed;
        bottom: -250px;
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
.deleteBtn {
  padding-bottom: 10px;
}
</style>