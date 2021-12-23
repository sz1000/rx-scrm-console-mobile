<template>
    <div class="change-director">
        <van-action-sheet v-model="visible" :title="title" :safe-area-inset-bottom="true">
            <div class="van-content">
                <div class="change-content">
                    <div v-if="optionType == 'changeDirector'" class="now-user">
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
                    <span class="save" @click="save">保存</span>
                </div>
            </div>
        </van-action-sheet>

        <van-action-sheet v-model="chooseVisible">
            <van-picker title="" show-toolbar :columns="options" @confirm="onConfirm" @cancel="onCancel" value-key="name"/>
        </van-action-sheet>
    </div>
</template>
<script>
import { cluecustomer_getuserList, cluecustomer_turnBlon } from '@/api/customer'
import { throttle } from '@/utils/tool'

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
            optionType: '',
            clueCustomerNo: '',
            currentDirector: '',
            options: [],
            chooseVisible: false,
            chosedDirector: '',
            userNo: ''
        }
    },
    methods: {
        show(clueCustomerNo, type){
            this.clueCustomerNo = clueCustomerNo
            this.optionType = type
            this.getUserList(clueCustomerNo)
            this.visible = true
        },
        initData() {
            Object.assign(this.$data, this.$options.data())
        },
        hide() {
            this.initData()
            this.visible = false
        },
        async getUserList(clueCustomerNo) {
            let params = {
                clueCustomerNo
            }

            let { result, data, msg } = await cluecustomer_getuserList(params)

            if (result) {
                const { userNo, list } = data

                this.currentDirector = userNo
                this.options = list
            } else {
                this.$toast(msg)
            }
        },
        onConfirm(val) {
            const { userNo, name } = val

            this.userNo = userNo
            this.chosedDirector = name
            this.onCancel()
        },
        onCancel() {
            this.chooseVisible = false
        },
        save(){
            if(!throttle()) {
                return
            }

            let params = {
                cluecustomerno: this.clueCustomerNo,
                user_no: this.userNo,
                oldname: this.currentDirector,
            }

            cluecustomer_turnBlon(params).then(res => {
                const { result, msg } = res

                this.$toast(msg)
                if (result) {
                    this.$router.go(-1)
                }
            })
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
    /deep/.van-action-sheet__header {
        height: 88px;
        line-height: 88px;
        background: #fafbff;
        border-radius: 16px 16px 0px 0px;
        font-size: 32px;
        color: #3c4353;
        font-weight: 600;
    }
}
</style>