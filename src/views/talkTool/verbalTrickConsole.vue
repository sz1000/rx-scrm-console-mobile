<template>
  <div class="main-content">
    <header-title v-if="isIndependent == 1" title="话术库"></header-title>
    <!-- 话术 -->
    <div class="warp-bg">
      <!-- 标题 -->
      <!-- <div class="headerTitle">
        <div class="backPage"
            @click="goBack">
        <van-icon name="arrow-left" />
        返回
        </div>
        <span class="textTitle">快捷回复</span>
    </div> -->
      <!-- 头部 -->
      <!-- <div class="warp-box">
        <div class="head">
        <div>
            <van-nav-bar>
            <template #left>
                <i class="el-icon-message-solid"></i>
                <span class="sop-tite family-regular">[个人SOP]</span>
                <span class="message">1条消息待发送</span>
            </template>
            <template #right>
                <span class="ck-text">查看</span>
                <van-icon name="arrow-down" />
            </template>
            </van-nav-bar>
        </div>
        </div>
    </div> -->
      <!-- sop提醒  -->
      <div class="sop_wrap">
        <div class="sop_notice" v-if="popupList && popupList.length > 0">
          <img class="icon" src="../../images/bell.png" alt="" />
          <div class="label">{{ sopType }}</div>
          <div class="val">{{ popupList.length }}条消息待发送</div>
          <div class="r_box" @click="showPopup">
            <span class="btn">查看</span>
            <img class="s_icon" src="@/assets/images/icon_down.png" alt="" />
          </div>
        </div>
      </div>
      <!-- tabMenu -->
      <div class="top-message">
        <img src="../../images/bell.png" alt="" />
        <span>如需新增话术请至电脑端修改</span>
      </div>
      <div class="tabMenu">
        <div class="tabBtn">
          <span :class="{ active: tabClick == 1 }" class="mycule" @click="myclue(1)">个人话术</span>
          <span :class="{ active: tabClick == 2 }" class="mycule" @click="myclue(2)">公共话术</span>
        </div>
        <!-- <span class="addBtn" @click="newaddClick">
        <img src="../../images/icon_add@2x.png" alt="" />
        新增
        </span> -->
      </div>
      <!-- 查询 -->
      <!-- <div class="searchInput">
        <input type="text"
            class="input"
            v-model="inputValue"
            placeholder="请输入内容" />
        <span @click="queryCenten"
            class="searchBtn">查询</span>
    </div> -->
      <!-- 添加分组-->
      <div class="newgrouping">
        <img class="newgrp-img" src="../../images/iconadd.png" alt="" />
        <span class="add-grp" @click="addGroups(tabClick)">添加分组</span>
      </div>
      <!-- 列表 -->
      <ul class="tree-box">
        <!-- 最外层 一级 -->
        <li v-for="(parent, index) in treeData" :key="index" class="all-group">
          <div class="tree-header">
            <div class="header-left">
              <i class="el-icon-caret-right" v-show="!parent.isOpen"></i>
              <i class="el-icon-caret-bottom" v-show="parent.isOpen"></i>
              <span class="header-name" @click="groupNameList(parent, index)">{{ parent.name }}</span>
            </div>
            <!-- <div class="header-r">
        <div @click="moreDot(parent)">
            <img style="width: 28px; height: 28px"
                src="../../images/icon_more@2x.png"
                alt="" />
        </div>
        <ul class="listAlat-box"
            v-if="listTite">
            <li @click="rechristen(item)">重命名</li>
            <li @click="openDelete(item)">删除</li>
        </ul>
        </div> -->
          </div>
          <div class="tree-body" v-show="parent.isOpen">
            <!-- 第二级 -->
            <ul class="child-box">
              <li v-for="(child, childidx) in parent.children" :key="childidx">
                <div class="tree-header">
                  <div class="header-left child-title">
                    <i class="el-icon-caret-right" v-show="!child.isOpen"></i>
                    <i class="el-icon-caret-bottom" v-show="child.isOpen"></i>
                    <span class="header-name" @click="groupNameList(child, index)">{{ child.name }}</span>
                  </div>
                  <div class="header-r" v-show="moreSet == child.id">
                    <div @click="moreDot(child)">
                      <img style="width: 28px; height: 28px" src="../../images/icon_more@2x.png" alt="" />
                    </div>
                    <ul class="listAlat-box" v-if="listTite">
                      <li @click="rechristen(child)">重命名</li>
                      <li @click="openDelete(child)">删除</li>
                    </ul>
                  </div>
                </div>
                <ul v-show="child.isOpen">
                  <li v-for="(oneitem, oneidx) in child.items" :key="oneidx" class="word-box">
                    <div class="group-box">
                      <!-- <img class="group_img"
                        src="../../images/group.png"
                        alt=""
                        @click="shareText(oneitem)" /> -->
                      <span class="word-title">{{ oneitem.title }}</span>
                    </div>
                    <div class="word-list">
                      <div v-for="(list, lidx) in oneitem.contentList" :key="lidx" class="slot-box">
                        <div class="text_img" @click="firstShare(list)">
                          <img v-if="isIndependent == 2" class="share_img" src="../../images/share_two@2x.png" alt="" />
                          <div class="text-value">
                            {{ list.value }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="tree-body" v-show="child.isOpen">
                  <!-- 第三级 -->
                  <ul class="child-box">
                    <li v-for="(grandson, grandindex) in child.children" :key="grandindex" class="word-box">
                      <div class="tree-header">
                        <div class="header-left three-title">
                          <i class="el-icon-caret-right" v-show="!grandson.isOpen"></i>
                          <i class="el-icon-caret-bottom" v-show="grandson.isOpen"></i>
                          <span class="header-name" @click="groupNameList(grandson, index)">{{ grandson.name }}</span>
                        </div>
                        <div class="header-r" v-show="moreSet == grandson.id">
                          <div @click="moreDot(grandson)">
                            <img style="width: 28px; height: 28px" src="../../images/icon_more@2x.png" alt="" />
                          </div>
                          <ul class="listAlat-box" v-if="listTite">
                            <li @click="rechristen(grandson)">重命名</li>
                            <li @click="openDelete(grandson)">删除</li>
                          </ul>
                        </div>
                      </div>
                      <div class="tree-body" v-show="grandson.isOpen">
                        <ul>
                          <li v-for="(grandword, grandidx) in grandson.items" :key="grandidx" class="word-box">
                            <div class="group-box">
                              <!-- <img class="group_img"
                                src="../../images/group.png"
                                alt=""
                                @click="shareText(grandword)" /> -->
                              <span class="word-title">{{
                                grandword.title
                            }}</span>
                            </div>
                            <div class="word-list">
                              <div v-for="(list, lidx) in grandword.contentList" :key="lidx" class="slot-box">
                                <div class="text_img" @click="firstShare(list)">
                                  <img v-if="isIndependent == 2" class="share_img" src="../../images/share_two@2x.png" alt="" />
                                  <div class="text-value">
                                    {{ list.value }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- 新建分组 -->
    <van-action-sheet v-model="newshow" title="新建分组">
      <div class="content">
        <div class="codeDetail">
          <div class="select-Tree">
            <span class="groupname"><span style="color: red">*</span> 上级分组:</span>
            <SelectTree :options="optionSelect" v-model="value" :multiple="false" :searchable="false" placeholder="请选择分组" :normalizer="normalizer"
                        @select="changeSelect">
              <label slot="option-label" slot-scope="{ node }" class="labelClassName">
                <img src="../../images/wenjian.png" alt="" style="width: 14px; height: 12px" />
                <span class="nodeName one-line">{{ node.label }}</span>
              </label>
            </SelectTree>
          </div>
          <div class="input_text">
            <span class="groupname"><span style="color: red">*</span> 分组名称:</span>
            <el-input v-model="groupingName" placeholder="请输入内容" maxlength="20" show-word-limit>
            </el-input>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="cancelBtn">取消</span>
            <span class="save" @click="saveBut">保存</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 重命名 -->
    <van-action-sheet v-model="rename" title="重命名">
      <div class="content">
        <div class="codeDetail">
          <div class="select-Tree"></div>
          <div class="input_text">
            <span class="groupname"><span style="color: red">*</span> 重命名:</span>

            <el-input v-model="wordTitle" placeholder="请输入内容" maxlength="20" show-word-limit>
            </el-input>
          </div>
          <div class="buttonWarp">
            <span class="cancel" @click="cancelName">取消</span>
            <span class="save" @click="saveName">保存</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- <Details /> -->

    <!-- SOP 提醒 -->
    <van-popup position="bottom" round closeable v-model="show">
      <div class="popup_wrap">
        <div class="popup_header">
          {{ entry == "single_chat_tools" ? "个人SOP提醒" : "群SOP提醒" }}
        </div>
        <div class="popup_content">
          <div class="list_wrap">
            <div class="list" v-for="(item, index) in popupList" :key="index">
              <div class="line_title">
                [{{ formatDate(item.promptTime,'yyyy-MM-dd hh:mm') }}] 给客户发送以下<i>{{
                  getTipNum(item.promptList)
                }}</i>条消息
              </div>
              <div class="pup_share_wrap">
                <div class="share_box" v-for="(el, i) in item.promptList" :key="i">
                  <img class="s_icon" src="@/assets/images/icon_share.png" @click="firstShare(el, 'sop')" alt="" v-preventReClick />
                  <div class="s_val" v-if="!el.url">
                    <div class="des">{{ el.content }}</div>
                  </div>
                  <div class="s_val" v-if="el.fileName">
                    <div class="img_row">
                      <div class="img_box">
                        <img :src="el.url" alt="" />
                      </div>
                      <div class="info_r">
                        <div class="name">{{ el.fileName }}</div>
                        <div class="size">{{ el.fileSize }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="s_val" v-if="el.url && !el.fileName">
                    <div class="share_link">{{ el.url }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 是否填写Secret -->
    <van-overlay :show="showSecret">
      <div class="wrapper" @click.stop>
        <div class="dialogImg" align="center">
          <img src="../../images/secreteig.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import SelectTree from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import commonFun from '../../utils/commonToken'
import { _throttle, formatDate } from '../../utils/tool'
import {
  sop_prompt_personal,
  m_cluecustomer_getClueCustomerByid,
  sop_prompt_group,
  group_getGroupDetail,
  sopSendDetail_tag,
} from '@/api/sop'
import HeaderTitle from '../../components/MaterialTemplate/headerTitle'

export default {
  components: {
    SelectTree,
    // Details,
    HeaderTitle,
  },
  props: {
    isIndependent: {
      // 1: 话术是独立路由，2: 话术是组件
      default: 1,
    },
  },
  data() {
    return {
      isOpen: true,
      groupingName: '', //输入分组名称
      isShowOperate: false,
      options: [],
      optionSelect: [],
      moreSet: null,
      treeData: [],
      showList: false, //列表显示
      dialogImageUrl: '',
      wordTitle: '',
      dialogVisible: false,
      groupingId: '', //分组id

      newshow: false, //新增弹框
      rename: false, //重命名
      tablist: 1, //弹框tab列表
      tabClick: 1, //切换
      inputValue: '',

      value: null,
      normalizer(node) {
        // console.log(node.id)
        if (
          node.children == null ||
          node.children == 'null' ||
          node.children.length == 0
        ) {
          delete node.children
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
      actDot: 0,
      chiDot: null,
      listTite: false,

      show: false,
      popupList: [], //popup sop 提醒数据
      showSecret: false,
    }
  },
  computed: {
    chatId() {
      return this.$store.getters.chatId
    },
    userId() {
      return this.$store.getters.userId
    },
    entry() {
      return this.$store.getters.entry
    },
    sopType() {
      let str = '[个人SOP]'
      if (this.entry == 'group_chat_tools') {
        str = '[群SOP]'
      }
      return str
    },
  },
  mounted() {
    this.verbaltrickList()
    this.getData()
    this.getUserName()
  },
  provide() {
    return {
      goBack: this.goBack,
    }
  },
  methods: {
    formatDate,
    getUserName() {
      this.$network
        .get('/user-service/user/getUserName', { endPoint: 'mobile' })
        .then((res) => {
          this.showSecret = !res.data.haveSecret
        })
    },
    getData() {
      console.log('entry', this.entry)
      // this.getGroupDetail()
      if (this.entry == 'group_chat_tools') {
        this.getGroupDetail()
      } else if (this.entry == 'single_chat_tools') {
        this.getCustomerByid()
      }
    },
    getCustomerByid() {
      //获取客户详情
      console.log('come userId', this.userId)
      if (this.userId) {
        m_cluecustomer_getClueCustomerByid(this.userId).then((res) => {
          if (res.result) {
            let data = res.data.clueCustomerVO.id
            this.getPersonalSopTip(data)
          }
          // this.getPersonalSopTip(1)
        })
      } else {
        console.log('no userId getWxAppid')
        commonFun.getWxAppid()
      }
    },
    getGroupDetail() {
      //获取群详情
      let chatId = sessionStorage.getItem('chatId')
      console.log('chatId session', chatId)
      console.log('chatId store', this.chatId)
      group_getGroupDetail(chatId).then((res) => {
        if (res.result) {
          this.getGroupSopTip(res.data.id)
        }
        // this.getPersonalSopTip(37)
      })
    },
    getPersonalSopTip(id) {
      //个人sop提醒
      console.log('come personal sop list')
      sop_prompt_personal(id).then((res) => {
        if (res.result) {
          let list = res.data
          this.popupList = list
        }
      })
    },
    getGroupSopTip(id) {
      //群sop提醒
      sop_prompt_group(id).then((res) => {
        if (res.result) {
          let list = res.data
          this.popupList = list
        }
      })
    },
    showPopup() {
      //sop提醒弹窗
      this.show = true
    },
    getTipNum(val) {
      let num = 1
      if (val && val.length > 0) {
        num = val.length
      }
      return num
    },
    goBack() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //列表页面
    myclue(v) {
      // console.log(v)
      this.tabClick = v
      this.verbaltrickList()
    },
    // 点击查询
    moreDot() {
      this.listTite = !this.listTite
    },
    //列表点击
    clickList() {
      this.showList = !this.showList
    },
    // 点击树形结构
    handleNodeClick(data) {
      console.log(data)
      this.isShowOperate = data.id
    },
    // 点击新增按钮
    newaddClick() {
      this.$router.push({
        path: '/talkTool/added',
        query: {
          type: this.tabClick,
        },
      })
    },
    //添加分组
    addGroups(v) {
      console.log('---v-----', v)
      this.newshow = true
      this.value = null
      this.groupingName = ''
      this.$network
        .get('/material-service/verbaltrickgroup/getSelect', {
          groupType: this.tabClick,
        })
        .then((res) => {
          // console.log(res)
          this.optionSelect = res.data
          // console.log('----this.value---', this.value)
        })
    },
    // 重命名
    rechristen(val) {
      // console.log('----重命名----', val)
      this.rename = true
      this.listTite = false
      this.wordTitle = val.name
    },
    //删除
    openDelete(v) {
      // console.log(v)
      this.$dialog
        .confirm({
          title: '提示',
          message: '此操作将删除本分组及分组内全部内容，是否确认删除分组？',
          confirmButtonColor: '#4168f6',
          // className: 'deleteBtn',
          // confirmButtonText: '是',
          // cancelButtonText: '否',
          // messageAlign: 'left',
        })
        .then(() => {
          this.$network
            .get('/material-service/verbaltrickgroup/delete', {
              id: v.id,
            })
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.verbaltrickList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    _down(item) {
      // window.open(item.url);
      console.log(item)
    },

    redioClick(value) {
      this.tablist = value
      console.log(value)
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 个人话术分组列表
    verbaltrickList() {
      // this.$toast.loading({
      //   overlay: true,
      //   loadingType: 'spinner',
      //   duration: 0,
      // })
      this.$network
        .get('/material-service/verbaltrickgroup/getlist', {
          parentId: 0,
          groupType: this.tabClick,
          type: 0,
        })
        .then((res) => {
          // this.$toast.clear()
          if (res.result) {
            this.options = res.data
            this.treeData = res.data
            this.treeData[0].isOpen = true
          }
        })
    },
    //新增分组
    newclickList() {
      let params = {
        name: this.groupingName,
        parentId: this.groupingId || 0,
        groupType: this.tabClick,
      }
      this.$network
        .post('/material-service/verbaltrickgroup/add', params)
        .then((res) => {
          console.log(res)
          if (res.result) {
          }
        })
    },
    // 点击分组列表名字
    groupNameList(value, i) {
      console.log('----分组---', value)
      this.moreSet = value.id
      this.groupId = value.id
      value.isOpen = !value.isOpen //控制折叠与展开
      // console.log(11111)
      if (value.id == 0) {
        return
      } else {
        this.$network
          .get('/material-service/verbaltrick/getlist', {
            value: '',
            groupId: value.id,
            // groupType: this.tabClick,
          })
          .then((res) => {
            // console.log(res)
            if (res.result) {
              // this.newclickList
              this.$set(value, 'items', res.data.iPage.records)
              // console.log('--------', this.treeData)
            }
          })
      }
    },
    // 子分组标题
    groupchildrenList(valuel, i) {
      this.chiDot = i
      // this.actDot = null

      valuel.isOpen = !valuel.isOpen
      this.groupId = valuel.id
      // console.log(valuel.id)
      this.$network
        .get('/material-service/verbaltrick/getlist', {
          value: '',
          groupId: valuel.id,
          // groupType: this.tabClick,
        })
        .then((res) => {
          console.log(res)
          if (res.result) {
            // this.newclickList

            this.$set(valuel, 'items', res.data.iPage.records)
            console.log('--------', this.treeData)
          }
        })
    },
    //分享
    shareText(v) {
      // console.log('----分享分组----', v)
      this.$network
        .get('/user-service/m/user/getinticket', {
          url: location.href,
        })
        .then((res) => {
          wx.config({
            beta: true,
            debug: false,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'sendChatMessage',
              'invoke',
              'agentConfig',
              'checkJsApi',
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
                jsApiList: ['sendChatMessage', 'getContext', 'invoke'],
              },
              function (res) {
                // for (let i = 0; i < v.contentList.length; i++) {
                wx.invoke(
                  'sendChatMessage',
                  {
                    msgtype: 'text', //消息类型，必填
                    // enterChat: true,
                    text: {
                      content: v.contentList[i].value, //文本内容
                    },
                  },
                  function (res) {
                    if (res.err_msg == 'sendChatMessage:ok') {
                      //发送成功
                    }
                  }
                )
              }
              // }
            )
          })
        })
    },
    //分享子列表
    firstShare(v, type) {
      // console.log('分享话术----', v)
      // alert(JSON.parse(JSON.stringify(v)))
      if (!v.value) {
        //sop分享用
        v.value = v.content
        if (v.url) {
          if (v.fileName) {
            v.value = v.weChatMediaId
          } else {
            v.value = v.url
          }
        }
      }
      this.$network
        .get('/user-service/m/user/getinticket', {
          url: location.href,
        })
        .then((res) => {
          // alert(JSON.parse(JSON.stringify(res)))
          wx.config({
            beta: true,
            debug: false,
            appId: res.data.corpId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'sendChatMessage',
              'invoke',
              'agentConfig',
              'checkJsApi',
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
                jsApiList: ['sendChatMessage', 'getContext', 'invoke'],
              },
              function (res) {
                // alert('进入invoke')
                let _data = null
                if (v.weChatMediaId) {
                  _data = {
                    msgtype: 'image', //消息类型，必填
                    enterChat: false,
                    image: {
                      mediaid: v.weChatMediaId, //图片的素材id
                    },
                  }
                } else {
                  _data = {
                    msgtype: 'text', //消息类型，必填
                    enterChat: false,
                    text: {
                      content: v.value, //文本内容
                    },
                  }
                }
                wx.invoke('sendChatMessage', _data, function (res) {
                  if (res.err_msg == 'sendChatMessage:ok') {
                    // alert('发送成功')
                    //发送成功
                    if (type == 'sop') {
                      //sop规则发送记录标记发送状态
                      that.sopSendTag(v.sopSendDetailId)
                    }
                  }
                })
              }
            )
          })
        })
    },
    sopSendTag(id) {
      //sop规则发送记录标记发送状态
      sopSendDetail_tag(id).then((res) => {
        if (res.result) {
          console.log('sop 发送标记成功')
          this.getData()
        }
      })
    },
    // 点击删除
    // deleteverbal() {
    //   // console.log(value);

    // },
    // 新增话术
    addverbal() {
      // console.log(value);
      this.$network
        .post('/material-service/verbaltrick/addverbal', {
          // id
        })
        .then((res) => {
          console.log(res)
          if (res.result) {
            this.newclickList
          }
        })
    },
    //点击查询
    queryCenten() {
      // this.groupNameList();
      // console.log(this.inputValue)
      this.verbaltrickList()
    },
    // 删除
    // open() {
    //   this.$confirm(
    //     "此操作将删除本分组及分组内全部内容，是否确认删除分组？",
    //     "提示",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "error",
    //     }
    //   )
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    // 重命名取消
    cancelName() {
      this.rename = false
    },
    //重命名 保存
    saveName: _throttle(function () {
      console.log('---this.saveName---', this.groupId)
      if (this.wordTitle == '') {
        this.$message({
          type: 'error',
          message: '分组名不能为空',
        })
      } else {
        this.$network
          .post('/material-service/verbaltrickgroup/update', {
            id: this.groupId,
            name: this.wordTitle,
          })
          .then((res) => {
            // console.log(res);
            if (res.result) {
              this.rename = false
              this.verbaltrickList()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }, 3000),
    // 新建 点击取消
    cancelBtn() {
      this.newshow = false
    },
    // 新建分组baoc
    saveBut: _throttle(function () {
      let params = {
        name: this.groupingName,
        parentId: this.groupingId || 0,
        groupType: this.tabClick,
      }
      this.$network
        .post('/material-service/verbaltrickgroup/add', params)
        .then((res) => {
          console.log(res)
          if (res.result) {
            this.newshow = false
            this.verbaltrickList()
            this.$message({
              type: 'success',
              message: '新增成功',
            })
          }
        })

      // console.log(this.groupingName)
    }, 3000),

    changeSelect(val) {
      console.log(val.id)
      this.groupingId = val.id
    },
    // 顶部标题返回（工作台）
    goBack() {
      this.$router.push('/home')
    },
  },
  watch: {
    userId(val) {
      console.log('userId：', val)
    },
  },
}
</script>

<style scoped lang="less">
@import url('../../styles/color');
.main-content {
  height: 100%;
}
.tetx {
  font-size: 50px;
}

/* sop 提醒 */
.sop_wrap {
  padding: 0 24px;
}
.sop_notice {
  width: 100%;
  height: 68px;
  border: 1px solid @main;
  background: rgba(@main, 0.04);
  padding: 14px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  .icon {
    width: 24px;
    height: 29px;
    margin-right: 16px;
  }
  .label {
    font-size: 28px;
    line-height: 40px;
    color: @fontMain;
    margin-right: 16px;
  }
  .val {
    font-size: 28px;
    line-height: 40px;
    color: @fontSub2;
  }
  .r_box {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .btn {
      font-size: 24px;
      line-height: 32px;
      color: @fontSub2;
      margin-right: 8px;
    }
    .s_icon {
      width: 21px;
      height: 13px;
    }
  }
}
/deep/ .van-popup__close-icon--top-right {
  right: 24px;
  top: 32px;
}
/* sop 提醒弹窗 */
.popup_wrap {
  width: 100%;
  min-height: 50vh;
  max-height: 80vh;
  height: 60vh;
  background: @white;
  position: relative;
  padding-top: 88px;

  .popup_header {
    width: 100%;
    height: 88px;
    font-size: 28px;
    font-weight: 500;
    line-height: 88px;
    text-align: center;
    background: @headerBg;
    // position: relative;
    border-bottom: 1px solid @dashedColor;
    position: absolute;
    top: 0;
    left: 0;
  }
  .popup_content {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 24px;
    overflow-y: scroll;
    .list_wrap {
      width: 100%;
      .list {
        width: 100%;
        min-height: 200px;
        background: @dashedColor;
        border: 1px solid @bdColor;
        border-radius: 8px;
        margin-bottom: 24px;
        padding: 24px;
        &:last-child {
          margin-bottom: 0;
        }
        .line_title {
          font-size: 28px;
          line-height: 40px;
          color: @fontMain;
          padding-left: 20px;
          position: relative;
          margin-bottom: 24px;
          &::before {
            content: '';
            width: 8px;
            height: 28px;
            background: @main;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          i {
            font-style: normal;
            color: @main;
          }
        }
        .pup_share_wrap {
          width: 100%;
          .share_box {
            width: 100%;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            &:last-child {
              margin-bottom: 0;
            }
            .s_icon {
              width: 26px;
              height: 26px;
              margin-right: 24px;
            }
            .s_val {
              width: calc(100% - 50px);
              min-height: 88px;
              background: @white;
              border: 1px solid @bdColor;
              border-radius: 8px;
              padding: 24px;
            }
            .des {
              line-height: 40px;
              font-size: 28px;
              color: @fontSub2;
              word-break: break-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .share_link {
              line-height: 40px;
              font-size: 28px;
              color: #c0c4cc;
              word-break: break-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .img_row {
              width: 100%;
              display: flex;
              align-items: center;
              .img_box {
                width: 112px;
                height: 112px;
                background: rgba(@main, 0.04);
                border-radius: 4px;
                overflow: hidden;
                margin-right: 24px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .info_r {
                width: calc(100% - 136px);
                .name {
                  line-height: 40px;
                  font-size: 28px;
                  color: @fontMain;
                  margin-bottom: 12px;
                  word-break: break-all;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .size {
                  height: 32px;
                  font-size: 24px;
                  color: #c0c4cc;
                }
              }
            }
          }
        }
      }
    }
  }
  .popup_footer {
    width: 100%;
    height: 128px;
    background: @white;
    padding: 24px;
    position: fixed;
    bottom: 0;
    left: 0;
    .footer {
      display: flex;
      justify-content: space-between;
      .btn {
        width: calc(50% - 12px);
        height: 80px;
        line-height: 78px;
        font-size: 24px;
        border: 1px solid @main;
        color: @main;
        border-radius: 8px;
        text-align: center;
        &.main {
          border-color: @main;
          background: @main;
          color: @white;
        }
      }
    }
  }
}

.tree-box {
  padding: 0 24px;
  padding-bottom: 135px;
  font-size: 28px;
  background: #fff;
  .tree-header {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding: 5px 16px;
    .header-left {
      display: flex;
      i {
        line-height: 35px;
        // line-height: normal;
      }
      .header-name {
        flex: 1;
        max-width: 500px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      span {
        display: inline-block;
      }
    }
    .header-r {
      position: relative;
      .listAlat-box {
        padding: 24px 0;
        width: 236px;
        height: 208px;
        background: #ffffff;
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        position: absolute;
        right: 0;
        text-align: center;
        box-sizing: border-box;
        z-index: 10;
        li {
          width: 188px;
          height: 80px;
          margin: 0 auto;
          line-height: 80px;
        }
      }
    }
    .child-title {
      padding-left: 20px;
    }
  }
  .tree-body {
    margin-top: 24px;
  }
  .word-box {
    padding-left: 40px;
    .group-box {
      display: flex;
      align-items: center;
      margin: 28px 0;
      .group_img {
        width: 48px;
        height: 48px;
        margin-right: 16px;
      }
      .group-box {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .word-list {
      // width: 638px;
      // height: 752px;
      background: #fafbff;
      border-radius: 8px;
      border: 1px solid #d9dae4;
      padding: 24px;
      .slot-box {
        margin-bottom: 24px;
        .text_img {
          display: flex;
          align-items: center;
          .share_img {
            width: 26px;
            height: 26px;
            margin-right: 23px;
          }
          .text-value {
            width: 542px;
            height: 88px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #d9dae4;
            padding: 24px;
            box-sizing: border-box;
            overflow-y: scroll;
          }
        }
      }
    }
  }
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
.warp-box {
  padding: 0 24px;
  margin-top: 32px;
}

.warp-bg {
  min-height: 100vh;
  background: #fff;
  padding-top: 30px;
  .top-message {
    width: 702px;
    height: 68px;
    background: rgba(65, 104, 246, 0.04);
    border: 2px solid #4168f6;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-left: 16px;
    img {
      width: 24px;
      height: 29px;
      margin-right: 16px;
    }
    span {
      display: inline-block;
      font-size: 28px;
    }
  }
}
// 头部
.van-nav-bar {
  padding: 10px;
  background: rgba(65, 104, 246, 0.04);
  border-radius: 8px;
  border: 1px solid #4168f6;
}
/deep/.van-cell {
  background: none;
}

.sop-tite {
  font-size: 28px;
  font-weight: 400;
  color: #3c4353;
  margin-left: 16px;
}
.message {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  margin-left: 16px;
}
.ck-text {
  font-weight: 400;
  color: #838a9d;
  font-size: 24px;
}
// 查询
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
// tabMenu
.tabMenu {
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
        position: absolute;
        bottom: -40px;
        left: 30%;
        width: 56px;
        height: 8px;
        background: #4168f6;
        border-radius: 4px;
      }
    }
  }
}
.listData {
  transition: all 3s;
}
// 过渡动画
.transform {
  transform: rotate(95deg);
  /* transform: initial; */
  transition: all 0.3s;
}
// 新增弹框样式
.el-radio {
  width: 100px;
}
/deep/.el-radio__inner {
  width: 30px;
  height: 30px;
}
/deep/ .el-radio__inner::after {
  width: 10px;
  height: 10px;
}
/deep/ .el-input__inner {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
.van-action-sheet__header {
  height: 88px;
  line-height: 88px;
  background: #fafbff;
  border-radius: 16px 16px 0px 0px;
  font-size: 28px;
  color: #3c4353;
  font-weight: 600;
}
/deep/ .el-textarea__inner {
  font-size: 28px;
  height: 400px;
  border: 2px solid #d9dae4 !important;
}

// center列表
/deep/ .el-radio-group {
  margin-bottom: 30px;
}
/deep/ .el-icon-arrow-down:before {
  content: '';
}
.content-list {
  display: flex;
  justify-content: space-between;
}
.relative {
  position: relative;
}
.call {
  position: absolute;
  right: 20px;
  width: 100px;
  background: #fff;
  z-index: 10;
}
.newgrouping {
  display: flex;
  align-items: center;
  margin: 24px 0;
  padding-left: 24px;
}
.newgrp-img {
  width: 28px;
  height: 28px;
}
.add-grp {
  font-weight: 400;
  color: #4168f6;
  font-size: 28px;
  margin-left: 8px;
}
.group_img {
  width: 48px;
  height: 48px;
}
.warp_group {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.title_verba {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
  margin-left: 16px;
}
.center_list {
  display: flex;
  align-items: center;
}
.share_img {
  width: 26px;
  height: 26px;
}
.content {
  // overflow: scroll;
  // padding: 24px;
  .addForm,
  .codeDetail {
    // overflow-y: scroll;
    height: 750px;
    box-sizing: border-box;
    padding: 24px;
    font-size: 28px;
    font-weight: 500;
    // overflow-y: scroll;
    /deep/.el-form {
      // height: 100%;
      .el-form-item {
        display: flex;
        margin-bottom: 26px;
        .editText {
          font-size: 28px;
          line-height: 80px;
        }
      }
      .el-form-item__label {
        width: 155px;
        font-size: 28px;
        line-height: 80px;
        color: #838a9d;
        margin-bottom: 30px;
      }
      .el-form-item__content {
        flex: 1;
        height: 80px;
        line-height: 80px;
        word-break: break-all;
        .el-input__inner {
          height: 80px;
          border-radius: 8px;
          font-size: 28px;
          border: 0;
          border: 2px solid #d9dae4;
        }
        .el-select,
        .el-cascader {
          width: 100%;
          // width: 562px;
          height: 80px;
        }
        .el-select {
          .el-tag--small {
            height: 50px;
            line-height: 50px;
          }
          .el-tag {
            font-size: 28px;
          }
        }
        .el-checkbox {
          width: 100%;
          line-height: 80px;
          .el-checkbox__inner {
            border: 2px solid #d9dae4;
            width: 28px;
            height: 28px;

            &::after {
              width: 12px;
              height: 12px;
            }
          }
          .el-checkbox__input {
            vertical-align: -10%;
          }
          .el-checkbox__label {
            line-height: 80px;
            font-size: 28px;
          }
        }
      }
      .textareaInput {
        height: 400px;
        .el-textarea {
          .el-textarea__inner {
            font-size: 28px;
            height: 400px;
            border: 2px solid #d9dae4 !important;
          }
        }
      }
      .submitBtn {
        .el-button--primary {
          font-size: 28px;
          width: 702px;
          height: 80px;
          background: #4168f6;
          border-radius: 8px;
        }
      }
    }
  }
  .codeDetail {
    // height: 100%;
    /deep/.el-form {
      .codeImg {
        margin-bottom: 100px !important;
        img {
          width: 182px;
          height: 182px;
        }
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__label {
        font-size: 24px;
      }
      span {
        font-size: 24px;
        // line-height: 80px;
      }
    }
  }
}
// 新建分组
.select-Tree {
  display: flex;
  .labelClassName {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
    .nodeName {
      min-width: 90%;
      max-width: 90%;
    }
  }
}
.groupname {
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: 140px;
  margin-right: 20px;
}
.cent {
  justify-content: center;
}
/deep/.vue-treeselect__control {
  // width: 547px;
  height: 80px;
  line-height: 80px;
}
/deep/ .vue-treeselect__placeholder,
/deep/ .vue-treeselect__single-value {
  line-height: 76px;
}
.input_text {
  display: flex;
  margin-top: 24px;
}
/deep/ .el-input,
.el-input__inner {
  width: 547px;
}
.el-dropdown-link {
  position: relative;
}
.dropdown_box {
  width: 236px;
  // height: 208px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.el-dropdown-link img {
  width: 28px;
  height: 28px;
}
// 底部按钮
.buttonWarp {
  cursor: pointer;
  display: flex;
  // justify-content: space-around;
  position: absolute;
  font-size: 28px;
  width: 100%;
  // position: fixed;
  bottom: 24px;
  z-index: 10;
  // margin-top: 243px;

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
    margin-left: 10px;
  }
}
/deep/.van-action-sheet {
  width: 751.5px;
  // margin: 0 auto;
  left: 50%;
  transform: translate(-50%, 0);
}

.line-border {
  width: 8px;
  height: 28px;
  background: #4168f6;
  display: inline-block;
  margin-right: 12px;
  margin-top: 4px;
}
.sop-num {
  color: #4168f6;
  margin: 0 5px;
}
.text_img {
  margin-right: 24px;
}
.sop-text {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.sop_title {
  font-weight: 400;
  color: #838a9d;
  font-size: 28px;
  width: 606px;
  height: 88px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
  line-height: 88px;
  padding-left: 24px;
}
.list_box {
  // display: flex;
  width: 565px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_warp {
  // display: flex;
  width: 606px;
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  height: 160px;
  padding-left: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d9dae4;
}
.sop_imgWarp {
  display: flex;
  align-items: center;
  // // width: 606px;
  // width: 582px;
  // height: 160px;
  // padding-left: 24px;
  // background: #ffffff;
  // border-radius: 8px;
  // border: 1px solid #d9dae4;
}
.img-up img {
  width: 112px;
  height: 112px;
}
.img_text {
  font-weight: 400;
  color: #3c4353;
  font-size: 28px;
}
.img_size {
  font-weight: 400;
  color: #c0c4cc;
  font-size: 24px;
}
.center_img {
  line-height: 50px;
  margin-left: 16px;
}
.dialogImg {
  margin-top: 20%;
  img {
    width: 702px;
  }
}
</style>