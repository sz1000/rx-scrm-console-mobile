<template>
  <div class="myhome_index">
    <div class="page_title">
      <div class="head_img">
        <img src="../../images/img_head.png" alt="">
        <div class="person_info">
          <p>{{identityName}}</p>
          <p>{{identity}}</p>
        </div>
      </div>
      <div class="change_identity" @click="changeIdent">
        <img src="../../images/change_id.png" alt="">
        <span>切换身份</span>
      </div>
    </div>
    <div class="content_warp">
      <div class="statistical">
        <div class="box">
          <p>{{num}}</p>
          <p>客户</p>
        </div>
        <div class="box">
          <p>{{num}}</p>
          <p>群聊</p>
        </div>
        <div class="box">
          <p>{{num}}</p>
          <p>朋友圈</p>
        </div>
      </div>
      <div class="wait_warp">
        <div class="text_wait">
          <span>待处理</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" @click="goToWait" />
        </div>
        <div class="task_msg">
          <div class="left_warp">
            <div class="blank">
              <p>朋友圈</p>
              <p>待发表<span class="friend">{{num}}</span>条</p>
            </div>
            <img src="../../images/friend_ic.png" alt="">
          </div>
          <div class="right_warp">
            <div class="blank">
              <p>群发任务</p>
              <p>待发表<span class="group">{{num}}</span>条</p>
            </div>
            <img src="../../images/group_task.png" alt="">
          </div>
        </div>
      </div>
      <div class="about_me">
        <span>@我</span>
        <div class="reply_text">
          <span>10条待回复,关联3个客户</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
      <div class="cust_activate">
        <div class="text_wait">
          <span>客户激活</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" @click="goToCustom" />
        </div>
        <div class="stati_num">
          <div class="box">
            <p>{{num}}</p>
            <p>客户</p>
          </div>
          <div class="box">
            <p>{{num}}</p>
            <p>群聊</p>
          </div>
          <div class="box">
            <p>{{num}}</p>
            <p>朋友圈</p>
          </div>
        </div>
      </div>
      <div class="about_me custom_reply">
        <span>客户寻回</span>
        <div class="reply_text">
          <span>10个客户待寻回</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
      <div class="custom_add">
        <CustomAddChart></CustomAddChart>
      </div>
    </div>
    <section class="popup_warp">
      <van-popup v-model="showIdent">
        <div class="popup_content">
          <!-- <img src="../../images/selected.png" alt="">
          <img src="../../images/no_select.png" alt=""> -->
          hahhah

        </div>
        <div class="close_warp" @click="closePopup">
          <img src="../../images/close_popup.png" alt="">
        </div>
      </van-popup>
    </section>
  </div>
</template>
<script>
import CustomAddChart from './echartComponent/CustomAddChart.vue'
export default {
  components: {
    CustomAddChart,
  },
  data() {
    return {
      identityName: '哈哈哈',
      identity: '个人',
      num: 1,
      showIdent: false,
    }
  },
  methods: {
    changeIdent() {
      // this.showIdent = true
    },
    closePopup() {
      this.showIdent = false
    },
    goToWait() {
      this.$router.push('/waitDealwith')
    },
    goToCustom() {
      this.$router.push('/customeActive')
    },
  },
}
</script>
<style lang="less" scoped>
@import './myIndex.less';
</style>