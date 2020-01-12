<template>
 <div class="TopTittle">
   <div class="containers">
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
      },
      
   },
   components: {

   },
   methods: {
     back(){
       if(this.$route.name==="my")
       {
         this.$emit("update",false)
       }else{
            this.$router.history.go(-1)
       }
       

    
       
     }
   },
   beforeRouteLeave (to, from, next) {
     if(from.name==="shoppingPayMent"){
       next("/shoppingCar")
     }else{
       next()
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
  
  height:5vh;
  z-index: 9999!important;
}
.containers{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: white;
  font-size: 5.267vw;
  display: flex;
 height: 5vh;
 align-items: center;
 z-index: 9999;

}
.containers>div{
  flex: 1;
}
.back>div{
  width:9.333vw;
  padding-left: 10px;
  background: white;
  font-size: 6.267vw;
}
</style>