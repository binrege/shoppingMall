<template>
  <div v-if="recomend.length>0" class="recommends">
    <div>商品推荐</div>
    <!-- <div class="personWrap" ref="personWrap">
      <div ref="personTab" class="personTab">
        <div class="recommend" v-for="(item,index) in recomend" :key="index">
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
              <van-icon name="cart" size="20" color="white"/>
            </div>
            <div>查看详情</div>
          </div>
        </div>
      </div>
    </div> -->
     <scroll class="wrapper" :data="recomend" :scrollX="true">
      <div ref="content" class="content">
        <div class="recommend" ref="itemWidth" v-for="(item,index) in recomend" :key="index">
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
  <div v-else>加载中...</div>
</template>

<script>
import scroll from "../../common/scroll";
export default {
  name: "",
  data() {
    return {
    };
  },
  props: {
    recomend: {
      type: Array,
      default: () => []
    },
  },
  components: {scroll},

  methods: {
   
    
  },
  updated() {
    // console.log(this.$refs.itemWidth);
    // console.log(this.$refs.itemWidth[0].offsetWidth);
    // this.$refs.content.style.width=this.recomend.length*131+"px"
  },
  mounted() {
   
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.recommends {
 background: white;
  
  margin:5px 0;
  // overflow:hidden;
}
.recommends>div:first-child{
  padding: 10px;
}
// .recommends > div:first-child{
//   margin:10px 10px 0 10px;
// }

img {
  height: 32.333vw;
}
// .personWrap {
//   overflow: hidden;

// }
// .personTab {
//   white-space: nowrap;
//   font-size: 12px;
//   text-align: center;
//   padding-right: 0.24rem;
// }
.icon>div{
 height: 30px;
 display: flex;
 font-size: 14px;
  justify-content: center;
  align-items: center;
}
.icon>div:first-child{
  
  background: rgb(252, 248, 5);
 flex: 1;
 border-bottom-left-radius: 5px;
 border-top-left-radius: 5px;

}
.icon>div:last-child{
  background: #E23A18;
 flex: 2;
 border-bottom-right-radius: 5px;
 border-top-right-radius: 5px;
 
}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
}
.recommend{

 padding:5px;
}
.goodsName{
  width: 27.667vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.price{
  display:flex;
  justify-content: flex-start;
  align-items:center;
  font-size: 14px;
  span{
    font-size: 2.2vw;
    color: #666;
    text-decoration: line-through;
  }
  
}
.wrapper{
  width: 100vw;
  overflow: hidden;
  touch-action: none;
  display: flex;
}
.content{
  // flex:1;
  display: flex;
  // justify-content: flex-start;
  align-items: center;
}
</style>