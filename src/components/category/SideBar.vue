<template>
  <div class="Bar">
    <div class="leftBar">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="(item,index) in category"
          :key="index"
          :title="item.mallCategoryName"
        />
      </van-sidebar>
    </div>
    <van-tabs :active="active" :ellipsis="false" @change="getClassification" swipeable>
      <scroll class="wrapper" :scrollY="true">
        <div ref="content" class="content">
          <van-tab v-for="(item,index) in bxMallSubDto" :key="index" :title="item.mallSubName">
            <div class="items" v-for="(item,index) in classifyList" @click="todetails(item.id)" :key="index">
              <div>
                <img :src="item.image" alt />
              </div>
              <div class="rightcontant">
                <div class="goodName">{{item.name}}</div>
                <div class="price">
                  ￥{{item.present_price}}
                  <span>￥{{item.orl_price}}</span>
                </div>
              </div>
            </div>
          </van-tab>
        </div>
      </scroll>
    </van-tabs>
  </div>
</template>

<script>
import scroll from "../common/scroll";
export default {
  name: "",
  data() {
    return {
      activeKey: 0,
      category: [],
      bxMallSubDto: [],
      active: 0,
      classifyList: []
    };
  },
  props: {},
  components: { scroll },
  methods: {
    onChange(index) {
      if (this.category[index].bxMallSubDto) {
        this.bxMallSubDto = this.category[index].bxMallSubDto;
        this.getData(0);
      }
    },
    getClassification(name, title) {
      console.log(name);
      this.getData(name);
    },
    getData(name) {
      this.active = name;
      this.$api
        .getClassification({
          mallSubId: this.category[this.activeKey].bxMallSubDto[name].mallSubId
        })
        .then(res => {
          console.log(res);
          this.classifyList = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    todetails(goodsId){
     this.$router.push({path:"/details",query:{goodsId}})
   }
  },
  mounted() {
    if (this.$route.query.id) {
      //首页跳转过来显示内容
      this.activeKey = this.$route.query.id;
      this.category = this.$store.state.category;
      if (this.category[this.activeKey].bxMallSubDto) {
        this.bxMallSubDto = this.category[this.activeKey].bxMallSubDto;
        this.getData(0);
      }
    } else {
      // 底部导航过来后初始化显示内容
      this.category = this.$store.state.category;
      if (this.category[0].bxMallSubDto) {
        this.bxMallSubDto = this.category[0].bxMallSubDto;
        this.getData(0);
      }
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.items {
  display: flex;
}
.Bar {
  display: flex;
  height: 87vh;
  background: white;
}
.leftBar {
  width: 23vw;
}
/deep/.van-sidebar-item--select {
  border: none;
  background: skyblue;
}
/deep/.van-sidebar {
  background: white;
  flex: 1;
}
/deep/.van-tabs {
  width: 77vw;
}
img {
  width: 28vw;
}
.wrapper {
  height: 80vh;
  overflow: hidden;
  touch-action: none;
}
.price {
  color: red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  span {
    font-size: 3.2vw;
    color: #666;
    text-decoration: line-through;
    font-weight: lighter;
    margin-left: 6px;
  }
}
.goodName {
  width: 180px;
  padding: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // justify-content: flex-start !important;

  font-size: 14px;

  height: 20px;
}
.rightcontant {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>