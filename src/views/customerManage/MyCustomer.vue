<template>
  <div class="clueWarp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">客户</span>
    </div>
    <div class="tabMenu">
      <div class="tabBtn">
        <span :class="{ active: type == 3 }" class="mycule" @click="tabClick(3)">我的客户</span>
        <span :class="{ active: type == 4 }" class="mycule" @click="tabClick(4)">客户公海</span>
      </div>
      <span class="addBtn" @click="addCules" v-show="type == 3 && mylist.some((item) => item.enName == 'add')">
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span>
      <span class="addBtn" @click="addCules" v-show="type == 4 && alllist.some((item) => item.enName == 'add')">
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
      </span>
    </div>
    <div class="searchInput">
      <input type="text" class="input" v-model="inputValue" placeholder="请输入客户简称/公司/手机号" />
      <span class="searchBtn" @click="inquire">查询</span>
    </div>
    <div class="cardWarp">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad" :offset="20">
        <div class="topInfo" v-for="(item, index) in cardList" :key="index">
          <customer-item :itemData="item" :fromType="type" :index="index"></customer-item>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { _throttle } from '../../utils/tool'
import MyMixin from '../../mixins/permissionsList'

import CustomerItem from '../../components/CustomerManage/customerItem'
export default {
  mixins: [MyMixin],
  data() {
    return {
      type: 3,
      inputValue: '',
      cardList: [],
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      mylist: [],
      alllist: [],
    }
  },
  watch: {
    inputValue(val) {
      // console.log(val)
      if (val == '') {
        this.getListData()
      }
    },
  },
  mounted() {
    for (var i in this.expandedKeys) {
      if (this.expandedKeys[i].enName == 'myCustomer') {
        this.mylist = this.expandedKeys[i].childrenList
      } else {
        this.alllist = this.expandedKeys[i].childrenList
      }
    }
  },
  created() {
    this.page = 1
    this.getListData()
  },
  provide() {
    return {
      goDetail: this.goDetail,
    }
  },
  methods: {
    tabClick(v) {
      this.type = v
      this.page = 1
      this.cardList = []
      this.inputValue = ''
      this.getListData()
    },
    onLoad() {
      // console.log('----gundong------')
      this.page++
      this.getListData()
    },
    getListData() {
      // console.log(this.tabClick)
      this.$toast.loading({
        overlay: true,
        loadingType: 'spinner',
        duration: 0,
      })
      this.$network
        .get('/customer-service/m/cluecustomer/getcluecustomerlist', {
          type: this.type,
          page: this.page,
          limit: this.pageSize,
          allname: this.inputValue,
        })
        .then((res) => {
          this.$toast.clear()
          this.total = res.data.iPage.total
          this.loading = false
          let rows = res.data.iPage.records //请求返回当页的列表
          if (rows == null || rows.length === 0) {
            this.finished = true
            return
          }
          let newSetArr = this.cardList.concat(rows)
          this.cardList = this.unique(newSetArr)
          this.cardList.forEach((item) => {
            if (item.gender == '0' || item.gender == '') {
              item.gender = '未知'
            } else if (item.gender == '1') {
              item.gender = '男'
            } else if (item.gender == '2') {
              item.gender = '女'
            }
          })
          if (this.cardList.length >= this.total) {
            this.finished = true
          } else {
            this.onLoad()
          }
        })
    },
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
    goBack() {
      // this.$router.go(-1)
      this.$router.push('/home')
    },
    addCules() {
      // console.log(this.type)
      this.$router.push({ path: 'addCustomer', query: { type: this.type } })
    },
    inquire: _throttle(function () {
      // console.log(this.inputValue)
      this.page = 1
      this.cardList = []
      this.getListData()
    }, 2000),
    deleteCard(item, index) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除？',
          className: 'deleteBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {})
        .catch(() => {
          // on cancel
        })
    },
    goDetail(item, index) {
      // console.log(this.type)
      localStorage.setItem('customer', JSON.stringify(item))
      if (this.type == 3) {
        this.$router.push({
          path: 'customDetail',
          query: { type: this.type, mylist: JSON.stringify(this.mylist) },
        })
      } else if (this.type == 4) {
        this.$router.push({
          path: 'customerSeas',
          query: { type: this.type, alllist: JSON.stringify(this.alllist) },
        })
      }
    },
  },
  components: {
    CustomerItem,
  },
}
</script>
<style lang="less" scoped>
.MyCustomer {
}
.clueWarp {
  height: 100%;
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
      padding-left: 150px;
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
      .mycule {
        margin-right: 32px;
      }
      .active {
        color: #4168f6;
        position: relative;
        &::after {
          content: '';
          width: 112px;
          height: 4px;
          background: #4168f6;
          position: absolute;
          bottom: -40px;
          left: 0;
        }
      }
    }
  }
  .searchInput {
    background: #fff;
    padding: 24px 24px;
    .input {
      width: 582px;
      height: 80px;
      border-radius: 8px;
      border: 2px solid #d9dae4;
      font-size: 28px;
      padding-left: 24px;
      box-sizing: border-box;
    }
    .searchBtn {
      display: inline-block;
      width: 104px;
      height: 80px;
      background: #4168f6;
      border-radius: 8px;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 80px;
      margin-left: 16px;
    }
  }
  .cardWarp {
    .topInfo {
      margin-top: 24px;
      background: #fff;
      padding: 24px;
    }
  }
}
</style>