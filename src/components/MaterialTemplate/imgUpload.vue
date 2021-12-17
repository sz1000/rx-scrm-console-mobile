<template>
  <div class="img-upload pointer">
    <div v-if="isCustomize">
      <van-uploader :max-count="1" :before-read="beforeRead" :after-read="afterRead">
        <div v-if="customizeType == 2" class="rechoose">
          <span>重新选择</span>
          <img src="../../images/arrow_right.png" alt="">
        </div>
        <div v-if="customizeType == 3" class="reprint-box"></div>
      </van-uploader>
    </div>
    <div v-else>
      <van-uploader :max-count="1" :before-read="beforeRead" :after-read="afterRead" />
    </div>
  </div>
</template>
<script>
import { uploadFile } from '../../api/friend'
import { getImgBlob } from '../../utils/tool'

export default {
  name: 'reprint',
  props: {
    isCustomize: {
      type: Boolean,
      default: false, // 是否是自定义上传图片样式
    },
    customizeType: {
      default: 1,
    },
    type: {
      default: 'material', // 上传接口入参之一
    },
    needFileInfo: {
      type: Boolean,
      default: false, // 是否需要文件信息
    },
  },
  data() {
    return {}
  },
  inject: ['getImgUrl'],
  methods: {
    beforeRead(file) {
      if (!/\.png$|\.jpg$|\.jpeg$/i.test(file.name)) {
        this.$toast('请上传png、jpg格式的图片')
        return false
      }

      return true
    },
    async afterRead(file) {
      console.info('图片信息:', file)

      let fileData = file.file

      let blob = null

      if (!window.FileReader || !window.Blob) {
        console.info('浏览器不支持图片压缩')
        blob = fileData
      } else {
        console.info('浏览器支持图片压缩')
        if (fileData.size > 2 * 1024 * 1024) {
          blob = await getImgBlob(fileData, fileData.type, 1000, 1000)
        } else {
          blob = fileData
        }
      }
      console.log('blob:', blob)
      if (blob.size > 2 * 1024 * 1024) {
        this.$toast(`请选择小于 2M 的图片`)
        return false
      }

      this.upload(blob, fileData.name)
    },
    upload(file, name) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })
      let formData = new FormData()

      formData.append('file', file)
      formData.append('filetype', 'image')
      formData.append('type', this.type)

      uploadFile(formData).then((res) => {
        const { result, data, msg } = res

        this.$toast.clear()
        if (result) {
          let params = data.url

          if (this.needFileInfo) {
            params = {
              url: data.url,
              name,
            }
          }
          this.getImgUrl(params)
        } else {
          this.$toast(msg)
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.img-upload {
  .rechoose {
    display: flex;
    align-items: center;
    position: relative;
    span {
      color: @lengthColor;
      font-size: 28px;
    }
    img {
      width: 28px;
      height: 28px;
    }
  }
  .reprint-box {
    width: 104px;
    height: 104px;
    background-color: @main;
    border-radius: 50%;
    box-shadow: 0 6px 34px 0 rgba(65, 104, 246, 0.3);
    position: relative;
    &::before,
    &::after {
      content: '';
      border-radius: 100px;
      background-color: @white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      width: 44px;
      height: 6px;
    }
    &::after {
      width: 6px;
      height: 44px;
    }
  }
  /deep/ .van-uploader__input {
    font-size: 0;
  }
}
</style>