<template>
    <div class="screen">
        <header-title title="筛选" :needBackText="false" :needLine="true"></header-title>
        
        <ul class="screen-form">
            <li class="screen-item">
                <h3 class="label">建档时间</h3>
                <div class="content">
                    <span class="time pointer start" :class="{'placeholder': !form.createTimeStaShow}">
                        <p class="text one-line" @click="showDateSelect(1)">{{ form.createTimeStaShow && formatDate(form.createTimeStaShow, "yyyy-MM-dd") | $textEmpty('开始时间')}}</p>
                        <p v-if="form.createTimeStaShow" class="icon remove" @click="removeText('createTimeStaShow')"></p>
                    </span>
                    <span class="divider"></span>
                    <span class="time pointer end" :class="{'placeholder': !form.createTimeEndShow}">
                        <p class="text one-line" @click="showDateSelect(2)">{{ form.createTimeEndShow && formatDate(form.createTimeEndShow, "yyyy-MM-dd") | $textEmpty('结束时间')}}</p>
                        <p v-if="form.createTimeEndShow" class="icon remove" @click="removeText('createTimeEndShow')"></p>
                    </span>
                </div>
            </li>
            <li class="screen-item tag-item">
                <h3 class="label">客户来源</h3>
                <div class="content">
                    <span v-for="i in sourceOptions" :key="i.id" class="tag pointer one-line" :class="{checked: i.value == form.source}" @click="choose('source', i)">{{ i.name }}</span>
                </div>
            </li>
            <li class="screen-item tag-item">
                <h3 class="label">客户阶段</h3>
                <div class="content">
                    <span v-for="i in customerStageOptions" :key="i.id" class="tag pointer one-line" :class="{checked: i.name == form.customerStage}" @click="choose('customerStage', i)">{{ i.name }}</span>
                </div>
            </li>
            <li class="screen-item tag-item">
                <h3 class="label">客户类型</h3>
                <div class="content">
                    <span v-for="i in customerTypeOptions" :key="i.id" class="tag pointer one-line" :class="{checked: i.value == form.customerType}" @click="choose('customerType', i)">{{ i.name }}</span>
                </div>
            </li>
            <template v-if="navActive == 'myCustomer'">
                <li class="screen-item tag-item">
                    <h3 class="label">负责类型</h3>
                    <div class="content">
                        <span v-for="i in followRoleOptions" :key="i.value" class="tag pointer one-line" :class="{checked: i.value == form.followRole}" @click="choose('followRole', i)">{{ i.name }}</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">协助人</h3>
                    <div class="content">
                        <span class="select pointer" :class="{'placeholder': !form.chargeUserName}">
                            <p class="text one-line" @click="openSelectDialog('chargeUserNo')">{{form.chargeUserName | $textEmpty('负责人')}}</p>
                            <p class="icon" :class="{arrow: !form.chargeUserName, remove: form.chargeUserName}" @click="removeText('chargeUserNo')"></p>
                        </span>
                        <span class="select pointer" :class="{'placeholder': !form.collaborativeUserName}">
                            <p class="text one-line" @click="openSelectDialog('collaborativeUserNo')">{{form.collaborativeUserName | $textEmpty('协助人')}}</p>
                            <p class="icon" :class="{arrow: !form.collaborativeUserName, remove: form.collaborativeUserName}" @click="removeText('collaborativeUserNo')"></p>
                        </span>
                    </div>
                </li>
                <li class="screen-item tag-item">
                    <h3 class="label">商机阶段</h3>
                    <div class="content">
                        <span v-for="i in stageOptions" :key="i.sortNo" class="tag pointer one-line" :class="{checked: form.stageNum && form.stageNum.indexOf(i.sortNo) > -1}" @click="choose('stageNum', i)">{{ i.name }}</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">微信来源</h3>
                    <div class="content">
                        <span class="select pointer" :class="{'placeholder': !form.externalSourceName}">
                            <p class="text one-line" @click="openSelectDialog('externalSource')">{{form.externalSourceName | $textEmpty('请选择')}}</p>
                            <p class="icon" :class="{arrow: !form.externalSourceName, remove: form.externalSourceName}" @click="removeText('externalSource')"></p>
                        </span>
                    </div>
                </li>
            </template>
            <li class="screen-item tag-item">
                <h3 class="label">好友关系</h3>
                <div class="content">
                    <span class="tag pointer one-line" :class="{checked: form.isWcCus == 1}" @click="choose('isWcCus')">加微客户</span>
                </div>
            </li>
        </ul>

        <ul class="btn-box">
            <li class="btn-item pointer" @click="initForm">重置</li>
            <li class="btn-item pointer confirm" @click="goBack(1)">确认</li>
        </ul>

        <!-- 时间选择弹窗（日历） -->
        <van-calendar v-model="selectDatePopupShow" :min-date="minDate" :show-confirm="false" color="#4168F6" @confirm="dateConfirm"/>
        
        <!-- 选择弹窗列表 -->
        <select-dialog :data="columns" :keys="select.key" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></select-dialog>
    </div>
