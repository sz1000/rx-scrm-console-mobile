<script>
import { mapState } from 'vuex'
import { OpportunitiesList, OpportunitiesStageList } from '../config/api'

export default {
    data() {
        return {
            opportunitiesListData: [],
        }
    },
    computed: {
        ...mapState(["corpId"])
    },
    methods: {
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
                this.opportunitiesListData = data
                // this.opportunitiesStageList(this.getStageListOptions, true, '')
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
    }
}
</script>