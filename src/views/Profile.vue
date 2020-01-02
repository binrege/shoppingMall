<template>
 <div class="home">
    <TopTittle>会员中心</TopTittle>
    <div class="my">
      <div class="logo"><img :src="images" alt=""></div>
      <div @click="toLogin">登录/注册</div>
    </div>
    <div class="menu1">
      <div class="temp">
        <div class="iconfont icondaifukuan"></div>
        <div>代付款</div>
      </div>
      <div class="temp">
        <div class="iconfont icondaifahuo"></div>
        <div>代发货</div>
      </div>
      <div class="temp">
        <div class="iconfont icondaishouhuo"></div>
        <div>待收货</div>
      </div>
      <div class="temp">
        <div class="iconfont iconpingjia"></div>
        <div>评价</div>
      </div>
      <div class="temp">
        <div class="iconfont iconshoucang4"></div>
        <div>已完成</div>
      </div>
    </div>
    <div class="menu2">
      <div class="temps">
        <div class="left">
          <div class="iconfont icondingdan"></div>
          <div>全部订单</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps">
        <div class="left">
          <div class="iconfont iconcollect"></div>
          <div>收藏商品</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps">
        <div class="left">
          <div class="iconfont icondizhiguanli"></div>
          <div>地址管理</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps">
        <div class="left">
          <div class="iconfont iconzuijinliulan"></div>
          <div>最近浏览</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
    
    </div>
 </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
 export default {
name:'',
   data () {
     return {
        images:require("../assets/images/defaultIcon.svg")
     }
   },
   props: {

   },
   components: {
TopTittle,
   },
   methods: {
      toLogin(){
        this.$router.push("/login")
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
.home{
  background: white;
}
img{
  width: 17.333vw;
}
.my{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 52vw;
  background: red;
  color: white;
}
.logo{
  border-radius: 50%;
  margin-bottom: 10px;
}
.menu1{
  display: flex;
  margin: 10px 0;

}
.temp{
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;
  // border: 1px solid red;
  width: 20vw;
  height: 15vw;
}
.temp>div:first-child{
  font-size: 6.267vw;

}
.temps{
  padding: 10px;
  border:1px solid  #ccc;
  margin-bottom: 10px;
}
.temps,.temps>.left{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left>div:first-child{
  font-size: 5.267vw;
}
</style>