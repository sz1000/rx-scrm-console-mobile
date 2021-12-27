<template>
  <div class="file-upload">
    <div class="reprint-box"></div>
    <input class="upload-inp pointer" type="file" @change="afterRead">
  </div>
</template>
<script>
import { uploadFile } from '../../api/friend'

export default {
  name: 'fileUpload',
  props: {
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
  inject: ['getFileUrl'],
  methods: {
    beforeRead(file) {
      if (
        !/\.ppt$|\.pptx$|\.doc$|\.docx$|\.xls$|\.xlsx$|\.pdf$|\.mp4$/i.test(
          file.name
        )
      ) {
        return false
      }
      if (file.size / 1024 / 1024 >= 20) {
        return false
      }
      return true
    },
    afterRead(e) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })

      const input = e.target
      const files = e.target.files

      if (files && files[0]) {
        const file = files[0]
        console.log('文件信息:', file)
        if (/\.mp4$/i.test(file.name) && file.size / 1024 / 1024 >= 10) {
          this.$toast('视频大小不能超过10MB!')
          return
        }
        if (!this.beforeRead(file)) {
          input.value = ''
          this.$toast.clear()
          this.$toast(
            '上传文件格式为ppt、pptx、doc、docx、xls、xlsx、pdf、MP4, 大小不能超过20MB!'
          )
          return
        }
        let formData = new FormData()

        formData.append('file', file)
        formData.append(
          'filetype',
          file.name.substring(file.name.lastIndexOf('.') + 1)
        )
        formData.append('type', this.type)

        uploadFile(formData).then((res) => {
          const { result, data, msg } = res

          this.$toast.clear()
          if (result) {
            let params = data.url

            if (this.needFileInfo) {
              params = {
                url: data.url,
                name: file.name,
                size: file.size,
              }
            }
            this.getFileUrl(params)
          } else {
            this.$toast(msg)
          }
        })
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.file-upload {
  position: relative;
  .reprint-box {
    width: 104px;
    height: 104px;
    background-color: @main;
    // display: none;
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
  .upload-inp {
    width: 104px;
    height: 104px;
    background: transparent;
    opacity: 0;
    font-size: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>