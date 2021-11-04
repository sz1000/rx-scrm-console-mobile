<template>
  <div class="clueWarp">
  	<div class="titleBox">
			<span class="blueDiv">
				
			</span>
			<span class="titleFujian">协助人</span>
		</div>
  	<el-button class="delBtn" size="small" type="primary" @click="delPop">
  		<i class="el-icon-delete"></i><span>删除</span>
  	</el-button>
    <el-button class="addBtn" size="small" type="primary" @click="addPop">
  		<i class="el-icon-circle-plus-outline"></i><span>添加</span>
  	</el-button>
    <div class="cardWarp">
        <div class="topInfo" v-for="(item, index) in yiList" :key="index">
          <div class="detailInfo">
            <div class="left">
              <div class="rowStyle">
                <span>员工姓名:</span>
                <span>{{ item.userName }}</span>
              </div>
              <div class="rowStyle">
		              <span class="label">添加时间:</span>
		              <span class="value">{{
		                formatDate(item.addTime, "yyyy-MM-dd hh:mm:ss")
		              }}</span>
              </div>
              <div class="rowStyle">
                <span>权限:</span>
                <span>{{ item.permission==1?"读写":"只读" }}</span>
              </div>
            </div>
            <div class="right">
              <div class="rowStyle">
                <span>线索来源:</span>
                <span>{{ item.source }}</span>
              </div>
              <div class="rowStyle">
                <span class="label">最近沟通:</span>
		              <span class="value">{{
		                formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss")
		              }}</span>
              </div>
              <div class="rowStyle">
              </div>
            </div>
          </div>
        </div>
    </div>
    <van-action-sheet v-model="show"
                        :lock-scroll='false'
                        @cancel='cancelIcon'
                        @click-overlay='cancelIcon'
                        title="删除协助人">
          <div class="vanContent">
          	<div class="headerTab">
          		<span class="helperTitle">协助人</span>
          		<span class="powerTitle">权限</span>
          	</div>
          	<div class="lrBox">
          				<div class="leftBox">
			          				<el-checkbox-group  v-model="checkList" @change="changeRightList" :key="index" class="checkBoxlabelEdit" v-for="(item, index) in yiList">
							            <el-checkbox @change="checkedChange"
							                         class="checkClass" :label="item.id">
							              <span>{{item.name}}</span>
							            </el-checkbox>
							          </el-checkbox-group>
			          	</div>
			          	<div class="rightBox" >
			          		<div class="perBox" :key="index" v-for="(item, index) in yiList">
			          				{{item.permission == 2?"只读":"读写"}}
			          		</div>
			          	</div>
          	</div>
          	
          	
          	
          <div class="btnBox">
	    			<div class="buttonWarp">
		            <span class="cancel"
		                  @click="closeDialog">取消</span>
		            <span class="save"
		                  @click="saveDialogDel">确定</span>
		          </div>
	          </div>
          </div>
    </van-action-sheet>
    <van-action-sheet v-model="showB"
                        :lock-scroll='false'
                        @cancel='cancelIconAdd'
                        @click-overlay='cancelIconAdd'
                        :overlay="false"
                        title="添加协助人">
        <div class="vanContent">

             <div class="topTitle">
             		<div class="titlePower"><span style="color: red;">*</span>权限设置:</div>
		         		<van-radio-group class="powerClass"  v-model="addObj.permission" direction="horizontal" @change="changePower">
									  <van-radio name="2">只读</van-radio>
									  <van-radio name="1">读写</van-radio>
								</van-radio-group>
             </div>
             
             <div class="pleBumen"><span style="color: red;">*</span>员工部门:</div>
             <input class="bumenSec" type="text" readonly="readonly" placeholder="请先选择部门"  :value="bumenName" @click="openBumenPop" />
            <!-- <select class="bumenSec" style="margin-left: 0px;" v-model="vm_depId" placeholder="请先选择部门" @change="ereBumen(vm_depId)">
						    <option
						    	class="bumenOpt"
						      v-for="item in bumenList"
						      :key="item.name"
						      :label="item.name"
						      :value="item.depId">
						    </option>
						 </select>-->
						 
						 
						 <van-action-sheet v-model="bumenPop" title="选择部门" :overlay="false">
							  		<van-picker
											  title=""
											  show-toolbar
											  :columns="bumenList"
											  @confirm="onConfirm"
											  @cancel="onCancel"
											  @change="onChange"
											  value-key="name"
											/>
						 </van-action-sheet>
						 
						 
             
             <!--<el-select style="margin-left: 0px;" v-model="vm_depId" placeholder="请先选择部门" @change="ereBumen(vm_depId)">
						    <el-option
						      v-for="item in bumenList"
						      :key="item.name"
						      :label="item.name"
						      :value="item.depId">
						    </el-option>
						 </el-select>-->
						 <div class="boxTop" style="margin-top: 30px;">
						 		<div v-if="isHelper" class="pleBumen" style=""><span style="color: red;">*</span>指定员工:</div>
						 		
						 		
							 <!--<el-select v-if="isHelper" class="manClass" v-model="vm_userId" placeholder="选择员工" @change="changeHelper(vm_userId)">
							    <el-option
							      v-for="item in heperList"
							      :key="item.index"
							      :label="item.name"
							      :value="item.userId">
							    </el-option>
							 </el-select>-->
							 			<input v-if="isHelper" readonly="readonly" class="bumenSec" type="text"  placeholder="选择员工" :value="yuangongName" @click="openYuangongPop" />
							 			<van-action-sheet v-model="yuangongPop" title="选择员工" :overlay="false">
							  					<van-picker
															  title=""
															  show-toolbar
															  :columns="heperList"
															  @confirm="onConfirmYuangong"
															  @cancel="onCancelYuangong"
															  @change="onChangeYuangong"
															  value-key="name"
															/>
										 </van-action-sheet>
							 
						 </div>
						 
             
             
        <div class="btnBox">
        		<div class="buttonWarp">
	            <span class="cancel"
	                  @click="closeDialogAdd">取消</span>
	            <span class="save"
	                  @click="saveDialogAdd">确定</span>
          	</div>
        </div>
        </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { _throttle, formatDate } from "../../../utils/tool";
