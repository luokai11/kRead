<template>
  <div class="setUp">
    <div class="setLeft">
      <span v-if="isBack" class="back" @click="back"><i class="mintui mintui-back"></i></span>
      <div class="back">{{title}}</div>
      <slot name="left"></slot>
    </div>
    <div class="setRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props:{
      isBack:{
        type:Boolean,
        default:true
      },
      title:String,
    },
    methods:{
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="less" scoped>

</style>