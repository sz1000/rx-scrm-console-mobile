<template>
  <div class="material_warp">
    <div class="headerTitle">
      <div class="backPage" @click="goBack">
        <van-icon name="arrow-left" />
        返回
      </div>
      <span class="textTitle">从素材库选择</span>
    </div>
    <div class="tabBar">
      <span class="title" :class="{'active' : tab==1}" @click="selectTab(1)">文章</span>
      <span class="title" :class="{'active' : tab==2}" @click="selectTab(2)">文件</span>
      <span class="title" :class="{'active' : tab==3}" @click="selectTab(3)">海报</span>
    </div>
    <div class="search_input">
      <input type="text" v-model="searchInput" placeholder="请输入素材名称" class="inputArea">
      <van-icon name="search" size="28" @click="search" class="searchIcon" />
    </div>
    <div v-loading="loading">
         <div class="article_warp" v-if="this.tab == 1">
            <p class="tite_list">文章列表</p>
          
            <van-list
             
              :finished="finishedArticle"
              finished-text="已加载所有数据"
              @load="onLoad"
                >
           <ul>
              <li class="article_list"  v-for="(item,indexp) in list" :key="indexp" @click="listtusp(item,indexp)">
                   <img v-if="!item.cover" src="../../assets/images/article.png" alt="" class="article_img">
                   <img v-else :src="item.cover" alt="" class="article_img">
                   <span class="artice_text">{{item.title}}</span>
                   <!-- <van-radio-group v-model="radio" @change='changeRadio(item)'>
                     <van-radio :name="item"></van-radio>
                   </van-radio-group> -->
                  
                   <span v-if="indexps == indexp">
                     <img src="../../images/duihao.png" class="duihao_img" alt="">
                   </span>
                  <span v-else class="roud_yun"></span>
              </li>
            </ul>
       
            </van-list>
            </div>
    <div class="article_warp" v-if="this.tab == 2">
            <p class="tite_list">文件列表</p>
       
               <van-list
             
              :finished="finishedfile"
              finished-text="已加载所有数据"
              @load="onLoadfin"
                >
           <ul>
              <li class="article_list"  v-for="(item,indext) in listfin" :key="indext" @click="listtusp(item,indext)">
                   <img src="../../assets/images/pdf_image.png" alt="" class="article_img">
                   <span class="artice_text">{{item.name}}</span>
                   <!-- <van-radio-group v-model="radio" >
                     <van-radio :name="item"></van-radio>
                   </van-radio-group> -->
                      <span v-if="indexps == indext">
                     <img src="../../images/duihao.png" class="duihao_img" alt="">
                   </span>
                  <span v-else class="roud_yun"></span>
              </li>
            </ul>
            </van-list>
    </div>
          <div class="article_warp" v-if="this.tab == 3">
            <p class="tite_list">海报列表</p>
         
                     <van-list
              :finished="finished"
              finished-text="已加载所有数据"
              @load="onLoadPosters"
                >
           <ul>
              <li class="article_list"  v-for="(item,indexs) in listPosters" :key="indexs"  @click="listtusp(item,indexs)">
                   <img :src="item.posterUrl" alt="" class="article_img">
                   <span class="artice_text">{{item.posterName}}</span>
                   <!-- <van-radio-group v-model="radio">
                     <van-radio :name="item"></van-radio>
                   </van-radio-group> -->
                      <span v-if="indexps == indexs">
                     <img src="../../images/duihao.png" class="duihao_img" alt="">
                   </span>
                  <span v-else class="roud_yun"></span>
              </li>
            </ul>
              <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            </van-list>
    </div>
    </div>
 
      <div class="but_warp">
           <div class="cancel" @click="cancel">取消</div>
           <div class="determine" @click="determine">确定</div>
      </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      centquer:{},
      tab: 1,
      indexps:1000000,
      searchInput: '',
      radio:"",
        loading: false,
      finishedArticle: false,
      finishedfile:false,
      finished: false,
      list:[],
        pageInfo: {
        page: 1,
        limit: 10,
      },
        pageInfofin: {
        page: 1,
        limit: 10,
      },
      pageInposters: {
        page: 1,
        limit: 10,
      },
      total:0,
      totalf:0,
      totalp:0,
      listfin:[],
      listPosters:[],
      loading: true
    }
  },
  created(){
   this.getList()
  //  this.getFileList()
  },
  computed:{
      corpId(){
            return this.$store.getters.corpId
        },
      
  },
    watch: {
 
    // searchInput(val) {
    //   if (val == '') {
    //    this.getFilePosters()
    //   }
    // },
  },
  // updated(){  console.log(this.list.length,"mounted--")},
  methods: {

    goBack() {
      this.$router.go(-1)
    },
    determine(){
      console.log("000")
        this.$router.push({
          path:"/talkTool/circleFriend",
          query:{
            datalist:this.centquer,
            tablable:"material"
          }
        })

    },
    cancel(){
          this.$router.go(-1)
    },
    onLoad(){
      // console.log(this.list.length)
      // if(this.list.length >= this.total){
      //    console.log(this.list.length)
          this.pageInfo.page++
           this.getList()
        // this.finished = true;
      // }
    },
      changeRadio(item) {
      console.log(this.radio)
      console.log(item)
    },
    fanclick(item){
           console.log(item,"dainji")
    },
        onLoadfin(){
          //  if(this.listfin.length >= this.totalf){
                  this.pageInfofin.page++
                  this.getFileList()
                // this.finished = true;
              // }
        },
        listtusp(item,val){
            console.log(item)
            this.centquer = item
            this.indexps = val
              this.$set(this.centquer, "tab", this.tab);
        },
        onLoadPosters(){
          console.log(122)
            this.pageInposters.page+=1
            this.getFilePosters()
        },
    selectTab(v) {
     
      this.tab = v
      this.searchInput = ''
      if (v == 1) {
        //  this.pageInfo.page = 1
          //  this.indexps = 1000000
        // this.getArticle()
        //  this.list=[]
          // this.getList()
      } else if (v == 2) {
      // this.listfin = []
      // this.indexps = 1000000
      // this.pageInfofin.page = 1
        this.getFileList()
      } else {
        //  this.pageInposters.page = 1
        //  this.indexps = 1000000
        // // this.listPosters =[]
        this.getFilePosters()
      }
    },
        search() {
      if (this.tab == 1) {
        this.pageInfo.page = 1
        this.list =[]
        this.getList()
      } else if (this.tab == 2) {
          this.pageInfofin.page = 1
          this.listfin = []
        this.getFileList()
      } else {
          this.pageInposters.page = 1
            this.listPosters = []
        this.getFilePosters()
      }
    },
      getList() {
      this.$network
        .get('/material-service/article/list', {corpId:this.corpId,
              pageIndex: this.pageInfo.page,
              pageSize:this.pageInfo.limit, title: this.searchInput,})
        .then((res) => {
         console.log(res)
           if(res.result ){
           this.loading =false
         }
         let dataList = res.data.records
         this.total = res.data.total
         this.list =  this.list.concat(dataList)
        //  console.log( this.list.length," this.list")
            if (this.list.length >= this.total) {
            this.finishedArticle = true;
          }else{
            // this.onLoad()
          }
        //  if(this.tab == 1){
        //     this.list =  dataList
        //  }
        })
    },
    
      getFileList() {
      this.$network
        .get('/material-service/sale_document/list', {corpId:this.corpId,
              pageIndex: this.pageInfofin.page,
              pageSize:this.pageInfofin.limit, name: this.searchInput,})
        .then((res) => {
         console.log(res)
            if(res.result){
           this.loading =false
         }
         let dataLists = res.data.records
         this.totalf = res.data.total
         this.listfin =  this.listfin.concat(dataLists)
        //    if(this.tab == 2){
        //     this.listfin =  dataLists
        //  }
             if (this.listfin.length >= this.totalf) {
            this.finishedfile = true;
          }else{
            this.onLoadfin()
          }
        })
    },
        getFilePosters() {
 
         this.$network
        .get('/material-service/sale-poster-entity/list', {corpId:this.corpId,
              pageIndex: this.pageInposters.page,
              pageSize:this.pageInposters.limit, name: this.searchInput,})
        .then((res) => {
                if(res.result){
              let dataListstd = res.data.records
                    // console.log(dataListstd,"----0")
                    this.totalp = res.data.total
                    this.listPosters =  this.listPosters.concat(dataListstd)
                    console.log(this.listPosters,"====")
                      if(res.result){
                        this.loading =false
                      }
                        if (this.listPosters.length >= this.totalp) {
                          this.finished = true;
                        }else{
                          this.onLoadPosters()
                        }

                        }
                      })
    },
     //去重一次
    // unique(arr) {
    //   const res = new Map()
    //   return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    // },
  },
}
</script>
<style lang="less" scoped>
.material_warp {
  padding-top: 87px;
  min-height: 100vh;
  background: #fff;
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
      .van-icon {
        vertical-align: -10%;
        width: 28px;
        height: 28px;
      }
    }
    .textTitle {
      // flex: 1;
      display: inline-block;
      padding-left: 193px;
    }
  }
  .tabBar {
    display: flex;
    justify-content: space-around;
    height: 88px;
    align-items: center;
    .title {
      font-size: 32px;
      font-weight: 500;
      color: #838a9d;
      line-height: 45px;
      position: relative;
    }
    .active {
      color: #4168f6;
      &::after {
        content: '';
        position: absolute;
        bottom: -21px;
        left: 0;
        height: 4px;
        width: 100%;
        background: #4168f6;
      }
    }
  }
  .search_input {
    margin-top: 32px;
    padding: 0 32px;
    position: relative;
    .inputArea {
      width: 686px;
      height: 68px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #d9dae4;
      padding-left: 32px;
      font-size: 28px;
    }
    .searchIcon {
      position: absolute;
      right: 64px;
      top: 10px;
    }
  }
  .article_warp{
    padding: 0 32px 120px;
    .tite_list{
         
      font-size: 28px;
      font-weight: 550;
      color: #3C4353;
      margin: 34px 0;
    }
    .article_list{
      display: flex;
      align-items: center;
    height: 122px;
    border-bottom: 1px solid #F0F2F7;
        justify-content: space-between;
       .article_img{
         width: 70px;
         height: 70px;
         border-radius: 4px;
       }
       .artice_text{
         font-weight: 400;
        color: #3C4353;
        font-size: 28px;
          margin-left: 16px;
      margin-right: 30px;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
        width: 466px;
    text-align: left;
       }
       .roud_yun{
         width: 38px;
         height: 38px;
         background: #FFFFFF;
         border: 1px solid #D9DAE4;
         display: inline-block;
         border-radius: 50%;
       }
       .duihao_img{
         width: 38px;
         height: 38px;
       }
    }
  }
  .but_warp{
    background: #fff;
    display: flex;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%)
  }
  .cancel{
    width: 339px;
height: 80px;
background: #FFFFFF;
border-radius: 8px;
border: 1px solid #4168F6;
color: #4168F6;
font-size: 28px;
line-height: 80px;
text-align: center;
margin-right: 24px;
  }
  .determine{
    width: 339px;
height: 80px;
background: #4168F6;
border-radius: 8px;
color: #FFFFFF;
font-size: 28px;
line-height: 80px;
text-align: center;
  }
}
</style>