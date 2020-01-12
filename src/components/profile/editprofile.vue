<template>
  <div class="editInfo">
    <van-popup v-model="show" position="right" :duration="0.5" :style="{ height: '100%',width:'100%'}">
      <div>
        <div class="indexs">
          <TopTittle :isBack="true" @update="update">个人资料</TopTittle>
        </div>
        <div>
          <div class="infoItem">
            <div>头像:</div>
            <div class="images">
              <div>
                <img :src="avatar" alt />
              </div>
              <div class="iconfont iconarr-right"></div>
            </div>
          </div>
          <div class="infoItem">
            <div class="username">用户名:</div>
            <div class="inputs">
              <van-cell-group>
                <van-field v-model="username" placeholder="请输入用户名" />
              </van-cell-group>
            </div>
          </div>
          <div class="infoItem">
            <div class="username">昵称:</div>
            <div class="inputs">
              <van-cell-group>
                <van-field v-model="nickname" placeholder="请输入昵称" />
              </van-cell-group>
            </div>
          </div>
          <div class="infoItem">
            <div class="username">性别:</div>
            <div class="inputs">
              <van-radio-group v-model="gender" class="sex">
                <van-radio name="男" checked-color="#07c160">帅哥</van-radio>
                <van-radio name="女" checked-color="#07c160">美女</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div class="infoItem">
            <div class="username">邮箱:</div>
            <div class="inputs">
              <van-cell-group>
                <van-field v-model="email" placeholder="请输入邮箱" />
              </van-cell-group>
            </div>
          </div>
          <div class="infoItem">
            <div class="username">出生年月:</div>
            <div class="inputs">
              <van-cell-group>
                <van-field v-model="birth" placeholder="请输入出生年月" />
              </van-cell-group>
            </div>
          </div>
        </div>
        <div class="sub">
          <van-button type="warning" @click="saveUser">保存</van-button>
          <van-button type="primary">取消</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TopTittle from "../common/TopTittle";
export default {
  name: "",
  data() {
    return {
      shows: false,
      userInfo: null,
      username: null,
      nickname: null,
      gender: null,
      email: null,
      birth: "2019/12/1",
      avatar: null
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TopTittle
  },
  methods: {
    update(data) {
      this.$emit("update:show", data);
    },
    getdata() {
      this.$api
        .user({})
        .then(res => {
          console.log(res);
          this.userInfo = res.userInfo;
          this.username = this.userInfo.username;
          this.avatar = this.userInfo.avatar;
          this.nickname = this.userInfo.nickname;
          this.gender = this.userInfo.gender;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //gender,email,year,month,day,id,nickname,avatar
    saveUser() {
      this.$api
        .saveUser({
          id: "5e0efe11b4e2a71fd4d0c320",
          gender: this.gender,
          email: this.email,
          year: "2019",
          month: "12",
          day: "10",
          nickname: this.nickname,
          username: this.username,
          avatar: this.avatar
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // this.$api.saveUser({
    //   username: this.username,
    //   nickname: this.nickname,
    //   gender: this.gender,
    //   email: this.email,
    //   avatar: this.avatar
    // }).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // });
  },
  updated() {},
  mounted() {
    this.shows = this.show;

    console.log(this.shows);
    this.getdata();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.editInfo {
  height: 15vh;
}
/deep/ .containers {
  color: black;
}
.infoItem {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 10.333vw;
  }
}
.images {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputs {
  width: 74vw;
}
.sex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .van-radio {
    margin-right: 30px;
  }
}
.sub {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.van-cell {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.van-popup{
  z-index: 100000!important;
}
</style>