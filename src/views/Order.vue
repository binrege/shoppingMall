<template>
  <div>
    <div>
      <TopTittle :isBack="true">全部订单</TopTittle>
      <van-tabs v-model="active" swipeable :swipe-threshold="5">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="待支付">待支付</van-tab>
        <van-tab title="待发货">待发货</van-tab>
        <van-tab title="待收货">待收货</van-tab>
        <van-tab title="已完成">已完成</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {active:0,};
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {},
  mounted() {
    if(this.$route.query.active){
      this.active=this.$route.query.active
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>