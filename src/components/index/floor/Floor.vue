<template>
  <div class="floors">
    <div class="floorNum">
      <div>{{num}}F</div>
      <div class="titles">{{floorName}}</div>
    </div>
    <div class="aaa">
      <div class="floor" v-for="(item,index) in floor" :key="index">
        <img :src="item.image" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    floor: {
      type: Array,
      default: () => []
    },
    floorName: {
      type: String,
      default: ""
    },
    num: {
      type: Number,
      default: 0
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.aaa {
  width: 100%;
  overflow: hidden;
  div{
   float: left;
  }
}
.aaa>div:nth-child(2){
  height: 97.26px;
}
img {
  width: 50vw;
  margin: 0;
  padding: 0;
 
}
.floorNum {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
.floorNum > div:first-child {
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 50%;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 2.533vw 0;
}
// .floor{
//   display: inline-block;
// }
</style>