<template>
    <div class="content-item dynamic">
    	<div class="titleBox">
			<span class="blueDiv">
				
			</span>
			<span class="titleFujian">客户动态</span>
		</div>
        <div class="t_text">
            <div v-show="comeType == 1 && btnList.some(item=>item.enName == 'write') || isPortrait == 1" class="editButton" @click="showCompany(3)">
                <img src="../../images/icon_repair1@2x.png" alt="" />
                <span>写跟进</span>
            </div>
        </div>

        <ul class="dynamic-nav">
            <li v-for="(i, index) in dynamicNavList" :key="i" @click="changeDynamicNav(index)" :class="{active: dynamicContentType == index, 'red-point': isPortrait == 1 && i == '消息通知' && showRedPoint}">{{ i }}</li>
        </ul>

        <div v-if="timeLineList && timeLineList.length" class="timeLine">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in timeLineList" :key="index" color="#4168F6" type="danger ">
                    <div class="recordBox">
                        <template v-if="item.punckStatus == 4">
                            <div class="send-user">
                                <div class="left" @click="fillMessage(JSON.parse(item.context).sendUserInfo)">
                                    <img :src="JSON.parse(item.context).sendUserInfo.avatar" alt="">
                                    <span><span class="name">{{ JSON.parse(item.context).sendUserInfo.userName }}</span><span v-if="sendUserInfo && (sendUserInfo.userNo == JSON.parse(item.context).sendUserInfo.userNo)">(我)</span></span>
                                </div>
                                <span class="right">{{ item.createTime }}</span>
                            </div>
                            <div class="message-content">
                                <span v-for="i in JSON.parse(item.context).receiveUserInfo" :key="i.userNo" class="name-box">
                                    <span @click="fillMessage(i)">@{{ i.userName }}<span v-if="sendUserInfo && (sendUserInfo.userNo == i.userNo)">(我)</span></span>
                                </span>
                                {{ JSON.parse(item.context).content }}
                            </div>
                        </template>
                        <template v-else>
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
                        </template>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="noTimeLine" v-else>暂无此动态</div>
    </div>
</template>
<script>
import { SelectFollowMsgList, UserMessageReceive } from '../../config/api'

import { formatDate } from '../../utils/tool'

export default {
    props: {
        comeType: {
            type: Number,
            default: 1
        },
        btnList: {
            type: Array,
            default() {
                return []
            }
        },
        isPortrait: {
            type: Number,
            default: 0
        },
        sendUserInfo: {
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            showLoading: false,
            dynamicContentType: 0,
            dynamicNavList: [ '全部', '客户动态', '商机动态', '跟进记录' ],
            timeLineList: [],
            objItem: this.isPortrait == 1 ? JSON.parse(localStorage.getItem('ISPORTRIAT_customer')) : JSON.parse(localStorage.getItem('customer')),
            showRedPoint: false
        }
    },
    created() {
        this.init()
    },
    inject: ['showCompany', 'showGuideBox'],
    methods: {
        init() {
            this.comeType == 1 || this.comeType == 2 ? this.dynamicNavList[1] = '客户动态' : '线索动态'

            if (this.isPortrait == 1) {
                this.dynamicNavList[3] = '消息通知'
                this.userMessageReceive()
            }
            this.selectFollowMsgList('')
        },
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
            } else if(index == 3) { // 跟进/消息通知
                if (this.isPortrait == 1) {
                	try{
                		    	console.log('this.showGuideBox(1)---suc----')
                		this.showGuideBox(1)
                	}catch(err){
                		console.log('this.showGuideBox(1)---err---->',err)
                	}       
                    this.selectFollowMsgList(4) // 消息通知
                    this.showRedPoint = false
                    return
                }
                this.selectFollowMsgList(1) // 跟进
            }
        },
        // 获取动态
        async selectFollowMsgList(punckStatus) {
            this.$toast.loading({
                message: '',
                forbidClick: true,
                duration: 0,
                loadingType: 'spinner',
            })
            let params = {
                clueCustomerNo: this.objItem && this.objItem.clueCustomerNo,
                punckStatus // ''：全部动态，1：跟进动态，2：客户或线索动态，3：商机动态
            }

            let { code, data } = await SelectFollowMsgList(params)
            
            if(code == 'success') {
                this.timeLineList = data.dataList.records
            }
            this.$toast.clear()
        },
        // 是否有新消息
        async userMessageReceive() {
            let { code, data } = await UserMessageReceive(this.objItem && this.objItem.clueCustomerNo)

            if (code == 'success') {
                this.showRedPoint = data
            }
        },
        // @接收人
        fillMessage(data) {
            this.$emit('fillMessage', data)
        }
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
        .red-point {
            position: relative;
            &::after {
                content: '';
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #D14343;
                position: absolute;
                right: 0;
                top: -4px;
            }
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

            .send-user {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 8px 4px 21px;
                .left {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 47%;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 28px;
                        color: #3C4353;
                        span {
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                    .name {
                        max-width: 70%;
                        margin-left: 10px;
                    }
                }
                .right {
                    font-size: 28px;
                    color: #838A9D;
                }
            }
            .message-content {
                word-break: break-all;
                font-size: 28px;
                color: #3C4353;
                .name-box {
                    span {
                        color: #4168F6;
                    }
                }
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