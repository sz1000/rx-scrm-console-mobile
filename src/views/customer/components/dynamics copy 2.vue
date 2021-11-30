<template>
    <div class="dynamics_box">
        <div class="type_box">
            <div class="type" @click="navClickFun(index)" :class="{'cur':activeIndex == index,'dot':index == 3}" v-for="(item,index) in navList" :key="index">{{item}}</div>
        </div>
        <div class="time_list">
            <div class="li" :class="item.class" v-for="(item,index) in list" :key="index">
                <div class="icon_box">
                    <img class="icon" v-if="item.class == 'day'" src="@/assets/svg/icon_time.svg" alt="">
                    <img class="icon" v-if="item.class == 'dot'" src="@/assets/svg/icon_cir.svg" alt="">
                    <img class="icon" v-if="item.code == 'jiandang'" src="@/assets/svg/icon_jd.svg" alt="">
                    <img class="icon" v-if="item.code == 'xiaoxi'" src="@/assets/svg/icon_gt.svg" alt="">
                </div>
                <div class="val">
                    <div class="show_day" v-if="item.class == 'day'">{{item.title}}<span class="total" v-if="item.total > 0">({{item.total}}条)</span><span class="total" v-else>(暂无动态)</span></div>
                    <div class="card" v-if="whiteList.indexOf(item.code) > -1">
                        <div class="tit">{{item.title}}</div>
                        <div class="text tips" v-if="item.code == 'tag'">
                            <img class="icon" src="@/assets/svg/icon_tip.svg" alt="">
                            <span>{{item.text}}</span>
                        </div>
                        <div class="text" v-else>
                            <span class="name">
                                <div class="avatar"></div>
                                <span>陈良-运营部</span>
                            </span>
                            <span :class="{'mr8':item.name}">{{item.text}}</span>
                            <span class="name" v-if="item.name">
                                <div class="avatar"></div>
                                <span>{{item.name}}</span>
                            </span>
                            <span class="mr8" v-if="item.text1">{{item.text1}}</span>
                            <span class="name" v-if="item.name1">
                                <div class="avatar"></div>
                                <span>{{item.name1}}</span>
                            </span>
                            <a class="link" v-if="item.file">{{item.file}}</a>
                        </div>
                        <div class="time">2021-12-12 13:24</div>
                    </div>
                    <div class="card" v-if="item.class == 'opera'" :class="{'hide':more,'no': !item.msgList}">
                        <div class="info">
                            <div class="img_box"></div>
                            <div class="name">陈良-运营部</div>
                        </div>
                        <div class="time">2021-12-12 13:24</div>
                        <div class="text">
                            <a class="link alt mr8">{{item.alt}}</a>
                            <span>{{item.text}}</span>
                        </div>
                        <div class="opera_right">
                            <div class="icon_btn">
                                <img class="iconfont" src="@/assets/svg/icon_dz.svg" alt="">
                                <div class="num">22</div>
                            </div>
                            <div class="icon_btn">
                                <img class="iconfont" src="@/assets/svg/icon_pl.svg" alt="">
                                <div class="num">2</div>
                            </div>
                        </div>
                        <div class="msg_box" v-if="item.msgList && item.msgList.length">
                            <div class="msg_li" v-for="(son,i) in item.msgList" :key="i">
                                <div class="msg_info">
                                    <div class="msg_img"></div>
                                    <div class="msg_name">{{son.name}}</div>
                                </div>
                                <div class="msg_text">{{son.text}}</div>
                                <div class="time">2021-12-12 13:24</div>
                            </div>
                        </div>
                        <div class="more" v-if="item.msgList && item.msgList.length" @click="more = !more">
                            <img class="icon" v-if="more" src="@/assets/svg/icon_down.svg" alt="">
                            <img class="icon" v-else src="@/assets/svg/icon_up.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dynamics',
    props: {
        data:{
            type: Array,
            default: () => []
        },
        time:{
            type: Array,
            default: () => []
        },
    },
    data(){
        return {
            more: true,
            whiteList: ['jiandang','gengxin','biangeng','fenpei','shangchuan','tag'],
            list: [
                {
                    class: 'day',   //dot(圆点) 、 opera(消息) 、 day(日期)
                    title: '今日',
                    total: 10,
                },
                {
                    class: '',
                    title: '客户建档',
                    text: '建立了客户档案',
                    code: 'jiandang',
                },
                {
                    class: 'dot',
                    title: '更新客户',
                    text: '将客户名称从 上海领克科技有限公司新为 上海领客科技有限公司',
                    code: 'gengxin',
                },
                {
                    class: 'dot',
                    title: '变更负责人',
                    text: '将负责人从',
                    name: '王扬-运营部',
                    text1: '变更为',
                    name1: '林微-项目部',
                    code: 'biangeng',
                },
                {
                    class: 'dot',
                    title: '分配客户',
                    text: '将客户分配给了',
                    name: '林微-项目部',
                    code: 'fenpei',
                },
                {
                    class: 'day',
                    title: '昨日',
                    total: 0,
                },
                {
                    class: 'day',
                    title: '11月18日',
                    total: 20,
                },
                {
                    class: 'dot',
                    title: '上传附件',
                    text: '上传了附件',
                    file: '解决方案.ppt',
                    code: 'shangchuan',
                },
                {
                    class: 'opera',
                    alt: '@陈良-运营部 @王扬-运营部',
                    text: '明天给客户演示方案，争取一举拿下',
                    code: 'xiaoxi',
                    msgList: [
                        {
                            name: '王扬-运营部',
                            text: '收到，明天10点碰头',
                        },
                        {
                            name: '林微-项目部',
                            text: '好的，我这边准备一下',
                        },
                    ],
                },
                {
                    class: 'dot',
                    title: '自动打标签',
                    text: '客户会话记录提及关键词，自动打标签 200个员工',
                    code: 'tag',
                },
                {
                    class: 'opera',
                    alt: '@陈良-运营部 @王扬-运营部',
                    text: '明天给客户演示方案，争取一举拿下',
                    code: 'xiaoxi',
                },
            ],
            navList: ['全部','客户动态','商机动态','互动沟通'],
            activeIndex: 0,
        }
    },
    computed: {
        // list(){
        //     let arr = []
        //     this.time.forEach(el => {
        //         if(el.dataTime == '今日'){
                    
        //         }
        //     })
        // },
    },
    methods: {
        navClickFun(i){
            this.activeIndex = i
            this.$emit('sure',i+1)
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.dynamics_box{
    width: 100%;
    .type_box{
        width: 100%;
        display: flex;
        margin-bottom: 32px;
        .type{
            height: 52px;
            color: @fontSub1;
            font-size: 24px;
            line-height: 50px;
            padding: 0 26px;
            border: 1px solid @navBg;
            background: @navBg;
            border-radius: 26px;
            margin-right: 24px;
            position: relative;
            &:last-child{
                margin-right: 0;
            }
            &.cur{
                background: @white;
                border-color: @main;
                color: @main;
            }
            &.dot::before{
                content: '';
                width: 16px;
                height: 16px;
                background: @red;
                border-radius: 50%;
                position: absolute;
                right: 0;
                top: -8px;
            }
        }
    }
    .time_list{
        width: 100%;
        .li{
            position: relative;
            padding-bottom: 40px;
            display: flex;
            &.day{
                .icon_box{
                    .icon{
                        width: 40px;
                        height: 40px;
                        top: 2px;
                    }
                    &::before{
                        display: none;
                    }
                    &::after{
                        content: '';
                        height: calc(100% - 4px);
                        top: 36px;
                    }
                }
                .val{
                    .show_day{
                        font-size: 32px;
                        line-height: 40px;
                        color: @fontMain;
                        font-weight: bold;
                        .total{
                            font-size: 28px;
                            color: @total;
                            margin-left: 8px;
                        }
                    }
                }
            }
            &.dot .icon_box{
                &::after{
                    content: '';
                    height: calc(100% - 10px);
                    top: 44px;
                }
                &::before{
                    content: '';
                    height: 36px;
                }
                // .icon{
                //     width: 12px;
                //     height: 12px;
                //     border-radius: 50%;
                //     background: @dot;
                // }
            }
            &.opera .val .card{
                padding-bottom: 64px;
                .text{
                    margin-bottom: 24px;
                }
                .opera_right{
                    display: flex;
                    justify-content: flex-end;
                    .icon_btn{
                        display: flex;
                        align-items: flex-start;
                        margin-left: 28px;
                        .iconfont{
                            width: 34px;
                            height: auto;
                        }
                        .num{
                            font-size: 24px;
                            line-height: 32px;
                            margin-left: 8px;
                        }
                    }
                }
                .msg_box{
                    width: 100%;
                    position: relative;
                    margin-top: 28px;
                    &::before{
                        content: '';
                        width: calc(100% + 48px);
                        height: 1px;
                        background: @lineColor;
                        position: absolute;
                        top: 0;
                        left: -24px;
                    }
                    .msg_li{
                        width: 100%;
                        padding: 24px 0;
                        border-bottom: 1px solid @lineColor;
                        &:last-child{
                            border: none;
                        }
                        .msg_info{
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;
                            .msg_img{
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                background: rgba(0, 0, 0, .05);
                                margin-right: 8px;
                            }
                            .msg_name{
                                font-size: 24px;
                                line-height: 40px;
                                color: @fontMain;
                                font-weight: normal;
                            }
                            .msg_text{
                                font-size: 24px;
                                line-height: 32px;
                                color: @fontSub1;
                            }
                        }
                    }
                }
                .more{
                    width: 36px;
                    height: 36px;
                    position: absolute;
                    left: 50%;
                    bottom: 20px;
                    transform: translateX(-50%);
                    .icon{
                        width: 100%;
                        height: auto;
                    }
                }
            }
            &.last .icon_box{
                &::after{
                    display: none;
                }
            }
            .icon_box{
                width: 40px;
                padding-top: 24px;
                margin-right: 16px;
                position: relative;
                &::before{
                    content: '';
                    width: 1px;
                    height: 24px;
                    border-right: 1px dashed @placeholder;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%);
                }
                &::after{
                    content: '';
                    width: 1px;
                    height: calc(100% - 24px);
                    border-right: 1px dashed @placeholder;
                    position: absolute;
                    left: 50%;
                    top: 64px;
                    transform: translateX(-50%);
                }
                .icon{
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    left: 50%;
                    top: 25px;
                    transform: translateX(-50%);
                }
            }
            .val{
                width: calc(100% - 56px);
                .card{
                    width: 100%;
                    min-height: 132px;
                    background: @white;
                    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.05);
                    border-radius: 8px;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    &.hide .msg_box{
                        display: none;
                    }
                    &.no{
                        padding-bottom: 30px;
                    }
                    .mr8{
                        margin-right: 8px;
                    }
                    .tit{
                        font-size: 28px;
                        line-height: 40px;
                        color: @fontMain;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                    .time{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontSub1;
                        position: absolute;
                        right: 24px;
                        top: 28px;
                    }
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @fontMain;
                        padding-left: 40px;
                        position: relative;
                        margin-right: 8px;
                        .avatar{
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            background: rgba(0, 0, 0, .05);
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                    .text{
                        font-size: 24px;
                        line-height: 40px;
                        color: @fontSub1;
                        &.tips{
                            padding-left: 32px;
                            position: relative;
                            .icon{
                                width: 28px;
                                height: 28px;
                                border-radius: 50%;
                                background: rgba(0, 0, 0, .05);
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                    }
                    .link{
                        color: @main;
                        font-size: 24px;
                        line-height: 32px;
                        font-weight: bold;
                        margin-left: 8px;
                        &.alt{
                            font-weight: 400;
                        }
                    }
                    .info{
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                        .img_box{
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            background: rgba(0, 0, 0, .05);
                            margin-right: 8px;
                        }
                        .name{
                            font-size: 28px;
                            line-height: 40px;
                            font-weight: bold;
                            color: @fontMain;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>