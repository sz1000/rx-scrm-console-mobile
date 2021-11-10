<template>
  <div class="warp-portrait">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">群列表</span>
    </div>
    <div class="portrait-box">
      <div class="flex">
        <div class="portrait_img">
          <!-- <img src="../../images/groupico.png" alt="" /> -->
          <div class="flag">群</div>
        </div>
        <div>
          <p class="portrait_tite">
            {{ datatTite.name || "暂无" }}
          </p>
          <p class="portrait_message">
            <span class="grom_name"
              >群主：{{ datatTite.owmerName || "暂无" }}</span
            >
            <span class="ml24 in_block"
              >共 {{ datatTite.usersum || "0" }} 位群成员</span
            >
          </p>
        </div>
      </div>
      <div class="group_num">
        <div>
          <p class="num">{{ datatTite.usersum || "0" }}</p>
          <p class="num_tite">总人数</p>
        </div>
        <div>
          <p class="num">{{ datatTite.joinsum || "0" }}</p>
          <p class="num_tite">今日新增</p>
        </div>
      </div>
    </div>
    <div class="announcement">
      <span>群公告</span>
      <span class="ling"></span>
      <!-- <span class="iconfont icon-shengyin"></span> -->
      <img class="voice_icon" src="../../images/icon_oice.png" alt="" />
      <span>本群2021年7月开始实行实名制，请更改</span>
    </div>
    <!-- 群标签 -->
    <div class="lable_box">
      <div class="lable_top">
        <div class="lable_title">群标签</div>
        <div class="setting_btn" @click="chooseCusSign = true">编辑</div>
      </div>
      <div class="lable_list">
        <div class="lable_li">
          <span class="name_item" v-for="item in lableList" :key="item.id">
            {{ item.name }}
            <img
              src="../../assets/images/delte.png"
              alt=""
              @click="lableDelet(item.id)"
            />
          </span>

        </div>
         <div class="btn" @click="isShowPerson = !isShowPerson" >
            {{ isShowPerson ? "收起" : "展开" }}
            <van-icon name="arrow-down" />
          </div>
      </div>
    </div>
    <!-- 群sop -->
    <div class="sop_box">
      <div class="sop_top">
        <div class="sop_title">群SOP</div>
        <div class="setting_btn" @click="settingSopFun">设置</div>
      </div>
      <div class="sop_list">
        <div class="sop_li" v-for="item in sopList" :key="item.id">
          <div class="item">
            <div class="label">SOP名称：</div>
            <div class="val">{{ item.ruleName }}</div>
          </div>
          <div class="item">
            <div class="label">推送规则：</div>
            <div class="val">
              {{ item.promptRule ? "周期推送" : "定时推送" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->

    <div>
      <div class="tabBtn flex">
        <div @click="myclue(1)">
          <div :class="{ active: tabClick == 1 }" class="mycule">群动态</div>
          <!-- <p :class="{ activeline: tabClick == 1 }"></p> -->
        </div>
        <div @click="myclue(2)">
          <div :class="{ active: tabClick == 2 }" class="mycule">群内成员</div>
          <!-- <p :class="{ activeline: tabClick == 2 }"></p> -->
        </div>
      </div>
      <div v-if="tabClick == 1">
        <!-- <div class="allText">全部</div> -->
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item color="#4168F6" type="danger ">
              <div class="recordBox">
                <div class="descTxt">创建</div>
                <div class="inLineTwo">
                  {{ groupName.owmerName }}:创建了群聊
                </div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ groupName.owmerName }}</div>
                  <span class="time_right">
                    {{
                      formatDate(groupName.createTime, "yyyy-MM-dd hh:mm:ss")
                    }}</span
                  >
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in groupNameList"
              :key="index"
              color="#4168F6"
              type="danger "
            >
              <div class="recordBox">
                <div class="descTxt">加入群聊</div>
                <div class="inLineTwo">
                  {{ item.name }}通过
                  <span v-if="item.joinScene == 1">直接邀请入群</span>
                  <span v-if="item.joinScene == 2">邀请链接入群</span>
                  <span v-if="item.joinScene != 1 && item.joinScene != 2"
                    >扫描群二维码入群</span
                  >方式加入了群聊
                </div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{ item.invitorName }}</div>
                  <span class="time_right">
                    {{ formatDate(item.joinTime, "yyyy-MM-dd hh:mm:ss") }}</span
                  >
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <p class="text_ta">没有更多了</p>
        </div>
      </div>
      <div v-if="tabClick == 2">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul>
            <!--  -->
            <li
              class="lsits list-warp"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div class="flex">
                <div class="portrait_img">
                  <img v-if="item.avatar != ''" :src="item.avatar" alt="" />
                  <div class="flag" v-if="item.avatar == ''">
                    {{ item.name.substr(0, 1) }}
                  </div>
                </div>
                <div>
                  <p class="portrait_tite">
                    {{ item.name }}
                    <span class="firm" v-if="item.customerType == 2"
                      >@{{ item.corpName }}</span
                    >
                    <span class="weix" v-if="item.customerType == 1"
                      >@微信</span
                    >
                  </p>
                  <p class="portrait_message">
                    {{ item.type }}
                  </p>
                </div>
              </div>
              <div class="list-box">
                <p class="list_tite">
                  入群时间：<span class="num">{{ item.joinTime }}</span>
                </p>
                <p class="list_tite">
                  入群方式： <span class="num">{{ item.joinScene }}</span>
                </p>
                <p class="list_tite">
                  邀请员工： <span class="num">{{ item.invitorName }}</span>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
    <!-- <p class="no_more">没有更多</p> -->
    <van-overlay :show="show">
      <van-loading class="loding" type="spinner" color="#fff" size="24" />
    </van-overlay>
    <!-- 群标签 -->
    <van-popup
      v-model="chooseCusSign"
      round
      class="choose-warp-popup"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="_top">
        <div class="fill"></div>
        <div>群标签</div>
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
import { formatDate } from "../../utils/tool.js";

