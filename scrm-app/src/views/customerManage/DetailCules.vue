<template>
  <div class="culeDeatil">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">线索详情</span>
    </div>
    <div class="iconName">
      <div class="flag"><img :src="image" alt="" /></div>
      <div class="nameSex">
        <span>{{ name }}</span>
        <!-- <span>{{nameFrom}}</span> -->
        <img src="../../images/icon_female@2x.png" alt="" />
      </div>
    </div>
    <div class="btnWarp">
      <div class="btnBox" @click="transCustom">
        <img src="../../images/icon_change@2x.png" alt="" />
        <span>转客户</span>
      </div>
      <div class="btnBox" @click="changeUser">
        <img src="../../images/icon_change2@2x.png" alt="" />
        <span>变更所属人</span>
      </div>
      <div class="btnBox" @click="giveUp">
        <img src="../../images/icon_clear@2x.png" alt="" />
        <span>放弃</span>
      </div>
    </div>
    <div class="basicInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>基本信息</span>
      <div class="formEdit">
        <van-form v-model="formList">
          <van-field
            v-for="(item, index) in formList"
            label-align="center"
            placeholder="请输入"
            :ref="'barcode' + index"
            :key="index"
            v-model="item.value"
            :label="item.name"
            @blur="inputEdit(item, index)"
            @focus="fnFocus(item, index)"
            @keyup.enter.native="keyupClick(item, index)"
          >
            <template slot="right-icon">
              <i class="el-icon-edit" v-show="fieldIndex == index"></i>
            </template>
          </van-field>
        </van-form>
      </div>
    </div>
    <div class="systemInformation">
      <span>
        <img src="../../images/icon_label.png" alt="" />
      </span>
      <span>系统信息</span>
      <div class="formEdit">
        <van-form v-model="systemList">
          <van-field
            v-for="(item, index) in systemList"
            label-align="center"
            :ref="'barcode' + index"
            readonly
            :key="index"
            v-model="item.value"
            :label="item.name"
          >
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
              <span
                v-for="(list, index) in tagList"
                :key="index"
                class="tagBox"
                >{{ list.name }}</span
              >
            </div>
          </div>
          <div class="btn" @click="unfold = !unfold">
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
              <span
                v-for="(list, index) in tagList"
                :key="index"
                class="tagBox"
                >{{ list.name }}</span
              >
            </div>
          </div>
          <div class="btn" @click="isShowPerson = !isShowPerson">
            {{ isShowPerson ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="dynamic">
        <div class="t_text">
          <span class="label_tag">动态</span>
          <div class="editButton" @click="showCompany(3)">
            <img src="../../images/icon_repair1@2x.png" alt="" />
            <span>写跟进</span>
          </div>
        </div>
        <div class="allText">全部</div>
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in timeLineList"
              :key="index"
              color="#4168F6"
              type="danger "
            >
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
      <van-action-sheet v-model="show" :title="titleName">
        <div class="content">
          <div class="tagWarp" v-if="isShowDialog == '1'">
            <div class="tagRow" v-for="(item, index) in groupList" :key="index">
              <div class="groupName">{{ item.name }}</div>
              <div class="tagStyle">
                <span
                  class="creatTag"
                  :class="{ changeTag: highLightArr.includes(list.id) }"
                  v-for="(list, index) in item.children"
                  :key="list.id"
                  v-show="list.name"
                  @click="selectTag(list, index)"
                  >{{ list.name }}</span
                >
              </div>
            </div>
          </div>

          <div class="tagWarp personWarp" v-if="isShowDialog == '2'">
            <div class="tagRow">
              <!-- <div class="groupName">{{item.name}}</div> -->
              <div class="tagStyle">
                <span class="addBtn pointer" @click="addTag">+添加</span>
                <span class="perchInput" v-if="isShow">
                  <input
                    v-model="tagName"
                    class="addInput"
                    placeholder="输入后按回车完成"
                    maxlength="30"
                    @keyup.enter="handleSearch()"
                  />
                </span>
                <span
                  class="creatTag"
                  :class="{ changeTag: tempList.includes(list.id) }"
                  v-for="(list, index) in personList"
                  :key="list.id"
                  v-show="list.name"
                >
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
          <div class="writerInput" v-if="isShowDialog == '3'">
            <van-field
              v-model="message"
              type="textarea"
              maxlength="300"
              placeholder="记录好跟进，多签单哟~"
              show-word-limit
            />
          </div>
          <div class="changeUser" v-if="isShowDialog == '4'">
            <div class="nowUser">
              <span>现有所属人:</span>
              <span>{{ nowUser }}</span>
            </div>
            <div class="selectUser">
              <span style="color: red">*</span><span>指定所属人:</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="fnChangeUser"
                >
                </el-option>
              </el-select>
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
import { formatDate } from "../../utils/tool";
export default {
  data() {
    return {
      item: {},
      name: "",
      image: "",
      formList: [
        { name: "姓名", value: "", mapName: "name" },
        { name: "手机号", value: "", mapName: "phone" },
        { name: "微信号", value: "", mapName: "weixin" },
        { name: "性别", value: "", mapName: "gender" },
        { name: "职务", value: "", mapName: "position" },
        { name: "公司名称", value: "", mapName: "cropFullName" },
        { name: "所属行业", value: "", mapName: "cropSubIndustry" },
        { name: "线索来源", value: "", mapName: "source" },
        { name: "邮箱", value: "", mapName: "email" },
        { name: "地址", value: "", mapName: "address" },
        { name: "备注", value: "", mapName: "remark" },
        { name: "描述", value: "", mapName: "describe" },
      ],
      systemList: [
        { name: "添加人员", mapName: "createBy", value: "" },
        { name: "添加时间", mapName: "createTime", value: "" },
        { name: "所属人", mapName: "uname", value: "" },
        { name: "领取时间", mapName: "getTime", value: "" },
        { name: "最近跟进记录", mapName: "followRecord", value: "" },
        { name: "最近跟进时间", mapName: "followTime", value: "" },
        { name: "最近修改人", mapName: "updateBy", value: "" },
        { name: "最近修改时间", mapName: "updateTime", value: "" },
        { name: "前所属人", mapName: "beBelongBy", value: "" },
        { name: "转换时间", mapName: "turnTime", value: "" },
      ],
      fieldIndex: null,
      unfold: false,
      isShowPerson: false,
      tagList: [
        { name: "很优秀" },
        { name: "很优fafas秀" },
        { name: "很优秀" },
        { name: "很adsa优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
        { name: "很优秀" },
      ],
      groupList: [
        {
          name: "标签管理",
          children: [
            {
              name: "hahhah",
              id: 1,
            },
            {
              name: "hahhah",
              id: 2,
            },
            {
              name: "hahhah",
              id: 3,
            },
            {
              name: "hahhah",
              id: 4,
            },
            {
              name: "hahhah",
              id: 5,
            },
            {
              name: "hahhah",
              id: 6,
            },
            {
              name: "hahhah",
              id: 7,
            },
          ],
        },
        {
          name: "标签管理",
          children: [
            {
              name: "hahhah",
              id: 8,
            },
            {
              name: "hahhah",
              id: 9,
            },
            {
              name: "hahhah",
              id: 10,
            },
            {
              name: "hahhah",
              id: 11,
            },
            {
              name: "hahhah",
              id: 12,
            },
            {
              name: "hahhah",
              id: 22,
            },
          ],
        },
      ],
      personList: [
        {
          name: "标签管理",
          id: 1,
        },
        {
          name: "标签管理",
          id: 2,
        },
      ],
      timeLineList: [
        {
          title: "步骤一",
          userName: "描述信息",
          context: "描述信息描述信息描述信息描述信息",
          createTime: 1628128378602,
        },
      ],
      show: false,
      isShowDialog: null,
      titleName: "",
      highLightArr: [],
      tempList: [],
      message: "",
      showInput: null,
      isShow: false,
      tagName: "",
      nowUser: "马化腾",
      value: "",
      options: [
        { label: "hahha", value: "1" },
        { label: "大撒大撒", value: "2" },
      ],
    };
  },
  created() {
    console.log(this.$route.params.list);

    let detail = JSON.parse(localStorage.getItem("detail"));
    this.name = detail.name;
    this.image = detail.avatar;
    let obj = {
      customerName: detail.customerName,
      cropFullName: detail.cropFullName,
      cropSubIndustry: detail.cropSubIndustry,
      source: detail.source,
      cropscale: detail.cropscale,
      name: detail.name,
      phone: detail.phone,
      weixin: detail.weixin,
      gender: detail.gender,
      position: detail.position,
      email: detail.email,
      address: detail.address,
      remark: detail.remark,
      describe: detail.describe,
      createBy: detail.createBy,
      createTime: detail.createTime,
      uname: detail.uname,
      getTime: detail.getTime,
      followRecord: detail.followRecord,
      followTime: detail.followTime,
      updateBy: detail.updateBy,
      updateTime: detail.updateTime,
      beBelongBy: detail.beBelongBy,
      turnTime: detail.turnTime,
    };
    this.formList = this.formList.map((item) => {
      return {
        name: item.name,
        value: obj[item.mapName],
      };
    });
    this.systemList = this.systemList.map((item) => {
      return {
        name: item.name,
        value: obj[item.mapName],
      };
    });
    // console.log(this.formList)
  },
  methods: {
    formatDate,
    goBack() {
      this.$router.go(-1);
    },
    inputEdit(item, index) {
      // console.log(item, index)
      this.fieldIndex = null;
    },
    keyupClick(item, index) {
      let p = "barcode" + index;
      this.$refs[p][0].blur();
      // console.log(22222, this.$refs[p])
    },
    fnFocus(item, index) {
      this.fieldIndex = index;
    },
    showCompany(v) {
      this.isShowDialog = v;
      this.show = true;
      if (v == 1) {
        this.titleName = "企业标签";
      } else if (v == 2) {
        this.titleName = "个人标签";
      } else if (v == 3) {
        this.titleName = "写跟进";
      }
    },
    addTag(item, index) {
      this.tagName = "";
      this.isShow = !this.isShow;
    },
    handleSearch() {
      console.log(this.tagName);
      // if (this.tagName) {
      //   this.$network
      //     .post('/customer-service/tag/add', {
      //       name: this.tagName,
      //       parentId: item.id,
      //       tagid: item.tagid,
      //     })
      //     .then((res) => {
      this.personList.push({ name: this.tagName });
      //     })
      // }
      this.showInput = null;
      this.isShow = false;
    },
    selectTag(list, index) {
      // console.log(list, index)
      if (this.highLightArr.includes(list.id)) {
        let p = this.highLightArr.indexOf(list.id);
        this.highLightArr.splice(p, 1);
      } else {
        this.highLightArr.push(list.id);
      }
    },
    selectPersonTag(list, index) {
      if (this.tempList.includes(list.id)) {
        let p = this.tempList.indexOf(list.id);
        this.tempList.splice(p, 1);
        console.log(p);
      } else {
        this.tempList.push(list.id);
      }
    },
    deleteTag(v, i) {
      // console.log(v)
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确认删除",
          className: "deleteBtn",
          confirmButtonText: "是",
          cancelButtonText: "否",
          messageAlign: "left",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    transCustom() {
      this.$router.push("turnCustomer");
    },
    changeUser() {
      this.isShowDialog = "4";
      this.show = true;
      this.titleName = "变更所属人";
    },
    giveUp() {
      this.$dialog
        .confirm({
          title: "放弃警告",
          message:
            "是否放弃返回公海？\n* 放弃到公海后，此客户数据将属于公共资源，原归属 人员不能再维护跟进和更新此客户数据。",
          className: "giveUpBtn",
          confirmButtonText: "是",
          cancelButtonText: "否",
          messageAlign: "left",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    fnChangeUser(val) {
      console.log(val);
    },
    closeDialog(v) {
      this.show = false;
      console.log(v);
    },
    saveDialog(v) {
      this.show = false;
      console.log(v);
    },
  },
};
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
        padding-left: 120px;
      }
    }
    .iconName {
      display: flex;
      padding: 24px;
      background: #fff;
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
              content: "";
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
              content: "";
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