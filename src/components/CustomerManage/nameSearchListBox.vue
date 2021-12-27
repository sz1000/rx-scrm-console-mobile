<template>
    <div class="name-search-list-box">
        <template v-if="preciseData && preciseData.length || list && list.length">
            <template v-if="preciseData && preciseData.length">
                <div class="title">找到完全相同名称的客户：</div>
                <div v-for="i in preciseData" :key="i.clueCustomerNo" class="list-item pointer">
                    <div class="list-item-left">
                        <img class="header-img" :src="i.avatar | $setAvatar" alt="">
                        <img v-if="i.isFriend == 1 && i.externalType == 2" class="icon" src="@/assets/svg/icon_qiyeweixin.svg" alt="">
                        <img v-if="i.isFriend == 1 && i.externalType == 1" class="icon" src="@/assets/svg/icon_weixin.svg" alt="">
                    </div>
                    <ul class="list-item-right">
                        <li class="right-top">
                            <div class="name-box">
                                <h3 class="one-line active" v-html="i.customerCalled"></h3>
                            </div>
                        </li>
                        <li class="right-bottom">
                            <span class="time">{{ i.createTime ? formatDate(i.createTime, 'yyyy-MM-dd') : '' }}</span>
                            <span v-if="(fromType == 1 || fromType == 3) && i.userName">负责人：{{ i | optString(that) }}</span>
                        </li>
                    </ul>
                    <div v-if="fromType == 3 && i.userNo == userNo" class="list-item-check" :class="{checked: checkedItem == i.clueCustomerNo}" @click="doCheck(i.clueCustomerNo)"></div>
                </div>
            </template>
            <template v-if="list && list.length">
                <div class="title">找到以下相似客户：</div>
                <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div v-for="i in list" :key="i.clueCustomerNo" class="list-item pointer">
                        <div class="list-item-left">
                            <img class="header-img" :src="i.avatar | $setAvatar" alt="">
                            <img v-if="i.isFriend == 1 && i.externalType == 2" class="icon" src="../../assets/svg/icon_qiyeweixin.svg" alt="">
                            <img v-if="i.isFriend == 1 && i.externalType == 1" class="icon" src="../../assets/svg/icon_weixin.svg" alt="">
                        </div>
                        <ul class="list-item-right">
                            <li class="right-top">
                                <div class="name-box">
                                    <h3 class="one-line" v-html="i.customerCalled"></h3>
                                </div>
                            </li>
                            <li class="right-bottom">
                                <span class="time">{{ i.createTime ? formatDate(i.createTime, 'yyyy-MM-dd') : '' }}</span>
                                <span v-if="(fromType == 1 || fromType == 3) && i.userName">负责人：{{ i | optString(that) }}</span>
                            </li>
                        </ul>
                        <div v-if="fromType == 3 && i.userNo == userNo" class="list-item-check" :class="{checked: checkedItem == i.clueCustomerNo}" @click="doCheck(i.clueCustomerNo)"></div>
                    </div>
                </van-list>
            </template>
        </template>

        <div v-else-if="searchParam" class="no_data">
            <img class="img" src="@/assets/images/no_data1.png" alt="">
            <div class="no_text">没有找到相似客户</div>
        </div>
    </div>
