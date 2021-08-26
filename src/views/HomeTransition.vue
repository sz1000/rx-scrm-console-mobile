<template>
  <div class="CustomTransition">
    <!-- 11111111111111111
    22222222222222
    33333333333333 -->

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
    this.getWxAppid()
  },
  methods: {
    getWxAppid() {
      this.$network
        .get('/user-service/m/user/getappid', {
          redirect_uri: '/home',
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