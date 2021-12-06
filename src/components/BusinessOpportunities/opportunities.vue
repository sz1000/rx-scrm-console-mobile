<template>
    <div class="opportunities" :class="{'pd0':isPortrait}">
        <!--<div class="t_text">
          <span class="label_tag">商机</span>
          <div class="editButton" @click="handleEdit">
            <van-icon name="add-o" class="img" />
            <span>添加</span>
          </div>
        </div>-->
        <el-button class="addBtn" :class="{'right-0':isPortrait}" size="small" type="primary" @click="handleEdit">
	  		<i class="el-icon-circle-plus-outline"></i><span>添加</span>
	  	</el-button>
        <div class="titleBox">
			<span class="blueDiv">
				
			</span>
			<span class="titleFujian">商机</span>
		</div>
		
		<!--<div class="editButton" @click="handleEdit">
            <van-icon name="add-o" class="img" />
            <span>添加</span>
        </div>-->
		
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
                        <span class="value one-line">{{ i.price ? handleMoney(i.price) : '' }}</span>
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
        <edit-opportunity ref="editOpportunity" :customerNo="customerNo" :fromType="fromType" @sure="callbackFun"></edit-opportunity>
        <!-- 删除 -->
        <delete-dialog ref="deleteDialog"></delete-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import opportunityMixin from '../../mixins/opportunity'
import { DeleteOpportunities } from '../../config/api'
import { formatDate, handleMoney } from '../../utils/tool'

import EditOpportunity from './dialog/editOpportunity'
import deleteDialog from './dialog/delete'

export default {
    mixins: [opportunityMixin],
    props: {
        customerNo: {
            type: String,
            default: ''
        },
        fromType: {
            default: '3'
        },
        isPortrait: {   //是否是客户画像（padding置空判断用）
            type: Boolean,
            default: false
        },
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
        handleMoney,
        handleEdit(data) {
            this.$refs.editOpportunity.show(data)
        },
        deleteRow(id) {
            this.$refs.deleteDialog.show(id)
        },
        async doDelete(id) {
            const {code, msg} = await DeleteOpportunities(id)
            if (code === 'success') {
                this.opportunitiesList()
                this.$toast(msg)
                this.$refs.deleteDialog.hide()
                this.callbackFun()
            } else {
                this.$toast(msg)
            }
        },
        handleStage(item) {
            localStorage.setItem("JZSCRM_OPPORTUNITIES_ITEM", JSON.stringify(item))

            this.$router.push({
                path: '/customerManage/stageList',
                query: { id: item.id, fromType: this.fromType, customerNo: this.customerNo },
            })
        },
        callbackFun(){  //商机数量变更回调
            if(this.fromType == '3'){
                this.$emit('sure')
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
        EditOpportunity,
        deleteDialog
    }
}
</script>
<style lang="less" scoped>
.opportunities {
	position: relative;
    padding: 0 24px 24px;
    &.pd0{
        padding: 0;
    }
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
                line-height: 68px;
                font-size: 28px;
            }
            .img {
                line-height: 68px;
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
                max-width: 80%;
                word-break: break-all;
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
                        width: 216px;
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
.addBtn{
    color: #838a9d !important;
    width: 124px;
    height: 68px;
    border-radius: 8px;
    border: 2px solid #d9dae4 !important;
    text-align: center;
    position: absolute;
    background: #FFFFFF !important;
    font-size: 30px;
    top: 0;
}
.addBtn{
	right: 32px;
}
.right-0 {
    right: 0;
}
/deep/.delBtn span, .addBtn span{
	position: relative;
    right: 9px;
}
.addBtn span{
	right: 20px;
}
/deep/.delBtn i, .addBtn i{
	position: relative;
    right: 3px;
}
/deep/.addBtn i{
	right: 14px;
}
</style>