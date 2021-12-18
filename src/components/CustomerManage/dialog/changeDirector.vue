<template>
    <div class="change-director">
        <van-action-sheet v-model="visible" :title="title" :safe-area-inset-bottom="true">
            <div class="van-content">
                <div class="change-content">
                    <div class="now-user">
                        <span>现有负责人:</span>
                        <span>{{ currentDirector }}</span>
                    </div>
                    <div class="select-user">
                        <div class="label"><span class="tag">*</span>指定负责人:</div>
                        <input class="value" type="text" readonly="readonly" placeholder="请选择" :value="chosedDirector" @click="chooseVisible = true" />
                    </div>
                </div>
                <div class="btn-warp">
                    <span class="cancel" @click="hide">取消</span>
                    <span class="save" @click="save">确定</span>
                </div>
            </div>
        </van-action-sheet>

        <van-action-sheet v-model="chooseVisible" title="选择负责人">
            <van-picker title="" show-toolbar :columns="options" @confirm="onConfirm" @cancel="onCancel" value-key="name"/>
        </van-action-sheet>
    </div>
</template>
<script>
import { cluecustomer_getuserList } from '@/api/customer'

export default {
    name: 'changeDirector',
    props: {
        fromType: {
            default: '0'
        },
        title: {
            type: String,
            default: '变更负责人'
        },
    },
    data(){
        return {
            visible: false,
            currentDirector: '',
            options: [],
            chooseVisible: false,
            chosedDirector: '',
            userNo: ''
        }
    },
    methods: {
        show(clueCustomerNo){
            this.getUserList(clueCustomerNo)
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        async getUserList(clueCustomerNo) {
            let params = {
                clueCustomerNo
            }

            let { code, data, msg } = await cluecustomer_getuserList(params)

            if (code == 'success') {
                const { userNo, list } = data

                this.currentDirector = userNo
                this.options = list
            } else {
                this.$toast(msg)
            }
        },
        onConfirm(value, index) {
            // console.log(`当前值：${value}, 当前索引：${index}`);
            console.log(value)
            const { userNo, name } = value

            this.userNo = userNo
            this.chosedDirector = name
            this.onCancel()
        },
        onCancel() {
            this.chooseVisible = false
        },
        save(data){
            // this.$emit('save', data)
        },
    },
}
</script>
<style lang="less" scoped>
@import "~@/styles/color.less";
/* 旧样式 */
.change-director {
    .van-content {
        padding: 24px 32px;
        .change-content {
            height: 490px;
            .now-user {
                display: inline-block;
                margin: 15px 0 25px 12px;
                span {
                    font-size: 30px;
                    color: @fontSub3;
                    &:nth-child(2) {
                        margin-left: 15px;
                        color: @fontSub2;
                    }
                }
            }
            .select-user {
                display: flex;
                align-items: center;
                font-size: 30px;
                .label {
                    min-width: 160px;
                    .tag {
                        color: @red;
                    }
                }
                .value {
                    width: calc(100% - 200px);
                    height: 64px;
                    line-height: 64px;
                    margin-left: 15px;
                    padding: 0 12px;
                    border: 2px solid @bdColor;
                    border-radius: 8px;
                }
            }
        }
        .btn-warp {
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            span {
                display: inline-block;
                width: 339px;
                height: 80px;
                border-radius: 8px;
                border: 2px solid @main;
                text-align: center;
                line-height: 80px;
            }
            .cancel {
                color: @main;
                background: @white;
            }
            .save {
                background: @main;
                color: @white;
            }
        }
    }
}
</style>