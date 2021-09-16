<template>
  <div class="out-warp">
    <div class="title-area">外出打卡</div>
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
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1" icon-size="16px"> 新客户</van-radio>
              <van-radio name="2" icon-size="16px">已有客户</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
          v-if="radio == 2"
          required
          :value="value"
          label="对应客户:"
          placeholder="请选择"
          @click="showPicker = true"
          right-icon="arrow-down"
          :rules="[{ required: true, message: '请选择对应客户名称' }]"
        />

        <van-field
          v-if="radio == 1"
          v-model="client"
          required
          placeholder="请输入"
          label="对应客户:"
          :rules="[{ required: true, message: '请输入对应客户名称' }]"
        />
        <van-field v-model="phone" label="手机号码:" placeholder="请输入" />
        <van-field v-model="address" label="客户地址:" placeholder="请输入" />
        <van-field
          class="remark"
          v-model="remark"
          rows="2"
          label="备注:"
          type="textarea"
          maxlength="200"
          placeholder="请输入"
          show-word-limit
        />

        <van-button class="punch" native-type="submit">去打卡</van-button>
      </van-form>
      <!-- <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div> -->
      <!-- <div class="punch" @click="punchClock">去打卡</div> -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUser: "",
      name: "员工姓名",
      date: "2010-01-01",
      radio: "1", //客户类型
      client: "", //对应客户
      address: "", //客户地址
      remark: "", //备注
      phone: "", //手机号
      //
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
    };
  },
  methods: {
    // punchClock() {
    //   console.log(111);
    // },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
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
      margin-bottom: 60px;
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
        border: 1px solid #d9dae4;
        border-radius: 8px;
        .van-field__control {
          padding-left: 16px;
        }
        // .van-field__error-message {
        //   height: 20px;
        //   line-height: 20px;
        // }
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
}
/deep/ .van-field__right-icon {
  padding-right: 20px;
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