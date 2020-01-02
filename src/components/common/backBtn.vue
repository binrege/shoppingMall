<template>
 <div class="backbtn">
    <div class="iconfont iconfanhuijian" @click="tobavk"></div>
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

   },
   components: {

   },
   methods: {
     tobavk(){
       this.$router.go(-1)
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
.backbtn{
  height: 30px;
  
  div{
    position: fixed;
    color:rgba($color: #000000, $alpha:.3);
    height: 30px;
    top: 25px;
    left: 19px;
    font-size: 30px;
    z-index: 999;
  }
}
</style>