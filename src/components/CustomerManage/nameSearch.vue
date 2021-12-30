<template>
    <div class="name-search" :class="{pt88: fromType == 2}">
        <header-title class="customer-title" :title="headerText" :needBackText="false" :needLine="true"></header-title>
        <div v-if="fromType == 1 || fromType == 2" class="search-box" :class="{mlt0: fromType == 2}">
            <div class="search-inp">
                <van-field v-model="searchParam" class="inp-box" placeholder="请输入客户名称" :border="false" @input="doSearch" @keyup.enter="doSearch"/>
                <img class="remove pointer" :src="require('@/assets/svg/icon_search_clear.svg')" alt="" @click="doClear">
            </div>
            <p v-if="hasPreciseData" class="tips">为了避免撞单，不允许添加完全相同名称的客户</p>
        </div>

        <div v-if="fromType == 3" class="name-box">线索名称：{{ searchParam }}</div>

        <name-search-list-box ref="nameSearchListBox" :fromType="fromType" :isWcCus="isWcCus" :customerType="customerType" :searchParam="searchParam" :checkedItem="checkedItem"></name-search-list-box>

        <div class="btn-box pointer">
            <div v-if="fromType == 1" class="btn-item" :class="{invalid: isInvalid}" @click="confirm(1)">确认保存</div>
            <div v-if="fromType == 2" class="btn-item" :class="{invalid: isInvalid}" @click="confirm(2)">下一步</div>
            <div v-if="fromType == 3 && !checkedItem" class="btn-item" :class="{invalid: isInvalid}" @click="confirm(3)">转为新客户</div>
            <div v-if="fromType == 3 && checkedItem" class="btn-item yellow" @click="confirm(4)">将线索与该客户合并</div>
        </div>
    </div>
</template>
<script>
import { cluecustomer_settingItem, cluecustomer_clueMergeToCustomer, cluecustomer_isWcCus } from '@/api/customer'
import HeaderTitle from '@/components/MaterialTemplate/headerTitle'
import NameSearchListBox from './nameSearchListBox'
import { throttle } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    props: {
        fromType: { // 1：编辑客户名称 2：新增客户 3：线索转客户
            default: 0
        },
        customerType: { // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: 0
        },
        clueCustomerNo: {
            default: ''
        },
    },
    data() {
        return {
            searchParam: '',
            hasPreciseData: false, // 是否有相同信息
            enableStatus: true, // 是否开启去重规则
            checkedItem: '', // 选中的客户
            isInvalid: true, // 是否禁止点击
            isWcCus: false,
        }
    },
    computed: {
        ...mapState(["corpId", "userNo"]),
        headerText() {
            if (this.fromType == 1) {
                return '编辑客户名称'
            } else if (this.fromType == 2) {
                if (this.customerType == 1 || this.customerType == 2) {
                    return '新增线索'
                }
                return '新增客户'
            } else if (this.fromType == 3) {
                return '找到相似客户'
            }
            return '编辑客户名称'
        },
    },
    provide() {
        return {
            doCheck: this.doCheck,
            ifHasPreciseData: this.ifHasPreciseData,
            goBack: this.goBack
        }
    },
    methods: {
        async show(data) {
            this.searchParam = data
            await this.getSettingItem()
            this.getIsWcCus()
        },
        // 判断是否开启自动去重规则
        async getSettingItem() {
            let { result, data } = await cluecustomer_settingItem('customer_duplicate_switch')

            if (result) {
                this.enableStatus = data.enableStatus
            }
        },
        // 是否是微信好友
        getIsWcCus() {
            let params = {
                userNo: this.userNo,
                customerNo: this.clueCustomerNo ? this.clueCustomerNo : '',
                corpId: this.corpId
            }

            cluecustomer_isWcCus(params).then((res) => {
                const { result, data } = res
                
                if(result) {
                    this.isWcCus = data
                }

                this.doSearch()
            }).catch(err => { console.log('err => ', err) })
        },
        doSearch() {
            this.$nextTick(() => {
                this.$refs.nameSearchListBox.doSearch(this.searchParam)
            })
        },
        ifHasPreciseData(data) {
            this.hasPreciseData = data
            if (data) {
                if (this.fromType == 1 && this.enableStatus || ((this.fromType == 2 || this.fromType == 3) && (!this.searchParam || this.enableStatus))) {
                    this.isInvalid = true
                } else {
                    this.isInvalid = false
                }
            } else {
                this.isInvalid = false
            }
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
            } else if (this.fromType == 3) {
                this.$router.go(-1)
            }
        },
        // 选中客户与否
        doCheck(item) {
            if (item == this.checkedItem) {
                this.checkedItem = ''
            } else {
                this.checkedItem = item
            }
        },
        // 提交
        confirm(type) {
            if(type == 1 || type == 2 || type == 3) {
                if (this.isInvalid) {
                    return
                }
                // 编辑客户名称、新增客户、线索转客户
                this.$emit('handleResult', this.searchParam)
            } else if(type == 4) {
                // 线索合并客户
                console.log("选中的客户：", this.checkedItem)
                if (!this.checkedItem) {
                    return
                }
                this.doMerge()
            }
        },
        doMerge() {
            if(!throttle(3000)) {
                return
            }

            let params = {
                clueNo: this.clueCustomerNo,
                customerNo: this.checkedItem
            }

            cluecustomer_clueMergeToCustomer(params).then(res => {
                let { result, msg } = res

                if (result) {
                    this.$toast("合并成功")
                    setTimeout(() => {
                        this.$router.push('/customerManage/clues')
                    }, 500)
                } else {
                    this.$toast(msg)
                }
            })
        }
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
        .name-box {
            margin: 32px 32px 0;
            color: @fontSub3;
            font-size: 28px;
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
                &.yellow {
                    background: @yellow2;
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