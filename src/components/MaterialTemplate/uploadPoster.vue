<template>
    <div class="upload-poster">
        <header-title title="上传海报"></header-title>
        <div class="field-box">
            <div class="field-item">
                <van-field v-model="form.posterName" label="海报名称" label-class="label" placeholder="请输入(不得超过128个字符)" maxlength="128" :required="true"/>
            </div>
            <div class="field-item cover-box">
                <p class="label">
                    <span>海报图片</span>
                </p>
                <div class="cover-img-box">
                    <img class="cover-img pointer" :src="form.posterUrl" alt="" @click="previewImg(form)">
                    <img-upload :isCustomize="true" :customizeType="2" :needFileInfo="true"></img-upload>
                </div>
            </div>
        </div>
        <div class="submit-btn pointer">
            <span @click="confirm">上传海报</span>
        </div>
    </div>
</template>
<script>
import { AddPoster } from '../../config/api'
import { mapState } from 'vuex'
import HeaderTitle from './headerTitle'
import ImgUpload from './imgUpload'

export default {
    name: 'uploadPoster',
    props: {
        formData: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    computed: {
        ...mapState(["corpId"]),
        form() {
            const { name: posterName, url: posterUrl } = this.formData

            return {
                posterName,
                posterUrl,
                corpId: this.corpId
            }
        },
    },
    data() {
        return {

        }
    },
    inject: ['previewImg'],
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        doShowUploadPoster(data) {
            this.$emit('doShowUploadPoster', data)
        },
        goBack(type) {
            let params = {
                showUploadPoster: false,
                isRefresh: type == 1 ? true : false // 提交上传需刷新列表
            }

            this.doShowUploadPoster(params)
        },
        confirm() {
            this.$toast.loading({
                message: '上传中...',
                forbidClick: true,
                duration: 0,
                loadingType: 'spinner',
            })

            AddPoster(this.form).then(res => {
                const { code, msg } = res
                
                this.$toast.clear()
                this.$toast(msg)
                if (code === 'success') {
                    this.goBack(1)
                }
            })
        },
    },
    components: {
        HeaderTitle,
        ImgUpload,
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.upload-poster{
    width: 100%;
    min-height: 100%;
    background-color: @white;
    overflow-x: hidden;
    overflow-y: auto;
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
    .submit-btn {
        width: 10rem;
        padding: 32px 0;
        background-color: @white;
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
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
</style>