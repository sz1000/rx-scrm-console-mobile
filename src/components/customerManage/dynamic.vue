<template>
    <div class="content-item dynamic">
    	<div class="titleBox">
			<span class="blueDiv">
				
			</span>
			<span class="titleFujian">客户动态</span>
		</div>
        <div class="t_text">
            <div v-show="comeType == 1 && btnList.some(item=>item.enName == 'write')" class="editButton" @click="showCompany(3)">
                <img src="../../images/icon_repair1@2x.png" alt="" />
                <span>写跟进</span>
            </div>
        </div>

        <ul class="dynamic-nav">
            <li v-for="(i, index) in dynamicNavList" :key="i" @click="changeDynamicNav(index)" :class="{active: dynamicContentType == index}">{{ i }}</li>
        </ul>

        <div v-if="timeLineList && timeLineList.length" class="timeLine">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in timeLineList" :key="index" color="#4168F6" type="danger ">
                    <div class="recordBox">
                        <div class="descTxt">{{ item.title }}</div>
                        <div v-if="item.punckStatus == 1 && item.title == '编辑' || item.punckStatus == 3" class="inLineTwo">
                            <div v-for="(i, iIndex) in JSON.parse(item.context)" :key="iIndex + i">
                                <p v-for="(j, jIndex) in Object.keys(i)" :key="jIndex + j" v-show="j.substr(0, 2) != '历史'" class="item-data">
                                    <span class="keys">{{ j }}: </span>
                                    <span>{{ Object.values(i)[jIndex] }}</span>
                                </p>
                                <p v-for="(j, jIndex) in Object.keys(i)" :key="jIndex + j + 1" v-show="j.substr(0, 2) == '历史'" class="item-data history-text">
                                    <span class="keys">{{ '(' + j }}: </span>
                                    <span>{{ Object.values(i)[jIndex] + ')' }}</span>
                                </p>
                            </div>
                        </div>
                        <div v-else class="inLineTwo">{{ item.context }}</div>
                        <div class="inLine">
                            <div class="inLineEnd">操作人：{{ item.userName }}</div>
                            <span class="time_right">{{ formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss") }}</span>
                        </div>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="noTimeLine" v-else>暂无此动态</div>
    </div>
</template>
<script>
import { SelectFollowMsgList } from '../../config/api'

import { formatDate } from '../../utils/tool'

export default {
    props: {
        comeType: {
            type: Number,
            default: 1
        },
        btnList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            showLoading: false,
            dynamicContentType: 1,
            dynamicNavList: [ '全部', '客户动态', '商机动态', '跟进记录' ],
            timeLineList: [],
            objItem: JSON.parse(localStorage.getItem('customer')),
        }
    },
    created() {
        this.comeType == 1 || this.comeType == 2 ? this.dynamicNavList[1] = '客户动态' : '线索动态'
    },
    inject: ['showCompany'],
    methods: {
        formatDate,
        // 动态导航切换
        changeDynamicNav(index) {
            this.dynamicContentType = index

            if(index == 0) { // 全部动态
                this.selectFollowMsgList('')
            } else if(index == 1) { // 客户动态
                this.selectFollowMsgList(2)
            } else if(index == 2) { // 商机
                this.selectFollowMsgList(3)
            } else if(index == 3) { // 跟进
                this.selectFollowMsgList(1)
            }
        },
        // 获取动态
        async selectFollowMsgList(punckStatus) {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                loadingType: 'spinner',
            })
            let params = {
                clueCustomerNo: this.objItem.clueCustomerNo,
                punckStatus // ''：全部动态，1：跟进动态，2：客户或线索动态，3：商机动态
            }

            let { code, data } = await SelectFollowMsgList(params)
            
            if(code == 'success') {
                this.timeLineList = data
            }
            this.$toast.clear()
        },
    },
}
</script>
<style lang="less" scoped>
.content-item {
    padding: 0 24px 24px;
}
.dynamic {
    font-size: 28px;
    position: relative;
    .t_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        margin-bottom: 24px;
        position: absolute;
        top: 0;
        right: 0;
        .label_tag {
            font-weight: 600;
            color: #3c4353;
            position: relative;
            padding-left: 10px;
            &::before {
                content: '';
                width: 8px;
                height: 28px;
                background: #4168f6;
                position: absolute;
                top: 7px;
                left: -10px;
            }
        }
        .editButton {
            color: #838a9d;
            width: 152px;
            height: 68px;
            border-radius: 8px;
            border: 2px solid #d9dae4;
            text-align: center;
            line-height: 68px;
            position: absolute;
            top: 0;
            right: 24px;
            span {
                display: inline-block;
            }
            img {
                display: inline-block;
                vertical-align: middle;
                margin: -10px 10px 0 0;
                margin-right: 5px;
                width: 28px;
                height: 28px;
            }
        }
    }
    .dynamic-nav {
        width: 100%;
        height: 40px;
        margin-bottom: 24px;
        li {
            display: inline-block;
            line-height: 40px;
            padding: 0 16px;
            vertical-align: middle;
            text-align: center;
            color: #3C4353;
            font-size: 28px;
            position: relative;
            &:not(:first-child)::before {
            content: '';
            width: 2px;
            height: 70%;
            background-color: #F0F2F7;
            position: absolute;
            left: 0;
            top: 15%;
            }
        }
        .active {
            color: #4168F6;
        }
    }

    .timeLine {
        .el-timeline {
            padding-left: 0 !important;
        }
        .recordBox {
            // width: 676px;
            min-height: 180px;
            background: rgba(65, 104, 246, 0.06);
            border-radius: 8px;
            color: #3c4353;
            padding: 16px;
            font-size: 28px;
            .inLine {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .time_right {
                    font-size: 28px;
                    color: #838a9d;
                }
                img {
                    width: 10px;
                    height: 10px;
                }
            }
            .inLineTwo {
                margin-bottom: 16px;
                display: inline-block;
                word-break: normal;
                word-break: break-all;
                word-break: keep-all;
                word-break: break-word;
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 2;
                // overflow: hidden;
                .item-data {
                    margin-bottom: 16px;
                    .keys {
                        margin-bottom: 8px;
                    }
                }
                .history-text {
                    color: #A2A5B4;
                }
            }
            .inLineEnd {
                text-align: right;
            }
            .descTxt {
                font-weight: 600;
                color: #3c4353;
                margin-bottom: 16px;
            }
        }
    }

    .noTimeLine {
        padding: 24px 0;
        text-align: center;
        font-size: 20px;
    }
}
.titleBox{
/*	width: 80px;*/
	height: 40px;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: bold;
	line-height: 40px;
	margin-bottom: 38px;
/*	margin-top: 36px;
	    padding-left: 28px;*/
}
.blueDiv{
	width: 8px;
	height: 25px;
	background: #4168F6;
	margin-right: 12px;
	display: inline-block;
}
</style>