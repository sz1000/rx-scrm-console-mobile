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
    let href = window.location.href.split('?')[1]
    let p = href.split('&')[0]
    let authCode = p.split('=')[1]
    this.getData(authCode)
  },
  methods: {
    getData(v) {
      this.$network
        .get('/user-service/m/user/getloguser', {
          code: v,
        })
        .then((res) => {
          this.token = res.data.accessToken
          this.appid = res.data.corpId
          localStorage.setItem('token', res.data.accessToken)
          this.$router.push({
            name: '/customerPortrait',
            params: {
              appid: this.appid,
            },
          })
        })
    },
  },
}
</script>