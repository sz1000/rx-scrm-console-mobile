<template>
    <div class="wrap">
        <div class="top_nav" @click="blackFun">
            <div class="black_btn">返回</div>
            <div class="title">设置群SOP</div>
        </div>
        <div class="item_box">
            <div class="line_title">已应用群SOP规则</div>
            <div class="p" v-for="item in sopList" :key="item.id">{{item.ruleName}}</div>
            <div class="btn" @click="showPopup">添加SOP规则</div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <div class="item_box" v-for="(item,index) in sopList" :key="index">
                <div class="line_title">{{item.ruleName}}</div>
                <div class="p">
                    <span class="text">{{item.promptRule ? '周期推送' : '定时推送'}}</span>
                    <div class="icon_btn" @click="settingSopFun(item.id,'delete')">
                        <img class="icon" src="@/assets/images/icon_edit.png" alt="">
                        <span class="icon_t">移除该任务</span>
                    </div>
                </div>
                <div class="list_wrap">
                    <div class="list_box" v-for="son in item.sopContentVOS" :key="son.id">
                        <div class="dot"></div>
                        <div class="item">
                            <div class="label">内容名称：</div>
                            <div class="val">{{son.name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">推送时间：</div>
                            <div class="val">{{son.promptTimeMsg}}</div>
                        </div>
                        <div class="item">
                            <div class="label">推送内容：</div>
                            <div class="val">
                                <div class="tit">{{son.content || '占位符'}}</div>
                                <div class="inside_box" v-for="el in son.sopContentAttachmentVOS" :key="el.id">
                                    <div class="img_row" v-if="el.fileName">
                                        <div class="img_box">
                                            <img :src="el.url" alt="">
                                        </div>
                                        <div class="info_r">
                                            <div class="name">{{el.fileName}}</div>
                                            <div class="size">{{el.fileSize}}</div>
                                        </div>
                                    </div>
                                    <div class="share_link" v-else>{{el.url}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <!-- 添加 SOP 规则 -->
        <van-popup position="bottom" round closeable v-model="show">
            <div class="popup_wrap">
                <div class="popup_header">添加SOP规则</div>
                <div class="popup_content">
                    <div class="top_box">
                        <div class="search_box">
                            <input class="search" v-model="search.ruleName" type="text" placeholder="搜索SOP规则" @keyup.enter="getAllSopList">
                            <img class="icon" @click="getAllSopList" src="@/assets/images/icon_search.png" alt="">
                        </div>
                        <div class="check_tit">
                            <div class="name">规则名称</div>
                            <div class="name">推送规则</div>
                        </div>
                    </div>
                    <div class="check_wrap">
                        <div class="checkbox" v-for="item in allSopList" :key="item.id">
                            <van-checkbox class="check" v-model="item.checked" shape="square">{{item.ruleName}}</van-checkbox>
                            <div class="c_type">{{item.promptRule ? '周期推送' : '定时推送'}}</div>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="footer">
                        <div class="btn" @click="show = false">取消</div>
                        <div class="btn main" @click="settingSopFun">保存</div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { sop_groupSopList,sop_groupSopSetting,sop_listAll } from '@/api/sop'
export default {
    data(){
        return {
            list: ['','',''],
            show: false,
            checked: false,
            finished: true,
            loading: false,
            sopList: [],    //群sop列表
            allSopList: [], //所有sop规则列表
            search: {
                ruleName: '',
                enableStatus: 1,
            },
            groupId: this.$route.query.id,      //群id
        }
    },
    mounted(){
        this.getSopList()
    },
    methods: {
        blackFun(){
            this.$router.go(-1)
        },
        getSopList(){ //获取sop规则列表
            sop_groupSopList(this.groupId).then(res => {
                if(res.result){
                    let list = res.data
                    this.sopList = list
                    this.getAllSopList()
                }
            })
        },
        getAllSopList(){    //获取所有sop规则列表
            sop_listAll(this.search).then(res => {
                if(res.result){
                    let list = res.data
                    list.forEach(item => {
                        this.sopList.forEach(el => {
                            if(el.id == item.id){
                                item.checked = true
                            }
                        })
                    })
                    this.allSopList = list
                }
            })
        },
        settingSopFun(id,opera){    //设置群sop or 移除sop任务
            let _data = {
                addSopIds: [],
                delSopIds: [],
                groupId: this.groupId,
            }
            if(opera == 'delete'){
                _data.delSopIds.push(id)
            }else{
                this.allSopList.forEach(el => {
                    if(el.checked){
                        _data.addSopIds.push(el.id)
                    }else {
                        _data.delSopIds.push(el.id)
                    }
                })
            }
            sop_groupSopSetting(_data).then(res => {
                if(res.result){
                    this.getSopList()
                    this.show = false
                }
            })
        },
        onLoad(){
            setTimeout(() => {
                this.list = this.list.concat(['','','',''])
                this.loading = false
                if(this.list.length > 20){ this.finished = true }
            },1000)
        },
        showPopup(){    //打开 添加sop规则
            this.allSopList.forEach(item => {
                this.sopList.forEach(el => {
                    if(el.id == item.id){
                        item.checked = true
                    }
                })
            })
            this.show = true
        },
    },
    watch: {
        $route(to,from){
            console.log('to sop',to,from)
        }
    },
}
</script>

<style lang="less" scoped>
@main: #4168F6;
@white: #fff;
@fontMain: #3C4353;
@fontSub2: #838A9D;
@bdColor: #D9DAE4;
@dashedColor: #F0F2F7;
@headerBg: #FAFBFF;
@checkBg: #F4F6FE;
.wrap{
    width: 100%;
    min-height: 100vh;
    /deep/ .van-popup__close-icon--top-right{
        right: 24px;
        top: 32px;
    }
    .popup_wrap{
        width: 100%;
        min-height: 50vh;
        max-height: 80vh;
        height: 60vh;
        background: @white;
        position: relative;
        padding-top: 88px;
        .popup_header{
            width: 100%;
            height: 88px;
            font-size: 28px;
            font-weight: 500;
            line-height: 88px;
            text-align: center;
            background: @headerBg;
            // position: relative;
            border-bottom: 1px solid @dashedColor;
            position: absolute;
            top: 0;
            left: 0;
        }
        .popup_content{
            width: 100%;
            height: calc(100% - 128px);
            // height: calc(100% - 216px);
            // padding: 64px 24px 24px;
            padding-top: 180px;
            position: relative;
            .top_box{
                width: 100%;
                padding: 24px;
                position: absolute;
                top: 0;
                left: 0;
                .search_box{
                    width: 100%;
                    height: 80px;
                    position: relative;
                    margin-bottom: 24px;
                    .search{
                        width: 100%;
                        height: 100%;
                        border: 1px solid @bdColor;
                        border-radius: 8px;
                        padding: 24px 60px 24px 20px;
                    }
                    .icon{
                        width: 28px;
                        height: 28px;
                        position: absolute;
                        right: 12px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
                .check_tit{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontSub2;
                    }
                }
            }
            .check_wrap{
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                padding: 0 24px;
                .checkbox{
                    width: 100%;
                    padding: 20px 0;
                    display: flex;
                    align-items: center;
                    &.bg{
                        background: @checkBg;
                    }
                    .check{
                        width: calc(100% - 160px);
                        /deep/ .van-checkbox__icon{
                            font-size: 28px;
                        }
                        /deep/ .van-checkbox__label{
                            color: @fontMain;
                            font-size: 28px;
                            line-height: 40px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .c_type{
                        width: 160px;
                        text-align: right;
                        color: @fontSub2;
                        font-size: 28px;
                        line-height: 40px;
                        margin-top: 12px;
                    }
                }
            }
        }
        .popup_footer{
            width: 100%;
            height: 128px;
            background: @white;
            padding: 24px;
            position: absolute;
            bottom: 0;
            left: 0;
            .footer{
                display: flex;
                justify-content: space-between;
                .btn{
                    width: calc(50% - 12px);
                    height: 80px;
                    line-height: 78px;
                    font-size: 24px;
                    border: 1px solid @main;
                    color: @main;
                    border-radius: 8px;
                    text-align: center;
                    &.main{
                        border-color: @main;
                        background: @main;
                        color: @white;
                    }
                }
            }
        }
    }
    .top_nav{
        width: 100%;
        height: 88px;
        padding: 24px;
        background: @white;
        border-bottom: 1px solid @dashedColor;
        position: relative;
        text-align: center;
        .black_btn{
            font-size: 28px;
            line-height: 40px;
            color: @fontMain;
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            padding-left: 30px;
            &::before{
                content: '<';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .title{
            font-size: 28px;
            line-height: 40px;
            color: @fontMain;
            display: inline-block;
        }
    }
    .item_box{
        width: 100%;
        background: @white;
        padding: 24px;
        position: relative;
        margin-bottom: 24px;
        &:last-child{
            margin-bottom: 0;
        }
        .line_title{
            font-size: 28px;
            line-height: 40px;
            font-weight: bold;
            color: @fontMain;
            padding-left: 20px;
            position: relative;
            margin-bottom: 24px;
            &::before{
                content: '';
                width: 8px;
                height: 28px;
                background: @main;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .p{
            font-size: 28px;
            line-height: 40px;
            color: @fontMain;
            margin-bottom: 24px;
            position: relative;
            .text{
                display: inline-block;
            }
            .icon_btn{
                position: absolute;
                right: 0;
                top: 0;
                display: flex;
                align-items: center;
                .icon{
                    width: 28px;
                    height: 28px;
                    margin-right: 8px;
                }
                .icon_t{
                    font-size: 28px;
                    line-height: 40px;
                }
            }
        }
        .btn{
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 28px;
            border-radius: 8px;
            color: @white;
            background: @main;
        }
        .list_wrap{
            width: 100%;
            padding-left: 26px;
            padding-top: 54px;
            position: relative;
            &::after{
                content: '';
                width: 18px;
                height: 18px;
                background: @main;
                border-radius: 50%;
                position: absolute;
                left: -3px;
                top: 0;
            }
            .list_box{
                width: 100%;
                min-height: 224px;
                background: #FAFBFF;
                border-radius: 8px;
                padding: 16px;
                position: relative;
                margin-bottom: 24px;
                &:last-child{
                    margin-bottom: 0;
                    &::before{
                        content: '';
                        // height: calc(100% - 12px);
                        display: none;
                    }
                }
                &::before{
                    content: '';
                    width: 1px;
                    height: calc(106% - 2px);
                    background: #F0F2F7;
                    position: absolute;
                    left: -19px;
                    top: 13px;
                }
                .dot{
                    width: 18px;
                    height: 18px;
                    background: @main;
                    border-radius: 50%;
                    position: absolute;
                    left: -27px;
                    top: 0;
                    &::before{
                        content: '';
                        width: 9px;
                        height: 9px;
                        background: @white;
                        border-radius: 50%;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }
                }
                .inside_box{
                    margin-bottom: 12px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
                .item{
                    width: 100%;
                    line-height: 40px;
                    font-size: 28px;
                    display: flex;
                    margin-bottom: 16px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .label{
                        width: 140px;
                        white-space: nowrap;
                        color: @fontSub2;
                    }
                    .val{
                        width: calc(100% - 140px);
                        color: @fontMain;
                        .tit{
                            margin-bottom: 16px;
                        }
                        .img_row{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            margin-bottom: 16px;
                            .img_box{
                                width: 182px;
                                height: 182px;
                                background: @white;
                                border-radius: 4px;
                                overflow: hidden;
                                margin-right: 24px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .info_r{
                                width: calc(100% - 206px);
                                .name{
                                    line-height: 32px;
                                    font-size: 24px;
                                    color: #3C4353;
                                    margin-bottom: 24px;
                                    word-break: break-all;
                                }
                                .size{
                                    height: 32px;
                                    font-size: 24px;
                                    color: #C0C4CC;
                                }
                            }
                        }
                        .share_link{
                            word-break: break-all;
                        }
                        .share_box{
                            width: 250px;
                            height: 100px;
                            background: #fff;
                            border: 1px solid #D9DAE4;
                            padding: 16px;
                            .title{
                                font-size: 14px;
                                line-height: 20px;
                                color: #3C4353;
                            }
                            .line{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                .des{
                                    width: calc(100% - 66px);
                                    font-size: 12px;
                                    line-height: 17px;
                                    color: #C0C4CC;
                                    word-break: break-all;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                }
                                .img_box{
                                    width: 50px;
                                    height: 50px;
                                    margin-left: 16px;
                                    background: #FAFBFF;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>