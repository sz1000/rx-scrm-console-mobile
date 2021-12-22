<template>
    <div class="turn-customer">
        <header-title class="customer-title" title="线索转客户" :needBackText="false" :needLine="true" btnText="确定" @doSubmit="doSubmit"></header-title>

        <div class="form-box">
            <div class="item title">基本信息</div>
            <div class="item">
                <div class="label">
                    <span>客户名称</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input v-show="!customerCalledRequired" type="text" ref="customerCalled" class="input" v-model.trim="form.customerCalled" maxlength="30" placeholder="请输入">
                    <span v-show="customerCalledRequired" class="input tips" @click="showInput('customerCalled')">未输入</span>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>客户来源</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="sourceRequired && showInput('source') || !sourceRequired && openSelectDialog('source')">
                        <span :class="{'placeholder': !form.sourceName, tips: sourceRequired}">{{sourceRequired ? '未选择' : form.sourceName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>客户阶段</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="stageRequired && showInput('stage') || !stageRequired && openSelectDialog('stage')">
                        <span :class="{'placeholder':!form.stage, tips: stageRequired}">{{stageRequired ? '未选择' : form.stage | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>客户类型</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="customerTypeRequired && showInput('customerType') || !customerTypeRequired && openSelectDialog('customerType')">
                        <span :class="{'placeholder':!form.customerTypeName, tips: customerTypeRequired}">{{customerTypeRequired ? '未选择' : form.customerTypeName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>建档时间</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="showDateSelect('createTime')">
                        <span :class="{'placeholder':!form.createTimeShow}">{{form.createTimeShow | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="form-box">
            <div class="item title">企业信息</div>
            <div class="item">
                <div class="label">
                    <span>企业名称</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input v-show="!cropFullNameRequired" type="text" ref="cropFullName" class="input" v-model.trim="form.cropFullName" maxlength="30" placeholder="请输入">
                    <span v-show="cropFullNameRequired" class="input tips" @click="showInput('cropFullName')">未输入</span>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>企业简称</span>
                </div>
                <div class="val">
                    <input type="text" ref="name" class="input" v-model.trim="form.customerName" maxlength="30" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>企业规模</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="cropscaleRequired && showInput('cropscale') || !cropscaleRequired && openSelectDialog('cropscale')">
                        <span :class="{'placeholder':!form.cropscale, tips: cropscaleRequired}">{{cropscaleRequired ? '未选择' : form.cropscale | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>行业领域</span>
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="industryRequired && showInput('industry') || !industryRequired && openSelectDialog('industry')">
                        <span :class="{'placeholder':!form.industryName, tips: industryRequired}">{{industryRequired ? '未选择' : form.industryName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>固定电话</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model="form.mobil" maxlength="13" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>办公地址</span>
                    <span class="require">*</span>
                </div>
                <div class="val" @click="addressRequired && showInput('address') || !addressRequired && openDialog('address')">
                    <span class="one-line" :class="{'placeholder':!form.address, tips: addressRequired}">{{addressRequired ? '未输入' : form.address | $textEmpty('请输入（不得超过200个字符）')}}</span>
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
        <div class="form-box">
            <div class="item title">联系人信息</div>
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
                    <span class="require">*</span>
                </div>
                <div class="val">
                    <input v-show="!phoneRequired" type="text" ref="phone" class="input" v-model="form.phone" maxlength="11" placeholder="请输入">
                    <span v-show="phoneRequired" class="input tips" @click="showInput('phone')">未输入</span>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>微信昵称</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model.trim="form.wechatNickname" maxlength="20" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>微信号</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model.trim="form.weixin" maxlength="20" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>性别</span>
                </div>
                <div class="val">
                    <div class="icon-select" @click="showActionSheet('gender')">
                        <span :class="{'placeholder':!form.genderName}">{{form.genderName | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>职务</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model.trim="form.position" maxlength="20" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="label">
                    <span>邮箱</span>
                </div>
                <div class="val">
                    <input type="text" class="input" v-model.trim="form.email" maxlength="60" placeholder="请输入">
                </div>
            </div>
        </div>
        <div class="form-box">
            <div class="item title">自定义信息</div>
            <div v-for="i in customColumns" :key="i.id" class="item">
                <div class="label">
                    <span>{{ i.columnName }}</span>
                </div>
                <div class="val">
                    <!-- 文本 -->
                    <input v-if="i.columnType == 1" type="text" class="input" v-model.trim="i.value" placeholder="请输入">
                    <!-- 选择 -->
                    <div v-if="i.columnType == 2" class="icon-select" @click="openSelectDialog(i, 'customColumns')">
                        <span :class="{'placeholder':!i.value}">{{i.value | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                    <!-- 时间 -->
                    <div v-if="i.columnType == 3" class="icon-select" @click="showDateSelect(i.columnValue, 'customColumns')">
                        <span :class="{'placeholder':!i.value}">{{i.value | $textEmpty('请选择')}}</span>
                        <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!-- 时间选择弹窗（日历） -->
        <van-calendar v-model="selectDatePopupShow" :min-date="minDate" :show-confirm="false" color="#4168F6" @confirm="dateConfirm"/>
        <!-- 客户来源 -->
        <select-dialog v-model="dialog" :data="columns" :keys="select.key" :columnValue="select.value" :columnIndex="select.indexList" :isGetIndex="select.isGetIndex" :title="select.title" @confirm="selectedFun"></select-dialog>
        <!-- 地址 and 备注 -->
        <input-dialog v-model="dialog_address" :title="dialogTitle" :type="dialogType" :text="dialogText" @confirm="confirmFun"></input-dialog>
        <!-- 性别选择 -->
        <van-action-sheet v-model="genderPopupShow" :actions="genderOptions" cancel-text="取消" close-on-click-action @select="genderConfirm" @cancel="hideGender"/>
    </div>
</template>
<script>
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import { cluecustomer_toupdate, cluecustomer_cluetocustomer } from '@/api/customer'
import { SelectDialog, InputDialog } from '../customer/components'
import { throttle, formatDate } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            fromType: this.$route.query.fromType,  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            clueCustomerNo: this.$route.query.clueCustomerNo,

            selectDatePopupShow: false,
            timeType: '',
            minDate: new Date(2011, 0, 1),

            genderPopupShow: false,

            dialog_address: false,
            dialogTitle: '',
            dialogType: '',
            dialogText: '',

            dialog: false,
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
                createTimeShow: null, // 建档时间（yyyy-MM-dd）
                createTime: '', // 建档时间（入参: yyyy-MM-dd hh:mm:ss）

                customerCalled: '', // 客户名称
                source: '', // 客户来源(val)
                sourceName: '', // 客户来源(name)
                customerType: '', // 客户类型(val)
                customerTypeName: '', // 客户类型(name)
                customerName: '', // 企业简称
                cropFullName: '', // 企业名称
                corpScale: '', // 企业规模(val)
                cropscale: '', // 企业规模(name)
                industry: [], // 行业领域
                cropSubIndustry: '', // 行业领域(val-string)
                industryName: '', // 行业领域(name-string)
                address: '', // 办公地址
                remark: '', // 备注
                stage: '', // 客户阶段(name)
                name: '', // 联系人
                phone: '', // 手机号码
                mobil: '', // 固定电话
                gender: '', // 性别
                genderName: '', // 性别
                position: '', // 职务
                email: '', // 邮箱
                wechatNickname: '', // 微信昵称
                weixin: '', // 微信号

                corpCustomColumnMap: [], // 自定义信息
            },
            customColumns: [], // 自定义信息
            customColumnsTime: '', // 自定义信息时间选择

            customerTypeOptions: [], // 客户类型选择列表
            customerStageOptions: [], // 客户阶段选择列表
            sourceOptions: [], // 客户来源选择列表
            scaleOptions: [], // 企业规模选择列表
            industryFieldOptions: [], // 行业领域选择列表
            genderOptions: [
                { name: '男', value: 1 },
                { name: '女', value: 2 },
                { name: '未知', value: 0 },
            ], // 性别选择列表

            customerCalledRequired: false, // 客户名称
            industryRequired: false, // 行业领域
            nameRequired: false, // 联系人
            phoneRequired: false, // 手机号
            sourceRequired: false, // 客户来源
            stageRequired: false, // 客户阶段
            customerTypeRequired: false, // 客户类型
            cropFullNameRequired: false, // 企业名称
            cropscaleRequired: false, // 企业规模
            addressRequired: false, // 地址
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
            this.getData()
        },
        getData() {
            cluecustomer_toupdate(this.clueCustomerNo).then((res) => {
                let { result, data, msg } = res

                if (result) {
                    let { clueCustomerEntity, stageList, comlist, commonList, corpScaleList, customColumns } = data

                    // 获取各个选择列表
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

                    this.customerStageOptions = stageList // 客户阶段
                    this.industryFieldOptions = comlist  // 行业领域
                    this.scaleOptions = corpScaleList // 企业规模
                    this.customColumns = customColumns // 自定义信息

                    commonList.forEach((item) => {
                        if (item.type == 'source') {
                            // 客户来源
                            this.sourceOptions.push(item)
                        } else if (item.type == 'customer_type') {
                            // 客户类型
                            this.customerTypeOptions.push(item)
                        }
                    })
                    // 获取表单
                    this.form = clueCustomerEntity
                    this.initEchoData()
                } else {
                    this.$toast(msg)
                }
            })
        },
        // 初始化回显数据
        initEchoData() {
            // 行业领域
            if (this.form && this.form.cropSubIndustry) {
                let arr = clueCustomerEntity.cropSubIndustry.split(',')

                this.form.industry = arr.map(Number)
            } else {
                this.form.industry = []
            }
            // 性别
            this.genderOptions.map(item => {
                if (item.value == this.form.gender) {
                    this.form.genderName = item.name
                }
            })
            // 自定义信息
            let obj = this.form.corpCustomColumnMap

            if (obj && obj.length) {
                for (let i in obj) {
                    this.customColumns.forEach(item => {
                        if (item.columnValue == i) {
                            item.value = obj[i]
                        }
                    })
                }
            }
        },
        goBack() {
            this.$router.go(-1)
        },
        // 打开日期选择弹窗
        showDateSelect(timeType, customColumns) {
            this.timeType = timeType
            this.customColumnsTime = customColumns
            this.selectDatePopupShow = true
        },
        // 选中建档时间
        dateConfirm(date) {
            let timeType = this.timeType

            if(this.customColumnsTime == 'customColumns') {
                // 自定义信息
                this.customColumns.forEach(item => {
                    if (item.columnValue == timeType) {
                        item.value = formatDate(date, "yyyy-MM-dd hh:mm:ss")
                    }
                })
            } else {
                this.form[timeType] = new Date(date).getTime()
                this.form.createTimeShow = formatDate(date, "yyyy-MM-dd")
            }
            this.selectDatePopupShow = false
        },
        // 打开性别弹窗
        showActionSheet(type) {
            this.genderPopupShow = true
        },
        // 选中性别
        genderConfirm(val) {
            if (val) {
                const { name, value } = val

                this.form.genderName = name
                this.form.gender = value
            }
            this.hideGender()
            this.$forceUpdate()
        },
        // 关闭性别选择弹窗
        hideGender() {
            this.genderPopupShow = false
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
        openSelectDialog(type, customColumns){     //打开选择弹窗
            if (customColumns == 'customColumns') {
                // 自定义信息
                const { columnValue, columnName, value, optionsVOList } = type

                optionsVOList.forEach(item => {
                    item.name = item.columnOption
                })
                this.pickerType = columnValue
                this.select.title = columnName
                this.select.isGetIndex = false
                this.select.indexList = null
                this.select.value = value
                this.columns = optionsVOList
            } else {
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
                    case 'cropscale':  // 企业规模
                        this.select.title = '企业规模'
                        this.select.isGetIndex = false
                        this.select.indexList = null
                        this.select.value = this.form.cropscale
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
                case 'cropscale':  // 企业规模
                    this.form.cropscale = val[0].name
                    this.form.corpScale = val[0].value
                    break;
                case 'industry':  // 行业领域
                    this.form.industryName = name.join('/')
                    this.form.industry = val
                    this.form.cropSubIndustry = val.join(',')
                    break;
                default:
                    // 自定义信息
                    this.customColumns.forEach(item => {
                        if (item.columnValue == type) {
                            item.value = val[0].name
                        }
                    })
                    break;
            }
        },
        // 表单验证
        checkForm() {
            const { customerCalled, source, stage, customerType, cropFullName, cropscale, industry, address, name, phone } = this.form

            let arrObj = { customerCalled, source, stage, customerType, cropFullName, cropscale, industry, address, name, phone }
            
            for (let i in arrObj) {
                if (!arrObj[i] || arrObj[i] && !arrObj[i].length) {
                    this[i + 'Required'] = true
                    return false
                }
            }

            return true
        },
        // 提示红字点击后聚焦input或打开选择框
        showInput(type) {
            this.initRequired(type)
            switch (type) {
                case 'customerCalled':  // 客户名称
                    this.$nextTick(() => {
                        this.$refs.customerCalled.focus()
                    })
                    break;
                case 'cropFullName':  // 企业名称
                    this.$nextTick(() => {
                        this.$refs.cropFullName.focus()
                    })
                    break;
                case 'name':  // 联系人
                    this.$nextTick(() => {
                        this.$refs.name.focus()
                    })
                    break;
                case 'phone':  // 手机号码
                    this.$nextTick(() => {
                        this.$refs.phone.focus()
                    })
                    break;
                case 'address':  // 地址
                    this.openDialog(type)
                    break;
                case 'customerType':  // 客户类型
                case 'stage':  // 客户阶段
                case 'source':  // 客户来源
                case 'cropscale': // 企业规模
                case 'industry': // 行业领域
                    this.openSelectDialog(type)
                    break;
                default:
                    break;
            }
        },
        // 取消红字提示
        initRequired(type) {
            this[type + 'Required'] = false
        },
        // 获取最终自定义信息
        getCorpCustomColumn() {
            let obj = {}

            this.customColumns.map(item => {
                obj[item.columnValue] = item.value
            })

            return JSON.stringify(obj)
        },
        // 表单提交
        async doSubmit() {
            if(!this.checkForm()) {
                return
            }

            if(!throttle()) {
                return
            }

            let params = {
                ...this.form,
                type: this.fromType,
                clueCustomerNo: this.clueCustomerNo,
                corpCustomColumn: this.getCorpCustomColumn()
            }

            let { result, msg } = await cluecustomer_cluetocustomer(params)

            if (result) {
                this.$toast("转换成功")
                setTimeout(() => {
                    this.$router.push('/customerManage/clues')
                }, 500)
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
.turn-customer {
    min-height: 100vh;
    padding: 88px 32px 0;
    background-color: @white;
    .customer-title {
        position: fixed;
        top: 0;
    }
    .form-box{
        width: 100%;
        position: relative;
        &:first-child {
            padding-top: 88px;
        }
        &::after {
            content: '';
            height: 2px;
            background-color: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
        }
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
                .tips {
                    color: @red;
                }
            }
        }
        .title {
            padding: 32px 0 0;
            color: @total;
            font-size: 24px;
        }
    }
}
</style>