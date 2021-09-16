<template>
  <div class="out-warp">
    <div class="title-area">外出打卡</div>
    <div class="customInfo">
      <div class="iconName">
        <div v-if="imageUser">
          <img :src="imageUser"
               alt="" />
        </div>
        <div class="flag"
             v-else> {{name ? name.substr(0,1) : ''}}</div>
        <div class="nameSex">
          <span>{{ name }}</span>
          <span>{{ date}}</span>
        </div>
      </div>
    </div>
    <div class="main-warp">

      <van-field name="radio"
                 required
                 label="客户类型">
        <template #input>
          <van-radio-group v-model="radio"
                           direction="horizontal">
            <van-radio name="1">单选框 1</van-radio>
            <van-radio name="2">单选框 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="phone"
                 required
                 label="对应客户:"
                 :rules="[{ required: true, message: '请输入' }]"
                 maxlength='15' />

      <!-- <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit">提交</van-button>
        </div> -->

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUser: '',
      name: '员工姓名',
      date: '2010-01-01',
      radio: '',
      phone: '',
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.out-warp {
  height: 100%;
  background: #fff;
  padding: 48px 24px;
  .title-area {
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #3c4353;
    font-weight: 500;
  }
  .customInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconName {
      display: flex;
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
          color: #3c4353;
          letter-spacing: 0;
          font-weight: 500;
        }
        span:nth-child(2) {
          margin-top: 15px;
          font-size: 24px;
          color: #838a9d;
        }
        span {
          display: block;
        }
      }
    }
  }
  .main-warp {
    margin-top: 48px;
    /deep/ .van-cell {
      padding: 0;
      height: 80px;
      line-height: 80px;
      .van-cell--required::before {
        top: 0;
        left: 0;
      }
      .van-field__label {
        width: 140px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #3c4353;
        letter-spacing: 0;
        text-align: right;
        line-height: 80px;
        font-weight: 400;
      }
      .van-cell__value {
        .van-field__body {
          .van-radio-group {
            line-height: 80px;
            height: 80px;
            .van-radio__icon {
            }
            .van-radio__label {
            }
          }
        }
        // border: 1px solid #d9dae4;
        // border-radius: 8px;
        .van-field__control {
          padding-left: 16px;
        }
        // .van-field__error-message {
        //   height: 20px;
        //   line-height: 20px;
        // }
      }
    }
  }
}
</style>