<template>
  <div>
    <div>
      <TopTittle :isBack="true">最近浏览</TopTittle>
    </div>
    <div v-if="datalist.length===0" class="mycollect">暂无数据</div>
    <div v-else>
      <scroll class="wrapper" :data="datalist" :click="false" :scrollY="true">
        <div v-if="datalist" ref="content" class="content">
          <div v-for="(item,index) in datalist" :key="index" class="shoplistItem">
            <div>
              <van-card
                :price="item.present_price"
                :title="item.name"
                :thumb="item.image_path"
                @click-thumb="todetails(item)"
              >
                <div slot="num" @click="deleteCollect(item.id)">
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
    <div v-if="datalist.length!==0">
      <van-submit-bar button-text="删除" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      datalist: [],
      checked:false,
    };
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {
    getData() {
      //获取对应用户的最近浏览
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let arrlist = this.$store.state.recentlybrowse;
      let nickName = currentUser.user.nickname + "recentlybrowse";
      arrlist.map(item => {
        console.log(Object.keys(item)[0]);
        console.log(nickName);
        if (Object.keys(item)[0] === nickName) {
          this.datalist = item[Object.keys(item)[0]];
        }
      });
      console.log(this.datalist);
    },
    deleteCollect(id) {
      //取消收藏
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除该商品"
        })
        .then(() => {
          this.cancel(id);
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
      this.datalist.forEach(item => {
        item.check = this.checked;
      });
    },
    checkone() {
      console.log(
        this.datalist.every(item => {
          return item.check;
        })
      );
      this.checked = this.datalist.every(item => {
        return item.check;
      });
    },
    onSubmit() {
      //取消收藏
      let goodList = this.datalist.filter(item => {
        return !item.check;
      });
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除选中商品"
        })
        .then(() => {
        this.datalist=goodList
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let arrlist = this.$store.state.recentlybrowse;
      let nickName = currentUser.user.nickname + "recentlybrowse";
      arrlist.map(item => {
        if (Object.keys(item)[0] === nickName) {
          item[nickName] =this.datalist;
        }
      });
      this.$store.state.recentlybrowse=arrlist
        })
        .catch(() => {
          // on cancel
        });
    },
    //取消收藏商品
    cancel(id) {
      console.log(id);
     this.datalist=this.datalist.filter(item=>{
        console.log(item);
        return item.id!==id
      })
      console.log(this.datalist);
       let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let arrlist = this.$store.state.recentlybrowse;
      let nickName = currentUser.user.nickname + "recentlybrowse";
      arrlist.map(item => {
        if (Object.keys(item)[0] === nickName) {
          item[nickName] =this.datalist;
        }
      });
      this.$store.state.recentlybrowse=arrlist
    }
  },
  mounted() {
    this.getData();
    console.log(this.$store.state.recentlybrowse);
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