<template>
  <div class="details">
    <TopTittle>购物车</TopTittle>
    <div v-if="states===1" class="nologin">
      <div class="shopicon"></div>
      <div>请先登录哦...</div>
      <div class="tologin" @click="toLogin('/login')">去登录</div>
    </div>
    <div v-if="states===2" class="nologin">
      <div class="shopicon"></div>
      <div>您的购物车还是空空的哦哦...</div>
      <div class="tologin" @click="toLogin('/')">去购物</div>
    </div>

    <scroll class="wrapper" v-if="states===3" :data="shopList" :click="false" :scrollY="true">
      <div v-if="shopList" ref="content" class="content">
        <div v-for="(item,index) in shopList" :key="index" class="shoplistItem">
          <div>
            <van-card
              :price="(item.present_price*item.count).toFixed(2)"
              :title="item.name"
              :thumb="item.image_path"
              @click-thumb="todetails(item)"
            >
              <div slot="num">
                <van-stepper v-model="item.count" integer @change="editCart(item)" />
              </div>
              <div class="checkbox">
                <van-checkbox v-model="item.check" @change="checkone"></van-checkbox>
              </div>
            </van-card>
          </div>
          <div class="checkbox">
            <van-checkbox v-model="item.check" @change="checkone"></van-checkbox>
          </div>
        </div>
      </div>
    </scroll>
    <div v-if="states===3">
      <van-submit-bar :price="sun" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
        <van-button type="danger" size="small" @click="deletegoods">删除</van-button>
        <!-- <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
        </span>-->
      </van-submit-bar>
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
      //1代表未登录  2代表已登录, 3代表购物车有数据
      states: 1,
      shopList: [],
      checked: false
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
  methods: {
    toLogin(path) {
      this.$router.push(path);
    },
    getCard() {
      this.$api
        .getCard({})
        .then(res => {
          console.log(res);
          this.shopList = res.shopList;
          console.log(this.shopList.length);
          if (this.shopList.length > 0) {
            this.states = 3;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      if (this.sun / 100 === 0) {
        this.$dialog.alert({
          title: "提示",
          message: "请选择您要购买的商品"
        });
      } else {
        let goodList = this.shopList.filter(item => {
          return item.check;
        });
        this.$store.state.shoppingGoodsList=goodList
        this.$router.push("/shoppingPayMent")

      }
    },
    checkAll() {
      this.checked = !this.checked;
      // console.log(this.checked);
      this.shopList.forEach(item => {
        item.check = this.checked;
      });
    },
    checkone() {
      console.log(
        this.shopList.every(item => {
          return item.check;
        })
      );
      this.checked = this.shopList.every(item => {
        return item.check;
      });
    },
    deletegoods() {
      let goodList = this.shopList.filter(item => {
        return item.check;
      });
      let goodIdList = [];
      goodList.map(item => {
        goodIdList.push(item.cid);
      });
      if (goodIdList.length > 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否删除选中商品"
          })
          .then(() => {
            // on confirm
            this.$api
              .deleteShop(goodIdList)
              .then(res => {
                this.getCard();
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$dialog.alert({
          title: "提示",
          message: "请选择您要删除的商品"
        });
      }
    },
    editCart(item) {
      this.$api
        .editCart(item.count, item.cid, item.mallPrice)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    todetails(item) {
      this.$router.push({
        path: "/details",
        query: { goodsId: item.cid, count: item.count }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("currentUser")) {
      this.states = 2;
      //获取购物车数据
      this.getCard();
    } else {
      this.states = 1;
    }
  },
  watch: {},
  computed: {
    sun() {
      let sum = this.shopList
        .filter(item => item.check)
        .reduce((prev, items, index, arr) => {
          return items.count * items.mallPrice + prev;
        }, 0);

      return sum * 100;
    }
  }
};
</script>

<style scoped lang='scss'>
.details {
  background: white;
}
.nologin {
  margin-top: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 70vw;
}
.shopicon {
  background: rgb(214, 169, 169) url("../assets/images/shop.png") no-repeat
    center;
  background-size: 80px;
  height: 120px;
  width: 120px;
  border-radius: 50%;
}
.tologin {
  width: 34.667vw;
  height: 30px;
  border: 1px solid rgb(150, 29, 29);
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}
.van-submit-bar {
  bottom: 53px;
}
/deep/ .van-submit-bar__bar {
  display: flex;
  justify-content: space-around;
}
.van-submit-bar__button {
  width: 24.333vw;
  height: 10.667vw;
  font-weight: 500;
  line-height: 10.667vw;
  border: 0;
}
.deletgoods {
  margin-left: 12.667vw;
}
.van-button {
  margin-left: 10px;
}
.shoplistItem {
  // display: flex;
  position: relative;
}
.checkbox {
  position: absolute;
  top: 43px;
  left: 10px;
}
.van-card__tag {
  position: absolute;
  top: 9.533vw;
  left: -7.4vw;
}
.van-card__thumb {
  margin-left: 26px;
}
.wrapper {
  height: 143vw !important;
  overflow: hidden;
  touch-action: none;
}
</style>