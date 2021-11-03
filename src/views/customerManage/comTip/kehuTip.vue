<template>
	<div class="tipBox">
		 <el-form-item class="kehuForm" label="客户简称"
                      prop='customerName'>
                      
          <el-input v-model="addChildForm.customerName"
                    maxlength="30"
                    @input="remoteMethod"
                    @blur="isKehuListFun"></el-input>
                    
               <ul class="kehuList" v-if="isKehuList">
               	 <li style="color:#000;font-weight: bold;" v-if="optKehu.length>0?true:false">存在相似客户:</li>
               	 <li v-for="(item,index) in optKehu" :key="index">{{item.value}}</li>
               </ul>  
                    
       </el-form-item> 
	</div>
</template>
<script>
	const corpId = localStorage.getItem('corpId')
export default {
  computed: {
        
  },
  props: {
  	addChildForm: {
      type:Object
    },
  },
  data() {
    return {
    	  isKehuList:false,
    	 	optKehu: [],
    }
  },
    created() {
    	
    },
  methods: {
  	  remoteMethod() {
        if (this.addChildForm.customerName !== '') {
          
          	this.getKehuList() 
          	this.isKehuList = true
        } else {
          this.optKehu = [];
          this.isKehuList = false
        }
   },
   isKehuListFun(){
   			this.isKehuList = false
   			console.log(this.addChildForm)
   			let acf = this.addChildForm
   			this.$emit('getacf', acf)
   },
   getKehuList() {
      let params = {
                  name: this.addChildForm.customerName,
				  corpId:corpId
                }
      this.$network
        .post(
          '/common-service/elasticSearch/queryCustomerRecord/customers',
          params
        )
        .then((res) => {
       
          let kehuList = []
          kehuList = res.data
          
          for(let i = 0;i<kehuList.length;i++){
			    		kehuList[i].value = kehuList[i].customerName
			    }
           this.optKehu  = kehuList
             console.log('this.optKehu=====', this.optKehu)
        })
   },  
  }
}
</script>
<style lang="less">
/*自定义输入提示 联想 查询 input*/
.kehuForm,.gongsiForm {
    position: relative;
}
.kehuList,.GongsiList{
                position: absolute;
                    top: 80px;
                    width: 542px;
                    background: #ffffff;
                    padding: 24px;
                    border-radius: 3px;
                   /* cursor: pointer;*/
                    box-shadow: 2px 2px 4px 2px #c8d1db;
                    z-index: 100;
}
.kehuList li,.GongsiList li{
                width:542px;
                height: 40px;
                line-height: 40px;
                font-size: 28px;
                font-weight: 400;
                float: left;
                /* border-bottom: #accbebd9 1px dashed; */
                text-align: left;
}
  /*.kehuList li:hover,.GongsiList li:hover{
                    background: #fafbffd4;
                    color: #838a9d;
                    border-radius: 6px;
}*/
/*自定义输入提示 联想 查询 input*/
</style>
