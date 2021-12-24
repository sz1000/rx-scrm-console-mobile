<template>
    <div class="name-search" :class="{pt88: fromType == 2}">
        <header-title class="customer-title" :title="headerText" :needBackText="false" :needLine="true"></header-title>
        <div class="search-box" :class="{mlt0: fromType == 2}">
            <div class="search-inp">
                <van-field v-model="searchParam" class="inp-box" placeholder="请输入客户名称" :border="false" @input="doSearch" @keyup.enter="doSearch"/>
                <img class="remove pointer" :src="require('@/assets/svg/icon_search_clear.svg')" alt="" @click="doClear">
            </div>
            <p v-if="hasPreciseData" class="tips">为了避免撞单，不允许添加完全相同名称的客户</p>
        </div>

        <name-search-list-box ref="nameSearchListBox" :fromType="fromType" :searchParam="searchParam" @ifHasPreciseData="ifHasPreciseData"></name-search-list-box>

        <div class="btn-box pointer">
            <div v-if="fromType == 1" class="btn-item" :class="{invalid: hasPreciseData && enableStatus}" @click="confirm(1)">确认保存</div>
            <div v-if="fromType == 2" class="btn-item" :class="{invalid: !searchParam || (hasPreciseData && enableStatus)}" @click="confirm(2)">下一步</div>
        </div>
    </div>
</template>
<script>
import { cluecustomer_settingItem } from '@/api/customer'
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import NameSearchListBox from './nameSearchListBox'

export default {
    props: {
        fromType: { // 1：编辑客户名称 2：新增客户 3：线索转客户
            default: 0
        },
        customerType: {// 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: 0
        }
    },
    data() {
        return {
            searchParam: '',
            hasPreciseData: false, // 是否有相同信息
            enableStatus: true, // 是否开启去重规则
        }
    },
    computed: {
        headerText() {
            if (this.fromType == 1) {
                return '编辑客户名称'
            } else if (this.fromType == 2) {
                return '新增客户'
            } else if (this.fromType == 3) {
                return '找到相似客户'
            }
            return '编辑客户名称'
        },
    },
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        async show(data) {
            this.searchParam = data
            await this.getSettingItem()
            this.doSearch()
        },
        // 判断是否开启自动去重规则
        async getSettingItem() {
            let { result, data } = await cluecustomer_settingItem('customer_duplicate_switch')

            if (result) {
                this.enableStatus = data.enableStatus
            }
        },
        doSearch() {
            this.$nextTick(() => {
                this.$refs.nameSearchListBox.doSearch(this.searchParam)
            })
        },
        ifHasPreciseData(data) {
            this.hasPreciseData = data
        },
        doClear() {
            this.searchParam = ''
            this.$refs.nameSearchListBox.initData()
        },
        goBack() {
            if (this.fromType == 1) {
                this.$emit('hideNameSearch')
            } else if (this.fromType == 2) {
                let path = this.customerType == 3 || this.customerType == 4 ? '/customerManage/myCustomer' : '/customerManage/clues'
            
                this.$router.push({ path })
            }
        },
        confirm(type) {
            if ((type == 1 || type == 2) && this.hasPreciseData && this.enableStatus) {
                return
            }
            if (type == 2 && !this.searchParam) {
                return
            }
            this.$emit('handleResult', this.searchParam)
        },
    },
    components: {
        HeaderTitle,
        NameSearchListBox
    }
}
</script>
<style lang="less" scoped>
@import url('@/styles/color');
    .name-search {
        padding-bottom: 160px;
        .customer-title {
            position: fixed;
            top: 0;
        }
        .search-box {
            margin: 32px 32px 0;
            .search-inp {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 2px solid @main;
                .inp-box {
                    padding: 10px 0;
                    font-size: 28px;
                    color: @fontSub3;
                }
                .remove {
                    width: 32px;
                    height: 32px;
                }
            }
            .tips {
                margin: 16px 0 40px;
                color: @red;
                font-size: 24px;
            }
        }
        .btn-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 10rem;
            padding: 32px;
            background-color: @white;
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            .btn-item {
                width: 686px;
                height: 96px;
                line-height: 96px;
                border-radius: 20px;
                font-size: 32px;
                text-align: center;
                background-color: @main;
                color: @white;
                &.invalid{
                    background: rgba(65, 104, 246, .4);
                }
            }
        }
    }
    .pt88 {
        padding-top: 88px;
        .mlt0 {
            margin: 32px 0 0;
        }
    }
</style>