<template>
  <div>
    <div>
      <TopTittle :isBack="true">评价详情</TopTittle>
    </div>
    <div>
      <div v-for="(item,index) in list" :key="index">
        <div class="users">
          <div>
            <img :src="user.avatar" alt />
            <van-rate v-model="details.rate" readonly />
          </div>
          <div>{{details.comment_time}}</div>
        </div>
        <div class="content">评价内容：{{details.content}}</div>
        <div class="comments">
          <div>
            <van-card
              :title="item.name"
              :thumb="item.image_path"
              :price="item.present_price"
              @click-thumb="todetails(item)"
            >
              <div class="cart" slot="num" @click="addcar(item.id)">
                <i class="iconfont icongouwuche"></i>
              </div>
            </van-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      value: 3,
      details: {},
      list: [],
      user: {}
    };
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {
    // evaluateOne(){
    //   this.$api.evaluateOne(this.$route.query.id,this.$route.query._id).then(res=>{
    //     console.log(res);
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    // }
    addcar(goodsId) {
      this.$api
        .addShop(goodsId)
        .then(res => {
          console.log(res);
          this.getCard()
          this.$toast("添加成功")
        })
        .catch(err => {
          console.log(err);
        });
    },
    getdata() {
      this.details = JSON.parse(this.$route.query.item)[0];
      this.list = this.details.goods.filter(item => {
        return item._id === this.$route.query.id;
      });
      console.log(this.list);
      console.log(this.details);
      this.user = JSON.parse(localStorage.getItem("currentUser")).user;
      console.log(this.user);
    },
      getCard() {
        this.$api
            .getCard({})
            .then(res => {
                console.log(res.shopList);
                this.$store.state.length = res.shopList.length
            })
            .catch(err => {
                console.log(err);
            });
    }
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.users {
  padding: 3px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 50px;
  }
  > div:first-child {
    display: flex;
    align-items: center;
  }
}

.content {
  margin: 10px 0;
  font-size: 16px;
}
.cart {
  i {
    color: red;
    font-size: 30px;
  }
}
</style>
