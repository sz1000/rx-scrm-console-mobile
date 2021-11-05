<template>
    <div class="edit-opportunity">
        <van-popup
            v-model="visible"
            round
            position="bottom"
            class="edit-opportunity-form"
            :close-on-click-overlay="false"
            closeable
            @closed="hide">
            <div class="title">{{ title }}</div>
            <div class="edit-content">
                <div class="item one-line">
                    <p class="label">
                        <span class="icon">*</span>
                        <span>商机名称:</span>
                    </p>
                    <van-field v-model="form.name" clearable class="edit-field" :maxlength="30" placeholder="请输入"/>
                </div>
                <div class="item one-line">
                    <p class="label">
                        <span>商机金额:</span>
                    </p>
                    <van-stepper v-model="form.price" class="edit-field" :show-plus="false" :show-minus="false" :input-width="'100%'" :button-size="'100%'" :allow-empty="true" placeholder="请输入" :min="0" :max="99999999999999999999" :decimal-length="2" :default-value="0" />
                </div>
                <div class="item one-line">
                    <p class="label">
                        <span>预计成交时间:</span>
                    </p>
                    <van-field v-model="expectTimeShowText" class="edit-field" placeholder="请选择预计成交时间" :readonly="true" @click="selectDate(0)" />
                </div>
                <div class="item one-line">
                    <p class="label">
                        <span class="icon">*</span>
                        <span>跟进阶段:</span>
                    </p>
                    <van-field v-model="stageText" class="edit-field" placeholder="选择阶段" :readonly="true" @click="selectStage"/>
                </div>
                <div class="item one-line">
                    <p class="label">
                        <span class="icon">*</span>
                        <span>商机负责人:</span>
                    </p>
                    <van-field v-model="chargeUserName" class="edit-field" placeholder="选择员工" :readonly="true" @click="selectCharger"/>
                </div>
                <div v-if="opportunityStatus == 1" class="item one-line">
                    <p class="label">
                        <span>成交时间:</span>
                    </p>
                    <van-field v-model="timeShowText" class="edit-field" placeholder="请选择成交时间" :readonly="true" @click="selectDate(1)" />
                </div>
                <div v-if="opportunityStatus == 2 || opportunityStatus == 3" class="item one-line">
                    <p class="label">
                        <span class="icon">*</span>
                        <span>结束时间:</span>
                    </p>
                    <van-field v-model="timeShowText" class="edit-field" placeholder="请选择结束时间" :readonly="true" @click="selectDate(2)"/>
                </div>
                <template v-if="opportunityStatus == 2">
                    <div class="item one-line">
                        <p class="label">
                            <span class="icon">*</span>
                            <span>输单原因:</span>
                        </p>
                        <van-field v-model="reasonText" clearable class="edit-field" placeholder="请输入" :readonly="true" @click="selectReason"/>
                    </div>
                    <div class="item one-line">
                        <p class="label">
                            <span>输单备注:</span>
                        </p>
                        <van-field v-model="form.endRemarks" class="edit-field area-field" rows="6" :border="true" autosize type="textarea" placeholder="请输入文字(不得超过200个字符)" maxlength="200" show-word-limit />
                    </div>
                </template>
                <template v-if="opportunityStatus == 3">
                    <div class="item one-line">
                        <p class="label">
                            <span class="icon">*</span>
                            <span>无效原因:</span>
                        </p>
                        <van-field v-model="reasonText" clearable class="edit-field" placeholder="请输入" :readonly="true" @click="selectReason"/>
                    </div>
                    <div class="item one-line">
                        <p class="label">
                            <span>无效备注:</span>
                        </p>
                        <van-field v-model="form.endRemarks" class="edit-field area-field" rows="6" :border="true" autosize type="textarea" placeholder="请输入文字(不得超过200个字符)" maxlength="200" show-word-limit />
                    </div>
                </template>
                <div class="item one-line">
                    <p class="label">
                        <span>备注:</span>
                    </p>
                    <van-field v-model="form.remarks" class="edit-field area-field" rows="6" :border="true" autosize type="textarea" placeholder="请输入文字(不得超过200个字符)" maxlength="200" show-word-limit />
                </div>
            </div>
            <div class="btn-wrap">
                <div class="item close-btn" @click="hide">取消</div>
                <div class="item submit-btn" @click="handleSubmit">确定</div>
            </div>
        </van-popup>

        <van-popup v-model="selectStagePopupShow" position="bottom" class="picker-pop">
            <van-picker
                ref="stagePicker"
                show-toolbar
                :columns="stageListOptions"
                value-key="stageName"
                @confirm="stageConfirm"
                @cancel="selectStagePopupShow = false"
            />
        </van-popup>
        <van-popup v-model="selectChargerPopupShow" position="bottom" class="picker-pop">
            <van-picker
                show-toolbar
                :columns="chargeUserInfoListOptions"
                value-key="name"
                @confirm="chargerConfirm"
                @cancel="selectChargerPopupShow = false"
            />
        </van-popup>
        <van-popup v-model="selectReasonPopupShow" position="bottom" class="picker-pop">
            <van-picker
                show-toolbar
                :columns="reasonOptions"
                value-key="content"
                @confirm="reasonConfirm"
                @cancel="selectReasonPopupShow = false"
            />
        </van-popup>
        <van-popup v-model="selectDatePopupShow" position="bottom" class="picker-pop">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="dateConfirm"
                @cancel="selectDatePopupShow = false"
            />
        </van-popup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { ChargeUserInfoList, UsersList, StageReasonList, AddOpportunities, ModifyOpportunities } from '../../../config/api'

