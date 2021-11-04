<template>
    <div class="reminders-box">
        <van-popup
            v-model="remindersBoxDialogVisible"
            round
            position="bottom"
            class="reminders-box-pop"
            :close-on-click-overlay="false"
            closeable
            @closed="hide">
            <div class="title">选择提醒的人</div>
            <div class="content">
                <form action="/"><van-search v-model="searchText" class="search-box" placeholder="请输入搜索关键词" @search="getList" @blur="getList"/></form>

                <van-index-bar :index-list="indexList" highlight-color="#4168f6">
                    <div v-if="peopleList && peopleList.length" class="all-people" @click="getPeople(allPeople)">
                        <span class="img">
                            <img src="../../../assets/images/icon_peoples.png" alt="">
                        </span>
                        <span>所有人</span>
                    </div>
                    <div class="item" v-for="i in peopleList" :key="i.id">
                        <van-index-anchor :index="i.initials" />
                        <div class="item-content all-people" v-for="item in i.userInfoVos" :key="item.userNo" @click="getPeople(item)">    
                            <span class="img">
                                <img :src="item.avatar" alt="">
                            </span>
                            <span class="name">{{ item.userName }}</span>
                        </div>
                    </div>
                </van-index-bar>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { ReceiveUser } from '../../../config/api'
import { mapState } from 'vuex'
 
export default {
    props: {
        customerNo: {
            default: ''
        },
        fromType: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            remindersBoxDialogVisible: false,
            searchText: null,
            indexList: [],
            peopleList: [],
            allPeople: {
                userName: '所有人',
                userNo: '9999999',
            }
        }
    },
    computed: {
        ...mapState(["corpId"]),
    },
    inject: ['getPeople'],
    methods: {
        show() {
            this.getList()
            this.remindersBoxDialogVisible = true
        },
        hide() {
            this.searchText = ''
            this.indexList = []
            this.peopleList = []
            this.remindersBoxDialogVisible = false
        },
        async getList() {
            let params = {
                customerNo: this.customerNo,
                isPublic: this.fromType == '4' ? true : false,
                corpId: this.corpId
            }

            let { code, data } = await ReceiveUser(params)

            if (code == 'success') {
                if (!data || data && !data.length) {
                    this.indexList = []
                    this.peopleList = []
                    this.$toast('暂无人员信息')
                    return
                }
                this.peopleList = data
                this.peopleList.map(item => {
                    this.indexList.push(item.initials)
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.reminders-box {
    .reminders-box-pop {
        max-height: 85%;
        min-height: 80%;
        padding: 0 0 24px;
        overflow-y: auto;
        .title {
            height: 88px;
            line-height: 88px;
            background-color: #fafbff;
            border-radius: 16px 16px 0px 0px;
            text-align: center;
            font-size: 28px;
            color: #3c4353;
            font-weight: 600;
        }
        .content {
            /deep/ .van-index-bar__sidebar {
                top: 65%;
            }
            /deep/ .van-index-anchor {
                height: 44px;
                line-height: 44px;
                background-color: #F6F7F9;
            }
            .search-box {
                padding: 24px;
                background-color: #F6F7F9;
                /deep/ .van-search__content {
                    background-color: #fff;
                }
            }
            .all-people {
                padding: 21px 24px;
                span {
                    display: inline-block;
                    vertical-align: middle;
                }
                .img {
                    width: 70px;
                    height: 70px;
                    background-color: #4168F6;
                    border-radius: 50%;
                    margin-right: 16px;
                    img {
                        width: 40px;
                        height: 40px;
                        margin: 15px auto;
                    }
                }
            }
            .item {
                .item-content {
                    position: relative;
                    .img {
                        background-color: #fff;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                            margin: 0;
                        }
                    }
                    &:not(:last-child)::after {
                        content: '';
                        width: 86%;
                        height: 2px;
                        background-color: #F6F7F9;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                    .name {
                        max-width: 80%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}
</style>