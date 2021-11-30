<template>
  <div class="custom_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户联系</span>
    </div>
    <div class="searchInput">
      <van-field v-model="value1" placeholder="客户名称/公司/手机号码">
        <template #left-icon>
          <van-icon name="search" />
        </template>
      </van-field>
      <!-- <img src="../../images/filter_ic.png" alt="" @click="filterCard" /> -->
      <div class="select_box" @click="filterCard">
        <span>{{tabName}}</span>
        <img src="../../images/arrow_down.png" alt="" :class="{'rotate' : showFilter}" />
      </div>
    </div>
    <div class="nav_tab">
      <div :class="{'active' : tab == 1}" class="nomalText" @click="tabClick(1)">客户激活<span>({{num}})</span></div>
      <div :class="{'active' : tab == 2}" class="nomalText" @click="tabClick(2)">客户寻回<span>({{num}})</span></div>
    </div>
    <section v-show="tab==1">
      <div class="active_btn">
        <p class="p_text">已累计激活<span>{{num}}</span>个客户</p>
        <p class="p_btn" v-if="tabName !== '已激活'">一键激活</p>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index'>
          <div class="left_msg">
            <div class="img_box">
              <img :src="item.avtar" alt="" v-if="item.avtar" />
              <img src="../../images/xiansuo.png" alt="" v-else />
            </div>
            <div class="detail_msg">
              <div class="first_text">
                <span>{{item.name}}</span>
                <span :class="item.status == 1 ? 'weixin' : 'qiye'">{{item.status == 1 ? '@微信' : '@企业'}}</span>
                <img src="../../images/man.png" alt="" v-if="item.gender == 1" />
                <img src="../../images/icon_female@2x.png" alt="" v-show='item.gender ==2' />
              </div>
              <div class="seconde_text" v-if="tabName== '已激活'">
                <p>{{item.phone}}</p>
                <p>{{item.company}}</p>
                <p>
                  <span class="time_two">激活时间</span>
                  <span>{{item.createTime}}</span>
                </p>
                <p>
                  <span class="time_two">激活人</span>
                  <span>{{item.creatBy}}</span>
                </p>
              </div>
              <div class="seconde_text" v-else>
                <p>{{item.phone}}</p>
                <p>{{item.company}}</p>
                <p>
                  <span class="time_one">最近一次互动</span>
                  <span>{{item.createTime}}</span>
                </p>
                <p>
                  <span class="time_one">负责人</span>
                  <span>{{item.creatBy}}</span>
                </p>
              </div>

            </div>
          </div>
          <div class="right_msg">
            <span>{{item.score}} </span>分
          </div>
        </div>
      </div>
    </section>
    <section v-show="tab==2">
      <div class="active_btn">
        <p class="p_text">已累计激活<span>{{num}}</span>个客户</p>
        <p class="p_btn" v-if="tabName !== '已激活'">一键寻回</p>
      </div>
      <div class="custom_content">
        <div class="card_box" v-for="(item,index) in cardList" :key='index'>
          <div class="left_msg">
            <div class="img_box">
              <img :src="item.avtar" alt="" v-if="item.avtar" />
              <img src="../../images/xiansuo.png" alt="" v-else />
            </div>
            <div class="detail_msg">
              <div class="first_text">
                <span>{{item.name}}</span>
                <span :class="item.status == 1 ? 'weixin' : 'qiye'">{{item.status == 1 ? '@微信' : '@企业'}}</span>
                <img src="../../images/man.png" alt="" v-if="item.gender == 1" />
                <img src="../../images/icon_female@2x.png" alt="" v-show='item.gender ==2' />
              </div>
              <div class="seconde_text" v-if="tabName== '已激活'">
                <p>{{item.phone}}</p>
                <p>{{item.company}}</p>
                <p>
                  <span class="time_two">激活时间</span>
                  <span>{{item.createTime}}</span>
                </p>
                <p>
                  <span class="time_two">激活人</span>
                  <span>{{item.creatBy}}</span>
                </p>
              </div>
              <div class="seconde_text" v-else>
                <p>{{item.phone}}</p>
                <p>{{item.company}}</p>
                <p>
                  <span class="time_one">最近一次互动</span>
                  <span>{{item.createTime}}</span>
                </p>
                <p>
                  <span class="time_one">负责人</span>
                  <span>{{item.creatBy}}</span>
                </p>
              </div>

            </div>
          </div>
          <div class="right_msg">
            <span>{{item.score}} </span>分
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
export default {
  data() {
    return {
      value1: '',
      tab: this.$route.query.tab,
      num: 10,
      cardList: [
        {
          avtar: '',
          name: '哈哈哈哈',
          score: '242',
          phone: '123123213',
          company: '黄金卡号的卡号',
          createTime: '2021-9-12 12:30:20',
          creatBy: '六打包',
          status: 2,
          gender: 1,
        },
        {
          avtar: '',
          name: '哈哈哈哈',
          score: '242',
          phone: '123123213',
          company: '黄金卡号的卡号',
          createTime: '2021-9-12 12:30:20',
          creatBy: '六打包',
          status: 1,
          gender: 2,
        },
      ],
      showFilter: false,
      actions: [
        { name: '从未联系' },
        { name: '超过1天' },
        { name: '超过3天' },
        { name: '超过1周' },
        { name: '超过2周' },
        { name: '已激活' },
      ],
      tabName: '从未联系',
    }
  },
  methods: {
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
      this.tabName = v.name
      console.log(v)
    },
  },
}
</script>
<style lang="less" scoped>
.custom_warp {
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
    background: #fff;
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
    height: 88px;
    line-height: 88px;
    display: flex;
    font-size: 28px;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .nomalText {
      color: #838a9d;
      width: 375px;
      text-align: center;
    }
    .active {
      color: #3c4353;
      font-weight: bold;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 40%;
        width: 56px;
        height: 8px;
        background: #4168f6;
        border-radius: 4px;
      }
    }
  }
  .active_btn {
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #e6e6e6;
    .p_text {
      color: #838a9d;
      font-size: 24px;
      span {
        color: #3c4353;
        font-size: 28px;
      }
    }
    .p_btn {
      width: 192px;
      height: 64px;
      background: #4168f6;
      border-radius: 32px;
      color: #fff;
      text-align: center;
      line-height: 64px;
    }
  }
  .custom_content {
    .card_box {
      display: flex;
      justify-content: space-between;
      padding: 32px;
      border-bottom: 1px solid #e6e6e6;
      .left_msg {
        display: flex;
        .img_box {
          margin-right: 16px;
          img {
            width: 96px;
            height: 96px;
            border-radius: 50%;
          }
        }
        .first_text {
          display: flex;
          align-items: flex-end;
          span:nth-child(1) {
            display: inline-block;
            font-size: 32px;
            color: #3c4353;
            margin-right: 8px;
            font-weight: bold;
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
            width: 28px;
            height: 28px;
          }
        }
        .seconde_text {
          p {
            color: #838a9d;
            font-size: 24px;
            margin-top: 8px;
            .time_one {
              display: inline-block;
              width: 144px;
              margin-right: 16px;
            }
            .time_two {
              display: inline-block;
              width: 96px;
              margin-right: 16px;
            }
          }
        }
      }
      .right_msg {
        width: 114px;
        height: 48px;
        background: rgba(65, 104, 246, 0.1);
        border-radius: 26px;
        color: #4168f6;
        font-size: 24px;
        text-align: center;
        line-height: 48px;
        span {
          font-size: 28px;
          font-weight: bold;
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