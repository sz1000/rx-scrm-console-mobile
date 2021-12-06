<template>
  <van-action-sheet
    v-model="dialog"
    :lock-scroll="false"
    title="添加协助人"
  >
    <div class="vanContent">
      <div class="topTitle">
        <div class="titlePower"><span style="color: red">*</span>权限设置:</div>
        <van-radio-group
          class="powerClass"
          v-model="addObj.permission"
          direction="horizontal"
        >
          <van-radio name="2">只读</van-radio>
          <van-radio name="1">读写</van-radio>
        </van-radio-group>
      </div>
      <div class="pleBumen"><span style="color: red">*</span>员工部门:</div>
      <input
        class="bumenSec"
        type="text"
        readonly="readonly"
        placeholder="请先选择部门"
        :value="bumenName"
        @click="openBumenPop"
      />
      <van-action-sheet v-model="bumenPop" title="选择部门">
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
      <div class="boxTop" style="margin-top: 30px">
        <div v-if="isHelper" class="pleBumen" style="">
          <span style="color: red">*</span>指定员工:
        </div>
        <input
          v-if="isHelper"
          readonly="readonly"
          class="bumenSec"
          type="text"
          placeholder="选择员工"
          :value="yuangongName"
          @click="openYuangongPop"
        />
        <van-action-sheet v-model="yuangongPop" title="选择员工">
          <van-picker
            title=""
            show-toolbar
            :columns="heperList"
            @confirm="onConfirmYuangong"
            @cancel="onCancelYuangong"
            value-key="name"
          />
        </van-action-sheet>
      </div>

      <div class="btnBox">
        <div class="buttonWarp">
          <span class="cancel" @click="dialog = false">取消</span>
          <span class="save" @click="saveDialogAdd">确定</span>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
import { _throttle, formatDate } from "@/utils/tool";
import {
    clueCustomerFollowUser_addFollowUser,
} from '@/api/customer'
import {
    userdepartment_getAlllist,
} from '@/api/user'
export default {
    name: 'AddHelper',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            dialog: false,
            isHelper: false,
            yuangongPop: false,
            bumenPop: false,
            addObj: {
                permission: '2',
            },
            bumenName: '',
            yuangongName: '',
            bumenList: [],
            heperList: [],
        }
    },
    mounted(){
        this.getAllList()
    },
    methods: {
        openBumenPop() {
            this.bumenPop = true
        },
        openYuangongPop() {
            this.yuangongPop = true
        },
        onCancelYuangong() {
            this.yuangongPop = false
        },
        onConfirmYuangong(value, index) {
            this.yuangongName = value.name
            let oneList = []
            oneList.push(value)
            this.oneList = oneList
            this.yuangongPop = false
        },
        onConfirm(value, index) {
            let depId = value.depId
            this.bumenName = value.name
            this.getHelperSerch(depId)
            this.isHelper = true
            this.bumenPop = false
        },
        saveDialogAdd(){
            this.oneList[0].permission = this.addObj.permission
            let params = {
                clueCustomerNo: this.objItem.clueCustomerNo,
                userList: this.oneList,
            }
            clueCustomerFollowUser_addFollowUser(params).then(res => {
                if(res.result){
                    this.dialog = false
                    this.$toast('添加成功!')
                    this.$emit('sure')
                }
            })
        },
        getAllList(){   //部门列表
            userdepartment_getAlllist().then(res => {
                if(res.result){
                    this.bumenList = res.data
                }
            })
        },
        getUserList(e){      //员工列表
            let params = {
                cluecustomerno: this.objItem.clueCustomerNo,
                depId: e,
            }
            user_getUserList(params).then(res => {
                if(res.result){
                    this.heperList = res.data.user.records
                    this.yuangongName = ''
                }
            })
        },
    },
    watch:{
        value(val){
            this.dialog = val
        },
        dialog(val){
            if(val){
                document.getElementById('html').style.overflow = 'hidden'
            }else{
                document.getElementById('html').style.overflow = 'auto'
            }
            if(this.value==val){return false}
            this.$emit('input',val)
        },
    },
};
</script>

<style lang="less" scoped>
.vanContent {
  width: 100%;
  height: 750px;
  position: relative;
}
.topTitle {
  width: 100%;
  height: 80px;
  line-height: 80px;
  padding-left: 23px;
  padding-top: 23px;
  margin-bottom: 60px;
}
.titlePower {
  height: 80px;
  font-size: 30px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 400;
  float: left;
  line-height: 80px;
}
/deep/ .powerClass {
  margin-left: 23px;
  width: 400px;
  height: 80px;
  font-size: 30px;
  float: left;
  .van-radio {
    float: left;
    .van-radio__icon {
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
.pleBumen {
  display: inline-block;
  margin-left: 23px;
  margin-bottom: 25px;
  margin-top: 15px;
  font-size: 30px;
  font-weight: 400;
  color: #3c4353;
}
.bumenSec {
  height: 80px;
  width: 547px;
  font-size: 30px;
  padding-left: 15px;
  border-radius: 8px;
  margin-left: 17px;
  color: #c0c4cc;
  line-height: 80px;
  background: #ffffff;
  border: 1px solid #d9dae4;
  border-radius: 8px;
}
.btnBox {
  position: fixed;
  bottom: 92px;
  width: 100%;
}
.buttonWarp {
  width: 710px;
  height: 80px;
  margin: 0 auto;
}
.cancel,
.save {
  float: left;
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
</style>