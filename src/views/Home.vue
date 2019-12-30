<template>
  <div id="home">

    <router-view />

    <van-tabbar route fixed>
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingCar" icon="shopping-cart-o" info="5">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  props: {},
  components: {},
  methods: {
   
  },
  mounted() {
    
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
#home{
 background: rgb(240, 230, 230);
 padding: 5px 5px;
}
</style>