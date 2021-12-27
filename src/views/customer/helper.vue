<template>
    <div class="helper_wrap">
        <div class="top_back" @click="$router.go(-1)">
            <img class="icon" src="@/assets/svg/icon_back.svg" alt="">
            <div class="title">跟进人</div>
        </div>
        <div class="content">
            <div class="item_box" v-if="!this.fromType && obj">
                <div class="tit">负责人</div>
                <div class="item trans">
                    <img class="avatar" :src="obj.avatar | $setAvatar" alt="">
                    <div class="val">
                        <div class="name">{{nameString(obj)}}</div>
                        <div class="text_box">
                            <div class="time">{{obj.addTime | $time('YYYY.MM.DD')}}</div>
                            <div class="text">权限:{{obj.permission | permission}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item_box">
                <div class="opera_box" v-if="!showBtn && (obj && userNo == obj.userNo)">
                    <img class="icon" @click="addDialog" src="@/assets/svg/icon_add_cir.svg" alt="">
                    <img class="icon" @click="showBtn = true" src="@/assets/svg/icon_ljt.svg" alt="">
                </div>
                <div class="opera_btn" @click="showBtn = false" v-if="showBtn && userNo == obj.userNo">完成</div>
                <div class="tit">协助人</div>
                <van-swipe-cell ref="swipercell" :disabled="disabled" v-for="(item,index) in helperList" :key="index">
                    <div class="item" :class="{'trans':showBtn}">
                        <img class="red_btn" @click.stop="openFun(index)" src="@/assets/svg/icon_remove.svg" alt="">
                        <img class="avatar" :src="item.avatar | $setAvatar" alt="">
                        <div class="val">
                            <div class="name">{{nameString(item)}}</div>
                            <div class="text_box">
                                <div class="time">{{item.addTime | $time('YYYY.MM.DD')}}</div>
                            <div class="text">权限:{{item.permission | permission}}</div>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button text="删除" @click="deleteFun(item)" class="delete_button" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>
        <!-- 添加协助人 -->
        <AddHelper v-model="dialog_add" @sure="getList"></AddHelper>
    </div>
</template>

<script>
import { AddHelper } from './components'
import {
    clueCustomerFollowUser_getMBFollowUserList,
    clueCustomerFollowUser_deleteFollowUsers,
} from '@/api/customer'
export default {
    components: {
        AddHelper
    },
    data(){
        return {
            list: [],
            dialog_add: false,
            showBtn: false,
        }
    },
    computed: {
        id(){
            return this.$route.query.id
        },
        fromType(){
            return this.$route.query.fromType ? this.$route.query.fromType : ''
        },
        userNo(){
            return this.$store.getters.userNo
        },
        obj(){  //负责人obj
            let list = this.list.find(el => {
                return el.flag == 1
            })
            return list
        },
        disabled(){
            return this.userNo != this.obj.userNo ? true : false
        },
        helperList(){
            let list = this.list.filter(el => {
                return el.flag == 2
            })
            return list
        },
    },
    mounted(){
        if(this.id){
            this.getList()
        }
    },
    methods: {
        addDialog(){
            console.log('add')
            this.dialog_add = true
        },
        openFun(i){
            this.$refs.swipercell[i].open('right')
        },
        deleteFun(row){
            let data = {
                ids: [row.id],
            }
            clueCustomerFollowUser_deleteFollowUsers(data).then(res => {
                if(res.result){
                    this.getList()
                }
            })
        },
        getList(){  //获取协助人列表
            clueCustomerFollowUser_getMBFollowUserList(this.id).then(res => {
                if(res.result){
                    this.list = res.data
                }
            })
        },
        nameString(val){
            return val.name && val.depId ? `${val.name}-${val.depId}` : val.name
        },
    },
    filters: {
        permission(val){
            return val == 1 ? '读写' : '只读'
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.helper_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
    position: relative;
    .top_back{
        width: 100%;
        height: 88px;
        position: relative;
        text-align: center;
        &::before{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            position: absolute;
            left: 0;
            bottom: 0;
            transform: scaleY(.5);
        }
        .icon{
            width: 32px;
            height: 32px;
            position: absolute;
            left: 32px;
            top: 50%;
            transform: translateY(-50%);
        }
        .title{
            display: inline-block;
            line-height: 88px;
            font-size: 28px;
            font-weight: bold;
            color: @fontMain;
        }
    }
    .content{
        width: 100%;
        padding: 32px 0;
        .item_box{
            width: 100%;
            position: relative;
            margin-bottom: 40px;
            .opera_box{
                display: flex;
                position: absolute;
                top: 0;
                right: 32px;
                .icon{
                    width: 30px;
                    height: 30px;
                    &:last-child{
                        margin-left: 28px;
                    }
                }
            }
            .opera_btn{
                font-size: 28px;
                line-height: 36px;
                color: @main;
                font-weight: bold;
                position: absolute;
                right: 32px;
                top: 0;
            }
            .tit{
                font-size: 28px;
                line-height: 36px;
                color: @fontMain;
                font-weight: bold;
                margin-bottom: 16px;
                padding-left: 32px;
            }
            .item{
                width: 100%;
                display: flex;
                align-items: center;
                padding: 32px;
                position: relative;
                transform: translate3d(-70px,0,0);
                transition: all .25s;
                &.bd::before{
                    content: '';
                    width: 100%;
                    height: 1px;    /* no */
                    background: @lineColor;
                    transform: scaleY(.5);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
                &.trans{
                    transform: translate3d(0,0,0);
                }
                .red_btn{
                    width: 36px;
                    height: 36px;
                    margin-right: 34px;
                }
                .avatar{
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: rgba(0,0,0,.05);
                    margin-right: 24px;
                }
                .val{
                    // width: calc(100% - 88px);
                    .name{
                        font-size: 28px;
                        line-height: 36px;
                        color: @fontMain;
                        margin-bottom: 8px;
                    }
                    .text_box{
                        width: 100%;
                        font-size: 24px;
                        line-height: 36px;
                        color: @total;
                        display: flex;
                        .text{
                            margin-left: 24px;
                        }
                    }
                }
            }
            .delete_button{
                height: 100%;
                width: 120px;
                color: @white;
                background: @red;
                border-color: @red;
            }
            // /deep/ .van-swipe-cell__right{
            //     right: -1px !important; /* no */
            // }
        }
    }
}
</style>