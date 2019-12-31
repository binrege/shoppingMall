<template>
  <div class="hotGoods" ref="hotGoods">
    <div>热销商品</div>
    <div class="hotGood" ref="hotGood">
       <div class="items" ref="items">
      <div v-for="(item,index) in hotGoods" :key="index">
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
import BScroll from "better-scroll";
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
    personScroll() {
      console.log(this.hotGoods);
      // 默认有六个li子元素，每个子元素的宽度为120px
    //   let height = this.hotGoods.length/2 * 231+600;
    // console.log(height);
    //   this.$refs.items.style.height = height + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.hotGood, {
            startX: 0,
            startY: 0,
            click: true,
            scrollX: false,
            // 忽略竖直方向的滚动
            scrollY: true,
            eventPassthrough: "horizontal"
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
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.hotGood {
  width: 100vm;
  color: red;
  overflow: hidden;
  height: 700px;
   background: white;
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