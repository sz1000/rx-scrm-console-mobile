<template>
  <div class="CustomTransition">
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      appid: '',
    }
  },
  created() {
    // this.getWxAppid()
    // localStorage.removeItem('token')
    // localStorage.removeItem('userId')
  },
  methods: {
    getWxAppid() {
      this.$network
        .get('/user-service/m/user/getappid', {
          redirect_uri: '/customerPortrait',
        })
        .then((res) => {
          let params = {
            appid: res.data.suiteid,
            redirect_url: encodeURIComponent(
              'https://' + res.data.redirect_uri
            ),
          }
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${params.appid}&redirect_uri=${params.redirect_url}&response_type=code&scope=snsapi_base#wechat_redirect`
        })
    },
  },
}
</script>