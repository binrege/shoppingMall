import service from "./index"
import axios from "axios"

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
        return axios.post(`/goodsOne/comment`, args)
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
    getCard({}) {
        return service.req(`/getCard`, {})
    },

    editCart(count, id, mallPrice) {
        return service.req('/editCart', {
            count,
            id,
            mallPrice
        })
    },

    deleteShop(id) {
        return service.post('/deleteShop', id)
    },
    addShop(id) {
        return service.req(`/addShop`, { id })
    },
    postAddress({...args }) {
        return service.post(`/address`, args)
    },
    getAddress() {
        return service.req(`/getAddress`)
    },
    deleteAddress(id) {
        return service.req('/deleteAddress', {
            id
        })
    },
    getCollection(page = 1) {
        return service.get(`/collection/list`, {
            params: { page }
        })
    },
    /**
     * 购物车支付页面(ShoppingPayMent)所有接口
     * placeOrder 提交订单 参数：address:收货地址,tel:电话，orderId：所有商品的id，totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
     */
    placeOrder({...args }) {
        return service.post('/order', args)
    },
    getOrderNum() {
        return service.req(`/myOrder/orderNum`)
    },

    comment({...args }) {
        return service.req(`/goodsOne/comment`, args)
    },
    getMyOrder() {
        return service.req(`/myOrder`)
    },

    alreadyEvaluated(page = 1) {
        return service.get('/alreadyEvaluated', {
            params: { page }
        })
    },

    tobeEvaluated(page = 1) {
        return service.get('/tobeEvaluated', {
            params: { page }
        })
    },

    evaluateOne(_id) {
        return service.post('/evaluateOne', {
            _id
        })
    },
    loginOut({}) {
        return service.req(`/loginOut`, {})
    }


}