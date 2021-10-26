<template>
    <div class="opportunities">
        <div class="t_text">
          <span class="label_tag">商机</span>
          <div class="editButton" @click="handleEdit">
            <van-icon name="add-o" class="img" />
            <span>添加</span>
          </div>
        </div>
        <div v-for="i in listData" :key="i.id" class="opportunities-item">
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
                        <span class="value one-line" @click="handleEdit(i)">
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

        <!-- 新建/编辑商机 -->
        <edit-opportunity ref="editOpportunity" :customerNo="customerNo" :stageListOptions="stageListOptions"></edit-opportunity>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { OpportunitiesList, OpportunitiesStageList } from '../../config/api'
import { formatDate } from '../../utils/tool'

import EditOpportunity from './dialog/editOpportunity'

export default {
    props: {
        customerNo: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            listData: [],
            stageListOptions: []
        }
    },
    computed: {
        ...mapState(["corpId"])
    },
    // inject: ['goDetail'],
    async created() {
        await this.getCorpId()
        this.opportunitiesList()
    },
    provide() {
        return {
            opportunitiesStageList: this.opportunitiesStageList
        }
    },
    methods: {
        ...mapActions(["getCorpId"]),
        formatDate,
        async opportunitiesList() {
            // let {code, data, msg} = await OpportunitiesList(this.customerNo)
            let {code, data, msg} = {
                "id": 99999,
                "code": "success",
                "result": true,
                "msg": "请求成功",
                "data": [
                    {
                        "id": 6,
                        "customerNo": "B46299BD98A54B3F9D2EBF6FA016B0A2",
                        "name": "qqqqqq",
                        "price": 3.00,
                        "expectEndTime": null,
                        "stageNo": 3,
                        "chargeUserNo": "6445B968A1FF41F4AA40E06D9EF1E3A5",
                        "chargeUserName": "厉害啊",
                        "endTime": 1635523200000,
                        "endReasonId": null,
                        "endRemarks": "",
                        "remarks": "",
                        "createTime": 1634870955000,
                        "createUserNo": null,
                        "updateTime": 1634883474000,
                        "updateUserNo": null,
                        "deleted": false,
                        "corpId": "ww7938067cfe342e58",
                        "status": 1,
                        "infoModelList": [
                            {
                                "stageName": "这是第一阶段",
                                "sortNo": 1,
                                "sortId": 12,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第二阶段",
                                "sortNo": 2,
                                "sortId": 13,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第三阶段",
                                "sortNo": 3,
                                "sortId": 14,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第四阶段",
                                "sortNo": 4,
                                "sortId": 15,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第五阶段",
                                "sortNo": 5,
                                "sortId": 16,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第六阶段",
                                "sortNo": 6,
                                "sortId": 17,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第七阶段",
                                "sortNo": 7,
                                "sortId": 18,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第八阶段",
                                "sortNo": 8,
                                "sortId": 19,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第九阶段",
                                "sortNo": 9,
                                "sortId": 20,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第十阶段",
                                "sortNo": 10,
                                "sortId": 21,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是成交",
                                "sortNo": 11,
                                "sortId": 22,
                                "defaultStatus": "成交"
                            }
                        ],
                        "endReasonName": null
                    },
                    {
                        "id": 5,
                        "customerNo": "B46299BD98A54B3F9D2EBF6FA016B0A2",
                        "name": "aaaaaa",
                        "price": 15000.00,
                        "expectEndTime": 1635350400000,
                        "stageNo": 2,
                        "chargeUserNo": "6445B968A1FF41F4AA40E06D9EF1E3A5",
                        "chargeUserName": "厉害啊",
                        "endTime": 1635350400000,
                        "endReasonId": null,
                        "endRemarks": null,
                        "remarks": "",
                        "createTime": 1634816363000,
                        "createUserNo": null,
                        "updateTime": 1634869137000,
                        "updateUserNo": null,
                        "deleted": false,
                        "corpId": "ww7938067cfe342e58",
                        "status": 1,
                        "infoModelList": [
                            {
                                "stageName": "这是第一阶段",
                                "sortNo": 1,
                                "sortId": 12,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第二阶段",
                                "sortNo": 2,
                                "sortId": 13,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第三阶段",
                                "sortNo": 3,
                                "sortId": 14,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第四阶段",
                                "sortNo": 4,
                                "sortId": 15,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第五阶段",
                                "sortNo": 5,
                                "sortId": 16,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第六阶段",
                                "sortNo": 6,
                                "sortId": 17,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第七阶段",
                                "sortNo": 7,
                                "sortId": 18,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第八阶段",
                                "sortNo": 8,
                                "sortId": 19,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第九阶段",
                                "sortNo": 9,
                                "sortId": 20,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第十阶段",
                                "sortNo": 10,
                                "sortId": 21,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是成交",
                                "sortNo": 11,
                                "sortId": 22,
                                "defaultStatus": "成交"
                            }
                        ],
                        "endReasonName": null
                    },
                    {
                        "id": 4,
                        "customerNo": "B46299BD98A54B3F9D2EBF6FA016B0A2",
                        "name": "aaa",
                        "price": null,
                        "expectEndTime": null,
                        "stageNo": 5,
                        "chargeUserNo": "6445B968A1FF41F4AA40E06D9EF1E3A5",
                        "chargeUserName": "厉害啊",
                        "endTime": null,
                        "endReasonId": 9,
                        "endRemarks": null,
                        "remarks": "",
                        "createTime": 1634813199000,
                        "createUserNo": null,
                        "updateTime": 1634870833000,
                        "updateUserNo": null,
                        "deleted": false,
                        "corpId": "ww7938067cfe342e58",
                        "status": 3,
                        "infoModelList": [
                            {
                                "stageName": "这是第一阶段",
                                "sortNo": 1,
                                "sortId": 12,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第二阶段",
                                "sortNo": 2,
                                "sortId": 13,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第三阶段",
                                "sortNo": 3,
                                "sortId": 14,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第四阶段",
                                "sortNo": 4,
                                "sortId": 15,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第五阶段",
                                "sortNo": 5,
                                "sortId": 16,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第六阶段",
                                "sortNo": 6,
                                "sortId": 17,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第七阶段",
                                "sortNo": 7,
                                "sortId": 18,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第八阶段",
                                "sortNo": 8,
                                "sortId": 19,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第九阶段",
                                "sortNo": 9,
                                "sortId": 20,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第十阶段",
                                "sortNo": 10,
                                "sortId": 21,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是成交",
                                "sortNo": 11,
                                "sortId": 22,
                                "defaultStatus": "成交"
                            }
                        ],
                        "endReasonName": "无效原因1"
                    },
                    {
                        "id": 3,
                        "customerNo": "B46299BD98A54B3F9D2EBF6FA016B0A2",
                        "name": "商机一",
                        "price": 10000.00,
                        "expectEndTime": 1635177600000,
                        "stageNo": 3,
                        "chargeUserNo": "6445B968A1FF41F4AA40E06D9EF1E3A5",
                        "chargeUserName": "厉害啊",
                        "endTime": null,
                        "endReasonId": 7,
                        "endRemarks": "aaa",
                        "remarks": "哦哦哦~~~！！！",
                        "createTime": 1634804614000,
                        "createUserNo": null,
                        "updateTime": 1634814306000,
                        "updateUserNo": null,
                        "deleted": false,
                        "corpId": "ww7938067cfe342e58",
                        "status": 2,
                        "infoModelList": [
                            {
                                "stageName": "这是第一阶段",
                                "sortNo": 1,
                                "sortId": 12,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第二阶段",
                                "sortNo": 2,
                                "sortId": 13,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第三阶段",
                                "sortNo": 3,
                                "sortId": 14,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第四阶段",
                                "sortNo": 4,
                                "sortId": 15,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第五阶段",
                                "sortNo": 5,
                                "sortId": 16,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第六阶段",
                                "sortNo": 6,
                                "sortId": 17,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第七阶段",
                                "sortNo": 7,
                                "sortId": 18,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第八阶段",
                                "sortNo": 8,
                                "sortId": 19,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第九阶段",
                                "sortNo": 9,
                                "sortId": 20,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是第十阶段",
                                "sortNo": 10,
                                "sortId": 21,
                                "defaultStatus": null
                            },
                            {
                                "stageName": "这是成交",
                                "sortNo": 11,
                                "sortId": 22,
                                "defaultStatus": "成交"
                            }
                        ],
                        "endReasonName": "输单原因2"
                    }
                ]
            }

            if (code === 'success') {
                this.listData = data
                this.opportunitiesStageList(this.getStageListOptions, true, '')
            } else {
                this.$toast(msg)
            }
        },
        async opportunitiesStageList(callBack, isEnd, isAdd) {
            let params = {
                corpId: this.corpId,
                isEnd,
                isAdd
            }

            let { code, data } = await OpportunitiesStageList(params)

            if (code == 'success') {
                callBack(data)
            }
        },
        getStageListOptions(data) {
            this.stageListOptions = data
        },
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
        EditOpportunity
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