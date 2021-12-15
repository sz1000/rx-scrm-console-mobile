<template>
    <div class="screen">
        <header-title title="筛选" :needBackText="false" :needLine="true"></header-title>
        
        <ul class="screen-form">
            <li class="screen-item">
                <h3 class="label">建档时间</h3>
                <div class="content">
                    <span class="time start" :class="{'placeholder': !form.createTimeSta}">{{form.createTimeSta | $textEmpty('开始时间')}}</span>
                    <span class="divider"></span>
                    <span class="time end" :class="{'placeholder': !form.createTimeEnd}">{{form.createTimeEnd | $textEmpty('结束时间')}}</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户来源</h3>
                <div class="content">
                    <span class="tag">陌拜</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户阶段</h3>
                <div class="content">
                    <span v-for="i in customerStageOptions" :key="i.id" class="tag">{{ i.name }}</span>
                </div>
            </li>
            <li class="screen-item">
                <h3 class="label">客户类型</h3>
                <div class="content">
                    <span v-if="!customerTypeOptions.length"></span>
                    <span v-else v-for="i in customerTypeOptions" :key="i.id" class="tag">{{ i.name }}</span>
                </div>
            </li>
            <template v-if="navActive == 'myCustomer'">
                <li class="screen-item">
                    <h3 class="label">负责类型</h3>
                    <div class="content">
                        <span class="tag">我负责的</span>
                        <span class="tag">我协助的</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">协助人</h3>
                    <div class="content">
                        <span class="select" :class="{'placeholder': !form.chargeUserNo}" @click="openSelectDialog('chargeUserNo')">{{form.chargeUserNo | $textEmpty('负责人')}}</span>
                        <span class="select" :class="{'placeholder': !form.collaborativeUserNo}" @click="openSelectDialog('collaborativeUserNo')">{{form.collaborativeUserNo | $textEmpty('协助人')}}</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">商机阶段</h3>
                    <div class="content">
                        <span v-for="i in stageOptions" :key="i.sortNo" class="tag">{{ i.name }}</span>
                    </div>
                </li>
                <li class="screen-item">
                    <h3 class="label">微信来源</h3>
                    <div class="content">
                        <span class="select" :class="{'placeholder': !form.externalSource}" @click="openSelectDialog('externalSource')">{{form.externalSource | $textEmpty('请选择')}}</span>
                    </div>
                </li>
            </template>
            <li class="screen-item">
                <h3 class="label">好友关系</h3>
                <div class="content">
                    <span class="tag">加微客户</span>
                </div>
            </li>
        </ul>
        
        <!-- 选择弹窗列表 -->
        <select-dialog :data="columns" :keys="select.key" :isGetIndex="select.isGetIndex" :title="select.title" v-model="dialog" @confirm="selectedFun"></select-dialog>
    </div>
</template>
<script>
import { opportunitiesList, getlistFiled } from '@/api/customer'
import HeaderTitle from '../../components/MaterialTemplate/headerTitle'
import SelectDialog from '@/views/customer/components/selectDialog'

import { mapState } from 'vuex'

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
                createTimeSta: '', // 建档时间
                createTimeEnd: '', // 建档时间
                chargeUserNo: '', // 负责人
                collaborativeUserNo: '', // 协助人
                externalSource: null, // 微信来源
            },
            customerTypeOptions: [], // 客户类型选择列表
            stageOptions: [], // 商机阶段选择列表
            customerStageOptions: [], // 客户阶段选择列表
            sourceOptions: [], // 客户来源选择列表
            externalSourceOptions: [], // 微信来源选择列表

            dialog: false,
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
        }
    },
    computed: {
        ...mapState(["corpId"]),
    },
    // inject: ['checkTable'],
    created() {
        this.init()
    },
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        // 获取下拉列表数据
        init() {
            this.opportunitiesList()
            this.getlistFiled()
        },
        opportunitiesList() {
            opportunitiesList({ corpId: this.corpId }).then(res => {
                let { code, data } = res

                if (code == 'success') {
                    this.stageOptions = data
                }
            })
        },
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
        // 打开选择弹窗
        openSelectDialog(type) {
            this.pickerType = type
            switch (type) {
                case 'chargeUserNo':  // 负责人
                    this.select.title = '负责人'
                    this.select.isGetIndex = false
                    this.columns = this.customerList
                    break;
                case 'collaborativeUserNo':  // 协助人
                    this.select.title = '协助人'
                    this.select.isGetIndex = false
                    this.columns = this.customerTypeList
                    break;
                case 'externalSource':  // 微信来源
                    this.select.title = '微信来源'
                    this.select.isGetIndex = false
                    this.columns = this.externalSourceOptions
                    break;
                default:
                    break;
            }
            this.dialog = true
        },
        // 选择弹窗列表选中确认
        selectedFun(val) {
            let type = this.pickerType

            switch (type) {
                case 'chargeUserNo':  // 负责人
                    console.log('负责人', val[0].name)
                    // this.form.sourceName = val[0].name
                    // this.form.chargeUserNo = val[0].type
                    break;
                case 'collaborativeUserNo':  // 协助人
                    console.log('协助人', val)
                    // this.form.customerTypeName = val[0].name
                    // this.form.collaborativeUserNo = val[0].code
                    break;
                case 'externalSource':  // 微信来源
                    console.log('微信来源', val)
                    // this.form.corpScaleName = val[0].name
                    // this.form.externalSource = val[0].id
                    break;
                default:
                    break;
            }
        },
        goBack() {
            let params = {}

            this.$emit('hideScreen', params)
        },
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
        padding: 32px;
        .screen-item {
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
                        min-width: 214px;
                        padding: 16px 0;
                    }
                }
                .time {
                    width: 320px;
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
                    &:not(:first-child) {
                        margin-left: 30px;
                    }
                }
                .tag {
                    margin-bottom: 24px;
                    &:not(:first-child) {
                        margin-left: 24px;
                    }
                }
            }
        }
    }
}
</style>