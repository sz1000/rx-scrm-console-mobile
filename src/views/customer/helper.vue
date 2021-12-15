<template>
    <div class="helper_wrap">
        <div class="top_back" @click="$router.go(-1)">
            <img class="icon" src="@/assets/svg/icon_back.svg" alt="">
            <div class="title">协助人</div>
        </div>
        <div class="content">
            <div class="item_box">
                <div class="tit">负责人</div>
                <div class="item trans">
                    <div class="avatar"></div>
                    <div class="val">
                        <div class="name">许宣-运营部</div>
                        <div class="text_box">
                            <div class="time">2021.12.25</div>
                            <div class="text">权限:只读</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item_box">
                <div class="opera_box" v-if="!showBtn">
                    <img class="icon" @click="addDialog" src="@/assets/svg/icon_add_cir.svg" alt="">
                    <img class="icon" @click="showBtn = true" src="@/assets/svg/icon_ljt.svg" alt="">
                </div>
                <div class="opera_btn" @click="showBtn = false" v-else>完成</div>
                <div class="tit">协助人</div>
                <van-swipe-cell ref="swipercell" v-for="(item,index) in 3" :key="index">
                    <div class="item" :class="{'trans':showBtn}">
                        <img class="red_btn" @click.stop="openFun(index)" src="@/assets/svg/icon_remove.svg" alt="">
                        <div class="avatar"></div>
                        <div class="val">
                            <div class="name">陈良-运营部</div>
                            <div class="text_box">
                                <div class="time">2021.12.25</div>
                                <div class="text">权限:只读</div>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button text="删除" @click="deleteFun" class="delete_button" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>
    </div>
</template>

<script>
// import { AddHelper,DeleteHelper } from './components'
// import { clueCustomerFollowUser_getFollowUserList } from '@/api/customer'
export default {
    components: {
        // AddHelper,DeleteHelper
    },
    data(){
        return {
            data: localStorage.getItem('helperData') ? JSON.parse(localStorage.getItem('helperData')) : [],
            list: [],
            dialog_add: false,
            showBtn: false,
        }
    },
    computed: {
        id(){
            let str = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : ''
            return str
        },
        obj(){  //负责人obj
            let obj = this.data && this.data.length ? this.data[0] : {}
            return obj
        },
    },
    mounted(){
        // if(this.id){
        //     this.getList()
        // }
    },
    methods: {
        addDialog(){
            console.log('add')
            this.dialog_add = true
        },
        openFun(i){
            this.$refs.swipercell[i].open('right')
        },
        deleteFun(){
            console.log('删除')
        },
        getList(){  //获取协助人列表
            clueCustomerFollowUser_getFollowUserList(this.id).then(res => {
                if(res.result){
                    this.list = res.data
                }
            })
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