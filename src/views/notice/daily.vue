<template>
    <div class="wrap">
        <div class="tips_icon">
            <img class="icon" src="@/assets/images/icon_tip.png" alt="">
            <div class="text">温馨提示：数据统计来自{{formatDate(detail.batchDate,"yyyy/MM/dd")}}全天数据</div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">客户数据</div>
            </div>
            <div class="total_wrap">
                <div class="total_box">
                    <div class="total">
                        <div class="num">{{detail.newCustomerCount}}/{{detail.allCustomerCount}}</div>
                        <div class="text">今日新增/全部客户</div>
                    </div>
                    <div class="total">
                        <div class="num">{{detail.newClueCount}}/{{detail.allClueCount}}</div>
                        <div class="text">今日新增/全部线索</div>
                    </div>
                </div>
                <div class="total_box">
                    <div class="total">
                        <div class="num">{{detail.newGroupCount}}/{{detail.allGroupCount}}</div>
                        <div class="text">今日新增/全部群聊</div>
                    </div>
                    <div class="total">
                        <div class="num">{{detail.newInGroupCount}}/{{detail.newOutGroupCount}}</div>
                        <div class="text">今日入群/退群</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">商机</div>
                <van-popover get-container="tit_box" v-model="businessPopover" placement="top-start" theme="dark" trigger="click">
                    <span class="popover_msg">仅统计负责人/协作人的客户中做为负责人的商机</span>
                    <template #reference>
                        <img class="icon" src="@/assets/images/icon_yw.png" alt="">
                    </template>
                </van-popover>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">今日新增/全部商机</div>
                    <div class="val">{{detail.newBusOppCount}}/{{detail.allBusOppCount}}</div>
                </div>
                <div class="item">
                    <div class="label">正在进行中商机</div>
                    <div class="val">{{detail.followUpBusOppCount}}</div>
                </div>
                <div class="item">
                    <div class="label">今日新增商机金额/总金额</div>
                    <div class="val">{{handleMoneyFun(detail.newBusOppPrice)}}/{{handleMoneyFun(detail.allBusOppPrice)}}</div>
                </div>
                <div class="item">
                    <div class="label">今日输单/失效商机</div>
                    <div class="val">{{detail.newLostBusOppCount}}/{{detail.newInvalidBusOppCount}}</div>
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">拜访</div>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">今日待拜访/已拜访客户</div>
                    <div class="val">{{detail.prepareVisitCount}}/{{detail.visitedCount}}</div>
                </div>
                <div class="item">
                    <div class="label">累计拜访客户</div>
                    <div class="val">{{detail.allVisitCouint | filterNum('个')}}</div>
                    <!-- <div class="val">{{detail.allVisitCouint}}个</div> -->
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">朋友圈</div>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">今日朋友圈未发表/已发表次数</div>
                    <div class="val">{{detail.newWmNotSendCount}}/{{detail.newWmSendCount}}</div>
                </div>
                <div class="item">
                    <div class="label">累计发表朋友圈</div>
                    <div class="val">{{detail.allWmSendCount | filterNum('次')}}</div>
                    <!-- <div class="val">{{detail.allVisitCouint}}个</div> -->
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">群发</div>
                <van-popover get-container="tit_box" v-model="groupPopover" placement="top-start" theme="dark" trigger="click">
                    <span class="popover_msg">仅统计做为群主的群聊数</span>
                    <template #reference>
                        <img class="icon" src="@/assets/images/icon_yw.png" alt="">
                    </template>
                </van-popover>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">客户群发已送达/未送达</div>
                    <div class="val">{{detail.cmSendCount}}/{{detail.cmNotSendCount}}</div>
                </div>
                <div class="item">
                    <div class="label">客户群群发已送达/未送达</div>
                    <div class="val">{{detail.cmgSendCount}}/{{detail.cmgNotSendCount}}</div>
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">SOP</div>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">个人SOP已完成/未完成</div>
                    <div class="val">{{detail.sopCompleteCount}}/{{detail.sopIncompleteCount}}</div>
                </div>
                <div class="item">
                    <div class="label">群SOP已完成/未完成</div>
                    <div class="val">{{detail.gsopCompleteCount}}/{{detail.gsopIncompleteCoun}}</div>
                </div>
            </div>
        </div>
        <div class="item_wrap">
            <div class="tit_box">
                <div class="item_tit">素材</div>
            </div>
            <div class="item_box">
                <div class="item">
                    <div class="label">今日素材浏览人数/浏览次数</div>
                    <div class="val">{{detail.newMaterialVisitors}}/{{detail.newMaterialBrowseTimes}}</div>
                </div>
                <div class="item">
                    <div class="label">今日素材浏览时长</div>
                    <div class="val">{{secondToDate(detail.newMaterialBrowseDuration)}}</div>
                </div>
                <div class="item">
                    <div class="label">累计素材浏览总人数/总次数</div>
                    <div class="val">{{detail.allMaterialVisitors}}/{{detail.allMaterialBrowseTimes}}</div>
                </div>
                <div class="item">
                    <div class="label">累计浏览总时长</div>
                    <div class="val">{{secondToDate(detail.allMaterialBrowseDuration)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Base64 } from 'js-base64'
import { formatDate,handleMoney } from '@/utils/tool'
import commonFun from '../../utils/commonToken'
import { 
    Corp_getCrop,
    dataReport_getDataReportDaily
} from '@/api/notice'
export default {

    data(){
        return {
            type: this.$route.query.taskTyp,
            businessPopover: false,
            groupPopover: false,
            detail: {
                allBusOppCount: '', //全部商机数量
                allBusOppPrice: '', //商机总金额
                allClueCount: '',   //全部线索数量
                allCustomerCount: '',   //全部客户数量
                allGroupCount: '',   //全部群聊数量
                allMaterialBrowseDuration: '',   //累计浏览总时长
                allMaterialBrowseTimes: '',   //累计素材浏览总次数
                allMaterialVisitors: '',   //累计素材浏览总人数
                allVisitCouint: '',   //累计拜访客户数
                allWmSendCount: '',   //累计发表朋友圈数
                cmNotSendCount: '',   //客户群发未送达数量
                cmSendCount: '',   //客户群发已送达数量
                cmgNotSendCount: '',   //客户群群发未送达数量
                cmgSendCount: '',   //客户群群发已送达数量
                corpId: '',   //企业id
                createTime: '',   //创建时间
                batchDate: '',   //数据日期
                followUpBusOppCount: '',   //正在进行中的商机数量
                gsopCompleteCount: '',   //群SOP已完成数
                gsopIncompleteCoun: '',   //群SOP未完成数
                newBusOppCount: '',   //今日新增商机数量
                newBusOppPrice: '',   //今日新增商机金额
                newClueCount: '',   //今日新增线索数量
                newCustomerCount: '',   //今日新增客户数量
                newGroupCount: '',   //今日新增群聊数量
                newInGroupCount: '',   //今日入群人数
                newInvalidBusOppCount: '',   //今日失效商机数量
                newLostBusOppCount: '',   //今日输单数量
                newMaterialBrowseDuration: '',   //今日素材浏览时长
                newMaterialBrowseTimes: '',   //今日素材浏览次数
                newMaterialVisitors: '',   //今日素材浏览人数
                newOutGroupCount: '',   //今日退群人数
                newWmNotSendCount: '',   //今日朋友圈未发表数
                newWmSendCount: '',   //今日朋友圈已发表数
                prepareVisitCount: '',   //今日待拜访客户数
                sopCompleteCount: '',   //个人SOP已完成数
                sopIncompleteCount: '',   //个人SOP未完成数
                userNo: '',   //员工号
                visitedCount: '',   //今日已拜访客户数
            },
        }
    },
    computed: {
        token(){
            return this.$store.getters.token
        },
        corpId(){
            return this.$store.getters.corpId
        },
        userNo(){
            let str = this.token.split('|')
            return this.token ? str[1] : ''
        },
        tipsTitle(){
            let str = ''
            if(this.type == 1){
                str = '全天数据'
            }else if(this.type == 2){
                str = '当周数据'
            }else {
                str = '月数据'
            }
            return str
        },
    },
      created() {
      console.log("token",localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
    //   CommonHome.getWxToken();
      commonFun.getWxAppid()
      console.log("获取token")
    }
  },
    mounted(){
            setTimeout(() => {
      this.getCorpId()
       console.log("请求接口")
 
    }, 2000);
      
    },
    methods: {
        formatDate,
        handleMoney,
        getCorpId(){     //获取企业信息
            Corp_getCrop().then(res => {
                if(res.result){
                    this.$store.commit('SET_CORPID', res.data.corpId)
                    this.getDetail()
                }
            })
        },
        getDetail(){    //获取数据详情
            console.log('_data',Base64.encode(this.userNo),Base64.encode(this.corpId))
            dataReport_getDataReportDaily(Base64.encode(this.userNo),Base64.encode(this.corpId)).then(res => {
                if(res.result){
                    this.detail = res.data
                }
            })
        },
        handleMoneyFun(val){
            let str = 0
            if(val){
                str = '¥' + handleMoney(val)
            }
            return str
        },
        secondToDate(result) {
            let _str = ''
            var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            if(Number(h)){
                _str = h + "小时" + m + "分" + s + '秒'
            }else if(Number(m)){
                _str = m + "分" + s + '秒'
            }else{
                if(Number(s) > 0){
                    _str = s + '秒'
                }else{
                    _str = '0秒'
                }
            }
            return _str
        }
    },
    filters: {
        filterNum(val,type){
            let str = 0
            if(val){
                str = type ? val + type : val
            }
            return str
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/color.less';
.popover_msg{
    background: #4a4a4a;
    padding: 24px;
    font-size: 24px;
    display: inline-block;
}
.wrap{
    width: 100%;
    .tips_icon{
        width: 100%;
        padding: 20px 32px;
        display: flex;
        align-items: center;
        .icon{
            width: 24px;
            height: 24px;
            margin-right: 6px;
        }
        .text{
            font-size: 24px;
            line-height: 32px;
            color: @fontSub2;
        }
    }
    .item_wrap{
        width: 100%;
        background: @white;
        margin-bottom: 20px;
        .tit_box{
            width: 100%;
            padding: 26px 32px;
            display: flex;
            align-items: center;
            position: relative;
            &::after{
                content: "";
                width: calc(100% - 32px);
                height: 1px;
                background: @bdColor;
                transform: scaleY(0.5);
                position: absolute;
                left: 32px;
                bottom: 0;
            }
            .icon{
                width: 32px;
                height: 32px;
                margin-left: 8px;
            }
        }
        .item_tit{
            font-size: 32px;
            line-height: 44px;
            color: @fontMain;
            font-weight: bold;
            position: relative;
            padding-left: 20px;
            &::before{
                content: "";
                width: 8px;
                height: 30px;
                background: @main;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
            // &::after{
            //     content: "";
            //     width: calc(100vw - 32px);
            //     height: 1px;
            //     background: @bdColor;
            //     transform: scaleY(0.5);
            //     position: absolute;
            //     left: 32px;
            //     bottom: 0;
            // }
        }
        .total_wrap{
            width: 100%;
            padding: 28px 0;
        }
        .total_box{
            width: 100%;
            display: flex;
            align-items: center;
            &:first-child{
                margin-bottom: 40px;
            }
            .total{
                width: 50%;
                text-align: center;
                position: relative;
                &:first-child::after{
                    content: '';
                    width: 1px;
                    height: 60px;
                    background: @dashedColor;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%) scaleX(0.5);
                }
                .num{
                    font-size: 32px;
                    line-height: 45px;
                    color: @fontMain;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
                .text{
                    font-size: 28px;
                    line-height: 40px;
                    color: @fontSub2;
                }
            }
        }
        .item_box{
            width: 100%;
            padding: 0 32px;
            .item{
                width: 100%;
                display: flex;
                font-size: 28px;
                line-height: 40px;
                padding: 28px 0;
                position: relative;
                &::after{
                    content: "";
                    width: calc(100% + 32px);
                    height: 1px;
                    background: @bdColor;
                    transform: scaleY(0.5);
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                &:last-child::after{
                    display: none;
                }
                .label{
                    width: 50%;
                    color: @fontSub2;
                    white-space: nowrap;
                }
                .val{
                    width: 50%;
                    color: @fontMain;
                    font-weight: bold;
                    text-align: right;
                    word-break: break-all;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>