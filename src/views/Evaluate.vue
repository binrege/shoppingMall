<template>
  <div>
    <div>
      <TopTittle :isBack="true">评价中心</TopTittle>
    </div>
    <div class="evaluateimg">
      <img src="../assets/images/evaluate.jpg" alt />
    </div>
    <div class="contant">
      <van-tabs v-model="active">
        <scroll class="wrapper" :click="false" :scrollY="true">
          <div ref="content" class="content">
            <van-tab title="待评价">
              <div>
                <div v-for="(item,index) in orderList" :key="index">
                  <div>
                    <van-card
                      :title="item.name"
                      :thumb="item.image_path"
                      @click-thumb="todetails(item)"
                    >
                      <div class="comment" slot="num" @click="tocomment(item)">
                        <i class="iconfont iconduihuakuang"></i>
                        <div>评价晒单</div>
                      </div>
                    </van-card>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="已评价">
              <div>
                <div v-for="(item,index) in orderList2" :key="index">
                  <div>
                    <van-card
                      :title="item.name"
                      :thumb="item.image_path"
                      @click-thumb="todetails(item)"
                    >
                      <div class="comment" slot="num" @click="toevaluted(item._id)">
                        <i class="iconfont iconchakan"></i>
                        <div>查看评价</div>
                      </div>
                    </van-card>
                  </div>
                </div>
              </div>
            </van-tab>
          </div>
        </scroll>
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
      orderList: [],
      orderList2: [],
      areadycomment:[]
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
  methods: {
    tocomment(id) {
      this.$router.push({ path: "/rate", query: { id:JSON.stringify(id) } });
    },
    toevaluted(_id) {
      console.log(_id);
      this.areadycomment=this.areadycomment.filter(item=>{
       return JSON.stringify(item.goods).includes(_id)
      })
      this.$router.push({ path: "/evaluated", query: {item:JSON.stringify(this.areadycomment),id:_id}});
    },
    todetails(item) {},
    // getMyOrder() {
    //   this.$api
    //     .getMyOrder()
    //     .then(res => {
    //       console.log(res);
    //       this.order = res.list;
    //       console.log(this.order);
    //       this.order.map(item => {
    //         this.orderList = this.orderList.concat(item.order_list);
    //       });
    //       console.log(this.orderList);

    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          console.log(res);
          this.orderList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          console.log(res);
          this.areadycomment=res.data.list
          res.data.list.map(item => {
            this.orderList2 = this.orderList2.concat(item.goods);
          });
          console.log(this.orderList2);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
    // console.log(this.$route.query.orderList);
    // this.orderList=this.$route.query.orderList
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.contant {
  position: relative;
  height: 62vh;
}

.evaluateimg {
  img {
    width: 100%;
  }
}
/deep/ .van-tabs__wrap {
  width: 80%;
  position: absolute;
  top: -18px;
  left: 38px;
  border-radius: 10px;
  box-shadow: 2px 2px 3.533vw 2px #4c4c4c;
}
/deep/ .van-tabs__content {
  position: relative;
  top: 7.8vw;
  // margin-top: -18px;
}
.comment {
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid red;
  padding: 3px;
  font-size: 14px;
  color: red;
  border-radius: 16px;
  i {
    font-size: 14px;
    color: red;
  }
}
.wrapper {
  height: 57vh;
  overflow: hidden;
  // touch-action: none;
}
</style>