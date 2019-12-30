<template>
  <div>
    <Top></Top>
    <Wheelplanting :slides="recomend.slides"></Wheelplanting>
    <Category :category="recomend.category"></Category>
    <Recommend :recomend="recomend.recommend"></Recommend>
  </div>
</template>

<script>
import Top from "../components/index/search/Top";
import Wheelplanting from "../components/index/lunbo/Wheelplanting";
import Category from "../components/index/category/Category";
import Recommend from "../components/index/recommend/Recommend";
export default {
  name: "",
  data() {
    return {
      recomend:{},
    };
  },
  props: {},
  components: {
    Top,
    Wheelplanting,
    Category,
    Recommend,

  },
  methods: {
     getRecommend(){
      this.$api.getRecommend().then(res=>{
        console.log(res);
        this.recomend=res.data
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.getRecommend()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>