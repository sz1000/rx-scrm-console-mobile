<template>
  <div class="custom_warp">
    <div class="topInfo">
      <div class="customInfo">
        <div class="iconName">
          <div class="flag">鱼</div>
          <div class="nameSex">
            <span>{{name}}</span>
            <span>{{nameFrom}}</span>
            <img src="../../images/icon_female@2x.png"
                 alt="" />

          </div>
        </div>
        <div class="detailBtn"
             @click="goToDetail">
          详情
          <van-icon name="arrow"
                    color="#4168F6" />
        </div>
      </div>
      <div class="detailInfo">
        <div class="left">
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>邮箱:</span>
            <span>{{email}}</span>
          </div>
        </div>
        <div class="right">
          <div class="rowStyle">
            <span>手机号码:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>公司名称:</span>
            <span>{{email}}</span>
          </div>
          <div class="rowStyle">
            <span>所属行业:</span>
            <span>{{email}}</span>
          </div>
        </div>
      </div>
      <div class="tjry">
        <div class="box">
          <span class="label">添加人员:</span>
          <span class="value">添加人员</span>
        </div>
        <div class="box1">
          <span class="label">添加时间:</span>
          <span class="value">添加人员</span>
        </div>
      </div>
    </div>
    <div class="infoContent">
      <div class="companyLabel">
        <div class="t_text">
          <span class="label_tag">企业标签</span>
          <div class='editButton'
               @click="showCompany(1)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !unfold }"
               ref="textBox">
            <div ref="spanBox">
              <span v-for="(list,index) in tagList"
                    :key="index"
                    class="tagBox">{{list.name}}</span>
            </div>
          </div>
          <div class="btn"
               @click="unfold = !unfold">
            {{unfold ? '收起' : '展开'}}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="personLabel">
        <div class="t_text">
          <span class="label_tag">个人标签</span>
          <div class='editButton'
               @click="showCompany(2)">
            <i class="el-icon-edit"></i>
            编辑
          </div>
        </div>
        <div class="b_content">
          <div :class="{ 'over-hidden': !isShowPerson }"
               ref="textBox">
            <div ref="spanBox">
              <span v-for="(list,index) in tagList"
                    :key="index"
                    class="tagBox">{{list.name}}</span>
            </div>
          </div>
          <div class="btn"
               @click="isShowPerson = !isShowPerson">
            {{isShowPerson ? '收起' : '展开'}}
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <div class="dynamic">
        <div class="t_text">
          <span class="label_tag">动态</span>
          <div class='editButton'
               @click="showCompany(3)">
            <img src="../../images/icon_repair1@2x.png"
                 alt="">
            <span>写跟进</span>
          </div>
        </div>
        <div class="allText">全部</div>
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item v-for="(item,index) in timeLineList"
                              :key="index"
                              color='#4168F6'
                              type='danger '>
              <div class="recordBox">
                <div class="descTxt">{{item.title}}</div>
                <div class="inLineTwo">{{item.context}}</div>
                <div class="inLine">
                  <div class="inLineEnd">操作人：{{item.userName}}</div>
                  <span class="time_right">
                    {{formatDate(item.createTime,'yyyy-MM-dd')}}
                  </span>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="bottom_model">
      <van-action-sheet v-model="show"
                        :title="titleName">
        <div class="content">
          <div class="tagWarp"
               v-if="isShowDialog=='1'">
            <div class="tagRow"
                 v-for="(item,index) in groupList"
                 :key="index">
              <div class="groupName">{{item.name}}</div>
              <div class="tagStyle">
                <span class="creatTag"
                      :class="{'changeTag':highLightArr.includes(list.id)}"
                      v-for="(list,index) in item.children"
                      :key="list.id"
                      v-show="list.name"
                      @click="selectTag(list,index)">{{list.name}}</span>
              </div>
            </div>
          </div>

          <div class="tagWarp personWarp"
               v-if="isShowDialog=='2'">
            <div class="tagRow">
              <!-- <div class="groupName">{{item.name}}</div> -->
              <div class="tagStyle">
                <span class="addBtn pointer"
                      @click="addTag">+添加</span>
                <span class="perchInput"
                      v-if="isShow ">
                  <input v-model="tagName"
                         class="addInput"
                         placeholder="输入后按回车完成"
                         maxlength="30"
                         @keyup.enter="handleSearch()" />
                </span>
                <span class="creatTag"
                      :class="{'changeTag':tempList.includes(list.id)}"
                      v-for="(list,index) in personList"
                      :key="list.id"
                      v-show="list.name">
                  <span @click="selectPersonTag(list,index)">{{list.name}}</span>
                  <span class="deleteTag"
                        @click="deleteTag(list,index)">
                    <van-icon name="cross" />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div class="writerInput"
               v-if="isShowDialog=='3'">
            <van-field v-model="message"
                       type="textarea"
                       maxlength="300"
                       placeholder="记录好跟进，多签单哟~"
                       show-word-limit />
          </div>
          <div class="buttonWarp">
            <span class="cancel">取消</span>
            <span class="save">保存</span>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <BackTop></BackTop>
  </div>
