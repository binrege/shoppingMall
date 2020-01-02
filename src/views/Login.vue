<template>
  <div class="login">
    <div class="container">
      <div>登录/注册</div>
      <van-cell-group>
        <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="codes">
        <div>验证码</div>
        <div>
          <input v-model="code" label="验证码" placeholder="请输入验证码" />
        </div>
        <div v-html="codes" @click="refreshCode"></div>
      </div>
      <div class="sub">
        <van-button round type="primary" size="normal" @click="login">登录</van-button>
        <van-button round type="info" size="normal" @click="register">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sms: null,
      username: null,
      password: null,
      phone: null,
      code: null,
      codes: null
    };
  },
  props: {},
  components: {},
  methods: {
    getVerify() {
      this.$api
        .getVerify()
        .then(res => {
          this.codes = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    refreshCode() {
      this.getVerify();
    },
    login() {
      if (this.username !== null) {
        if (this.password !== null) {
          if (this.code !== null) {
            this.loginItem();
          } else {
            this.$notify({ type: "warning", message: "请输入验证码!" });
          }
        } else {
          this.$notify({ type: "warning", message: "请输入密码!" });
        }
      } else {
        this.$notify({ type: "warning", message: "请输入用户名!" });
      }
    },
    register() {
      if (this.username !== null) {
        if (this.password !== null) {
          if (this.code !== null) {
            this.registerUser();
          } else {
            this.$notify({ type: "warning", message: "请输入验证码!" });
          }
        } else {
          this.$notify({ type: "warning", message: "请输入密码!" });
        }
      } else {
        this.$notify({ type: "warning", message: "请输入用户名!" });
      }
    },
    registerUser() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(res => {
          if (res.code === -2) {
            this.$notify({ type: "warning", message: "验证码错误!" });
          } else if (res.code === -1) {
            this.$notify({ type: "warning", message: "用户已存在,请登录!" });
          } else {
            localStorage.setItem("userInfo", res.userInfo);
            localStorage.setItem("user", [1, 2]);
            this.$store.state.user.push(res.userInfo);
            this.$notify({ type: "success", message: "注册成功!" });
            this.$router.push("/");
          }
        })
        .catch(err => {});
    },
    loginItem() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(res => {
          if (res.code === -2) {
            this.$notify({ type: "warning", message: "验证码错误!" });
          } else if (res.code === -1) {
            this.$notify({ type: "warning", message: "用户名或密码错误!" });
          } else {
            localStorage.setItem("userInfo", res.userInfo);
            localStorage.setItem("user", [1, 2]);
            this.$store.state.user.push(res.userInfo);
            this.$notify({ type: "success", message: "登录成功!" });
            this.$router.push("/");
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getVerify();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/login.jpg") no-repeat;
  background-size: cover;
  height: 100vh;
}
.container {
  height: 50vh;
  width: 91vw;
  // background-color: rgba(0, 0, 0, 0.5);
  background: white;
}
.codes {
  padding: 10px 16px;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #323233;
}
.codes > div:first-child {
  width: 24vw;
}
.codes > div:nth-child(2) {
  flex: 1;
  input {
    border: none;
    outline: none;
    width: 129px;
  }
}
.codes > div:last-child {
  /deep/ svg {
    width: 78px;
    height: 30px;
  }
}

// /deep/ .van-cell{
// //  background-color: rgba(0,0,0,.5);

// }
.container > div:first-child {
  background: white;
  padding: 10px;
}
.van-button {
  width: 100px;
}
.sub {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  background: white;
}
</style>