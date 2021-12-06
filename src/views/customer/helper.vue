<template>
    <div class="helper_wrap">
        <div class="header_opera">
            <div class="btn" @click="delPop">删除</div>
            <div class="btn" @click="addPop">新增</div>
        </div>
        <div class="helper_title">
            <i></i>
            <span class="tit">负责人</span>
        </div>
        <div class="list">
            <div class="li">
                <div class="row">
                    <div class="item">
                        <div class="label">员工姓名</div>
                        <div class="val">{{obj.name}}</div>
                    </div>
                    <div class="item">
                        <div class="label">权限</div>
                        <div class="val">{{obj.permission | permission}}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="item">
                        <div class="label">添加时间</div>
                        <div class="val">{{obj.createTime | $time('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                    <div class="item">
                        <div class="label">最近沟通</div>
                        <div class="val">{{obj.addTime | $time('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="helper_title">
            <i></i>
            <span class="tit">协助人</span>
        </div>
        <div class="list">
            <div class="li" v-for="(item,index) in list" :key="index">
                <div class="row">
                    <div class="item">
                        <div class="label">员工姓名</div>
                        <div class="val">{{item.name}}</div>
                    </div>
                    <div class="item">
                        <div class="label">权限</div>
                        <div class="val">{{item.permission | permission}}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="item">
                        <div class="label">添加时间</div>
                        <div class="val">{{item.createTime | $time('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                    <div class="item">
                        <div class="label">最近沟通</div>
                        <div class="val">{{item.addTime | $time('YYYY-MM-DD HH:mm:ss')}}</div>
                    </div>
                </div>
            </div>
        </div>
        <AddHelper v-model="dialog_add" @sure="getList"></AddHelper>
        <DeleteHelper :list="list" v-model="dialog_delete" @sure="getList"></DeleteHelper>
    </div>
</template>

<script>
import { AddHelper,DeleteHelper } from './components'
import { clueCustomerFollowUser_getFollowUserList } from '@/api/customer'
export default {
    components: {
        AddHelper,DeleteHelper
    },
    data(){
        return {
            data: localStorage.getItem('helperData') ? JSON.parse(localStorage.getItem('helperData')) : [],
            list: [],
            dialog_add: false,
            dialog_delete: false,
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
        if(this.id){
            this.getList()
        }
    },
    methods: {
        addPop(){
            this.dialog_add = true
        },
        delPop(){
            this.dialog_delete = true
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
    padding: 32px;
    position: relative;
    .header_opera{
        width: 100%;
        display: flex;
        justify-content: right;
        .btn{
            width: 120px;
            height: 60px;
            color: @fontSub2;
            font-size: 28px;
            line-height: 60px;
            text-align: center;
            border-radius: 8px;
            border: 1px solid #d9dae4; /* no */
            &:first-child{
                margin-right: 20px;
            }
        }
    }
    .helper_title{
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 32px;
        i{
            font-style: normal;
            width: 8px;
            height: 26px;
            background: @main;
            margin-right: 12px;
        }
        .tit{
            font-size: 30px;
            color: @fontMain;
            font-weight: bold;
            line-height: 40px;
        }
    }
    .list{
        width: 100%;
        position: relative;
        .li{
            width: 100%;
            margin-bottom: 40px;
            .row{
                display: flex;
                margin-bottom: 16px;
                &:last-child{
                    margin-bottom: 0;
                }
                .item{
                    width: calc(50% - 10px);
                }
            }
            .item{
                line-height: 40px;
                font-size: 28px;
                display: flex;
                &:first-child{
                    margin-right: 20px;
                }
                .label{
                    width: 120px;
                    white-space: nowrap;
                    color: @fontSub2;
                    text-align: right;
                    margin-right: 12px;
                }
                .val{
                    width: calc(100% - 132px);
                    color: @fontMain;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>