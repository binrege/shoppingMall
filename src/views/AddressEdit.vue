<template>
  <div>
    <div>
      <TopTittle :isBack="true">编辑地址</TopTittle>
    </div>
    <div>
      <van-address-edit
        :area-list="areaList"
        show-postal
        :show-delete="isEdit"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择省', '请选择市', '请选择区']"
        @save="onSave"
        @delete="onDelete"
        :address-info="items"
        :save-button-text="texts"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import areaList from "../js/area";
import TopTittle from "../components/common/TopTittle";
export default {
  name: "",
  data() {
    return {
      areaList,
      searchResult: [],
      isEdit: false,
      items: null,
      texts: "保存"
    };
  },
  props: {},
  components: {
    TopTittle
  },
  methods: {
    onSave(content) {
      //保存地址
      console.log(content);
      if (this.isEdit) {
        this.editAdress(content);
      } else {
        this.addAdress(content);
      }
    },
    //删除地址
    onDelete() {
     
          this.$api
            .deleteAddress(this.items.id)
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$router.push("/address");
              }
            })
            .catch(err => {
              console.log(err);
            });
       
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    addAdress(content) {
      this.$api
        .postAddress({
          name: content.name,
          tel: content.tel,
          address:
            content.province +
            "/" +
            content.city +
            "/" +
            content.county +
            "/" +
            content.addressDetail,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAdress(content) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认修改地址信息"
        })
        .then(() => {
          // on confirm
          this.$api
            .postAddress({
              name: content.name,
              tel: content.tel,
              address:
                content.province +
                "/" +
                content.city +
                "/" +
                content.county +
                "/" +
                content.addressDetail,
              isDefault: content.isDefault,
              province: content.province,
              city: content.city,
              county: content.county,
              addressDetail: content.addressDetail,
              areaCode: content.areaCode,
              id: this.items.id
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$router.push("/address");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    if (this.$route.query.item) {
      this.items = this.$route.query.item;
      this.isEdit = true;
      this.texts = "修改地址";
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>