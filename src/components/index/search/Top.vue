<template>
  <div class="Indextop">
    <div v-if="location" @click="locations" class="location">
      <div>{{location}}</div>
      <div class="iconfont icon-arrow-down"></div>
    </div>
    <div v-else class="location">定位中...</div>
    <div class="inputs">
      <form action="/">
        <van-search v-model="$store.state.searchkey" @input="changeValue"  placeholder="请输入搜索关键词" @focus="searchGoods" :show-action="show" @search="onSearch" @cancel="onCancel" />
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
      value: "",
      show:false,
    };
  },
  props: {
    values:{
      type:String,
      default:""
    },
    showPop:{
      type:Boolean,
      default:false
    }
  },
  components: {},

  methods: {
    onSearch() {
    
    },
    onCancel() {
     this.$store.state.showSearch=false
      this.show=false
      this.$parent.showPop=false
      this.$store.state.searchkey=""

    },
    locations() {
      this.$router.push("/city");
    },
    //@focus="searchGoods"
    searchGoods(){
      this.$parent.showPop=true
      this.show=true
     this.$store.state.showSearch=true
    //  this.$store.state.searchkey=""

    },
    //@input="changeValue"
    changeValue(){
   
        console.log(this.$store.state.searchkey);

     
    }
  },
  mounted() {
    let _this = this;
    AMap.plugin("AMap.CitySearch", function() {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (localStorage.getItem("location")) {
            _this.location = localStorage.getItem("location");
          } else {
            localStorage.setItem("location", result.city);
            _this.location = localStorage.getItem("location");
          }
        }
      });
    });
  },
  watch: {
    value(val){
      this.$emit("changeshow",{show:this.show,value:val})
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.Indextop {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  z-index: 999;
  background: rgb(240, 230, 230);
  .location {
    height: 40px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(240, 230, 230);
    >div:first-child{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/deep/ .van-search {
  padding: 0;
}
.inputs {
  flex: 1;
}
.van-search__action{
    background: rgb(240, 230, 230);
}
</style>