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
    //login
    login({ nickname, password, verify }) {
        return service.req('/login', {
            nickname,
            password,
            verify
        })
    },
    //购物车
    getCar() {
        return service.req("/getCard", {})
    },
    //获取分类商品列表`/classification?mallSubId=${id}`
    getClassification({ mallSubId }) {
        return service.req(`/classification?mallSubId=${mallSubId}`)
    },
    // getClassification({ mallSubId }) {
    //     console.log(mallSubId);
    //     return service.req("/classification", {
    //         mallSubId
    //     })
    // },
    //商品详情
    goodOne(id, page = 1) {
        return service.req(`/goods/one?id=${id}&page=${page}`)
    },
    //搜索
    search(value, page = 1) {
        return service.req('/search', {
            value,
            page
        })
    },
    //用户相关接口
    user() {
        return service.req(`/queryUser`)
    },

    saveUser({...args }) {
        console.log(args);
        return service.req(`/saveUser`, args)
    },

    getOrderNum() {
        return service.req(`/myOrder/orderNum`)
    },

    comment({...args }) {
        return service.req(`/goodsOne/comment`, args)
    },

}