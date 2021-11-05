<template>
    <div class="wrap">
        <div class="top_box">
            <TopTitle title="浏览数据"></TopTitle>
            <div class="look_box">
                <div class="today">
                    <div class="text">今日访客</div>
                    <div class="num">{{detail.todayViewedCount}}<i>人</i></div>
                </div>
                <div class="total">全部访客{{detail.totalViewedCount}}人</div>
            </div>
        </div>
        <div class="content">
            <div class="list" v-if="total > 0">
                <div class="li" v-for="item in detail.userBusinessCardViewLogVOS" :key="item.id">
                    <div class="time">{{item.createTime}}</div>
                    <div class="box">
                      
                        <div class="info">
                            <div class="name">{{item.customerName}}</div>
                            <div class="duration">浏览时长：{{item.customerTiming}}</div>
                        </div>
                        <div class="number">{{item.customerPhone}}</div>
                    </div>
                </div>
            </div>
            <div class="no_data" v-else>
                <img class="img" src="@/assets/images/no_data1.png" alt="">
                <div class="no_text">还没有人看你哦～</div>
            </div>
        </div>
    </div>
</template>

<script>
import  TopTitle  from '@/views/talkTool/groupCode/components/topTitle.vue'
import { userBusinessCardViewLog_personalCard } from '@/api/card'
export default {
    components: {
        TopTitle
    },
    data(){
        return {
            total: 10,
            detail: {},
        }
    },
    mounted(){
        this.getInfo()
    },
    methods: {
        getInfo(){  //获取浏览数据
            userBusinessCardViewLog_personalCard().then(res => {
                if(res.result){
                    this.detail = res.data
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/color.less';
 .wrap{
    width: 100%;
    min-height: 100vh;
    .top_box{
        background: @white;
        margin-bottom: 20px;
        .look_box{
            width: 100%;
            height: 176px;
            padding: 32px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .today{
                .text{
                    font-size: 24px;
                    line-height: 28px;
                    color: @text;
                    margin-bottom: 12px;
                }
                .num{
                    font-size: 54px;
                    font-weight: bold;
                    color: @fontMain;
                    i{
                        font-style: normal;
                        font-weight: 400;
                        font-size: 24px;
                    }
                }
            }
            .total{
                font-size: 24px;
                line-height: 32px;
                color: @text;
            }
        }
    }
    .content{
        width: 100%;
        min-height: calc(100vh - 284px);
        background: @white;
        padding: 32px;
        .list{
            width: 100%;
            .li{
                width: 100%;
                padding-left: 40px;
                position: relative;
                margin-bottom: 48px;
                &::before{
                    content: '';
                    width: 1px;
                    height: calc(100% + 44px);
                    border-left: 1px dashed @placeholder;
                    position: absolute;
                    left: -.5px;
                    top: 0;
                }
                &::after{
                    content: '';
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: @dashedColor;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 2;
                    transform: translateX(-50%);
                }
                &:last-child{
                    margin-bottom: 0;
                    &::before{
                        display: none;
                    }
                }
                .time{
                    font-size: 24px;
                    line-height: 28px;
                    color: @text;
                    margin-bottom: 16px;
                }
                .box{
                    display: flex;
                    align-items: center;
                    position: relative;
                    padding: 26px 32px;
                    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.05);
                    border-radius: 8px;
                    .avatar{
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 24px;
                        font-size: 0;
                        .img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .info{
                        .name{
                            font-size: 28px;
                            line-height: 32px;
                            color: @fontMain;
                            margin-bottom: 16px;
                            font-family: PingFangSC-Regular, PingFang SC;
                        }
                        .duration{
                            color: @text;
                            font-size: 24px;
                            line-height: 28px;
                        }
                    }
                    .number{
                        font-size: 24px;
                        color: @text;
                        position: absolute;
                        right: 24px;
                        bottom: 30px;
                    }
                }
            }
        }
        .no_data{
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-top: 40px;
            .img{
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
            }
            .no_text{
                font-size: 28px;
                line-height: 32px;
                color: @lengthColor;
            }
        }
    }
}
</style>