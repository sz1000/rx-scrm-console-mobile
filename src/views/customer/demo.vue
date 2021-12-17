<template>
    <div class="enclosure_wrap">
        <div class="tit_box">
            <div class="tit">附件</div>
            <div class="icon_upload">
                <img class="icon" src="@/assets/svg/icon_upload.svg" alt="">
                <input class="file" @change="uploadFun" type="file">
            </div>
        </div>
        <div class="enclosure_list">
            <van-swipe-cell v-for="(item,index) in 3" :key="index">
                <div class="li">
                    <!-- <div class="icon"></div> -->
                    <img class="icon" :src="fileIcon('word')" alt="">
                    <div class="val">
                        <div class="name">公司介绍文件.pdf</div>
                        <div class="text">上传于 2021.10.23</div>
                    </div>
                    <div class="opera" @click="dialog = true">
                        <img class="icon_point" src="@/assets/svg/icon_point.svg" alt="">
                    </div>
                </div>
                <template #right>
                    <van-button text="下载" class="dowload_button btn" />
                    <van-button text="删除" class="delete_button btn" />
                </template>
            </van-swipe-cell>
        </div>
        <!-- 操作面板 -->
        <van-action-sheet v-model="dialog" :actions="actions" cancel-text="取消" close-on-click-action @select="selectFun"/>
    </div>
</template>

<script>
import { cluecustomeraccessory_upload } from '@/api/customer'
export default {
    data(){
        return {
            dialog: false,
            actions: [{ name: '下载' }, { name: '删除' }],
        }
    },
    methods: {
        selectFun(action,index){
            console.log('asd',action,index)
        },
        uploadFun(e){    //附件上传
            cluecustomeraccessory_upload(e,'A280C994F2114D3ABFA02FAED9B8B081').then(res => {
                if(res.result){

                }
            })
        },
        fileIcon(val){
            let obj = {
                pdf: require('@/assets/svg/pdf.svg'),
                ppt: require('@/assets/svg/ppt.svg'),
                img: require('@/assets/svg/pic.svg'),
                excel: require('@/assets/svg/excel.svg'),
                word: require('@/assets/svg/word.svg'),
            }
            return obj[val]
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.enclosure_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
    padding: 40px 0;
    .van-popup{
        .van-action-sheet__gap{
            height: 24px;
        }
        .van-action-sheet__cancel,.van-action-sheet__item{
            height: 102px;
            font-size: 32px;
            .van-action-sheet__name{
                font-size: 32px;
            }
        }
    }
    .tit_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        padding: 0 32px;
        .tit{
            font-size: 28px;
            line-height: 36px;
            color: @fontMain;
            font-weight: bold;
        }
        .icon_upload{
            width: 32px;
            height: 32px;
            position: relative;
            .icon{
                width: 100%;
                height: 100%;
            }
            .file{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
    }
    .enclosure_list{
        width: 100%;
        .btn{
            height: 100%;
            width: 120px;
            color: @white;
        }
        .delete_button{
            background: @red;
            border-color: @red;
        }
        .dowload_button{
            background: @main;
            border-color: @main;
        }
        .li{
            padding: 24px 32px;
            display: flex;
            align-items: center;
            .icon{
                width: 80px;
                height: 80px;
                border-radius: 8px;
                margin-right: 16px;
            }
            .val{
                // width: calc(100% - 140px);
                flex: 1;
                .name{
                    font-size: 28px;
                    line-height: 36px;
                    color: @fontMain;
                    margin-bottom: 12px;
                }
                .text{
                    font-size: 24px;
                    line-height: 32px;
                    color: @total;
                }
            }
            .opera{
                width: 36px;
                height: 36px;
                .icon_point{
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>