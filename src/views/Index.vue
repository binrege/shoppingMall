<template>
  <div class="Index" ref="Index">
    <div class="top">
      <Top @changeshow="changeshow" :showPop.sync="showPop"></Top>
    </div>

    <scroll class="wrapper" :click="false" :scrollY="true">
      <div v-if="recomend" ref="content" class="content">
        <van-pull-refresh
          v-model="isLoading"
          loading-text="正在刷新..."
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <Wheelplanting :slides="recomend.slides"></Wheelplanting>

          <Category :category="recomend.category"></Category>
          <div v-if="recomend.advertesPicture">
            <Advertisement :advertesPicture="recomend.advertesPicture"></Advertisement>
          </div>
          <Recommend :recomend="recomend.recommend"></Recommend>
          <div v-if="recomend.floorName">
            <Floor :floor="recomend.floor1" :num="1" :floorName="recomend.floorName.floor1"></Floor>
            <Floor :floor="recomend.floor2" :num="2" :floorName="recomend.floorName.floor2"></Floor>
            <Floor :floor="recomend.floor3" :num="3" :floorName="recomend.floorName.floor3"></Floor>
          </div>
        </van-pull-refresh>

        <HotGoods :hotGoods="recomend.hotGoods"></HotGoods>
      </div>
    </scroll>
    <div v-if="showPop" :value.sync="value">
      <search></search>
    </div>
  </div>
</template>

<script>
import Top from "../components/index/search/Top";
import search from "../components/index/search/search";
import Wheelplanting from "../components/index/lunbo/Wheelplanting";
import Category from "../components/index/category/Category";
import Recommend from "../components/index/recommend/Recommend";
import Advertisement from "../components/index/advertisement/Advertisement";
import Floor from "../components/index/floor/Floor";
import HotGoods from "../components/index/hotGoods/HotGoods";
import scroll from "../components/common/scroll";
import common from "../js/common";
export default {
  name: "",
  data() {
    return {
      recomend: {},
      count: 0,
      isLoading: true,
      pulldown: true,
      show: false,
      value: null,
      showPop: false,
      scrollY: true,
      index: "index"
    };
  },
  updated() {
    console.log(this.value);
    console.log(this.$store.state.searchkey);
  },
  props: {},
  components: {
    Top,
    Wheelplanting,
    Category,
    Advertisement,
    Recommend,
    Floor,
    HotGoods,
    scroll,
    search
  },
  methods: {
    getRecommend() {
      this.$api
        .getRecommend()
        .then(res => {
          this.recomend = res.data;
          this.$store.state.category = res.data.category;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadData() {
      this.getRecommend();
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    changeshow(data) {
      // console.log(data);
      this.show = data.show;
      this.value = data.value;
    }
  },
  created() {
    this.loadData();
  },
  updated() {
    // console.log(this.value);
    // console.log(this.$store.state.user);
    // this.$refs.content.style.height =4180+ "px";
    // console.log(this.$refs);
  },
  mounted() {
    this.getRecommend();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrapper {
  height: 92.5vh;
  overflow: hidden;
  // touch-action: none;
}
</style>