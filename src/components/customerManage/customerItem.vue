<template>
    <div class="customer-item">
        <div v-if="isPortrait == 1" class="customer-portrait">
            <div class="customInfo">
                <div class="iconName">
                <div v-if="imageUser">
                    <img :src="imageUser" alt="" />
                </div>
                <div class="flag" v-else>{{ name ? name.substr(0, 1) : "" }}</div>
                <div class="nameSex">
                    <span>{{ name }}</span>
                    <span v-show="nameFrom">{{ nameFrom == "1" ? "@微信" : `@${itemData.customerName}` }}</span>
                    <img src="../../images/icon_female@2x.png" alt="" v-if="itemData.gender == '2'" />
                    <img src="../../images/man.png" alt="" v-if="itemData.gender == '1'" />
                </div>
                </div>
                <div class="detailBtn" @click="goDetail">
                详情
                <van-icon name="arrow" color="#4168F6" />
                </div>
            </div>
            <div class="detailInfo">
                <div class="left">
                <div class="rowStyle">
                    <span>手机:</span>
                    <span>{{ itemData.phone }}</span>
                </div>
                <div class="rowStyle">
                    <span>来源:</span>
                    <span>{{ itemData.source }}</span>
                </div>
                <div class="rowStyle">
                    <span>职务:</span>
                    <span>{{ itemData.position }}</span>
                </div>
                </div>
                <div class="right">
                <div class="rowStyle">
                    <span>负责人:</span>
                    <span>{{ itemData.uname }}</span>
                </div>
                <div class="rowStyle">
                    <span>公司名称:</span>
                    <span>{{ itemData.cropFullName }}</span>
                </div>
                <div class="rowStyle">
                    <span>所属行业:</span>
                    <span>{{ itemData.cropSubIndustry }}</span>
                </div>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="customInfo">
                <div class="iconName">
                <span>客户简称: </span>
                <span>{{ itemData.customerName }}</span>
                </div>
                <!-- <div class="detailBtn"
                @click="deleteCard(item,index)">
                <van-icon name="delete-o" />
                删除
            </div> -->
            <div v-if="type == 2" class="detailBtn" @click="goDetail(itemData, index)">
                详情<van-icon name="arrow" />
            </div>
            </div>
            <div class="detailInfo" @click="goDetail(itemData, index)">
                <div class="left">
                    <div class="rowStyle">
                        <span>公司名称:</span>
                        <span>{{ itemData.cropFullName }}</span>
                    </div>
                    <div class="rowStyle">
                        <span>所属行业:</span>
                        <span>{{ itemData.cropSubIndustry }}</span>
                    </div>
                    <div class="rowStyle">
                        <span>联系人员:</span>
                        <span>{{ itemData.name }}</span>
                    </div>
                    <div class="rowStyle">
                        <span>手机号码:</span>
                        <span>{{ itemData.phone }}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="rowStyle">
                        <span>职务:</span>
                        <span>{{ itemData.position }}</span>
                    </div>
                    <div class="rowStyle">
                        <span>性别:</span>
                        <span>{{ itemData.gender }}</span>
                    </div>
                    <div class="rowStyle">
                        <span>来源:</span>
                        <span>{{ itemData.source }}</span>
                    </div>
                    <div v-if="fromType == '3'" class="rowStyle">
                        <span>负责人:</span>
                        <span>{{ itemData.uname }}</span>
                    </div>
                </div>
            </div>
        </template>
        <div class="tjry" :class="{'tjry-portrait': isPortrait == 1}">
            <div class="box">
                <span class="label">添加人员: </span>
                <span class="value">{{ itemData.createBy }}</span>
            </div>
            <div class="box1">
                <span class="label">添加时间:</span>
                <span class="value">{{
                formatDate(itemData.createTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../../utils/tool'
export default {
    props: {
        type: {
            type: Number,
            default: 1
        },
        itemData: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: 0
        },
        isPortrait: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: ''
        },
        imageUser: {
            type: String,
            default: ''
        },
        nameFrom: {
            default: ''
        },
        fromType: {
            type: String,
            default: '3'
        }
    },
    inject: ['goDetail'],
    methods: {
        formatDate
    },
}
</script>
<style lang="less" scoped>
.customer-item {
    .customInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px;
        border-bottom: 1px solid #f0f2f7;
        .iconName {
            span {
                line-height: 88px;
                font-size: 28px;
            }
            span:nth-child(1) {
                color: #838a9d;
            }
            span:nth-child(2) {
                color: #3c4353;
            }
        }
        .detailBtn {
            line-height: 88px;
            font-size: 28px;
            color:#4168F6;;
            .van-icon {
                line-height: 88px;
                font-size: 28px;
            }
        }
    }
    .detailInfo {
        display: flex;
        margin-top: 21px;
        .left,
        .right {
            width: 50%;
            .rowStyle {
                line-height: 40px;
                font-size: 28px;
                margin-bottom: 24px;
                display: flex;
            span {
                display: inline-block;
            }
            span:nth-child(1) {
                color: #838a9d;
                overflow: hidden;
                text-align: right;
            }
            span:nth-child(2) {
                flex: 1;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #3c4353;
                font-weight: 400;
            }
            }
        }
        .right {
            margin-left: 19px;
            .rowStyle {
                span:nth-child(1) {
                    width: 100px;
                }
            }
        }
    }

    .customer-portrait {
        .customInfo {
            border-bottom: none;
            .iconName {
                display: flex;
                height: auto;
                .flag {
                    width: 88px;
                    height: 88px;
                    background: #4168f6;
                    border-radius: 12px;
                    text-align: center;
                    line-height: 88px;
                    color: #fff;
                    font-size: 35px;
                }
                .nameSex {
                    margin-left: 16px;
                    span:nth-child(1) {
                        font-weight: 600;
                        color: #3c4353;
                    }
                    span:nth-child(2) {
                        font-size: 24px;
                        color: #ffb020;
                    }
                    span {
                        display: inline-block;
                        line-height: 44px;
                    }
                    img {
                        margin-top: 21px;
                        width: 28px;
                        height: 28px;
                    }
                }
            }
            .detailBtn {
                color: #4168f6;
            }
        }
        .detailInfo {
            .right {
                .rowStyle {
                    span:nth-child(1) {
                        width: 140px;
                    }
                }
            }
        }
    }

    .tjry {
        height: 87px;
        border-top: 1px solid #f0f2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        span {
            display: inline-block;
        }
        .label {
            width: 210px;
            color: #838a9d;
        }
        .value {
            width: 100%;
            color: #3c4353;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .box {
            display: flex;
            width: 50%;
        }
        .box1 {
            display: flex;
            width: 50%;
            line-height: 87px;
            margin-left: 29px;
        }
    }
    .tjry-portrait {
        padding: 0;
        margin: 0 24px;
    }
}
</style>