<template>
  <div class="group_wrap">
    <TitleBack title="群画像"></TitleBack>
    <div class="groupDetails">
      <div class="groupDetailsTop">
        <div class="left">
          <!-- @click="toFun(item.chatId)" -->
          <div
            class="leftImgs"
            v-for="(item, index) in avatarList"
            :key="index"
          >
            <img src="" alt="" />
            <div
              class="group_img"
              :class="{
                len5:
                  item.imgList &&
                  item.imgList.length > 4 &&
                  item.imgList.length < 7,
              }"
            >
              <div
                class="img_box"
                :class="{ w33: item.imgList && item.imgList.length > 4 }"
                v-for="(url, i) in item.imgList.slice(0, 9)"
                :key="i"
              >
                <img class="img" :src="url | $setAvatar" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="right" @click="toSopPage">
          <div class="rightTitle">
            <p class="title">{{ datatTite.name || "暂无" }}</p>
            <!-- v-if="groupName.admintype == 1" -->
            <div class="sop">
              <!-- <span>群详情</span> -->
              <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="" />
            </div>
          </div>
          <div class="rightInfo">
            <p>
              共<span></span
              >{{ datatTite.usersum || "0" }}位群成员，今日新增<span>{{
                datatTite.joinsum || "0"
              }}</span
              >人
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 群公告 -->
        <!-- <div class="row tag" @click="toGroupAnnouncement">
          <div class="groupTxt">群公告</div>
          <div class="tag_wrap notice">
            <p>
              {{ notice || "暂无内容" }}
            </p>
            <img
              v-if="flag"
              class="icon"
              src="@/assets/svg/icon_next_gray.svg"
              alt=""
            />
          </div>
        </div> -->
        <!-- 群标签 -->
        <!-- <div class="row lable_box">
          <div class="tag lable_top">
            <div class="tit">群标签</div>
            <img
              class="edit"
              @click="chooseCusSign = true"
              src="@/assets/svg/icon_edit.svg"
              alt=""
            />
          </div>
          <div class="b_content">
            <div :class="{ 'over-hidden': !isShowPerson }" ref="textBox">
              <div ref="spanBox">
                <span
                  class="name_item tagBox"
                  v-for="item in lableList"
                  :key="item.id"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
            <div class="btn" ref="tags" v-show="lableList.length > 10">
              <img
                class="icon"
                v-if="!isShowPerson"
                @click="isShowPerson = true"
                src="@/assets/svg/icon_down.svg"
                alt=""
              />
              <img
                class="icon"
                v-else
                @click="isShowPerson = false"
                src="@/assets/svg/icon_up.svg"
                alt=""
              />
            </div>
          </div>
        </div> -->
      </div>
      <!-- 群动态 -->
      <div class="infoContent">
        <ul class="header-nav">
          <li
            v-for="(i, index) in navList"
            :key="i"
            @click="changeNav(index)"
            :class="{ active: contentType == index }"
          >
            <span>{{ i }}</span>
          </li>
        </ul>

        <!-- 群动态 -->
        <keep-alive>
          <GroupAll
            v-if="contentType == 0"
            ref="dynamic"
            :comeType="1"
            :isPortrait="1"
          ></GroupAll>
        </keep-alive>
        <!-- 群成员 -->
        <keep-alive>
          <GroupMembers v-if="contentType == 1" :isPortrait="1"></GroupMembers>
        </keep-alive>
      </div>
      <!-- 群标签 -->
      <!-- <van-popup
        v-model="chooseCusSign"
        round
        class="choose-warp-popup"
        position="bottom"
        :style="{ height: '70%' }"
      >
        <div class="_top">
          <div class="fill"></div>
          <div class="title">群标签</div>
          <img
            class="icon setting_btn"
            v-if="!isShowPerson"
            @click="chooseCusSign = false"
            src="@/assets/svg/icon_close.svg"
            alt=""
          />
        </div>
        <div class="_center">
          <div class="_item" v-for="(item, index) in cusSignList" :key="index">
            <div class="group-title">{{ item.name }}</div>
            <div class="group-label">
              <div
                class="label-item"
                :class="{
                  active:
                    highLightArr.findIndex((item) => {
                      return item.tagid == signItm.tagid;
                    }) > -1,
                }"
                @click="clickSign(signItm, signItm.tagid)"
                v-for="(signItm, signIdx) in item.children"
                :key="`${index} - ${signIdx}`"
              >
                {{ signItm.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="_bottom">
          <div class="_button save" @click="saveCus">保存</div>
        </div>
      </van-popup> -->
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/tool.js";
import { TitleBack } from "@/components";
import { TagDialog } from "../customer/components";
import GroupAll from "../../components/GroupDetails/groupAll"; //群动态
import GroupMembers from "../../components/GroupDetails/groupMembers"; //群成员

import {
  grouptag_list,
  groupUserTag_list,
  groupUserTag_addGroupTag,
  group_getGroupDetail,
  group_getGroupTodayDetail,
  group_getGroupUserPage,
} from "@/api/customer";
export default {
  components: {
    TitleBack,
    GroupAll,
    GroupMembers,
    TagDialog,
  },
  data() {
    return {
      group: this.$route.query.grouid,
      groupName: {
        admintype: 0,
      },
      isGroup: false,
      datatTite: {
        name: "",
        usersum: "",
        createTime: "",
        owmerName: "",
        usersum: "",
        leavesum: "",
        joinsum: "",
        total: 0, //总共的数据条数
      },
      notice: "",
      jmz: {},
      flag: false,
      isShowPerson: false,
      chooseCusSign: false, // 选择客户标签
      lableList: [],
      dialog_tag: false,
      groupTagMore: false,
      isCompanyMore: true,
      groupAllTagList: [],
      openType: "",
      tagTitle: "群标签",

      tabClick: 1,
      contentType: 0,
      navList: ["群动态", "群成员"],
      pageInfo: {
        page: 1,
        limit: 10,
      },
      allComTagList: [
        {
          name: "asd",
          children: [{ name: "11111" }],
        },
      ],
      personTagList: [],
      cusSignList: [],
      highLightArr: [],
      avatarList: [],
    };
  },
  updated() {},
  computed: {
    chatId() {
      return this.$store.getters.chatId;
    },
    userId() {
      return this.$store.getters.userId;
    },
  },
  mounted() {
     console.log("this.$store.getters.chatId "+ this.$store.getters.chatId)
    // this.$route.query.id = "wryPDZEQAA05rnMG9OBERqw7eABOW5sQ";
    this.pageInfo.page = 1;
    this.getData();
  },
  methods: {
    getStrLen(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length; //先把中文替换成两个字节的英文，在计算长度
    },
    formatDate,
    toGroupAnnouncement() {
      if (this.flag) {
        this.$router.push({
          path: "/groupAnnouncement",
          query: {
            createTime: this.groupName.createTime,
            notice: this.groupName.notice,
            owmerName: this.groupName.owmerName,
            avatar: this.groupName.avatar,
          },
        });
      }
    },
    myclue(v) {
      // console.log(v);
      this.tabClick = v;
    },
    getData() {
      this.getTagList();
      this.groupList();
      this.getGroupDetailtop();
      this.getGroupDetail();
      // this.getList();
    },
    clickSign(list, index) {
      var result = this.highLightArr.findIndex((item) => {
        return item.tagid == list.tagid;
      });
      console.log(result);
      if (result > -1) {
        this.highLightArr.forEach((item, index) => {
          if (item.tagid == list.tagid) {
            this.highLightArr.splice(index, 1);
          } else {
          }
        });
      } else {
        this.highLightArr.push(list);
      }

      let obj = {};

      let peon = this.highLightArr.reduce((cur, next) => {
        obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      this.datatupList = peon;
    },
    groupListadd() {
      let data = {
        chatId: this.$route.query.id,
        tagidList: this.highLightArr,
      };
      groupUserTag_addGroupTag(data).then((res) => {
        if (res.result) {
          this.groupList();
        }
      });
    },
    // 保存客户标签
    saveCus() {
      let obj = {};
      let peon = this.highLightArr.reduce((cur, next) => {
        obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      // console.log(peon);
      this.highLightArr = peon;

      // console.log(this.highLightArr, "点击保存---获取标签内容222");
      this.chooseCusSign = false;
      this.groupListadd();
    },
    // 群标签
    groupList() {
      groupUserTag_list(this.$route.query.id).then((res) => {
        console.log(res);
        console.log("获取 群标签接口+ " + res);
        if (res.result) {
          let obj = {};
          let peon = res.data.reduce((cur, next) => {
            obj[next.tagid] ? "" : (obj[next.tagid] = true && cur.push(next));
            return cur;
          }, []);
          this.lableList = peon;
          this.lableList.forEach((item) => {
            this.highLightArr.push(item);
          });
        }
      });
    },
    getGroupDetailtop() {
      group_getGroupTodayDetail(this.$route.query.id).then((res) => {
        console.log(res);
        console.log("获取top接口 getGroupDetailtop + " + res);
        console.log(res.data);
        if (res.result) {
          this.groupName = res.data.group;
          let owmer = res.data.group.owmer;
          // 判断是不是群主
          console.log("判断是不是群主 " + this.$store.getters.userId);
          console.log(sessionStorage.getItem("userId"));
          console.log(owmer);
          if (owmer == this.$store.getters.userId) {
            this.isGroup = true;
          } else {
            this.isGroup = false;
          }
          console.log("groupName 123");
          console.log(this.groupName);
          this.groupNameList = res.data.groupUserEntityList;
          let imgArr = [];
          this.groupNameList.forEach((item) => {
            console.log(item.avatar);
            imgArr.push(item.avatar);
          });
          this.avatarList.push({
            imgList: imgArr,
          });
        }
      });
    },
    getGroupDetail() {
      group_getGroupDetail(this.$route.query.id).then((res) => {
        console.log(res);
        console.log("获取头部信息接口 getGroupDetail " + res);
        if (res.result) {
          sessionStorage.setItem("userId", res.data.userId);
          this.notice = res.data.notice;
          // this.notice = "必要的财政支出规模，优化地方政府专项债券发行使用管理，开展全域无隐性债务试点，建立常态化财政资金直达机制并扩大范围，优化和落实减税降费政策，预计全年新增减税降费达到1万亿元。二是支持科技自立自强，加大对基础研究的支持，改革完善中央财政科研经费管理，打好关键核心技术攻坚战，启动支持专精特新中小企业高质量发展奖补政策，推动优化和稳定产业链供应链。";
          let len = this.getStrLen(this.notice);
          // console.log(len);
          if (len > 97) {
            this.flag = true;
          } else {
            this.flag = false;
          }
          // console.log(this.flag)
          // this.finished = true;
          this.groupId = res.data.id;
          if (res.data.owmer == res.data.userId) {
            console.log("我是群主");
            this.isOwmer = true;
            // this.getSopList();
          }
          this.datatTite.name = res.data.name;
          this.datatTite.usersum = res.data.usersum;
          this.datatTite.owmerName = res.data.owmerName;
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            "yyyy-MM-dd hh:mm:ss"
          );
          this.datatTite.joinsum = res.data.joinsum;
          this.datatTite.leavesum = res.data.leavesum;
        }
      });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    getList() {
      let obj = {
        chatId: this.$route.query.id,
        ...this.pageInfo,
      };
      group_getGroupUserPage(obj).then((res) => {
        console.log(res);
        console.log("获取接口 getList + " + res);

        if (res.result) {
          let tempList = res.data.data.records; //请求返回当页的列表
          this.loading = false;
          this.total = res.data.data.total;
          if (tempList == null || tempList.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }

          tempList.forEach((item) => {
            item.joinTime = item.joinTime
              ? formatDate(item.joinTime, "yyyy-MM-dd hh:mm:ss")
              : "-";
            item.type = item.type == "1" ? "企业成员" : "外部联系人";
            if (item.joinScene == "1") {
              item.joinScene = "直接邀请入群";
            } else if (item.joinScene == "2") {
              item.joinScene = "通过邀请链接入群";
            } else {
              item.joinScene = "通过扫描群二维码入群";
            }
            item.showName = item.showName ? item.showName : item.name;
            // console.log(item.id);
          });
          // 将新数据与老数据进行合并
          console.log(129988999);
          console.log(this.dataList);
          let newSetArr = this.dataList.concat(tempList);
          // this.dataList = this.dataList.concat(tempList);
          this.dataList = this.unique(newSetArr);
          // this.dataList = tempList;

          
          // console.log(this.dataList);
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.dataList.length >= this.total) {
            this.finished = true;
          }
        }
      });
    },
    toSopPage() {
      // chatId
      console.log("id  "+this.$route.query.id,"grouid   "+this.$route.query.grouid)
      this.$router.push({
        path: '/sop',
        query: { id: this.$route.query.id,grouid:this.$route.query.grouid},
      });
    },
    // 导航切换
    changeNav(index) {
      this.contentType = index;
      // console.log(index);
    },
    getMoreState() {
      //获取more状态
      this.$nextTick(() => {
        let _wrap1 = this.$refs.companyTagWrap.clientHeight;
        let _box1 = this.$refs.companyTagBox.clientHeight;
        this.isCompanyMore = _box1 > _wrap1 ? true : false;
      });
    },
    //客户标签列表
    getTagList() {
      this.highLightArr = [];
      this.namelabutArr = [];
      grouptag_list().then((res) => {
        console.log(res);
        console.log("获取客户标签接口+ " + res);
        if (res.result) {
          this.cusSignList = res.data;
          let allChildTag = res.data.map((item) => {
            return item.children;
          });
          this.namelabutArr = [].concat.apply([], allChildTag);
        }
      });
    },
    tagUpdateFun(type, val) {
      //标签增减
      console.log(type, val);
      switch (type) {
        case "company": //企业标签更改
          cluecustomer_updCorptag(this.id, val).then((res) => {
            if (res.result) {
              this.dialog_tag = false;
              this.getTagList();
            }
          });
          break;
        case "person": //个人标签更改
          cluecustomer_updPertag(val, this.id).then((res) => {
            if (res.result) {
              this.dialog_tag = false;
              this.getTagList();
            }
          });
          break;
        case "add": //新增个人标签
          let obj = {
            clueCustomerNo: this.id,
            name: val,
          };
          cluecustomer_addtag(obj).then((res) => {
            if (res.result) {
              this.getTagList();
            } else {
              this.$toast(res.msg);
            }
          });
          break;
        case "delete":
          cluecustomer_deltag(val).then((res) => {
            if (res.result) {
              this.getTagList();
            }
          });
          break;
        default:
          break;
      }
    },
    openDialog(type) {
      //打开弹窗 (地址 and 备注)
      console.log(type);
      console.log(this.allComTagList);
      this.dialog_tag = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

@main: #4168f6;
@white: #fff;
@fontMain: #3c4353;
@fontSub2: #838a9d;
@bdColor: #d9dae4;
@dashedColor: #f0f2f7;
/deep/.van-overlay {
  // background-color: rgba(0, 0, 0, 0.3);
}
/deep/ .van-loading {
  // top: 50%;
  // left: 50%;
}
.b_content {
  .over-hidden {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .btn {
    margin: 10px 0;
    color: #4168f6;
    text-align: center;
    height: 40px;
    position: relative;
    img {
      width: 32px;
      height: 32px;
      position: absolute;
      left: 50%;
      bottom: 0;
    }
    // .van-icon {
    //   vertical-align: -11%;
    //   width: 28px;
    //   height: 28px;
    // }
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
    position: relative;
  }
}
.group_wrap {
  width: 100%;
  min-height: 100vh;
  background: @white;
  .groupDetails {
    .groupDetailsTop {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 164px;
      position: relative;
      &::before {
        content: "";
        width: 100%;
        height: 1px; /* no */
        background: @lineColor;
        position: absolute;
        left: 0;
        bottom: 0;
        transform: scaleY(0.5);
      }
      .left {
        // flex: 1;
        width: 80px;
        height: 80px;
        margin: 42px 32px;
        .leftImgs {
          .group_img {
            width: 80px;
            height: 80px;
            background: @navBg;
            margin-right: 24px;
            display: flex;
            flex-wrap: wrap-reverse;
            justify-content: center;
            align-items: center;
            &.len5 {
              padding: calc(80px / 6) 0;
            }
            .img_box {
              // width: 33.33%;
              // height: calc(80px / 3);
              // background: chocolate;
              border: 1px solid @white; /*no*/
              text-align: center;
              &:first-child:nth-last-child(2),
              &:first-child:nth-last-child(2) ~ .img_box {
                width: calc(80px / 2);
                height: calc(80px / 2);
              }
              &:first-child:nth-last-child(3),
              &:first-child:nth-last-child(3) ~ .img_box {
                width: calc(80px / 2);
                height: calc(80px / 2);
              }
              &:first-child:nth-last-child(4),
              &:first-child:nth-last-child(4) ~ .img_box {
                width: calc(80px / 2);
                height: calc(80px / 2);
              }
              // &:first-child:nth-last-child(5),&:first-child:nth-last-child(5) ~ .img_box{
              //     width: calc(80px / 3);
              //     height: calc(80px / 3);
              // }
              // &:first-child:nth-last-child(6),&:first-child:nth-last-child(6) ~ .img_box{
              //     width: calc(80px / 3);
              //     height: calc(80px / 3);
              // }
              &.w33 {
                width: calc(80px / 3);
                height: calc(80px / 3);
              }
              .img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        .rightTitle {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          height: 48px;
          line-height: 48px;
          .title {
            width: 450px;
            overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
            font-size: 32px;
            color: #262626;
            font-weight: 600;
          }
          .sop {
            margin-right: 30px;
            position: relative;
            width: 40px;
            span {
              margin-right: 30px;
              color: #262626;
            }
            .icon {
              width: 32px;
              height: 32px;
              position: absolute;
              right: 0;
              top: 24px;
              transform: translateY(-50%);
            }
          }
        }
        .rightInfo {
          font-size: 24px;
          line-height: 32px;
          color: #b3b3b3;
        }
      }
    }

    .content {
      width: 100%;
      // padding: 32px;
      .lable_box {
        width: 100%;
        min-height: 120px;
        background: @white;
        // margin-top: 24px;
        padding: 40px 0;
        .lable_top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          // padding: 0 24px;
          position: relative;

          .edit {
            width: 40px;
            height: 40px;
            position: absolute;
            right: 0;
            top: 0;
          }
          .lable_title {
            font-size: 28px;
            line-height: 40px;
            font-weight: bold;
            color: @fontMain;
            padding-left: 20px;
            position: relative;
            // &::before {
            //   content: "";
            //   width: 8px;
            //   height: 28px;
            //   background: @main;
            //   position: absolute;
            //   left: 0;
            //   top: 50%;
            //   transform: translateY(-50%);
            // }
          }
          .icon {
            width: 32px;
            height: 32px;
            // margin-left: 12px;
            display: inline-block;
            vertical-align: middle;
          }
          // .setting_btn {
          //   width: 124px;
          //   height: 68px;
          //   font-size: 28px;
          //   line-height: 66px;
          //   border: 1px solid @bdColor;
          //   border-radius: 8px;
          //   color: @fontSub2;
          //   padding-left: 52px;
          //   position: relative;
          //   cursor: pointer;
          //   &::before {
          //     content: "";
          //     width: 32px;
          //     height: 32px;
          //     background: url("../../assets/images/edit.png") no-repeat;
          //     background-size: 100%;
          //     position: absolute;
          //     left: 16px;
          //     top: 50%;
          //     transform: translateY(-50%);
          //   }
          // }
          .redact_btn {
            width: 124px;
            height: 68px;
            font-size: 28px;
            line-height: 66px;
            border: 1px solid @bdColor;
            border-radius: 8px;
            color: @fontSub2;
            padding-left: 52px;
            position: relative;
            cursor: pointer;
            &::before {
              content: "";
              width: 32px;
              height: 32px;
              background: url("../../assets/images/icon_setting.png") no-repeat;
              background-size: 100%;
              position: absolute;
              left: 16px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        .lable_list {
          .btn {
            color: #4168f6;
            text-align: right;
            font-size: 28px;
            .van-icon {
              vertical-align: -11%;
              width: 28px;
              height: 28px;
            }
          }
          .lable_li {
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 2;
            // overflow: hidden;
            display: flex;
            // height: 300px;
            // overflow: hidden;
            flex-wrap: wrap;
            .name_item {
              margin-right: 16px;
              margin-top: 16px;
              padding: 0 16px;
              height: 68px;
              line-height: 68px;
              background: #fafbff;
              border-radius: 8px;
              border: 1px solid #d9dae4;
              font-weight: 400;
              color: #838a9d;
              font-size: 28px;
              position: relative;

              img {
                width: 28px;
                width: 28px;
                position: absolute;
                right: -15px;
                top: -12px;
                background: #fff;
              }
            }
          }
        }
      }
      .tabBtn {
        justify-content: space-around;
        margin-top: 20px;
        height: 87px;
        line-height: 87px;
        background: #fff;
        border-bottom: 0.013333rem solid #f0f2f7;

        .mycule {
          // margin-right: 32px;
          font-size: 28px;
          color: #838a9d;
          letter-spacing: 0;
          font-weight: 500;
        }
        .active {
          //   width: 112px;
          //   text-align: center;
          color: #4168f6;
          position: relative;
          font-size: 28px;
          letter-spacing: 0;
          font-weight: 500;

          &::after {
            content: "";
            width: 112px;
            height: 4px;
            background: #4168f6;
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translate(-50%);
          }
        }
      }
      .row {
        width: 100%;
        position: relative;
        // padding-bottom: 20px;
        // margin-bottom: 32px;
        &.tag {
          padding-bottom: 40px;
          .tit {
            // margin-bottom: 32px;
          }
        }
        &.no .item_box .item .val {
          color: @fontSub1;
        }
        // &:last-child {
        //   margin-bottom: 0;
        //   &::after {
        //     display: none;
        //   }
        // }
        &::after {
          content: "";
          width: 100%;
          height: 1px; /* no */
          background: @lineColor;
          transform: scaleY(0.5);
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .edit {
          width: 40px;
          height: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
        .groupTxt {
          margin-bottom: 20px;
          // font-size: 24px;
          // line-height: 32px;
          // color: @total;
        }
        .notice {
          position: relative;
          font-size: 28px;
          line-height: 36px;
          p {
            margin-right: 20px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .icon {
            width: 32px;
            line-height: 36px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .tag_wrap {
          width: 100%;
          max-height: 152px;
          // overflow: hidden;
          &.more {
            max-height: inherit;
            overflow: inherit;
          }
        }
        .tag_box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .tag {
            color: @fontSub1;
            line-height: 52px;
            height: 52px;
            background: @navBg;
            border-radius: 8px;
            padding: 0 16px;
            margin-right: 16px;
            margin-bottom: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .more {
          text-align: center;
          .icon {
            display: inline-block;
            width: 36px;
            height: 36px;
          }
        }
        .item_box {
          width: 100%;
          .item {
            display: flex;
            align-items: center;
            font-size: 28px;
            line-height: 36px;
            color: @fontMain;
            padding: 32px 0;
            &.lh {
              align-items: flex-start;
            }
            .label {
              width: 180px;
              font-weight: bold;
            }
            .val {
              width: calc(100% - 180px);
              text-align: right;
              // display: flex;
              // justify-content: right;
              .input {
                width: 100%;
                height: 100%;
                border: none;
                text-align: right;
              }
              .icon_select {
                // display: flex;
                // align-items: center;
                display: inline-block;
                span {
                  display: inline-block;
                  vertical-align: middle;
                }
                .icon {
                  width: 32px;
                  height: 32px;
                  // margin-left: 12px;
                  display: inline-block;
                  vertical-align: middle;
                }
              }
              .placeholder {
                color: @total;
              }
            }
          }
        }
      }
    }
    .infoContent {
      margin-top: 24px;
      background: #fff;
      .header-nav {
        display: flex;
        width: 100%;
        height: 100px;
        margin-bottom: 24px;
        border-bottom: 1px solid #f0f2f7;
        li {
          flex: 1;
          height: 100%;
          line-height: 100px;
          text-align: center;
          span {
            display: inline-block;
            height: 100%;
            margin: 0 auto;
            color: #838a9d;
            font-size: 28px;
            font-weight: 600;
          }
        }
        .active {
          span {
            color: #4168f6;
            border-bottom: 4px solid #4168f6;
          }
        }
      }
    }
  }

  .choose-warp-popup {
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
      .title {
        font-weight: 600;
      }
      .fill {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 32px;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
    ._center {
      box-sizing: border-box;
      padding: 24px;
      // min-height: 740px;
      height: 78%;
      overflow: auto;
      ._item {
        // display: flex;
        // align-items: flex-start;
        margin-bottom: 12px;
        .group-title {
          height: 68px;
          line-height: 68px;
          width: 420px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28px;
          color: #3c4353;
          font-weight: 600;
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
            text-overflow: ellipsis;
            white-space: nowrap;
            //  width: 120px;
            max-width: 260px;
            overflow: hidden;
            text-align: center;
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
        width: calc((100% - 24px) / 1);
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
}
</style>