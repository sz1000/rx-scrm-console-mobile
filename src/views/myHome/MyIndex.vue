<template>
  <div class="myhome_index">
    <div class="page_title">
      <div class="head_img">
        <img :src="userObj.avatar" alt="" v-if="userObj.avatar" />
        <img src="../../images/img_head.png" alt="" v-else />
        <div class="person_info">
          <p>{{userObj.name}}</p>
          <!-- <p>{{identity}}</p> -->
        </div>
      </div>
      <!-- <div class="change_identity" @click="changeIdent">
        <img src="../../images/change_id.png" alt="">
        <span>切换身份</span>
      </div> -->
    </div>
    <div class="content_warp">
      <div class="statistical">
        <div class="box">
          <p>{{dataObj.customerSum}}</p>
          <p>客户</p>
        </div>
        <div class="box">
          <p>{{dataObj.groupSum}}</p>
          <p>群聊</p>
        </div>
        <div class="box">
          <p>{{dataObj.friendSum}}</p>
          <p>朋友圈</p>
        </div>
      </div>
      <div class="wait_warp">
        <div class="text_wait">
          <span>待处理</span>
          <div @click="goToWait(1)" class="cilck_area">
            <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>
        <div class="task_msg">
          <div class="left_warp" @click="goToWait(1)">
            <div class="blank">
              <p>朋友圈</p>
              <p>待发表<span class="friend">{{dataObj.friendSend}}</span>条</p>
            </div>
            <img src="../../images/friend_ic.png" alt="">
          </div>
          <div class="right_warp" @click="goToWait(2)">
            <div class="blank">
              <p>群发任务</p>
              <p>待发表<span class="group">{{dataObj.custometMassSum}}</span>条</p>
            </div>
            <img src="../../images/group_task.png" alt="">
          </div>
        </div>
      </div>
      <div class="about_me">
        <span>@我</span>
        <div class="reply_text" @click="goToAbout">
          <span>{{dataObj.forReply}}条待回复,关联{{dataObj.forReplyCustomer}}个客户</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
      <div class="cust_activate">
        <div class="text_wait">
          <span>客户激活</span>
          <div class="cilck_area" @click="goToCustom(1)">
            <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>
        <div class="stati_num">
          <div class="box" @click="goToCustomBtn(0)">
            <p>{{activeObj.neverCount}}</p>
            <p>从未联系</p>
          </div>
          <div class="box" @click="goToCustomBtn(1)">
            <p>{{activeObj.excedOne}}</p>
            <p>超过1天</p>
          </div>
          <div class="box" @click="goToCustomBtn(3)">
            <p>{{activeObj.sevenCount}}</p>
            <p>超过1周</p>
          </div>
        </div>
      </div>
      <div class="about_me custom_reply">
        <span>客户寻回</span>
        <div class="reply_text">
          <span>{{activeObj.customerFind}}个客户待寻回</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" @click="goToCustom(2)" />
        </div>
      </div>
      <!-- 图表 -->
      <section>
        <div class="custom_add">
          <CustomAddChart :options='customer' v-if="Object.keys(customer).length>0"></CustomAddChart>
        </div>
        <div class="custom_add">
          <LookPieCharts :data="lookData" v-if="lookData.length>0"></LookPieCharts>
        </div>
        <div class="custom_add">
          <TopBarCharts :data="topSortData" v-if="topSortData.length"></TopBarCharts>
          <img src="../../images/nodae.png" alt="" v-else />
        </div>
        <div class="custom_add">
          <SaleCharts v-if="scaleTotal > 0" :data="scaleData"></SaleCharts>
          <img src="../../images/nodae.png" alt="" v-else />
        </div>
        <div class="custom_add">
          <NicheCharts :time="nicheTime" :data="nicheData" v-if="Object.keys(nicheData).length>0 "></NicheCharts>
        </div>
      </section>
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
import {
  CustomAddChart,
  LookPieCharts,
  TopBarCharts,
  SaleCharts,
  NicheCharts,
} from './echartComponent/index.js'
import { getMyInfo } from '../../api/myHome'
export default {
  components: {
    CustomAddChart,
    LookPieCharts,
    TopBarCharts,
    SaleCharts,
    NicheCharts,
  },
  computed: {
    scaleTotal() {
      let list = this.scaleData.find((el) => {
        return el.name == 'total'
      })
      console.log('list----', list)
      return list ? list.num : 0
    },
  },
  data() {
    return {
      dataObj: {
        customerSum: '',
        groupSum: '',
        friendSum: '',
        friendSend: '',
        custometMassSum: '',
        forReply: '',
        forReplyCustomer: '',
      },
      userObj: {
        name: '',
        avatar: '',
      },
      activeObj: {
        excedOne: '',
        customerFind: '',
        neverCount: '',
        sevenCount: '',
      },
      identity: '个人',
      num: '1',
      showIdent: false,
      customer: {},
      lookData: [],
      topSortData: [],
      scaleData: [],
      nicheTime: [],
      nicheData: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getMyInfo().then((res) => {
        this.dataObj = res.data.my
        this.userObj = res.data.my.user
        this.activeObj = res.data.customerFind
        localStorage.setItem('myName', res.data.my.user.name)
        localStorage.setItem('myAvatar', res.data.my.user.avatar)
        localStorage.setItem('depId', res.data.my.user.depId)
        this.$store.commit('setMyName', res.data.my.user.name)
        this.$store.commit('setAvatar', res.data.my.user.avatar)
        // 客户增长
        this.customer = res.data.customer
        //饼图
        this.getMaterialPie(res.data.materialMap)
        // 商机报告
        this.setLineChart(res.data)
        //优质内容top10
        let arr1 = [],
          arr = []
        res.data.materialMap.materialTOP.data.forEach((el) => {
          let obj = {
            name: Object.keys(el)[0],
            value: this.percentageFun(el[Object.keys(el)[0]]),
          }
          arr1.push(obj)
        })
        this.topSortData = arr1
        // 商机漏斗
        res.data.sales.forEach((el) => {
          let list = el.split('_')
          let obj = {
            name: list[0],
            id: Number(list[0].split('stage')[1]),
            num: Number(list[1]),
          }
          arr.push(obj)
        })
        arr.sort((a, b) => {
          return a.id - b.id
        })
        this.scaleData = arr
      })
    },
    setLineChart(data) {
      this.nicheData = data.oppory
      this.nicheTime = data.dateTime
    },
    percentageFun(data) {
      //小数转百分比
      let val = this.accMul(data, 100)
      let arr = val ? val.toString().split('.') : []
      let num = arr.length == 2 && arr[1].length > 1 ? val.toFixed(2) : val
      return num
    },
    accMul(arg1, arg2) {
      //乘法
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {}
      try {
        m += s2.split('.')[1].length
      } catch (e) {}
      return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
        Math.pow(10, m)
      )
    },
    getMaterialPie(data) {
      let arr = []
      for (let key in this.objectOrder(data.materialPieChart)) {
        let obj = {
          value: data.materialPieChart[key],
          name: this.getTimeName(key),
          key: key,
        }
        arr.push(obj)
      }
      this.lookData = arr
    },
    getTimeName(val) {
      let obj = {
        count1: '0-5s',
        count2: '5-20s',
        count3: '20-40s',
        count4: '40-60s',
        count5: '60s+',
      }
      return obj[val]
    },
    objectOrder(obj) {
      //排序的函数
      var newkey = Object.keys(obj).sort() //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
      var newObj = {} //创建一个新的对象，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]] //向新创建的对象中按照排好的顺序依次增加键值对
      }
      // console.log('newObj',newObj)
      return newObj //返回排好序的新对象
    },
    changeIdent() {
      // this.showIdent = true
    },
    closePopup() {
      this.showIdent = false
    },
    goToWait(v) {
      this.$router.push({
        path: '/waitDealwith',
        query: {
          tab: v,
        },
      })
    },
    goToCustom(v) {
      this.$router.push({
        path: '/customeActive',
        query: {
          tab: v,
          active: this.activeObj.neverCount,
          monthCount: this.activeObj.customerFind,
        },
      })
    },
    goToCustomBtn(val) {
      this.$router.push({
        path: '/customeActive',
        query: {
          id: val,
          tab: 1,
        },
      })
    },
    goToAbout() {
      this.$router.push({
        path: '/aboutme',
        query: {
          forReply: this.dataObj.forReply,
          forReplyCustomer: this.dataObj.forReplyCustomer,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import './myIndex.less';
</style>