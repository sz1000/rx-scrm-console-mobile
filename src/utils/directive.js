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

export default preventReClick