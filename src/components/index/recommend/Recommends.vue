<template>
  <div class="recommends">
    <div>商品推荐</div>
    <scroll class="wrapper" :data="data" :scrollX="scrollX" @scrollX="scrollX">
      <div ref="content" class="content">
        <div class="recommend" ref="itemWidth" v-for="(item,index) in data" :key="index">
          <div>
            <img :src="item.image" alt />
          </div>
          <div class="goodsName">{{item.goodsName}}</div>
          <div class="price">
            ￥{{item.mallPrice}}
            <span>￥{{item.price}}</span>
          </div>
          <div class="icon">
            <div>
              <van-icon name="cart" size="20" color="white" />
            </div>
            <div>查看详情</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../../common/scroll";
export default {
  name: "",
  data() {
    return {
      recomends: null
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    scrollX: {
      type:Boolean,
      default:false
    }
  },
  components: { scroll },

  methods: {},
  updated() {
      this.$refs.content.style.width=this.data.length*this.$refs.itemWidth[0].scrollWidth+"px"
  },
  mounted() {
   
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.content{
  width: 1000px;
  display: flex;
  img{
    // width: 30%;
  }
}
.wrapper{
  overflow: hidden;
}
.recommend{
  width: 200px;
  img{
    width: 200px;
  }
}
</style>