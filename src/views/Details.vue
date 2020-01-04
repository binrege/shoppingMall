<template>
  <div>
    <backBtn></backBtn>
    <scroll class="wrapper" :click="false" :scrollY="true">
      <div ref="content" class="content">
        <div>
          <van-swipe @change="onChange">
            <van-swipe-item v-for="(item,index) in images" :key="index" @click="changeshow(index)">
              <img :src="item" alt />
            </van-swipe-item>

            <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{images.length}}</div>
          </van-swipe>
          <van-image-preview v-model="show" :images="images" @change="onChanges" :show-index="true">
            <template v-slot:index>{{ index }}/{{images.length}}</template>
          </van-image-preview>
        </div>
        <div class="wrap">
          <div class="title">{{goods.name}}</div>
          <div class="fonts">￥{{goods.present_price}}</div>
          <div class="operate">
            <div>运费:0</div>
            <div>剩余:{{goods.amount}}</div>
            <div>
              收藏:
              <i
                class="iconfont"
                :class="{'iconshoucang2 collect':iscollect,iconshoucang:!iscollect}"
                @click="collect"
              ></i>
            </div>
          </div>
        </div>
        <div class="shop">
          <div class="left">
            <i class="iconfont icondianpu5"></i>
            <div>有赞的店</div>
            <i class="iconfont iconguanfang"></i>
          </div>
          <div>
            进去店铺
            <i class="iconfont iconarr-right"></i>
          </div>
        </div>

        <van-tabs v-model="active" swipeable title-active-color="red" line-height="0">
          <van-tab title="商品详情">
            <div v-html="goods.detail"></div>
          </van-tab>
          <van-tab title="商品评论"></van-tab>
        </van-tabs>
      </div>
    </scroll>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import scroll from "../components/common/scroll";
import backBtn from "../components/common/backBtn";
export default {
  name: "",
  data() {
    return {
      goods: {},
      current: 0,
      isLogin: true,
      show: false,
      index: 1,
      indexs: 1,
      images: [],
      iscollect: false,
      active: 0
    };
  },
  props: {},
  components: {
    backBtn,
    scroll
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onChanges(indexs) {
      this.index = indexs + 1;
    },
    changeshow(index) {
      this.index = index + 1;
      this.show = !this.show;
    },
    getdata(id) {
      this.$api
        .goodOne(id)
        .then(res => {
          console.log(res);
          this.goods = res.goods.goodsOne;
          for (let i = 0; i < 4; i++) {
            this.images.push(res.goods.goodsOne.image_path);
          }
          console.log(this.images);
        })
        .catch(err => {
          console.log(err);
        });
    },
    collect() {
      this.iscollect = !this.iscollect;
    }
  },
  mounted() {
    this.getdata(this.$route.query.goodsId);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img {
  width: 100%;
}
.custom-indicator {
  background: #ccc;
  margin-left: 90vw;
  width: 30px;
  border-radius: 3px;
  text-align: center;
}
.wrapper {
  height: 88.5vh;
  overflow: hidden;
  touch-action: none;
}
.wrap {
  padding: 0 20px;
}
.fonts {
  color: red;
  margin: 10px 0;
}
.operate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    i {
      font-size: 5vw;
    }
  }
}
.collect {
  color: red;
}
.van-goods-action-icon {
  font-size: 3.667vw;
}
.shop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left > i:first-child {
    color: red;
    font-size: 20px;
  }
  .left > i:last-child {
    color: red;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>