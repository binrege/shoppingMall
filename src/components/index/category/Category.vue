<template>
 <div class="category">
   <div v-for="(item,index) in category" :key="index">
     <div><img :src="item.image" alt=""></div>
     <div>{{item.mallCategoryName}}</div>
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
    category:{
      type:Array,
      default:()=>[]
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
.category{
  display: flex;
  align-items: center;
  height: 23.333vw;
  background: white;
  font-size: 12px;
  border-radius: 10px;
  margin: 5px 0;
}
.category>div{
  flex:1;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.category>div>div:last-child{
  margin: 5px 0 0;
}
img{
  width: 14vw;
}
</style>