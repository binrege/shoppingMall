<template>
  <div class="city">
    <div class="tops">
      <TopTittle :isBack="true">城市列表</TopTittle>
      <form action="/">
        <van-search v-model="value" @input="search(value)" placeholder="请输入城市关键字" />
      </form>
    </div>
    <!-- <scroll class="wrapper"   :scrollY="true">
      <div ref="content" class="content"> -->
        <div v-if="isSearch===1" class="bottoms">
          <van-index-bar :sticky-offset-top="100" highlight-color="red" :index-list="letters">
            <div class="currentCity">
              <div>当前城市</div>
              <div class="cities">
                <div class="cityItem" @click="setLocation(location)">{{location}}</div>
              </div>
            </div>
            <div class="hotCity">
              <div>热门城市</div>
              <div class="cities">
                <div class="cityItem" @click="setLocation(item.name)"  v-for="(item,index) in hotCities" :key="index">{{item.name}}</div>
              </div>
            </div>
            <div v-for="(item,index) in values" :key="index">
              <van-index-anchor :index="letters[index]" />
              <div v-for="(items,indexs) in item" :key="indexs">
                <van-cell @click="setLocation(items.name)" :title="items.name"/>
              </div>
            </div>
            <!-- <div v-for="(item,index) in city" :key="index">

          <van-index-anchor :index="index" />
          <div v-for="(items,indexs) in item" :key="indexs">
            <van-cell :title="items.name"/>
          </div>
            </div>-->
          </van-index-bar>
        </div>
       
        <div v-if="isSearch===2" class="bottoms">
          <div class="cityItems" v-for="(item,index) in searchList" @click="setLocation(item.name)"  :key="index">
            {{item.name}}
          </div>
        </div>
         <div v-if="isSearch===3" class="bottoms noList">暂无数据</div>
      <!-- </div>
    </scroll> -->
  </div>
</template>

<script>
import cities from "../js/city";
import scroll from "../components/common/scroll";
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      value: null,
      city: {},
      hotCities: [],
      location: null,
      letters: [],
      values: [],
      searchList:[],
      isSearch:1,
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
  methods: {
    getData() {
      this.hotCities = cities.data.hotCities;
      this.city = cities.data.cities;
      this.letters = Object.keys(cities.data.cities);
      this.values = Object.values(cities.data.cities);
      console.log(this.city);
      console.log(this.values);
    },
    search(value){//模糊搜索
      this.searchList=[]
      this.values.map((item)=>{
        return item.some(items=>{
          if((items.spell+items.name).includes(value)){
            this.searchList.push(items)
          }
        })
      })
      console.log(this.searchList);
      
    },
    setLocation(location){
      localStorage.setItem("location",location)
      this.$router.push("/")
    },
    searchLists(){
      this.isSearch=false
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
    this.getData();
  },
  watch: {
    value(val,preval){
        console.log(val);
        console.log(preval);
        if(val.trim()!==null&&val.trim()!==""){
          if(this.searchList.length===0){
             this.isSearch=3
          }else{
             this.isSearch=2
          }
        }else{
          this.isSearch=1
        }
        console.log(this.isSearch);
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 85vh;
  overflow: hidden;
  touch-action: none;
 
}
.noList{
  text-align: center;
}
.city {
  font-size: 14px;
}
.tops {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  height: 15vh;
  background: white;
}
/deep/ .van-index-bar__sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80vh;
  top: 58%;
  
  color: rgb(93, 93, 243);
}
/deep/ .van-index-bar__index {
  font-size: 4vw;
}
.bottoms {
  margin-top: 100px;
  height: 85vh;
}
.currentCity {
  margin-top: 100px;
  height: 90px;
  // background: red;
  > div:first-child {
    background: rgb(240, 227, 227);
    padding: 10px;
  }
}
.cityItem {
  margin: 5px;
  width: 29vw;
  height: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}
.hotCity {
  > div:first-child {
    background: rgb(240, 227, 227);
    padding: 10px;
  }
}
.cities {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  font-size: 14px;
}
/deep/.van-index-anchor {
  background: #ccc;
}
.cityItems{
  border: 1px solid #ccc;
  height: 10.333vw;
  width: 100%;
  font-size: 14px;
  line-height: 10.333vw;
  padding-left: 10px;
}
</style>