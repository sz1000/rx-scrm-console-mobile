<template>
    <div class="search">
        <div class="search-box">
            <div class="icon">
                <img src="../../images/search.png" alt="">
            </div>
            <form action="Javascript: ;">
                <input class="text" type="search" autocomplete="off" v-model="searchText" :placeholder="type | getText" @keydown.enter="checkTable(searchText)" @change="resetSearch">
            </form>
        </div>
        <div class="screen pointer" @click="showScreen">
            <div class="icon">
                <img src="@/assets/svg/icon_screen.svg" alt="">
            </div>
            <span class="text">筛选</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {
        type: {
            default: 0
        }
    },
    data() {
        return {
            searchText: ''
        }
    },
    inject: ['checkTable', 'changeNav', 'showScreen'],
    methods: {
        resetSearch(v) {
            if (!v) {
                this.changeNav('', this.type)
            }
        }
    },
    filters: {
        getText(type) {
            let text = ''

            switch(type) {
                case 0:
                    text = '客户名称/企业名称/联系人/手机号码'
                    break;
                case 1:
                    text = '客户名称/企业名称/联系人'
                    break;
            }
            return text
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.search{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    margin-top: 32px;
    background-color: @white;
    .search-box {
        display: flex;
        align-items: center;
        height: 72px;
        padding: 0 24px 0 0;
        background-color: @navBg;
        border-radius: 8px;
        .icon {
            min-width: 72px;
            line-height: 72px;
            img {
                width: 36px;
                height: 36px;
                margin: 0 auto;
            }
        }
        .text {
            width: 462px;
            height: 40px;
            line-height: 40px;
            margin: 16px 0;
            border: none;
            background-color: transparent;
            font-size: 28px;
        }
    }
    .screen {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 80px;
        .icon {
            min-width: 32px;
        }
        .text {
            margin-left: 12px;
            color: @fontSub3;
            font-size: 28px;
        }
    }
}
</style>