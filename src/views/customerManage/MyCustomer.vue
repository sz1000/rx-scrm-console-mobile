<template>
    <div class="my-customer">
        <template v-if="!ifShowScreen">
            <header-title :navList="navList" :navActive="navActive"></header-title>
            <search :type="searchType"></search>

            <customer-list-box :listData="listData"></customer-list-box>
        </template>

        <screen v-else ref="screen" :navActive="navActive" @hideScreen="hideScreen"></screen>
    </div>
</template>
<script>
// import { _throttle } from '../../utils/tool'
import MyMixin from '../../mixins/permissionsList'
import HeaderTitle from '../../components/CustomerManage/headerTitle'
import Search from '../../components/CustomerManage/search'
import CustomerListBox from '../../components/CustomerManage/customerListBox'
import Screen from '../../components/CustomerManage/screen'

export default {
    mixins: [MyMixin],
    data() {
        return {
            ifShowScreen: false,
            navList: [{name: '我的客户', code: 'myCustomer'}, {name: '客户公海', code: 'customerSea'}],
            navActive: 'myCustomer',
            searchType: 0,
            listData: []
        }
    },
    created() {

    },
    provide() {
        return {
            goBack: this.goBack,
            changeNav: this.changeNav,
            doAdd: this.doAdd,
            checkTable: this.checkTable,
            showScreen: this.showScreen,
            goDetail: this.goDetail,
        }
    },
    methods: {
        changeNav(code, type) {
            if (code) {
                this.navActive = code
            } else {
                switch(type) {
                    case 0:
                        this.navActive = 'myCustomer'
                        break;
                    case 1:
                        this.navActive = 'customerSea'
                        break;
                }
            }

            if (this.navActive == 'myCustomer') {
                // 我的客户
                this.searchType = 0
            } else if (this.navActive == 'customerSea') {
                // 客户公海
                this.searchType = 1
            }
        },
        // 新增客户
        doAdd() {
            this.$router.push({ path: '/customerManage/addCustomer', query: { navActive: this.navActive } })
        },
        // 搜索
        checkTable(text) {
            console.log(text)
        },
        goBack() {
            this.$router.push('/home')
        },
        // 显示筛选面板
        showScreen() {
            this.ifShowScreen = true
        },
        hideScreen(data) {
            this.ifShowScreen = false
            console.log('筛选条件：', data)
        },
        goDetail(item, index) {
            localStorage.setItem('customer', JSON.stringify(item))
            if (this.type == 3) {
                this.$router.push({
                path: 'customDetail',
                query: { type: this.type, mylist: JSON.stringify(this.mylist) },
                })
            } else if (this.type == 4) {
                this.$router.push({
                path: 'customerSeas',
                query: { type: this.type, alllist: JSON.stringify(this.alllist) },
                })
            }
        },
    },
    components: {
        HeaderTitle,
        Search,
        CustomerListBox,
        Screen
    },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.my-customer {
    height: 100%;
    min-height: 100vh;
    background-color: @white;
}
</style>