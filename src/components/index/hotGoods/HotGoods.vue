<template>
  <div class="hotGoods" ref="hotGoods">
    <div>热销商品</div>
    <div class="hotGood" ref="hotGood">
       <div class="items" ref="items">
      <div v-for="(item,index) in hotGoods" @click="todetails(item.goodsId)" :key="index">
        <div>
          <img :src="item.image" alt />
        </div>
        <div class="goodName">{{item.name}}</div>
        <div class="price">
          ￥{{item.mallPrice}}
          <span>￥{{item.price}}</span>
        </div>
      </div>
    </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    hotGoods: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    todetails(goodsId){
     this.$router.push({path:"/details",query:{goodsId}})
   }
  },
  updated() {
  },
  mounted() {
    console.log(this.hotGoods);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.hotGood {
  width: 100vm;
  color: red;
  
  overflow: hidden;
  // height: 700px;
   background: white;
}
.hotGoods>div:first-child{
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px;
}
.price {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  span {
    font-size: 3.2vw;
    color: #666;
    text-decoration: line-through;
  }
}
img {
  width: 100%;
}
.items {
  background: white;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // margin:5px;
}
.goodName {
  width: 48.667vw;
  padding: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  justify-content: flex-end !important;
  text-overflow: ellipsis;
  margin: 2.333vw 0;
}
.items > div {
  width: 50%;
  margin-bottom:5.667vw;
}
</style>