<template>
    <div class="img-preview">
        <van-image-preview v-model="visible" :images="images" @change="onChange">
            <!-- <template v-slot:index>第{{ index }}页</template> -->
        </van-image-preview>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            index: 0,
            images: [],
        }
    },
    methods: {
        show(index, images) {
            this.index = index
            this.images = images
            this.visible = true
        },
        onChange(index) {
            this.index = index
        },
    }
}
</script>
<style lang="less" scoped>
.img-preview {

}
</style>