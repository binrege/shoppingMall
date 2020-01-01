<template>
  <div class="Index" ref="Index">
    <div class="top">
      <Top></Top>
    </div>
    <scroll
      class="wrapper"
      :data="recomend.hotGoods"
      :scrollY="true"
    >
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
        <!--  -->
        <HotGoods :hotGoods="recomend.hotGoods"></HotGoods>
      </div>
    </scroll>
  </div>
</template>

<script>
import Top from "../components/index/search/Top";
import Wheelplanting from "../components/index/lunbo/Wheelplanting";
import Category from "../components/index/category/Category";
import Recommend from "../components/index/recommend/Recommend";
import Advertisement from "../components/index/advertisement/Advertisement";
import Floor from "../components/index/floor/Floor";
import HotGoods from "../components/index/hotGoods/HotGoods";
import scroll from "../components/common/scroll";
export default {
  name: "",
  data() {
    return {
      recomend: {},
      count: 0,
      isLoading: true,
      pulldown: true
    };
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
    scroll
  },
  methods: {
    getRecommend() {
      this.$api
        .getRecommend()
        .then(res => {
          console.log(res);
          this.recomend = res.data;
          this.$store.state.category=res.data.category
         
          
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
    }
  },
  created() {
    this.loadData();
  },
  updated() {
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
  touch-action: none;
}

</style>