<template>
    <svg class="icon svg_icon" @mouseover="hover=true" @mouseleave="hover=false" aria-hidden="true">
        <use :xlink:href="`#${iconType}`"></use>
    </svg>
</template>
<script>
export default {
    name:'yxIcon',
    props:['type','hoverType','active'],
    computed:{
        iconType(){
            let str = ''
            if(this.active){
                str = this.hoverType
            }else {
                str = this.hover && this.hoverType ? this.hoverType : this.type
            }
            return str
        }
    },
    data(){
        return {
            hover:false
        }
    }
}
</script>
<style lang="less" scoped>
.svg_icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>