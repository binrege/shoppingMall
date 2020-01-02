<template>
  <div>
    <TopTittle>商品分类</TopTittle>
    <div class="Bar">
        <SideBar></SideBar>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
import SideBar from "../components/category/SideBar";
export default {
  name: "",
  data() {
    return {
      
    };
  },
  props: {},
  components: {
    TopTittle,
    SideBar,
  },
  methods: {

  },
  mounted() {
    
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>