import { sop_groupSopList } from "@/api/sop";
export default {
  data() {
    return {
      groupNameList: [],
            isShowPerson: false,
      chooseCusSign: false, // 选择客户标签
      groupName: {},
      tabClick: 1,
      channelList: [],
      show: true,
      loading: false,
      finished: false,
      refreshing: false,
      chatId: "",
      // 群信息
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
      pageInfo: {
        page: 1,
        limit: 10,
      },
      // 群用户列表
      dataList: [],
      cusSignList: [],
      sopList: [], //群 sop 列表
      groupId: "",
      group: "",
      isOwmer: false, //是否群主
      lableList: [
        { name: "张三", id: 1 },
        { name: "李四李四李四李四李四", id: 2 },
        { name: "王五", id: 3 },
        { name: "赵六赵六赵六赵六赵六", id: 4 },
        { name: "小明", id: 5 },
        { name: "大明", id: 7 },
        { name: "小舞", id: 8 },
        { name: "唐三", id: 9 },
        { name: "好弹出还大", id: 10 },
      ],
    };
  },
  created() {
    this.group = this.$route.query.grouid;
    this.getTagList();
  },
  mounted() {
    setTimeout(() => {
      this.pageInfo.page = 1;
      this.getGroupDetailtop();
      this.getGroupDetail();

      this.getList();
    }, 3000);
  },
  methods: {
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
        // console.log('-----列表----', this.baseForm.includeCus)
        // this.baseForm.includeCus.forEach((item) => {
        //   console.log(item)
        //   childTag.forEach((chItem, chIndex) => {
        //     if (item.tagid == chItem.tagid) {
        //       this.highLightArr.push(chItem)
        //     }
        //   })
        //   // console.log("-----列表----", this.highLightArr);
        // })
      });
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
    goBack() {
      this.$router.go(-1);
    },
    formatDate,
    onLoad() {
      console.log("屏幕滚动");

      this.pageInfo.page += 1;

      this.getList();
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
      // console.log(checkedSign, '---------')
      console.log(this.highLightArr, "-------------------oooo");
      // this.baseForm.includeCus = checkedSign

      this.chooseCusSign = false;
      // this.getTagList();
      // this.Screeningcustomer()
    },
    getSopList() {
      //获取sop规则列表
      sop_groupSopList(this.group).then((res) => {
        if (res.result) {
          let list = res.data;
          this.sopList = list;
        }
      });
    },
    settingSopFun() {
      //设置sop规则
      this.$router.push({
        path: "/settingSop",
        query: {
          id: this.group,
        },
      });
    },
    lableDelet(item) {
      console.log(item);
      this.lableList.forEach((items, index) => {
        // console.log(index)

        if (item == items.id) {
          this.lableList.splice(index, 1);
        }
      });
    },
    getGroupDetail() {
      this.$network
        .get("/customer-service/group/getGroupDetail", {
          chatId: this.$route.query.id,
        })
        .then((res) => {
          if (res.result) {
            this.show = false;
            // this.finished = true;
            this.groupId = res.data.id;
            if (res.data.owmer == res.data.userId) {
              console.log("我是群主");
              this.isOwmer = true;
              this.getSopList();
            }
          }
          //   this.getSopList(); //本地调试用
          // this.show = false;  //画页面用 2021/10/11
          this.datatTite.name = res.data.name;
          this.datatTite.usersum = res.data.usersum;
          this.datatTite.owmerName = res.data.owmerName;
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            "yyyy-MM-dd hh:mm:ss"
          );
          this.datatTite.joinsum = res.data.joinsum;
          this.datatTite.leavesum = res.data.leavesum;
        });
    },
    getGroupDetailtop() {
      this.$network
        .get("/customer-service/group/getGroupTodayDetail", {
          chatId: this.$route.query.id,
        })
        .then((res) => {
          this.groupName = res.data.group;
          this.groupNameList = res.data.groupUserEntityList;
          console.log(res.data.group, "---------");
        });
    },
    getList() {
      this.$network
        .get("/customer-service/group/getGroupUserPage", {
          chatId: this.$route.query.id,
          ...this.pageInfo,
        })
        .then((res) => {
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
            console.log(item.id);
          });
          // 将新数据与老数据进行合并
          let newSetArr = this.dataList.concat(tempList);
          // this.dataList = this.dataList.concat(tempList);
          this.dataList = this.unique(newSetArr);
          // this.dataList = tempList;
          console.log(this.dataList);
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.dataList.length >= this.total) {
            this.finished = true;
          }
        });
    },
    // onRefresh() {
    //   // 清空列表数据
    //   console.log("清空列表数据");
    // },
    // 去重一次
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    myclue(v) {
      console.log(v);
      this.tabClick = v;
      //   this.cardList = [];
      //   this.page = 1;
      //   this.inputValue = "";
      //   this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
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
    // min-height: 740px;
    height: 70%;
    overflow: auto;
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
    cursor: default;
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
.doing {
  width: 24px;
  height: 24px;
  background: #4168f6;
  border-radius: 50%;
}
.loding {
  top: 50%;
  left: 50%;
  transform: translate(-2%, -50%);
  // transform: translate(-50%, -50%);
}
.text_ta {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
  text-align: center;
  padding-bottom: 20px;
}
.warp-portrait {
  /* padding: 24px; */
  /* background: #838a9d; */
  .announcement {
    display: flex;
    padding: 12px 0 12px 24px;
    align-items: center;
    color: #3c4353;
    font-size: 24px;
    .ling {
      margin: 0 8px;
      width: 1px;
      height: 24px;
      background: #3c4353;
    }
    .voice_icon {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
  }
  .sop_box {
    width: 100%;
    min-height: 120px;
    background: @white;
    // margin-top: 24px;
    padding-top: 24px;
    .sop_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      .sop_title {
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
        color: @fontMain;
        padding-left: 20px;
        position: relative;
        &::before {
          content: "";
          width: 8px;
          height: 28px;
          background: @main;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .setting_btn {
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
    .sop_list {
      width: 100%;
      .sop_li {
        width: 100%;
        position: relative;
        border-bottom: 1px dashed @dashedColor;
        padding: 24px;
        display: flex;
        &:last-child {
          border: none;
        }
        .item {
          width: calc(50% - 30px);
          display: flex;
          font-size: 28px;
          line-height: 40px;
          &:last-child {
            margin-left: 12px;
          }
          .label {
            color: @fontSub2;
            white-space: nowrap;
          }
          .val {
            color: @fontMain;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
  .lable_box {
    width: 100%;
    min-height: 120px;
    background: @white;
    // margin-top: 24px;
    padding: 24px;
    margin-bottom: 24px;
    .lable_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // padding: 0 24px;
      .lable_title {
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
        color: @fontMain;
        padding-left: 20px;
        position: relative;
        &::before {
          content: "";
          width: 8px;
          height: 28px;
          background: @main;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .setting_btn {
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
          background: url("../../assets/images/edit.png") no-repeat;
          background-size: 100%;
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
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
        display: flex;
    height: 300px;
    overflow: hidden;
        flex-wrap: wrap;
        .name_item {
          margin-right: 16px;
          margin-top: 16px;
          padding:0 16px;
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
  .allText {
    color: #4168f6;
    margin-bottom: 16px;
  }
  .timeLine {
    padding: 30px 24px 0;
    background: #fff;
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
        // text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
      }
      .descTxt {
        font-weight: 600;
        color: #3c4353;
        margin-bottom: 16px;
      }
    }
  }
}

.portrait-box {
  padding: 24px;
  background: #fff;
}
.portrait_img img {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  margin-right: 20px;
}
.portrait_tite {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #3c4353;
  font-weight: 500;
}
.portrait_message {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  color: #838a9d;
  font-weight: 400;
  margin-top: 16px;
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
}
/* 群数量 */
.group_num {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  width: 702px;
  height: 138px;
  background: rgba(65, 104, 246, 0.02);
  border: 1px solid #4168f6;
  border-radius: 4px;
  margin: 24px auto 0;
}
.num {
  font-size: 32px;
  color: #3c4353;
  text-align: center;
  font-weight: 600;
}
.num_tite {
  font-size: 24px;
  color: #838a9d;
  text-align: center;
  font-weight: 400;
}
/* 列表 */
.list-box {
  margin-top: 24px;
}
.list_tite {
  font-size: 28px;
  color: #838a9d;
  font-weight: 400;
  margin-bottom: 16px;
}
.list-warp {
  margin-bottom: 24px;
  // height: 1000px;
}
.lsits {
  padding: 34px;
  background: #fff;
}
.no_more {
  font-size: 24px;
  color: #c0c4cc;
  letter-spacing: 0;
  font-weight: 400;
  text-align: center;
  margin-top: 24px;
}
.num {
  font-size: 28px;
  color: #3c4353;
  font-weight: 400;
}
.ml24 {
  margin-left: 24px;
}
.firm {
  font-size: 24px;
  color: #ffb020;
  font-weight: 400;
}
.weix {
  font-size: 24px;
  color: #52bd94;
  font-weight: 400;
}
.flag {
  width: 88px;
  height: 88px;
  background: #4168f6;
  border-radius: 12px;
  text-align: center;
  line-height: 88px;
  color: #fff;
  font-size: 35px;
  margin-right: 20px;
}
.grom_name {
  width: 180px;
  /* color: #3c4353; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}
.in_block {
  display: inline-block;
}
</style>