<template>
  <div class="warp-portrait">
    <div class="portrait-box">
      <div class="flex">
        <div class="portrait_img">
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
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <!--  -->
          <li class="lsits list-warp" v-for="(item, index) in dataList" :key="index">
            <div class="flex">
              <div class="portrait_img">
                <img class="avatar" v-if="item.avatar != ''" :src="item.avatar" alt="" />
                <div class="flag" v-if="item.avatar == ''">
                  {{ item.name.substr(0, 1) }}
                </div>
              </div>
              <div class="val">
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
import { user_getUserName } from '@/api/home'
import { sop_groupSopList } from '@/api/sop'
import { 
  group_getGroupDetail,
  group_getGroupUserPage,
} from '@/api/customer'
export default {
  data() {
    return {
      channelList: [],
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
      noListLoading: false,
    }
  },
  computed: {
    chatId() {
      return this.$store.getters.chatId || sessionStorage.getItem('chatId')
    },
  },
  created() {
    this.getMethod()
  },
  methods: {
    getMethod() {
      if (!this.chatId) {
        console.log('no chatId')
      } else {
        console.log('init',this.chatId)
        this.init()
      }
    },
    init() {
      this.pageInfo.page = 1
      this.getGroupDetail()
      this.getList()
      this.getUserName()
    },
    getUserName() {  //获取权限数据
      user_getUserName().then(res => {
        if(res.result){
          let data = res.data
          this.showSecret = !data.haveSecret
        }
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
      let id = this.chatId || 'wryPDZEQAAeTjSevfGvCxJG1Qx26C-wQ'
      group_getGroupDetail(id).then(res => {
        if(res.result){
          // this.show = false
          // this.finished = true;
          this.groupId = res.data.id
          if (res.data.owmer == res.data.userId) {
            console.log('我是群主')
            this.isOwmer = true
            this.getSopList()
          }
          this.datatTite.name = res.data.name
          this.datatTite.usersum = res.data.usersum
          this.datatTite.owmerName = res.data.owmerName
          this.datatTite.createTime = formatDate(
            res.data.createTime,
            'yyyy-MM-dd hh:mm:ss'
          )
          this.datatTite.joinsum = res.data.joinsum
          this.datatTite.leavesum = res.data.leavesum
        }
      })
    },
    getList() {
      let id = 'wryPDZEQAAeTjSevfGvCxJG1Qx26C-wQ'
      let obj = {
        chatId: this.chatId || id,
        ...this.pageInfo,
      }
      group_getGroupUserPage(obj,this.noListLoading).then(res => {
        if(res.result){
          let tempList = res.data.data.records //请求返回当页的列表
          this.loading = false
          this.noListLoading = true
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
        }
      })
    },
    // 去重一次
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
  },
}
</script>
<style lang="less" scoped>
@main: #4168f6;
@white: #fff;
@fontMain: #3c4353;
@fontSub2: #838a9d;
@bdColor: #d9dae4;
@dashedColor: #f0f2f7;
.loding {
  top: 50%;
  left: 50%;
  transform: translate(-2%, -50%);
}
.warp-portrait {
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
.portrait_img{
  width: 88px;
  height: 88px;
  margin-right: 20px;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
.val{
  width: calc(100% - 108px);
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
  border: 1px solid #4168f6; /* no */
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