<template>
  <div>
    <van-action-sheet v-model="sopPopup" title="个人SOP提醒">
      <div class="content">
        <div class="codeDetail">
          <div class="sop-box">
            <div class="sop-newsText">
              <span class="line-border"></span>
              <span class="sop-time"> [2021-07-02 12:00] </span>
              给客户发送以下 <span class="sop-num"> 4 </span>消息
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_title">欢迎您加入哈哈哈哈哈哈，一起加油吧~</div>
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_warp">
                <div class="sop_imgWarp">
                  <div class="img-up">
                    <img src="../../images/iconadd.png" alt="" />
                  </div>
                  <div class="center_img">
                    <p class="img_text">图片副本.png</p>
                    <p class="img_size">29/9K</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sop-text">
              <div class="text_img">
                <img
                  style="width: 24px; height: 24px"
                  src="../../images/icon_add@2x.png"
                  alt=""
                />
              </div>
              <div class="sop_warp">
                <div class="sop_imgWarp">
                  <div class="img-up">
                    <img src="../../images/iconadd.png" alt="" />
                  </div>
                  <div class="center_img">
                    <p class="img_text">图片副本.png</p>
                    <p class="img_size">29/9K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<style lang="less" scoped>
.sop-box {
  height: 750px;
  background: #fafbff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  padding: 24px;
}
.sop-newsText {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .sop-time {
    margin-right: 20px;
  }
}
.line-border {
  width: 8px;
  height: 28px;
  background: #4168f6;
  display: inline-block;
  margin-right: 12px;
  margin-top: 4px;
}
.sop-num {
  color: #4168f6;
  margin: 0 5px;
}
.text_img {
  margin-right: 24px;
}
.sop-text {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.sop_title {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  width: 606px;
  height: 88px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  line-height: 88px;
  padding-left: 24px;
}
.list_box {
  // display: flex;
  width: 565px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_warp {
  // display: flex;
  width: 606px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_imgWarp {
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  // height: 160px;
  // padding-left: 24px;
  // background: #ffffff;
  // border-radius: 8px;
  // border: 1px solid #d9dae4;
}
.img-up img {
  width: 112px;
  height: 112px;
}
.img_text {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
}
.img_size {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
}
.center_img {
  line-height: 50px;
  margin-left: 16px;
}
</style>
<script>
export default {
  data() {
    return {
      sopPopup: true,
    };
  },
};
</script>