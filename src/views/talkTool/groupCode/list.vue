<template>
  <div class="list_wrap">
    <div class="top_box">
      <TopTitle title="群活码"></TopTitle>
      <div class="nav_box">
        <div
          class="nav"
          :class="{ cur: item.code == search.type }"
          v-for="(item, index) in navList"
          :key="index"
          @click="navClickFun(item.code)"
        >
          {{ item.name }}
        </div>
        <div class="add_btn" @click="toFun('add')">新增</div>
      </div>
      <div class="search_box">
        <input
          class="search"
          v-model="search.livename"
          type="text"
          placeholder="请输入活码名称"
          @keyup.enter="searchFun"
        />
        <div class="search_btn" @click="searchFun">查询</div>
      </div>
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="list">
          <div class="li" v-for="item in list" :key="item.id">
            <div class="li_top">
              <div class="title_box">
                <div class="label">活码名称：</div>
                <div class="tit">{{ item.name }}</div>
              </div>
              <div class="opera">
                <div class="icon_btn" @click="toFun('edit', item)">
                  <img class="icon" src="@/assets/images/icon_edit_h.png" />
                  <span class="btn">编辑</span>
                </div>
                <div class="icon_btn" @click="deleteFun(item)">
                  <img class="icon" src="@/assets/images/icon_delete.png" />
                  <span class="btn">删除</span>
                </div>
              </div>
            </div>
            <div class="li_val">
              <div class="code_box">
                <div class="img_box" v-if="item.switchStatus">
                  <img :src="item.address" alt="" />
                </div>
                <div class="img_box" :id="'Qrcode' + item.id" v-else>
                  <VueQrcode
                    :value="item.address"
                    :ref="'Qrcode' + item.id"
                    :options="{ width: '100%' }"
                    class="qrcode"
                  ></VueQrcode>
                </div>
                <div
                  class="look_btn"
                  v-if="item.switchStatus"
                  @click="sendCode(item)"
                >
                  查看二维码
                </div>
              </div>
              <div class="info_box" @click="openDetail(item)">
                <div class="item">
                  <div class="label">渠道：</div>
                  <div class="val">{{ item.chName }}</div>
                </div>
                <div class="item">
                  <div class="label">拉群方式：</div>
                  <div class="val">
                    {{ item.addBy == "1" ? "群二维码拉群" : "企微活码拉群" }}
                  </div>
                </div>
                <div class="item">
                  <div class="label">创建人员：</div>
                  <div class="val">{{ item.createBy }}</div>
                </div>
                <div class="item">
                  <div class="label">创建时间：</div>
                  <div class="val">{{ item.createTime }}</div>
                </div>
                <div class="item" v-if="item.userNames">
                  <div class="label">使用员工：</div>
                  <div class="val">{{ item.userNames }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 详情 -->
    <van-popup position="center" round closeable v-model="dialog">
      <div class="popup_wrap">
        <div class="popup_header">群活码详情</div>
        <div class="popup_content">
          <div class="p_item">
            <div class="label">活码展示：</div>
            <div class="val">
              <div class="img_box" v-if="detail.switchStatus">
                <img :src="detail.address" alt="" />
              </div>
              <div class="img_box" v-else>
                <VueQrcode
                  :value="detail.address"
                  :ref="'Qrcode' + detail.id"
                  class="qrcode"
                ></VueQrcode>
              </div>
            </div>
          </div>
          <div class="p_item">
            <div class="label">活码名称：</div>
            <div class="val">{{ detail.name }}</div>
          </div>
          <div class="p_item">
            <div class="label">渠道：</div>
            <div class="val">{{ detail.chName }}</div>
          </div>
          <div class="p_item">
            <div class="label">拉群方式：</div>
            <div class="val">
              {{ detail.addBy == "1" ? "群二维码拉群" : "企微活码拉群" }}
            </div>
          </div>
          <div class="p_item">
            <div class="label">使用员工：</div>
            <div class="val">{{ detail.userNames }}</div>
          </div>
          <div class="p_item">
            <div class="label">入群引导语：</div>
            <div class="val">{{ detail.contest }}</div>
          </div>
          <div class="p_item">
            <div class="label">创建人员：</div>
            <div class="val">{{ detail.createBy }}</div>
          </div>
          <div class="p_item">
            <div class="label">创建时间：</div>
            <div class="val">{{ detail.createTime }}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 弹框 -->
    <div class="alten_box" v-if="showAlt">
      <div class="box_warpalt">
        <div class="warp_alt">
          <p class="alter_tite">温馨提示</p>
          <p class="alter_text">是否确认删除</p>
        </div>
        <div class="but_text">
          <p class="quxiao" @click="Clickcancel">取消</p>
          <p class="queding" @click="Addconfirm">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from "./components/topTitle.vue";
import { livecodegroup_getlist, livecodegroup_delete } from "@/api/group";
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  components: {
    TopTitle,
    VueQrcode,
  },
  data() {
    return {
      navList: [
        { name: "全部活码", code: "" },
        { name: "我的活码", code: "1" },
      ],
      showAlt: false,
      search: {
        type: "", //1 我的  '' 全部
        livename: "",
        page: 1,
        limit: 10,
      },
      list: [],
      total: 0,
      dialog: false,
      detail: {},
      finished: false,
      loading: false,
      noListLoading: false,
      dialog_code: false,
      codeDialogAddress: "",
      nowData: {},
    };
  },
  mounted() {
    // this.getList()
  },
  created() {
    this.getList();
  },
  methods: {
    onLoad() {
      console.log("load");
      this.getList();
    },
    navClickFun(id) {
      this.search.type = id;
      this.searchFun();
    },
    getList() {
      //获取活码列表
      let _self = this;
      livecodegroup_getlist(this.search, this.noListLoading).then((res) => {
        if (res.result) {
          console.log("getList", this.list, _self.list);
          console.log("search.page", this.search.page, _self.search.page);
          this.noListLoading = true;
          let list = res.data.iPage.records,
            total = res.data.iPage.total;
          this.loading = false;
          if (this.search.page == 1) {
            this.list = [];
          }
          this.search.page++;
          this.list = this.list.concat(list);
          this.total = total;
          if (this.list.length >= total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        }
      });
    },
    // 取消
    Clickcancel() {
      this.showAlt = false;
    },

    deleteFun(row) {
      this.showAlt = true;
      //删除活码
      //   this.$dialog
      // .confirm({
      //   title: "温馨提示",
      //   message: "是否确认删除",
      // })
      // .then(() => {
      //   console.log("yes");
      this.nowData = {
        livecodeNo: row.livecodeNo,
      };
      //   livecodegroup_delete(_data).then((res) => {
      //     if (res.result) {
      //       this.search.page--;
      //       this.getList();
      //     }
      //   });
      // })
      // .catch(() => {
      //   // on cancel
      //   console.log("cancel");
      // });
    },
    // 确定
    Addconfirm() {
      this.showAlt = false;
      livecodegroup_delete(this.nowData).then((res) => {
        if (res.result) {
          this.search.page--;
          this.getList();
        }
      });
    },
    openDetail(row) {
      //详情
      this.detail = row;
      this.dialog = true;
    },
    sendCode(item) {
      //查看二维码
      console.log("item", item);
      var a = document.createElement("a");
      a.download = "";
      if (item.switchStatus) {
        a.href = item.address;
        a.click();
      } else {
        let p = "Qrcode" + item.id;
        let canvas = document.getElementById(p).getElementsByTagName("canvas");
        a.href = canvas[0].toDataURL("img/png");
        // console.log(canvas[0].toDataURL('img/png'))
        // a.download = '二维码'
        a.click();
      }
    },
    toFun(type, row) {
      let _url = "",
        _query = null;
      switch (type) {
        case "add":
          _url = "/talkTool/groupCodeAdd";
          break;
        case "edit":
          _url = "/talkTool/groupCodeAdd";
          _query = {
            id: row.livecodeNo,
          };
          localStorage.setItem("groupCodeDetail", JSON.stringify(row));
          break;
        case "delete":
          _url = "";
          break;
        default:
          break;
      }
      this.$router.push({
        path: _url,
        query: _query,
      });
    },
    searchFun() {
      this.search.page = 1;
      this.noListLoading = false;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.list_wrap {
  .alten_box {
    background: rgba(#000, 0.5);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    .box_warpalt {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%);
      .warp_alt {
        height: 160px;
      }
      background: #fff;
      width: 620px;
      //   padding: 20px;
      border-radius: 20px;

      text-align: center;
      .alter_tite {
        padding-top: 20px;
        font-weight: 600;
        color: #3c4353;
        font-size: 28px;
      }
      .alter_text {
        font-weight: 400;
        color: #3c4353;
        font-size: 28px;
        margin-top: 15px;
      }
      .but_text {
        display: flex;
        height: 80px;
        line-height: 80px;
        border-top: 1px solid #d9dae4;
        // justify-content: space-around;
        .quxiao {
          width: 50%;
          border-right: 1px solid #d9dae4;
        }
        .queding {
          width: 50%;
          color: #4168f6;
        }
      }
    }
  }

  width: 100%;
  /deep/ .van-popup__close-icon--top-right {
    right: 24px;
    top: 32px;
  }
  .popup_wrap {
    // width: calc(100vw - 48px);
    width: 702px;
    // min-height: 50vh;
    // max-height: 80vh;
    height: 60vh;
    background: @white;
    position: relative;
    padding-top: 88px;
    .popup_header {
      width: 100%;
      height: 88px;
      font-size: 28px;
      font-weight: 500;
      line-height: 88px;
      text-align: center;
      background: @headerBg;
      // position: relative;
      border-bottom: 1px solid @dashedColor;
      position: absolute;
      top: 0;
      left: 0;
    }
    .popup_content {
      width: 100%;
      height: calc(100% - 128px);
      background: @white;
      padding: 24px;
      position: relative;
      .p_item {
        width: 100%;
        font-size: 24px;
        line-height: 32px;
        display: flex;
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
        .label {
          width: 144px;
          color: @fontSub2;
          text-align: right;
        }
        .val {
          width: calc(100% - 144px);
          color: @fontMain;
          .img_box {
            width: 182px;
            height: 182px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .popup_footer {
      width: 100%;
      height: 128px;
      background: @white;
      padding: 24px;
      position: fixed;
      bottom: 0;
      left: 0;
      .footer {
        display: flex;
        justify-content: space-between;
        .btn {
          width: calc(50% - 12px);
          height: 80px;
          line-height: 78px;
          font-size: 24px;
          border: 1px solid @main;
          color: @main;
          border-radius: 8px;
          text-align: center;
          &.main {
            border-color: @main;
            background: @main;
            color: @white;
          }
        }
      }
    }
  }
  .top_box {
    width: 100%;
    min-height: 240px;
    background: @white;
    margin-bottom: 24px;
    .nav_box {
      width: 100%;
      height: 115px;
      padding: 0 24px;
      border-bottom: 1px solid @dashedColor;
      display: flex;
      position: relative;
      .nav {
        margin-right: 32px;
        font-size: 28px;
        line-height: 40px;
        color: @fontSub2;
        padding: 37.5px 0;
        font-weight: 550;
        &:last-child {
          margin-right: 0;
        }
        &.cur {
          color: @main;
          border-bottom: 4px solid @main;
        }
      }
    }
    .add_btn {
      width: 124px;
      height: 68px;
      font-size: 28px;
      line-height: 66px;
      border: 1px solid @bdColor;
      border-radius: 8px;
      color: @fontSub2;
      padding-left: 52px;
      position: absolute;
      cursor: pointer;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      &::before {
        content: "";
        width: 32px;
        height: 32px;
        background: url("../../../images/icon_add@2x.png") no-repeat;
        background-size: 100%;
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .search_box {
      width: 100%;
      padding: 24px;
      display: flex;
      .search {
        width: calc(100% - 120px);
        padding: 20px 24px;
        font-size: 28px;
        line-height: 40px;
        border: 1px solid @bdColor;
        border-radius: 8px;
        margin-right: 16px;
      }
      .search_btn {
        width: 104px;
        height: 80px;
        font-size: 28px;
        line-height: 80px;
        color: @white;
        background: @main;
        border-radius: 8px;
        text-align: center;
        transition: all 0.2s;
        &:active {
          background: rgba(@main, 0.85);
        }
      }
    }
  }
  .qrcode {
    width: 100% !important;
    height: 100% !important;
  }
  .content {
    width: 100%;
    .list {
      width: 100%;
      .li {
        width: 100%;
        min-height: 200px;
        background: @white;
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
        .li_top {
          width: 100%;
          padding: 24px;
          border-bottom: 1px solid @dashedColor;
          position: relative;
          .title_box {
            width: calc(100% - 220px);
            display: flex;
            .label {
              width: 140px;
              font-size: 28px;
              line-height: 40px;
              color: @fontSub2;
              white-space: nowrap;
            }
            .tit {
              width: calc(100% - 140px);
              font-size: 28px;
              line-height: 40px;
              color: @fontMain;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .opera {
            width: 184px;
            display: flex;
            position: absolute;
            right: 24px;
            top: 50%;
            transform: translateY(-50%);
            .icon_btn {
              height: 32px;
              margin-right: 16px;
              padding-left: 36px;
              position: relative;
              &:last-child {
                margin-right: 0;
              }
              .icon {
                width: 24px;
                height: 24px;
                margin-right: 10px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
              }
              .btn {
                font-size: 24px;
                line-height: 32px;
                color: @fontSub2;
                white-space: nowrap;
              }
            }
          }
        }
        .li_val {
          width: 100%;
          display: flex;
          padding: 24px 40px;
          .code_box {
            width: 182px;
            min-height: 182px;
            margin-right: 32px;
            .img_box {
              width: 182px;
              height: 182px;
              overflow: hidden;
              margin-bottom: 24px;
              .img {
                width: 100%;
                height: 100%;
              }
            }
            .look_btn {
              width: 100%;
              height: 48px;
              line-height: 46px;
              font-size: 24px;
              color: @main;
              text-align: center;
              background: rgba(@main, 0.04);
              border: 1px solid @main;
              border-radius: 6px;
            }
          }
          .info_box {
            width: calc(100% - 214px);
            .item {
              width: 100%;
              font-size: 28px;
              line-height: 40px;
              display: flex;
              margin-bottom: 16px;
              &:last-child {
                margin-bottom: 0;
              }
              .label {
                width: 140px;
                color: @fontSub2;
                white-space: nowrap;
                text-align: right;
              }
              .val {
                width: calc(100% - 140px);
                color: @fontMain;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
}
</style>