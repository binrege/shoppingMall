<template>
   <div class="personWrap" ref="personWrap">
      <div ref="personTab" class="personTab">
        <!-- <div class="recommend" v-for="(item,index) in recomend" :key="index">
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
        </div> -->
        
      </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {},
  methods: {
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = this.recomend.length * 131;
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
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.personWrap {
  overflow: hidden;
}
.personTab {
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
  padding-right: 0.24rem;
}
</style>