<template>
    <div class="apply_box">
        <div class="title">申请成为协助人</div>
        <div class="item_box">
            <div class="tips_box">
                <img class="icon" src="@/assets/svg/icon_tips.svg" alt="">
                <div class="tip">协助人规则生效中，若24小时未处理，系统将自动通过</div>
            </div>
            <div class="item">
                <div class="label">申请人</div>
                <div class="val">
                    <div class="info">
                        <div class="avatar"></div>
                        <div class="name">陈良-运营部</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">客户</div>
                <div class="val">
                    <div class="info">
                        <div class="avatar"></div>
                        <div class="name">陈良</div>
                        <div class="alt">@微信</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="label">申请时间</div>
                <div class="val">2020-01-01 12:30:30</div>
            </div>
        </div>
        <div class="opera_box">
            <div class="btn plain">拒绝</div>
            <div class="btn">通过</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '~@/styles/color.less';
.apply_box{
    width: 100%;
    min-height: 100vh;
    background: @white;
    .title{
        font-size: 30px;
        line-height: 44px;
        color: @fontMain;
        padding: 22px 0;
        text-align: center;
    }
    .tips_box{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .icon{
            width: 30px;
            height: 30px;
            margin-right: 8px;
        }
        .tip{
            font-size: 24px;
            line-height: 40px;
            color: @fontSub1;
        }
    }
    .item_box{
        width: 100%;
        height: calc(100vh - 230px);
        padding: 0 32px;
    }
    .item{
        width: 100%;
        padding: 32px 0;
        display: flex;
        font-size: 28px;
        line-height: 36px;
        color: @fontMain;
        .label{
            width: 160px;
        }
        .val{
            width: calc(100% - 120px);
            font-weight: 500;
            text-align: right;
            .info{
                display: flex;
                align-items: center;
                justify-content: right;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(0,0,0,.05);
                    margin-right: 8px;
                }
                .name{
                    font-size: 24px;
                    line-height: 32px;
                    color: @fontMain;
                    font-weight: 400;
                }
                .alt{
                    font-size: 20px;
                    line-height: 28px;
                    color: @green;
                    &.yellow{
                        color: @yellow;
                    }
                }
            }
        }
    }
    .opera_box{
        width: 100%;
        padding: 16px 32px;
        display: flex;
        .btn{
            flex: 1;
            border: 1px solid @main; /* no */
            background: @main;
            font-size: 32px;
            line-height: 44px;
            color: @white;
            border-radius: 16px;
            padding: 17px 0 ;
            text-align: center;
            transition: all .2s;
            &:active{
                background: rgba(@main,.85);
                border-color: rgba(@main,.85);
            }
            &.plain{
                color: @main;
                background: @white;
                border-color: @main;
                margin-right: 24px;
                &:active{
                    background: rgba(@main,.08);
                }
            }
        }
    }
}
</style>