export default {
  data() {
    return {
    	yuangongName:'',
    	yuangongPop:false,
    	bumenName:'',
    	bumenPop:false,
    	checkList: [],
    	isHelper:false,
    	vm_depId:'',
    	vm_userId:'',
    	value:'',
    	addObj:{
    		permission:'2'
    	},
    	showB:false,
    	show:false,
      yiList:[],
      bumenList:[],
      heperList:[],
      objItem:  JSON.parse(localStorage.getItem('detail')),
      oneList:[]
    };
  },
  watch: {
    inputValue(val) {
      if (val == "") {
        this.getData();
      }
    },
  },
  created() {
    this.page = 1;
    this.getHelperList();
    this.getBumenSec() 
    
  },
  methods: {
  	openYuangongPop(){
  		this.yuangongPop = true
  	},
  	onConfirmYuangong(value, index) {
  		this.yuangongName = value.name
    	let oneList = []
    	oneList.push(value)
    	this.oneList = oneList
    	console.log("changeHelper>>>>",oneList)
    	
   			this.yuangongPop = false;
    },
    onChangeYuangong(picker, value, index) {
    	/*console.log(value)
      console.log(`当前值：${value}, 当前索引：${index}`);*/
    },
    onCancelYuangong() {
    	this.yuangongPop = false;
    //  console.log('取消');
    },
  	openBumenPop(){
  		this.bumenPop = true;
  	},
  	onConfirm(value, index) {
     // console.log(`当前值：${value}, 当前索引：${index}`);
      console.log(value)
       let depId = value.depId
       this.bumenName = value.name
   			this.getHelperSerch(depId)
   			this.isHelper = true
   			this.bumenPop = false;
    },
    onChange(picker, value, index) {
    	/*console.log(value)
      console.log(`当前值：${value}, 当前索引：${index}`);*/
    },
    onCancel() {
    	this.bumenPop = false;
     // console.log('取消');
    },
    formatDate,
    checkedChange() {
		console.log(this.checkList)
    },
    changeRightList() {
      let _this = this
      console.log(this.checkList)
    },
    ereBumen(e){
   			console.log("部门>>>>",e)
   			this.getHelperSerch(e)
   			this.isHelper = true
   			//console.log("value>>>>",value)
    },
    changeHelper(v){
    	
    	let oneList = []
    	for(let i = 0;i<this.heperList.length;i++){
    		if(v== this.heperList[i].userId){
    			oneList.push(this.heperList[i])
    		}
    	}
    	this.oneList = oneList
    	console.log("changeHelper>>>>",v)
    	/*Object.assign(this.addObj,v)
  				console.log(this.addObj)*/
    },
	  changePower(){
	   	console.log('addObj.permission>>>>',this.addObj.permission)
	  },
    delPop(){
    	this.show = true
    },
    addPop(){
    	this.showB = true
    },
    closeDialogAdd(v) {
    /*  document.getElementById('html').style.overflow = 'auto'*/
      this.showB = false
    },
    saveDialogAdd() {
 /*     document.getElementById('html').style.overflow = 'auto'*/
      console.log('this.addObj>>>',this.addObj)
      			this.oneList[0].permission = this.addObj.permission
      let params = {
            clueCustomerNo: this.objItem.clueCustomerNo,
            userList: this.oneList,
          }
          this.$network
            .post(
              '/customer-service/clueCustomerFollowUser/addFollowUser',
              params
            )
            .then((res) => {
              console.log(res)
              if(res.code=='success'){
              	this.showB = false
              	let name =  this.oneList[0].name, nameArr = []
              	              	
              	for (var i=0;i<this.yiList.length;i++){
									nameArr.push(this.yiList[i].name)			   
								}    	
              	if(nameArr.indexOf(name) > -1){
										   			this.$message({
							                type: 'error',
							                message: '请勿重复添加协助人!',
							             })
										   }else{
										   			this.$message({
							                type: 'success',
							                message: '添加成功!',
							            })
										   }   			
              	this.getHelperList()
              }else{
              		this.$message({
		                type: 'error',
		                message: '添加失败!',
		              })
              }
              
              
              this.bumenName = ''
              this.yuangongName = ''
              
            })
      
    },
    cancelIconAdd() {
    //  document.getElementById('html').style.overflow = 'auto'
      this.showB = false
    },
    cancelIcon() {
     // document.getElementById('html').style.overflow = 'auto'
      this.show = false
    },
    closeDialog(v) {
     // document.getElementById('html').style.overflow = 'auto'
      this.show = false
      // console.log(v)
    },
    saveDialogDel() {
    //  document.getElementById('html').style.overflow = 'auto'
      this.show = false
      // console.log(v)
       console.log('this.checkList>>>',this.checkList)
      let endArr = this.checkList
		
      let params = {
           // clueCustomerNo: this.objItem.clueCustomerNo,
            ids: endArr,
          }
          this.$network
            .post(
              '/customer-service/clueCustomerFollowUser/deleteFollowUsers',
              params
            )
            .then((res) => {
              console.log(res)
              if(res.code=='success'){
	              	this.$message({
		                type: 'success',
		                message: '删除成功!',
		              })
		              this.getHelperList()
		              this.show = false
              }else{
              		this.$message({
		                type: 'error',
		                message: '删除失败!',
		              })
              }
              
            })
    },
     unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    getBumenSec() {
      let _this = this
    /*  let params = {
        cluecustomerno: this.objItem.clueCustomerNo,
      }*/
      _this.$network
        .get(
          '/user-service/userdepartment/getAlllist'
        )
        .then((res) => {
          console.log(res.data)         	
          _this.bumenList = res.data
        })
    },
    getHelperSerch(e) {
      console.log('???', e)
      let _this = this
      _this.isClick = !_this.isClick
      let params = {
      	cluecustomerno: this.objItem.clueCustomerNo,
        depId: e,
      }
      this.$network
        .get('/user-service/user/getUserList', params)
        .then((res) => {
          _this.heperList = res.data.user.records
          if (_this.heperList.length == 0) {
            this.$message({
              type: 'success',
              message: '当前部门没有员工',
            })
          }
          console.log(_this.heperList)
        })
    },
    getHelperList() {
      let _this = this
      let params = {
        cluecustomerno:this.objItem.clueCustomerNo,
      }
      _this.$network
        .get(
          '/customer-service/clueCustomerFollowUser/getFollowUserList',
          params
        )
        .then((res) => {
        	 console.log('yiList') 
          console.log(res.data)     
           console.log('yiList') 
          _this.yiList = res.data
        })
    },

    inquire: _throttle(function () {
      this.page = 1;
      this.cardList = [];
      this.getHelperList();
    }, 3000),
    deleteCard(item, index) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "删除后将不可恢复，是否确认删除？",
          className: "deleteBtn",
          confirmButtonText: "是",
          cancelButtonText: "否",
          messageAlign: "left",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
};
</script>
<style lang="less" scoped>
.lrBox{
	width: 100%;
}
.leftBox{
	width: 50%;
	float: left;
/*	background: red;*/
}
.rightBox{
	width: 50%;
	float: left;
/*	background: blue;*/
}
.perBox{
	display: inline-block;
	text-align: center;
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: 400;
	margin-top: 30px;
}
.headerTab{
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-family: PingFangSC-Medium;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: bold;
	margin-top: 30px;
}
.helperTitle{
	width: 50%;
	display: inline-block;
	text-align: center;
}
.powerTitle{
	width: 50%;
	text-align: center;
	display: inline-block;
}
/deep/.checkBoxlabelEdit{
	display: inline-block;
	text-align: left;
	padding-left: 100px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	font-weight: 400;
	margin-top: 30px;
	.checkClass span{
	/*	display: inline-block;*/
	}
	.el-checkbox__inner{
		width: 30px;
		height: 30px;
		font-size: 30px;
	}
	.el-checkbox__label{
	font-size: 30px;
	}
	.el-checkbox__input .el-checkbox__inner::after{
		width: 12px;
    height: 20px;
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    left: 46%;
    position: absolute;
    top: 0;
    transform: translateX(-50%) rotate(45deg) scaleY(1);
	}
	
}
/deep/.checkClass{
	/*font-size: 40px;*/
	.rightBox{

	}
}
.bumenSec{
	    height: 80px;
    	width: 547px;
    	font-size: 30px;
    	padding-left: 15px;
    	border-radius: 8px;
    	margin-left: 17px;
    	color: #C0C4CC ;
    	line-height: 80px;
    	background: #FFFFFF;
			border: 1px solid #D9DAE4;
			border-radius: 8px;
}
/deep/.el-select>.el-input{
    	height: 80px;
    	width: 547px;
    	font-size: 30px;
    	/*padding-left: 15px;*/
    	border-radius: 8px;
    	margin-left: 17px;
    	color: #C0C4CC ;
    	.el-select-dropdown .el-select-dropdown__item{
    		font-size: 30px;
    		line-height: 30px;
    		color: #C0C4CC ;
    	}
}
/deep/.el-select:hover .el-input__inner{
    		border-color: #C0C4CC;
		    height: 80px;
		    width: 547px;
		    border-radius: 8px;
		    font-size: 30px;
		    color: #C0C4CC ;
		    /*padding-left: 40px;*/
}
/deep/.el-input--suffix .el-input__inner{
				height: 80px;
		    width: 547px;
		    border-radius: 8px;
		    font-size: 30px;
		    color: #C0C4CC ;
}

.topTitle{
	width: 100%;
	height: 80px;
	line-height: 80px;
	padding-left: 23px;
	padding-top: 23px;
	margin-bottom: 60px;
}
.titlePower{
	height: 80px;
	font-family: PingFangSC-Regular;
	font-size: 30px;
	color: #3C4353;
	letter-spacing: 0;
	/*text-align: right;*/
	font-weight: 400;
	float: left;
	line-height: 80px;
}
/deep/ .powerClass{
			margin-left: 23px;
	    width: 400px;
	    height: 80px;
	    font-size: 30px;
	    float: left;
	    .van-radio{
	    	float: left;
	    	.van-radio__icon{
	    		font-size: 30px;
	    	}
	    }
}


/deep/.van-action-sheet__header {
      height: 88px;
      line-height: 88px;
      background: #fafbff;
      border-radius: 16px 16px 0px 0px;
      font-size: 32px;
      color: #3c4353;
      font-weight: 600;
    }
    .vanContent{
    	width: 100%;
    	height: 750px;
    	position: relative;
    }
    .btnBox{
    		position: fixed;
				bottom: 184px;
				width: 100%;
    }
.buttonWarp {
	width: 710px;
  height: 80px;
  margin: 0 auto;
}
.cancel,.save {
	float: left;
	display: inline-block;
  width: 339px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid #4168f6;
  text-align: center;
  line-height: 80px;
  margin: 0 auto;
  color: #4168f6;
  background: #fff;
  font-size: 30px;
}
.save {
  background: #4168f6;
  color: #fff;
  margin-left: 24px;
}
.Clues {
}


/deep/.el-button--primary:focus, .el-button--primary:hover {
    background: #FFFFFF;
    border-color: #D9DAE4;
    color: #838A9D;
}
/deep/ .el-message-box{
		width: 760px;
		height: 300px;
}
.delBtn,.addBtn{
					color: #838a9d;
          width: 124px;
          height: 68px;
          border-radius: 8px;
          border: 2px solid #d9dae4;
          text-align: center;
          position: absolute;
          right: 150px;
        /*  top: 0;*/
          background: #FFFFFF;
          font-size: 30px;
          top: -12px;
}
.addBtn{
	right: 5px;
}
.clueWarp {
	position: relative;
  height: 100%;
  .cardWarp {
    .topInfo {
      margin-top: 24px;
      /*height: 400px;*/
      background: #fff;
     /* padding: 24px 24px 0;*/
      .customInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconName {
          display: flex;
          img {
            width: 88px;
            height: 88px;
          }
          .flag {
            width: 88px;
            height: 88px;
            background: #4168f6;
            border-radius: 12px;
            text-align: center;
            line-height: 88px;
            color: #fff;
            font-size: 35px;
          }
          .nameSex {
            margin-left: 16px;
            span:nth-child(1) {
              font-size: 28px;
              font-weight: 600;
            }
            span:nth-child(2) {
              font-size: 24px;
              color: #ffb020;
            }
            span {
              display: inline-block;
            }
            img {
              margin-top: 21px;
              width: 28px;
              height: 28px;
            }
          }
        }
        .detailBtn {
          font-size: 28px;
          color: #838a9d;
          .van-icon {
            vertical-align: -11%;
            width: 28px;
            height: 28px;
          }
        }
      }
      .detailInfo {
        display: flex;
        margin-top: 42px;
        .left,
        .right {
          width: 50%;
          .rowStyle {
            line-height: 40px;
            font-size: 28px;
            margin-bottom: 24px;
            display: flex;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              /*width: 84px;*/
              color: #838a9d;
              overflow: hidden;
            }
            span:nth-child(2) {
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #3c4353;
              font-weight: 400;
            }
          }
        }
        .right {
          margin-left: 19px;
          .rowStyle {
            span:nth-child(1) {
              width: 140px;
            }
          }
        }
      }
      .tjry {
        height: 87px;
        border-top: 1px solid #f0f2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        span {
          display: inline-block;
        }
        .label {
          width: 200px;
          color: #838a9d;
        }
        .value {
          width: 100%;
          color: #3c4353;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .box {
          display: flex;
          width: 50%;
        }
        .box1 {
          display: flex;
          width: 50%;
          line-height: 87px;
          margin-left: 29px;
        }
      }
    }
  }
}
.pleBumen{
	display: inline-block;
	margin-left: 23px;
	margin-bottom: 25px;
	margin-top: 15px;
	font-size: 30px;
	font-weight: 400;
	color:  #3C4353;
}
/deep/.delBtn span, .addBtn span{
	position: relative;
    right: 9px;
}
.addBtn span{
	right: 20px;
}
/deep/.delBtn i, .addBtn i{
	position: relative;
    right: 3px;
}
/deep/.addBtn i{
	right: 14px;
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
/*	margin-top: 36px;
	    padding-left: 28px;*/
}
.blueDiv{
	width: 8px;
	height: 25px;
	background: #4168F6;
	margin-right: 12px;
	display: inline-block;
}

/deep/.van-action-sheet__content{
		overflow-y: scroll;
    margin-bottom: 200px;
}
</style>