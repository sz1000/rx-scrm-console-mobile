<template>
    <van-popup class="img-box" v-model="showVisible">
        <img :src="imgUrl" alt="">
    </van-popup>
</template>
<script>
export default {
    name: 'wechatQrcode',
    data() {
        return {
            showVisible: false,
            imgUrl: ''
        }
    },
    methods: {
        show(data) {
            this.imgUrl = data
            this.showVisible = true
        }
    }
}
</script>
<style lang="less" scoped>
.img-box {
    width: 10rem;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
        width: 500px;
        height: 500px;
        margin: 0 auto;
    }
}
</style>