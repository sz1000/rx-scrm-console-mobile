<template>
    <div class="turn-customer">
        <template v-if="!showNameSearch">
            <header-title class="customer-title" :title="headerText" :needBackText="false" :needLine="true" btnText="确定" @doSubmit="doSubmit"></header-title>
            <!-- 头像昵称等信息 -->
            <div class="avatar_box">
                <img class="avatar" :src="form.avatar | $setAvatar" alt="">
                <div class="val">
                    <span class="name_msg" :class="{'show':showMsg}">{{form.name}}</span>
                    <div class="name" @click="showMsg = !showMsg">{{form.name}}</div>
                    <div class="alt" :class="{'green':form.externalType == 1}">{{typeNameFun(form.externalType)}}</div>
                    <img class="gender" :src="gender" alt="">
                </div>
            </div>
            <!-- 个人/企业标签编辑 -->
            <label-edit-box :clueCustomerNo="clueCustomerNo"></label-edit-box>
            <!-- 基本信息 -->
            <div class="form-box">
                <div class="item title">基本信息</div>
                <div class="item">
                    <div class="label">
                        <span>{{ fromType == 1 || fromType == 2 ? '线索名称' : '客户名称' }}</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val">
                        <!-- 非微信好友修改名称需进入名称搜索页 -->
                        <span v-if="form.isWcCus != 1" @click="goNameSearch">{{ form.customerCalled }}</span>
                        <!-- 微信好友可直接修改名称 -->
                        <template v-else>
                            <input v-show="!customerCalledRequired" type="text" ref="customerCalled" class="input" v-model.trim="form.customerCalled" maxlength="30" placeholder="请输入">
                            <span v-show="customerCalledRequired" class="input tips" @click="showInput('customerCalled')">未输入</span>
                        </template>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>{{ fromType == 1 || fromType == 2 ? '线索来源' : '客户来源' }}</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val">
                        <div class="icon-select" @click="sourceRequired && showInput('source') || !sourceRequired && openSelectDialog('source')">
                            <span :class="{'placeholder': !form.sourceName, tips: sourceRequired}">{{sourceRequired ? '未选择' : form.sourceName | $textEmpty('请选择')}}</span>
                            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                        </div>
                    </div>
                </div>
                <template v-if="fromType == 3 || fromType == 4">
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
                </template>
                <div v-if="fromType == 1 || fromType == 2" class="item">
                    <div class="label">
                        <span>线索类型</span>
                        <span class="require">*</span>
                    </div>
                    <div class="val">
                        <div class="icon-select" @click="clueTypeRequired && showInput('clueType') || !clueTypeRequired && openSelectDialog('clueType')">
                            <span :class="{'placeholder':!form.clueTypeName, tips: clueTypeRequired}">{{clueTypeRequired ? '未选择' : form.clueTypeName | $textEmpty('请选择')}}</span>
                            <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>{{ fromType == 1 || fromType == 2 ? '创建时间' : '建档时间' }}</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
            </div>
            <!-- 企业信息 -->
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
                        <span class="block-span one-line" :class="{'placeholder':!form.address, tips: addressRequired}">{{addressRequired ? '未输入' : form.address | $textEmpty('请输入（不得超过200个字符）')}}</span>
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
            <!-- 联系人信息 -->
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
            <!-- 自定义信息 -->
            <div v-if="customColumns && customColumns.length" class="form-box">
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
            <!-- 详细信息 -->
            <div class="form-box">
                <div class="item title">详细信息</div>
                <div class="item">
                    <div class="label">
                        <span>添加人员</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createBy }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>添加时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>前负责人</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.beBelongBy }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>最后跟进时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.followTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>转客户时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.turnTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
                <div v-if="fromType == 2 || fromType == 4" class="item">
                    <div class="label">
                        <span>回归公海时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.recycleTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
            </div>
            <!-- 线索信息（由线索转换过来的客户才有此信息） -->
            <div v-if="(fromType == 3 || fromType == 4) && (form.sourceStatus == 1 || form.sourceStatus == 2)" class="form-box">
                <div class="item title">线索信息</div>
                <div class="item">
                    <div class="label">
                        <span>线索名称</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.customerCalled }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>线索来源</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.sourceName }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>线索类型</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.clueTypeName }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>创建时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
            </div>
            <!-- 企微好友信息 -->
            <div class="form-box">
                <div class="item title">企微好友信息</div>
                <div class="item">
                    <div class="label">
                        <span>头像</span>
                    </div>
                    <div class="val">
                        <div class="echo-img">
                            <img :src="form.avatar | $setAvatar" alt="">
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>性别</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.externalGender | $gender }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>职务</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.externalPosition }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>邮箱</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.email }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>添加人员</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createBy }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">
                        <span>添加时间</span>
                    </div>
                    <div class="val">
                        <span class="echo-text">{{ form.createTime | $time('YYYY-MM-DD') }}</span>
                    </div>
                </div>
            </div>
        </template>
        <!-- 名称搜索页 -->
        <name-search v-else ref="nameSearch" :fromType="1" @handleResult="getResult"></name-search>

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
import LabelEditBox from '@/components/CustomerManage/labelEditBox'
import NameSearch from '@/components/CustomerManage/nameSearch'
import { cluecustomer_toupdate, cluecustomer_update } from '@/api/customer'
import { SelectDialog, InputDialog } from '../customer/components'
import { throttle, formatDate } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            fromType: this.$route.query.fromType,  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            clueCustomerNo: this.$route.query.clueCustomerNo,

            showMsg: false,

            selectDatePopupShow: false,
            timeType: '',
            minDate: new Date(2011, 0, 1),

            genderPopupShow: false,

            dialog_address: false,
            dialogTitle: '',
            dialogType: '',
            dialogText: '',
            openType: '',

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
                createTime: '', // 建档时间（入参: yyyy-MM-dd hh:mm:ss）

                customerCalled: '', // 客户名称
                source: '', // 客户来源(val)
                sourceName: '', // 客户来源(name)
                sourceStatus: null, // 来源标识(1：手动由线索转换而来，2：自动由线索转换为客户，3：微信同步，4：文件导入，5：手动创建客户)
                customerType: '', // 客户类型(val)
                customerTypeName: '', // 客户类型(name)
                clueType: '', // 线索类型(val)
                clueTypeName: '', // 线索类型(name)
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
            clueTypeOptions: [], // 线索类型选择列表
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
            clueTypeRequired: false, // 线索类型

            showNameSearch: false, // 是否显示名称搜索页
        }
    },
    computed: {
        ...mapState(["corpId"]),
        headerText() {
            if (this.fromType == 1 || this.fromType == 2) {
                return '线索详情'
            } else if (this.fromType == 3 || this.fromType == 4) {
                return '客户详情'
            }
            return '客户详情'
        },
        gender(){
            let val = this.form.gender, obj = {
                1: require('@/images/man.png'),
                2: require('@/images/icon_female@2x.png'),
            }
            return val ? obj[val] : ''
        },
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
                        } else if (item.type == 'clue_type') {
                            // 线索类型
                            this.clueTypeOptions.push(item)
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
                let arr = this.form.cropSubIndustry.split(','), i = 0, j = 0

                this.industryFieldOptions.forEach((el,index) => {
                    if(el.id == arr[0]) {
                        i = index
                    }
                    el.children.forEach((son,s) => {
                        if(son.id == arr[1]){
                            j = s
                        }
                    })
                })
                this.form.industry = [i,j]
                this.form.industryName = this.industryFieldOptions[i].name + '/' + this.industryFieldOptions[i].children[j].name
            } else {
                this.form.industry = []
                this.form.industryName = ''
            }
            // 性别
            this.genderOptions.map(item => {
                if (item.value == this.form.gender) {
                    this.form.genderName = item.name
                }
            })
            // 自定义信息
            let obj = this.form.corpCustomColumnMap

            if (obj) {
                for (let i in obj) {
                    this.customColumns.forEach(item => {
                        if (item.columnValue == i) {
                            item.value = obj[i]
                        }
                    })
                }
            }
        },
        typeNameFun(val){
            return val ? val == 1 ? '@微信' : `@${this.detail.customerName}` : ''
        },
        goBack() {
            this.$router.go(-1)
        },
        // 打开名称搜索页面
        goNameSearch() {
            this.showNameSearch = true
            this.$nextTick(() => {
                this.$refs.nameSearch.show(this.form.customerCalled)
            })
        },
        getResult() {
            this.showNameSearch = false
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
            switch (type) {
                case 'address':
                    this.dialogTitle = '办公地址'
                    this.dialogType = 'input'
                    this.dialogText = this.form.address
                    break;
                case 'remark':
                    this.dialogTitle = '备注'
                    this.dialogType = 'textarea'
                    this.dialogText = this.form.remark
                    break;
                default:
                    break;
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
                    case 'clueType':  // 线索类型
                        this.select.title = '线索类型'
                        this.select.isGetIndex = false
                        this.select.indexList = null
                        this.select.value = this.form.clueTypeName
                        this.columns = this.clueTypeOptions
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
                case 'clueType':  // 线索类型
                    this.form.clueTypeName = val[0].name
                    this.form.clueType = val[0].value
                    break;
                case 'cropscale':  // 企业规模
                    this.form.cropscale = val[0].name
                    this.form.corpScale = val[0].id
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
            const { customerCalled, source, stage, customerType, clueType, cropFullName, cropscale, industry, address, name, phone } = this.form

            let arrObj = this.fromType == 1 || this.fromType == 2 ? { customerCalled, source, clueType, cropFullName, cropscale, industry, address, name, phone } : { customerCalled, source, stage, customerType, cropFullName, cropscale, industry, address, name, phone }
            
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
                case 'clueType':  // 线索类型
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
                clueCustomerNo: this.clueCustomerNo,
                corpCustomColumn: this.getCorpCustomColumn()
            }

            let { result, msg } = await cluecustomer_update(params)

            if (result) {
                this.$toast("更新成功")
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
        LabelEditBox,
        SelectDialog,
        InputDialog,
        NameSearch
    }
}
</script>
<style lang="less" scoped>
@import url('@/styles/color');
.turn-customer {
    width: 100%;
    min-height: 100vh;
    padding: 88px 0 0;
    background-color: @white;
    overflow-x: hidden;
    .customer-title {
        position: fixed;
        top: 0;
    }
    .avatar_box{
        display: flex;
        align-items: center;
        padding: 32px;
        position: relative;
        &::after{
            content: '';
            height: 2px;
            background-color: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
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
    .form-box{
        width: 100%;
        padding: 0 32px;
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
                .echo-text {
                    width: 100%;
                    color: @fontSub1;
                }
                .echo-img {
                    width: 100%;
                    height: 64px;
                    img {
                        float: right;
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                    }
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