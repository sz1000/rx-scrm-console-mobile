<template>
    <div class="my-customer">
        <template v-if="!ifShowScreen">
            <header-title :navList="navList" :navActive="navActive" :showAdd="showAdd"></header-title>
            <search ref="search" :customerType="customerType"></search>

            <customer-list-box ref="customerListBox" :customerType="customerType" :jurisdictionList="jurisdictionList" :form="form" :searchParam="searchParam"></customer-list-box>
        </template>

        <screen v-else ref="screen" :customerType="customerType" @hideScreen="hideScreen"></screen>
    </div>
</template>
<script>
import MyMixin from '@/mixins/permissionsList'
import HeaderTitle from '@/components/CustomerManage/headerTitle'
import Search from '@/components/CustomerManage/search'
import CustomerListBox from '@/components/CustomerManage/customerListBox'
import Screen from '@/components/CustomerManage/screen'
import { mapActions } from 'vuex'

export default {
    mixins: [MyMixin],
    data() {
        return {
            customerType: '3', // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            ifShowScreen: false,
            navList: [{name: '我的客户', code: 'myCustomer'}, {name: '客户公海', code: 'customerSea'}],
            navActive: 'myCustomer',

            form: {}, // 搜索筛选条件表单
            searchParam: '', // 搜索框输入的内容
            jurisdictionList: {}, // 按钮权限列表
        }
    },
    computed: {
        showAdd() { // 是否显示新增按钮
            return this.customerType == '3' && this.jurisdictionList.myCustomer && this.jurisdictionList.myCustomer.some(item => item.enName == 'add')
        }
    },
    created() {
        this.getCorpId()
        this.$nextTick(() => {
            this.getJurisdictionList()
            this.$refs.customerListBox.getList()
        })
    },
    provide() {
        return {
            goBack: this.goBack,
            changeNav: this.changeNav,
            doAdd: this.doAdd,
            checkTable: this.checkTable,
            showScreen: this.showScreen,
        }
    },
    methods: {
        ...mapActions(["getCorpId"]),
        // 获取按钮权限列表
        getJurisdictionList() {
            for (let i in this.expandedKeys) {
                this.jurisdictionList[this.expandedKeys[i].enName] = this.expandedKeys[i].childrenList
            }
            console.log('权限列表: ', this.jurisdictionList)
        },
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
                this.customerType = '3'
            } else if (this.navActive == 'customerSea') {
                // 客户公海
                this.customerType = '4'
            }
            this.clearSearch()
            this.getList()
        },
        clearSearch() {
            this.form = {}
            this.searchParam = ''
            this.$nextTick(() => {
                this.$refs.search.searchText = ''
            })
        },
        getList() {
            this.$nextTick(() => {
                this.$refs.customerListBox.initData()
                if (this.searchParam) {
                    this.$refs.search.searchText = this.searchParam
                }
                this.$refs.customerListBox.getList()
            })
        },
        // 新增客户
        doAdd() {
            this.$router.push({ path: '/customerManage/addCustomer', query: { fromType: this.customerType } })
        },
        // 搜索
        checkTable(text) {
            this.searchParam = text
            console.log('最终筛选条件：', this.form)
            this.getList()
        },
        goBack() {
            this.$router.push('/home')
        },
        // 显示筛选面板
        showScreen() {
            this.ifShowScreen = true
            this.$nextTick(() => {
                this.$refs.screen.show(this.form)
            })
        },
        hideScreen(data) {
            const { optNum, params } = data
            
            if (optNum == 1 || optNum == 2) {
                this.form = params
            } else {
                this.form = this.form ? this.form : params
            }
            this.ifShowScreen = false
            this.checkTable(this.searchParam)
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