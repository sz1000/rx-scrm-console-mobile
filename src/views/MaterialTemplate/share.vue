<template>
  <div class="material-template" :class="{pd01: materialType == 1 && !userNo, pd02: materialType == 2 && !userNo, p0: materialType == 2 && userNo}">
    <div v-if="userNo" class="top-fixed">
      <user-info :userData="userData"></user-info>
    </div>
    <material-content ref="materialContent" :userNo="userNo"></material-content>
  </div>
</template>
<script>
import { OffiAccount, UsersInfo, MaterialOperation } from '../../config/api'

import { isWeiXin, getCode } from '../../utils/tool'

import UserInfo from '../../components/MaterialTemplate/userInfo'
import MaterialContent from '../../components/MaterialTemplate/materialContent'

export default {
  name: 'materialTemplate',
  data() {
    return {
      userData: null,
      unionId: '',
      openId: '',
      materialId: '',
      materialType: '', // 1: 文章, 2: 文件,3:海报
      userNo: null,
      corpId: null,
      initiate: true,
      createUserNo: '',
    }
  },
  created() {
    const { materialId, type, userNo, corpId, createUserNo } = this.$route.query
    this.createUserNo = createUserNo ? createUserNo : ''
    this.userNo = userNo ? userNo : null
    this.corpId = corpId ? corpId : null
    this.materialId = materialId
    this.materialType = type

    if (isWeiXin()) {
      // 微信授权
      this.wechatLoad()
    }
    if (this.userNo) {
      this.getUsersInfo()
    }
    let params = {
      materialId,
      materialType: type,
    }

    this.$nextTick(() => {
      this.$refs.materialContent.getDetails(params)
    })
  },
  methods: {
    wechatLoad() {
      let { code } = this.$route.query

      this.sessionOpenId = sessionStorage.getItem('MATERIALTEMPLATE_OPENID')
      this.sessionUnionId = sessionStorage.getItem('MATERIALTEMPLATE_UNIONId')

      if (!code && !this.sessionOpenId) {
        getCode(encodeURIComponent(window.location.href))
      } else {
        if (this.sessionOpenId) {
          this.unionId = this.sessionUnionId
          this.openId = this.sessionOpenId
          this.materialOperation()
        } else {
          if (this.userNo) {
            this.getCorpId().then(() => this.offiAccount(code))
          } else if (this.corpId) {
            this.offiAccount(code)
          }
        }
      }
    },
    offiAccount(wechatCode) {
      let params = {
        code: wechatCode,
        corpId: this.corpId,
        userNo: this.userNo ? this.userNo : '',
      }

      OffiAccount(params).then((res) => {
        const { code, data } = res

        if (code === 'success') {
          const { unionid, openid } = data

          this.unionId = unionid
          this.openId = openid
          sessionStorage.setItem('MATERIALTEMPLATE_OPENID', openid)
          sessionStorage.setItem('MATERIALTEMPLATE_UNIONId', unionid)
          this.materialOperation()
        }
      })
    },
    materialOperation() {
      const params = {
        materialId: this.materialId,
        model: {
          materialType: this.materialType,
          unionId: this.unionId,
          openId: this.openId,
          userNo: this.userNo ? this.userNo : '',
          initiate: this.initiate,
          createUserNo: this.createUserNo ? this.createUserNo : '',
        },
      }

      MaterialOperation(params).then((res) => {
        if (res && res.code == 'success') {
          this.initiate = false
          setTimeout(() => {
            this.materialOperation(params)
          }, 5000)
        }
      })
    },
    getCorpId() {
      return new Promise((resolve, reject) => {
        UsersInfo(this.userNo)
          .then((res) => {
            const { code, data } = res

            if (code === 'success') {
              this.corpId = data.corpId
              resolve()
            } else {
              reject('获取corpId有误')
            }
          })
          .catch(reject)
      })
    },
    getUsersInfo() {
      UsersInfo(this.userNo).then((res) => {
        const { code, data } = res

        if (code === 'success') {
          this.userData = data
        }
      })
    },
  },

  components: {
    UserInfo,
    MaterialContent,
  },
}
</script>
<style lang="less" scoped>
@import url('../../styles/color');
.material-template {
  min-height: 100vh;
  padding: 172px 32px 32px;
  background-color: @white;
  position: relative;
  .top-fixed {
    width: 100%;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pd01 {
  padding-top: 28px;
}
.pd02 {
  padding: 28px 0 32px;
}
.p0 {
  padding: 144px 0 32px;
}
</style>