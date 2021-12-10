<template>
    <div class="detail_wrap">
        <div class="top_box">
            <div class="avatar_box">
                <div class="avatar"></div>
                <div class="name">小鱼儿</div>
                <div class="alt">@企业</div>
            </div>
        </div>
        <div class="content">
            <div class="row tag">
                <div class="tit">企业标签</div>
                <div class="tag_box">
                    <div class="tag" v-for="(item,index) in 8" :key="index">有意向购买</div>
                </div>
            </div>
            <div class="row tag">
                <div class="tit">个人标签</div>
                <div class="tag_box">
                    <div class="tag" v-for="(item,index) in 8" :key="index">潜力股客户</div>
                </div>
            </div>
            <div class="row">
                <div class="tit">基本信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">客户简称</div>
                        <div class="val">客户简称</div>
                    </div>
                    <div class="item">
                        <div class="label">固定电话</div>
                        <div class="val">
                            <input type="text" class="input" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户来源</div>
                        <div class="val">
                            <div class="icon_select" @click="dialog = true">
                                <span class="text">扫描二维码</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户类型</div>
                        <div class="val">
                            <div class="icon_select">
                                <span class="text">微信用户</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">客户阶段</div>
                        <div class="val">
                            <div class="icon_select">
                                <span class="text">沟通</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">公司名称</div>
                        <div class="val">
                            <input type="text" class="input" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">企业规模</div>
                        <div class="val">
                            <div class="icon_select">
                                <span class="placeholder">请选择</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">所属行业</div>
                        <div class="val">
                            <div class="icon_select">
                                <span class="text">教育/高等教育</span>
                                <img class="icon" src="@/assets/svg/icon_next_gray.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">地址</div>
                        <div class="val">
                            <input type="text" class="input" maxlength="200" placeholder="请输入">
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">备注</div>
                        <div class="val">
                            <input type="text" class="input" maxlength="200" placeholder="请输入（不得超过200个字符）">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">联系人信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">联系人</div>
                        <div class="val">无名氏</div>
                    </div>
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="val">女</div>
                    </div>
                    <div class="item">
                        <div class="label">手机号</div>
                        <div class="val">17782349586</div>
                    </div>
                    <div class="item">
                        <div class="label">微信号</div>
                        <div class="val">sunshine0209</div>
                    </div>
                    <div class="item">
                        <div class="label">微信昵称</div>
                        <div class="val">昵称</div>
                    </div>
                    <div class="item">
                        <div class="label">职务</div>
                        <div class="val">销售</div>
                    </div>
                    <div class="item">
                        <div class="label">邮箱</div>
                        <div class="val">sunshine0209@qq.com</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">自定义信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">自定义金额</div>
                        <div class="val">5-10万</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">系统信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">添加人员</div>
                        <div class="val">abcdefg</div>
                    </div>
                    <div class="item">
                        <div class="label">添加客户时间</div>
                        <div class="val">2021-07-02 15:23</div>
                    </div>
                    <div class="item">
                        <div class="label">前负责人</div>
                        <div class="val">abcdefg</div>
                    </div>
                    <div class="item">
                        <div class="label">转换时间</div>
                        <div class="val">2021-07-02</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tit">企微信息</div>
                <div class="item_box">
                    <div class="item">
                        <div class="label">客户简称</div>
                        <div class="val">大熊网络科技</div>
                    </div>
                    <div class="item">
                        <div class="label">客户来源</div>
                        <div class="val">扫描二维码</div>
                    </div>
                    <div class="item">
                        <div class="label">公司名称</div>
                        <div class="val">上海大熊网络科技有限公司</div>
                    </div>
                    <div class="item">
                        <div class="label">客户类型</div>
                        <div class="val">微信用户</div>
                    </div>
                    <div class="item">
                        <div class="label">姓名</div>
                        <div class="val">某某某</div>
                    </div>
                    <div class="item">
                        <div class="label">性别</div>
                        <div class="val">男</div>
                    </div>
                    <div class="item">
                        <div class="label">职务</div>
                        <div class="val">技术开发</div>
                    </div>
                    <div class="item">
                        <div class="label">添加人员</div>
                        <div class="val">技术开发</div>
                    </div>
                    <div class="item">
                        <div class="label">添加客户时间</div>
                        <div class="val">2021-07-02 10:20:55</div>
                    </div>
                    <div class="item">
                        <div class="label">备注</div>
                        <div class="val">这个也许会非常的长，换行显示，还是很长拉高行高，就像现在这个样子。</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 客户来源 -->
        <SelectDialog :data="customerList" title="客户来源" v-model="dialog" @confirm="selectedFun"></SelectDialog>
    </div>
