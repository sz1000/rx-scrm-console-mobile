<template>
    <div class="customer-item">
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
                <span>邮箱:</span>
                <span>{{ itemData.email }}</span>
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
                <span>公司名称:</span>
                <span>{{ itemData.phone }}</span>
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
        <div class="tjry">
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
            color: #838a9d;
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
            /*width: 150px;*/
            color: #838a9d;
            overflow: hidden;
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
        /*margin-left: 19px;*/
        .rowStyle {
        span:nth-child(1) {
            /*width: 84px;*/
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
           /* margin-left: 29px;*/
        }
    }
}
</style>