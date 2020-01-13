<template>
  <div class="home">
    <TopTittle>会员中心</TopTittle>
    <div v-if="$store.state.currentUser===null" class="my">
      <div class="logo">
        <img src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg" alt />
      </div>
      <div @click="toLogin">登录/注册</div>
    </div>
    <div v-else class="my">
      <div class="sets iconfont iconshezhi" @click="setInfo"></div>
      <div v-if="$store.state.currentUser.user">
        <img :src="$store.state.currentUser.user.avatar" alt />
      </div>

      <div
        v-if="$store.state.currentUser.user"
        class="username"
      >欢迎您 {{$store.state.currentUser.user.nickname}}</div>
      <div class="exit" @click="leave">退出登录</div>
    </div>
    <div class="menu1">
      <div class="temp" @click="jump('/order',1)">
        <div class="iconfont icondaifukuan"></div>
        <div>待付款</div>
      </div>
      <div class="temp" @click="jump('/order',2)">
        <div class="iconfont icondaifahuo"></div>
        <div>待发货</div>
      </div>
      <div class="temp" @click="jump('/order',3)">
        <div class="iconfont icondaishouhuo"></div>
        <div>待收货</div>
      </div>
      <div v-if="!$store.state.evaluate||$store.state.evaluate===0" class="temp" @click="jump('/evaluate')">
        <div class="iconfont iconpingjia"></div>
        <div>评价</div>
        <input type="text" disabled v-model="$store.state.evaluate" class="info"/>
      </div>
      <div v-else class="temp" @click="jump('/evaluate')">
        <div class="iconfont iconpingjia"></div>
        <div>评价</div>
        <input type="text" disabled v-model="$store.state.evaluate" class="info" />
      </div>
      <div class="temp" @click="jump('/order',4)">
        <div class="iconfont iconshoucang4"></div>
        <div>已完成</div>
      </div>
    </div>
    <div class="menu2">
      <div class="temps" @click="toOrder('/order')">
        <div class="left">
          <div class="iconfont icondingdan"></div>
          <div>全部订单</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps" @click="toOrder('/collection')">
        <div class="left">
          <div class="iconfont iconcollect"></div>
          <div>收藏商品</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps" @click="toOrder('/address')">
        <div class="left">
          <div class="iconfont icondizhiguanli"></div>
          <div>地址管理</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
      <div class="temps" @click="toOrder('/browse')">
        <div class="left">
          <div class="iconfont iconzuijinliulan"></div>
          <div>最近浏览</div>
        </div>
        <div class="iconfont iconarr-right"></div>
      </div>
    </div>
    <Editprofile :show.sync="show"></Editprofile>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
import Editprofile from "../components/profile/editprofile";
export default {
  name: "",
  data() {
    return {
      images: require("../assets/images/defaultIcon.svg"),
      isLogin: false,
      userInfo: {},
      show: false,
      order: {},
      orderList: []
    };
  },
  props: {},
  components: {
    TopTittle,
    Editprofile
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    leave() {
      this.$api
        .loginOut({})
        .then(res => {
          console.log(res);
          this.$store.state.currentUser = null;
          this.$store.state.searchList = null;
          this.$store.state.count = null;
          this.$store.state.length =null;
          this.$store.state.address = {};
          this.$store.state.evaluated = 0;
          localStorage.removeItem("currentUser");
        })
        .catch(err => {
          console.log(err);
        });

      console.log("退出");
      console.log(this.$store.state.evaluated);
    },
    setInfo() {
      this.show = true;
    },
    toOrder(path) {
      if (path === "evaluate") {
        console.log(1111);
        this.$router.push({ name: path, query: { orderList: this.orderList } });
      } else {
        this.$router.push(path);
      }
    },
    jump(path, active) {
      if (path === "/evaluate") {
        console.log(1111);
        this.$router.push({ path, query: { orderList: this.orderList } });
      } else {
        this.$router.push({ path, query: { active } });
      }
    },
    getOrderNum() {
      this.$api
        .getOrderNum()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          console.log(res);
          this.orderList = res.data.list;
          this.$store.state.evaluate = this.orderList.length;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    console.log(!this.$store.state.evaluate);
    this.tobeEvaluated();
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
      this.userInfo = this.$store.state.currentUser;
    } else {
      this.$store.state.currentUser = null;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.home {
  font-size: 16px;
  background: white;
}
.sets {
  position: absolute;
  font-size: 16px;
  top: 10px;
  right: 10px;
}
img {
  width: 17.333vw;
  border-radius: 50%;
}
.my {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 52vw;
  background: red;
  color: white;
}
.username {
  border-radius: 50%;
  margin: 10px 0;
}
.menu1 {
  display: flex;
  margin: 10px 0;
}
.menu1 > div:nth-child(4) {
  position: relative;
}
.temp {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  // border: 1px solid red;
  width: 20vw;
  height: 15vw;
}
.temp > div:first-child {
  font-size: 6.267vw;
}
.temps {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.temps,
.temps > .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left > div:first-child {
  font-size: 5.267vw;
}
.info {
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 47px;
  background: red;
  border: none;
  color: white;
  font-size: 12px;
  border-radius: 50%;
}
</style>