<template>
 <div class="advertisement">
     
       <img :src="advertesPicture.PICTURE_ADDRESS" alt="">
     
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
     advertesPicture:{
       type:Object,
       default:()=>{}
     }
   },
   components: {

   },
   methods: {

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
img{
  width: 98.667vw;
}
</style>