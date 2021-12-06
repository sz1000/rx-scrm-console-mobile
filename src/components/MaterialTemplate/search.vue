<template>
    <div class="search">
        <div class="search-box">
            <input class="text" type="text"   v-model="searchText" :placeholder="type | getText">
            <div class="icon pointer" @click="checkTable(searchText)">
                <img src="../../images/search.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {
        type: Number,
        default: 0
    },
    data() {
        return {
            searchText: ''
        }
    },
    inject: ['checkTable'],
    filters: {
        getText(type) {
            let text = ''
            switch(type) {
                case 0:
                    text = '请输入文章标题'
                    break;
                case 1:
                    text = '请输入文件名称'
                    break;
                case 2:
                    text = '请输入海报名称'
                    break;
            }
            return text
        }
    }
}
</script>
<style lang="less" scoped>
.search{
    padding: 32px;
    .search-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 68px;
        padding: 0 0 0 32px;
        background-color: #F7F8FA;
        border-radius: 16px;
        .text {
            height: 40px;
            line-height: 40px;
            margin: 14px 0;
            border: none;
            background-color: transparent;
            font-size: 28px;
        }
        .icon {
            width: 60px;
            line-height: 68px;
            margin-left: 16px;
            img {
                width: 28px;
                height: 28px;
            }
        }
    }
}
</style>