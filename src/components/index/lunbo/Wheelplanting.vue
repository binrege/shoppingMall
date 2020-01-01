<template>
  <div class="lunbo">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in slides" :key="index">
        <img :src="item.image" />
      </van-swipe-item>
    </van-swipe>
   
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
       images: [
      ]
    };
  },
  props: {
    slides:{
      type:Array,
      default:()=>[]
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img{
  height:44.333vw;
}
.lunbo{
  margin-top:10vw;
}
</style>