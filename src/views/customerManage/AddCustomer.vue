<template>
    <div class="add-customer">
        <template v-if="!showNameSearch">
            <header-title class="customer-title" :title="headTitle" :needBackText="false" :needLine="true" btnText="确定" @doSubmit="doSubmit"></header-title>

            <div class="form-box">
                <div class="item">
                    <div class="label">
                        <span>{{ fromType == 1 ? '线索名称' : '客户名称' }}</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val" @click.stop="goNameSearch">
                        <input v-show="!customerCalledRequired" type="text" ref="customerCalled" class="input" v-model.trim="form.customerCalled" maxlength="30" placeholder="请输入">
                        <span v-show="customerCalledRequired" class="input tips" @click="showInput('customerCalled')">未输入</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>联系人</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val">
                        <input v-show="!nameRequired" type="text" ref="name" class="input" v-model.trim="form.name" maxlength="30" placeholder="请输入">
                        <span v-show="nameRequired" class="input tips" @click="showInput('name')">未输入</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>手机号码</span>
                    </div>
                    <div class="val">
                        <input type="text" class="input" v-model="form.phone" maxlength="11" placeholder="请输入">
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>{{ fromType == 1 ? '线索来源' : '客户来源' }}</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val">
                        <div class="icon-select" @click="sourceRequired && showInput('source') || !sourceRequired && openSelectDialog('source')">
                            <span :class="{'placeholder': !form.sourceName, tips: sourceRequired}">{{sourceRequired ? '未选择' : form.sourceName | $textEmpty('请选择')}}</span>
                            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                        </div>
                    </div>
                </div>
                <template v-if="fromType == 3">
                    <div class="item">
                        <div class="label">
                            <span>客户阶段</span>
                        </div>
                        <div class="val">
                            <div class="icon-select" @click="openSelectDialog('stage')">
                                <span :class="{'placeholder':!form.stage}">{{form.stage | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">
                            <span>客户类型</span>
                        </div>
                        <div class="val">
                            <div class="icon-select" @click="openSelectDialog('customerType')">
                                <span :class="{'placeholder':!form.customerTypeName}">{{form.customerTypeName | $textEmpty('请选择')}}</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                </template>
                <div class="item">
                    <div class="label">
                        <span>企业名称</span>
                    </div>
                    <div class="val">
                        <input type="text" class="input" v-model="form.cropFullName" maxlength="30" placeholder="请输入">
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>企业规模</span>
                    </div>
                    <div class="val">
                        <div class="icon-select" @click="openSelectDialog('corpScale')">
                            <span :class="{'placeholder':!form.corpScaleName}">{{form.corpScaleName | $textEmpty('请选择')}}</span>
                            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>行业领域</span>
                    </div>
                    <div class="val">
                        <div class="icon-select" @click="openSelectDialog('industry')">
                            <span :class="{'placeholder':!form.industryName}">{{form.industryName | $textEmpty('请选择')}}</span>
                            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>办公地址</span>
                    </div>
                    <div class="val" @click="openDialog('address')">
                        <span class="block-span one-line" :class="{'placeholder':!form.address}">{{form.address | $textEmpty('请输入（不得超过200个字符）')}}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>备注</span>
                    </div>
                    <div class="val" @click="openDialog('remark')">
                        <span class="block-span text" :class="{'placeholder':!form.remark}">{{form.remark | $textEmpty('请输入（不得超过200个字符）')}}</span>
                    </div>
                </div>
            </div>
        </template>
        <!-- 名称搜索页 -->
        <name-search v-else ref="nameSearch" :fromType="2" :customerType="fromType" @hideNameSearch="hideNameSearch" @handleResult="getResult"></name-search>

        <!-- 客户来源 -->
        <select-dialog v-model="dialog" :data="columns" :keys="select.key" :columnValue="select.value" :columnIndex="select.indexList" :isGetIndex="select.isGetIndex" :title="select.title" @confirm="selectedFun"></select-dialog>
        <!-- 地址 and 备注 -->
        <input-dialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></input-dialog>
    </div>
</template>
<script>
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import NameSearch from '@/components/CustomerManage/nameSearch'
import { getAddFiled, doAdd } from '@/api/customer'
import { SelectDialog, InputDialog } from '../customer/components'
import { throttle } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            fromType: this.$route.query.fromType,  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户

            dialog: false,
            dialog_address: false,
            dialogTitle: '',
            dialogType: '',
            dialogText: '',
            columns: [],
            pickerType: '',
            select: {
                key: 'name',
                title: '客户来源',
                isGetIndex: false,
                indexList: null,
                value: '',
            },

            form: {
                customerCalled: '', // 客户名称
                source: '', // 客户来源
                sourceName: '', // 客户来源
                customerType: '', // 客户类型
                customerTypeName: '', // 客户类型
                cropFullName: '', // 企业名称
                corpScale: '', // 企业规模
                corpScaleName: '', // 企业规模
                cropSubIndustry: '', // 行业领域
                industry: [], // 行业领域
                industryName: '', // 行业领域
                address: '', // 办公地址
                remark: '', // 备注
                stage: '', // 客户阶段
                name: '', // 联系人
                phone: '', // 手机号码
            },

            customerTypeOptions: [], // 客户类型选择列表
            customerStageOptions: [], // 客户阶段选择列表
            sourceOptions: [], // 客户来源选择列表
            scaleOptions: [], // 企业规模选择列表
            industryFieldOptions: [], // 行业领域选择列表

            customerCalledRequired: false,
            nameRequired: false,
            sourceRequired: false,

            showNameSearch: true, // 是否显示名称搜索页

            tips: { 
                customerCalled: '请输入客户名称', 
                source: '请选择客户来源',
                name: '请输入联系人',
            }
        }
    },
    computed: {
        ...mapState(["corpId"]),
        headTitle() {
            if (this.fromType == 1 || this.fromType == 2) {
                return '新增我的线索'
            }
            if (this.fromType == 3 || this.fromType == 4) {
                return '新增我的客户'
            }
            return ''
        },
    },
    created() {
        this.init()
    },
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        init() {
            this.goNameSearch()
            this.getAddFiled()
        },
        // 获取各个选择列表
        getAddFiled() {
            getAddFiled({ corpId: this.corpId }).then(res => {
                let { result, data } = res

                if (result) {
                    const { comlist, commonList} = data

                    comlist.forEach(el => {
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

                    this.industryFieldOptions = comlist  // 行业领域

                    commonList.forEach((item) => {
                        if (item.type == 'stage') {
                            // 客户阶段
                            this.customerStageOptions.push(item)
                        } else if (item.type == 'source') {
                            // 客户来源
                            this.sourceOptions.push(item)
                        } else if (item.type == 'customer_type') {
                            // 客户类型
                            this.customerTypeOptions.push(item)
                        } else if (item.type == 'scale') {
                            // 企业规模
                            this.scaleOptions.push(item)
                        }
                    })
                }
            })
        },
        goBack() {
            let path = this.fromType == 3 || this.fromType == 4 ? '/customerManage/myCustomer' : '/customerManage/clues'

            this.$router.push({ path })
        },
        // 打开名称搜索页面
        goNameSearch() {
            if (this.fromType == 1 || this.fromType == 2) {
                this.showNameSearch = false
            } else {
                this.showNameSearch = true
                this.$nextTick(() => {
                    this.$refs.nameSearch.show(this.form.customerCalled)
                })
            }
        },
        // 关闭名称搜索页
        hideNameSearch() {
            this.showNameSearch = false
        },
        // 获取名称搜索页结果
        getResult(data) {
            console.log("客户名称", data)
            this.form.customerCalled = data
            this.hideNameSearch()
        },
        openDialog(type){   //打开弹窗 (地址 and 备注)
            this.openType = type
            if(type == 'address'){
                this.dialogTitle = '办公地址'
                this.dialogType = 'input'
                this.dialogText = this.form.address
            }else{
                this.dialogTitle = '备注'
                this.dialogType = 'textarea'
                this.dialogText = this.form.remark
            }
            this.dialog_address = true
        },
        confirmFun(val){   //弹窗确认 (地址 and 备注)
            if(this.openType == 'address'){
                this.form.address = val
            }else{
                this.form.remark = val
            }
        },
        openSelectDialog(type){     //打开选择弹窗
            this.pickerType = type
            switch (type) {
                case 'source':  // 客户来源
                    this.select.title = '客户来源'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.form.sourceName
                    this.columns = this.sourceOptions
                    break;
                case 'stage':  // 客户阶段
                    this.select.title = '客户阶段'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.form.stage
                    this.columns = this.customerStageOptions
                    break;
                case 'customerType':  // 客户类型
                    this.select.title = '客户类型'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.form.customerTypeName
                    this.columns = this.customerTypeOptions
                    break;
                case 'corpScale':  // 企业规模
                    this.select.title = '企业规模'
                    this.select.isGetIndex = false
                    this.select.indexList = null
                    this.select.value = this.form.corpScaleName
                    this.columns = this.scaleOptions
                    break;
                case 'industry':  // 行业领域
                    this.select.title = '行业领域'
                    this.select.isGetIndex = true
                    this.select.indexList = null
                    this.select.value = null
                    this.columns = this.industryFieldOptions
                    break;
                default:
                    break;
            }
            this.dialog = true
        },
        selectedFun(val, name){   // 筛选项确认
            let type = this.pickerType
            
            switch (type) {
                case 'source':  // 客户来源
                    this.form.sourceName = val[0].name
                    this.form.source = val[0].value
                    break;
                case 'stage':  // 客户阶段
                    this.form.stage = val[0].name
                    break;
                case 'customerType':  // 客户类型
                    this.form.customerTypeName = val[0].name
                    this.form.customerType = val[0].value
                    break;
                case 'corpScale':  // 企业规模
                    this.form.corpScaleName = val[0].name
                    this.form.corpScale = val[0].id
                    break;
                case 'industry':  // 行业领域
                    this.form.industryName = name.join('/')
                    this.form.industry = val
                    this.form.cropSubIndustry = val.join(',')
                    break;
                default:
                    break;
            }
        },
        // 表单验证
        checkForm() {
            const { customerCalled, name, source } = this.form

            let arrObj = { customerCalled, name, source }

            for (let i in arrObj) {
                if (!arrObj[i] || arrObj[i] && !arrObj[i].length) {
                    this[i + 'Required'] = true
                    this.$toast(this.tips[i])
                    return false
                }
            }

            return true
        },
        showInput(type) {
            this.initRequired(type)
            switch (type) {
                case 'customerCalled':  // 客户名称
                    this.$nextTick(() => {
                        this.$refs.customerCalled.focus()
                    })
                    break;
                case 'name':  // 联系人
                    this.$nextTick(() => {
                        this.$refs.name.focus()
                    })
                    break;
                case 'source':  // 客户来源
                    this.openSelectDialog('source')
                    break;
                default:
                    break;
            }
        },
        initRequired(type) {
             switch (type) {
                case 'customerCalled':  // 客户名称
                    this.customerCalledRequired = false
                    break;
                case 'name':  // 联系人
                    this.nameRequired = false
                    break;
                case 'source':  // 客户来源
                    this.sourceRequired = false
                    break;
                default:
                    break;
            }
        },
        async doSubmit() {
            if(!this.checkForm()) {
                return
            }

            if(!throttle()) {
                return
            }

            let params = {
                ...this.form,
                type: this.fromType
            }
            
            let { result, data, msg } = await doAdd(params)

            if (result) {
                this.$toast(data)
                setTimeout(() => {
                    this.goBack()
                }, 500)
            } else {
                this.$toast(msg)
            }
        },
    },
    components: {
        HeaderTitle,
        SelectDialog,
        InputDialog,
        NameSearch
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.add-customer {
    min-height: 100vh;
    padding: 0 32px;
    background-color: @white;
    .customer-title {
        position: fixed;
        top: 0;
    }
    .form-box{
        width: 100%;
        padding-top: 88px;
        .item{
            display: flex;
            align-items: center;
            font-size: 28px;
            line-height: 36px;
            color: @fontMain;
            padding: 32px 0;
            .label{
                display: flex;
                align-items: center;
                width: 180px;
                span {
                    font-weight: bold;
                }
                .require {
                    width: 16px;
                    height: 16px;
                    line-height: 28px;
                    margin-left: 16px;
                    font-size: 28px;
                    color: @red;
                }
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
                .icon-select{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    span {
                        width: calc(100% - 32px);
                    }
                    .icon{
                        width: 32px;
                        height: 32px;
                    }
                }
                .placeholder{
                    color: @total;
                }
                .text {
                    display: block;
                    word-break: break-all;
                }
                .tips {
                    color: @red;
                }
                .block-span {
                    width: 100%;
                }
            }
        }
    }
}
</style>