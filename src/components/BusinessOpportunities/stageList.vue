<template>
  <div class="stage-list">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">选择商机阶段</span>
    </div>

    <div class="stage-list-box">
        <div v-for="i in stageListOptions" :key="i.sortNo" class="item" @click="changeRow(i)">{{ i.stageName }}</div>
    </div>

    <!-- 更改商机阶段 -->
    <change-stage ref="changeStage"></change-stage>
    <!-- 确认结束商机 -->
    <confirm-result ref="confirmResult" :customerNo="customerNo"></confirm-result>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import opportunityMixin from '../../mixins/opportunity'
import { ModifyOpportunitiesStatus } from '../../config/api'
import ChangeStage from './dialog/changeStage'
import ConfirmResult from './dialog/confirmResult'

export default {
    mixins: [opportunityMixin],
    data() {
        return {
            stageListOptions: [], // 商机列表中的阶段选项
            params: {},
            opportunityId: null,
            customerNo: null,
        }
    },
    provide() {
        return {
            doChange: this.doChange,
        }
    },
    async created() {
        const { id, customerNo } = this.$route.query

        this.opportunityId = id
        this.customerNo = customerNo
        await this.getCorpId()
        this.opportunitiesStageList(this.getStageListOptions, '', '')
    },
    methods: {
        ...mapActions(["getCorpId"]),
        getStageListOptions(data) {
            this.stageListOptions = data
        },
        goBack() {
            this.$router.go(-1)
        },
        changeRow(data) {
            this.$refs.changeStage.show(data)
        },
        async doChange(data) {
            console.log("opportunityId111:::", this.opportunityId)

            this.params = {
                id: this.opportunityId,
                stageNo: data.sortNo
            }
            let { code, msg } = await ModifyOpportunitiesStatus(this.params)

            if (code == 'success') {
                this.$toast(msg)
                this.goBack()
            } else {
                this.$toast(msg)
            }
        },
    },
    components: {
        ChangeStage,
        ConfirmResult
    }
}
</script>
<style lang="less" scoped>
.stage-list {
    min-height: 100vh;
    background-color: #fff;
    .headerTitle {
        background: #fff;
        padding: 0 24px;
        font-weight: 600;
        display: flex;
        height: 87px;
        line-height: 87px;
        font-size: 28px;
        color: #3c4353;
        border-top: 1px solid #f0f2f7;
        border-bottom: 1px solid #f0f2f7;
        .backPage {
        width: 150px;
        .van-icon {
            vertical-align: -10%;
            width: 28px;
            height: 28px;
        }
        }
        .textTitle {
        flex: 1;
        display: inline-block;
        padding-left: 150px;
        }
    }
    .stage-list-box {
        .item {
            height: 90px;
            line-height: 90px;
            border: 2px solid #F0F2F7;
            text-align: center;
            color: #262626;
            font-size: 28px;
        }
    }
}
</style>