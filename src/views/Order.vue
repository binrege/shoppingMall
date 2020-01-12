<template>
  <div>
    <div>
      <TopTittle :isBack="true">全部订单</TopTittle>
      <van-tabs v-model="active" swipeable :swipe-threshold="5">
        <van-tab title="全部">
          <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待支付">
           <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待发货">
           <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待收货">
           <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="已完成">
           <div class="contatn">开发中</div>
        </van-tab>
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
.contatn{
  padding: 0 10px;
  text-align: center;
}
</style>