</template>
<script>
import BackTop from '@/components/BackTop'
import { formatDate } from '../../utils/tool'
import HomeVue from '../Home.vue'
export default {
    components: {
    BackTop,
  },
  created(){
    this.getwx();
    this.getMethod();
  },
  getwx(){
    wx.invoke('getCurExternalContact', {}, function(res){
        if(res.err_msg == "getCurExternalContact:ok"){
            this.userId  = res.userId ; //返回当前外部联系人userId
        }else {
            //错误处理
        }
    });
  },
  //获取客户详情
  getMethod(){
        this.$network.get('/m/cluecustomer/getClueCustomerByid',id = this.userId).then((res) => {
          console.log(res);
          title = res.data;
      })
  },
  data() {
    return {
      userid :'',
      title: '客户资料详情',
      name: '小鱼儿',
      nameFrom: '@微信/企业',
      email: '1234567890@qq.com',
      unfold: false,
      isShowPerson: false,
      tagList: [
        { name: '很优秀' },
        { name: '很优fafas秀' },
        { name: '很优秀' },
        { name: '很adsa优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
        { name: '很优秀' },
      ],
      groupList: [
        {
          name: '标签管理',
          children: [
            {
              name: 'hahhah',
              id: 1,
            },
          ],
        },
        {
          name: '标签管理',
          children: [
            {
              name: 'hahhah',
              id: 2,
            },
          ],
        },
      ],
      personList: [
        {
          name: '标签管理',
          id: 1,
        },
        {
          name: '标签管理',
          id: 2,
        },
      ],
      timeLineList: [
        {
          title: '步骤一',
          userName: '描述信息',
          context: '描述信息描述信息描述信息描述信息',
          createTime: 1628128378602,
        },
      ],
      show: false,
      isShowDialog: null,
      titleName: '',
      highLightArr: [],
      tempList: [],
      message: '',
      showInput: null,
      isShow: false,
      tagName: '',
    }
  },

  mounted() {},

  methods: {
    formatDate,
    goToDetail() {
      this.$router.push('/informationDetail')
    },
    showCompany(v) {
      this.isShowDialog = v
      this.show = true
      if (v == 1) {
        this.titleName = '企业标签'
      } else if (v == 2) {
        this.titleName = '个人标签'
      } else {
        this.titleName = '写跟进'
      }
    },
    addTag(item, index) {
      this.tagName = ''
      this.isShow = !this.isShow
    },
    handleSearch() {
      console.log(this.tagName)
      // if (this.tagName) {
      //   this.$network
      //     .post('/customer-service/tag/add', {
      //       name: this.tagName,
      //       parentId: item.id,
      //       tagid: item.tagid,
      //     })
      //     .then((res) => {
      this.personList.push({ name: this.tagName })
      //     })
      // }
      this.showInput = null
      this.isShow = false
    },
    selectTag(list, index) {
      // console.log(list, index)
      if (this.highLightArr.includes(list.id)) {
        let p = this.highLightArr.indexOf(list.id)
        this.highLightArr.splice(p, 1)
      } else {
        this.highLightArr.push(list.id)
      }
    },
    selectPersonTag(list, index) {
      if (this.tempList.includes(list.id)) {
        let p = this.tempList.indexOf(list.id)
        this.tempList.splice(p, 1)
        console.log(p)
      } else {
        this.tempList.push(list.id)
      }
    },
    deleteTag(v, i) {
      // console.log(v)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除',
          className: 'deleteBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>
<style lang="less" scoped>
.CustomerPortrait {
  .custom_warp {
    .topInfo {
      height: 400px;
      background: #fff;
      padding: 25px 24px 0 24px;
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
        .detailBtn {
          font-size: 28px;
          color: #4168f6;
          .van-icon {
            vertical-align: -11%;
            width: 28px;
            height: 28px;
          }
        }
      }
      .detailInfo {
        display: flex;
        margin-top: 21px;
        .left,
        .right {
          width: 50%;
          .rowStyle {
            line-height: 40px;
            font-size: 28px;
            margin-bottom: 24px;
            display: flex;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              width: 84px;
              color: #838a9d;
              overflow: hidden;
            }
            span:nth-child(2) {
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #3c4353;
              font-weight: 400;
            }
          }
        }
        .right {
          margin-left: 19px;
          .rowStyle {
            span:nth-child(1) {
              width: 140px;
            }
          }
        }
      }
      .tjry {
        height: 87px;
        border-top: 1px solid #f0f2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        span {
          display: inline-block;
        }
        .label {
          width: 140px;
          color: #838a9d;
        }
        .value {
          width: 140px;
          color: #3c4353;
        }
        .box {
          width: 50%;
        }
        .box1 {
          width: 50%;
          margin-left: 29px;
        }
      }
    }

    .infoContent {
      margin-top: 24px;
      background: #fff;
      padding: 24px 24px 0;
      .companyLabel,
      .personLabel {
        min-height: 292px;
        font-size: 28px;
        border-bottom: 1px solid #f0f2f7;
        margin-bottom: 24px;
        .t_text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .label_tag {
            font-weight: 600;
            color: #3c4353;
            position: relative;
            padding-left: 10px;
            &::before {
              content: '';
              width: 8px;
              height: 28px;
              background: #4168f6;
              position: absolute;
              top: 7px;
              left: -10px;
            }
          }
          .editButton {
            color: #838a9d;
            width: 124px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            line-height: 68px;
          }
        }
        .b_content {
          .over-hidden {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .btn {
            color: #4168f6;
            text-align: right;
            .van-icon {
              vertical-align: -11%;
              width: 28px;
              height: 28px;
            }
          }
          .tagBox {
            display: inline-block;
            background: #fafbff;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            color: #838a9d;
            padding: 14px 16px;
            margin-right: 16px;
            margin-top: 16px;
          }
        }
      }
      .dynamic {
        font-size: 28px;
        .t_text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          .label_tag {
            font-weight: 600;
            color: #3c4353;
            position: relative;
            padding-left: 10px;
            &::before {
              content: '';
              width: 8px;
              height: 28px;
              background: #4168f6;
              position: absolute;
              top: 7px;
              left: -10px;
            }
          }
          .editButton {
            color: #838a9d;
            width: 152px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            line-height: 68px;
            span {
              display: inline-block;
            }
            img {
              display: inline-block;
              vertical-align: middle;
              margin: -10px 10px 0 0;
              margin-right: 5px;
              width: 28px;
              height: 28px;
            }
          }
        }
        .allText {
          color: #4168f6;
          margin-bottom: 16px;
        }
        .timeLine {
          .el-timeline {
            padding-left: 0 !important;
          }
          .recordBox {
            // width: 676px;
            min-height: 180px;
            background: rgba(65, 104, 246, 0.06);
            border-radius: 8px;
            color: #3c4353;
            padding: 16px;
            font-size: 28px;
            .inLine {
              display: flex;
              justify-content: space-between;
              .time_right {
                font-size: 28px;
                color: #838a9d;
              }
              img {
                width: 10px;
                height: 10px;
              }
            }
            .inLineTwo {
              margin-bottom: 16px;
              display: inline-block;
              word-break: normal;
              word-break: break-all;
              word-break: keep-all;
              word-break: break-word;
              // display: -webkit-box;
              // -webkit-box-orient: vertical;
              // -webkit-line-clamp: 2;
              // overflow: hidden;
            }
            .inLineEnd {
              text-align: right;
            }
            .descTxt {
              font-weight: 600;
              color: #3c4353;
              margin-bottom: 16px;
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
        .tagWarp {
          height: 740px;
          overflow-y: auto;
          .tagRow {
            display: flex;
            min-height: 70px;
            margin-bottom: 24px;
            font-size: 28px;
            span {
              display: inline-block;
              color: #838a9d;
              text-align: center;
              line-height: 68px;
              height: 68px;
              border: 1px solid #d9dae4;
              margin-right: 16px;
              padding: 0 16px;
              border-radius: 4px;
              margin-bottom: 4px;
            }
            .groupName {
              border: none;
              width: 112px;
              line-height: 68px;
              word-wrap: break-word;
              word-break: normal;
              font-weight: 600;
              margin-right: 16px;
            }
            .tagStyle {
              flex: 1;
              .perchInput {
                border: none;
              }
              .creatTag {
                background: #fafbff;
                margin-bottom: 16px;
              }
              .changeTag {
                background: #4168f6;
                color: #fff;
                span {
                  color: #fff;
                }
                .van-icon {
                  color: #fff;
                }
              }
            }
          }
        }
        .personWarp {
          .tagRow {
            .addInput {
              width: 256px;
              height: 68px;
              border-radius: 8px;
              border: 2px solid #d9dae4;
              padding: 0 16px;
            }
            .creatTag {
              padding-right: 0;
              span {
                border: none;
                padding: 0;
                margin: 0;
              }
              .deleteTag {
                width: 50px;
              }
            }
          }
        }
        .writerInput {
          height: 490px;
          .van-cell,
          .van-field,
          .van-field--min-height {
            font-size: 28px;
            height: 400px;
            background: #ffffff;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            /deep/.van-field__control {
              height: 350px;
            }
          }
        }
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