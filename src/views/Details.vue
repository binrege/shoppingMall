<template>
  <div>
    <backBtn></backBtn>
    <div>
      <van-swipe @change="onChange">
        <van-swipe-item><img :src="goods.image_path" alt=""></van-swipe-item>
        <van-swipe-item><img :src="goods.image_path" alt=""></van-swipe-item>
        <van-swipe-item><img :src="goods.image_path" alt=""></van-swipe-item>
        <van-swipe-item><img :src="goods.image_path" alt=""></van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
      </van-swipe>
    </div>
    <div>
      <div class="title">{{goods.name}}</div>
      <div>￥{{goods.present_price}}</div>
    </div>
    
  </div>
</template>

<script>
import backBtn from "../components/common/backBtn";
export default {
  name: "",
  data() {
    return {
      goods: {},
       current: 0,
       isLogin:true
    };
  },
  props: {},
  components: {
    backBtn
  },
  methods: {
     onChange(index) {
      this.current = index;
    },
    getdata(id) {
      this.$api
        .goodOne(id)
        .then(res => {
          console.log(res);
          this.goods = res.goods.goodsOne;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getdata(this.$route.query.goodsId);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img{
  width: 100%;
}
.custom-indicator{
  
  background: #ccc;
  margin-left: 90vw;
  width: 30px;
  border-radius: 3px;
  text-align: center;
}
</style>