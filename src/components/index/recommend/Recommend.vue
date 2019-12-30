<template>
  <div class="recommends">
    <div>商品推荐</div>
    <div class="personWrap" ref="personWrap">
      <div ref="personTab" class="personTab">
        <div class="recommend" v-for="(item,index) in recomend" :key="index">
          <div>
            <img :src="item.image" alt />
          </div>
          <div class="goodsName">{{item.goodsName}}</div>
          <div>
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
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  data() {
    return {
      recomends: null
    };
  },
  props: {
    recomend: {
      type: Array,
      default: () => []
    }
  },
  components: {},

  methods: {
    personScroll() {
      console.log(this.recomend);
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = this.recomend.length* 95;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  updated() {
     this.$nextTick(() => {
      this.personScroll();
    });
  },
  mounted() {
   
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.recommends {
  height: 200px;
}
.recommends > div > div {

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
img {
  height: 25.333vw;
}
.personWrap {
  overflow: hidden;

}
.personTab {
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
  padding-right: 0.24rem;
}
.icon>div{
 height: 30px;
 display: flex;
  justify-content: center;
  align-items: center;
}
.icon>div:first-child{
  
  background: rgb(252, 248, 5);
  width: 8vw;
}
.icon>div:last-child{
  background: rgb(238, 7, 7);
  width: 18vw;
 
}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27vm;
  border-radius: 10%;
}
.recommend{
  border: 1px solid red;
}
.goodsName{
  width: 30.667vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>