<template>
    <div class="group_box">
        <div class="group_list">
            <div class="li" v-for="(item,index) in list" :key="index">
                <div class="group_img" :class="{'len5': list.length > 4 && list.length < 7}">
                    <div class="img_box" :class="{'w33':list.length > 4}" v-for="(s,i) in list" :key="i">{{i}}</div>
                </div>
                <div class="val">
                    <div class="title">量子科技精英群（5人）</div>
                    <div class="time">建群时间：2021-12-12 13:24</div>
                    <div class="info">
                        <div class="img_box"></div>
                        <div class="name">陈良-运营部</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Group',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            list: [
                {},
                {},
                {},
                {},
                // {},
                // {},
                // {},
                // {},
                // {},
            ],
        }
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.group_box{
    width: 100%;
    padding: 0 32px;
    .group_list{
        width: 100%;
        .li{
            width: 100%;
            display: flex;
            padding: 32px 0;
            border-bottom: 1px solid @lineColor;
            .group_img{
                width: 80px;
                height: 80px;
                background: rgba(0,0,0,.03);
                margin-right: 24px;
                display: flex;
                flex-wrap: wrap-reverse;
                justify-content: center;
                align-items: center;
                &.len5{
                    padding: calc(80px / 6) 0;
                }
                .img_box{
                    // width: 33.33%;
                    // height: calc(80px / 3);
                    background: chocolate;
                    border: 1px solid @white;
                    text-align: center;
                    &:first-child:nth-last-child(3),&:first-child:nth-last-child(3) ~ .img_box{
                        width: calc(80px / 2);
                        height: calc(80px / 2);
                    }
                    &:first-child:nth-last-child(4),&:first-child:nth-last-child(4) ~ .img_box{
                        width: calc(80px / 2);
                        height: calc(80px / 2);
                    }
                    // &:first-child:nth-last-child(5),&:first-child:nth-last-child(5) ~ .img_box{
                    //     width: calc(80px / 3);
                    //     height: calc(80px / 3);
                    // }
                    // &:first-child:nth-last-child(6),&:first-child:nth-last-child(6) ~ .img_box{
                    //     width: calc(80px / 3);
                    //     height: calc(80px / 3);
                    // }
                    &.w33{
                        width: calc(80px / 3);
                        height: calc(80px / 3);
                    }
                }
            }
            .val{
                width: calc(100% - 104px);
                position: relative;
                .title{
                    font-size: 28px;
                    line-height: 36px;
                    font-weight: bold;
                    color: @fontMain;
                    margin-bottom: 12px;
                }
                .time{
                    font-size: 24px;
                    line-height: 32px;
                    color: @total;
                }
                .info{
                    display: flex;
                    align-items: center;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    .img_box{
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background: rgba(0, 0, 0, .05);
                        margin-right: 8px;
                    }
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @total;
                    }
                }
            }
        }
    }
}
</style>