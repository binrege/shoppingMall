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
    user({}) {
        return service.req(`/queryUser`, {})
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
    //收藏商品
    collection(goods) {
        return service.req('/collection', goods)
    },
    //取消收藏
    cancelCollection(id) {
        return service.req('/cancelCollection', { id })
    },
    //判断是否收藏
    isCollection(id) {
        return service.req(`/isCollection`, { id })
    },

    addShop(id) {
        return service.req(`/addShop`, { id })
    },
    //搜索商品
    search(value, page = 1) {
        return service.req('/search', {
            value,
            page
        })
    },
    /**
     * 购物车(ShoppingCart)所有接口
     * getCard      查询获取购物车数据
     * editCart     购物车加减商品      参数 ： 数量  商品id 价格
     * deleteShop   购物车商品删除      参数 id：需要删除的商品cid
     */
    getCard() {
        return service.req(`/getCard`)
    },

    editCart(count, id, mallPrice) {
        return service.req('/editCart', {
            count,
            id,
            mallPrice
        })
    },

    deleteShop(id) {
        return service.req('/deleteShop', id)
    },

}