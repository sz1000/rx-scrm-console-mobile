<template>
    <div class="reprint">
        <header-title title="转载公众号文章"></header-title>
        <div v-if="type == 1" class="link-box">
            <ul class="link-des">
                <li class="line-title">文章链接</li>
                <li class="link-inp">
                    <input class="text" type="text" v-model="articleUrl" placeholder="请输入">
                </li>
            </ul>
            <div class="reprint-btn">
                <span @click="goEdit">转载文章</span>
            </div>
        </div>

        <reprint-edit v-if="type == 2" ref="reprintEdit" :articleUrl="articleUrl"></reprint-edit>
    </div>
</template>
<script>
import HeaderTitle from '../../components/MaterialTemplate/headerTitle'
import ReprintEdit from '../../components/MaterialTemplate/reprintEdit'
import { IsURL } from '../../utils/tool'

export default {
    name: 'reprint',
    data() {
        return {
            type: 1, // 1: 输入链接, 2: 编辑文章
            articleUrl: ''
        }
    },
    provide() {
        return {
            initType: this.initType,
            goBack: this.goBack
        }
    },
    methods: {
        goEdit() {
            if (!this.articleUrl) {
                this.$toast("请输入公众号链接")
                return
            }
            if (!IsURL(this.articleUrl)) {
                this.$toast("请输入正确的公众号链接")
                return
            }
            this.type = 2
            this.$nextTick(() => {
                this.$refs.reprintEdit.getDetails()
            })
        },
        initType() {
            this.type = 1
        },
        goBack() {
            this.$router.push({
                path: '/talkTool/verbalTrick',
                query: { comeFrom: 2 },
            })
        },
    },
    components: {
        HeaderTitle,
        ReprintEdit
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.reprint{
    width: 100%;
    min-height: 100%;
    background-color: @white;
    overflow-x: hidden;
    .link-box {
        padding: 32px;
        .link-des {
            .line-title {
                color: @fontMain;
                font-size: 32px;
            }
            .link-inp {
                width: 686px;
                height: 84px;
                margin-top: 32px;
                padding: 0 32px;
                border: 2px solid @bdColor;
                border-radius: 8px;
                input {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    margin: 22px 0;
                    border: none;
                    background-color: transparent;
                    font-size: 28px;
                }
            }
        }
        .reprint-btn {
            padding: 32px 0;
            background-color: @white;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            span {
                display: block;
                width: 686px;
                height: 96px;
                line-height: 96px;
                margin: 0 auto;
                background-color: @main;
                border-radius: 16px;
                color: @white;
                font-size: 32px;
                text-align: center;
            }
        }
    }
}
</style>