<template>
  <van-action-sheet
    v-model="dialog"
    title="删除协助人"
  >
    <div class="vanContent">
      <div class="headerTab">
        <span class="helperTitle">协助人</span>
        <span class="powerTitle">权限</span>
      </div>
      <div class="lrBox">
        <div class="leftBox">
          <el-checkbox-group
            v-model="checkList"
            :key="index"
            class="checkBoxlabelEdit"
            v-for="(item, index) in list"
          >
            <el-checkbox
              :label="item.id"
            >
              <span>{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="rightBox">
          <div class="perBox" :key="index" v-for="(item, index) in list">
            {{ item.permission == 2 ? "只读" : "读写" }}
          </div>
        </div>
      </div>

      <div class="btnBox">
        <div class="buttonWarp">
          <span class="cancel" @click="dialog = false">取消</span>
          <span class="save" @click="saveDialogDel">确定</span>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
import { clueCustomerFollowUser_deleteFollowUsers } from '@/api/customer'
export default {
    name: 'DeleteHelper',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => []
        },
    },
    data(){
        return {
            dialog: false,
            checkList: [],
        }
    },
    methods: {
        saveDialogDel(){    //删除协助人
            let data = {
                ids: this.checkList,
            }
            clueCustomerFollowUser_deleteFollowUsers(data).then(res => {
                if(res.result){
                    this.$toast('删除成功!')
                    this.dialog = false
                    this.$emit('sure')
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
}
</script>

<style lang="less" scoped>
.vanContent {
  width: 100%;
  height: 750px;
  position: relative;
}
.headerTab {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  color: #3c4353;
  font-weight: bold;
  margin-top: 30px;
}
.helperTitle {
  width: 50%;
  display: inline-block;
  text-align: center;
}
.powerTitle {
  width: 50%;
  text-align: center;
  display: inline-block;
}
.lrBox {
  width: 100%;
}
.leftBox {
  width: 50%;
  float: left;
}
.rightBox {
  width: 50%;
  float: left;
}
.perBox {
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 400;
  margin-top: 30px;
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
/deep/.van-action-sheet__header {
  height: 88px;
  line-height: 88px;
  background: #fafbff;
  border-radius: 16px 16px 0px 0px;
  font-size: 32px;
  color: #3c4353;
  font-weight: 600;
}
/deep/.checkBoxlabelEdit {
  display: inline-block;
  text-align: left;
  padding-left: 100px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  color: #3c4353;
  letter-spacing: 0;
  font-weight: 400;
  margin-top: 30px;
  .el-checkbox__inner {
    width: 30px;
    height: 30px;
    font-size: 30px;
  }
  .el-checkbox__label {
    font-size: 30px;
  }
  .el-checkbox__input .el-checkbox__inner::after {
    width: 12px;
    height: 20px;
    box-sizing: content-box;
    content: '';
    border-left: 0;
    border-top: 0;
    left: 46%;
    position: absolute;
    top: 0;
    transform: translateX(-50%) rotate(45deg) scaleY(1);
  }
}
</style>