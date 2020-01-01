<template>
 <div class="TopTittle">
   <div class="container">
     <div class="back">
        <div v-if="isBack" class="iconfont iconarrow-left1" @click="back"></div>
     </div>
     <slot></slot>
     <div></div>
   </div>
 </div>
</template>

<script>
 export default {
name:'',
   data () {
     return {

     }
   },
   props: {
      isBack:{
        type:Boolean,
        default:false
      }
   },
   components: {

   },
   methods: {
     back(){
       this.$router.history.go(-1)
     }
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.TopTittle{
  height:4vh;
}
.container{
  background: white;
  font-size: 5.267vw;
  display: flex;
  padding:5px 0;
  justify-content: flex-start;
}
.container>div{
  flex: 1;
}
.back>div{
  width:9.333vw;
  padding-left: 10px;
  background: white;
  font-size: 6.267vw;
}
</style>