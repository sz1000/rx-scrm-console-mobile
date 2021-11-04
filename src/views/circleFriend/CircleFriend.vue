<template>
  <div class="friendWarp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">新建朋友圈</span>
      <div class="send" @click="sendMessage">
        <span>发表</span>
      </div>
    </div>
    <div class="explan" v-show="fnClose">
      <span>每位客户的朋友圈每个月最多展示4条企业发表的内容</span>
      <van-icon name="cross" @click="fnClose=false" />
    </div>
    <div class="friendText">
      <div class="title">文字内容</div>
      <van-field v-model="textVal" placeholder="请输入文字(不得超过500个字符)" maxlength="500" rows="6" type="textarea" />
    </div>
    <div class="materialBox">
      <div class="title">素材类型</div>
      <div class="tabBtn">
        <span class="box" :class="tab=='image'? 'active':''" @click="tab = 'image'">图片</span>
        <span class="box" :class="tab=='video'? 'active':''" @click="tab = 'video'">视频</span>
        <span class="box" :class="tab=='link'? 'active':''" @click="tab = 'link'">链接</span>
      </div>
      <div class="uploadImg">
        <div class="upload_wrap" v-if="tab == 'image'">
          <div class="upload_row ">
            <div class="upload_box_list imgBox" v-for="(item,index) in lists" :key="index" v-show="lists.length>0">
              <div class="img_box">
                <img :src="item" alt="">
                <img src="../../images/defriend.png" alt="" class="deleteIcon" @click="fnDeleteImg(item,index)" />
              </div>
            </div>
            <div class="upload_box" v-if="lists.length<9">
              <div class="upload">
                <div class="icon_box">
                  <div class="icon"></div>
                  <div class="text">添加图片</div>
                </div>
                <input class="file" type="file" @change="uploadFun($event,'image','friend','png,jpg,jpeg','10')" accept=".png,.jpg,.jpeg"
                       multiple="multiple" />
              </div>
            </div>
          </div>
          <div class="upload_tips" v-if="!lists.length">最多可上传9张图片，单张图片大小不超过10M，格式支持jpeg、jpg、png</div>
        </div>
        <div class="upload_wrap" v-if="tab == 'video'">
          <div class="upload_row">
            <div class="upload_box_list" v-if="videoUrl">
              <div class="img_box">
                <video :src="videoUrl" controls="controls" preload='auto' ref="video" />
                <img src="../../images/defriend.png" alt="" class="deleteIcon" @click="fnDeleteVideo" />
              </div>
            </div>
            <div class="upload_box " v-else>
              <div class="upload">
                <div class="icon_box">
                  <div class="icon"></div>
                  <div class="text">添加视频</div>
                </div>
                <input class="file" type="file" @change="uploadVideo($event,'video','friend','mp4','10')" accept=".mp4" />
              </div>
            </div>
          </div>
          <div class="upload_tips" v-if="!videoUrl">上传视频最大支持10M</div>
        </div>
        <div class="link_wrap" v-if="tab == 'link'">
          <div class="input_item">
            <input v-model="inputUrl" @input="inputUrl=inputUrl.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[^\S+$]/g,'')"
                   placeholder="链接地址请以http或https开头" />
          </div>
        </div>
        <div class="botText">
          <div class="look">
            <img src="../../images/icon_people.png" alt="">
            <span>可见客户</span>
          </div>
          <span>公开</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadFile, addFriend } from '../../api/friend'
