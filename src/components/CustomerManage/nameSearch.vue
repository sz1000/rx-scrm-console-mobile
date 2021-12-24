<template>
    <div class="name-search">
        <header-title class="customer-title" :title="headerText" :needBackText="false" :needLine="true"></header-title>
        <div class="search-box">
            <div class="search-inp">
                <van-field v-model="searchParam" class="inp-box" placeholder="请输入客户名称" :border="false" @input="doSearch" @keyup.enter="doSearch"/>
                <img class="remove pointer" :src="require('@/assets/svg/icon_search_clear.svg')" alt="" @click="doClear">
            </div>
            <p v-if="hasPreciseData" class="tips">为了避免撞单，不允许添加完全相同名称的客户</p>
        </div>

        <name-search-list-box ref="nameSearchListBox" :fromType="fromType" :searchParam="searchParam" @ifIsInvalid="ifIsInvalid" @ifHasPreciseData="ifHasPreciseData"></name-search-list-box>

        <div class="btn-box pointer">
            <div class="btn-item" :class="{invalid: this.isInvalid}">确认保存</div>
        </div>
    </div>
</template>
<script>
// import { cluecustomer_elasticSearch } from '@/api/customer'
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import NameSearchListBox from './nameSearchListBox'

export default {
    props: {
        fromType: { // 1：编辑客户名称 2：新增客户 3：线索转客户
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            searchParam: '',
            isInvalid: false,
            hasPreciseData: false,
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
        show(data) {
            this.searchParam = data
            this.doSearch()
        },
        doSearch() {
            this.$nextTick(() => {
                this.$refs.nameSearchListBox.doSearch(this.searchParam)
            })
        },
        ifIsInvalid(data) {
            this.isInvalid = data
        },
        ifHasPreciseData(data) {
            this.hasPreciseData = data
        },
        doClear() {
            this.searchParam = ''
            this.$refs.nameSearchListBox.initData()
        },
        goBack(data) {
            this.$emit('handleResult', data)
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
</style>