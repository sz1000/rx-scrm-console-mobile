<template>
  <div class="about_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">@我</span>
    </div>
    <div class="searchInput">
      <van-field v-model="value1" placeholder="关联客户名称">
        <template #left-icon>
          <van-icon name="search" />
        </template>
      </van-field>
      <div class="select_box" @click="filterCard">
        <span>{{tabName == 1? '全部' : tabName == 2 ? '我负责的' :'我协助的'}}</span>
        <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
      </div>
    </div>
    <div class="nav_tab">
      共 <span>{{num}}</span> 条@我待回复,关联 <span>{{numCustomer}}</span> 个客户
    </div>
    <section>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index'>
          <div class="chat_warp">
            <div class="chat_one" v-for="(list,index ) in item.msgList" :key="index">
              <div class="left_cnt">
                <img :src="list.context.sendUserInfo.avatar" alt="">
                <div class="content">
                  <div class="name_one">{{list.context.sendUserInfo.userName}}</div>
                  <div class="creat_time">{{list.createTime}}</div>
                  <div class="cont_text">
                    <span>@我</span>
                    &nbsp;
                    <span>{{list.context.content}}</span>
                  </div>
                </div>
              </div>
              <img src="../../images/ico_pl.png" alt="" class="talk" @click="goCustomer(list)" />
            </div>
          </div>
          <div class="custom_msg">
            <img :src="item.avatar" alt="" v-if="item.avatar" />
            <!-- <img src="../../images/xiansuo.png" alt="" v-else /> -->
            <div class="name_text">{{item.name}}</div>
            <span :class="item.customerType == 1 ? 'qiye' : 'weixin'">{{item.status == 2 ? '@微信' :'@'+ item.customerName || item.cropFullName}}</span>
          </div>
        </div>
      </div>
    </section>
    <div class="filter_box">
      <van-action-sheet v-model="showFilter" :actions="actions" cancel-text="取消" close-on-click-action @select='fnSelect' />
    </div>
  </div>
</template>
<script>
import { getAbutMe } from '../../api/myHome'
export default {
  data() {
    return {
      value1: '',
      tab: this.$route.query.tab,
      num: this.$route.query.forReply,
      numCustomer: this.$route.query.forReplyCustomer,
      cardList: [],
      showFilter: false,
      actions: [
        { name: '全部', id: 1 },
        { name: '我负责的', id: 2 },
        { name: '我协助的', id: 3 },
      ],
      tabName: 1,
    }
  },
  created() {
    this.getData()
  },

  methods: {
    getData() {
      let obj = {
        id: this.tabName,
      }
      getAbutMe(obj).then((res) => {
        let dataList = res.data
        dataList.forEach((item) => {
          item.msgList.forEach((val) => {
            val.context = JSON.parse(val.context)
          })
        })
        this.cardList = dataList
        // console.log('@wo------', this.cardList)
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    tabClick(v) {
      this.tab = v
    },
    filterCard() {
      this.showFilter = true
    },
    fnSelect(v) {
      this.tabName = v.id
      this.getData()
    },
    goCustomer(val) {
      console.log(val)
      // this.$router.push({
      //   path: '',
      //   query: {
      //     id: val.followId,
      //   },
      // })
    },
  },
}
</script>
<style lang="less" scoped>
.about_warp {
  background: #fff;
  height: 100%;
  padding-top: 87px;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 750px;
    transform: translateX(-50%);
    cursor: pointer;
    // background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    line-height: 87px;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #e6e6e6;
    // border-bottom: 1px solid #e6e6e6;
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
  .searchInput {
    // background: #fff;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-field {
      height: 68px;
      width: 424px;
      background: #f7f8fa;
      border-radius: 16px;
      padding: 0;
      padding-left: 32px;
      line-height: 68px;
    }
    .select_box {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #838a9d;
      width: 230px;
      height: 68px;
      background: #f7f8fa;
      border-radius: 16px;
      justify-content: space-between;
      padding: 0 32px;
      .rotate {
        transform: rotate(180deg);
      }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
  .nav_tab {
    // background: #fff;
    padding: 0 32px;
    height: 114px;
    line-height: 114px;
    font-size: 28px;
    text-align: right;
    border-bottom: 2px solid #e6e6e6;
    font-size: 24px;
    color: #838a9d;
    span {
      font-size: 28px;
      color: #3c4353;
    }
  }

  .custom_content {
    padding: 0 32px;
    .card_box {
      padding: 0 32px;
      // background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.04);
      border-radius: 16px;
      margin-top: 32px;
      .chat_warp {
        padding-top: 32px;
        .chat_one {
          display: flex;
          margin-bottom: 56px;
          justify-content: space-between;
          .left_cnt {
            display: flex;
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin-right: 16px;
            }
            .content {
              .name_one {
                font-size: 28px;
                color: #3c4353;
                font-weight: bold;
              }
              .creat_time {
                color: #c0c4cc;
                font-size: 24px;
                margin: 8px 0 16px;
              }
              .cont_text {
                font-size: 28px;
                span:nth-child(1) {
                }
                span:nth-child(2) {
                  color: #c0c4cc;
                }
              }
            }
          }
          .talk {
            width: 32px;
            height: 32px;
          }
        }
      }
      .custom_msg {
        display: flex;
        align-items: center;
        border-top: 1px solid #e6e6e6;
        height: 110px;
        .name_text {
          font-size: 32px;
          color: #3c4353;
          margin: 0 8px;
        }
        .weixin {
          display: inline-block;
          font-size: 24px;
          color: #52bd94;
          margin-right: 8px;
        }
        .qiye {
          display: inline-block;
          font-size: 24px;
          color: #ffb020;
          margin-right: 8px;
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }
    }
  }
  .filter_box {
    .van-action-sheet__item {
      border-bottom: 1px solid #e6e6e6;
    }
  }
}
</style>