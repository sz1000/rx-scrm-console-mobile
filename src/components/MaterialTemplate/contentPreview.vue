<template>
    <div class="content-preview">
        <div class="top-fixed">
            <header-title :title="materialType == 1 ? '文章预览' : '文件预览'"></header-title>
            <user-info :userData="userData"></user-info>
        </div>
        <material-content ref="materialContent"></material-content>
    </div>
</template>
<script>
import { UsersInfo } from "../../config/api"

import HeaderTitle from './headerTitle'
import UserInfo from "./userInfo"
import MaterialContent from "./materialContent"

export default {
    name: "contentPreview",
    data() {
        return {
            userData: null,
            materialType: '', // 1: 文章, 2: 文件
            userNo: ''
        }
    },
    provide() {
        return {
            goBack: this.goBack
        }
    },
    methods: {
        show(obj) {
            const { type, userNo, data } = obj

            this.materialType = type
            this.userNo = userNo
            this.getUsersInfo()

            let params = {
                materialType: type,
                data
            }
            
            this.$nextTick(() => {
                this.$refs.materialContent.getPreviewDetails(params)
            })
        },
        getUsersInfo() {
            UsersInfo(this.userNo).then(res => {
                const { code, data } = res
                if (code === 'success') {
                    this.userData = data
                }
            })
        },
        hideContentPreview() {
            this.$emit('hideContentPreview', false)
        },
        goBack() {
            this.hideContentPreview()
        }
    },

    components: {
        HeaderTitle,
        UserInfo,
        MaterialContent
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
    .content-preview {
        min-height: 100vh;
        padding: 255px 32px 32px;
        background-color: @white;
        position: relative;
        .top-fixed {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
        }
    }
</style>