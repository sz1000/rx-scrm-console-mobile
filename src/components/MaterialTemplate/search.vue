<template>
    <div class="search">
        <input type="text" v-model="searchText" :placeholder="type | getText">
        <span @click="checkTable(searchText)">查询</span>
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
.search {
    display: flex;
    padding: 24px;
    input {
        width: 582px;
        height: 80px;
        padding: 0 24px;
        border-radius: 8px;
        border: 1px solid #D9DAE4;
    }
    input::-webkit-input-placeholder {
        color: #C0C4CC; 
    } 
    input:-moz-placeholder {
        color: #C0C4CC; 
    } 
    input::-moz-placeholder {
        color: #C0C4CC; 
    } 
    input:-ms-input-placeholder {
        color: #C0C4CC; 
    }
    span {
        width: 104px;
        height: 80px;
        line-height: 80px;
        margin-left: 16px;
        border-radius: 8px;
        background-color: #4168F6;
        color: #fff;
        text-align: center;
    }
}
</style>