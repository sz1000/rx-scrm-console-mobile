<template>
    <div class="top_box">
        <div class="customer_card" @click="toFun('detail')">
            <!-- <div class="score">7832分</div> -->
            <div v-if="fromType == 1 && isPortrait" class="clue-tag">线索</div>
            <div class="info_box">
                <div class="avatar pointer">
                    <img v-if="customerInfo.avatar" class="img" :src="customerInfo.avatar" alt="">
                    <span v-else class="default-img">{{ customerInfo.customerCalled ? customerInfo.customerCalled.slice(0, 1) :  ''}}</span>
                </div>
                <div class="val pointer">
                    <div class="name_box" v-if="customerInfo.customerCalled">
                        <div class="name">{{customerInfo.customerCalled}}</div>
                        <div class="alt" :class="{'green':customerInfo.externalType == 1}" v-if="customerInfo.externalType && customerInfo.customerCalled.length < 10">{{customerInfo.externalType == 1 ? '@微信' : `@${customerInfo.customerName || customerInfo.cropFullName}`}}</div>
                        <div class="icon" v-if="customerInfo.customerCalled.length < 10">
                            <img src="@/images/icon_female@2x.png" v-if="customerInfo.gender == '2'" />
                            <img src="@/images/man.png" v-if="customerInfo.gender == '1'" />
                        </div>
                    </div>
                    <div class="p">{{customerInfo.mobil}}</div>
                    <div class="p">{{customerInfo.cropFullName}}</div>
                    <div v-if="fromType == 1 || fromType == 3" class="person" @click.stop="toFun('helper')">
                        <div class="img_box" :class="`m${personList.length}`">
                            <img class="img" :src="item.avatar" v-for="(item,index) in personList" :key="index">
                        </div>
                        <div class="text">
                            <span class="limit">{{getUserObj('name')}}</span>
                            <span class="son">等{{userList.length}}人</span>
                        </div>
                        <img class="icon_next" src="@/assets/svg/icon_next_gray.svg">
                    </div>
                </div>
            </div>
            <div class="tag_box" :class="{'opt0': !customerInfo.stage && !customerInfo.source && !customerInfo.customerType && tagList.length == 0}">
                <div v-if="customerInfo.stage" class="tag first">{{ customerInfo.stage }}</div>
                <div v-if="customerInfo.sourceName" class="tag" :class="{first: !customerInfo.stage}">{{ customerInfo.sourceName }}</div>
                <div v-if="(fromType == 1 || fromType == 2) && customerInfo.clueTypeName" class="tag" :class="{first: !customerInfo.sourceName}">{{ customerInfo.clueTypeName }}</div>
                <div v-if="(fromType == 3 || fromType == 4) && customerInfo.customerTypeName" class="tag" :class="{first: !customerInfo.sourceName}">{{ customerInfo.customerTypeName }}</div>
                <div class="tag" v-for="(item, index) in tagList" v-show="item.name" :key="index">{{item.name | limitFilter}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopCard',
    props: {
        fromType: {  // 1: 线索 2: 公海线索 3: 客户 4: 公海客户
            default: '0'
        },
        customerInfo: {
            type: Object,
            default: () => {}
        },
        userList: {
            type: Array,
            default: () => []
        },
        tagList: {
            type: Array,
            default: () => []
        },
        isPortrait: {   //是否是客户画像（侧边栏）
            type: Boolean,
            default: false
        },
    },
    computed: {
        personList(){
            let list = this.userList
            return list && list.length ? list.slice(0,3) : ''
        },
    },
    methods: {
        toFun(type){
            this.$emit('jump',type)
        },
        getUserObj(){
            let list = this.userList
            if(!list || list.length == 0){return}
            let arr = [],str = ''
            list.forEach((el,index) => {
                if(index < 3){
                    arr.push(el.name)
                }
            })
            str = arr.join('、')
            return str
        },
    },
    filters: {
        limitFilter(val){
            return val && val.length > 6 ? val.substring(0,5) + '...' : val
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.top_box{
    width: 100%;
    padding: 32px;
    .customer_card {
        width: 100%;
        // min-height: 392px;
        background: @white;
        box-shadow: 0px 10px 32px 0px rgba(0, 0, 0, 0.07);
        border-radius: 24px;
        padding: 40px 32px 24px 32px;
        position: relative;
        .score, .clue-tag{
            width: 136px;
            height: 56px;
            background: linear-gradient(186deg, #76A1FB 0%, #4168F6 100%);
            border-radius: 0 22px 0px 35px;
            line-height: 56px;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            color: @white;
            position: absolute;
            top: 0;
            right: 0;
        }
        .clue-tag {
            background: linear-gradient(to right, #FFC029, #FFE153);
        }
        .info_box{
            width: 100%;
            display: flex;
            margin-bottom: 32px;
        }
        .avatar{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background: rgba(@placeholder,.2);
            margin-right: 32px;
            font-size: 0;
            .img, .default-img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .default-img {
                display: block;
                line-height: 120px;
                color: @white;
                font-size: 36px;
                background-color: @main;
                text-align: center;
            }
        }
        .val{
            width: calc(100% - 152px);
            .name_box{
                display: flex;
                align-items: flex-end;
                margin-bottom: 16px;
                overflow: hidden;
                .name{
                    color: @fontMain;
                    line-height: 48px;
                    font-size: 36px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    // max-width: calc(100% - 200px);
                    max-width: 100%;
                    font-weight: bold;
                }
                .alt{
                    font-size: 24px;
                    line-height: 32px;
                    color: @yellow;
                    max-width: 160px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-left: 8px;
                    &.green{
                        color: @green;
                    }
                }
                .icon{
                    width: 26px;
                    height: 26px;
                    font-size: 26px;
                    margin-left: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .p{
                font-size: 28px;
                line-height: 36px;
                color: @fontSub1;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-bottom: 16px;
            }
            .person{
                width: fit-content;
                height: 52px;
                border-radius: 26px;
                // border: 1px solid @bdColor; /*no*/
                display: flex;
                align-items: center;
                padding: 0 16px;
                color: @fontSub1;
                position: relative;
                &::before{
                    content: '';
                    width: 200%;
                    height: 200%;
                    border-radius: 52px;
                    border: 1px solid @bdColor; /*no*/
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%) scale(.5);
                }
                .img_box{
                    display: flex;
                    width: 32px;
                    margin-right: 10px;
                    &.m2{
                        width: calc(32px * 1.75);
                    }
                    &.m3{
                        width: calc(32px * 2.5);
                    }
                    &.m4{
                        width: calc(32px * 3.25);
                    }
                    &.m5{
                        width: calc(32px * 4);
                    }
                    .img{
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        border-radius: 50%;
                        border: 1px solid @white; /*no*/
                        &:nth-child(2){
                            transform: translateX(-25%);
                        }
                        &:nth-child(3){
                            transform: translateX(-50%);
                        }
                        &:nth-child(4){
                            transform: translateX(-75%);
                        }
                        &:nth-child(5){
                            transform: translateX(-100%);
                        }
                    }
                }
                .text{
                    font-size: 20px;
                    color: @fontSub1;
                    span{
                        line-height: 30px;
                        display: inline-block;
                        vertical-align: middle;
                        padding: 10px 0;
                    }
                    .limit{
                        max-width: calc(100vw - 560px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .icon_next{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .tag_box{
            height: 86px;
            padding: 24px 0 0 3px;
            white-space: normal;
            position: relative;
            overflow: hidden;
            &::before{
                content: '';
                width: 100%;
                height: 1px;   /*no*/
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                left: 0;
                top: 0;
            }
            &.opt0{
                opacity: 0;
            }
            .tag{
                display: inline-block;
                height: 52px;
                line-height: 52px;
                padding: 0 16px;
                margin-bottom: 12px;
                white-space: nowrap;
                font-size: 28px;
                color: @fontSub1;
                position: relative;
                &::before{
                    content: '';
                    width: 200%;
                    height: 200%;
                    border-radius: 4px;
                    border: 1px solid @bdColor; /*no*/
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%) scale(.5);
                }
                &+.tag{
                    margin-left: 16px;
                }
            }
            .first {
                background: rgba(65, 104, 246, 0.06);
                color: @main;
                &::before {
                    border-color: @main;
                }
            }
        }
    }
}
</style>