<template>
  <div class="reprint-edit">
    <template v-if="!showContentPreview">
      <header-title v-if="type == 2" title="上传文件"></header-title>
      <div class="field-box">
        <div class="field-item">
          <van-field v-if="type == 1" v-model="form.title" label="文章标题" label-class="label" placeholder="请输入(不得超过128个字符)" maxlength="128"
                     :required="true" />
          <van-field v-if="type == 2" v-model="fileForm.name" label="文件名称" label-class="label" placeholder="请输入(不得超过128个字符)" maxlength="128"
                     :required="true" />
        </div>
        <div v-if="type == 1" class="field-item">
          <van-field v-model="form.author" label="作者" label-class="label" placeholder="请输入(不得超过16个字符)" maxlength="16" />
        </div>
        <div class="field-item cover-box">
          <p class="label">
            <span>{{ type == 1 ? '文章封面' : '文件封面' }}</span>
          </p>
          <div class="cover-img-box">
            <div class="cover-img pointer">
              <img :src="type == 1 ? form.cover : fileForm.cover" alt="" @click="previewImg">
            </div>
            <img-upload :isCustomize="true" :customizeType="2"></img-upload>
          </div>
        </div>
        <div class="field-item">
          <van-field v-if="type == 1" v-model="form.contentAbstract" type="textarea" label="文章摘要" label-class="label" rows="1" autosize readonly
                     @click="showAbstract" />
          <van-field v-if="type == 2" v-model="fileForm.contentAbstract" type="textarea" label="文件摘要" label-class="label" rows="1" autosize readonly
                     @click="showAbstract" />
        </div>
      </div>
      <div class="reprint-edit-btn pointer">
        <span class="preview" @click="preview">{{ type == 1 ? '预览文章' : '预览文件'}}</span>
        <span class="establish" @click="confirm">{{ type == 1 ? '创建文章' : '上传文件'}}</span>
      </div>

      <edit-abstract ref="editAbstract"></edit-abstract>

      <img-preview ref="imgPreview"></img-preview>
    </template>

    <!-- 文章/文件预览 -->
    <content-preview v-show="showContentPreview" ref="contentPreview" @hideContentPreview="hideContentPreview"></content-preview>
  </div>
</template>
<script>
import {
  ArticleFromReprint,
  AddArticle,
  AddSaleDocument,
} from '../../config/api'
import EditAbstract from './dialog/editAbstract'
import ImgUpload from './imgUpload'
import ImgPreview from './imgPreview'
import ContentPreview from './contentPreview'
import HeaderTitle from './headerTitle'
import { mapState } from 'vuex'
import { getFileDefaultCover } from '../../utils/tool'

export default {
  name: 'reprintEdit',
  props: {
    type: {
      default: 1, // 1: 文章创建, 2: 文件上传
    },
    articleUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        title: '',
        author: '',
        content: '',
        cover: 'https://h5.jzcrm.com/static/img/default_article.png',
        contentAbstract: '',
        corpId: this.corpId,
      },
      fileForm: {
        name: '',
        documentUrl: '',
        cover: 'https://h5.jzcrm.com/static/img/default_pdf.png',
        contentAbstract: '',
        fileSize: '',
        corpId: this.corpId,
      },
      showContentPreview: false,
    }
  },
  computed: {
    ...mapState(['corpId', 'userNo']),
  },
  inject: ['initType', 'goBack'],
  provide() {
    return {
      getAbstractData: this.getAbstractData,
      getImgUrl: this.getImgUrl,
      goBack: this.doShowFileUpload,
    }
  },
  methods: {
    // 获取文章详情
    getDetails() {
      this.$toast.loading({
        message: '',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })
      let params = {
        articleUrl: window.btoa(this.articleUrl),
      }

      ArticleFromReprint(params).then((res) => {
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
    // 显示文件详情
    doShowFile(data) {
      const { url, name, size } = data

      this.fileForm.name = name
      this.fileForm.documentUrl = url
      this.fileForm.fileSize = size
      this.fileForm.cover = getFileDefaultCover(name)
    },
    getImgUrl(url) {
      this.type == 1 ? (this.form.cover = url) : (this.fileForm.cover = url)
    },
    previewImg() {
      let url = this.type == 1 ? this.form.cover : this.fileForm.cover

      this.$refs.imgPreview.show(1, [url])
    },
    showAbstract() {
      let text =
        this.type == 1
          ? this.form.contentAbstract
          : this.fileForm.contentAbstract

      this.$refs.editAbstract.show(this.type, text)
    },
    getAbstractData(data) {
      this.type == 1
        ? (this.form.contentAbstract = data)
        : (this.fileForm.contentAbstract = data)
    },
    checkForm() {
      const { title } = this.form

      const { name } = this.fileForm

      if ((this.type == 1 && !title) || (this.type == 2 && !name)) {
        return false
      }

      return true
    },
    hideContentPreview(data) {
      this.showContentPreview = data
    },
    preview() {
      if (!this.checkForm()) {
        this.$toast(this.type == 1 ? '请输入文章标题' : '请输入文件名称')
        return
      }

      this.showContentPreview = true
      let obj = {
        type: this.type,
        userNo: this.userNo,
        data: this.type == 1 ? this.form : this.fileForm,
      }
      this.$nextTick(() => {
        this.$refs.contentPreview.show(obj)
      })
    },
    doShowFileUpload(type) {
      let params = {
        showFileUpload: false,
        isRefresh: type == 1 ? true : false, // 提交上传需刷新列表
      }

      this.$emit('doShowFileUpload', params)
    },
    confirm() {
      if (!this.checkForm()) {
        this.$toast(this.type == 1 ? '请输入文章标题' : '请输入文件名称')
        return
      }

      this.$toast.loading({
        message: '创建中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner',
      })

      let ApiOpts = this.type == 1 ? AddArticle : AddSaleDocument

      let params = this.type == 1 ? this.form : this.fileForm

      this.type == 1
        ? (this.form.corpId = this.corpId)
        : (this.fileForm.corpId = this.corpId)

      ApiOpts(params).then((res) => {
        const { code, msg } = res

        this.$toast.clear()
        this.$toast(msg)
        if (code === 'success') {
          this.type == 1 ? this.goBack(1) : this.doShowFileUpload(1)
        }
      })
    },
  },
  components: {
    EditAbstract,
    ImgUpload,
    ImgPreview,
    ContentPreview,
    HeaderTitle,
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.reprint-edit {
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
          transform: scaleY(0.5);
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
          display: flex;
          align-items: center;
          width: 160px;
          height: 160px;
          background-color: #f6f7f9;
          overflow: hidden;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
  .reprint-edit-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    padding: 32px;
    background-color: @white;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
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

