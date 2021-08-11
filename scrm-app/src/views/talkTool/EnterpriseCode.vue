<template>
  <div class="microCode">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">企微活码</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">
        全部活码
      </div>
      <span class="addBtn"
            @click="addCode">
        <img src="../../images/icon_add@2x.png"
             alt="">
        新增
      </span>
    </div>
    <div class="cardCode"
         v-for="(item,index) in liveList"
         :key="index">
      <div class="operationTop">
        <div class="codeName">
          <span>活码名称:</span>
          <span>{{item.livename}}</span>
        </div>
        <div class="editBtn">
          <span>
            <van-icon name="edit" />
            编辑
          </span>
          <span>
            <van-icon name="delete-o" />
            删除
          </span>
        </div>
      </div>
      <div class="contentBox">
        <div class="leftCode">
          <img :src="item.address"
               alt="">
          <div class="shareCode">
            <span> <img src="../../images/send.png"
                   alt=""></span>
            发送二维码
          </div>
        </div>
        <div class="rightInfo">
          <div class="rowText">
            <span>渠道:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>创建人员:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>创建时间:</span>
            <span>渠道</span>
          </div>
          <div class="rowText">
            <span>使用员工:</span>
            <span>使用员工使用员工使用员工使用员工使用员工使用员工使用员工使用员工</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">

          <div class="buttonWarp">
            <span class="cancel"
                  @click="closeDialog(isShowDialog)">取消</span>
            <span class="save"
                  @click="saveDialog(isShowDialog)">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liveList: [
        {
          livename:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        },
        {},
      ],
      show: false,
      titleName: '',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    addCode() {},
    closeDialog() {},
    saveDialog() {},
  },
}
</script>
<style lang="less" scoped>
.EnterpriseCode {
  .microCode {
    .headerTitle {
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
        padding-left: 120px;
      }
    }
    .tabMenu {
      background: #fff;
      padding: 0 24px;
      box-sizing: border-box;
      height: 115px;
      font-size: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f2f7;
      span {
        display: inline-block;
      }
      .addBtn {
        width: 124px;
        height: 68px;
        background: #ffffff;
        border-radius: 6px;
        border: 2px solid #d9dae4;
        text-align: center;
        line-height: 68px;
        img {
          display: inline-block;
          width: 28px;
          height: 28px;
          vertical-align: -4%;
        }
      }
      .tabBtn {
        font-size: 28px;
        font-weight: 600;
        padding-left: 16px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 0;
          width: 8px;
          height: 28px;
          background: #4168f6;
        }
      }
    }
    .cardCode {
      width: 750px;
      // height: 406px;
      // min-height: 382px;
      background: #ffffff;
      margin-top: 16px;
      padding: 24px;
      box-sizing: border-box;
      font-size: 28px;
      .operationTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px;
        position: relative;
        &::after {
          content: '';
          height: 1px;
          width: 750px;
          background: #f0f2f7;
          position: absolute;
          bottom: 0;
          left: -24px;
        }
        .codeName {
          width: 476px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span:nth-child(1) {
            display: inline-block;
            margin-right: 16px;
            color: #838a9d;
          }
        }
        .editBtn {
          color: #838a9d;
          span {
            display: inline-block;
          }
          span:nth-child(1) {
            margin-right: 16px;
          }
          .van-icon {
            vertical-align: -10%;
          }
        }
      }
      .contentBox {
        height: 292px;
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        .leftCode {
          img {
            width: 182px;
            height: 182px;
          }
          .shareCode {
            margin-top: 16px;
            display: flex;
            align-items: center;
            width: 182px;
            height: 48px;
            background: rgba(65, 104, 246, 0.04);
            border-radius: 6px;
            border: 2px solid #4168f6;
            color: #4168f6;
            img {
              width: 24px;
              height: 24px;
              vertical-align: -11%;
            }
          }
        }
        .rightInfo {
          margin-left: 32px;
          .rowText {
            display: flex;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              color: #838a9d;
              text-align: right;
              width: 140px;
              margin-bottom: 15px;
              margin-right: 16px;
            }
            span:nth-child(2) {
              flex: 1;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    .bottom_model {
      .van-action-sheet__header {
        height: 88px;
        line-height: 88px;
        background: #fafbff;
        border-radius: 16px 16px 0px 0px;
        font-size: 28px;
        color: #3c4353;
        font-weight: 600;
      }
      .content {
        // height: 845px;
        padding: 24px;

        .buttonWarp {
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          span {
            display: inline-block;
            width: 339px;
            height: 80px;
            border-radius: 8px;
            border: 2px solid #4168f6;
            text-align: center;
            line-height: 80px;
          }
          .cancel {
            color: #4168f6;
            background: #fff;
          }
          .save {
            background: #4168f6;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>