<template>
  <div>
    <backBtn></backBtn>

    <van-sku
      v-model="shows"
      ref="hop"
      :sku="sku"
      :goods="goodss"
      :goods-id="111"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :custom-stepper-config="customStepperConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />

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
      <van-goods-action-icon icon="wap-home-o" to="/" text="首页" />
      <van-goods-action-icon icon="cart-o" to="shoppingCar" text="购物车" :info="count" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addcar" />
      <van-goods-action-button type="danger" text="立即购买" @click="shopNow" />
    </van-goods-action>
  </div>
</template>

<script>
import scroll from "../components/common/scroll";
import backBtn from "../components/common/backBtn";
import { forestgreen } from "color-name";
export default {
  name: "",
  data() {
    return {
      goods: {},
      current: 0,
      isLogin: true,
      show: false,
      shows: false,
      index: 1,
      indexs: 1,
      images: [],
      iscollect: false,
      active: 0,
      count: null,
      quota: 10,
      quotaUsed: null,
      customStepperConfig: {
        // 自定义限购文案
        quotaText: "",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          const { action, limitType, quota, quotaUsed, startSaleNum } = data;

          if (action === "minus") {
            this.$toast(
              startSaleNum > 1 ? `${startSaleNum}件起售` : "至少选择一件商品"
            );
          } else if (action === "plus") {
            // const { LIMIT_TYPE } = Sku.skuConstants;
            if (limitType === quota) {
              let msg = `单次限购${quota}件`;
              if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
              this.$toast(msg);
            } else {
              this.$toast("库存不够了");
            }
          }
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => {},
        // 库存
        stockNum: 1999,
        // 格式化库存
        stockFormatter: stockNum => {}
      },
      goodss: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: ""
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          // {
          //   k: "颜色", // skuKeyName：规格类目名称
          //   v: [
          //     {
          //       id: "30349", // skuValueId：规格值 id
          //       name: "红色", // skuValueName：规格值名称
          //       imgUrl: "https://img.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
          //       previewImgUrl: "https://img.yzcdn.cn/1p.jpg" // 用于预览显示的规格类目图片
          //     },
          //     {
          //       id: "1215",
          //       name: "蓝色",
          //       imgUrl: "https://img.yzcdn.cn/2.jpg",
          //       previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
          //     }
          //   ],
          //   k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          // }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 300 // 价格（单位分）
            // s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            // s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            // stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "2.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        // messages: [
        //   {
        //     // 商品留言
        //     datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
        //     multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
        //     name: "留言", // 留言名称
        //     type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
        //     required: "1", // 是否必填 '1' 表示必填
        //     placeholder: "" // 可选值，占位文本
        //   }
        // ],
        hide_stock: false // 是否隐藏剩余库存
      }
    };
  },
  props: {},
  components: {
    backBtn,
    scroll
  },
  methods: {
    onBuyClicked() {
      console.log(this.$refs.hop);
      this.customStepperConfig.handleOverLimit({
        action: "plus",
        limitType: 10,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: 1
      });
      // console.log(object);
      console.log(this.customStepperConfig.handleStepperChange);
    },
    onAddCartClicked() {},
    shopNow() {
      console.log(111);
      this.shows = true;
      console.log(this.shows);
    },
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
          this.goodss.title = this.goods.name;
          this.goodss.picture = this.goods.image_path;
          this.sku.list[0].price = this.goods.present_price * 100;
          let currentUser = JSON.parse(localStorage.getItem("currentUser"));
          //将最近浏览保存在vuex
          let nickName = currentUser.user.nickname + "recentlybrowse";
          let arrlist = this.$store.state.recentlybrowse;
          if ((arrlist.length === 0)) {
            arrlist.push({
              [nickName]: [this.goods]
            });
          } else {
            arrlist.map(item => {
              console.log(item);
              console.log();
           
              if (Object.keys(item)[0] === nickName) {
                if (
                  !JSON.stringify(item[Object.keys(item)[0]]).includes(
                    JSON.stringify(this.goods)
                  )
                ) {
                  item[nickName].push(this.goods);
                } else {
                }
              }
            });
          }
        
          this.$store.state.recentlybrowse = arrlist;


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
      if (this.iscollect) {
        if (localStorage.getItem("currentUser")) {
          this.$api
            .collection(this.goods)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });

          this.$toast("收藏成功");
        } else {
          //未登录
          this.$router.push("/login");
        }
      } else {
        //取消收藏
        this.$api
          .cancelCollection(this.goods.id)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addcar() {
      this.$api
        .addShop(this.$route.query.goodsId)
        .then(ress => {
          console.log(ress);
          this.getCard();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCard() {
      this.$api
        .getCard({})
        .then(res => {
          console.log(res.shopList);
          this.$store.state.length = res.shopList.length;
          this.count = res.shopList.filter(item => {
            return item.cid === this.$route.query.goodsId;
          })[0].count;
          console.log(this.count);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCollection() {
      this.$api
        .isCollection(this.$route.query.goodsId)
        .then(res => {
          console.log(res);
          if (res.isCollection === 1) {
            this.iscollect = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.isCollection();
    this.getdata(this.$route.query.goodsId);
    if (this.$route.query.count) {
      this.count = this.$route.query.count;
    }
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