</template>
<script>
import { cluecustomer_elasticSearch } from '@/api/customer'
import { throttle, formatDate } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    name: 'customerListBox',
    props: {
        fromType: { // 1：编辑客户名称 2：新增客户 3：线索转客户
            default: 0
        },
        searchParam: {
            type: String,
            default: ''
        },
        checkedItem: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            that: this,
            pageLoading: false,
            loading: false,
            finished: false,
            page: 1,
            limit: 20,
            list: [], // 相似数据
            preciseData: [], // 相同数据
        }
    },
    watch: {
        preciseData(val) {
            if (val && val.length) {
                this.$emit('ifHasPreciseData', true)
            } else {
                this.$emit('ifHasPreciseData', false)
            }
        }
    },
    computed: {
        ...mapState(["corpId", "userNo"]),
    },
    inject: ['doCheck'],
    methods: {
        formatDate,
        initData() {
            Object.assign(this.$data, this.$options.data())
        },
        doSearch() {
            this.initData()
            this.getList()
        },
        // 获取客户列表
        getList() {
            if (!this.searchParam) {
                return
            }

            if (this.page == 1) {
                this.$toast.loading()
            }

            this.loading = true

            let params = {
                page: this.page,
                limit: this.limit,
                searchParam: this.searchParam,
                corpId: this.corpId,
                isFriend: this.fromType == 2 ? '0' : '',
            }

            cluecustomer_elasticSearch(params).then(res => {
                let { result, data, msg } = res

                this.loading = false
                if (result) {
                    let { dimData, preciseData } = data

                    this.preciseData = preciseData

                    if (this.page == 1) {
                        this.list = []
                    }
                    this.list = this.list.concat(dimData.records)
                    this.page += 1
                    this.finished = this.list.length >= dimData.total
                } else {
                    this.$toast(msg)
                }

                console.log("this.preciseData", this.preciseData)
            })
        },
        onLoad() {
            if (this.page <= 1) {
                return
            }
            this.getList()
        },
    },
    filters: {
        optString(val, that){
            let result = val.userName ? val.deptName ? `${val.userName}-${val.deptName}` : val.userName : ''

            return result ? val.userNo && val.userNo == that.userNo ? `${result}(我)` : result : ''
        },
    },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.name-search-list-box {
    height: 100%;
    .title {
        margin: 40px 0 0 32px;
        color: @total;
        font-size: 24px;
    }
    .list-item {
        display: flex;
        align-items: center;
        padding: 32px;
        position: relative;
        &::after {
            content: '';
            height: 2px;
            background-color: @lineColor;
            position: absolute;
            left: 32px;
            right: 32px;
            bottom: 0;
            transform: scaleY(.5);
        }
        .list-item-left {
            width: 80px;
            min-width: 80px;
            height: 80px;
            margin-right: 24px;
            position: relative;
            .header-img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .icon {
                width: 32px;
                height: 32px;
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
        .list-item-right {
            width: calc(100% - 170px);
            .right-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 100%;
                .name-box {
                    max-width: calc(100% - 140px);
                    h3 {
                        max-width: 100%;
                        color: @fontSub3;
                        font-size: 32px;
                        font-weight: 600;
                    }
                    .active {
                        color: @main;
                    }
                }
                .time {
                    min-width: 130px;
                    text-align: right;
                    color: @fontSub1;
                    font-size: 24px;
                }
                .clues-time {
                    color: @total;
                }
            }
            .right-middle {
                height: 62px;
                padding: 12px 0 0;
                overflow: hidden;
                span {
                    display: inline-block;
                    padding: 4px 12px;
                    margin-bottom: 12px;
                    border: 2px solid @lineColor;
                    border-radius: 4px;
                    color: @fontSub1;
                    font-size: 22px;
                    &:not(:first-child) {
                        margin-left: 16px;
                    }
                }
                .first {
                    border-color: @main;
                    color: @main;
                    background: rgba(65, 104, 246, 0.06);
                }
                .second {
                    border-color: @green;
                    color: @green;
                    background: rgba(54, 179, 158, 0.06);
                }
                .third {
                    border-color: @main;
                    color: @main;
                    background: rgba(65, 104, 246, 0.06);
                }
                .fourth {
                    border-color: @yellow2;
                    color: @yellow2;
                    background: rgba(251, 143, 40, 0.06);
                }
                .fifth {
                    border-color: @red;
                    color: @red;
                    background: rgba(209, 67, 67, 0.06);
                }
            }
            .right-bottom {
                margin-top: 8px;
                span {
                    color: @fontSub1;
                    font-size: 24px;
                    &:first-child {
                        margin-right: 24px;
                    }
                }
            }
        }
        .list-item-check {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid @placeholder;
            &.checked {
                background-color: @main;
                border-color: @main;
                position: relative;
                &::before{
                    content: '';
                    width: 8px;
                    height: 15px;
                    border-bottom: 6px solid @white;
                    border-right: 6px solid @white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                }
            }
        }
    }
    .no_data {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 40px;
        .img {
            width: 440px;
            height: 300px;
            margin-bottom: 20px;
        }
        .no_text {
            font-size: 28px;
            line-height: 32px;
            color: @lengthColor;
        }
    }
}
</style>