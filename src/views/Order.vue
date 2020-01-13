<template>
  <div>
    <div>
      <TopTittle :isBack="true">全部订单</TopTittle>
      <van-tabs v-model="active" swipeable :swipe-threshold="5">
        <van-tab title="全部">
          <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待支付">
          <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待发货">
          <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="待收货">
          <div class="contatn">此功能尚未开发</div>
        </van-tab>
        <van-tab title="已完成">
          <div class="contatn">
            <scroll class="wrapper" :click="false" :scrollY="true">
              <div  ref="content" class="content">
                <div v-for="(item,index) in order" :key="index" class="orderTemplate">
                  <div>订单编号:{{item.order_id}}</div>
                  <div>
                    <div v-for="(items,indexs) in item.order_list" :key="indexs">
                      <van-card
                        :num="items.count"
                        :price="(items.present_price*items.count).toFixed(2)"
                        :title="items.name"
                        :thumb="items.image_path"
                      />
                    </div>
                  </div>
                  <div class="bottom">
                    <div>创建时间:{{item.add_time}}</div>
                    <div>收货地址:{{item.address}}</div>
                    <div>共{{item.order_list.length}}件商品 合计:{{item.mallPrice}}元</div>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import scroll from "../components/common/scroll";
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      active: 0,
      order: []
    };
  },
  props: {},
  components: {
    TopTittle,scroll
  },
  methods: {
    getMyOrder() {
      this.$api
        .getMyOrder()
        .then(res => {
          console.log(res);
          this.order = res.list;
          // console.log(this.order);
          // this.order.map(item => {
          //   this.orderList = this.orderList.concat(item.order_list);
          // });
          // console.log(this.orderList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMyOrder();
    console.log(this.$route.query.active);
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.contatn {
  padding: 0 10px;
}
.orderTemplate {
  margin: 40px 0;
}
.bottom {
  div {
    text-align: right;
    margin: 5px 0;
  }
}
.wrapper {
  height:87.5vh;
  overflow: hidden;
  // touch-action: none;
}
</style>