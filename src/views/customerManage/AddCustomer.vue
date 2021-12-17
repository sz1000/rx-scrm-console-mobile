<template>
    <div class="add-customer">
        <header-title class="customer-title" :title="headTitle" :needBackText="false" :needLine="true" btnText="确定" @doSubmit="doSubmit"></header-title>

        <div class="form-box">
            <div class="item">
                <div class="label">
                    <span>客户名称</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.customerCalled" maxlength="30" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>联系人</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.name" maxlength="30" placeholder="请输入">
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
                    <span>客户来源</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="openSelectDialog('source')">
                        <span :class="{'placeholder':!form.sourceName}">{{form.sourceName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
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
                    <span class="one-line" :class="{'placeholder':!form.address}">{{form.address | $textEmpty('请输入（不得超过200个字符）')}}</span>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>备注</span>
                </div>
                <div class="val" @click="openDialog('remark')">
                    <span class="text" :class="{'placeholder':!form.remark}">{{form.remark | $textEmpty('请输入（不得超过200个字符）')}}</span>
                </div>
            </div>
        </div>

        <!-- 客户来源 -->
        <select-dialog :data="columns" :keys="select.key" :columnValue="select.value" :columnIndex="select.indexList" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></select-dialog>
        <!-- 地址 and 备注 -->
        <input-dialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></input-dialog>
    </div>
</template>
<script>
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import { getAddFiled, doAdd } from '@/api/customer'
import { SelectDialog, InputDialog } from '../customer/components'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            customerType: '',
            headTitle: '',

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
                industry: [], // 行业领域
                industryIndex: [], // 行业领域
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
        }
    },
    computed: {
        ...mapState(["corpId"]),
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
            const { customerType } = this.$route.query

            this.customerType = customerType
            this.headTitle = customerType == '3' ? '新增我的客户' : '新增客户'

            this.getAddFiled()
        },
        // 获取各个选择列表
        getAddFiled() {
            getAddFiled({ corpId: this.corpId }).then(res => {
                let { code, data } = res

                if (code == 'success') {
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
            this.$router.push({ path: '/customerManage/myCustomer' })
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
                    this.select.value = null,
                    this.select.indexList = this.form.industryIndex
                    this.columns = this.industryFieldOptions
                    break;
                default:
                    break;
            }
            this.dialog = true
        },
        selectedFun(val){   // 筛选项确认
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
                    console.log('所属行业', val, this.industryFieldOptions[val[0]])

                    let str = this.industryFieldOptions[val[0]].name + '/' + this.industryFieldOptions[val[0]].children[val[1]].name
                    this.form.industryName = str
                    this.form.industryIndex = val
                    this.form.industry = [this.industryFieldOptions[val[0]].id, this.industryFieldOptions[val[0]].children[val[1]].id]
                    break;
                default:
                    break;
            }
        },
        async doSubmit() {
            let params = {
                ...this.form,
                type: this.customerType
            }

            console.log("入参：", params)

            let { code, msg } = await doAdd(params)

            if (code == 'success') {
                this.$toast(msg)
                setTimeout(() => {
                    this.goBack()
                }, 1000)
            } else {
                this.$toast(msg)
            }
        },
    },
    components: {
        HeaderTitle,
        SelectDialog,
        InputDialog
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
            }
        }
    }
}
</style>