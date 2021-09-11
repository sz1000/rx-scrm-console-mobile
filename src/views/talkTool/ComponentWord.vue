<template>
  <div>
    <ul class="radio-type">
      <li v-for="(item, index) in radioList"
          :key="index"
          @click="changeRadio(item, index)">
        <span :class="{ active: activeIndex == item.value }"
              class="defaultBorder"></span>
        <span :class="{ activeTxt: activeIndex == item.value }"
              class="defaultColor">{{ item.name }}</span>
      </li>
      <li class="deletebtn"
          @click="deleteIndex()"
          v-show="this.allList.length>1">
        <img src="../../images/icon_delete.png"
             alt="" />
      </li>
    </ul>
    <div class="textarea-box">
      <section class="text-content">
        <el-input v-model="itemInfo.text"
                  placeholder="请输入文字内容"
                  maxlength="500"
                  show-word-limit
                  type="textarea"
                  v-show="activeIndex == 'txt'">
        </el-input>
      </section>
      <section class="upload-box"
               v-show="activeIndex == 'image'">
        <el-upload class="avatar-uploader"
                   action="#"
                   ref="upload"
                   :auto-upload="false"
                   :show-file-list="true"
                   :file-list="fileList"
                   :on-change="changeFile"
                   :on-remove="removeFile"
                   :before-upload="beforeAvatarUpload">
          <img v-if="itemInfo.imageUrl"
               :src="itemInfo.imageUrl"
               class="avatar" />
          <i v-else
             class="el-icon-plus avatar-uploader-icon">
            <p>上传图片</p>
          </i>
        </el-upload>
        <div class="adviceTxt"
             v-show="activeIndex == 'image'">
          建议上传大小不超过2MB的图片，格式支持jpeg、jpg、png
        </div>
      </section>
      <section class="pdf-box"
               v-show="activeIndex == 'pdf'">
        <div v-show="!showPdf">
          <el-upload class="avatar-uploader"
                     action="#"
                     ref="upload"
                     :limit="1"
                     :auto-upload="false"
                     :show-file-list="true"
                     :file-list="pdfList"
                     :on-change="changePdf"
                     :on-remove="removePdf"
                     :before-upload="beforePdfUpload">
            <div>
              <i class="el-icon-plus avatar-uploader-icon">
                <p>上传PDF</p>
              </i>
            </div>
          </el-upload>
          <div class="adviceTxt">请上传大小不超过20MB的PDF文件</div>
        </div>
        <div class="pdf-file-success"
             v-show="showPdf">
          <div class="pdf-img">
            <!-- <img
              src="../../../assets/images/pdf_image.png"
              alt=""
              style="width: 60px; height: 60px"
            /> -->
            <div>
              <span>{{ pdfName }}</span>
              <span>{{ pdfFileSize }}</span>
            </div>
            <i class="el-icon-circle-close"
               @click="deletePdf()"></i>
          </div>
        </div>
      </section>
      <section class="link-box"
               v-show="activeIndex == 'url'">
        <el-input v-model="linkhref"
                  placeholder="请输入链接"></el-input>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    single: {
      type: Number,
    },
    itemInfo: {
      type: Object,
    },
    allList: {
      type: Array,
    },
  },
  created() {
    console.log('-------------', this.itemInfo, this.single)
  },
  data() {
    return {
      radioList: [
        { name: '文字', value: 'txt' },
        // { name: "图片", value: "image" },
        // { name: "PDF", value: "pdf" },
        { name: '链接', value: 'url' },
      ],
      activeIndex: 'txt',
      // text: '',
      // imageUrl: '',
      fileList: [],
      pdfList: [],
      pdfName: '',
      pdfFileSize: '',
      linkhref: '',
      showPdf: false,
    }
  },
  methods: {
    changeRadio(item, index) {
      // console.log(item, index)
      this.activeIndex = item.value
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG =
        file.raw.type == 'image/jpeg' ||
        file.raw.type == 'image/jpg' ||
        file.raw.type == 'image/png'
      const isLt2M = file.raw.size / 1024 / 1024 < 2
      if (!isJPG || !isLt2M) {
        this.$message.error(
          '上传头像图片只能是 JPG,PNG,JEPG 格式，大小不能超过 2MB!'
        )
      }
      // console.log(isJPG, isLt2M)
      return isJPG && isLt2M
    },
    beforePdfUpload(file) {
      // console.log('----pdf2222----', file)
      const isPdf = file.raw.type == 'application/pdf'
      const pdfSize = file.size / 1024 / 1024 < 20
      if (!isPdf || !pdfSize) {
        this.$message.error('上传文件格式为pdf,大小不能超过 20MB!')
      }
      return isPdf && pdfSize
    },
    changeFile(file, fileList) {
      console.log(file, fileList)
      if (this.beforeAvatarUpload(file)) {
        this.itemInfo.imageUrl = URL.createObjectURL(file.raw)
        this.fileList = fileList.slice(-1)
      } else {
        this.fileList = []
      }
      console.log('---this.itemInfo--', this.itemInfo)
    },
    changePdf(file, pdfList) {
      console.log('-----pdf1111-----', file, pdfList)
      if (this.beforePdfUpload(file)) {
        this.showPdf = true
        this.pdfName = file.name
        this.pdfFileSize =
          Math.round((file.size / 1024 / 1024) * 100) / 100 + 'M'
        // this.pdfFileSize = (file.size / 1024 / 1024).toFixed(1)
        this.pdfList = pdfList.slice(-1)
      } else {
        this.fileList = []
      }
    },
    removeFile(file, fileList) {
      this.fileList = fileList
      this.imageUrl = ''
    },
    removePdf(file, pdfList) {
      console.log('-------padList---', pdfList)
      this.pdfList = pdfList
    },
    deletePdf() {
      this.showPdf = false
      this.removePdf()
      console.log(this.pdfList)
    },
    deleteIndex() {
      console.log(this.single)
      this.$emit('fnDelete', this.single)
    },
  },
}
</script>
<style lang="less" scoped>
.radio-type {
  display: flex;
  padding: 0;
  margin: 20px 0;
  position: relative;
  li {
    cursor: pointer;
    list-style: none;
    margin-right: 16px;
    .defaultBorder {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 1px solid #d9dae4;
      border-radius: 50%;
      vertical-align: -2%;
      margin-right: 6px;
    }
    .active {
      vertical-align: -2%;
      border: 4px solid #4168f6;
    }
    .activeTxt {
      color: #4168f6;
    }
    .defaultColor {
    }
  }
  .deletebtn {
    position: absolute;
    right: 0;
    img {
      width: 28px;
      height: 28px;
      vertical-align: -5%;
    }
  }
}
.textarea-box {
  .text-content {
    /deep/.el-textarea__inner {
      background: #fafbff;
      height: 232px;
    }
  }
  .upload-box,
  .pdf-box {
    position: relative;
    .avatar-uploader {
      background: #fafbff;
      border-radius: 4px;
      border: 1px solid #d9dae4;
      height: 196px;
      padding: 16px;
      display: flex;
      align-items: center;
      /deep/.el-upload-list__item-name {
        width: 300px;
        overflow: hidden;
      }
    }
    .adviceTxt {
      color: #d9dae4;
      position: absolute;
      bottom: 16px;
      left: 16px;
    }
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      img {
        width: 128px;
        height: 128px;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      background: #fff;
      color: #8c939d;
      width: 128px;
      //   height: 128px;
      //   line-height: 128px;
      text-align: center;
    }

    .pdf-file-success {
      height: 148px;
      background: #fafbff;
      border: 1px solid #d9dae4;
      padding: 16px;
      .pdf-img {
        position: relative;
        width: 250px;
        height: 80px;
        background: #ffffff;
        border: 1px solid #d9dae4;
        display: flex;
        align-items: center;
        padding-left: 16px;
        img {
          margin-right: 8px;
        }
        span {
          display: block;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #c0c4cc;
          margin-top: 4px;
        }
        .el-icon-circle-close {
          position: absolute;
          right: -6px;
          top: -5px;
          cursor: pointer;
        }
      }
    }
  }
  .link-box {
    // height: 196px;
    height: 81px;
    background: #fafbff;
    border: 1px solid #d9dae4;
    padding: 16px;
    /deep/.el-input__inner {
      width: 100% !important;
    }
  }
}
</style>
