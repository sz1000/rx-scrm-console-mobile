<template>
    <div class="detail_wrap">
        <div class="top_box">
            <div class="avatar_box">
                <img class="avatar" :src="detail.avatar | $setAvatar" alt="">
                <div class="val">
                    <div class="name">{{detail.name}}</div>
                    <div class="alt">{{detail.customerType | typeName}}</div>
                    <img class="gender" :src="gender" alt="">
                </div>
            </div>
        </div>
        <div class="content">
            <div class="row tag">
                <div class="tit">企业标签</div>
                <div class="tag_box">
                    <div class="tag" v-for="(item,index) in companyTagList" :key="index">{{item.name}}</div>
                </div>
            </div>
            <div class="row tag">
                <div class="tit">个人标签</div>
                <div class="tag_box">
                    <div class="tag" v-for="(item,index) in personTagList" :key="index">{{item.name}}</div>
                </div>
            </div>
            <div class="row">
                <div class="tit">基本信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">企业简称</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.customerName" maxlength="30" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">固定电话</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.mobil" maxlength="12" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户来源</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('source')">
                                <span :class="{'placeholder':!detail.sourceName}">{{detail.sourceName | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户类型</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('type')">
                                <span :class="{'placeholder':!detail.customerTypeName}">{{detail.customerTypeName | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户阶段</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.stage" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">企业名称</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.cropFullName" maxlength="30" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">企业规模</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('scale')">
                                <span :class="{'placeholder':!detail.corpScaleName}">{{detail.corpScaleName | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">所属行业</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('industry')">
                                <span :class="{'placeholder':!detail.industryName}">{{detail.industryName | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">地址</div>
                        <div class="val" @click="openDialog('address')">
                            <!-- <input type="text" class="input" v-model="detail.address" maxlength="200" placeholder="请输入" readonly> -->
                            <span :class="{'placeholder':!detail.address}">{{detail.address | $textEmpty('请输入')}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">备注</div>
                        <div class="val" @click="openDialog('remark')">
                            <!-- <input type="text" class="input" v-model="detail.remark" maxlength="200" placeholder="请输入（不得超过200个字符）" readonly> -->
                            <span :class="{'placeholder':!detail.remark}">{{detail.corpScaleName | $textEmpty('请输入（不得超过200个字符）')}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">联系人信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">联系人</div>
                        <div class="val">{{detail.name}}</div>
                    </div>
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="val">{{detail.gender | $gender}}</div>
                    </div>
                    <div class="item">
                        <div class="label">手机号</div>
                        <div class="val">{{detail.phone}}</div>
                    </div>
                    <div class="item">
                        <div class="label">微信号</div>
                        <div class="val">{{detail.weixin}}</div>
                    </div>
                    <div class="item">
                        <div class="label">微信昵称</div>
                        <div class="val">{{detail.name}}</div>
                    </div>
                    <div class="item">
                        <div class="label">职务</div>
                        <div class="val">{{detail.position}}</div>
                    </div>
                    <div class="item">
                        <div class="label">邮箱</div>
                        <div class="val">{{detail.email}}</div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="customList && customList.length">
                <div class="tit">自定义信息</div>
                <div class="item_box">
                    <div class="item" v-for="item in customList" :key="item.id">
                        <div class="label">{{item.columnName}}</div>
                        <div class="val">{{item.value}}</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">系统信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">添加人员</div>
                        <div class="val">{{detail.createBy}}</div>
                    </div>
                    <div class="item">
                        <div class="label">添加客户时间</div>
                        <div class="val">{{detail.createTime}}</div>
                    </div>
                    <div class="item">
                        <div class="label">前负责人</div>
                        <div class="val">{{detail.beBelongBy}}</div>
                    </div>
                    <div class="item">
                        <div class="label">转换时间</div>
                        <div class="val">{{detail.turnTime}}</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">企微信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">企业简称</div>
                        <div class="val">{{detail.externalCorpName}}</div>
                    </div>
                    <div class="item">
                        <div class="label">客户来源</div>
                        <div class="val">{{detail.externalSource}}</div>
                    </div>
                    <div class="item">
                        <div class="label">企业名称</div>
                        <div class="val">{{detail.externalCorpFullName}}</div>
                    </div>
                    <div class="item">
                        <div class="label">客户类型</div>
                        <div class="val">{{detail.externalType | $customerType}}</div>
                    </div>
                    <div class="item">
                        <div class="label">姓名</div>
                        <div class="val">{{detail.externalName}}</div>
                    </div>
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="val">{{detail.externalGender | $gender}}</div>
                    </div>
                    <div class="item">
                        <div class="label">职务</div>
                        <div class="val">{{detail.externalPosition}}</div>
                    </div>
                    <div class="item">
                        <div class="label">添加人员</div>
                        <div class="val">{{detail.createBy}}</div>
                    </div>
                    <div class="item">
                        <div class="label">添加客户时间</div>
                        <div class="val">{{detail.createTime}}</div>
                    </div>
                    <div class="item">
                        <div class="label">备注</div>
                        <div class="val">{{detail.remark}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 客户来源 -->
        <SelectDialog :data="columns" :keys="select.key" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></SelectDialog>
        <!-- 地址 and 备注 -->
        <InputDialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></InputDialog>
    </div>
</template>

<script>
import { SelectDialog,InputDialog } from './components'
import { customerType } from '@/utils/config'
import {
  cluecustomer_toupdate,
  cluecustomer_update,
  cluecustomer_gettag,
  cluecustomer_addtag,
  cluecustomer_updPertag,
  cluecustomer_deltag,
  cluecustomer_updCorptag,
} from '@/api/customer'
export default {
    components: {
        SelectDialog,InputDialog
    },
    data(){
        return {
            id: this.$route.query.id,
            dialog: false,
            dialog_address: false,
            columns: [],
            pickerType: '',
            select: {
                key: 'name',
                title: '客户来源',
                isGetIndex: false
            },
            openType: '',
            dialogTitle: '',
            dialogType: '',
            dialogText: '',
            customerList:[],                 //客户来源
            customerTypeList: customerType,  //客户类型
            scaleList: [],                   //企业规模
            industryList: [],                //所属行业
            allCompanyTagList: [],           //企业标签(all)
            companyTagList: [],              //企业标签
            personTagList: [],               //个人标签
            customList: [],                  //自定义信息

            detail: {
                avatar: '',
                industry: [],
                industryName: '',       //暂增
                customerName: '',
                source: '',
                sourceName: '',         //暂增
                customerType: '',
                customerTypeName: '',   //暂增
                mobil: '',
                cropFullName: '',
                corpScale: '',
                corpScaleName: '',      //暂增
                address: '',
                remark: '',
                describe: '',
                name: '',
                phone: '',
                weixin: '',
                gender: '',
                position: '',
                cropFullName: '',
                cropSubIndustry: '',
                source: '',
                email: '',
                stage: '',
            },
        }
    },
    computed: {
        gender(){
            let val = this.detail.gender,obj = {
                1: require('@/images/man.png'),
                2: require('@/images/icon_female@2x.png'),
            }
            return val ? obj[val] : ''
        },
    },
    mounted(){
        this.getDetail()
        this.getTagList()
    },
    methods: {
        getTagList(){   //获取标签列表
            cluecustomer_gettag(this.id).then(res => {
                if(res.result){
                    let data = res.data
                    this.companyTagList = data.corpTagList
                    this.personTagList = data.personTagList
                    this.allCompanyTagList = data.tagCorpList
                }
            })
        },
        getDetail(){
            cluecustomer_toupdate(this.id).then(res => {
                if(res.result){
                    let data = res.data
                    this.detail = Object.assign(this.detail,data.clueCustomerEntity)
                    this.customerList = data.list
                    this.scaleList = data.corpScaleList
                    data.comlist.forEach(el => {
                        if(el.children.length == 0){
                            el.children = null
                        }else{
                            el.children.forEach(son => {
                                if(son.children.length == 0){
                                    son.children = null
                                }
                            })
                        }
                    })
                    this.industryList = data.comlist
                    let tempColum = data.clueCustomerEntity.corpCustomColumnMap
                    data.head.forEach(el => {
                        el.value = tempColum ? tempColum[item.columnValue] : ''
                    })
                    this.customList =  data.head.filter(item => {
                        return item.columnType
                    })
                }
            })
        },
        fixData(data){  //数据调整

        },
        openDialog(type){   //打开弹窗 (地址 and 备注)
            this.openType = type
            if(type == 'address'){
                this.dialogTitle = '地址'
                this.dialogType = 'input'
                this.dialogText = this.detail.address
            }else{
                this.dialogTitle = '备注'
                this.dialogType = 'textarea'
                this.dialogText = this.detail.remark
            }
            this.dialog_address = true
        },
        confirmFun(val){   //弹窗确认 (地址 and 备注)
            if(this.openType == 'address'){
                this.detail.address = val
            }else{
                this.detail.remark = val
            }
        },
        openSelectDialog(type){     //打开选择弹窗
            this.pickerType = type
            switch (type) {
                case 'source':  //客户来源
                    this.select.title = '客户来源'
                    this.select.isGetIndex = false
                    this.columns = this.customerList
                    break;
                case 'type':  //客户类型
                    this.select.title = '客户类型'
                    this.select.isGetIndex = false
                    this.columns = this.customerTypeList
                    break;
                case 'scale':  //企业规模
                    this.select.title = '企业规模'
                    this.select.isGetIndex = false
                    this.columns = this.scaleList
                    break;
                case 'industry':  //所属行业
                    this.select.title = '所属行业'
                    this.select.isGetIndex = true
                    this.columns = this.industryList
                    break;
                default:
                    break;
            }
            this.dialog = true
        },
        selectedFun(val){   //筛选项确认
            let type = this.pickerType
            switch (type) {
                case 'source':  //客户来源
                    console.log('客户来源',val[0].name)
                    this.detail.sourceName = val[0].name
                    this.detail.source = val[0].type
                    break;
                case 'type':  //客户类型
                    console.log('客户类型',val)
                    this.detail.customerTypeName = val[0].name
                    this.detail.customerType = val[0].code
                    break;
                case 'scale':  //企业规模
                    console.log('企业规模',val)
                    this.detail.corpScaleName = val[0].name
                    this.detail.corpScale = val[0].id
                    break;
                case 'industry':  //所属行业
                    console.log('所属行业',val,this.industryList[val[0]])
                    let str = this.industryList[val[0]].name + '/' + this.industryList[val[0]].children[val[1]].name
                    this.detail.industryName = str
                    this.detail.industry = val
                    break;
                default:
                    break;
            }
        },
    },
    filters: {
        typeName(val){
            return val ? val == 1 ? '@微信' : `@${this.detail.customerName}` : ''
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.detail_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
    .top_box{
        width: 100%;
        padding: 32px;
        position: relative;
        &::before{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            top: 0;
            left: 0;
        }
        &::after{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .avatar_box{
            display: flex;
            align-items: center;
            .avatar{
                width: 100px;
                height: 100px;
                background: rgba(0,0,0,.05);
                border-radius: 50%;
                margin-right: 24px;
            }
            .val{
                width: calc(100% - 124px);
                display: flex;
                align-items: flex-end;
                .name{
                    color: @fontMain;
                    font-weight: bold;
                    font-size: 36px;
                    line-height: 48px;
                }
                .alt{
                    color: @yellow;
                    font-size: 24px;
                    line-height: 32px;
                    margin-left: 8px;
                }
                .gender{
                    width: 30px;
                    height: auto;
                }
            }
        }
    }
    .content{
        width: 100%;
        padding: 32px;
        .row{
            width: 100%;
            position: relative;
            padding-bottom: 64px;
            margin-bottom: 32px;
            &.tag{
                padding-bottom: 40px;
                .tit{
                    margin-bottom: 32px;
                }
            }
            &:last-child{
                margin-bottom: 0;
                &::after{
                    display: none;
                }
            }
            &::after{
                content: '';
                width: 100%;
                height: 1px; /* no */
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .tit{
                font-size: 24px;
                line-height: 32px;
                color: @total;
            }
            .tag_box{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .tag{
                    color: @fontSub1;
                    line-height: 52px;
                    height: 52px;
                    background: @navBg;
                    border-radius: 8px;
                    padding: 0 16px;
                    margin-right: 16px;
                    margin-bottom: 24px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .item_box{
                width: 100%;
                .item{
                    display: flex;
                    align-items: center;
                    font-size: 28px;
                    line-height: 36px;
                    color: @fontMain;
                    padding: 32px 0;
                    .label{
                        width: 180px;
                        font-weight: bold;
                    }
                    .val{
                        width: calc(100% - 180px);
                        text-align: right;
                        display: flex;
                        justify-content: right;
                        .input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            text-align: right;
                        }
                        .icon_select{
                            display: flex;
                            align-items: center;
                            .icon{
                                width: 32px;
                                height: 32px;
                                // margin-left: 12px;
                            }
                        }
                        .placeholder{
                            color: @total;
                        }
                    }
                }
            }
        }
    }
}
</style>