<template>
  <div class="tipBox">
    <el-form-item label="企业名称:" class="gongsiForm">
      <el-input v-model="addChildForm.cropFullName" maxlength="100" @input="remoteMethodGongsi" @blur="isGongsiListFun"></el-input>
      <ul class="GongsiList" v-if="isGongsiList">
        <li style="color:#000;font-weight: 400;" v-if="optGongsi.length>0?true:false">存在相似公司:</li>
        <li v-for="(item,index) in optGongsi" :key="index">{{item.cropFullName}}</li>
      </ul>
    </el-form-item>
  </div>
</template>
<script>
const corpId = localStorage.getItem('corpId')
export default {
  computed: {},
  props: {
    addChildForm: {
      type: Object,
    },
  },
  data() {
    return {
      isGongsiList: false,
      optGongsi: [],
    }
  },
  methods: {
    remoteMethodGongsi() {
      if (this.addChildForm.cropFullName !== '') {
        this.getGongsiList()
        this.isGongsiList = true
      } else {
        this.optGongsi = []
        this.isGongsiList = false
      }
    },
    isGongsiListFun() {
      this.isGongsiList = false
      let gst = this.addChildForm
      console.log('gst--->', gst)
      this.$emit('getgst', gst)
    },
    getGongsiList() {
      let params = {
        cropFullName: this.addChildForm.cropFullName,
        corpId: corpId,
      }
      this.$network
        .post(
          '/common-service/elasticSearch/queryCustomerRecord/customers',
          params
        )
        .then((res) => {
          let GongsiList = []
          GongsiList = res.data
          /* 
          for(let i = 0;i<GongsiList.length;i++){
			    		GongsiList[i].value = GongsiList[i].name
			    }*/
          this.optGongsi = GongsiList
          console.log('this.optGongsi=====', this.optGongsi)
        })
    },
  },
}
</script>
<style lang="less">
</style>
