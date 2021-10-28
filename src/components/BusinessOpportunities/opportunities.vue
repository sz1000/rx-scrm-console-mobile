<template>
    <div class="opportunities">
        <div class="t_text">
          <span class="label_tag">商机</span>
          <div class="editButton" @click="handleEdit">
            <van-icon name="add-o" class="img" />
            <span>添加</span>
          </div>
        </div>
        <div v-for="i in opportunitiesListData" :key="i.id" class="opportunities-item">
            <div class="table-title">
                <h2 class="left">{{ i.name }}</h2>
                <div class="right">
                    <van-icon class="img" @click="handleEdit(i)" name="edit" />
                    <van-icon class="img" @click="deleteRow(i.id)" name="delete-o" />
                </div>
            </div>
            <div class="table-content">
                <div class="content-item left">
                    <div class="item">
                        <span class="label">当前阶段:</span>
                        <span class="value one-line" @click="handleStage(i)">
                            <span class="ongoing" :class="{success: i.status == 1, lose: i.status == 2, invalid: i.status == 3}">{{ i.status | getStatusText }}</span>
                            <van-icon class="img" name="edit" />
                        </span>
                    </div>
                    <div class="item">
                        <span class="label">负责人:</span>
                        <span class="value one-line">{{ i.chargeUserName }}</span>
                    </div>
                    <div class="item">
                        <span class="label">商机金额:</span>
                        <span class="value one-line">{{ i.price }}</span>
                    </div>
                    <div v-if="i.status == 2" class="item">
                        <span class="label">输单原因:</span>
                        <span class="value one-line">{{ i.endReasonName }}</span>
                    </div>
                    <div v-if="i.status == 3" class="item">
                        <span class="label">无效原因:</span>
                        <span class="value one-line">{{ i.endReasonName }}</span>
                    </div>
                    <div v-if="i.status != 0" class="item">
                        <span class="label">商机备注:</span>
                        <span class="value one-line">{{ i.remarks }}</span>
                    </div>
                </div>
                <div class="content-item right">
                    <div class="item">
                        <span class="label">创建时间:</span>
                        <span class="value one-line">{{ i.createTime ? formatDate(i.createTime, "yyyy-MM-dd") : '-' }}</span>
                    </div>
                    <div class="item">
                        <span class="label">预计成交:</span>
                        <span class="value one-line">{{ i.expectEndTime ? formatDate(i.expectEndTime, "yyyy-MM-dd") : '-' }}</span>
                    </div>
                    <div v-if="i.status == 0" class="item">
                        <span class="label">商机备注:</span>
                        <span class="value one-line">{{ i.remarks }}</span>
                    </div>
                    <div v-if="i.status" class="item">
                        <span class="label">{{ i.status == 1 ? '成交时间:' : '结束时间:' }}</span>
                        <span class="value one-line">{{ i.endTime ? formatDate(i.endTime, "yyyy-MM-dd") : '-' }}</span>
                    </div>
                    <div v-if="i.status == 2" class="item">
                        <span class="label">输单备注:</span>
                        <span class="value one-line">{{ i.endRemarks }}</span>
                    </div>
                    <div v-if="i.status == 3" class="item">
                        <span class="label">无效备注:</span>
                        <span class="value one-line">{{ i.endRemarks }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 更改商机阶段 -->
        <!-- <stage-list ref="stageList"></stage-list> -->
        <!-- 新建/编辑商机 -->
        <edit-opportunity ref="editOpportunity" :customerNo="customerNo"></edit-opportunity>
        <!-- 删除 -->
        <delete-dialog ref="deleteDialog"></delete-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import opportunityMixin from '../../mixins/opportunity'
import { formatDate } from '../../utils/tool'

import EditOpportunity from './dialog/editOpportunity'
import deleteDialog from './dialog/delete'

export default {
    mixins: [opportunityMixin],
    props: {
        customerNo: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
    created() {
        this.getCorpId()
    },
    mounted() {
        this.opportunitiesList()
    },
    provide() {
        return {
            opportunitiesList: this.opportunitiesList,
            opportunitiesStageList: this.opportunitiesStageList,
            doDelete: this.doDelete,
        }
    },
    methods: {
        ...mapActions(["getCorpId"]),
        formatDate,
        handleEdit(data) {
            this.$refs.editOpportunity.show(data)
        },
        handleChange(i, data) {
            if (data.defaultStatus == '成交') {
                // this.changeStatus(data.sortId, i, data.defaultStatus)
            } else {
                // this.$refs.changeStage.show(i.id, data)
            }
        },
        deleteRow(id) {
            this.$refs.deleteDialog.show(id)
        },
        doDelete() {

        },
        handleStage(item) {
            localStorage.setItem("JZSCRM_OPPORTUNITIES_ITEM", JSON.stringify(item))

            this.$router.push({
                path: 'stageList',
                query: { id: item.id, customerNo: this.customerNo },
            })
        },
    },
    filters: {
        getStatusText(status) {
            let result = ''
            if (status == 0) {
                result = '沟通中'
            } else if (status == 1) {
                result = '成交'
            } else if (status == 2) {
                result = '输单'
            } else if (status == 3) {
                result = '无效'
            }
            return result
        }
    },
    components: {
        EditOpportunity,
        deleteDialog
    }
}
</script>
<style lang="less" scoped>
.opportunities {
    padding: 0 24px 24px;
    .t_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label_tag {
            padding-left: 10px;
            font-weight: 600;
            color: #3C4353;
            font-size: 28px;
            position: relative;
            &::before {
                content: '';
                width: 8px;
                height: 28px;
                background-color: #4168f6;
                position: absolute;
                top: 7px;
                left: -10px;
            }
        }
        .editButton {
            width: 124px;
            height: 68px;
            line-height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            color: #838a9d;
            span {
                font-size: 28px;
            }
            .img {
                margin-right: 8px;
                font-size: 28px;
            }
        }
    }
    .opportunities-item {
        padding: 24px 0;
        border-bottom: 2px solid #F0F2F7;
        .table-title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            .left {
                font-size: 28px;
                color: #3C4353;
            }
            .right {
                .img {
                    margin-left: 22px;
                    font-size: 28px;
                }
            }
        }
        .table-content {
            display: flex;
            .content-item {
                width: 50%;
                .item {
                    display: flex;
                    margin-bottom: 8px;
                    span {
                        font-size: 28px;
                    }
                    .label {
                        width: 200px;
                        margin-right: 16px;
                        color: #838A9D;
                    }
                    .value {
                        width: 100%;
                        color: #3C4353;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .ongoing {
                            color: #4168F6;
                        }
                        .success {
                            color: #52BD94;
                        }
                        .lose {
                            color: #D14343;
                        }
                        .invalid {
                            color: #3C4353;
                        }
                    }
                }
            }
            .right {
                margin-left: 8px;
            }
        }
    }
}
</style>