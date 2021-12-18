<template>
    <DialogDetail :title="title" v-model="dialog" className="tag" isOpera>
        <!-- 企业标签 -->
        <div class="dialog_row" v-if="type == 'company'">
            <div class="dialog_item" v-for="(item,index) in companyList" :key="index">
                <div class="label">{{item.name}}</div>
                <div class="val">
                    <div class="tag" @click="tagChangeFun(son)" :class="{'cur':son.active}" v-for="(son,i) in item.children" :key="i">{{son.name}}</div>
                </div>
            </div>
        </div>
        <!-- 个人标签 -->
        <div class="dialog_row" v-if="type == 'person'">
            <div class="add_btn" @click="addFun" v-if="isAdd">
                <img class="icon" src="@/assets/svg/icon_btn_add.svg" alt="">
                <span class="text">添加</span>
            </div>
            <div class="input_box" v-else>
                <input type="text" class="input" v-model="msg" @input="msg=msg.replace(' ','')" @keyup.enter="confirmFun('add')" maxlength="20" placeholder="输入后回车">
                <span class="btn" @click="isAdd = true">取消</span>
                <span class="btn main" @click="confirmFun('add')">确定</span>
            </div>
            <div class="tag_box">
                <div class="icon_tag" @click="tagChangeFun(item)" :class="{'cur':item.isChecked}" v-for="item in personList" :key="item.id">
                    <span class="text">{{item.name}}</span>
                    <jzIcon class="icon" @click.native.stop="confirmFun('delete',item)" type="icon-shanchu"></jzIcon>
                </div>
            </div>
        </div>
        <div class="opera_box" slot="footer_box">
            <div class="btn" @click="confirmFun">确定</div>
        </div>
    </DialogDetail>
</template>

<script>
import { DialogDetail } from '../components'
export default {
    name: 'tagDialog',
    components: {
        DialogDetail
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '标签'
        },
        type: {
            type: String,
            default: '',        //company or person
            required: true
        },
        companyList: {
            type: Array,
            default: () => []
        },
        personList: {
            type: Array,
            default: () => []
        },
    },
    data(){
        return {
            isAdd: true,
            msg: '',
        }
    },
    computed: {
        dialog: {
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        },
    },
    methods: {
        tagChangeFun(row){     //企业标签选择
            console.log('row',row)
            if(this.type == 'company'){
                row.active = !row.active
            }else{
                row.isChecked = row.isChecked ? 0 : 1
            }
        },
        addFun(){   //新增标签
            this.msg = ''
            this.isAdd = false
        },
        confirmFun(type,val){
            let _type = type == 'add' || type == 'delete' ? type : this.type
            let _data = null
            switch (_type) {
                case 'add':
                    _data = this.msg
                    this.isAdd = true
                    break;
                case 'delete':
                    _data = val
                    break;
                case 'company':
                    _data = []
                    this.companyList.forEach(el => {
                        el.children.forEach(son => {
                            if(son.active){
                                _data.push(son)
                            }
                        })
                    })
                    break;
                case 'person':
                    _data = []
                    this.personList.forEach(el => {
                        if(el.isChecked){
                            _data.push(el)
                        }
                    })
                    break;
                default:
                    break;
            }
            console.log('sure',_type,_data)
            this.$emit('sure',_type,_data)
        },
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.opera_box{
    width: 100%;
    padding: 24px 40px;
    border-top: 1px solid @lineColor; /* no */
    position: relative;
    .btn{
        width: 100%;
        color: @white;
        background: @main;
        border-radius: 16px;
        font-size: 32px;
        line-height: 40px;
        font-weight: bold;
        padding: 28px 0;
        text-align: center;
        position: relative;
    }
}
.dialog_row{
    width: 100%;
    padding: 0 32px;
    .add_btn{
        width: fit-content;
        display: flex;
        align-items: center;
        padding: 14px 24px;
        position: relative;
        &::before{
            content: '';
            width: 200%;
            height: 200%;
            border: 1px solid @placeholder; /* no */
            border-radius: 16px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) scale(.5);
        }
        .icon{
            width: 24px;
            height: 24px;
            margin-right: 12px;
        }
        .text{
            flex: 1;
            font-size: 28px;
            line-height: 36px;
            color: @fontSub1;
            font-weight: bold;
        }
    }
    .input_box{
        width: 100%;
        display: flex;
        align-items: center;
        .input{
            flex: 1;
            height: 64px;
            border-radius: 8px;
            border: 1px solid @placeholder;
            color: @fontMain;
            padding: 0 24px;
            position: relative;
        }
        .btn{
            font-size: 28px;
            line-height: 36px;
            color: @fontSub1;
            margin-left: 24px;
            font-weight: bold;
            &.main{
                color: @main;
            }
        }
    }
    .tag_box{
        margin-top: 40px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .icon_tag{
            width: fit-content;
            display: flex;
            align-items: center;
            background: @navBg;
            border-radius: 8px;
            padding: 0 16px;
            position: relative;
            margin-right: 24px;
            margin-bottom: 24px;
            &.cur{
                background: rgba(@main,.06);
                .text,.icon{
                    color: @main;
                }
                position: relative;
                &::before{
                    content: '';
                    width: 200%;
                    height: 200%;
                    border-radius: 16px;
                    border: 1px solid @main; /* no */
                    transform: scale(.5);
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%) scale(.5);
                }
            }
            .text{
                font-size: 28px;
                line-height: 64px;
                color: @fontSub1;
            }
            .icon{
                font-size: 18px;
                margin-left: 18px;
                color: @placeholder;
            }
        }
    }
    .dialog_item{
        width: 100%;
        margin-bottom: 24px;
        .label{
            font-size: 28px;
            line-height: 36px;
            color: @fontMain;
            font-weight: bold;
            margin-bottom: 24px;
        }
        .val{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .tag{
                height: 64px;
                color: @fontSub1;
                background: @navBg;
                font-size: 28px;
                line-height: 64px;
                border-radius: 8px;
                padding: 0 24px;
                margin-right: 24px;
                margin-bottom: 24px;
                &.cur{
                    color: @main;
                    background: rgba(@main,.06);
                    position: relative;
                    &::before{
                        content: '';
                        width: 200%;
                        height: 200%;
                        border-radius: 16px;
                        border: 1px solid @main; /* no */
                        transform: scale(.5);
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%) scale(.5);
                    }
                }
            }
        }
    }
}
</style>