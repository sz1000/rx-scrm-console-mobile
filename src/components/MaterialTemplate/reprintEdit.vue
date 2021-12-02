<template>
    <div class="reprint-edit">
        <div class="field-box">
            <div class="field-item">
                <van-field v-model="form.title" label="文章标题" label-class="label" placeholder="请输入(不得超过128个字符)" maxlength="128" :required="true"/>
            </div>
            <div class="field-item">
                <van-field v-model="form.author" label="作者" label-class="label" placeholder="请输入(不得超过16个字符)" maxlength="16"/>
            </div>
            <div class="field-item cover-box">
                <p class="label">
                    <span>文章封面</span>
                </p>
                <div class="cover-img-box">
                    <img class="cover-img" :src="form.cover" alt="" @click="previewImg">
                    <img-upload :isCustomize="true" :customizeType="2"></img-upload>
                </div>
            </div>
            <div class="field-item">
                <van-field v-model="form.contentAbstract" type="textarea" label="文章摘要" label-class="label" rows="1" autosize readonly @click="showAbstract"/>
            </div>
        </div>
        <div class="reprint-edit-btn">
            <span class="preview" @click="preview">预览文章</span>
            <span class="establish" @click="confirm">创建文章</span>
        </div>

        <edit-abstract ref="editAbstract"></edit-abstract>

        <img-preview ref="imgPreview"></img-preview>
    </div>
</template>
<script>
import { ArticleFromReprint, AddArticle } from '../../config/api'
import EditAbstract from './dialog/editAbstract'
import ImgUpload from './imgUpload'
import ImgPreview from './imgPreview'
import { mapState } from 'vuex'

export default {
    name: 'reprintEdit',
    props: {
        articleUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            form: {
                title: '',
                author: '',
                content: '',
                cover: 'https://h5.jzcrm.com/static/img/default_article.png',
                contentAbstract: '',
                corpId: ''
            }
        }
    },
    computed: {
        ...mapState(["corpId"]),
    },
    inject: ['initType', 'goBack'],
    provide() {
        return {
            getAbstractData: this.getAbstractData,
            getImgUrl: this.getImgUrl
        }
    },
    methods: {
        getDetails() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                loadingType: 'spinner',
            })
            let params = {
                articleUrl: window.btoa(this.articleUrl)
            }

            ArticleFromReprint(params).then(res => {
                const { code, data, msg } = res

                this.$toast.clear()
                if (code === 'success') {
                    this.form = data
                } else {
                    this.$toast(msg)
                    this.initType()
                }
            })
        },
        getImgUrl(url) {
            this.form.cover = url
        },
        previewImg() {
            this.$refs.imgPreview.show(1, [this.form.cover])
        },
        showAbstract() {
            this.$refs.editAbstract.show(this.form.contentAbstract)
        },
        getAbstractData(data) {
            this.form.contentAbstract = data
        },
        checkForm() {
            const { title } = this.form

            if (!title) {
                return false
            }

            return true
        },
        preview() {
            if (!this.checkForm()) {
                this.$toast("请输入文章标题")
                return
            }

            this.$router.push({
                path: '/materialTemplate',
                query: {
                    isPreview: 1,
                    type: 1,
                    data: encodeURIComponent(JSON.stringify(this.form))
                },
            })
        },
        confirm() {
            if (!this.checkForm()) {
                this.$toast("请输入文章标题")
                return
            }

            this.$toast.loading({
                message: '创建中...',
                forbidClick: true,
                duration: 0,
                loadingType: 'spinner',
            })

            this.form.corpId = this.corpId

            AddArticle(this.form).then(res => {
                const { code, msg } = res

                this.$toast.clear()
                this.$toast(msg)
                if (code === 'success') {
                    this.goBack()
                }
            })
        },
    },
    components: {
        EditAbstract,
        ImgUpload,
        ImgPreview
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.reprint-edit{
    .field-box {
        .field-item {
            padding: 16px 0;
            &:not(:last-child) {
                position: relative;
                &::before {
                    content: '';
                    width: 100vw;
                    height: 2px;
                    background-color: @lineColor;
                    transform: scaleY(.5);
                    position: absolute;
                    left: 32px;
                    right: 0;
                    bottom: 0;
                }
            }
            /deep/ .label {
                width: 136px;
                color: @fontMain;
                font-size: 28px;
                font-weight: 600;
            }
        }
        .cover-box {
            display: flex;
            align-items: center;
            padding: 36px 32px;
            .label {
                margin-right: 24px;
            }
            /deep/ .van-uploader__upload {
                margin: 0;
            }
            .cover-img-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 75%;
                .cover-img {
                    width: 160px;
                    height: 160px;
                }
            }
        }
    }
    .reprint-edit-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32px;
        background-color: @white;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        span {
            width: 330px;
            height: 96px;
            line-height: 96px;
            border-radius: 4px;
            font-size: 32px;
            text-align: center;
            border: 1px solid @bdColor;
        }
        .preview {
            background-color: @white;
            color: @fontSub2;
        }
        .establish {
            background-color: @main;
            border-color: @main;
            color: @white;
        }
    }
}
</style>

