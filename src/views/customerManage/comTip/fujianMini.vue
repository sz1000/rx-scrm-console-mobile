<template>
  <div class="clueWarp">
  						<div class="titleBox">
			    			<span class="blueDiv">
			    				
			    			</span>
			    			<span class="titleFujian">附件</span>
			    		</div>
				    	<div class="dataItem" v-for="(item,index) in fileList">
				    		{{item.name}}
				    	</div>
  </div>
</template>
<script>
	import { BASE_URL } from '../../../utils/request.js'
		import { getStoreValue } from '../../../utils/LocalStorageDate'
export default {
  data() {
    return {
      objItem: JSON.parse(localStorage.getItem('detail')),
			fileList:[],
			fileData:{
    	},
    	BASE_URL,
    };
  },
  watch: {

  },
   computed: {
            headers(){
                return {
	  //"token":location.hostname == 'localhost' || location.hostname == 'test-h5.jzcrm.com' ? localStorage.getItem('token'):getStoreValue('token')//连测试或本地时用这个
		"token":location.hostname == 'localhost'? localStorage.getItem('token'):getStoreValue('token')  //上生产或只连本地时用这个
                }
            }
  },
  created() {

  },
  mounted() {
  	this.getDownList()
  },
  methods: {
			/*附件下载*/
    delList(file, fileList){
    	console.log(file, fileList)
	  		console.log("删除")
	  		let _this = this
	  		let obj = `clueCustomerNo=${_this.objItem.clueCustomerNo}&id=${file.id}`
	  	//表单传参，需要如上转译。 
	  	
	      this.$network
	        .post('/customer-service/cluecustomeraccessory/delupload',obj)
	        .then((res) => {
	          console.log(res)
	          this.$message({
	            type: 'success',
	            message: res.msg,
	          })
	          //this.$set(this.fileList)
	        //_this.getDownList()
	        })
	  	},
	  	getDownList(){
	  		let _this = this
	  		let params = {
	        clueCustomerNo: this.objItem.clueCustomerNo,
	      }
	      this.$network
	        .get('/customer-service/cluecustomeraccessory/getList', params)
	        .then((res) => {
	          console.log(res)
	          let upLA = res.data //所有附件
	       		_this.fileList = upLA
	       		console.log(_this.fileList)
	        })
	  	},
			BeforeUpload(file) {
			  		console.log(file.name)
        		if (file.size / 1024 / 1024 >= 20) {
                    this.$message.error("上传文件格式为pdf, 大小不能超过20MB!");
                    return false
                }
        		this.fileData.clueCustomerNo = this.objItem.clueCustomerNo
            this.fileData.filetype = file.name.substring(file.name.lastIndexOf(".") + 1)
			},
			onSuccess(response, file, fileList){
	 
	     		this.$message({
	                type: 'success',
	                message: '上传成功!',
	              })
				//this.getDownList()
			},
			onError(err, file, fileList){
				console.log(err)
				this.$message({
	        type: 'success',
	        message: '上传失败!',
	      })
			},
			beforeRemove(file, fileList) {
				console.log(file, fileList)
        return this.$confirm(`确定移除 ${ file.name }？`);
        
        /*this.$dialog
        .confirm({
          title: '删除警告',
          message:
            `确定移除 ${ file.name }？`,
          className: 'giveUpBtn',
          confirmButtonText: '是',
          cancelButtonText: '否',
          messageAlign: 'left',
        })*/
        
     },
    /*附件下载*/
  },
};
</script>
<style lang="less" scoped>
.dataItem{
	width: 100%;
	height: 40px;
	font-size: 28px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: 400;
	line-height: 40px;
	margin-top: 24px;
}
.clueWarp {
	position: relative;
  height: 100%;
}
/deep/ .el-upload-list__item .el-icon-close-tip{
	color: #fafbff00;
}
/deep/ .el-upload-list__item{
	font-size: 28px;
	height: 40px;
	line-height: 40px;
}
.titleBox{
/*	width: 80px;*/
	height: 40px;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: bold;
	line-height: 40px;
	margin-bottom: 10px;
/*	margin-top: 36px;*/
}
.blueDiv{
	width: 8px;
	height: 25px;
	background: #4168F6;
	margin-right: 12px;
	display: inline-block;
}
/deep/.upBtn{
					color: #838a9d;
          width: 124px;
          height: 68px;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          text-align: center;
          position: absolute;
			    right: 0;
			    top: -24px;
          background: #FFFFFF;
          font-size: 30px;
}
/deep/.upBtn span{
	position: relative;
	right: 15px;
}
/deep/.upBtn i{
	position: relative;
	right: 1px;
}
/deep/.el-button--primary:focus, .el-button--primary:hover {
    background: #FFFFFF;
    border-color: #D9DAE4;
    color: #838A9D;
}
/deep/.el-upload-list__item .el-icon-upload-success,/deep/.el-upload-list__item .el-icon-close{
	font-size: 30px;
}
/deep/.el-tabs__item{
	height: 88px;
	line-height: 88px;
	font-size: 30px;
}
/deep/.el-upload-list__item-name{
	margin-top: 20px;
	font-size: 35px;
	line-height: 35px;
}
/deep/.el-message-box__btns button:nth-child(2){
	margin-left: 56px;
	    position: relative;
    left: 32px;
}
/deep/.el-message-box{
	    width: 376px!important;
    	height: 134px !important;
}
</style>