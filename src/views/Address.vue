<template>
  <div>
    <div>
      <TopTittle :isBack="true">地址列表</TopTittle>
    </div>
    <div v-if="list.length===0" class="myaddress">暂无收货地址</div>
<!-- 
    <scroll v-else class="wrapper" :data="list" :click="false" :scrollY="true">
      <div  ref="content" class="content"> -->
        <div >
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </div>
      <!-- </div>
    </scroll> -->
  </div>
</template>

<script>
import scroll from "../components/common/scroll";
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      disabledList: [
        // {
        //   id: "3",
        //   name: "王五",
        //   tel: "1320000000",
        //   address: "浙江省杭州市滨江区江南大道 15 号"
        // }
      ],
      from:null,
    };
  },
  props: {},
  components: {
    TopTittle,
    scroll
  },
   beforeRouteEnter (to, from, next) {
     // ...
     if(from.name==="shoppingPayMent"){
       next(vm=>{
          vm.$store.state.from="shoppingPayMent"
       })
     }
     next()
   },
 
  methods: {
    onAdd() {
      this.$router.push("/addressEdit");
    },

    onSelect(item, index){
        console.log(item);
      if(this.$store.state.from==="shoppingPayMent"){
        this.$store.state.address=item
        this.$router.push("/shoppingPayMent")
      }else{
        
      }
        
    },

    onEdit(item, index) {
      console.log(item);
      this.$router.push({ path: "/addressEdit", query: { item } });
    },
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          console.log(res);
          this.list = res.address;
          this.list.map(item => {
            item.id = item._id;
            if (item.isDefault) {
              this.chosenAddressId = item.id;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getAddress();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrapper {
  height: 143vw !important;
  overflow: hidden;
  touch-action: none;
}
.myaddress{
  text-align: center;
  margin-top: 40vh;
}
</style>