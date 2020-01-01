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

    <van-tabs :active="active" :ellipsis="false" @click="getClassification">
      <scroll class="wrapper" :scrollY="true">
        <div ref="content" class="content">
          <van-tab v-for="(item,index) in bxMallSubDto" :key="index" :title="item.mallSubName">
            <div class="items" v-for="(item,index) in classifyList" :key="index">
              <div>
                <img :src="item.image" alt />
              </div>
              <div>
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
import scroll from "../../common/scroll";
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
      this.bxMallSubDto = this.category[index].bxMallSubDto;
    },
    getClassification(name, title) {
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
    }
  },
  mounted() {
    this.category = this.$store.state.category;
    this.bxMallSubDto = this.category[0].bxMallSubDto;
    console.log(this.category);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.items{
  display: flex;

}
.Bar {
  display: flex;
  height: 88vh;
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
</style>