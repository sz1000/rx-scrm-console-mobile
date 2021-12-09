<template>
    <div class="group_box">
        <div class="group_list">
            <div class="li" @click="toFun(item.chatId)" v-for="(item,index) in list" :key="index">
                <div class="group_img" :class="{'len5': item.imgList && item.imgList.length > 4 && item.imgList.length < 7}">
                    <div class="img_box" :class="{'w33':item.imgList && item.imgList.length > 4}" v-for="(url,i) in item.imgList" :key="i">
                        <img class="img" :src="url" alt="">
                    </div>
                </div>
                <div class="val">
                    <div class="title">{{item.groupName}}（{{item.total}}人）</div>
                    <div class="time">建群时间：{{item.createTime | $time('YYYY-MM-DD HH:mm')}}</div>
                    <div class="info">
                        <div class="img_box">
                            <img class="img" :src="item.owmerAvatar" alt="">
                        </div>
                        <div class="name">{{item.owmerName}}</div>
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
        return {}
    },
    computed: {
        list(){
            this.data.forEach(el => {
                let list = []
                list = el.groupUavatar.split('、')
                el.imgList = list.filter(el => {
                    return el != ''
                })
                // el.imgList = el.groupUavatar.split('、')
            })
            return this.data && this.data.length ? this.data : []
        },
    },
    methods: {
        toFun(id){
            this.$emit('sure',id)
        },
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
            // border-bottom: 1px solid @lineColor;    /*no*/
            position: relative;
            &::before{
                content: '';
                width: 100%;
                height: 1px;   /*no*/
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                left: 0;
                bottom: 0;
            }
            .group_img{
                width: 80px;
                height: 80px;
                background: @navBg;
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
                    // background: chocolate;
                    border: 1px solid @white;   /*no*/
                    text-align: center;
                    &:first-child:nth-last-child(2),&:first-child:nth-last-child(2) ~ .img_box{
                        width: calc(80px / 2);
                        height: calc(80px / 2);
                    }
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
                    .img{
                        width: 100%;
                        height: 100%;
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
                    width: 100%;
                    word-break: break-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                        background: rgba(0, 0, 0, .05);
                        margin-right: 8px;
                        .img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .name{
                        font-size: 24px;
                        line-height: 32px;
                        color: @total;
                        max-width: 190px;
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