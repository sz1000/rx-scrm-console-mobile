<template>
  <div class="out-warp">
    <!-- <div class="content-warp">
    </div> -->
    <!-- <div class="title-area">外出打卡</div> -->
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">外出打卡</span>
    </div>
    <div class="customInfo">
      <div class="iconName">
        <div v-if="imageUser">
          <img :src="imageUser" alt="" />
        </div>
        <div class="flag" v-else>{{ name ? name.substr(0, 1) : "" }}</div>
        <div class="nameSex">
          <span>{{ name }}</span>
          <span>{{ date }}</span>
        </div>
      </div>
    </div>
    <div class="main-warp">
      <van-form @submit="onSubmit">
        <van-field name="radio" class="borderNone" required label="客户类型:">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal" @change="changeRadio">
              <van-radio name="2" icon-size="16px"> 新客户</van-radio>
              <van-radio name="1" icon-size="16px">已有客户</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="radio == 1" required :value="customerVal" name="customerVal" label="客户名称:" @focus="selectDate" placeholder="请选择"
                   @click="showPicker = true" right-icon="arrow-down" :rules="[{ required: true, message: '请选择对应客户名称' }]" />
        <van-field v-if="radio == 2" v-model.trim="client" name="client" required placeholder="请输入" maxlength="15" label="客户名称:"
                   :rules="[{ required: true, message: '请输入' }]" />
        <van-field v-model="phone" name="phone" label="手机号码:" @blur="validator" maxlength="11" placeholder="请输入" />
        <van-field v-model="address" name="address" label="客户地址:" maxlength="60" placeholder="请输入" />
        <van-field class="remark" name="remark" v-model="remark" rows="2" label="备注:" type="textarea" maxlength="200" placeholder="请输入"
                   show-word-limit />
        <van-button class="punch" native-type="submit">去打卡</van-button>
      </van-form>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar title="选择客户" value-key="customerName" :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </div>
    <!-- <div class="btm-box">
      <div class="bottom-warp">
        <div class="routerbtn" @click="goToCard">
          <img src="../../images/daka1.png" alt="" />
          <span class="textname">打卡</span>
        </div>
        <div class="routerbtn" @click="goHome">
          <img src="../../images/gongju2.png" alt="" />
          <span>运营工具</span>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { formatDate } from '../../utils/tool'
import CommonHome from '../../utils/CommonHome'

