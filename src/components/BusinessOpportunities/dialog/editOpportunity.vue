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
            <van-form @submit="handleSubmit">
                <div class="edit-content">
                    <div class="item one-line">
                        <p class="label">
                            <span class="icon">*</span>
                            <span>商机名称:</span>
                        </p>
                        <van-field v-model="form.name" clearable class="edit-field" placeholder="请输入" :rules="[{ required: true }]"/>
                    </div>
                    <div class="item one-line">
                        <p class="label">
                            <span>商机金额:</span>
                        </p>
                        <van-stepper v-model="form.price" class="edit-field" :show-plus="false" :show-minus="false" :input-width="'100%'" :button-size="'100%'" :allow-empty="true" placeholder="请输入" :min="0" :decimal-length="2" :default-value="0" />
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
                        <van-field v-model="form.stageNo" class="edit-field" placeholder="选择阶段" :readonly="true" @click="selectStage" :rules="[{ required: true }]"/>
                    </div>
                    <div class="item one-line">
                        <p class="label">
                            <span class="icon">*</span>
                            <span>商机负责人:</span>
                        </p>
                        <van-field v-model="form.chargeUserNo" class="edit-field" placeholder="选择员工" :readonly="true" @click="selectCharger" :rules="[{ required: true }]"/>
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
                        <van-field v-model="timeShowText" class="edit-field" placeholder="请选择结束时间" :readonly="true" @click="selectDate(2)" :rules="[{ required: true }]"/>
                    </div>
                    <template v-if="opportunityStatus == 2">
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>输单原因:</span>
                            </p>
                            <van-field v-model="form.endReasonId" clearable class="edit-field" placeholder="请输入" :rules="[{ required: true }]"/>
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
                            <van-field v-model="form.endReasonId" clearable class="edit-field" placeholder="请输入" :rules="[{ required: true }]"/>
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
                    <div class="item submit-btn" native-type="submit">确定</div>
                </div>
            </van-form>
        </van-popup>

        <van-popup v-model="selectStagePopupShow" position="bottom" class="picker-pop">
            <van-picker
                ref="stagePicker"
                show-toolbar
                :columns="stageListOptions"
                @confirm="stageConfirm"
                @cancel="selectStagePopupShow = false"
            />
        </van-popup>
        <van-popup v-model="selectChargerPopupShow" position="bottom" class="picker-pop">
            <van-picker
                show-toolbar
                :columns="chargeUserInfoListOptions"
                @confirm="stageConfirm"
                @cancel="selectChargerPopupShow = false"
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
import { ChargeUserInfoList, AddOpportunities, ModifyOpportunities } from '../../../config/api'

import { formatDate } from '../../../utils/tool'

export default {
    props: {
        customerNo: {
            type: String,
            default: ''
        },
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
            expectTimeShowText: null,
            timeShowText: null,
            selectDateType: 0,
            currentDate: new Date(),
            selectDatePopupShow: false,
            selectChargerPopupShow: false,
            selectStagePopupShow: false,
            chargeUserInfoListOptions: [], // 商机表单中的负责人选项
            stageListOptions: [] // 商机表单中的阶段选项
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
                this.expectTimeShowText = this.form.expectEndTime && formatDate(this.form.expectEndTime, "yyyy-MM-dd") || null
                this.timeShowText = this.form.endTime && formatDate(this.form.endTime, "yyyy-MM-dd") || null
                this.opportunitiesStageList(this.getStageListOptions, false, '')
            } else {
                this.id = null
                this.title = '新建商机'
                this.opportunityStatus = -1 // 新建
                this.opportunitiesStageList(this.getStageListOptions, false, true)
            }
        },
        getStageListOptions(data) {
            this.stageListOptions = data
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
        },
        // 获取商机负责人列表
        async chargeUserInfoList() {
            let { code, data } = await ChargeUserInfoList(this.customerNo)

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
        stageConfirm() {
            
        },
        checkForm() {

        },
        // 表单提交
        async handleSubmit() {
            this.form.corpId = this.corpId
            this.form.customerNo = this.customerNo

            this.form.chargeUserNo && this.chargeUserInfoListOptions && this.chargeUserInfoListOptions.map(item => {
                if (item.userNo == this.form.chargeUserNo) {
                    this.form.chargeUserName = item.userName
                }
            })

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
        max-height: 80%;
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