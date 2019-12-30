import service from "./index"
export default {
    // 获取首页数据
    getRecommend() {
        return service.req("/recommend")
    },
    // 获取验证码
    getVerify() {
        return service.req("/verify")
    },
    //注册
    register({ nickname, password, verify }) {
        return service.req("/register", {
            nickname,
            password,
            verify,
        })
    },
    //购物车
    getCar() {
        return service.req("/getCard", {})
    }
}