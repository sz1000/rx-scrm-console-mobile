<template>
    <div class="detail_wrap">
        <div class="top_back" @click="$router.go(-1)">
            <img class="icon" src="@/assets/svg/icon_back.svg" alt="">
            <div class="title">客户详情</div>
        </div>
        <div class="top_box">
            <div class="avatar_box">
                <img class="avatar" :src="detail.avatar | $setAvatar" alt="">
                <div class="val">
                    <!-- <van-popover v-model="showPopover" placement="bottom" theme="dark" trigger="click">
                        <div class="pop_text">{{detail.name}}</div>
                        <template #reference>
                            <div class="name">{{detail.name}}</div>
                        </template>
                    </van-popover> -->
                    <span class="name_msg" :class="{'show':showMsg}">{{detail.name}}</span>
                    <div class="name" @click="showMsg = !showMsg">{{detail.name}}</div>
                    <div class="alt" :class="{'green':detail.externalType == 1}">{{typeNameFun(detail.externalType)}}</div>
                    <img class="gender" :src="gender" alt="">
                </div>
            </div>
        </div>
        <div class="content">
            <div class="row tag">
                <div class="tit">企业标签</div>
                <img class="edit" @click="openDialog('company')" src="@/assets/svg/icon_edit.svg" alt="">
                <div class="tag_wrap" ref="companyTagWrap" :class="{'more':companyTagMore}">
                    <div class="tag_box" ref="companyTagBox">
                        <div class="tag" v-for="(item,index) in companyTagList" :key="index">{{item.name}}</div>
                    </div>
                </div>
                <div class="more" v-if="isCompanyMore">
                    <img class="icon" v-if="!companyTagMore" @click="companyTagMore = true" src="@/assets/svg/icon_down.svg" alt="">
                    <img class="icon" v-else @click="companyTagMore = false" src="@/assets/svg/icon_up.svg" alt="">
                </div>
            </div>
            <div class="row tag">
                <div class="tit">个人标签</div>
                <img class="edit" @click="openDialog('person')" src="@/assets/svg/icon_edit.svg" alt="">
                <div class="tag_wrap" ref="personTagWrap" :class="{'more':personTagMore}">
                    <div class="tag_box" ref="personTagBox">
                        <div class="tag" v-for="(item,index) in personList" :key="index">{{item.name}}</div>
                    </div>
                </div>
                <div class="more" v-if="isPersonMore">
                    <img class="icon" v-if="!personTagMore" @click="personTagMore = true" src="@/assets/svg/icon_down.svg" alt="">
                    <img class="icon" v-else @click="personTagMore = false" src="@/assets/svg/icon_up.svg" alt="">
                </div>
            </div>
            <div class="row">
                <div class="tit">基本信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">企业简称</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.customerName" @change="updateFun" maxlength="30" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">固定电话</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.mobil" @change="updateFun" @input="detail.mobil=detail.mobil.replace(/[^\d|\-]/g,'')" maxlength="20" placeholder="请输入">
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
                            <!-- <input type="text" class="input" v-model="detail.stage" placeholder="请输入"> -->
                            <div class="icon_select" @click="openSelectDialog('stage')">
                                <span :class="{'placeholder':!detail.stage}">{{detail.stage | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">企业名称</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.cropFullName" @change="updateFun" maxlength="30" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">企业规模</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('scale')">
                                <span :class="{'placeholder':!detail.cropscale}">{{detail.cropscale | $textEmpty('请选择')}}</span>
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
                    <div class="item lh">
                        <div class="label">备注</div>
                        <div class="val" @click="openDialog('remark')">
                            <!-- <input type="text" class="input" v-model="detail.remark" maxlength="200" placeholder="请输入（不得超过200个字符）" readonly> -->
                            <span :class="{'placeholder':!detail.remark}">{{detail.remark | $textEmpty('请输入（不得超过200个字符）')}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">联系人信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">联系人</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.name" @change="updateFun" maxlength="20" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="val">
                            <div class="icon_select" @click="openSelectDialog('gender')">
                                <span :class="{'placeholder':!detail.gender}">{{$gender(detail.gender)}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">手机号</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.phone" @change="updateFun" @input="detail.phone=detail.phone.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">微信号</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.weixin" @change="updateFun" maxlength="20" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">微信昵称</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.wechatNickname" @change="updateFun" maxlength="20" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">职务</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.position" @change="updateFun" maxlength="20" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">邮箱</div>
                        <div class="val">
                            <input type="text" class="input" v-model="detail.email" @change="updateFun" maxlength="20" placeholder="请输入">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row no" v-if="customList && customList.length">
                <div class="tit">自定义信息</div>
                <div class="item_box">
                    <div class="item" v-for="item in customList" :key="item.id">
                        <div class="label">{{item.columnName}}</div>
                        <div class="val">{{item.value}}</div>
                    </div>
                </div>
            </div>
            <div class="row no">
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
            <div class="row no">
                <div class="tit">企微信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">企业简称</div>
                        <div class="val">{{detail.externalCorpName}}</div>
                    </div>
                    <div class="item">
                        <div class="label">客户来源</div>
                        <div class="val">{{detail.externalSourceName}}</div>
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
                    <div class="item lh">
                        <div class="label">备注</div>
                        <div class="val">{{detail.remark}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 客户来源 -->
        <SelectDialog :data="columns" :keys="select.key" :columnValue="select.value" :columnIndex="select.indexList" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></SelectDialog>
        <!-- 地址 and 备注 -->
        <InputDialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></InputDialog>
        <!-- 企业标签 -->
        <TagDialog :title="tagTitle" :type="openType" :companyList="allComTagList" :personList="personTagList" v-model="dialog_tag" @sure="tagUpdateFun"></TagDialog>
    </div>
</template>

<script>
import { SelectDialog,InputDialog,TagDialog } from './components'
import { genderType } from '@/utils/config'
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
        SelectDialog,InputDialog,TagDialog
    },
    data(){
        return {
            id: this.$route.query.id,
            dialog: false,
            dialog_address: false,
            dialog_tag: false,
            personTagMore: false,
            companyTagMore: false,
            showPopover: false,
            columns: [],
            pickerType: '',
            select: {
                key: 'name',
                title: '客户来源',
                isGetIndex: false,
                indexList: null,
                value: '',
            },
            openType: '',
            dialogTitle: '',
            dialogType: '',
            dialogText: '',
            tagTitle: '企业标签',
            commonList: [],                  //所有列表(综合)
            customerList:[],                 //客户来源
            customerTypeList: [],            //客户类型
            scaleList: [],                   //企业规模
            stageList: [],                   //客户阶段
            industryList: [],                //所属行业
            allCompanyTagList: [],           //企业标签(all)
            companyTagList: [],              //企业标签
            personTagList: [],               //个人标签
            customList: [],                  //自定义信息
            genderList: genderType,
            sourcePerTag: [],
            allComTagList: [],
            industryId: null,
            isPersonMore: false,
            isCompanyMore: false,
            showMsg: false,

            detail: {
                clueCustomerNo: '',
                avatar: '',
                cropSubIndustry: '',
                industryName: '',       //暂增
                customerName: '',
                source: '',
                sourceName: '',         
                customerType: '',
                customerTypeName: '',   
                mobil: '',
                cropFullName: '',
                corpScale: '',
                cropscale: '',      
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
        personList(){   //已使用个人标签
            let list = this.sourcePerTag.filter(el => {
                return el.isChecked
            })
            return list
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
                    this.sourcePerTag = data.personTagList
                    this.personTagList = JSON.parse(JSON.stringify(this.sourcePerTag))
                    this.companyTagList = data.corpTagList
                    data.tagCorpList.forEach(el => {
                        el.children.forEach(son => {
                            son.active = false
                            data.corpTagList.forEach(item => {
                                if(son.tagid == item.tagid){
                                    son.active = true
                                }
                            })
                        })
                    })
                    this.allCompanyTagList = data.tagCorpList

                    this.getMoreState()
                }
            })
        },
        getDetail(){    //详情
            cluecustomer_toupdate(this.id).then(res => {
                if(res.result){
                    let data = res.data
                    this.detail = Object.assign(this.detail,data.clueCustomerEntity)
                    this.commonList = data.commonList
                    this.customerList = this.getTypeList('source')
                    this.customerTypeList = this.getTypeList('customer_type')
                    // this.customerList = data.list
                    this.scaleList = this.getTypeList('scale')
                    this.stageList = this.getTypeList('stage')
                    // this.scaleList = data.corpScaleList
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
                        el.value = tempColum ? tempColum[el.columnValue] : ''
                    })
                    this.customList =  data.head.filter(item => {
                        return item.columnType
                    })
                    this.fixData(this.detail)
                }
            })
        },
        fixData(data){  //数据调整
            let val = data.cropSubIndustry ? data.cropSubIndustry.split(',') : null
            console.log('val',val)
            if(val){
                let i = 0,j = 0
                this.industryList.forEach((el,index) => {
                    if(el.id == val[0]){
                        i = index
                    }
                    el.children.forEach((son,s) => {
                        if(son.id == val[1]){
                            j = s
                        }
                    })
                })
                this.industryId = [i,j]
                data.industryName = this.industryList[i].name + '/' + this.industryList[i].children[j].name
            }

            this.getMoreState()
        },
        getMoreState(){     //获取more状态
            this.$nextTick(() => {
                let _wrap = this.$refs.personTagWrap.clientHeight
                let _box = this.$refs.personTagBox.clientHeight
                let _wrap1 = this.$refs.companyTagWrap.clientHeight
                let _box1 = this.$refs.companyTagBox.clientHeight
                this.isPersonMore = _box > _wrap ? true : false
                this.isCompanyMore = _box1 > _wrap1 ? true : false
                console.log(_wrap,_box,_wrap1,_box1)
            })
        },
        tagUpdateFun(type,val){     //标签增减
            console.log(type,val)
            switch (type) {
                case 'company':     //企业标签更改
                    cluecustomer_updCorptag(this.id,val).then(res => {
                        if(res.result){
                            this.dialog_tag = false
                            this.getTagList()
                        }
                    })
                    break;
                case 'person':  //个人标签更改
                    cluecustomer_updPertag(val,this.id).then(res => {
                        if(res.result){
                            this.dialog_tag = false
                            this.getTagList()
                        }
                    })
                    break;
                case 'add':     //新增个人标签
                    let obj = {
                        clueCustomerNo: this.id,
                        name: val
                    }
                    cluecustomer_addtag(obj).then(res => {
                        if(res.result){
                            this.getTagList()
                        }else{
                            this.$toast(res.msg)
                        }
                    })
                    break;
                case 'delete':
                    cluecustomer_deltag(val).then(res => {
                        if(res.result){
                            this.getTagList()
                        }
                    })
                    break;
                default:
                    break;
            }
        },
        updateFun(){
            this.detail.clueCustomerNo = this.id
            cluecustomer_update(this.detail,true).then(res => {
                if(res.result){
                    this.$toast('更新成功')
                }
            })
        },
        openDialog(type){   //打开弹窗 (地址 and 备注)
            this.openType = type
            switch (type) {
                case 'address':
                    this.dialogTitle = '地址'
                    this.dialogType = 'input'
                    this.dialogText = this.detail.address
                    this.dialog_address = true
                    break;
                case 'remark':
                    this.dialogTitle = '备注'
                    this.dialogType = 'textarea'
                    this.dialogText = this.detail.remark
                    this.dialog_address = true
                    break;
                case 'company':
                    this.tagTitle = '企业标签'
                    this.allComTagList = JSON.parse(JSON.stringify(this.allCompanyTagList))
                    this.dialog_tag = true
                    break;
                case 'person':
                    this.tagTitle = '个人标签'
                    this.personTagList = JSON.parse(JSON.stringify(this.sourcePerTag))
                    this.dialog_tag = true
                    break;
                default:
                    break;
            }
        },
        confirmFun(val){   //弹窗确认 (地址 and 备注)
            val = val.trim() ? val.trim() : ''
            if(this.openType == 'address'){
                this.detail.address = val
            }else{
                this.detail.remark = val
            }
            this.updateFun()
        },
        openSelectDialog(type){     //打开选择弹窗
            this.pickerType = type
            switch (type) {
                case 'source':  //客户来源
                    this.select.title = '客户来源'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.detail.sourceName
                    this.columns = this.customerList
                    break;
                case 'type':  //客户类型
                    this.select.title = '客户类型'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.detail.customerTypeName
                    this.columns = this.customerTypeList
                    break;
                case 'scale':  //企业规模
                    this.select.title = '企业规模'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.detail.cropscale
                    this.columns = this.scaleList
                    break;
                case 'stage':  //客户阶段
                    this.select.title = '客户阶段'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.detail.stage
                    this.columns = this.stageList
                    break;
                case 'industry':  //所属行业
                    this.select.title = '所属行业'
                    this.select.isGetIndex = true
                    this.select.value = null
                    this.select.indexList = this.industryId
                    this.columns = this.industryList
                    break;
                case 'gender':    //性别
                    this.select.title = '性别'
                    this.select.isGetIndex = false
                    this.select.value = this.$gender(this.detail.gender)
                    this.columns = this.genderList
                default:
                    break;
            }
            this.dialog = true
        },
        selectedFun(val,name){   //筛选项确认
            let type = this.pickerType
            switch (type) {
                case 'source':  //客户来源
                    console.log('客户来源',val[0].name)
                    this.detail.sourceName = val[0].name
                    this.detail.source = val[0].value
                    break;
                case 'type':  //客户类型
                    console.log('客户类型',val)
                    this.detail.customerTypeName = val[0].name
                    this.detail.customerType = val[0].value
                    break;
                case 'scale':  //企业规模
                    console.log('企业规模',val)
                    this.detail.cropscale = val[0].name
                    this.detail.corpScale = val[0].id
                    break;
                case 'stage':  //客户阶段
                    console.log('客户阶段',val)
                    this.detail.stage = val[0].name
                    break;
                case 'industry':  //所属行业
                    // console.log('所属行业',val,this.industryList[val[0]])
                    // let str = this.industryList[val[0]].name + '/' + this.industryList[val[0]].children[val[1]].name
                    this.detail.industryName = name.join('/')
                    this.detail.cropSubIndustry = val.join(',')
                    break;
                case 'gender':  //性别
                    console.log('asd',val)
                    this.detail.gender = val[0].code.toString()
                default:
                    break;
            }
            this.updateFun()
        },
        getTypeList(val){   //获取对应的列表
            let list = this.commonList.filter(el => {
                return el.type == val
            })
            return list
        },
        typeNameFun(val){
            return val ? val == 1 ? '@微信' : `@${this.detail.customerName}` : ''
        }
    },
    watch: {
        showMsg(val){
            if(val){
                setTimeout(() => {
                    this.showMsg = false
                },5000)
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.pop_text{
    padding: 12px;
}
.detail_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
    .top_back{
        width: 100%;
        height: 88px;
        position: relative;
        text-align: center;
        &::before{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            position: absolute;
            left: 0;
            bottom: 0;
            transform: scaleY(.5);
        }
        .icon{
            width: 32px;
            height: 32px;
            position: absolute;
            left: 32px;
            top: 50%;
            transform: translateY(-50%);
        }
        .title{
            display: inline-block;
            line-height: 88px;
            font-size: 28px;
            font-weight: bold;
            color: @fontMain;
        }
    }
    .top_box{
        width: 100%;
        padding: 32px;
        position: relative;
        // &::before{
        //     content: '';
        //     width: 100%;
        //     height: 1px; /* no */
        //     background: @lineColor;
        //     transform: scaleY(.5);
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        // }
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
                position: relative;
                .name_msg{
                    color: @white;
                    background: rgb(0,0,0);
                    border-radius: 10px;
                    padding: 12px;
                    z-index: 0;
                    opacity: 0;
                    position: absolute;
                    bottom: -16px;
                    left: 0;
                    transform: translateY(100%);
                    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1); /* no */
                    transition: all .2s;
                    &.show{
                        opacity: 1;
                        z-index: 10;
                    }
                    &::before{
                        content: '';
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent; 
                        border-right: 10px solid transparent; 
                        border-bottom: 15px solid rgb(0,0,0); 
                        position: absolute;
                        top: -12px;
                        left: 20px;
                    }
                }
                .name{
                    max-width: 60%;
                    color: @fontMain;
                    font-weight: bold;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                    font-size: 36px;
                    line-height: 48px;
                }
                .alt{
                    color: @yellow;
                    font-size: 24px;
                    line-height: 32px;
                    margin-left: 8px;
                    &.green{
                        color: @green;
                    }
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
            &.no .item_box .item .val{
                color: @fontSub1;
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
            .edit{
                width: 40px;
                height: 40px;
                position: absolute;
                right: 0;
                top: 0;
            }
            .tit{
                font-size: 24px;
                line-height: 32px;
                color: @total;
            }
            .tag_wrap{
                width: 100%;
                max-height: 152px;
                overflow: hidden;
                &.more{
                    max-height: inherit;
                    overflow: inherit;
                }
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
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .more{
                text-align: center;
                .icon{
                    display: inline-block;
                    width: 36px;
                    height: 36px;
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
                    &.lh{
                        align-items: flex-start;
                    }
                    .label{
                        width: 180px;
                        font-weight: bold;
                    }
                    .val{
                        width: calc(100% - 180px);
                        text-align: right;
                        // display: flex;
                        // justify-content: right;
                        .input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            text-align: right;
                        }
                        .icon_select{
                            // display: flex;
                            // align-items: center;
                            display: inline-block;
                            span{
                                display: inline-block;
                                vertical-align: middle;
                            }
                            .icon{
                                width: 32px;
                                height: 32px;
                                // margin-left: 12px;
                                display: inline-block;
                                vertical-align: middle;
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