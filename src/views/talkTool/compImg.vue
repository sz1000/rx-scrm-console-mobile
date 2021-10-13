<template>
  <div>
    <van-uploader
      :after-read="afterRead"
      :max-count="3"
      v-model="getFileList"
      accept="image/png, image/jpeg"
      :max-size="10 * 1024 * 1024"
      @oversize="oversize"
      :disabled="disabled"
    />
  </div>
</template>