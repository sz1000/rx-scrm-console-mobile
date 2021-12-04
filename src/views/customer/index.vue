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
            let val = process.env.NODE_ENV === 'development' ? 'single_chat_tools' : this.$store.getters.entry
            let obj = {
                'single_chat_tools': CustomerPortrait,
                'group_chat_tools': GroupPortrait,
            }
            return obj[val]
        }
    },
    watch: {
        $route(to,from){
            console.log('$route',to,from)
        }
    },
}
</script>