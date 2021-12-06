<template>
    <div class="edit-opportunity">
        <van-popup
            v-model="confirmResultDialogVisible"
            round
            position="bottom"
            class="edit-opportunity-form"
            :close-on-click-overlay="false"
            closeable
            @closed="hide">
            <div class="title">{{ `确定${status}` }}</div>
            <div class="box">
                <div class="edit-content">
                    <template v-if="status == '成交'">
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>商机负责人:</span>
                            </p>
                            <van-field v-model="chargeUserName" class="edit-field" placeholder="选择员工" :readonly="true" @click="selectCharger" />
                        </div>
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>商机金额:</span>
                            </p>
                            <van-stepper v-model="form.price" class="edit-field" :show-plus="false" :show-minus="false" :input-width="'100%'" :button-size="'100%'" :allow-empty="true" placeholder="请输入" :min="0" :max="99999999999999999999" :decimal-length="2" :default-value="0" />
                        </div>
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>成交时间:</span>
                            </p>
                            <van-field v-model="timeShowText" class="edit-field" placeholder="请选择成交时间" :readonly="true" @click="selectDate" />
                        </div>
                    </template>
                    <template v-if="status == '输单'">
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>输单原因:</span>
                            </p>
                            <van-field v-model="reasonText" clearable class="edit-field" placeholder="请选择" :readonly="true" @click="selectReason"/>
                        </div>
                        <div class="item one-line">
                            <p class="label">
                                <span>输单备注:</span>
                            </p>
                            <van-field v-model="form.endRemarks" class="edit-field area-field" rows="6" :border="true" autosize type="textarea" placeholder="请输入文字(不得超过200个字符)" maxlength="200" show-word-limit />
                        </div>
                    </template>
                    <template v-if="status == '无效'">
                        <div class="item one-line">
                            <p class="label">
                                <span class="icon">*</span>
                                <span>无效原因:</span>
                            </p>
                            <van-field v-model="reasonText" clearable class="edit-field" placeholder="请选择" :readonly="true" @click="selectReason"/>
                        </div>
                        <div class="item one-line">
                            <p class="label">
                                <span>无效备注:</span>
                            </p>
                            <van-field v-model="form.endRemarks" class="edit-field area-field" rows="6" :border="true" autosize type="textarea" placeholder="请输入文字(不得超过200个字符)" maxlength="200" show-word-limit />
                        </div>
                    </template>
                </div>
            </div>
            <div class="btn-wrap">
                <div class="item close-btn" @click="hide">取消</div>
                <div class="item submit-btn" @click="handleSubmit">确定</div>
            </div>
        </van-popup>

        <van-popup v-model="selectReasonPopupShow" position="bottom" class="picker-pop">
            <van-picker
                show-toolbar
                :columns="reasonOptions"
                value-key="content"
                @confirm="reasonConfirm"
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
import { StageReasonList, ChargeUserInfoList, UsersList, ModifyOpportunities } from '../../../config/api'
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
            status: null,
            stageId: null,
            confirmResultDialogVisible: false,
            form: {
                chargeUserNo: '',
                price: null,
                endTime: null,
                endReasonId: null,
                endRemarks: null
            },
            chargeUserName: '',
            timeShowText: null,
            reasonText: '',
            currentDate: new Date(),
            selectDatePopupShow: false,
            selectChargerPopupShow: false,
            selectReasonPopupShow: false,
            chargeUserInfoListOptions: [],
            reasonOptions: [],
            endType: 0
        }
    },
    computed: {
        ...mapState(["corpId"]),
    },
    methods: {
        show(statusData, formData) {
            const {stageId, status} = statusData
            this.stageId = stageId
            this.status = status
            this.form = JSON.parse(JSON.stringify(formData))
            this.timeShowText = this.form.endTime && formatDate(this.form.endTime, "yyyy-MM-dd") || null
            if (this.status == '成交') {
                this.chargeUserInfoList()
            } else {
                this.stageReasonList()
            }
            this.confirmResultDialogVisible = true
        },
        hide() {
            this.initForm()
            this.confirmResultDialogVisible = false
        },
        initForm() {
            this.form = {
                chargeUserNo: '',
                price: null,
                endTime: null,
                endReasonId: null,
                endRemarks: null
            }
            this.chargeUserName =  ''
            this.reasonText = ''
            this.timeShowText = null
            this.currentDate = new Date()
            this.endType = 0
        },
        // 获取阶段原因列表
        async stageReasonList() {
            let { code, data } = await StageReasonList(this.stageId)

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
                this.getChargerText()
            }
        },
        getChargerText() {
            this.chargeUserInfoListOptions.map(item => {
                if (item.userNo == this.form.chargeUserNo) {
                    this.chargeUserName = item.name
                }
            })
        },
        getReasonText() {
            this.reasonOptions.map(item => {
                if (item.id == this.form.endReasonId) {
                    this.reasonText = item.content
                }
            })
        },
        // 选择负责人
        selectCharger() {
            this.selectChargerPopupShow = true
        },
        // 确认负责人
        chargerConfirm(v) {
            this.form.chargeUserNo = v && v.userNo
            this.chargeUserName = v && v.name
            this.selectChargerPopupShow = false
        },
        // 选择原因
        selectReason() {
            this.selectReasonPopupShow = true
        },
        // 确认原因
        reasonConfirm(v) {
            this.form.endReasonId = v && v.id
            this.reasonText = v && v.content
            this.selectReasonPopupShow = false
        },
        // 选择时间
        selectDate() {
            this.selectDatePopupShow = true
        },
        // 确认时间
        dateConfirm(v) {
            this.form.endTime = v
            this.timeShowText = formatDate(v, "yyyy-MM-dd")
            this.selectDatePopupShow = false
            this.endType = 1
        },
        // 表单验证
        checkForm() {
            const { chargeUserNo, price, endTime, endReasonId } = this.form

            if (!chargeUserNo && this.status == '成交') {
                this.$toast('请选择商机负责人')
                return false
            }
            if (!endTime && this.status == '成交') {
                this.$toast('请选择结束时间')
                return false
            }
            if (!endReasonId && (this.status == '输单' || this.status == '无效')) {
                this.$toast('请选择原因')
                return false
            }
            return true
        },
        // 处理时间格式为：yyyy-MM-dd HH:mm:ss
        getSubmitTime(endTime) {
            this.form.endTime = endTime && this.endType == 1 ? formatDate(new Date(endTime).getTime(), 'yyyy-MM-dd hh:mm:ss') : endTime
        }, 
        // 表单提交
        async handleSubmit() {
            if (!this.checkForm()) {
                return
            }
            this.form.corpId = this.corpId
            this.form.customerNo = this.customerNo
            this.form.status = this.status == '成交' ? 1 : this.status == '输单' ? 2 : this.status == '无效' ? 3 : 0

            this.form.chargeUserNo && this.chargeUserInfoListOptions && this.chargeUserInfoListOptions.map(item => {
                if (item.userNo == this.form.chargeUserNo) {
                    this.form.chargeUserName = item.name
                }
            })

            this.getSubmitTime(this.form.endTime)

            let { code, msg } = await ModifyOpportunities(this.form)

            if (code == 'success') {
                this.$toast(msg)
                this.hide()
                setTimeout(() => {
                    this.goBack()
                }, 500)
            } else {
                this.$toast(msg)
            }
        },
        goBack() {
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="less" scoped>
.edit-opportunity {
    .edit-opportunity-form {
        max-height: 80%;
        padding: 0 0 24px;
        overflow: hidden;
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
        .box {
            max-height: 70vh;
            padding-bottom: 40px;
            overflow-y: auto;
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
                    line-height: 40px;
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
            width: 10rem;
            padding: 20px 0;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
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