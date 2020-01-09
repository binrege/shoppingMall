<template>
  <div>
    <van-popup v-model="show" position="right" :overlay="false">
      <!-- 历史记录-->
      <!-- {{$store.state.searchkey}} -->
      <div v-if="showHistory===1">
        <div class="history">
          <div>搜索历史</div>

          <i class="iconfont iconshanchu2" @click="removeHistory"></i>
        </div>
        <div class="hiatoryList">
          <div @click="research(item)" v-for="(item,index) in $store.state.searchList" :key="index">
            <van-tag plain>{{item}}</van-tag>
          </div>
        </div>
      </div>
      <div v-if="showHistory===2">
        <!-- {{$store.state.searchkey}} -->
        <div v-for="(item,index) in list" :key="index" @click="todetails(item.id)">
          <van-card :price="item.present_price" :thumb="item.image" :origin-price="item.orl_price">
            <div slot="price-top">
              <div v-html="item.name"></div>
            </div>
          </van-card>
        </div>
      </div>
      <div v-if="showHistory===2&&list.length===0" class="nodata">暂无数据</div>
    </van-popup>
  </div>
</template>

<script>
import { keyWord, throttle, debounce } from "../../../js/util";
export default {
  name: "",
  data() {
    return {
      showHistory: 1,
      list: [],
      keyword: null,
      historyKey: [],
      show: true
    };
  },
  props: {},
  updated() {
    console.log(this.$store.state.searchList);
    console.log("update");
    // console.log(this.$store.state.searchkey);
    // this.value=this.$store.state.searchkey
    // if(this.$store.state.searchList.length===0){
    // this.$store.state.searchList = JSON.parse(
    //   localStorage.getItem("currentUser")
    // ).searchHistory;
    // console.log(this.$store.state.searchList);
    // this.historyKey = this.$store.state.searchList;
    // }
  },
  components: {},
  methods: {
    getData(val) {
      if (val.length > 0) {
        this.$api
          .search(this.$store.state.searchkey)
          .then(res => {
            console.log(res);
            this.list = res.data.list;
            this.list.map(item => {
              item.name = keyWord(item.name, val);
            });
            this.keyword = val;
            if (res.code === -1) {
              this.list = [];
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.showHistory = 1;
        this.list = [];
      }
    },
    todetails(goodsId) {
      console.log("todetails");
      console.log(this.keyword);
      let users = JSON.parse(localStorage.getItem("currentUser"));
      let userArr = JSON.parse(localStorage.getItem("userInfo"));
      this.$store.state.searchkey = "";
      this.$store.state.searchList = users.searchHistory;
      if (users) {
        //如果用户已登录
        console.log(users);
        console.log(userArr);
        userArr.map(item => {
          console.log(item);
          if (item.user.nickname === users.user.nickname) {
            console.log(item.searchHistory.indexOf(this.keyword));
            if (item.searchHistory.indexOf(this.keyword) === -1) {
              item.searchHistory.push(this.keyword);
              users.searchHistory.push(this.keyword);
            } else {
              console.log("已存在");
              console.log(users.searchHistory);
            }
          }
        });
        console.log(userArr);
        localStorage.setItem("userInfo", JSON.stringify(userArr));
        localStorage.setItem("currentUser", JSON.stringify(users));
        this.$store.state.searchList = JSON.parse(
          localStorage.getItem("currentUser")
        ).searchHistory;
        this.historyKey = this.$store.state.searchList;
        this.$router.push({ path: "/details", query: { goodsId } });
      }
    },
    research(item) {
      console.log(item);
      this.$store.state.searchkey = item;
      console.log(this.$store.state.searchkey);
      //将item展示到搜索框
      // this.value=item
      // this.$emit("update:value",item)
      // console.log(this.value);
    },
    removeHistory() {
      this.$dialog.confirm({
        title: "删除历史搜索",
        message: "是否删除历史搜索"
      })
        .then(() => {
          // on confirm
          let users = JSON.parse(localStorage.getItem("currentUser"));
          console.log(users);
          users.searchHistory = [];
          let userarr = JSON.parse(localStorage.getItem("userInfo"));
          userarr.map(item => {
            if (users.user.nickname === item.user.nickname) {
              item.searchHistory = [];
            }
          });
          this.$store.state.searchList = [];
          localStorage.setItem("userInfo", JSON.stringify(userarr));
          localStorage.setItem("currentUser", JSON.stringify(users));
        })
        .catch(() => {
          // on cancel
        });
    },
    getSearch(val) {
      this.list = [];
      console.log(val);
      console.log(this.$store.state.searchkey.length);
      if (val.length > 0) {
        console.log("val有数据");
        setTimeout(() => {
          this.getData(val);
        }, 200);

        this.showHistory = 2;
      } else {
        this.showHistory = 1;
      }
    }
  },

  mounted() {
    console.log("mounted");
    // this.value=this.$store.state.searchkey
    if (this.$store.state.searchList.length === 0) {
      this.$store.state.searchList = JSON.parse(
        localStorage.getItem("currentUser")
      ).searchHistory;
      console.log(this.$store.state.searchList);
      this.historyKey = this.$store.state.searchList;
    }
  },
  watch: {
    "$store.state.searchkey"() {
      console.log(this.$store.state.searchkey);
      let val = this.$store.state.searchkey;
      this.getSearch(val);

      // this.getData(val);
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.van-popup {
  // background: pink;
  height: 86vh !important;
  width: 100%;
}
.van-popup--right {
  top: 48.9vh;
}
.van-card__content {
  .van-card__bottom {
    flex: 1;
    > div:first-child {
      // margin-bottom: 7vw;
      height: 60px;
    }
    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
  }
}
.history {
  margin-top: 10px;
  padding: 10px;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  i {
    color: red;
  }
}
.hiatoryList {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  div {
    margin: 5px 5px;
  }
}
.van-tag--plain {
  background-color: #fff;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.333vw;
  color: rgb(170, 28, 139);
}
.nodata {
  text-align: center;
  margin-top: 20px;
}
</style>