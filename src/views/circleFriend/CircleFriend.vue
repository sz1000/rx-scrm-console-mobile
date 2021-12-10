<template>
  <div class="friendWarp" >
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">发表朋友圈</span>
      <div class="send" @click="sendMessage">
        <span>发表</span>
      </div>
    </div>
    <div class="explan" v-show="fnClose">
      <span>每位客户的朋友圈每个月最多展示4条企业发表的内容</span>
      <van-icon name="cross" @click="fnClose=false" />
    </div>
     <div class="friendtite">
      <div class="titeFlex">
        <div class="title"><span style="color:red">*</span> 标题：</div>
        <div> <el-input v-model="linkhref.hrefTitle"></el-input> </div>
      </div>
    </div>
    <div class="friendText">
      <div class="title">文字内容</div>
      <van-field v-model="textVal" placeholder="请输入文字(文字内容和素材不可同时为空不得超过500个字符)" maxlength="500" rows="6" type="textarea" />
    </div>
    <div class="materialBox">
      <div class="title">素材类型</div>
      <div class="tabBtn">
        <span class="box" :class="tab=='image'? 'active':''" @click="tab = 'image'">图片</span>
        <span class="box" :class="tab=='video'? 'active':''" @click="tab = 'video'">视频</span>
        <span class="box" :class="tab=='link'? 'active':''" @click="tab = 'link'">链接</span>
        <span class="box" :class="tab=='material'? 'active':''" @click="goToMaterial('material')">素材库</span>
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
          <!-- <div class="input_item">
            <input v-model="inputUrl" @input="inputUrl=inputUrl.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[^\S+$]/g,'')"
                   placeholder="链接地址请以http或https开头" />
          </div> -->
      
             <!-- <template > -->
                <el-form ref="form" :model="linkhref">
              <el-input class="marB-24" v-model="linkhref.href" placeholder="链接地址请以http或https开头" @blur="blurUrl"></el-input>
             
                <el-form-item label="链接标题 :" :rules="[
                { required: true,}]">
                  
                  <el-input
                    v-model="linkhref.hrefTitle"
                    placeholder="请输入链接标题"
                  ></el-input>
                </el-form-item>
                <el-form-item label="链接摘要 :">
                  <el-input
                    v-model="linkhref.hrefDesc"
                    placeholder="请输入链接摘要"
                  ></el-input>
                </el-form-item>
                <el-form-item label="链接封面 :" class="upload_avatar">
                 <!-- <div class="cover_warp">
                   <div class="up">重新上传</div> -->
                     <!-- <input class="file" type="file" @change="uploadFun($event,'image','friend','png,jpg,jpeg','10')" accept=".png,.jpg,.jpeg"
                       multiple="multiple" />  -->
                       <!-- <van-uploader v-model="linkhref.hrefPic" :deletable="false"	:after-read="afterRead" :max-count="1" >
                         <div class="resetUpload">重新上传</div>
                         </van-uploader>               -->
                   <!-- <img src="../../assets/images/delte.png" alt="" class="delte_icon" @click="deletClick"> -->
                  
                 <!-- </div> -->
                 <div class="demo-input-suffix">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="resetUpload" v-show="imageUrl">重新上传</div>
            </el-upload>
            <img src="../../images/dele.png" alt="" v-if="imageUrl" class="el-icon-circle-close" @click="deleteImg">
          </div>
                </el-form-item>
              </el-form>
            <!-- </template> -->
        </div>
          <div class="upload_wrap" v-if="tab == 'material'">
            <!-- <Coumpontmaterial /> -->
              <div class="article_warp" v-if="materialList.tab == 1">
                 <div class="article_text">
                   <div>文章:</div>
                   <div class="tites">{{materialList.title}}</div>
                   <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                 </div>
                 <div class="article_flex" >
                   <div>
                      <p class="tite">{{materialList.title}}</p>
                      <p class="link_box">{{materialList.contentAbstract}}</p>
                   </div>
                   <div>
                     <img :src="materialList.cover" alt="">
                   </div>
                 </div>
              </div>
                    <div class="article_warp" v-if="materialList.tab == 2">
                 <div class="article_text">
                   <div>文件:</div>
                   <div class="tites">{{materialList.name}}</div>
                   <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                 </div>
                 <div class="article_flex">
                   <div>
                     <img src="../../assets/images/pdf_image.png" alt="">
                   </div>
                   <div>
                      <p class="tite">{{materialList.name}}</p>
                      <p class="link_box">{{(materialList.fileSize/1024).toFixed(2)}}kbs</p>
                   </div>
                   
                 </div>
              </div>
                       <div class="article_warp" v-if="materialList.tab == 3">
                 <div class="article_text">
                   <div>海报:</div>
                   <div class="tites">{{materialList.posterName}}</div>
                   
                 </div>
                 <div class="article_img">
                   <div>
                     <img :src="materialList.posterUrl" alt="">
                   </div>
                    <div class="article_color" @click="goToMaterial('material')">重新选择</div>
                 </div>
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
import { uploadFile, addFriend, addFriendStrong } from '../../api/friend'
import { _throttle } from '../../utils/tool'
import { Notify } from 'vant'
// import { mapState } from 'vuex'
// import  Coumpontmaterial from "../../components/materialDialog/MterialPage.vue"
export default {
  // components:{
  //      Coumpontmaterial
  // },
  data() {
    return {
      imageUrl:"",
      fnClose: true,
      textVal: '',
      tab: 'image',
      lists: [],
      videoUrl: '',
      url: '',
      inputUrl: '',
       linkhref:{
          href:"",
          hrefTitle:"",
          hrefDesc:"",
          hrefurl:""
       },
    materialList:[],
      shareUrlOrigin: '',
      //  loading:false,
    }
  },
    //   computed: {
    //     ...mapState(["corpId", "userNo"]),
    // },
  created(){
    this.materialList =  this.$route.query.datalist
     console.log(this.materialList,"000")
     if(this.materialList){
      if(this.materialList.tab == 1){
         this.linkhref.hrefTitle =  this.materialList.title
      }else if (this.materialList.tab == 2){
          this.linkhref.hrefTitle =  this.materialList.name
      }else{
          this.linkhref.hrefTitle =  this.materialList.posterName
      }
      
      console.log(toString(this.$route.query.datalist),"000000---")
      this.tab = this.$route.query.tablable || 'image'
    }
  },
  methods: {
       afterRead(obj, file) {
      
      console.log(file, '------------')
      console.log(obj, '------------obj')
      let formData = new FormData()
      formData.append('file', obj.file)
      formData.append('type', 'qunfa')
      formData.append('filetype', 'image')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$network
        .post('/common-service/oss/uploadfileparam', formData, config)
        .then((res) => {
          if (res.result) {
          
            console.log(res, '------------图片')
      
          }
        })
      // console.log(this.listImg, "----222--------");
    },
    goBack() {
      this.$router.push('/home')
    },
    deletClick(){
       this.linkhref.hrefPic =[]
    },
    blurUrl(){
       this.$toast.loading()
       let params = {
         articleUrl: window.btoa(this.linkhref.href)
       } 
         this.$network
        .get('/material-service/article/wechat_article', params)
        .then((res) => {
          if(res.result){
             console.log(res, '------------')
            this.linkhref.hrefTitle =res.data.title
            this.linkhref.hrefDesc =res.data.contentAbstract
            this.imageUrl =res.data.cover
            this.linkhref.hrefurl = res.data.cover
          }else{
              this.$toast(res.msg)
          }
           
        })
    },
    goToMaterial(v) {
      this.tab = v
      this.$router.push('mterialPage')
    },
    sendMessage: _throttle(function () {
      
      let imgArr = []
        if(this.tab == "material"){
        if (window.location.origin == 'https://console.jzcrm.com') {
        this.shareUrlOrigin = 'https://h5.jzcrm.com'
      } else {
        this.shareUrlOrigin = 'https://test-h5.jzcrm.com'
      }
 
          
              if (this.materialList.tab == 1) {
          imgArr = [
            {
              url: `${this.shareUrlOrigin}/materialTemplate?materialId=${this.materialList.articleId}&type=${this.materialList.tab}&corpId=${localStorage.getItem('corpId')}`,
              ...this.materialList,
            },
          ]
            console.log(imgArr,"---l素材 ",this.shareUrlOrigin)
        } else if (this.materialList.tab == 2) {
          imgArr = [
            {
              url: `${this.shareUrlOrigin}/materialTemplate?materialId=${this.materialList.documentId}&type=${this.materialList.tab}&corpId=${localStorage.getItem('corpId')}`,
              ...this.materialList
            },
          ]
        } else {
          imgArr = [this.materialList]
        }
         }
      //   console.log(imgArr,"--------kkk")
      let materialList = []
    
      if (this.tab == 'image') {
        imgArr = this.lists
      } else if (this.tab == 'video') {
        imgArr = [this.videoUrl]
      } else if(this.tab == 'link'){
        // imgArr = [this.inputUrl]
        // imgArr = this.linkhref
        imgArr =[
            this.linkhref.href,
              this.imageUrl,
            this.linkhref.hrefTitle,
            this.linkhref.hrefDesc,
          
        ]
      }
        // }
      // else{
      //    materialList.push( this.materialList)
      let params
     if(this.tab == "material"){
             params = {
              content: this.textVal,
              // urls: imgArr,
              title:this.linkhref.hrefTitle,
              msgtype: this.tab,
              urlList:imgArr 
      }
        }else{
              params = {
                content: this.textVal,
                urls: imgArr,
                title:this.linkhref.hrefTitle,
                msgtype: this.tab,
                // urlList:imgArr 
              }
        }
      // let params = {
      //   content: this.textVal,
      //   // urls: imgArr,
      //   title:this.linkhref.hrefTitle,
      //   msgtype: this.tab,
      //   urlList:imgArr 
      // }
      if(this.linkhref.hrefTitle == ''){
         this.$toast("请输入标题")
      }else{
          //  this.loading = true
      if(this.linkhref.hrefTitle == "" && this.tab == "link"){
        this.$toast("请输入链接标题")
      }else{
            addFriendStrong(params).then((res) => {
        if (res.result) {
            // this.loading = false
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
      }
    }
    }, 5000),
    // sendMessage() {},
    fnDeleteImg(v, i) {
      this.lists.splice(i, 1)
    },
    //    beforeAvatarUpload(file) {
    //   // console.log(file)
    //   const isJPG =
    //     file.raw.type == "image/jpeg" ||
    //     file.raw.type == "image/jpg" ||
    //     file.raw.type == "image/png";
    //   const isLt2M = file.raw.size / 1024 / 1024 < 2;
    //   if (!isJPG || !isLt2M) {
    //     this.$message.error(
    //       "上传头像图片只能是 JPG,PNG,JEPG 格式，大小不能超过 2MB!"
    //     );
    //   }
    //   // console.log(isJPG, isLt2M)
    //   return isJPG && isLt2M;
    // },
        handleAvatarSuccess(request) {
      // console.log('--2----', request)
      this.$toast.loading({ duration: 0 })
      // if (this.beforeAvatarUpload(request.file)) {
        let formData = new FormData()
        formData.append('file', request.file)
        formData.append('filetype', 'image')
        formData.append('type', 'friend')
        uploadFile(formData).then((res) => {
          if (res.result) {
            this.imageUrl = res.data.url
            this.linkhref.hrefurl = res.data.url
            this.$toast.clear()
          }
        })
      // }
    },
       deleteImg() {
      this.imageUrl = ''
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
      this.$toast.loading({ duration: 5000 })
      uploadFile(formData).then((res) => {
        if (res.result) {
          this.lists.push(res.data.url)
          this.$toast.clear()
        }
        e.target.value = ''
      })
      // }
    },
    uploadVideo(e, fileType, type, accept, size) {
      // console.log('---e----', e)
      let _this = this
      let file = e.target.files[0]
      let filesize = e.target.files[0].size
      let filename = e.target.files[0].name
      let url = URL.createObjectURL(file)
      let audioElement = new Audio(url)
      // console.log('---e----', accept, e, filename)
      if (filename.indexOf(accept) == -1) {
        Notify({
          message: '请上传MP4格式文件',
          type: 'danger',
          duration: 1000,
        })
        e.target.value = ''
        return false
      }
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
            e.target.value = ''
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
  .friendtite{
     background: #fff;
    padding: 32px 32px 0;
        .titeFlex{
      display: flex;
      align-items: center;
    }
    .el-input{
      width: 550px;
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
        width: 153px;
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
        .article_warp{
              .article_img{
      display: flex;
      align-items: end;
      margin-top: 24px;
      img{
        width: 200px;
        height: 200px;
      }
      .article_color{
        margin-left: 24px;
        font-weight: 400;
        color: #4168F6;
        font-size: 28px;
      }
    }
          .article_text{
             color: #3C4353;
             line-height: 40px;
             font-size: 28px;
             display: flex;
             .article_color{
               color: #4168F6;
               margin-left: 24px;
             }
             .tites{
               margin-left: 18px;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space: nowrap;
               width: 120px;
             }
          }
          .article_flex{
             width: 686px;
             height: 168px;
             background: #FFFFFF;
             border: 1px solid #D9DAE4;
             display: flex;
             align-items: center;
              justify-content: space-evenly;
              margin-top: 24px;
             .tite{
               font-weight: 400;
               color: #3C4353;
               font-size: 28px;
               margin-bottom: 24px;
                overflow: hidden;
               text-overflow:ellipsis;
               white-space: nowrap;
               width: 500px;
             }
             .link_box{
               overflow: hidden;
               text-overflow:ellipsis;
               white-space: nowrap;
               font-weight: 400;
               color: #C0C4CC;
               font-size: 24px;
               width: 525px;
             }
             img{
               width: 100px;
               height: 100px;
             }
          }
        }
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
        .el-form{
          .el-form-item{
              /deep/ .el-form-item__label{
             padding: 0 2px 0 0;
             width: 160px;
        }
          }
        }
     
        margin-top: 36px;
        line-height: 80px;
        padding: 0 24px;
        .marB-24{
          margin-bottom: 24px;
        }
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
        .el-form{
          .el-form-item{
            display: flex;
            .el-input{
              width: 545px;
            }
          }
        }
        .cover_warp{
          // position: relative;
          // width: 182px;
          // height: 182px;
          // border-radius: 4px;
          // border: 1px solid #D9DAE4;
          .delte_icon{
            width: 28px;
            width: 28px;
            position: absolute;
            top: -10px;
            right: 0px;
            background: #fff;
           border-radius: 50%;
          }
          .file{
            
          }
        }
         .upload_avatar {
        height: 182px;
        .demo-input-suffix {
          display: flex;
          position: relative;
        }
        /deep/.avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          width: 182px;
          height: 182px;
          border-radius: 6px;
          cursor: pointer;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 40px;
          color: #8c939d;
          line-height: 182px;
          text-align: center;
        }
        .avatar {
          width: 100%;
          height: 100%;
        }
        .resetUpload {
          position: absolute;
          left: 190px;
          bottom: 0;
          font-size: 28px;
          color: #4168f6;
          cursor: pointer;
          width: 150px;
        }
        .el-icon-circle-close {
          position: absolute;
          left: 165px;
          top: -8px;
          cursor: pointer;
          width: 28px;
          height: 28px;
        }
        .imgTip {
          font-size: 14px;
          color: #c0c4cc;
          letter-spacing: 0;
          font-weight: 400;
          position: absolute;
          bottom: 0;
          left: 144px;
        }
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