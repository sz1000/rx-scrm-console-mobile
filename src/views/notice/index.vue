<template>
    <div class="wrap">
        <div class="content">
            <div class="line_title">推送详情</div>
            <div class="p">[2021-07-02 12:00]  给以下客户联系人发送消息</div>
            <div class="item_wrap">
                <div class="item_title">客户</div>
                <div class="item_val">
                    <div class="info_box">
                        <div class="avatar"></div>
                        <div class="info">
                            <div class="name">小鱼儿<i>@微信/企业</i></div>
                            <div class="time">添加时间：2021-07-02 12:00</div>
                        </div>
                        <div class="btn">跟进</div>
                    </div>
                </div>
            </div>
            <div class="item_wrap">
                <div class="item_title">推送内容</div>
                <div class="item_val">
                    <div class="share_box" v-for="(item,index) in 2" :key="index">
                        <div class="s_val" v-if="index == 0">
                            <div class="des">欢迎您加入哈哈哈哈哈哈，一起加油吧~</div>
                        </div>
                        <div class="s_val" v-if="index == 1">
                            <div class="img_row">
                                <div class="img_box">
                                    <!-- <img :src="el.url" alt=""> -->
                                </div>
                                <div class="info_r">
                                    <div class="name">图片的副本.png</div>
                                    <div class="size">27.35K</div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="s_val">
                            <div class="share_link">{{el.url}}</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '~@/styles/color.less';
.wrap{
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    background: @white;
    .content{
        width: 100%;
        .line_title{
            font-size: 32px;
            line-height: 45px;
            font-weight: bold;
            color: @fontMain;
            padding-left: 20px;
            position: relative;
            margin-bottom: 24px;
            &::before{
                content: '';
                width: 8px;
                height: 32px;
                background: @main;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .p{
            color: @fontSub2;
            font-size: 28px;
            line-height: 40px;
            margin-bottom: 24px;
        }
        .item_wrap{
            width: 100%;
            min-height: 224px;
            border: 1px solid @dashedColor;
            border-radius: 8px;
            margin-bottom: 24px;
            &:last-child{
                margin-bottom: 0;
            }
            .item_title{
                width: 100%;
                height: 88px;
                background: @headerBg;
                font-size: 28px;
                line-height: 88px;
                color: @fontMain;
                font-weight: bold;
                padding-left: 50px;
                position: relative;
                &::before{
                    content: "";
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: @lengthColor;
                    position: absolute;
                    left: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .item_val{
                width: 100%;
                padding: 24px;
                .info_box{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .avatar{
                        width: 88px;
                        height: 88px;
                        border-radius: 8px;
                        background: @main;
                        margin-right: 16px;
                    }
                    .info{
                        width: calc(100% - 200px);
                        .name{
                            font-size: 28px;
                            line-height: 40px;
                            font-weight: bold;
                            color: @fontMain;
                            margin-bottom: 16px;
                            i{
                                font-style: normal;
                                color: @yellow;
                            }
                        }
                        .time{
                            font-size: 24px;
                            line-height: 32px;
                            color: @fontSub2;
                        }
                    }
                    .btn{
                        width: 96px;
                        height: 48px;
                        line-height: 44px;
                        font-size: 24px;
                        color: @main;
                        border: 1px solid @main;
                        background: rgba(@main,.02);
                        text-align: center;
                        border-radius: 4px;
                    }
                }
                .share_box {
                    width: 100%;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .s_val {
                        width: 100%;
                        min-height: 88px;
                        background: @white;
                        border: 1px solid @bdColor;
                        border-radius: 8px;
                        padding: 24px;
                    }
                    .des {
                        line-height: 40px;
                        font-size: 28px;
                        color: @fontSub2;
                        word-break: break-all;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .share_link {
                        line-height: 40px;
                        font-size: 28px;
                        color: #c0c4cc;
                        word-break: break-all;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .img_row {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        .img_box {
                            width: 112px;
                            height: 112px;
                            background: rgba(@main, 0.04);
                            border-radius: 4px;
                            overflow: hidden;
                            margin-right: 24px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .info_r {
                            width: calc(100% - 136px);
                            .name {
                                line-height: 40px;
                                font-size: 28px;
                                color: @fontMain;
                                margin-bottom: 12px;
                                word-break: break-all;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .size {
                                height: 32px;
                                font-size: 24px;
                                color: #c0c4cc;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>