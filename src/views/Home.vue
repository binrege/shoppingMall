<template>
  <div id="home">

    <router-view />

    <van-tabbar route fixed v-model="active">
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item v-if="$store.state.length===0" replace to="/shoppingCar" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item v-else replace to="/shoppingCar" icon="shopping-cart-o" :info="$store.state.length">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import common from '../js/common';
export default {
  name: "home",
  data() {
    return {
      active:0,
      length:null,
    };
  },
  props: {},
  components: {},
  methods: {
     getCard() {
      this.$api
        .getCard({})
        .then(res => {
          console.log(res.shopList);
          res.shopList;
          this.$store.state.length = res.shopList.length
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    
  },
  mounted() {
    this.getCard()
 
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
#home{
 background: rgb(240, 230, 230);
}
/deep/ .van-tabbar--fixed{
  // left: 5px;
  // width: 97%;
  height: 8vh;
  background: white;
  
}
</style>