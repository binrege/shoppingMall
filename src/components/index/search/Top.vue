<template>
  <div class="Indextop">
    <div v-if="location" @click="locations" class="location">
      <div>{{location}}</div>
      <div class="iconfont icon-arrow-down"></div>
    </div>
    <div v-else  class="location">
        定位中...
    </div>
    <div class="inputs">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      location: null,
      value:null,
    };
  },
  props: {},
  components: {},
  methods: {
    onSearch() {},
    onCancel() {},
    locations(){
      
    }
  },
  mounted() {
    let _this = this;
    AMap.plugin("AMap.CitySearch", function() {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          _this.location = result.city;
         
        }
      });
    });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.Indextop{
  width:100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  z-index: 999;
background: rgb(240, 230, 230);
  .location{
    height: 40px;
    width: 70px;
    display: flex;
    justify-content:center;
    align-items: center;
    background: rgb(240, 230, 230);
  }
}
 /deep/ .van-search{
   padding: 0;
 }
 .inputs{
   flex: 1;
 }
</style>