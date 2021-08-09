<template>
  <div class="detailWarp">
    <div class="headerTitle">
      <div class="backPage"
           @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户资料详情</span>
    </div>
    <div class="iconName">
      <div class="flag">鱼</div>
      <div class="nameSex">
        <span>{{name}}</span>
        <span>{{nameFrom}}</span>
        <img src="../../images/icon_female@2x.png"
             alt="" />

      </div>
    </div>
    <div class="basicInformation">
      <span>
        <img src="../../images/icon_label.png"
             alt="" />
      </span>
      <span>基本信息</span>
      <div class="formEdit">
        <van-form v-model="formList">
          <van-field v-for="(item,index) in formList"
                     label-align='center'
                     placeholder="请输入"
                     :ref="'barcode'+index"
                     :key="index"
                     v-model="item.value"
                     :label="item.name"
                     @blur='inputEdit(item,index)'
                     @focus='fnFocus(item,index)'
                     @keyup.enter.native="keyupClick(item,index)">
            <template slot="right-icon">
              <i class="el-icon-edit"
                 v-show="fieldIndex == index"></i>
            </template>
          </van-field>

        </van-form>
      </div>
    </div>
    <div class="systemInformation ">
      <span>
        <img src="../../images/icon_label.png"
             alt="" />
      </span>
      <span>系统信息</span>
      <div class="formEdit">
        <van-form v-model="systemList">
          <van-field v-for="(item,index) in systemList"
                     label-align='center'
                     :ref="'barcode'+index"
                     readonly
                     :key="index"
                     v-model="item.value"
                     :label="item.name">
          </van-field>
        </van-form>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '小鱼儿',
      nameFrom: '@微信/企业',
      formList: [
        { name: '客户简称', value: '1', mapName: 'phone' },
        { name: '公司名称', value: '1', mapName: 'livename' },
        { name: '所属行业', value: '1', mapName: 'source' },
        { name: '客户来源', value: '1', mapName: 'instry' },
        { name: '企业规模', value: '1', mapName: 'instry' },
        { name: '联系人', value: '1', mapName: 'instry' },
        { name: '性别', value: '1', mapName: 'instry' },
        { name: '微信号', value: '1', mapName: 'instry' },
        { name: '手机号', value: '1', mapName: 'instry' },
        { name: '邮箱', value: '1', mapName: 'instry' },
        { name: '职务', value: '1', mapName: 'instry' },
        { name: '地址', value: '1', mapName: 'instry' },
        { name: '客户类型', value: '1', mapName: 'instry' },
        { name: '备注', value: '1', mapName: 'instry' },
        { name: '描述', value: '1', mapName: 'instry' },
      ],
      systemList: [
        { name: '添加人员', mapName: 'phone', value: '' },
        { name: '添加时间', mapName: 'phone', value: '' },
        { name: '所属人', mapName: 'phone', value: '' },
        { name: '领取时间', mapName: 'phone', value: '' },
        { name: '最近跟进记录', mapName: 'phone', value: '' },
        { name: '最近跟进时间', mapName: 'phone', value: '' },
        { name: '最近修改人', mapName: 'phone', value: '' },
        { name: '最近修改时间', mapName: 'phone', value: '' },
        { name: '前所属人', mapName: 'phone', value: '' },
        { name: '转换时间', mapName: 'phone', value: '' },
      ],
      fieldIndex: null,
    }
  },
  created() {
    let obj = {
      livename: 'hahha',
      source: 'jahkjh',
      phone: '13213123',
      instry: 'jajdkajk',
    }
    this.formList = this.formList.map((item) => {
      return {
        name: item.name,
        value: obj[item.mapName],
      }
    })
    // console.log(this.formList)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    inputEdit(item, index) {
      // console.log(item, index)
      this.fieldIndex = null
    },
    keyupClick(item, index) {
      let p = 'barcode' + index
      this.$refs[p][0].blur()
      // console.log(22222, this.$refs[p])
    },
    fnFocus(item, index) {
      this.fieldIndex = index
    },
  },
}
</script>
<style lang="less" scoped>
.InformationDetail {
  .detailWarp {
    background: #fff;
    padding: 0 24px;
    .headerTitle {
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
    .iconName {
      display: flex;
      margin: 24px 0;
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
        }
        span:nth-child(2) {
          font-size: 24px;
          color: #ffb020;
        }
        span {
          display: inline-block;
        }
        img {
          margin-top: 21px;
          width: 28px;
          height: 28px;
        }
      }
    }
    .basicInformation,
    .systemInformation {
      font-size: 28px;
      span {
        display: inline-block;
        font-weight: 600;
        line-height: 40px;
      }
      img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
      }
      .formEdit {
        margin: 24px 0;
        /deep/.van-form {
          border: 1px solid #f0f2f7;
          .van-cell {
            padding: 0;
            font-size: 28px;
          }
          .van-field__label {
            width: 234px;
            height: 80px;
            background: #fafbff;
            border: 1px solid #f0f2f7;
            line-height: 80px;
          }
          .van-field__body {
            height: 80px;
          }
        }
      }
    }
  }
}
</style>