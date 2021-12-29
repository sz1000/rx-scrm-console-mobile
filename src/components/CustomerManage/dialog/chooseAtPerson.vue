<template>
    <van-popup
        v-model="visible"
        round
        position="bottom"
        class="choose-at-person"
        :close-on-click-overlay="false"
        closeable
        @closed="hide">
        <div class="title">选择@的员工</div>
        <div class="content">
            <form action="/"><van-search v-model="searchText" class="search-box" placeholder="搜索员工用户名" @input="doSearch"/></form>

            <div v-if="peopleList && peopleList.length" class="all-people-box all-people pointer">
                <div class="left-box">
                    <span class="img">
                        <img src="../../../assets/images/icon_peoples.png" alt="">
                    </span>
                    <span class="name">所有人</span>
                </div>
                <div class="list-item-check" :class="{checked: checkedUserNo && checkedUserNo.length && checkedUserNo.some(v => v == allPeople.userNo)}" @click="doCheck(allPeople)"></div>
            </div>
            <div class="people-list pointer" v-for="i in peopleList" :key="i.id">
                <div class="item-content all-people" v-for="item in i.userInfoVos" :key="item.userNo">
                    <div class="left-box">
                        <span class="img">
                            <img :src="item.avatar | $setAvatar" alt="">
                        </span>
                        <span class="name one-line">{{ item.userName }}</span>
                    </div>
                    <div class="list-item-check" :class="{checked: checkedUserNo && checkedUserNo.length && checkedUserNo.some(v => v == item.userNo)}" @click="doCheck(item)"></div>
                </div>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn-item" :class="{invalid: !(checkedUserNo && checkedUserNo.length)}" @click="confirm">确定</div>
        </div>
    </van-popup>
</template>

<script>
import { ReceiveUser } from '@/config/api'
import { _debounce } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
    name: 'chooseAtPerson',
    props: {
        customerNo: {
            default: ''
        },
        fromType: { // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: '1'
        }
    },
    data(){
        return {
            visible: false,
            searchText: '',
            peopleList: [],
            allPeople: {
                userName: '所有人',
                userNo: '9999999',
            },
            checkedUserNo: [], // 选中的userNo
            checkedList: [],
            checkedPeople: [], // 选中的员工（信息全）
        }
    },
    computed: {
        ...mapState(["corpId"]),
    },
    inject: ['getPeople'],
    methods: {
        show() {
            this.getList()
            this.visible = true
        },
        hide() {
            Object.assign(this.$data, this.$options.data())
            this.visible = false
        },
        doSearch() {
            _debounce(this.getList(), 1000)
        },
        async getList() {
            let params = {
                customerNo: this.customerNo,
                isPublic: this.fromType == '4' ? true : false,
                corpId: this.corpId,
                userName: this.searchText
            }

            let { code, data } = await ReceiveUser(params)

            if (code == 'success') {
                if (!data || data && !data.length) {
                    this.peopleList = []
                    this.$toast('暂无人员信息')
                    return
                }
                this.peopleList = data
            }
        },
        doCheck(item) {
            this.checkedList.push(item)

            let index = this.checkedUserNo.indexOf(item.userNo)

            if (index > -1) {
                this.checkedUserNo.splice(index, 1)
            } else {
                this.checkedUserNo.push(item.userNo)
            }
        },
        confirm() {
            if (!(this.checkedUserNo && this.checkedUserNo.length)) {
                return
            }
            let arr = this.checkedList

            this.checkedList = this.resetCheckedList(arr)
            
            this.checkedList.map(item => {
                this.checkedUserNo.map(i => {
                    if (item.userNo == i) {
                        this.checkedPeople.push(item)
                    }
                })
            })
            this.getPeople(this.checkedPeople)
        },
        resetCheckedList(arr) {
            let newArr = []
            
            for (let i = 0; i < arr.length; i++) {
                if (this.noHas(newArr, arr[i].userNo)) {
                    newArr.push(arr[i])
                }
            }
            return newArr
        },
        noHas(arr, userNo) {
            let result = arr.filter((item) =>{
                return item.userNo == userNo;
            })
            return result.length == 0 ? true : false;
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.choose-at-person {
    max-height: 85%;
    min-height: 80%;
    padding: 0 0 24px;
    overflow-y: auto;
    .title {
        height: 88px;
        line-height: 88px;
        border-radius: 16px 16px 0px 0px;
        text-align: center;
        font-size: 28px;
        color: #3c4353;
        font-weight: 600;
    }
    .content {
        padding-bottom: 144px;
        /deep/ .van-index-bar__sidebar {
            top: 65%;
        }
        /deep/ .van-index-anchor {
            height: 44px;
            line-height: 44px;
            background-color: #F6F7F9;
        }
        .search-box {
            padding: 32px;
            /deep/ .van-search__content {
                background-color: @navBg;
            }
        }
        .all-people {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 32px;
            .left-box {
                width: calc(100% - 90px);
                span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .img {
                width: 64px;
                min-width: 64px;
                height: 64px;
                margin-right: 16px;
                background-color: #4168F6;
                border-radius: 50%;
                img {
                    width: 34px;
                    height: 34px;
                    margin: 15px auto;
                }
            }
            .name {
                width: calc(100% - 130px);
            }
            .list-item-check {
                width: 40px;
                min-width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid @placeholder;
                &.checked {
                    background-color: @main;
                    border-color: @main;
                    position: relative;
                    &::before{
                        content: '';
                        width: 8px;
                        height: 15px;
                        border-bottom: 6px solid @white;
                        border-right: 6px solid @white;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                }
            }
        }
        .all-people-box {
            position: relative;
            &::after {
                content: '';
                height: 2px;
                background-color: @lineColor;
                position: absolute;
                bottom: 0;
                right: 32px;
                left: 32px;
            }
        }
        .people-list {
            margin-top: 20px;
            .item-content {
                position: relative;
                .img {
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        border-radius: 50%;
                    }
                }
                .name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
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