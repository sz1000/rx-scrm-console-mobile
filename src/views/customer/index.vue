<template>
    <component v-bind:is='currentComponents'></component>
</template>

<script>
import CustomerPortrait from './CustomerPortraitNew.vue'
import GroupPortrait from './Groupportrait.vue'
export default {
    components: {
        CustomerPortrait,
        GroupPortrait
    },
    computed: {
        currentComponents(){
            let { comeFrom } = this.$route.query
            let val = process.env.NODE_ENV === 'development' || comeFrom == 'messageCard' ? 'single_chat_tools' : this.$store.getters.entry
            if(!val){
                val = 'single_chat_tools'
            }
            console.log('obj val',val)
            let obj = {
                'single_chat_tools': CustomerPortrait,
                'group_chat_tools': GroupPortrait,
            }
            return obj[val]
        }
    },
}
</script>