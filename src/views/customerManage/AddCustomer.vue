<template>
    <div class="add-customer">
        <header-title :title="headTitle" :needBackText="false" :needLine="true"></header-title>

        <div class="form-box">
            <div class="item">
                <div class="label">
                    <span>客户名称</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.customerName" maxlength="30" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>联系人</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.customerName" maxlength="30" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>手机号码</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.mobile" maxlength="12" placeholder="请输入">
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
                    <div class="icon-select" @click="openSelectDialog('source')">
                        <span :class="{'placeholder':!form.sourceName}">{{form.sourceName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>客户类型</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="openSelectDialog('type')">
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
                    <div class="icon-select" @click="openSelectDialog('scale')">
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
                    <span :class="{'placeholder':!form.address}">{{form.address | $textEmpty('请输入')}}</span>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>备注</span>
                </div>
                <div class="val" @click="openDialog('remark')">
                    <span :class="{'placeholder':!form.remark}">{{form.corpScaleName | $textEmpty('请输入（不得超过200个字符）')}}</span>
                </div>
            </div>
        </div>

        <!-- 客户来源 -->
        <select-dialog :data="columns" :keys="select.key" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></select-dialog>
        <!-- 地址 and 备注 -->
        <input-dialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></input-dialog>
    </div>
</template>
<script>
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import { getAddFiled } from '@/api/customer'
import { SelectDialog, InputDialog } from '../customer/components'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            navActive: '',
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
                isGetIndex: false
            },

            form: {
                industry: [],
                industryName: '',       //暂增
                customerName: '',
                source: '',
                sourceName: '',         //暂增
                customerType: '',
                customerTypeName: '',   //暂增
                mobile: '',
                cropFullName: '',
                corpScale: '',
                corpScaleName: '',      //暂增
                address: '',
                remark: '',
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
            const { navActive } = this.$route.query

            this.navActive = navActive
            this.headTitle = navActive == 'myCustomer' ? '新增我的客户' : '新增客户'

            this.getAddFiled()
        },
        // 获取各个选择列表
        getAddFiled() {
            getAddFiled({ corpId: this.corpId }).then(res => {
                let { code, data } = res

                if (code == 'success') {
                    const { comlist, commonList} = data

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
                    this.form.sourceName = val[0].name
                    this.form.source = val[0].type
                    break;
                case 'type':  //客户类型
                    console.log('客户类型',val)
                    this.form.customerTypeName = val[0].name
                    this.form.customerType = val[0].code
                    break;
                case 'scale':  //企业规模
                    console.log('企业规模',val)
                    this.form.corpScaleName = val[0].name
                    this.form.corpScale = val[0].id
                    break;
                case 'industry':  //所属行业
                    console.log('所属行业',val,this.industryList[val[0]])
                    let str = this.industryList[val[0]].name + '/' + this.industryList[val[0]].children[val[1]].name
                    this.form.industryName = str
                    this.form.industry = val
                    break;
                default:
                    break;
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
    .form-box{
        width: 100%;
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
            }
        }
    }
}
</style>