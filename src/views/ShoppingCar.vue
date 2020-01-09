<template>
  <div class="details">
    <TopTittle>购物车</TopTittle>
    <div v-if="states===1" class="nologin">
      <div class="shopicon"></div>
      <div>请先登录哦...</div>
      <div class="tologin" @click="toLogin('/login')">去登录</div>
    </div>
     <div v-if="states===2" class="nologin">
      <div class="shopicon"></div>
      <div>您的购物车还是空空的哦哦...</div>
      <div class="tologin" @click="toLogin('/')">去购物</div>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      //1代表未登录  2代表已登录, 3代表购物车有数据
        states:1,
    };
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {
    toLogin(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    if(localStorage.getItem("currentUser")){
      this.states=2


    }else{
      this.states=1
    }

  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.details {
  background: white;
}
.nologin {
  margin-top: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 70vw;
}
.shopicon {
  background: rgb(214, 169, 169) url("../assets/images/shop.png") no-repeat
    center;
  background-size: 80px;
  height: 120px;
  width: 120px;
  border-radius: 50%;
}
.tologin {
  width: 34.667vw;
  height: 30px;
  border: 1px solid rgb(150, 29, 29);
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}
</style>