</template>
<script>
import { opportunitiesList, getlistFiled } from '@/api/customer'
import { sop_employeeList } from '@/api/sop'
import HeaderTitle from '../../components/MaterialTemplate/headerTitle'
import SelectDialog from '@/views/customer/components/selectDialog'

import { mapState } from 'vuex'

import { formatDate } from '@/utils/tool'

export default {
    name: 'search',
    props: {
        navActive: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            form: {
                createTimeStaShow: null, // 建档时间（yyyy-MM-dd）
                createTimeEndShow: null, // 建档时间（yyyy-MM-dd）
                createTimeSta: '', // 建档时间（入参: yyyy-MM-dd hh:mm:ss）
                createTimeEnd: '', // 建档时间（入参: yyyy-MM-dd hh:mm:ss）
                source: '', //客户来源
                customerStage: '', //客户阶段
                customerType: '', //客户类型
                followRole: '', // 负责类型：1: 我负责的 2: 我协助的
                chargeUserNo: '', // 负责人
                chargeUserName: '', // 负责人
                collaborativeUserNo: '', // 协助人
                collaborativeUserName: '', // 协助人
                stageNum: [], // 选中的商机阶段（多选）
                businessOpportunitiesStageNos: [], // 商机阶段1
                businessOpportunitiesStageStatus: [], // 商机阶段2
                externalSource: '', // 微信来源
                externalSourceName: '', // 微信来源
                isWcCus: '', // 仅查看微信 0: 不选中 1: 选中
            },
            customerTypeOptions: [], // 客户类型选择列表
            stageOptions: [], // 商机阶段选择列表
            customerStageOptions: [], // 客户阶段选择列表
            sourceOptions: [], // 客户来源选择列表
            externalSourceOptions: [], // 微信来源选择列表
            followRoleOptions: [
                { name: '我负责的', value: '1' },
                { name: '我协助的', value: '2' },
            ], // 负责类型选择列表
            userOptions: [], // 负责人，协助人选择列表

            selectDatePopupShow: false,
            selectDateType: 0,
            minDate: new Date(2011, 0, 1),

            dialog: false,
            columns: [],
            pickerType: '',
            select: {
                key: 'name',
                title: '客户来源',
                isGetIndex: false
            },
            isReset: false, // 是否点击过重置
            hasOldForm: false, // 是否需要回显
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
        show(data) {
            if (data && !this.isEmpty(data)) {
                this.hasOldForm = true
                this.form = data
                return
            }
            this.hasOldForm = false
        },
        isEmpty(form) {
            let formArr = []

            for (let i in form) {
                formArr.push(form[i])
            }

            return formArr.every(item => { return !item || item && !item.length })
        },
        // 重置数据
        initForm() {
            this.isReset = true
            this.hasOldForm = false
            Object.assign(this.$data.form, this.$options.data().form)
        },
        // 获取下拉列表数据
        init() {
            this.getlistFiled()
            this.opportunitiesList()
            this.employeeList()
        },
        // 获取商机阶段选择列表
        opportunitiesList() {
            opportunitiesList({ corpId: this.corpId }).then(res => {
                let { code, data } = res

                if (code == 'success') {
                    this.stageOptions = data
                }
            })
        },
        // 获取各个选择列表
        getlistFiled() {
            getlistFiled({ corpId: this.corpId }).then(res => {
                let { code, data } = res

                if (code == 'success') {
                    data.forEach((item) => {
                        if (item.type == 'stage') {
                            // 客户阶段
                            this.customerStageOptions.push(item)
                        } else if (item.type == 'source') {
                            // 客户来源
                            this.sourceOptions.push(item)
                        } else if (item.type == 'external_source') {
                            // 微信来源
                            this.externalSourceOptions.push(item)
                        } else if (item.type == 'customer_type') {
                            // 客户类型
                            this.customerTypeOptions.push(item)
                        }
                    })
                }
            })
        },
        // 获取员工选择列表
        employeeList() {
            sop_employeeList().then(res => {
                let { code, data } = res

                if (code == 'success') {
                    this.userOptions = data
                }
            })
        },
        // 打开日期选择弹窗
        showDateSelect(type) {
            this.selectDateType = type
            this.selectDatePopupShow = true
        },
        // 选中建档时间
        dateConfirm(date) {
            let type = this.selectDateType

            if (!this.checkStartEndTime(type, date)) {
                this.$toast("开始时间不能大于结束时间")
                return
            }
            if (type == 1) {
                this.form.createTimeStaShow = date
                this.form.createTimeSta = formatDate(date, "yyyy-MM-dd hh:mm:ss")
            } else if (type == 2) {
                this.form.createTimeEndShow = date
                this.form.createTimeEnd = `${formatDate(date, "yyyy-MM-dd")} 23:59:59`
            }
            this.selectDatePopupShow = false
        },
        // 开始时间不能大于结束时间
        checkStartEndTime(type, date) {
            let dateNum = date.getTime()

            if (this.form.createTimeEndShow || this.form.createTimeStaShow) {
                let timeNum = type == 1 ? new Date(this.form.createTimeEndShow).getTime() : new Date(this.form.createTimeStaShow).getTime()

                if (timeNum > 0 && (type == 1 && dateNum > timeNum || type == 2 && dateNum < timeNum)) {
                    return false
                }
            }

            return true
        },
        // 各个标签选项选择
        choose(type, item) {
            switch (type) {
                case 'source':  // 客户来源
                    if (this.form.source == item.value) {
                        this.form.source = ''
                        return
                    }
                    this.form.source = item.value
                    break;
                case 'customerStage':  // 客户阶段
                    if (this.form.customerStage == item.name) {
                        this.form.customerStage = ''
                        return
                    }
                    this.form.customerStage = item.name
                    break;
                case 'customerType':  // 客户类型
                    if (this.form.customerType == item.value) {
                        this.form.customerType = ''
                        return
                    }
                    this.form.customerType = item.value
                    break;
                case 'followRole':  // 负责类型
                    if (this.form.followRole == item.value) {
                        this.form.followRole = ''
                        return
                    }
                    this.form.followRole = item.value
                    break;
                case 'stageNum':  // 商机阶段（多选）                    
                    if (!this.form.stageNum) {
                        this.form.stageNum = []
                    }
                    let index = this.form.stageNum && this.form.stageNum.indexOf(item.sortNo)

                    if (index > -1) {
                        this.form.stageNum.splice(index, 1)
                        return
                    }
                    this.form.stageNum.push(item.sortNo)
                    break;
                case 'isWcCus':  // 好友关系
                    if (this.form.isWcCus == 1) {
                        this.form.isWcCus = 0
                        return
                    }
                    this.form.isWcCus = 1
                    break;
                default:
                    break;
            }
        },
        // 打开选择弹窗
        openSelectDialog(type) {
            this.pickerType = type
            switch (type) {
                case 'chargeUserNo':  // 负责人
                    this.select.title = '负责人'
                    this.select.isGetIndex = false
                    this.select.key = 'userName'
                    this.columns = this.userOptions
                    break;
                case 'collaborativeUserNo':  // 协助人
                    this.select.title = '协助人'
                    this.select.isGetIndex = false
                    this.select.key = 'userName'
                    this.columns = this.userOptions
                    break;
                case 'externalSource':  // 微信来源
                    this.select.title = '微信来源'
                    this.select.isGetIndex = false
                    this.select.key = 'name'
                    this.columns = this.externalSourceOptions
                    break;
                default:
                    break;
            }
            this.dialog = true
        },
        // 选择弹窗列表选中确认
        selectedFun(val) {
            switch (this.pickerType) {
                case 'chargeUserNo':  // 负责人
                    this.form.chargeUserName = val[0].userName
                    this.form.chargeUserNo = val[0].userNo
                    break;
                case 'collaborativeUserNo':  // 协助人
                    this.form.collaborativeUserName = val[0].userName
                    this.form.collaborativeUserNo = val[0].userNo
                    break;
                case 'externalSource':  // 微信来源
                    this.form.externalSourceName = val[0].name
                    this.form.externalSource = val[0].value
                    break;
                default:
                    break;
            }
        },
        // 清楚选中数据
        removeText(type) {
            switch (type) {
                case 'createTimeStaShow':  // 建档开始时间
                    this.form.createTimeStaShow = null
                    this.form.createTimeSta = ''
                    break;
                case 'createTimeEndShow':  // 建档结束时间
                    this.form.createTimeEndShow = null
                    this.form.createTimeEnd = ''
                    break;
                case 'chargeUserNo':  // 负责人
                    this.form.chargeUserName = ''
                    this.form.chargeUserNo = ''
                    break;
                case 'collaborativeUserNo':  // 协助人
                    this.form.collaborativeUserName = ''
                    this.form.collaborativeUserNo = ''
                    break;
                case 'externalSource':  // 微信来源
                    this.form.externalSourceName = ''
                    this.form.externalSource = ''
                    break;
                default:
                    break;
            }
        },
        goBack(ifConfirm) {
            let optNum = ifConfirm, params = {}

            if (optNum != 1 || !optNum) {
                if (this.isReset) {
                    optNum = 2 // 点击过重置
                    this.isReset = false
                }
                if (!this.hasOldForm) {
                    this.initForm()
                }
            }
            params = this.form
            this.$emit('hideScreen', { optNum, params})
        },
        formatDate
    },
    components: {
        HeaderTitle,
        SelectDialog
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.screen {
    .screen-form {
        padding: 32px 0 144px;
        .screen-item {
            padding: 0 32px;
            margin-bottom: 60px;
            .label {
                margin-bottom: 24px;
                color: @fontSub3;
                font-size: 32px;
            }
            .content {
                span {
                    display: inline-block;
                    vertical-align: middle;
                    background-color: @navBg;
                    border-radius: 32px;
                    text-align: center;
                    color: @fontSub3;
                    font-size: 24px;
                    &:not(.divider) {
                        padding: 16px;
                    }
                }
                .time {
                    width: 320px;
                    position: relative;
                }
                .placeholder{
                    color: @total;
                }
                .divider {
                    width: 22px;
                    height: 2px;
                    margin: 0 12px;
                }
                .select {
                    width: 328px;
                    position: relative;
                    &:not(:first-child) {
                        margin-left: 30px;
                    }
                    .text {
                        padding-right: 24px;
                    }
                    .arrow {
                        width: 0;
                        height: 0;
                        border-bottom: 11px solid #ccc;
                        border-right: 11px solid transparent;
                        border-left: 11px solid transparent;
                    }
                }
                .icon {
                    display: inline-block;
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%) rotate(90deg);
                }
                .remove {
                    width: 24px;
                    height: 24px;
                    &::before, &::after {
                        content: '';
                        border-radius: 50%;
                        background-color: #ccc;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                    &::before {
                        width: 24px;
                        height: 4px;
                    }
                    &::after {
                        width: 4px;
                        height: 24px;
                    }
                }
                .tag {
                    width: 210px;
                    border: 2px solid @navBg;
                    margin: 0 12px 24px;
                    word-break: break-all;
                    &.checked {
                        background: rgba(65, 104, 246, 0.06);
                        border-color: @main;
                        color: @main;
                    }
                }
            }
        }
        .tag-item {
            padding: 0;
            margin-bottom: 36px;
            .label {
                padding: 0 32px;
            }
            .content {
                padding: 0 20px;
            }
        }
    }
    .btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10rem;
        height: 144px;
        background-color: @white;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        .btn-item {
            width: 330px;
            height: 96px;
            line-height: 96px;
            margin: 0 12px;
            background-color: @white;
            border: 2px solid @lineColor;
            border-radius: 8px;
            color: @fontSub1;
            font-size: 32px;
            text-align: center;
        }
        .confirm {
            background-color: @main;
            border-color: @main;
            color: @white;
        }
    }
}
</style>