<template>
  <div>
    <div>
      <TopTittle :isBack="true">评价中心</TopTittle>
    </div>
    <div class="evaluateimg">
      <img src="../assets/images/evaluate.jpg" alt />
    </div>
    <div class="contant">
      <van-tabs v-model="active">
        <van-tab title="待评价">内容 1</van-tab>
        <van-tab title="已评价">内容 2</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      active: 1
    };
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>

.contant{
  position: relative;
  height: 62vh;
}

.evaluateimg {
  img {
    width: 100%;
  }
}
/deep/ .van-tabs__wrap {
  width: 80%;
  position: absolute;
  top: -18px;
  left: 38px;
  border-radius:10px;
  box-shadow: 2px 2px 3.533vw  2px #4c4c4c;
}
/deep/ .van-tabs__content{
  position: relative;
  top: 9.8vw;
  // margin-top: -18px;
}
</style>