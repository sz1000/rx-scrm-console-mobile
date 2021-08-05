<template>
  <div id="default_drag_return">
    <img src="../images/backtop.png"
         alt=""
         @click="topreturn()" />
  </div>
</template>

<script>
export default {
  name: 'returntop',
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() {
    window.addEventListener('scroll', function () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      // console.log('----scrollTop----', scrollTop)
      if (scrollTop > 400) {
        document.getElementById('default_drag_return').style.visibility =
          'visible'
      }
      if (scrollTop < 400) {
        document.getElementById('default_drag_return').style.visibility =
          'hidden'
      }
    })
  },

  methods: {
    topreturn() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      document.getElementById('default_drag_return').style.visibility = 'hidden'
    },
  },
}
</script>
<style scoped lang="less">
#default_drag_return {
  img {
    position: fixed;
    z-index: 1000;
    bottom: 158px;
    right: 22px;
    width: 80px;
    height: 80px;
  }
}
</style>