</template>

<script>
import { SelectDialog } from './components'
import {
  cluecustomer_toupdate,
  cluecustomer_update,
  cluecustomer_gettag,
  cluecustomer_addtag,
  cluecustomer_updPertag,
  cluecustomer_deltag,
  cluecustomer_updCorptag,
} from '@/api/customer'
export default {
    components: {
        SelectDialog
    },
    data(){
        return {
            id: this.$route.query,
            dialog: false,
            customerList:[],        //客户来源
        }
    },
    methods: {
        getDetail(){
            cluecustomer_toupdate(this.id).then(res => {
                if(res.result){
                    let data = res.data
                    this.customerList = data.list
                }
            })
        },
        selectedFun(val){   //筛选项确认

        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.detail_wrap{
    width: 100%;
    min-height: 100vh;
    background: @white;
    .top_box{
        width: 100%;
        padding: 32px;
        position: relative;
        &::before{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            top: 0;
            left: 0;
        }
        &::after{
            content: '';
            width: 100%;
            height: 1px; /* no */
            background: @lineColor;
            transform: scaleY(.5);
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .avatar_box{
            display: flex;
            align-items: center;
            .avatar{
                width: 100px;
                height: 100px;
                background: rgba(0,0,0,.05);
                border-radius: 50%;
                margin-right: 24px;
            }
            .name{
                color: @fontMain;
                font-weight: bold;
                font-size: 36px;
                line-height: 48px;
            }
            .alt{
                color: @yellow;
                font-size: 24px;
                line-height: 32px;
                margin-left: 8px;
            }
        }
    }
    .content{
        width: 100%;
        padding: 32px;
        .row{
            width: 100%;
            position: relative;
            padding-bottom: 64px;
            margin-bottom: 32px;
            &.tag{
                padding-bottom: 40px;
                .tit{
                    margin-bottom: 32px;
                }
            }
            &:last-child{
                margin-bottom: 0;
                &::after{
                    display: none;
                }
            }
            &::after{
                content: '';
                width: 100%;
                height: 1px; /* no */
                background: @lineColor;
                transform: scaleY(.5);
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .tit{
                font-size: 24px;
                line-height: 32px;
                color: @total;
            }
            .tag_box{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .tag{
                    color: @fontSub1;
                    line-height: 52px;
                    height: 52px;
                    background: @navBg;
                    border-radius: 8px;
                    padding: 0 16px;
                    margin-right: 16px;
                    margin-bottom: 24px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .item_box{
                width: 100%;
                .item{
                    display: flex;
                    align-items: center;
                    font-size: 28px;
                    line-height: 36px;
                    color: @fontMain;
                    padding: 32px 0;
                    .label{
                        width: 180px;
                        font-weight: bold;
                    }
                    .val{
                        width: calc(100% - 180px);
                        text-align: right;
                        display: flex;
                        justify-content: right;
                        .input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            text-align: right;
                        }
                        .icon_select{
                            display: flex;
                            align-items: center;
                            .placeholder{
                                color: @total;
                            }
                            .icon{
                                width: 32px;
                                height: 32px;
                                // margin-left: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>