export default {
  data() {
    return {
      imageUser: '',
      name: '',
      date: formatDate(new Date().getTime(), 'yyyy-MM-dd'),
      ruleForm: {},
      client: '', //对应客户
      address: '', //客户地址
      remark: '', //备注
      phone: '', //手机号
      customerVal: '', //选择客户
      radio: '2', //客户类型
      columns: [],
      showPicker: false,
      clueCustomerNo: '',
    }
  },
  created() {
    this.$toast.loading({
      overlay: true,
      duration: 1000,
      loadingType: 'spinner',
    })
    // CommonHome.getWxToken()
  },
  mounted() {
    setTimeout(() => {
      this.getUserName()
      this.getCustomerList()
    }, 2000)
  },
  methods: {
    goToCard() {},
    goBack() {
      this.$router.push('/home')
    },
    goHome() {
      this.$router.push('/home')
    },
    validator(event) {
      // console.log(event.target.value)
    },
    onConfirm(value) {
      // console.log('------value----', value)
      this.customerVal = value.customerName
      this.clueCustomerNo = value.clueCustomerNo
      this.phone = value.phone
      this.address = value.address
      this.showPicker = false
    },
    changeRadio(val) {
      // console.log('-----val----', val)
      this.address = ''
      this.phone = ''
      this.remark = ''
      this.client = ''
      this.customerVal = ''
    },
    selectDate() {
      document.activeElement.blur()
    },
    onSubmit(values) {
      // console.log('------values---', values)
      // var str = values.phone
      // var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      // if (!myreg.test(str)) {
      //   this.$notify({
      //     message: '请填写正确的手机号码',
      //     background: '#4168f6',
      //     duration: 1000,
      //   })
      // } else {
      // }
      this.$router.push('clockPage')
      localStorage.setItem(
        'addObj',
        JSON.stringify({
          clueCustomerNo: this.clueCustomerNo,
          name: this.customerVal,
          ...values,
        })
      )
    },
    getUserName() {
      this.$network.get('/user-service/punckClock/getLoginName').then((res) => {
        if (res) {
          this.imageUser = res.data.avatar || ''
          this.name = res.data.name || ''
        }
      })
    },
    getCustomerList() {
      this.$network
        .get('/user-service/punckClock/getClueCustomerList')
        .then((res) => {
          if (res) {
            this.columns = res.data.map((item) => {
              if (item.customerName == '') {
                return {
                  customerName: item.name,
                  clueCustomerNo: item.clueCustomerNo,
                  phone: item.phone,
                  address: item.address,
                }
              } else if (item.name == '') {
                return {
                  customerName: item.customerName,
                  clueCustomerNo: item.clueCustomerNo,
                  phone: item.phone,
                  address: item.address,
                }
              } else {
                return {
                  customerName: item.customerName
                    ? item.name + '@' + item.customerName
                    : item.name,
                  clueCustomerNo: item.clueCustomerNo,
                  phone: item.phone,
                  address: item.address,
                }
              }
            })
          }
        })
    },
  },
}
</script>
<style lang="less" scoped>
.out-warp {
  background: #fff;
  height: 100%;
  box-sizing: border-box;
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
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
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
  .title-area {
    text-align: center;
    height: 48px;
    line-height: 48px;
    // font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #3c4353;
    font-weight: 500;
    margin-bottom: 48px;
  }
  .customInfo {
    margin-top: 48px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconName {
      display: flex;
      img {
        width: 88px;
        height: 88px;
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
    padding: 0 24px;
    margin-top: 48px;
    box-sizing: border-box;
    /deep/.van-cell--required {
      &::before {
        top: 5px;
        left: 0;
        font-size: 40px;
      }
    }
    /deep/.van-radio__icon--checked .van-icon {
      background-color: #4168f6;
      border-color: #4168f6;
    }
    /deep/ .van-cell {
      margin-bottom: 60px;
      padding: 0;
      height: 80px;
      line-height: 80px;
      &::after {
        border-bottom: 0;
      }
      .van-radio__label {
        font-size: 28px;
      }
      .van-field__label {
        width: 140px;
        // font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #3c4353;
        letter-spacing: 0;
        text-align: right;
        line-height: 80px;
        font-weight: 400;
      }
      .van-cell__value {
        border: 2px solid #d9dae4;
        border-radius: 8px;
        .van-field__error-message {
          display: none;
        }
        .van-field__body {
          .van-radio-group {
            line-height: 80px;
            height: 80px;
          }
        }
        .van-field__control {
          padding-left: 16px;
          font-size: 28px;
        }
      }
    }
    .borderNone {
      /deep/.van-cell__value {
        border: none;
      }
    }
    .remark {
      height: 200px;
      /deep/.van-cell__value {
        .van-field__control {
          padding-top: 10px;
          height: 160px;
          line-height: 40px;
        }
        .van-field__word-limit {
          line-height: 28px;
          // font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #c0c4cc;
        }
      }
    }
  }
  .btm-box {
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 112px;
    background: #fff;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    .bottom-warp {
      height: 112px;
      border-top: 1px solid #f0f2f7;
      border-bottom: 1px solid #f0f2f7;
      background: #fff;
      display: flex;
      align-items: center;
      padding: 0 168px;
      justify-content: space-between;
      .routerbtn {
        font-size: 28px;
        .textname {
          color: #4168f6;
        }
        img {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          margin-bottom: 12px;
        }
      }
    }
  }
}
/deep/ .van-field__right-icon {
  padding-right: 20px;
}
/deep/.van-popup {
  border-radius: 16px 16px 0 0;
  width: 750px;
  left: 50% !important;
  transform: translate(-50%);
  .van-picker {
    .van-picker__toolbar {
      height: 88px;
      background: #fafbff;
    }
    .van-picker__cancel,
    .van-picker__title,
    .van-picker__confirm {
      font-size: 28px;
      line-height: 88px;
    }
    .van-picker-column {
      font-size: 28px;
    }
  }
}
.punch {
  width: 702px;
  height: 80px;
  background: #4168f6;
  border-radius: 8px;
  text-align: center;
  line-height: 80px;
  font-size: 28px;
  color: #ffffff;
  font-weight: 400;
}
</style>