<template>
  <div class="myhome_index">
    <!-- <div class="test_btn">
      <div @click="clickTo(1)">群发消息给客户</div>
      <div @click="clickTo(2)">群发消息客户群</div>
      <div @click="clickTo(3)">添加客户界面</div>
      <div @click="clickTo(4)">发到朋友圈</div>
      <div @click="clickTo(5)">创建群聊并发送消息</div>
      <div @click="clickTo(6)">打开已有群聊并发送消息</div>
    </div> -->
    <div class="page_title">
      <div class="head_img">
        <img :src="userObj.avatar" alt="" v-if="userObj.avatar" />
        <img src="../../images/img_head.png" alt="" v-else />
        <div class="person_info">
          <div class="tite_warp">
            <p class="name">{{userObj.name}}</p>
            <p class="position_name" v-if="userObj.position">{{userObj.position}}</p>
          </div>
          <p class="departments">{{userObj.departments}}</p>
        </div>
      </div>
      <!-- <div class="change_identity" @click="changeIdent">
        <img src="../../images/change_id.png" alt="">
        <span>切换身份</span>
      @click="FnToRouter('/customerManage/clues')"
      @click="FnToRouter('/customerManage/myCustomer')"
      @click="FnToRouter('/customerManage/grouplist')"
      </div> -->
    </div>
    <div class="content_warp">
        <div class="warp_car">
        <!-- @click="FnToRouter('/customerManage/clues')" -->
        <div class="car_box client_color" @click="FnToRouter('/customerManage/clues')">
          <div class="client ">
            <img src="../../assets/svg/clue.svg" alt="">
            <span class="name">线索</span>
          </div>
          <p class="num">{{dataObj.clueSum}}</p>
        </div>
        <!-- @click="FnToRouter('/customerManage/myCustomer')" -->
        <div class="car_box  clients_color mg_auto" @click="FnToRouter('/customerManage/myCustomer')">
          <div class="client">
            <img src="../../assets/svg/client.svg" alt="">
            <span class="name">客户</span>
          </div>
          <p class="num">{{dataObj.customerSum}}</p>
        </div>
        <!-- @click="FnToRouter('/customerManage/grouplist')" -->
        <div class="car_box group_color" @click="FnToRouter('/customerManage/grouplist')">
          <div class="client">
            <img class="img_group" src="../../assets/svg/kehuqun.svg" alt="">
            <span class="name">客户群</span>
          </div>
          <p class="num">{{dataObj.groupSum}}</p>
        </div>

      </div>
      <!-- <div class="statistical">
        <div class="box"  @click="FnToRouter('/customerManage/clues')">
          <p>{{dataObj.clueSum}}</p>
          <p>线索</p>
        </div>
        <div class="box"  @click="FnToRouter('/customerManage/myCustomer')">
          <p>{{dataObj.customerSum}}</p>
          <p>客户</p>
        </div>
        <div class="box" @click="FnToRouter('/customerManage/grouplist')">
          <p>{{dataObj.groupSum}}</p>
          <p>客户群</p>
        </div>
      </div> -->
      <!-- <div class="wait_warp">
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
      </div> -->
           <div class="wait_warp">
        <div class="text_wait">
          <div class="dynamic-tite">
            <img src="../../assets/images/dynamic.png" alt="">
             <span>全部动态</span>
          </div>
          <div @click="dynamicFn" class="cilck_area">
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>
        <div class="task_msg" v-if="clientList.length">
          <!-- <van-swipe  vertical >
             <van-swipe-item style="height:30px" v-for="item in clientList" :key="item.id" @click="goCustomer(item)">
               <div class="dynamic_list" v-for="item in clientList" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <p class="title"><span class="name">{{item.optUserName}}</span>{{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p>
               </div>
             </van-swipe-item>
             </van-swipe> -->
        <vueSeamlessScroll :data="clientList" :class-option="optionLeft"  >
           <!-- <ul> -->
             <div class="dynamic_list" v-for="item in clientList" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <p class="title">
                  <span class="name" v-if="item.optType != 72 && item.optType != 36 && item.optType != 50 && item.optType != 18">{{item.optUserName}}</span>
                  {{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p>
             </div>
           <!-- </ul> -->
          
        </vueSeamlessScroll>
        </div>
      </div>
      <div class="about_me about_shadow">
          <div class="dynamic-tite">
            <img src="../../assets/images/record.png" alt="">
             <span>跟进记录</span>
          </div>
       
        <div class="reply_text" @click="goToAbout">
          <span v-if="dataObj.newFollowCount">今日新增{{dataObj.newFollowCount}}条</span>
          <span v-else>今日暂无记录</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
      <div class="wait_warp">
        <div class="text_wait">
          <div class="dynamic-tite">
            <img src="../../assets/images/clues.png" alt="">
             <span>我的线索</span>
          </div>
          <div  @click="FnToRouter('/customerManage/clues')" class="cilck_area">
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>
        <div class="task_msg task_outo" v-if="cluesList.length ">
          <!-- <van-swipe  vertical >
             <van-swipe-item style="height:30px" v-for="item in clientList" :key="item.id" @click="goCustomer(item)">
               <div class="dynamic_list" v-for="item in clientList" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <p class="title"><span class="name">{{item.optUserName}}</span>{{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p>
               </div>
             </van-swipe-item>
             </van-swipe> -->
        <!-- <vueSeamlessScroll :data="clientList" :class-option="optionLeft"  > -->
           <!-- <ul> -->
             <div class="dynamic_list dat_list" v-for="item in cluesList" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <div class="cent_data">
                  <div class="warp">
                    <div class="head_img">
                       <img class="img_tx" :src="item.avatar" alt="" v-if="item.avatar">
                      <p class="img_txt"  v-else>{{item.customerCalled.charAt(0)}}</p>
                       <!-- <img class="img_tx" :src="item.avatar" alt="" v-if="item.avatar"> -->
                        <div class="weix_img">
                          <img class="img" v-if="item.externalType == 1" src="../../assets/images/weix_icon.png" alt="">
                          <img class="img" v-if="item.externalType == 2" src="../../assets/images/qiye_icon.png" alt="">
                        </div>
                    </div>
                     <p class="name_tite">{{item.customerCalled}}</p>
                     <p class="enterprise" v-if="item.externalType == 2 && item.customerName">@{{item.customerName}}</p>
                     <p class="wechat" v-if="item.externalType == 1">@微信</p>
                  </div>
                    <div class="tite_nane">{{item.clueType}}</div>
                </div>
                <!-- <p class="title"><span class="name">{{item.optUserName}}</span>{{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p> -->
             </div>
           <!-- </ul> -->
          
        <!-- </vueSeamlessScroll> -->
        </div>
      </div>

          <div class="wait_warp">
        <div class="text_wait">
          <div class="dynamic-tite">
            <img src="../../assets/images/kehu.png" alt="">
             <span>我的客户</span>
          </div>
          <div  @click="FnToRouter('/customerManage/myCustomer')" class="cilck_area">
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>
        <div class="task_msg task_outo" v-if="cluesLists.length">
          <!-- <van-swipe  vertical >
             <van-swipe-item style="height:30px" v-for="item in clientList" :key="item.id" @click="goCustomer(item)">
               <div class="dynamic_list" v-for="item in clientList" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <p class="title"><span class="name">{{item.optUserName}}</span>{{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p>
               </div>
             </van-swipe-item>
             </van-swipe> -->
        <!-- <vueSeamlessScroll :data="clientList" :class-option="optionLeft"  > -->
           <!-- <ul> -->
             <div class="dynamic_list dat_list" v-for="item in cluesLists" :key="item.id" @click="goCustomer(item)" >
                <span class="circle_line"></span>
                <span class="circle_lines"></span>
                <div class="cent_data">
                  <div class="warp">
                    <div class="head_img">
                       <img class="img_tx" :src="item.avatar" alt="" v-if="item.avatar">
                      <p class="img_txt"  v-else>{{item.customerCalled.charAt(0)}}</p>
                       <!-- <img class="img_tx" :src="item.avatar" alt="" v-if="item.avatar">
                       <img class="img_tx" src="../../images/img_head.png" alt="" v-else> -->
                        <div class="weix_img">
                          <img class="img" v-if="item.externalType == 1" src="../../assets/images/weix_icon.png" alt="">
                          <img class="img" v-if="item.externalType == 2" src="../../assets/images/qiye_icon.png" alt="">
                        </div>
                    </div>
                     <p class="name_tite">{{item.customerCalled}}</p>
                      <p class="enterprise" v-if="item.externalType == 2 && item.customerName">@{{item.customerName}}</p>
                     <p class="wechat" v-if="item.externalType == 1">@微信</p>
                  </div>
                    <div class="tite_nane">{{item.clueType}}</div>
                </div>
                <!-- <p class="title"><span class="name">{{item.optUserName}}</span>{{getTextFun(item)}}</p>
                <p class="time_tite">{{getTimeFun(item.timeInterval)}}</p> -->
             </div>
           <!-- </ul> -->
          
        <!-- </vueSeamlessScroll> -->
        </div>
      </div>
      <!-- <div class="custom_r">
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
          <div class="reply_text" @click="goToCustom(2)">
            <span>{{activeObj.customerFind}}个客户待寻回</span>
            <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
          </div>
        </div>

        <div class="about_me about_shadow">
        <span>企微朋友圈</span>
        <div class="reply_text"  @click="goToWait(2)">
          <span>{{dataObj.friendSend}}条企微朋友圈待发表</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
        <div class="about_me about_shadow">
        <span>群发任务</span>
        <div class="reply_text" @click="goToWaits(1)"  v-if="length > 0  || lengths > 0">
          <span>你有群发任务待发送</span>
          <img src="../../images/arrow_right.png" alt="" class="arrow_right" />
        </div>
      </div>
      </div> -->
      <!-- 图表 -->
      <!-- <section>
        <div class="custom_add">
          <CustomAddChart :options='customer' v-if="Object.keys(customer).length>0"></CustomAddChart>
          <img src="../../images/nodae.png" alt="" v-else />
        </div>
        <div class="custom_add">
          <LookPieCharts :data="lookData" v-if="lookData.length>0"></LookPieCharts>
          <img src="../../images/nodae.png" alt="" v-else />
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
          <img src="../../images/nodae.png" alt="" v-else />
        </div>
      </section> -->
    </div>
    <section class="popup_warp">
      <van-popup v-model="showIdent">
        <div class="popup_content">
          <!-- <img src="../../images/selected.png" alt="">
          <img src="../../images/no_select.png" alt=""> -->
          
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
import { getMyInfo, getAllCharts,getMBTop10FollowMsgList } from '../../api/myHome'
import router from '../../router/index.js'
import { getCustomerMassSend } from '../../api/myHome'
import vueSeamlessScroll from 'vue-seamless-scroll'
import { getcluecustomerlist } from '@/api/customer'
export default {
  components: {
    CustomAddChart,
    LookPieCharts,
    TopBarCharts,
    SaleCharts,
    NicheCharts,
    vueSeamlessScroll
  },
  computed: {
    scaleTotal() {
      let list = this.scaleData.find((el) => {
        return el.name == 'total'
      })
      // console.log('list----', list)
      return list ? list.num : 0
    },
     optionLeft () {  
        return {
            step: .4, //数值越大速度滚动越快
            limitMoveNum: this.clientList.length, //开始无缝滚动的数据量  //this.fourDatata.length
            hoverStop: true, //是否开启鼠标悬停stop
            direction: 0, // 0向下 1向上 2向左 3向右
            openWatch: true, //开启数据实时监控刷新dom
            singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000,//单步运动停止的时间(默认值1000ms)
            direction:1,    
        }
      }
  },
  data() {
    return {
      dataObj: {
        customerSum: '0',
        groupSum: '0',
        friendSum: '0',
        friendSend: '0',
        custometMassSum: '0',
        forReply: '0',
        forReplyCustomer: '0',
        clueSum:'0',
        newFollowCount:'0'
      },
      userObj: {
        name: '',
        avatar: '',
        departments:"",
        position:"",
      },
      activeObj: {
        excedOne: '0',
        customerFind: '0',
        neverCount: '0',
        sevenCount: '0',
      },
      identity: '个人',
      num: '',
      showIdent: false,
      customer: {},
      lookData: [],
      topSortData: [],
      scaleData: [],
      nicheTime: [],
      nicheData: {},
      scroll: true,
      clientList:[],
      length:"",
      lengths:"",
      cluesList:[],
      cluesLists:[],
    }
  },
  created() {
    this.getData()
    this.client()
    this.getDataList()
    this.getDataLists()
    this.clastList()
    this.clastLists()
  },
  mounted() {
    this.$nextTick(() => {
      // window.addEventListener('scroll', this.scrollLoad)
    })
  },
  methods: {
   clastList(){
       let params = {
        page: 1,
        limit: 10,
        type: 1,
      }

      getcluecustomerlist(params).then(res => {
        let { result, data, msg } = res
        if (result) {
            this.cluesList = data.iPage.records
            console.log(data.iPage.records,"-------==")
        }
      })
   },
   clastLists(){
       let params = {
        page: 1,
        limit: 10,
        type: 3,
      }

      getcluecustomerlist(params).then(res => {
        let { result, data, msg } = res
        if (result) {
            this.cluesLists = data.iPage.records
            console.log(data.iPage.records,"-------==")
        }
      })
   },
   getDataList() {
      this.cardList = []
      let params = {
        massType: 1,
        sendStatus: 1,
      
      }
      getCustomerMassSend(params).then((res) => {
        this.length = res.data.newList.length
        console.log(this.length,"PPP")
  
      })

   },
   getDataLists() {
      this.cardList = []
      let params = {
        massType: 2,
        sendStatus: 1,
      
      }
      getCustomerMassSend(params).then((res) => {
        this.lengths = res.data.newList.length
        // console.log(this.length,"PPP")
  
      })

   },


       FnToRouter(path) {
      this.$router.push(path)
    },
        goCustomer(val) {
      console.log(val)
      // this.$router.push({
      //   path: '/customerPortrait',
      //   query: {
      //     id: val.followId,
      //     userNo: val.clueCustomerNo,
      //     num: val.rowAt,
      //   },
      // })
       this.$router.push({
        path: '/customerManage/customDetail',
        query: {
          userNo:  "",
          clueCustomerNo: val.clueCustomerNo
          
        },
      })
    },
    getAllChartList() {
      // getAllCharts().then((res) => {
      //   //饼图
      //   this.getMaterialPie(res.data.materialMap)
      //   // 商机报告
      //   this.setLineChart(res.data)
      //   //优质内容top10
      //   let arr1 = [],
      //     arr = []
      //   res.data.materialMap.materialTOP.data.forEach((el) => {
      //     let obj = {
      //       name: Object.keys(el)[0],
      //       value: this.percentageFun(el[Object.keys(el)[0]]),
      //     }
      //     arr1.push(obj)
      //   })
      //   this.topSortData = arr1
      //   // 商机漏斗
      //   res.data.sales.forEach((el) => {
      //     let list = el.split('_')
      //     let obj = {
      //       name: list[0],
      //       id: Number(list[0].split('stage')[1]),
      //       num: Number(list[1]),
      //     }
      //     arr.push(obj)
      //   })
      //   arr.sort((a, b) => {
      //     return a.id - b.id
      //   })
      //   this.scaleData = arr
      //   this.scroll = false
      // })
    },
    getData() {
      this.$toast.loading({
        loadingType: 'spinner',
        duration: 0,
      })
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
        this.$toast.clear()
        this.getAllChartList()
      })
    },
    client(){
          let params = {
            queryFlag:4
          }

       getMBTop10FollowMsgList(params).then((res)=>{
              console.log(res.data,"------客户动态")
              this.clientList = res.data
             
       })
    },
          getTextFun(obj){
            // console.log('asd',obj)
            let val = obj.optType,str = ''
            switch (val) {
                case 0:
                    str = obj.context
                    break;
                case 1:
                     str =`建立了${obj.customerCalled}的档案`
                    break;
                case 2:
                     str =`导入了客户${obj.customerCalled}的信息`
                    break;
                case 3:
                    str =`${obj.customerCalled}从企微同步了`
                    break;
                case 4:
                    str = obj.context
                    break;
                case 5:
                    str =`更新${obj.customerCalled}的信息`
                    break;
                case 6:
                    str =`将${obj.customerCalled}变更负责人`
                    break;
                case 7:
                  str =`将客户${obj.customerCalled}分配给了`

                    break;
                case 8:
                    if(obj.optUserName){
                        str = `领取了客户${obj.customerCalled}`
                    }else{
                        str = obj.context
                    }
                    break;
                case 9:
                    str = `放弃了客户${obj.customerCalled}，客户已回到公海`
                    break;
                case 11:
                    str = '上传了附件'
                    break;
                case 12:
                    str = '删除了附件'
                    break;
                case 13:
                    str = `新增了一条记录“${obj.context}”`
                    break;
                case 14:
                    str = `拜访了客户${obj.customerCalled}`
                    break;
                case 15:
                    str = '新增了商机' + obj.context
                    break;
                case 16:
                    str = '更新了商机'
                    break;
                case 17:
                    str = '删除了商机'
                    break;
                case 18:
                    // if(obj.optUserName){
                    //     if(obj.createBy){
                    //         str = '新增协作人'
                    //     }else{
                    //         str = obj.context
                    //     }
                    // }else{
                        str = obj.context
                    // }
                    break;
                case 20:
                    str = '删除了协作人'
                    break;
                case 26:
                    let name = obj.ossObjectname ? obj.ossObjectname : obj.context
                    str = `新增标签“${name}”`
                    break;
                case 28:
                    str = obj.context
                    break;
                case 29:
                    str = `发起激活客户${obj.customerCalled}`
                    break;
                case 30:
                    str = obj.context
                    break;
                case 36:
                    str = obj.context
                    break;
                case 39:
                    str = "更新协助人信息"
                    break;
                case 40:
                     if(obj.ossObjectname){
                       str = `${obj.customerCalled}预览了 《${obj.ossObjectname}》`
                     }else{
                        str = `${obj.customerCalled}预览了`
                     }
                   
                    break;
                case 41:
                    str =`添加 ${obj.customerCalled} 为企业微信好友`
                    break;
                case 44:
                    let _str = ''
                    if(obj.optResult == 1){
                        _str = '(已通过)'
                    }else if(obj.optResult == 0){
                        _str = '(已拒绝)'
                    }
                    str = `申请成为客户${obj.customerCalled}的协助人` + _str
                    break;
                case 46:
                    str = `已自动成为客户${obj.customerCalled}的协助人`
                    break;
                case 47:
                    break;
                case 48:
                    break;
                case 50:
                    str = obj.context
                    break;
                case 60:
                   str = `删除了${obj.customerCalled}的企微好友`
                    break;
                case 71:
                   str = obj.context
                    break;
                case 72:
                   str = obj.context
                    break;
                default:
                    break;
            }
            return str
        },

        getTimeFun(value){
            // let days = parseInt(value / (1000 * 60 * 60 * 24)),
            // hours = parseInt((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            // minutes = parseInt((value % (1000 * 60 * 60)) / (1000 * 60)),
            // seconds =  parseInt((value % (1000 * 60)) / 1000)
            // console.log(seconds,minutes,hours,days)
            let s = 60*1000
            let m = 60*60*1000
            let h = 24*60*60*1000

               if(value < 1000){
                  return parseInt(1) + "秒前"
               }
               else if(value < (60*1000)){
                 console.log("1111",parseInt(value/1000));
                  return parseInt(value/1000) + "秒前"
               }else if(value < (60*60*1000) ){
                return parseInt(value/(60*1000)) + "分钟前"
              }else if(value < (24*60*60*1000)){
                return parseInt(value/(60*60*1000)) + "小时"
              }else if(value < (30*24*60*60*1000)){
                 return parseInt(value / (24*60*60*1000)) + "天前"
              }else if(value < (12*30*24*60*60*1000)){
                  return parseInt(value / (30*24*60*60*1000)) + "月前"
              }else{
                   return parseInt(value / (12*30*24*60*60*1000)) + "年前"
              }
        
          
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
    dynamicFn(){
       this.$router.push({
        path: './AllDynamic',
      })
    },
    mydynamicFn(){
       this.$router.push({
        path: './AllDynamic',
      })
    },

    goToWait(v) {
      this.$router.push({
        path: '/waitDealwith',
        query: {
          tab: v,
        },
      })
    },
    goToWaits(v) {
      this.$router.push({
        path: '/groupIndex',
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
      // this.$router.push({
      //   path: '/aboutme',
      //   query: {
      //     forReply: this.dataObj.forReply,
      //     forReplyCustomer: this.dataObj.forReplyCustomer,
      //   },
      // })
      this.$router.push({
        path: '/follrecords',
        query: {
          type:1,
        },
      })
    },
    scrollLoad() {
      var scrollTop = 0
      var clientHeight = 0
      var scrollHeight = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight
      } else {
        clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight
      }
      scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      if (scrollTop + clientHeight + 200 > scrollHeight) {
        console.log(scrollTop, clientHeight, scrollHeight)
        if (this.scroll) {
          this.getAllChartList()
        }
      } else {
        return false
      }
    },

    // 测试企微接口
    clickTo(v) {
      this.$network
        .get('/user-service/m/user/getinticket', {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: true,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'sendChatMessage',
              'getContext',
              'invoke',
              'shareToExternalContact',
              'shareToExternalChat',
              'navigateToAddCustomer',
              'shareToExternalMoments',
              'createChatWithMsg',
              'openExistedChatWithMsg',
            ],
          })
          var that = this
          wx.ready(function () {
            wx.invoke(
              'agentConfig',
              {
                corpid: res.data.corpId,
                agentid: res.data.agent_id + '',
                timestamp: res.data.agent_config_data.timestamp,
                nonceStr: res.data.agent_config_data.noncestr,
                signature: res.data.agent_config_data.signature,
                jsApiList: [
                  'sendChatMessage',
                  'getContext',
                  'invoke',
                  'shareToExternalContact',
                  'shareToExternalChat',
                  'navigateToAddCustomer',
                  'shareToExternalMoments',
                  'createChatWithMsg',
                  'openExistedChatWithMsg',
                ],
              },

              function (res) {
                if (v == 1) {
                  wx.invoke(
                    'shareToExternalContact',
                    {
                      text: {
                        content: '群发消息给客户', // 文本内容
                      },
                    },
                    function (res) {
                      if (res.err_msg == 'shareToExternalContact:ok') {
                        console.log('shareOk==', res)
                      }
                    }
                  )
                } else if (v == 2) {
                  wx.invoke('shareToExternalChat', {
                    text: {
                      content: '群发消息客户群', // 文本内容
                    },
                  })
                } else if (v == 3) {
                  wx.invoke('navigateToAddCustomer', {}, function (res) {})
                } else if (v == 4) {
                  wx.invoke(
                    'shareToExternalMoments',
                    {
                      text: {
                        content: '发到朋友圈', // 文本内容
                      },
                    },
                    function (res) {
                      if (res.err_msg == 'shareToExternalMoments:ok') {
                        console.log('朋友圈=====', res)
                      }
                    }
                  )
                } else if (v == 5) {
                  wx.invoke(
                    'createChatWithMsg',
                    {
                      selectedOpenUserIds: [
                        'woY-gRDAAA9oIgFvRMPOvgEzsf9RGgNQ',
                        'wmY-gRDAAAuteJF6uiT_NJF_9j1KwRLA',
                      ],
                      selectedTickets: ['tick1', 'token2'],
                      chatName: 'discussName',
                      msg: {
                        msgtype: 'link',
                        link: {
                          title: 'title1',
                          desc: 'desc1',
                          url: 'wwww.baidu.com',
                          imgUrl: 'imgurl1',
                        },
                      },
                    },
                    function (res) {
                      if (res.err_msg == 'createChatWithMsg:ok') {
                        console.log('=====创建群', res)
                        var chatId = res.chatId // 新建的会话ID，当会话为单聊时不返回此字段
                      }
                    }
                  )
                } else if (v == 6) {
                  wx.invoke(
                    'openExistedChatWithMsg',
                    {
                      chatId: 'wryPDZEQAAj0m3IkOQ1nmngt2AX8h-jQ',
                      msg: {
                        msgtype: 'link',
                        link: {
                          title: 'title1',
                          desc: 'desc1',
                          url: 'link1',
                          imgUrl: 'imgurl1',
                        },
                      },
                    },
                    function (res) {
                      if (res.err_msg == 'openExistedChatWithMsg:ok') {
                      }
                    }
                  )
                }
              }
            )
          })
        })
    },
  },
}
</script>
<style lang="less" scoped>
@import './myIndex.less';
.test_btn {
  div {
    margin-bottom: 20px;
  }
}
</style>