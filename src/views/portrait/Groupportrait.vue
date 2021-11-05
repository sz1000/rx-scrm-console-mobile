<template>
  <div class="warp-portrait">
    <div class="portrait-box">
      <div class="flex">
        <div class="portrait_img">
          <!-- <img src="../../images/groupico.png" alt="" /> -->
          <div class="flag">群</div>
        </div>
        <div>
          <p class="portrait_tite">
            {{ datatTite.name || "暂无" }}
            <span>({{ datatTite.usersum }})</span>
          </p>
          <p class="portrait_message">
            <span class="grom_name">群主：{{ datatTite.owmerName || "暂无" }}</span>
            <span class="ml24 in_block">建群时间 ：{{ datatTite.createTime || "暂无" }}</span>
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
        <!-- <div>
          <p class="num">{{ datatTite.leavesum }}</p>
          <p class="num_tite">今日退群</p>
        </div> -->
      </div>
    </div>
    <!-- 群sop -->
    <div class="sop_box" v-if="isOwmer">
      <div class="sop_top">
        <div class="sop_title">群SOP</div>
        <div class="setting_btn" @click="settingSopFun">设置</div>
      </div>
      <div class="sop_list">
        <div class="sop_li" v-for="item in sopList" :key="item.id">
          <div class="item">
            <div class="label">SOP名称：</div>
            <div class="val">{{item.ruleName}}</div>
          </div>
          <div class="item">
            <div class="label">推送规则：</div>
            <div class="val">{{item.promptRule ? '周期推送' : '定时推送'}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <!--  -->
          <li class="lsits list-warp" v-for="(item, index) in dataList" :key="index">
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
                  <span class="firm" v-if="item.customerType == 2">@{{ item.corpName }}</span>
                  <span class="weix" v-if="item.customerType == 1">@微信</span>
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
    <!-- <p class="no_more">没有更多</p> -->
    <van-overlay :show="show">
      <van-loading class="loding" type="spinner" color="#fff" size="24" />
    </van-overlay>
    <!-- 是否填写Secret -->
    <van-overlay :show="showSecret">
      <div class="wrapper" @click.stop>
        <div class="dialogImg" align="center">
          <img src="../../images/secreteig.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>         
<script>
import { formatDate } from '../../utils/tool.js'
import commonFun from '../../utils/commonToken'
import { sop_groupSopList } from '@/api/sop'
export default {
  data() {
    return {
      channelList: [],
      show: true,
      loading: false,
      finished: false,
      refreshing: false,
      // 群信息
      datatTite: {
        name: '',
        usersum: '',
        createTime: '',
        owmerName: '',
        usersum: '',
        leavesum: '',
        joinsum: '',
        total: 0, //总共的数据条数
      },
      pageInfo: {
        page: 1,
        limit: 10,
      },
      // 群用户列表
      dataList: [],

      sopList: [], //群 sop 列表
      groupId: '',
      isOwmer: false, //是否群主
      showSecret: false,
    }
  },
  computed: {
    chatId() {
      console.log("this.$store.getters.chatId???", this.$store.getters.chatId)
      return this.$store.getters.chatId || sessionStorage.getItem('chatId')
    },
  },
  created() {
    this.getMethod()
  },
  methods: {
    getMethod() {
      if (!this.chatId) {
        commonFun.getWxAppid()
      } else {
        this.init()
      }
    },
    init() {
      this.pageInfo.page = 1
      this.getGroupDetail()
      this.getList()
      this.getUserName()
    },
    getUserName() {
      this.$network
        .get('/user-service/user/getUserName', { endPoint: 'mobile' })
        .then((res) => {
          this.showSecret = !res.data.haveSecret
        })
    },
    onLoad() {
      console.log('屏幕滚动')

      this.pageInfo.page += 1
      // console.log(this.pageInfo.page++);
      this.getList()
    },
    getSopList() {
      //获取sop规则列表
      sop_groupSopList(this.groupId).then((res) => {
        if (res.result) {
          let list = res.data
          this.sopList = list
        }
      })
    },
    settingSopFun() {
      //设置sop规则
      this.$router.push({
        path: '/settingSop',
        query: {
          id: this.groupId,
        },
      })
    },
    getGroupDetail() {
      this.$network
        .get('/customer-service/group/getGroupDetail', {
          // chatId: this.$route.query.id,
          // chatId: "wrY-gRDAAABrTSnrxZMlwiM4Y6T1GGdg",
          // chatId: "wrY-gRDAAA36v0CIMKDBwkiUSuOkZqJQ",
          // chatId: "wrY-gRDAAALApfvGUiZiPu09NtjwCyGw",
          // chatId: "wrY-gRDAAATrKANZTq32CigxbX1FKRdg",
          // chatId: localStorage.getItem("chatId"),
          chatId: this.chatId,
        })
        .then((res) => {
          if (res.result) {
            this.show = false
            // this.finished = true;
            this.groupId = res.data.id
            if (res.data.owmer == res.data.userId) {
              console.log('我是群主')
              this.isOwmer = true
              this.getSopList()
            }
          }
          // this.getSopList()   //本地调试用
          // this.show = false;  //画页面用 2021/10/11
          this.datatTite.name = res.data.name
          this.datatTite.usersum = res.data.usersum
          this.datatTite.owmerName = res.data.owmerName
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            'yyyy-MM-dd hh:mm:ss'
          )
          this.datatTite.joinsum = res.data.joinsum
          this.datatTite.leavesum = res.data.leavesum
        })
    },
    getList() {
      this.$network
        .get('/customer-service/group/getGroupUserPage', {
          // chatId: this.$route.query.id,
          // chatId: "wrY-gRDAAABrTSnrxZMlwiM4Y6T1GGdg",
          // chatId: "wrY-gRDAAATrKANZTq32CigxbX1FKRdg",
          // chatId: "wrY-gRDAAALApfvGUiZiPu09NtjwCyGw",
          // wrY-gRDAAA0w-s-nmhpGiOpbpDQvHCvQ
          // chatId: localStorage.getItem("chatId"),
          chatId: this.chatId,
          ...this.pageInfo,
        })
        .then((res) => {
          let tempList = res.data.data.records //请求返回当页的列表
          this.loading = false
          this.total = res.data.data.total
          if (tempList == null || tempList.length === 0) {
            // 加载结束
            this.finished = true
            return
          }

          tempList.forEach((item) => {
            item.joinTime = item.joinTime
              ? formatDate(item.joinTime, 'yyyy-MM-dd hh:mm:ss')
              : '-'
            item.type = item.type == '1' ? '企业成员' : '外部联系人'
            if (item.joinScene == '1') {
              item.joinScene = '直接邀请入群'
            } else if (item.joinScene == '2') {
              item.joinScene = '通过邀请链接入群'
            } else {
              item.joinScene = '通过扫描群二维码入群'
            }
            item.showName = item.showName ? item.showName : item.name
            console.log(item.id)
          })
          // 将新数据与老数据进行合并
          let newSetArr = this.dataList.concat(tempList)
          // this.dataList = this.dataList.concat(tempList);
          this.dataList = this.unique(newSetArr)
          // this.dataList = tempList;
          console.log(this.dataList)
          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.dataList.length >= this.total) {
            this.finished = true
          }
          // this.dataList = tempList;
          // this.total = res.data.data.total;
          // let lengrod = res.data.data.records;
          // let newSetArr = this.channelList.concat(lengrod);

          // this.channelList = this.unique(newSetArr);

          // console.log(this.channelList);
          // if (lengrod == null || lengrod.length === 0)
          //   if (this.channelList.length >= this.total) {
          //     this.finished = true;
          //   } else {
          //     // this.onLoad();
          //   }
        })
    },
    // onRefresh() {
    //   // 清空列表数据
    //   console.log("清空列表数据");
    // },
    // 去重一次
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
  },
  // mounted() {
  //   console.log("mounted");
  //   localStorage.removeItem("chatId");
  // },
  // beforeDestroy() {
  //   console.log("beforeDestroy");
  //   localStorage.removeItem("chatId");
  // },
}
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
.loding {
  top: 50%;
  left: 50%;
  transform: translate(-2%, -50%);
  // transform: translate(-50%, -50%);
}
.warp-portrait {
  /* padding: 24px; */
  /* background: #838a9d; */
  .sop_box {
    width: 100%;
    min-height: 120px;
    background: @white;
    margin-top: 24px;
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
          content: '';
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
          content: '';
          width: 32px;
          height: 32px;
          background: url('../../assets/images/icon_setting.png') no-repeat;
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
  margin-top: 24px;
  // height: 1000px;
}
.lsits {
  padding: 24px;
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
.dialogImg {
  margin-top: 20%;
  img {
    width: 702px;
  }
}
</style>