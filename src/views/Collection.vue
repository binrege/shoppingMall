<template>
  <div>
    <div>
      <TopTittle :isBack="true">我的收藏</TopTittle>
    </div>
    <div v-if="collectList.length===0" class="mycollect">暂无数据</div>
    <div v-else>
      <scroll class="wrapper" :data="collectList" :click="false" :scrollY="true">
        <div v-if="collectList" ref="content" class="content">
          <div v-for="(item,index) in collectList" :key="index" class="shoplistItem">
            <div>
              <van-card
                :price="item.present_price"
                :title="item.name"
                :thumb="item.image_path"
                @click-thumb="todetails(item)"
              >
                <div slot="num" @click="deleteCollect(item.cid)">
                  <i class="iconfont iconshanchu"></i>
                </div>
              </van-card>
            </div>
            <div class="checkbox">
              <van-checkbox v-model="item.check" @change="checkone"></van-checkbox>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div v-if="collectList.length!==0">
      <van-submit-bar button-text="删除" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
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
      collectList: [],
      checked: false
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
  methods: {
    getCollection() {
      this.$api
        .getCollection()
        .then(res => {
          console.log(res);
          this.collectList = res.data.list;
          console.log(this.collectList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCollect(id) {
      //取消收藏
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消收藏该商品"
        })
        .then(() => {
          this.cancel(id)
        })
        .catch(() => {
          // on cancel
        });
    },
    todetails(item) {
      this.$router.push({
        path: "/details",
        query: { goodsId: item.cid, count: item.count }
      });
    },
    checkAll() {
      this.checked = !this.checked;
      // console.log(this.checked);
      this.collectList.forEach(item => {
        item.check = this.checked;
      });
    },
    checkone() {
      console.log(
        this.collectList.every(item => {
          return item.check;
        })
      );
      this.checked = this.collectList.every(item => {
        return item.check;
      });
    },
    onSubmit() {
      //取消收藏
       let goodList = this.collectList.filter(item => {
        return item.check;
      });
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消收藏选中商品"
        })
        .then(() => {
            goodList.map(item=>{
              // console.log(item);
              this.cancel(item.cid)
            })
            this.checked =false
        })
        .catch(() => {
          // on cancel
        });

     
    },
    //取消收藏商品
    cancel(id){
       this.$api
            .cancelCollection(id)
            .then(res => {
              console.log(res);
              this.getCollection();
            })
            .catch(err => {
              console.log(err);
            });
    }
  },
  mounted() {
    this.getCollection();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.shoplistItem {
  // display: flex;
  position: relative;
}
.van-card__thumb {
  margin-left: 26px;
}
.van-card__tag {
  position: absolute;
  top: 9.533vw;
  left: -7.4vw;
}
.van-submit-bar__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox {
  position: absolute;
  top: 43px;
  left: 10px;
}
.mycollect{
  text-align: center;
  margin-top: 40vh;
}
</style>