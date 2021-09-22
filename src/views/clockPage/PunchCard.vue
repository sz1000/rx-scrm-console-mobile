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
             v-else>{{ name ? name.substr(0, 1) : "" }}</div>
        <div class="nameSex">
          <span>{{ name }}</span>
          <span>{{ date }}</span>
        </div>
      </div>
    </div>
    <div class="main-warp">
      <van-form @submit="onSubmit">
        <van-field name="radio"
                   class="borderNone"
                   required
                   label="客户类型:">
          <template #input>
            <van-radio-group v-model="radio"
                             direction="horizontal"
                             @change="changeRadio">
              <van-radio name="2"
                         icon-size="16px"> 新客户</van-radio>
              <van-radio name="1"
                         icon-size="16px">已有客户</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="radio == 1"
                   required
                   :value="customerVal"
                   name="customerVal"
                   label="对应客户:"
                   placeholder="请选择"
                   @click="showPicker = true"
                   right-icon="arrow-down"
                   :rules="[{ required: true, message: '请选择对应客户名称' }]" />

        <van-field v-if="radio == 2"
                   v-model="client"
                   name="client"
                   required
                   placeholder="请输入"
                   maxlength="15"
                   label="对应客户:"
                   :rules="[{ required: true, message: '请输入' }]" />
        <van-field v-model="phone"
                   name="phone"
                   label="手机号码:"
                   maxlength="11"
                   placeholder="请输入" />
        <van-field v-model="address"
                   name="address"
                   label="客户地址:"
                   maxlength="60"
                   placeholder="请输入" />
        <van-field class="remark"
                   name="remark"
                   v-model="remark"
                   rows="2"
                   label="备注:"
                   type="textarea"
                   maxlength="200"
                   placeholder="请输入"
                   show-word-limit />

        <van-button class="punch"
                    native-type="submit">去打卡</van-button>
      </van-form>
      <van-popup v-model="showPicker"
                 position="bottom">
        <van-picker show-toolbar
                    value-key='customerName'
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false" />
      </van-popup>

    </div>
    <!-- <div class="bottom-warp">
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
    CommonHome.getWxToken()
  },
  mounted() {
    setTimeout(() => {
      this.getUserName()
      this.getCustomerList()
    }, 3000)
  },
  methods: {
    onConfirm(value) {
      // console.log('------value----', value)
      this.customerVal = value.customerName
      this.clueCustomerNo = value.clueCustomerNo
      this.showPicker = false
    },
    changeRadio(val) {
      // console.log('-----val----', val)
      this.address = ''
      this.phone = ''
      this.remark = ''
      this.customerVal = ''
    },
    onSubmit(values) {
      // console.log('------values---', values)
      this.$router.push('clockPage')
      localStorage.setItem(
        'addObj',
        JSON.stringify({ clueCustomerNo: this.clueCustomerNo, ...values })
      )
    },
    getUserName() {
      this.$network
        .get('/user-service/punckClock/getPunckClockList')
        .then((res) => {
          this.imageUser = res.data.plist[0].avatar
          this.name = res.data.plist[0].name
        })
    },
    getCustomerList() {
      this.$network
        .get('/user-service/punckClock/getClueCustomerList')
        .then((res) => {
          this.columns = res.data
        })
    },
  },
}
</script>
<style lang="less" scoped>
.out-warp {
  height: 100%;
  background: #fff;
  padding: 48px 0;
  .title-area {
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #3c4353;
    font-weight: 500;
    margin-bottom: 48px;
  }
  .customInfo {
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
    /deep/ .van-cell {
      margin-bottom: 60px;
      padding: 0;
      height: 80px;
      line-height: 80px;
      &::after {
        border-bottom: 0;
      }
      .van-cell--required::before {
        top: 0;
        left: 0;
      }
      .van-radio__label {
        font-size: 28px;
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
        border: 1px solid #d9dae4;
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
      height: 400px;
      /deep/.van-cell__value {
        // height: 400px;
        .van-field__body {
          // height: 400px;
          .van-field__control {
            height: 350px;
          }
        }
      }
    }
  }
  .bottom-warp {
    height: 112px;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    background: #fff;
    margin-top: 48px;
  }
}
/deep/ .van-field__right-icon {
  padding-right: 20px;
}
/deep/.van-picker {
  .van-picker__cancel,
  .van-picker__confirm {
    font-size: 28px;
  }
  .van-picker-column {
    font-size: 28px;
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