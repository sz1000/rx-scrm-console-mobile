
<template>
  <div>
    <div class="microCode group-setting-warp" v-loading="loading" v-if="sucai == 0">
      <div class="headerTitle">
        <div class="backPage" @click="goBack">
          <van-icon name="arrow-left" />
          返回
        </div>
        <span class="textTitle">新增客户群发</span>
      </div>
      <div class="warp_box">
        <!-- 群发设置 -->
        <div class="group-setting">
          <div class="title">群发设置</div>
          <div class="form">
            <el-form ref="form" :rules="rules" :model="baseForm">
              <!-- 任务名称 -->
              <el-form-item label="任务名称:" prop="taskName">
                <el-input v-model="baseForm.taskName" placeholder="请输入任务名称" :onkeyup="
                  (baseForm.taskName = baseForm.taskName.replace(/\s+/g, ''))
                " maxlength="30" show-word-limit></el-input>
              </el-form-item>
              <!-- 选择员工 -->
              <el-form-item label="选择员工:" prop="staffs">
                <el-select class="taskNameselect" v-model="baseForm.staffs" v-loadmore="loadMore" style="width: 100%" multiple
                           placeholder="请选择群发员工（可多选）" @change="staffsListChange">
                  <el-option :label="item.name" :value="item.userNo" v-for="item in staffsList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <!-- 选择客户 -->
              <el-form-item label="选择客户:" prop="selectCusType">
                <el-radio-group v-model="baseForm.selectCusType" @change="selecusChange">
                  <el-radio :label="2">全部客户</el-radio>
                  <el-radio :label="1">筛选客户</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 筛选客户 -->
              <template v-if="baseForm.selectCusType == 1">
                <div class="filterCus">
                  <el-form-item label="性别:" prop="cusSex">
                    <el-radio-group v-model="baseForm.cusSex" @change="sexChange">
                      <el-radio :label="null">全部</el-radio>
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                      <el-radio :label="0">未知</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="添加时间:" class="tamedata" prop="cusAddTime">
                    <div style="display: flex">
                      <div @click="selectCusDateTime('Begin')">
                        <el-input placeholder="请选择日期" class="marR-24" suffix-icon="el-icon-date" readonly v-model="baseForm.cusAddBeginTime">
                        </el-input>
                      </div>
                      <div class="fillline">-</div>
                      <div @click="selectCusDateTime('End')">
                        <el-input placeholder="请选择日期" suffix-icon="el-icon-date" readonly v-model="baseForm.cusAddEndTime">
                        </el-input>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="选择群聊:" prop="chatGroup">
                    <el-select multiple v-model="baseForm.chatGroup" style="width: 100%" placeholder="请选择群聊" @change="chatGroupListChange"
                               v-loadmore="loadMoreGroup">
                      <el-option :key="index" :label="item.name" :value="item.chatId" v-for="(item, index) in chatGroupList"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="客户标签:" prop="includeCus">
                    <div class="select-custom-sign-wrap el-icon-arrow-up" @click="clickCus">
                      <template v-if="baseForm.includeCus.length > 0">
                        <div class="item" v-for="(item, index) in baseForm.includeCus" :key="`${item.name}-${index}`">
                          {{ item.name }}
                          <i class="el-icon-close" @click.stop="delCustomSign(item, index)"></i>
                        </div>
                      </template>
                      <template v-else> 请按照标签筛选客户 </template>
                    </div>
                  </el-form-item>
                </div>
              </template>
              <!-- 客户预计数量 -->
              <el-form-item label="">
                预计发送客户数量：{{ estimateCusNum }}
              </el-form-item>
              <!-- 发送规则 -->
              <el-form-item label="发送规则 :" prop="sendRule">
                <el-radio-group v-model="baseForm.sendRule">
                  <el-radio :label="1">立即发送</el-radio>
                  <el-radio :label="2">定时发送</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 设定时间 -->
              <el-form-item v-if="baseForm.sendRule == 2" label="设定时间 :" prop="sendDateTime">
                <div style="display: flex">
                  <div @click="selectDateTime('date')" class="dataTimecss">
                    <el-input placeholder="请选择日期" class="marR-24 selectDate" suffix-icon="el-icon-date" readonly v-model="baseForm.sendDate">
                    </el-input>
                  </div>
                  <div @click="selectDateTime('time')">
                    <el-input placeholder="请选择时间" suffix-icon="el-icon-time" readonly v-model="baseForm.sendTime">
                    </el-input>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 群发消息 -->
        <div class="group-content">
          <div class="title">群发消息</div>
          <div class="tips">
            <span>注意：</span>
            <span>客户每个月最多接收来自同一企业的管理员的4条群发消息
              4条消息可在同一天发送</span>
          </div>
          <!-- 群发内容 -->
          <div class="txt-28 marB-24">群发内容：</div>
          <el-input class="marB-24" type="textarea" placeholder="请输入群发内容" v-model="sendMsg" maxlength="500" show-word-limit>
          </el-input>
          <!-- 附件 -->
          <div class="appendix-list">
            <div class="item marB-24" v-for="(item, index) in appendixList" :key="index">
              <!-- 删除素材 -->
              <div class="delItem" @click="delItem(index)">
                <i class="el-icon-delete"></i>
              </div>
              <!-- 选择素材类型 -->
              <div class="appendixType">
                <span class="_t txt-28"> 选择素材类型 </span>
                <el-radio-group class="radio" @change="appendixChange(index, $event)" v-model="item.appendixType">
                  <!-- <el-radio label="图片"></el-radio>
                  <el-radio label="链接"></el-radio> -->
                  <el-radio label="素材库"></el-radio>
                </el-radio-group>
              </div>
              <!-- 图片 -->
              <!-- <template v-if="item.appendixType === '图片'">
                <van-uploader v-model="item.picList" :max-count="1" :max-size="2 * 1024 * 1024" @oversize="onOversize"
                              :after-read="afterRead.bind(null, { index: index, data: item })" />
                <div class="picTips marB-24">
                  建议上传大小不超过2MB的图片，格式支持jpeg、jpg、png
                </div>
              </template> -->
              <!-- 链接 -->
              <template v-if="item.appendixType === '链接'">
                <el-input class="marB-24" v-model="item.href" placeholder="链接地址请以http或https开头" @blur="blurUrl"></el-input>
                <el-form ref="form" :model="item">
                  <el-form-item label="链接标题 :">
                    <el-input v-model="item.hrefTitle" placeholder="请输入链接标题"></el-input>
                  </el-form-item>
                  <el-form-item label="链接摘要 :">
                    <el-input v-model="item.hrefDesc" placeholder="请输入链接摘要"></el-input>
                  </el-form-item>
                  <el-form-item label="链接封面 :">
                    <!-- <van-uploader v-model="item.hrefPic" :max-count="1" /> -->
                    <van-uploader v-model="item.hrefPic" :max-count="1" :max-size="2 * 1024 * 1024" @oversize="onOversize"
                                  :after-read="afterReads.bind(null, item)" />

                  </el-form-item>
                </el-form>

              </template>
              <!-- 素材 -->
              <template v-if="item.appendixType === '素材库'">

                <div>

                  <div class="article_warp" v-if="item.materialList.tab == 1">
                    <div class="article_text">
                      <div>文章:</div>
                      <div class="tites">{{item.materialList.title}}</div>
                      <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                    </div>
                    <div class="article_flex" v-if="item.materialList.tab == 1 && item.materialList.title">
                      <div>
                        <p class="tite">{{item.materialList.title}}</p>
                        <p class="link_box">{{item.materialList.contentAbstract}}</p>
                      </div>
                      <div>
                        <img :src="item.materialList.cover" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="article_warp" v-if="item.materialList.tab == 2">
                    <div class="article_text">
                      <div>文件:</div>
                      <div class="tites">{{item.materialList.name}}</div>
                      <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                    </div>
                    <div class="article_flex" v-if="item.materialList.tab == 2 && item.materialList.name">
                      <div>
                        <!-- <img src="../../assets/images/pdf_image.png" alt=""> -->
                        <img :src="item.materialList.cover" alt="">
                      </div>
                      <div>
                        <p class="tite">{{item.materialList.name}}</p>
                        <p class="link_box">{{(item.materialList.fileSize/1024).toFixed(2)}}kbs</p>
                      </div>

                    </div>
                  </div>
                  <div class="article_warp" v-if="item.materialList.tab == 3">
                    <div class="article_text">
                      <div>海报:</div>
                      <div class="tites">{{item.materialList.posterName}}</div>

                    </div>
                    <div class="article_img" v-if="item.materialList.tab == 3 && item.materialList.posterUrl">
                      <div>
                        <img :src="item.materialList.posterUrl" alt="">
                      </div>
                      <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- 添加素材 -->
          <div class="appendix-add-warp" v-if="this.appendixList.length < 9">
            <button class="addAppendix-button" @click="addAppendix">
              <i class="el-icon-circle-plus-outline"></i> 新增素材内容
            </button>
            <span class="add-tips" style="margin-left: 24px">（最多可添加<span>{{ this.appendixList.length }}</span>/9个附件）</span>
          </div>
          <!-- 通知成员 -->
          <div class="sendRequest" @click="sendRequest">通知成员发送</div>
        </div>
      </div>
      <!-- 日期、时间选择框 -->
      <van-popup v-model="chooseDateTime" position="bottom" class="data_warp">
        <van-datetime-picker :min-date="minDate" @cancel="chooseDateTime = false" v-model="sendDateTime" :type="activeChoose"
                             @confirm="confirmDateTime" :title="activeChoose === 'date' ? '选择年月日' : '选择时间'" />
      </van-popup>

      <!-- 用户添加起止时间 -->
      <van-popup v-model="chooseCusAddDate" position="bottom" class="data_warp">
        <van-datetime-picker :min-date="minDate" @cancel="chooseCusAddDate = false" v-model="cusAddTime" type="date" @confirm="confirmCusAddDate"
                             title="选择年月日" />
      </van-popup>
      <!-- 选择客户标签 -->
      <van-popup class="choose-cus-popup" v-model="chooseCusSign" position="bottom">
        <!-- 标题 -->
        <div class="_top">
          <div class="fill"></div>
          <div>选择客户标签</div>
          <div class="fill" @click="chooseCusSign = false">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <!-- 标签组 -->
        <div class="_center">
          <div class="_item" v-for="(item, index) in cusSignList" :key="index">
            <div class="group-title">{{ item.name }}</div>
            <div class="group-label">
              <div class="label-item" :class="[signItm.checked ? 'active' : '']" @click="clickSign(index, signIdx, signItm.tagid)"
                   v-for="(signItm, signIdx) in item.children" :key="`${index} - ${signIdx}`">
                {{ signItm.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="_bottom">
          <div class="_button cancel" @click="chooseCusSign = false">取消</div>
          <div class="_button save" @click="saveCus">保存</div>
        </div>
      </van-popup>
      <!-- tankuang -->
    </div>
    <div class="psoition_falx" v-if="sucai == 1">
      <Coumpontmaterial @sureTab="showData" @sure="fnMaterialInfo" />
    </div>
  </div>

</template>
<script>
import { Toast } from 'vant'
import { Notify } from 'vant'
import { formatDate } from '../../utils/tool.js'
import Coumpontmaterial from '../../components/materialDialog/MterialPageGroup.vue'
export default {
  components: {
    Coumpontmaterial,
  },
  data() {
    var validateSendDateTime = (rule, value, callback) => {
      if (this.baseForm.sendRule === '立即发送') {
        callback()
      } else {
        if (this.baseForm.sendDate === '' || this.baseForm.sendTime === '') {
          callback(new Error('请选择发送日期和时间'))
        }
        callback()
      }
    }
    return {
      dataindex: '',
      dataindext: '',
      imgArrUrl: [],
      minDate: new Date(),
      loading: false,
      yuangongPage: 1,
      yuangongLimit: 10,
      qunliaoPage: 1,
      qunliaoLimit: 10,
      baseForm: {
        // 群发设置表单
        taskName: '',
        staffs: [],
        selectCusType: '',
        sendRule: '',
        sendDate: '', // formatDate(new Date().getTime(), "yyyy-MM-dd"),
        sendTime: '', //formatDate(new Date().getTime(), "hh:mm"),
        cusSex: '',
        chatGroup: '',
        includeCus: [],
        cusAddBeginTime: '', // formatDate(new Date().getTime(), "yyyy-MM-dd"),
        cusAddEndTime: '', //formatDate(new Date().getTime(), "yyyy-MM-dd"),
      },
      tagidList: [],
      rules: {
        // 表单规则
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
        ],
        staffs: [{ required: true, message: '请选择员工', trigger: 'change' }],
        selectCusType: [
          { required: true, message: '请选择客户', trigger: 'change' },
        ],
        sendRule: [
          { required: true, message: '请选择发送规则', trigger: 'change' },
        ],
        sendDateTime: [{ validator: validateSendDateTime, trigger: 'change' }],
      },
      estimateCusNum: 0, // 预计客户数量
      staffsList: [
        // {
        //   key: "张三",
        //   value: "张三",
        // },
        // {
        //   key: "张三1",
        //   value: "张三1",
        // },
        // {
        //   key: "张三2",
        //   value: "张三2",
        // },
      ], // 员工列表
      listImg: [],
      urlList: [],
      chatGroupList: [],
      listImgData: {
        url: '',
        objectname: '',
      },

      tagidList: [],
      sendMsg: '',
      dataList: [],
      appendixList: [
        // {
        //   url: "",
        //   objectname: "",
        //   appendixType: "图片",
        //   picList: [],
        //   href: "",
        //   hrefTitle: "",
        //   hrefDesc: "",
        //   hrefPic: [],
        // },
      ], // 素材列表

      chooseDateTime: false, // 选择日期、时间
      activeChoose: 'date', // date || time 当前点击的日期或者时间输入框
      sendDateTime: '', // 日期时间需要的值
      chooseCusSign: false, // 选择客户标签
      tagidList: [],
      sucai: 0,
      highLightArr: [],
      namelabutArr: [],
      arrImgList: [],
      activeIndex: 0,
      labename: [], //获取客户标签内容
      customerstagList: [],
      childTag: [],
      clueCustomerLists: [],
      materialList: [],
      cusSignList: [
        // 客户标签列表
        {
          name: '客户管理',
          children: [{ checked: false, name: '222' }],
        },
        {
          name: '111',
          children: [
            { checked: false, name: '333' },
            { checked: false, name: '444' },
          ],
        },
      ],
      activeCusAddChoose: 'Begin', // 选择用户添加起止或结束时间标志
      chooseCusAddDate: false, // 选择用户添加起止时间
      cusAddTime: '', // 起止时间需要的值
    }
  },
  watch: {
    // 监听includeCus改变将cusSignList里的checked改为false
    'baseForm.includeCus': {
      handler(val) {
        if (this.cusSignList.length) {
          const valTitle = val.map((item) => item.name)
          this.cusSignList.forEach((item) => {
            item.children.forEach((zitem) => {
              if (valTitle.includes(zitem.name)) {
                zitem.checked = true
              } else {
                zitem.checked = false
              }
            })
          })
        }
      },
    },
  },
  created() {
    this.getTagList() //标签接口
    this.chooseCustomerMass() //选择员工接口
    console.log(this.$route.query, '---===')

    // this.materialList =  this.$route.query.datalist
  },
  methods: {
    goToMaterial() {
      this.sucai = 1
    },

    fnMaterialInfo(obj) {
      console.log(obj, '-----ong')
      // this.materialList = obj
      console.log(this.appendixList, '999999')
      // this.appendixList.forEach((item,indes) =>{
      //    item.tab =obj.tab
      //    item.materialList[] = obj
      // })
      this.appendixList[this.dataindex].materialList = obj
      this.appendixList[this.dataindex].mediaDesc = obj.contentAbstract
      this.appendixList[this.dataindex].meiapicul = obj.cover
      this.appendixList[this.dataindex].mediatite = obj.title
      this.appendixList[this.dataindex].mediatype = obj.tab
      this.appendixList[this.dataindex].objList = obj
      if (obj.tab == 2) {
        this.appendixList[this.dataindex].mediatite = obj.name
        this.appendixList[this.dataindex].mediatype = obj.tab
      }
      if (obj.tab == 3) {
        this.appendixList[this.dataindex].mediatite = obj.posterName
        this.appendixList[this.dataindex].mediatype = obj.tab
        this.appendixList[this.dataindex].urls = obj.posterUrl
      }
    },
    showData(val) {
      console.log(val, '--0--')
      this.sucai = val
    },
    blurUrl() {
      let herf = '',
        hrefTitle
      console.log(this.appendixList)
      this.appendixList.forEach((item, index) => {
        console.log(item.href)
        herf = item.href
        hrefTitle = item.hrefTitle
      })
      this.$toast.loading()
      let params = {
        articleUrl: window.btoa(herf),
        //  articleUrl: herf
      }
      this.$network
        .get('/material-service/article/wechat_article', params)
        .then((res) => {
          if (res.result) {
            console.log(res, '------------', this.appendixList)
            this.appendixList[this.dataindext].hrefTitle = res.data.title
            this.appendixList[this.dataindext].hrefPic = [
              { url: res.data.cover },
            ]
            this.appendixList[this.dataindext].hrefImg = res.data.cover
            this.appendixList[this.dataindext].hrefDesc =
              res.data.contentAbstract
            //  for(let i = 0;i<=this.appendixList.length;i++){
            //    console.log(this.appendixList,"---for")
            //    console.log(this.appendixList[i].appendixType)
            //  }
            //      this.appendixList.forEach((item,index) =>{
            //   console.log(item,"--00",index)
            //   //  item.hrefTitle[index] = res.data.title
            //     // item.hrefDesc = res.data.contentAbstract
            //     // item.hrefPic = res.data.cover
            //     // item.hrefPic = res.data.cover
            //     // this.afterReads()
            // })
            // }else{
            //     this.$toast(res.msg)
          }
        })
    },
    onOversize(file) {
      console.log(file)
      Toast('文件大小不能超过 2M')
    },
    afterRead(event) {
      console.log(event)
    },
    afterReads(event) {
      console.log(event)
    },
    loadMore() {
      this.yuangongPage++
      this.chooseCustomerMass()
      // this.yuangongPage++;
      // this.chooseCustomerMass();
    },
    loadMoreGroup() {
      console.log('+++')
      this.qunliaoPage++
      this.groupStaffset()
    },
    afterRead(obj, file) {
      this.loading = true
      console.log(file, '------------')
      console.log(obj, '------------obj')
      let formData = new FormData()
      formData.append('file', file.file)
      formData.append('type', 'qunfa')
      formData.append('filetype', 'image')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$network
        .post('/common-service/oss/uploadfileparam', formData, config)
        .then((res) => {
          if (res.result) {
            this.loading = false
            console.log(res, '------------图片')
            obj.data.url = res.data.url

            obj.data.objectname = res.data.objectname
          }
        })
    },
    afterReads(obj, file) {
      this.loading = true
      console.log(file, '------------')
      console.log(obj, '------------obj')
      let formData = new FormData()
      formData.append('file', file.file)
      formData.append('type', 'qunfa')
      formData.append('filetype', 'image')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$network
        .post('/common-service/oss/uploadfileparam', formData, config)
        .then((res) => {
          console.log(res)
          if (res.result) {
            this.loading = false
            obj.hrefImg = res.data.url

            obj.hreobjectname = res.data.objectname
            //  obj.data.hrefPic = res.data.url
          }
        })
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 选择日期时间公共方法
    selectDateTime(type) {
      this.activeChoose = type
      this.chooseDateTime = true
      const { sendDate, sendTime } = this.baseForm
      this.sendDateTime = type === 'date' ? new Date(sendDate) : sendTime

      // console.log(this.baseForm.sendTime);
    },
    // 选择人员添加时间公共方法
    selectCusDateTime(key) {
      console.log(key)

      this.activeCusAddChoose = key
      this.chooseCusAddDate = true
      const { cusAddBeginTime, cusAddEndTime } = this.baseForm
      this.cusAddTime = new Date(
        key === 'Begin' ? cusAddBeginTime : cusAddEndTime
      )
    },
    // 人员添加起止时间确认事件
    confirmCusAddDate(value) {
      // console.log(this.baseForm.cusAddBeginTime);
      // console.log(this.baseForm.cusAddEndTime);
      // this.Screeningcustomer();
      this.baseForm[`cusAdd${this.activeCusAddChoose}Time`] = formatDate(
        new Date(value).getTime(),
        'yyyy-MM-dd'
      )

      // console.log(formatDate(new Date(value).getTime(), "yyyy-MM-dd"));
      // this.baseForm.cusAddBeginTime = time;
      if (this.baseForm.cusAddBeginTime != '' && this.baseForm.cusAddEndTime) {
        this.Screeningcustomer()
      }
      // console.log(this.baseForm.cusAddBeginTime);
      // console.log(this.baseForm.cusAddEndTime);
      this.chooseCusAddDate = false
    },
    // 日期、时间选择框确认事件
    confirmDateTime(value) {
      if (this.activeChoose === 'date') {
        this.baseForm.sendDate = formatDate(
          new Date(value).getTime(),
          'yyyy-MM-dd'
        )
      } else {
        this.baseForm.sendTime = value
      }
      this.chooseDateTime = false
      console.log(this.baseForm.sendDate)
      console.log(this.baseForm.sendTime)
    },
    // 选择素材类型改变
    appendixChange(index, value) {
      this.dataindext = index
      console.log(value, index, '---00')
      const appendixList = this.deepClone(this.appendixList)
      if (value === '图片') {
        appendixList[index] = {
          ...appendixList[index],
          // href: "",
          // hrefTitle: "",
          // hrefDesc: "",
          // hrefPic: [],
          appendixType: '图片',
        }
      } else if (value === '链接') {
        appendixList[index] = {
          ...appendixList[index],
          // picList: [],
          appendixType: '链接',
        }
      } else {
        appendixList[index] = {
          ...appendixList[index],
          // picList: [],
          appendixType: '素材库',
        }
        this.sucai = 1
        this.dataindex = index
        // this.$router.push({
        //   path:"MterialPageGroup",
        //   query:{
        //     datindex:index,

        //   }
        // })
        // this.$router.push('MterialPageGroup?')
      }
      this.$set(this, 'appendixList', appendixList)
    },

    // 删除某素材
    delItem(index) {
      this.appendixList.splice(index, 1)
    },
    // 添加素材
    addAppendix() {
      if (this.appendixList.length >= 9) {
        return
      }
      this.appendixList.push({
        appendixType: '图片',
        picList: [],
        href: '',
        hrefTitle: '',
        hrefDesc: '',
        hrefPic: [],
        hrefImg: '',
        hreobjectname: '',
        sucaiobj: [],
        tab: '',
        materialList: {},
        mediaDesc: '',
        meiapicul: '',
        mediatite: '',
        mediatype: '',
        objList: {},
        listurl: '',
        urls: '',
      })
      localStorage.setItem('appendixList', JSON.stringify(this.appendixList))
    },
    // 点击客户标签打开弹窗
    clickCus() {
      this.chooseCusSign = true
    },
    // 删除用户标签
    delCustomSign(items, index) {
      console.log(items.tagid)
      // if(item.tagid)
      // this.baseForm.includeCus.splice(index, 1);
      this.highLightArr.forEach((item) => {
        console.log(item, '----------')
        if (item == items.tagid) {
          this.baseForm.includeCus.splice(index, 1)
          this.highLightArr.splice(index, 1)
        }
      })
      this.Screeningcustomer()
      console.log(this.highLightArr, '-------------')
    },
    // 点击标签
    clickSign(index, subindex, tagid) {
      const cusSignList = this.deepClone(this.cusSignList)
      let checked = cusSignList[index].children[subindex].checked
      if (checked) {
        cusSignList[index].children[subindex].checked = false
      } else {
        cusSignList[index].children[subindex].checked = true
      }
      this.$set(this, 'cusSignList', cusSignList)
    },
    // 保存客户标签
    saveCus() {
      let checkedSign = []
      this.cusSignList.forEach((item) => {
        item.children.forEach((zitem) => {
          // console.log(item.name);
          zitem.checked && checkedSign.push(zitem)
        })
      })
      this.highLightArr = []
      checkedSign.forEach((item, index) => {
        // this.highLightArr.push(item.tagid);
        console.log(item.tagid)
        // if (item.tagid != item.tagid) {

        this.highLightArr.push(item.tagid)
        // }
      })
      // this.namelabutArr.forEach((item) => {
      //   this.highLightArr.forEach((items) => {
      //     if (item.tagid == items.tagid) {
      //       this.highLightArr.splice(index, 1);
      //     }
      //   });
      // });
      // var nwr = this.highLightArr;
      // let newList = [];
      // newList.push(new Set(this.highLightArr));
      console.log(checkedSign, '---------')
      console.log(this.highLightArr, '-------------------oooo')
      this.baseForm.includeCus = checkedSign

      this.chooseCusSign = false
      // this.getTagList();
      this.Screeningcustomer()
    },
    // 通知
    sendRequest() {
      console.log('sendMsg----->', this.sendMsg)
      console.log('baseForm------>', this.baseForm)
      console.log('appendixList------>', this.appendixList)

      this.appendixList.forEach((item, indexs) => {
        console.log(item, '-----item')
        console.log(item.objList.articleId, '-----item.objList.tab')
        let imgArr = []
        if (window.location.origin == 'https://console.jzcrm.com') {
          this.shareUrlOrigin = 'https://h5.jzcrm.com'
        } else {
          this.shareUrlOrigin = 'https://test-h5.jzcrm.com'
        }

        if (item.objList.tab == 1) {
          imgArr = [
            {
              urls: `${this.shareUrlOrigin}/materialTemplate?materialId=${
                item.objList.articleId
              }&type=${item.objList.tab}&corpId=${localStorage.getItem(
                'corpId'
              )}`,
              ...item.objList,
            },
          ]
          console.log(imgArr, '---l素材 ', this.shareUrlOrigin)
        } else if (item.objList.tab == 2) {
          imgArr = [
            {
              urls: `${this.shareUrlOrigin}/materialTemplate?materialId=${
                item.objList.documentId
              }&type=${item.objList.tab}&corpId=${localStorage.getItem(
                'corpId'
              )}`,
              ...item.objList,
            },
          ]
        } else {
          imgArr = [item.objList]
        }
        // }
        console.log(imgArr, '---l ')
        this.imgArrUrl = imgArr
        this.imgArrUrl.forEach((item) => {
          console.log(item, '---------l')
          this.appendixList[indexs].listurl = item.urls
        })
      })

      let list = this.appendixList.map((item) => {
        return {
          url: item.url,
          Objectname: item.objectname,
        }
      })
      // this.appendixList.forEach(item =>{
      //   console.log(item.href)
      // })
      this.urlList = []
      this.appendixList.forEach((item) => {
        let obj = {
          desc: item.hrefDesc,
          picurl: item.hrefImg,
          title: item.hrefTitle,
          url: item.href,
        }
        if (item.href) {
          this.urlList.push(obj)
        }
      })

      let mediaLink = []
      this.appendixList.forEach((item) => {
        let obj = {
          desc: item.mediaDesc,
          picurl: item.meiapicul,
          title: item.mediatite,
          url: item.listurl || item.urls,
          type: item.mediatype,
        }
        if (item.mediatite) {
          mediaLink.push(obj)
        }
      })
      console.log(this.urlList, '-------------this.urlList')
      this.$refs['form'].validate((valid) => {
        // if (this.appendixList.length >= 1) {
        //   Toast("请上传素材内容");
        // } else {
        if (valid) {
          let params = {
            taskName: this.baseForm.taskName,
            massType: 1,
            massContent: this.sendMsg,
            userList: this.baseForm.staffs,
            gender: this.baseForm.cusSex,
            addStartTime: this.baseForm.cusAddBeginTime,
            addEndTime: this.baseForm.cusAddEndTime,
            groupList: this.baseForm.chatGroup || [],
            lableList: this.highLightArr, //this.customerlistdata || [],
            sendType: this.baseForm.sendRule,
            sendTime: this.baseForm.sendDate + ' ' + this.baseForm.sendTime,
            // urlList: this.urlList,
            allCustomer: this.baseForm.selectCusType,
            // fileList: list, //[this.listImgData], //this.listImg,
            customerList: this.clueCustomerLists,
            mediaList: mediaLink,
          }

          this.$network
            .post(
              '/customer-service/cluecustomerMass/addCustomerScreen',
              params
            )
            .then((res) => {
              console.log(res)
              if (res.result) {
                this.$router.push({ path: '/home' })
                Notify({ type: 'success', message: res.msg })
              } else {
                Notify({ type: 'danger', message: res.msg })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
        // }
      })
    },
    deepClone(o) {
      // 判断如果不是引用类型，直接返回数据即可
      if (
        typeof o === 'string' ||
        typeof o === 'number' ||
        typeof o === 'boolean' ||
        typeof o === 'undefined'
      ) {
        return o
      } else if (Array.isArray(o)) {
        // 如果是数组，则定义一个新数组，完成复制后返回
        // 注意，这里判断数组不能用typeof，因为typeof Array 返回的是object
        // console.log(typeof []); // --> object
        var _arr = []
        o.forEach((item) => {
          _arr.push(item)
        })
        return _arr
      } else if (typeof o === 'object') {
        var _o = {}
        for (let key in o) {
          _o[key] = deepClone(o[key])
        }
        return _o
      }
    },
    //客户标签列表接口
    getTagList() {
      this.highLightArr = []
      this.namelabutArr = []
      this.$network.get('/customer-service/tag/list').then((res) => {
        console.log('------data-----', res.data)
        this.cusSignList = res.data

        let allChildTag = res.data.map((item) => {
          return item.children
        })
        let childTag = [].concat.apply([], allChildTag)
        console.log(childTag)
        this.namelabutArr = [].concat.apply([], allChildTag)
        console.log('-----列表----', this.baseForm.includeCus)
        this.baseForm.includeCus.forEach((item) => {
          console.log(item)
          childTag.forEach((chItem, chIndex) => {
            if (item.tagid == chItem.tagid) {
              this.highLightArr.push(chItem)
            }
          })
          // console.log("-----列表----", this.highLightArr);
        })
      })
    },
    // 获取选择群发员工接口
    chooseCustomerMass() {
      this.$network
        .get('/customer-service/cluecustomerMass/chooseCustomerMass', {
          page: this.yuangongPage,
          limit: this.yuangongLimit,
        })
        .then((res) => {
          if (res.data.list == []) {
          } else {
            let tempList = res.data.list
            let cent = this.staffsList.concat(tempList)
            console.log(cent, '-------')
            this.staffsList = cent
          }
          // console.log(res);
          // this.staffsList = res.data.list;
        })
    },
    // 选择所在群聊接口
    staffsListChange(value) {
      var groupData = []
      //  console.log(this.groupList)
      this.staffsList.forEach((el) => {
        if (value.includes(el.userNo)) {
          groupData.push(el)
        }
      })
      this.userdataList = groupData
      console.log(value)
      this.baseForm.staffs = value
      this.groupStaffset()
    },
    groupStaffset(value) {
      // let groutList = this.grouprst;
      // if (value == false) {
      this.$network
        .post(
          `/customer-service/cluecustomerMass/chooseCustomerGroup`,
          // groutList
          {
            // params: {
            page: this.qunliaoPage,
            limit: this.qunliaoLimit,
            userList: this.baseForm.staffs,
            // },
          }
        )
        .then((res) => {
          console.log(res.data.groupList)
          if (res.data.groupList == []) {
          } else {
            let tempList = res.data.groupList
            let cent = this.chatGroupList.concat(tempList)
            console.log(cent)
            this.chatGroupList = cent
          }
          // this.chatGroupList = res.data.groupList;
        })
      // }
    },
    // 选择群聊获取chatid
    chatGroupListChange(value) {
      console.log(value, '-----------选择群聊获取chatid')
      this.baseForm.chatGroup = value
      this.Screeningcustomer()
    },
    //筛选客户接口
    Screeningcustomer() {
      this.$network
        .post('/customer-service/cluecustomerMass/customerScreen', {
          userList: this.userdataList,
          // userList: this.baseForm.staffs,
          gender: this.baseForm.cusSex, //性别
          addStarTime: this.baseForm.cusAddBeginTime,
          addEndTime: this.baseForm.cusAddEndTime,
          groupList: this.baseForm.chatGroup || [],
          lableList: this.highLightArr, //this.customerlistdata || [],
        })
        .then((res) => {
          console.log(res)
          this.clueCustomerLists = res.data.clueCustomerList
          this.estimateCusNum = res.data.estimateNum
        })
    },
    // 选择客户
    selecusChange(value) {
      // if(baseForm.selectCusType )
      console.log(value)
      if (value == 1) {
        this.Screeningcustomer()
      } else {
        ;(this.baseForm.cusSex = ''), //性别
          (this.baseForm.cusAddBeginTime = ''),
          (this.baseForm.cusAddEndTime = '')
        ;(this.baseForm.chatGroup = []),
          (this.customerlistdata = []),
          this.Screeningcustomer()
      }
    },
    // 性别
    sexChange(value) {
      console.log(value, '------性别')
      this.baseForm.cusSex = value
      // if (value == null) {
      this.Screeningcustomer()
      // } else if (value == 0) {
      //   this.Screeningcustomer();
      // } else if (value == 1) {
      //   this.Screeningcustomer();
      // } else if (value == 2) {
      //   this.Screeningcustomer();
      // }
    },
    //时间
    cusAddBeginTimeChange(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="less" scoped>
// .psoition_falx{
//       position: absolute;
//     top: 0;
//     right: 0;
//     z-index: 10;
// }
/deep/.van-popup--bottom {
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}
.dataTimecss {
  .el-input__suffix {
    line-height: 82px;
    .el-input__suffix-inner {
      font-size: 30px;
      // line-height: 20px;
      margin-right: 50px;
      // display: inline-block;
      // line-height: 82px;
    }
  }
}

.article_warp {
  .article_img {
    display: flex;
    align-items: end;
    margin-top: 24px;
    img {
      width: 200px;
      height: 200px;
    }
    .article_color {
      margin-left: 24px;
      font-weight: 400;
      color: #4168f6;
      font-size: 28px;
    }
  }
  .article_text {
    color: #3c4353;
    line-height: 40px;
    font-size: 28px;
    display: flex;
    .article_color {
      color: #4168f6;
      margin-left: 24px;
    }
    .tites {
      margin-left: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 120px;
    }
  }
  .article_flex {
    width: 456px;
    height: 168px;
    background: #ffffff;
    border: 1px solid #d9dae4;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 24px;
    .tite {
      font-weight: 400;
      color: #3c4353;
      font-size: 28px;
      margin-bottom: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 200px;
    }
    .link_box {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 400;
      color: #c0c4cc;
      font-size: 24px;
      width: 225px;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
}
// .tamedata {
//   /deep/.el-form-item__content {
//     .el-input {
//       .el-input__suffix {
//         font-size: 16px !important;
//         .el-input__suffix-inner {
//           font-size: 16px !important;
//         }
//       }
//     }
//   }
// }

// .taskNameselect {
//   .el-input__inner {
//     border: 1px solid #5e5f61 !important;
//   }
// }

// .taskName {
//   .el-input__inner {
//     border: 1px solid #5e5f61;
//   }
// }

.el-select {
  .el-tag--small {
    height: 50px;
    line-height: 50px;
  }
  .el-tag {
    font-size: 28px;
  }
}
.updataimg {
  position: absolute;
  bottom: 80px;
  font-size: 28px;
  color: #4168f6;
}

.el-select-dropdown.selectCus {
  display: none !important;
}
.microCode.group-setting-warp {
  padding-top: 87px;
  // font-family: PingFangSC-Regular !important;
  .el-radio__input.is-checked + .el-radio__label {
    color: #4168f6;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #4168f6;
    background: #4168f6;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #4168f6;
  }
  .fillline {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }
  .txt-28 {
    font-size: 28px;
  }
  .marB-24 {
    margin-bottom: 24px;
  }
  .marR-24 {
    margin-right: 24px;
  }
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
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 750px;
    transform: translate(-50%);
    .backPage {
      cursor: default;
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
      padding-left: 135px !important;
      // text-align: center;
    }
  }
  .choose-cus-popup {
    border-radius: 16px 16px 0 0;
    ._top {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 24px;
      justify-content: space-between;
      height: 88px;
      background: #fafbff;
      border-radius: 16px 16px 0 0;
      line-height: 88px;
      text-align: center;
      font-size: 28px;
      color: #3c4353;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
      position: relative;
      border-bottom: 1px solid #f0f2f7;
      .fill {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 32px;
      }
    }
    ._center {
      box-sizing: border-box;
      padding: 24px;
      min-height: 740px;
      ._item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        .group-title {
          height: 68px;
          line-height: 68px;
          width: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28px;
          color: #3c4353;
          font-weight: 500;
          margin-right: 32px;
        }
        .group-label {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .label-item {
            box-sizing: border-box;
            margin-bottom: 16px;
            height: 68px;
            background: #fafbff;
            border: 1px solid #d9dae4;
            border-radius: 8px;
            line-height: 68px;
            padding: 0 16px;
            font-size: 28px;
            color: #838a9d;
            font-weight: 400;
            margin-right: 16px;
            &.active {
              background: #4168f6;
              border: 1px solid !important;
              color: #fff;
            }
          }
        }
      }
    }
    ._bottom {
      padding: 0 24px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ._button {
        width: calc((100% - 24px) / 2);
        height: 80px;
        box-sizing: border-box;
        line-height: 80px;
        font-size: 28px;
        text-align: center;
        border-radius: 8px;
        font-weight: 400;
        &.cancel {
          border: 1px solid #4168f6;
          color: #4168f6;
        }
        &.save {
          color: #fff;
          background: #4168f6;
        }
      }
    }
  }
  .van-picker__toolbar {
    height: 88px;
    .van-picker__cancel,
    .van-picker__confirm,
    .van-picker__title {
      font-size: 28px;
    }
    .van-picker__title {
      line-height: 88px;
      height: 88px;
    }
  }
  .warp_box {
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    .el-radio-group {
      .el-radio {
        line-height: 28px;
      }
      .el-radio__input {
        .el-radio__inner {
          width: 28px;
          height: 28px;
          &::after {
            width: 10px;
            height: 10px;
          }
        }
      }
      .el-radio__label {
        font-size: 28px;
      }
    }
    .el-input__inner,
    .el-radio-button__inner,
    .el-radio-group {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      &.el-input__inner .el-input__suffix {
        .el-input__count {
          font-size: 28px !important;
          color: #c0c4cc;
        }
      }
    }
    .filterCus {
      padding: 24px;
      // padding-right: 12px;
      margin-bottom: 30px;
      box-sizing: border-box;
      border: 1px solid #d9dae4;
      background-color: #fafbff;
      border-radius: 8px;
      .el-radio {
        margin-right: 24px;
      }
    }
    .el-form-item {
      margin-bottom: 40px;
      .el-form-item__label {
        line-height: 80px;
        font-size: 28px;
        width: 155px;
        white-space: nowrap;
      }
      .el-form-item__content {
        margin-left: 155px;
        font-size: 28px;
        .el-select__tags {
          .el-tag--small {
            height: 48px;
            padding: 0 16px;
            line-height: 48px;
            background-color: #fafbff;
            border-color: #d9dae4;
          }
          .el-tag {
            &:first-child {
              margin-left: 16px;
            }
          }
          .el-tag .el-icon-close {
            width: 28px;
            height: 28px;
            background: transparent;
            &::before {
              color: #c0c4cc;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .selectDate {
        width: 307px;
      }
    }
    .group-setting,
    .group-content {
      .title {
        padding-left: 20px;
        position: relative;
        height: 40px;
        // font-family: PingFangSC-Medium !important;
        font-size: 28px;
        color: #3c4353;
        letter-spacing: 0;
        font-weight: 500;
        line-height: 40px;
        &::before {
          content: '';
          display: block;
          width: 8px;
          height: 28px;
          background-color: #4168f6;
          left: 0;
          top: 50%;
          margin-top: -14px;
          position: absolute;
        }
      }
    }
    .group-setting {
      .title {
        margin-bottom: 24px;
      }
    }
    .group-content {
      .title {
        margin-bottom: 12px;
      }
      .tips {
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        margin-bottom: 24px;
        span {
          display: block;
          font-size: 24px;
          color: #c0c4cc;
          letter-spacing: 0;
          font-weight: 400;
          line-height: 32px;
          &:first-child {
            white-space: nowrap;
          }
        }
      }
      .el-textarea__inner {
        padding: 24px;
        font-size: 28px;
        line-height: 30px;
        min-height: 400px !important;
      }
      .appendix-list {
        .item {
          .data_imgt {
            width: 182px;
            height: 182px;
          }
          padding: 24px;
          box-sizing: border-box;
          border-radius: 8px;
          border: 1px solid #d9dae4;
          position: relative;
          .appendixType {
            display: flex;
            align-items: center;
            ._t {
              margin-right: 24px;
            }
            .el-radio-group {
              .el-radio {
                margin-right: 15px;
              }
            }
          }
          .delItem {
            position: absolute;
            top: 44px;
            right: 44px;
            font-size: 32px;
          }
          .van-uploader {
            .van-uploader__upload,
            .van-uploader__preview {
              margin: 0 24px 0 0;
            }
            .van-uploader__upload,
            .van-uploader__preview .van-uploader__preview-image {
              width: 182px;
              height: 182px;
            }
            .van-uploader__upload-icon {
              font-size: 36px;
            }

            .van-uploader__preview-delete {
              width: 28px;
              height: 28px;
              height: 28px;
              border: 2px solid #d9dae4;
              // border-radius: 100%;
              top: -14px;
              right: -14px;
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;

              //               align-items: content;
              //               justify-content: center;
              // background-image: url("../../images/dele.png");
              // background-size: contain;
              // background-repeat: no-repeat;
            }
            //
            .van-icon-cross:before {
              font-size: 34px;
              position: relative;
              right: -6px !important;
              top: -6px !important;
              color: #d9dae4;
            }
          }
          .picTips {
            margin-top: 24px;
            font-size: 24px;
            color: #c0c4cc;
            letter-spacing: 0;
            font-weight: 400;
          }
        }
      }
      .appendix-add-warp {
        margin-bottom: 103px;
        display: flex;
        align-items: center;
        .addAppendix-button {
          padding: 0 24px;
          box-sizing: border-box;
          height: 68px;
          background: rgba(65, 104, 246, 0.04);
          border: 1px solid #4168f6;
          border-radius: 8px;
          line-height: 68px;
          font-size: 28px;
          color: #4168f6;
          letter-spacing: 0;
          font-weight: 400;
        }
        .add-tips {
          font-size: 28px;
          color: #c0c4cc;
        }
      }
      .el-button {
        padding: 14px 24px;
        font-size: 28px;
        color: #4168f6;
        border-color: #4168f6;
      }
      .sendRequest {
        height: 80px;
        width: 702px;
        background: #4168f6;
        border-radius: 8px;
        line-height: 80px;
        text-align: center;
        border-radius: 8px;
        font-size: 28px;
        color: #ffffff;
        display: block;
        // margin: 0 auto;
        cursor: default;
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%);
      }
    }
  }
  .select-custom-sign-wrap {
    width: 100%;
    min-height: 80px;
    box-sizing: border-box;
    background: #ffffff;
    border: 2px solid #d9dae4 !important;
    color: #c0c4cc;
    border-radius: 5px;
    padding: 10px 30px 10px 15px;
    position: relative;
    display: flex !important;
    align-items: center;
    flex-wrap: wrap;
    .item {
      padding: 8px 16px;
      background: #fafbff;
      height: 48px;
      box-sizing: border-box;
      border: 1px solid #d9dae4;
      border-radius: 8px;
      // font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #838a9d;
      line-height: 32px;
      font-weight: 400;
      margin-right: 8px;
      .el-icon-close {
        margin-left: 9px;
      }
    }
    &::before {
      content: '\e6e1';
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%) rotateZ(180deg);
      font-size: 12px;
      color: #c0c4cc;
    }
  }
}
</style>