import { formatDate } from '../../../utils/tool'

export default {
    props: {
        customerNo: {
            type: String,
            default: ''
        },
        fromType: {
            default: '3'
        }
    },
    data() {
        return {
            title: '新建商机',
            id: null,
            opportunityStatus: null,
            visible: false,
            form: {
                name: '',
                price: null,
                expectEndTime: null,
                stageNo: null,
                chargeUserNo: null,
                chargeUserName: '',
                remarks: '',
                endTime: null,
                endReasonId: null,
                endRemarks: ''
            },
            stageText: '',
            chargeUserName: '',
            expectTimeShowText: null,
            timeShowText: null,
            selectDateType: 0,
            currentDate: new Date(),
            reasonText: '',
            selectDatePopupShow: false,
            selectChargerPopupShow: false,
            selectStagePopupShow: false,
            selectReasonPopupShow: false,
            chargeUserInfoListOptions: [], // 商机表单中的负责人选项
            stageListOptions: [], // 商机表单中的阶段选项
            reasonOptions: []
        }
    },
    computed: {
        ...mapState(["corpId"])
    },
    inject: ['opportunitiesList', 'opportunitiesStageList'],
    methods: {
        show(formData) {
            this.initStatus(formData)
            this.chargeUserInfoList()
            this.visible = true
        },
        hide() {
            this.initForm()
            this.visible = false
        },
        initStatus(formData) {
            if (formData && formData.id) {
                this.id = formData.id
                this.title = '编辑商机'
                const { status } = formData
                
                this.opportunityStatus = status  //0：跟进中；1：成交；2：输单；3：无效
                this.form = JSON.parse(JSON.stringify(formData))
                this.getText()
                this.stageReasonList(this.form.sortId)
                this.opportunitiesStageList(this.getStageListOptions, '', '')
            } else {
                this.id = null
                this.title = '新建商机'
                this.opportunityStatus = -1 // 新建
                this.opportunitiesStageList(this.getStageListOptions, false, true)
            }
        },
        getStageListOptions(data) {
            this.stageListOptions = data
            this.getStageText()
        },
        getStageText() {
            this.stageListOptions.map(item => {
                if (item.sortNo == this.form.stageNo) {
                    this.stageText = item.stageName
                }
            })
        },
        getText() {
            this.chargeUserName = this.form.chargeUserName
            this.expectTimeShowText = this.form.expectEndTime && formatDate(this.form.expectEndTime, "yyyy-MM-dd") || null
            this.timeShowText = this.form.endTime && formatDate(this.form.endTime, "yyyy-MM-dd") || null
        },
        getReasonText() {
            this.reasonOptions.map(item => {
                if (item.id == this.form.endReasonId) {
                    this.reasonText = item.content
                }
            })
        },
        initForm() {
            this.form = {
                name: '',
                price: null,
                expectEndTime: null,
                stageNo: null,
                chargeUserNo: null,
                chargeUserName: '',
                remarks: '',
                endTime: null,
                endReasonId: null,
                endRemarks: ''
            }
            this.stageText = ''
            this.chargeUserName = ''
            this.expectTimeShowText = null
            this.timeShowText = null
            this.selectDateType = 0
            this.currentDate = new Date()
            this.reasonText = ''
        },
        // 获取阶段原因列表
        async stageReasonList(sortId) {
            let { code, data } = await StageReasonList(sortId)

            if (code == 'success') {
                this.reasonOptions = data
                this.getReasonText()
            }
        },
        // 获取商机负责人列表
        async chargeUserInfoList() {
            let ApiOpts = null, params = null

            if(this.fromType == '3') {
                ApiOpts = ChargeUserInfoList
                params = this.customerNo
            } else if(this.fromType == '4') {
                ApiOpts = UsersList
                params = this.corpId
            }

            let { code, data } = await ApiOpts(params)

            if (code == 'success') {
                this.chargeUserInfoListOptions = data
            }
        },
        // 选择时间
        selectDate(type) {
            this.selectDateType = type
            this.selectDatePopupShow = true
        },
        // 选择阶段
        selectStage() {
            this.selectStagePopupShow = true
        },
        // 选择负责人
        selectCharger() {
            this.selectChargerPopupShow = true
        },
        selectReason() {
            this.selectReasonPopupShow = true
        },
        // 确认负责人
        chargerConfirm(v) {
            this.form.chargeUserNo = v && v.userNo
            this.form.chargeUserName = v && v.name
            this.chargeUserName = v && v.name
            this.selectChargerPopupShow = false
        },
        // 确认时间
        dateConfirm(v) {
            if(this.selectDateType == 0) {
                this.form.expectEndTime = v
                this.expectTimeShowText = formatDate(v, "yyyy-MM-dd")
            } else if(this.selectDateType == 1 || this.selectDateType == 2) {
                this.form.endTime = v
                this.timeShowText = formatDate(v, "yyyy-MM-dd")
            }
            this.selectDatePopupShow = false
        },
        // 确认阶段
        stageConfirm(v) {
            this.form.stageNo = v && v.sortNo
            this.stageText = v && v.stageName
            this.stageReasonList(v.sortId)
            if (v.defaultStatus == '成交') {
                this.opportunityStatus = 1
            } else if (v.defaultStatus == '输单') {
                this.opportunityStatus = 2
                this.form.endReasonId = null
            } else if (v.defaultStatus == '无效') {
                this.opportunityStatus = 3
                this.form.endReasonId = null
            } else {
                this.opportunityStatus = this.id ? 0 : -1
            }
            this.selectStagePopupShow = false
        },
        // 确认原因
        reasonConfirm(v) {
            this.form.endReasonId = v && v.id
            this.reasonText = v && v.content
            this.selectReasonPopupShow = false
        },
        // 表单验证
        checkForm() {
            const { name, stageNo, chargeUserNo, endTime, endReasonId } = this.form

            if (!name || name && name.length < 2 || name && name.length > 30) {
                this.$toast('请输入2到30个字符的商机名称')
                return false
            }
            if (!stageNo) {
                this.$toast('请选择跟进阶段')
                return false
            }
            if (!chargeUserNo) {
                this.$toast('请选择商机负责人')
                return false
            }
            if (!endTime && (this.opportunityStatus == 2 || this.opportunityStatus == 3)) {
                this.$toast('请选择结束时间')
                return false
            }
            if (!endReasonId && (this.opportunityStatus == 2 || this.opportunityStatus == 3)) {
                this.$toast('请选择原因')
                return false
            }
            return true
        },
        // 处理时间格式为：yyyy-MM-dd HH:mm:ss
        getSubmitTime(expectEndTime, endTime) {
            this.form.expectEndTime = expectEndTime ? formatDate(new Date(expectEndTime).getTime(), 'yyyy-MM-dd hh:mm:ss') : this.form.expectEndTime
            this.form.endTime = endTime ? formatDate(new Date(endTime).getTime(), 'yyyy-MM-dd hh:mm:ss') : this.form.endTime
        }, 
        // 表单提交
        async handleSubmit() {
            if (!this.checkForm()) {
                return
            }
            this.form.corpId = this.corpId
            this.form.customerNo = this.customerNo
            this.form.status = this.opportunityStatus > -1 ? this.opportunityStatus : this.form.status

            this.form.chargeUserNo && this.chargeUserInfoListOptions && this.chargeUserInfoListOptions.map(item => {
                if (item.userNo == this.form.chargeUserNo) {
                    this.form.chargeUserName = item.name
                }
            })

            const {expectEndTime, endTime} = this.form

            this.getSubmitTime(expectEndTime, endTime)

            let ApiOpt = null

            if (this.form.id) {
                ApiOpt = ModifyOpportunities
            } else {
                ApiOpt = AddOpportunities
            }

            let { code, msg } = await ApiOpt(this.form)

            if (code == 'success') {
                this.opportunitiesList()
                this.$toast(msg)
                this.hide()
            } else {
                this.$toast(msg)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.edit-opportunity {
    .edit-opportunity-form {
        max-height: 90%;
        padding: 0 0 24px;
        overflow-y: auto;
        .title {
            height: 88px;
            line-height: 88px;
            background-color: #fafbff;
            border-radius: 16px 16px 0px 0px;
            text-align: center;
            font-size: 28px;
            color: #3c4353;
            font-weight: 600;
        }
        .edit-content {
            padding: 54px 24px 80px;
            .item {
                margin-bottom: 24px;
                .label {
                    display: inline-block;
                    width: 200px;
                    height: 80px;
                    text-align: right;
                    vertical-align: top;
                    span {
                        line-height: 80px;
                        font-size: 28px;
                        color: #3C4353;
                    }
                    .icon {
                        color: #D14343;
                    }
                }
                .edit-field {
                    display: inline-block;
                    width: calc(100% - 215px);
                    margin-left: 15px;
                    padding: 20px 24px;
                    border-radius: 8px;
                    border: 2px solid #D9DAE4;
                    vertical-align: top;
                    font-size: 28px;
                    color: #3C4353;
                }
                .edit-field:not(.area-field) {
                    height: 80px;
                    line-height: 1;
                }
                /deep/ .van-stepper__input {
                    margin: 0;
                    text-align: left;
                    background-color: #fff;
                }
            }
        }
        .btn-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 20px 0;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            .item {
                width: 339px;
                height: 80px;
                line-height: 80px;
                margin: 0 12px;
                border: 2px solid #4168F6;
                border-radius: 8px;
                font-size: 28px;
                text-align: center;
            }
            .close-btn {
                color: #4168F6;
                background-color: #fff;
            }
            .submit-btn {
                color: #fff;
                background-color: #4168F6;
            }
        }
    }
}
</style>