import { _throttle } from '../../utils/tool'
import { Notify } from 'vant'
export default {
  data() {
    return {
      fnClose: true,
      textVal: '',
      tab: 'image',
      lists: [],
      videoUrl: '',
      url: '',
      inputUrl: '',
    }
  },
  methods: {
    goBack() {
      this.$router.push('/home')
    },
    sendMessage: _throttle(function () {
      // console.log(11111111)
      let imgArr = []
      if (this.tab == 'image') {
        imgArr = this.lists
      } else if (this.tab == 'video') {
        imgArr = [this.videoUrl]
      } else {
        imgArr = [this.inputUrl]
      }
      let params = {
        content: this.textVal,
        urls: imgArr,
        msgtype: this.tab,
      }
      addFriend(params).then((res) => {
        if (res.result) {
          Notify({
            message: '创建成功',
            type: 'success',
            duration: 1000,
            // className: 'msgTitle',
            // background: '#52BD94',
          })
          this.$router.push('/home')
        }
      })
    }, 5000),
    // sendMessage() {},
    fnDeleteImg(v, i) {
      this.lists.splice(i, 1)
    },
    uploadFun(e, fileType, type, accept, size) {
      let _this = this
      let ve = e
      let file = e.target.files[0]
      let filesize = file.size
      var reader = new FileReader()
      if (filesize / 1024 / 1024 > 10) {
        Notify({
          message: '图片大小不能超过10M',
          type: 'danger',
          duration: 1000,
        })
        e.target.value = ''
        return false
      }
      let formData = new FormData()
      formData.append('file', file)
      formData.append('filetype', fileType)
      formData.append('type', type)
      this.$toast.loading()
      uploadFile(formData).then((res) => {
        this.$toast.clear()
        this.lists.push(res.data.url)
      })
      // reader.readAsDataURL(file)
      // reader.onload = function (e) {
      //   // console.log(e)
      //   let img = new Image()
      //   img.src = e.target.result
      //   img.onload = function () {
      //     let w = this.width
      //     let h = this.height
      //     if (w > 1080 || h > 1440) {
      //       _this.$message({
      //         type: 'error',
      //         message: '图片像素不能超过1440*1080',
      //       })
      //       return false
      //     } else {
      //       //文件上传
      //       let formData = new FormData()
      //       formData.append('file', ve.target.files[0])
      //       formData.append('filetype', fileType)
      //       formData.append('type', type)
      //       _this.$toast.loading()
      //       uploadFile(formData).then((res) => {
      //         _this.$toast.clear()
      //         _this.lists.push(res.data.url)
      //       })
      //     }
      //   }
      // }
    },
    uploadVideo(e, fileType, type, accept, size) {
      // console.log('---e----', e)
      let _this = this
      let file = e.target.files[0]
      let filesize = e.target.files[0].size
      let url = URL.createObjectURL(file)
      let audioElement = new Audio(url)
      if (filesize / 1024 / 1024 > 10) {
        Notify({
          message: '视频大小不能超过10M',
          type: 'danger',
          duration: 1000,
        })
        e.target.value = ''
        return false
      }
      audioElement.addEventListener('loadedmetadata', function () {
        let duration = audioElement.duration
        if (duration > 30) {
          Notify({
            message: '视频不能超过30s',
            type: 'danger',
            duration: 1000,
          })
          e.target.value = ''
          return false
        } else {
          let formData = new FormData()
          formData.append('file', e.target.files[0])
          formData.append('filetype', fileType)
          formData.append('type', type)
          _this.$toast.loading()
          uploadFile(formData).then((res) => {
            _this.$toast.clear()
            _this.videoUrl = res.data.url
          })
        }
      })
    },
    fnDeleteVideo() {
      this.videoUrl = ''
    },
  },
}
</script>
<style lang="less" scoped>
.friendWarp {
  padding-top: 87px;
  min-height: 100vh;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 750px;
    transform: translateX(-50%);
    cursor: pointer;
    background: #fff;
    padding: 0 24px;
    font-weight: 600;
    display: flex;
    height: 87px;
    align-items: center;
    font-size: 28px;
    color: #3c4353;
    border-top: 1px solid #f0f2f7;
    border-bottom: 1px solid #f0f2f7;
    .backPage {
      // width: 150px;
      .van-icon {
        vertical-align: -10%;
        width: 28px;
        height: 28px;
      }
    }
    .textTitle {
      flex: 1;
      display: inline-block;
      // padding-left: 150px;
      text-align: center;
    }
    .send {
      width: 114px;
      height: 56px;
      background: #4168f6;
      border-radius: 28px;
      line-height: 56px;
      text-align: center;
      color: #fff;
    }
  }
  .explan {
    width: 750px;
    padding: 0 32px;
    height: 68px;
    line-height: 68px;
    background: #ffb020;
    color: #fff;
    font-size: 24px;
    position: relative;
    .van-icon {
      position: absolute;
      right: 32px;
      top: 20px;
      height: 34px;
      width: 34px;
    }
  }
  .friendText {
    background: #fff;
    padding: 32px;
    .van-cell {
      padding: 0;
    }
  }
  .title {
    font-size: 28px;
    font-weight: 600;
    color: #3c4353;
  }
  .materialBox {
    height: 100vh;
    background: #fff;
    padding: 32px 0;
    margin-top: 20px;
    .title {
      padding: 0 32px;
    }
    .tabBtn {
      padding: 0 32px;
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      .box {
        display: inline-block;
        width: 212px;
        height: 62px;
        border-radius: 31px;
        border: 2px solid #c0c4cc;
        text-align: center;
        line-height: 60px;
      }
      .active {
        border-color: #4168f6;
        color: #4168f6;
      }
    }
    .uploadImg {
      background: #fff;
      .upload_wrap {
        margin-top: 36px;
        padding: 0 32px;
        .upload_row {
          margin-top: 16px;
          font-size: 0;
          display: flex;
          flex-wrap: wrap;
          .afresh_file {
            margin-left: 16px;
            height: 20px;
            font-size: 14px;
            color: #4168f6;
            position: relative;
            .file {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              cursor: pointer;
            }
          }
        }
        .imgBox {
          height: 200px !important;
          width: 200px !important;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .upload_box_list {
          height: 334px;
          width: 372px;
          margin-right: 16px;
          margin-bottom: 16px;
          .img_box {
            width: 100%;
            height: 100%;
            margin-right: 16px;
            position: relative;
            video {
              width: 100%;
              height: 100%;
            }
            .deleteIcon {
              cursor: pointer;
              width: 32px;
              height: 32px;
              position: absolute;
              right: 0px;
              top: 0px;
            }
          }
        }
        .upload_box {
          width: 200px;
          height: 200px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          font-size: 0;
          .upload {
            width: 100%;
            height: 100%;
            background: #f6f7f9;
            text-align: center;
            padding-top: 56px;
            position: relative;
            .icon_box {
              .icon {
                width: 44px;
                height: 44px;
                margin-bottom: 16px;
                position: relative;
                display: inline-block;
                &::before {
                  content: '';
                  width: 2px;
                  height: 100%;
                  background: #c0c4cc;
                  position: absolute;
                  left: 50%;
                  top: 0;
                  transform: translateX(-50%);
                }
                &::after {
                  content: '';
                  height: 2px;
                  width: 100%;
                  background: #c0c4cc;
                  position: absolute;
                  top: 50%;
                  left: 0;
                  transform: translateY(-50%);
                }
              }
              .text {
                height: 20px;
                font-size: 14px;
                color: #c0c4cc;
                text-align: center;
              }
            }
            .file {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              cursor: pointer;
            }
          }
        }
        .upload_tips {
          font-size: 24px;
          color: #c0c4cc;
          margin-top: 24px;
        }
      }
      .link_wrap {
        margin-top: 36px;
        line-height: 80px;
        padding: 0 32px;
        .input_item {
          border: 1px solid #d9dae4;
          padding: 0 16px;
          input {
            width: 100%;
            background: #fff;
          }
        }
        .input_box {
          width: 100%;
        }
      }
      .botText {
        margin-top: 120px;
        display: flex;
        justify-content: space-between;
        height: 100px;
        padding: 0 32px;
        align-items: center;
        box-shadow: 0px -1px 0px 0px #f0f2f7, 0px 1px 0px 0px #f0f2f7;
        border-top: 1px solid #f0f2f7;
        border-bottom: 1px solid #f0f2f7;
        font-size: 28px;
        font-weight: 400;
        color: #3c4353;
        .look {
          display: flex;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 24px;
        }
      }
    }
  }
}
</style>