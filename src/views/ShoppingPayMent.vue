<template>
  <div>
    <div>
      <TopTittle :isBack="true">订单结算</TopTittle>
    </div>
    <scroll class="wrapper" :click="false" :scrollY="true">
      <div ref="content" class="content">
        <div class="address" v-if="!adress.name" @click="toSelectAddress">
          <div class="clickItem" @click="setAddress">点击添加收货地址</div>
        </div>
        <div v-else class="addressDetails" @click="toSelectAddress">
          <div class="addressDetails-left">
            <i class="iconfont icondizhiguanli"></i>
          </div>
          <div class="middle">
            <div>
              <div>收货人:{{adress.name}}</div>
              <div>{{adress.tel}}</div>
            </div>
            <div>收货地址:{{adress.address}}</div>
            <div>(收货不方便是可以选择免费代收服务)</div>
          </div>
          <div class="addressDetails-right">
            <i class="iconfont iconarr-right"></i>
          </div>
        </div>
        <div class="imgline"></div>
        <!-- 商品列表 -->
        <div>
          <div v-for="(item,index) in goodList" :key="index">
            <van-card
              :num="item.count"
              :price="(item.present_price*item.count).toFixed(2)"
              :title="item.name"
              :thumb="item.image_path"
            />
          </div>
        </div>
      </div>
    </scroll>
   
    <div>
      <van-submit-bar :price="sun" button-text="提交订单" @submit="onSubmit" />
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
      adress: {},
      goodList: []
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
  methods: {
    onSubmit() {
      if (this.adress.name) {
        this.$dialog
          .confirm({
            title: "提示",
            message: `确认支付${this.sun / 100}元`
          })
          .then(() => {
            //提交订单
            this.placeOrder();
          })
          .catch(() => {});
      } else {
        this.$dialog.alert({
          title: "提示",
          message: "请选择收货地址"
        });
      }
    },
    placeOrder() {
      // address:收货地址,tel:电话，orderId：所有商品的id，
      //totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
      let goodIdList = [];
      this.$store.state.shoppingGoodsList.map(item => {
        goodIdList.push(item.cid);
      });
      this.$api
        .placeOrder({
          address: this.adress.address,
          tel: this.adress.tel,
          orderId: goodIdList,
          totalPrice: this.sun,
          idDirect: false,
          count: this.adress.count
        })
        .then(res => {
          console.log(res);
          this.deleteShop(goodIdList, res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteShop(goodIdList, result) {
      //删除购物车

      this.$api
        .deleteShop(goodIdList)
        .then(res => {
          this.$dialog.alert({
            message: result.msg
          });
          console.log(res);
          this.$store.state.shoppingGoodsList = [];
          this.$router.push("/shoppingCar");
        })
        .catch(err => {
          console.log(err);
        });
    },
    setAddress() {},
    toSelectAddress() {
      this.$router.push({
        path: "/address",
        query: { from: "shoppingPayMent" }
      });
    }
  },
  mounted() {
    console.log(this.$store.state.shoppingGoodsList);
    if (this.$store.state.shoppingGoodsList.length > 0) {
      this.goodList = this.$store.state.shoppingGoodsList;
    }
    if (this.$store.state.address) {
      this.adress = this.$store.state.address;
    } else {
      this.adress = null;
    }
  },
  watch: {},
  computed: {
    sun() {
      let sum = this.goodList.reduce((prev, items, index, arr) => {
        return items.count * items.mallPrice + prev;
      }, 0);

      return sum * 100;
    }
  }
};
</script>

<style scoped lang='scss'>
.wrapper {
  height: 157vw !important;
  overflow: hidden;
  touch-action: none;
}
.address {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: #666;
  background: skyblue;
}
.imgline {
  height: 10px;
  margin: 5px 0;
  background: url("../assets/images/caitiao.jpg");
}
.addressDetails {
  height: 10vh;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
}
.addressDetails > div:not(:nth-child(2)) {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.addressDetails-left {
  i {
    font-size: 9.333vw;
  }
}
.addressDetails-right {
  i {
    font-size: 20px;
  }
}
.middle > div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middle {
  width: 270px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > div:last-child {
    color: rgb(207, 221, 9);
  }
}
</style>