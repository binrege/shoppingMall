<template>
  <div>
    <div>
      <TopTittle :isBack="true">评价中心</TopTittle>
    </div>
    <div class="goodsdetail">
      <div v-if="goods">
        <img :src="goods.image_path" alt />
      </div>
      <div>
        <div>商品评分</div>
        <div>
          <van-rate gutter="20px" v-model="value" />
        </div>
      </div>
    </div>
    <div class="comment">
      <van-field v-model="message" rows="1" type="textarea" placeholder="说说你的购买感受吧~~" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="noName">
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
     
    </div>
    <div class="submit">
        <van-button type="primary" @click="comment">提交</van-button>
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
      goods: null,
      value: 5,
      checked:false,
      message:"",
    };
  },
  props: {},
  components: {
    scroll,
    TopTittle
  },
  methods: {
    // getdata(id) {
    //   this.$api
    //     .goodOne(id)
    //     .then(res => {
    //       console.log(res);
    //       this.goods = res.goods.goodsOne;
    //       // this.goodss.title = this.goods.name;
    //       // this.goodss.picture = this.goods.image_path;
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // getdata(id) {
    //   this.$api
    //     .goodOne(id)
    //     .then(res => {
    //       console.log(res);
    //       this.goods = res.goods.goodsOne;
    //       // this.goodss.title = this.goods.name;
    //       // this.goodss.picture = this.goods.image_path;
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //comment  商品评论(id,rate,content, anonymous(是否匿名), _id, order_id, image=[])
     afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    comment(){
      this.$api.comment({
        image:null,
        id:this.goods.cid,
        rate:this.value,
        content:this.message,
        anonymous:this.checked,
        _id:this.goods._id,
        order_id:this.goods.order_id,
      }).then(res=>{
        console.log(res);
        if(res.code===200){
          this.$toast("评价成功")
          this.$router.go(-1)
           this.tobeEvaluated()
        }
       
      }).catch(err=>{
        console.log(err);
      })
    },
     tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          console.log(res);
        this.orderList=res.data.list
        this.$store.state.evaluate = this.orderList.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.getdata(this.$route.query.id);
    console.log(this.$route.query.id);
    this.goods=JSON.parse(this.$route.query.id)
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.goodsdetail {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  img {
    width: 100px;
  }
  > div:first-child {
    flex: 1;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 2;
  }
}
/deep/ .van-field__control {
  height: 200px;
  background: rgb(230, 210, 210);
}
.van-uploader {
  position: absolute;
  left: 8.8vw;
  bottom: 5px;
  width: 16.333vw;
  .van-uploader__upload {
    width: 16vw;
  }
}
.comment {
  position: relative;
}
.noName{
  padding: 0 20px;
}
.van-button{
  width: 80%;
  height: 40px;
  line-height: 40px;
  
}
.submit{
  margin-top: 20px;
 display: flex;
 justify-content: center;
}
</style>