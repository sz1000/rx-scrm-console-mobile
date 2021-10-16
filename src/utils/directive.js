import Vue from 'vue'

const preventReClick = Vue.directive('preventReClick', {
    inserted: function(el, binding) {
        el.addEventListener('click', () => {
            // console.log('1111111111111-----', el, binding)
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 3000)
            }
        })
    },
})
const loadmore = Vue.directive('loadmore', {
    bind (el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function () {
        
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    }
  })

export default{
    preventReClick,
    loadmore
} 