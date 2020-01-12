import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: "/home",
        redirect: '/'
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: '',
            name: 'index',
            component: () =>
                import ('../views/Index.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'category',
            name: 'category',
            component: () =>
                import ('../views/Category.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'shoppingCar',
            name: 'shoppingCar',
            component: () =>
                import ('../views/ShoppingCar.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'my',
            name: 'my',
            component: () =>
                import ('../views/Profile.vue')
        }]
    },
    {
        path: '/city',
        name: 'city',
        component: () =>
            import ('../views/City.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/details',
        name: 'details',
        component: () =>
            import ('../views/Details.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () =>
            import ('../views/Order.vue')
    },
    {
        path: '/collection',
        name: 'collection',
        component: () =>
            import ('../views/Collection.vue')
    },
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/Address.vue')
    },
    {
        path: '/browse',
        name: 'browse',
        component: () =>
            import ('../views/Browse.vue')
    },
    {
        path: '/shoppingPayMent',
        name: 'shoppingPayMent',
        component: () =>
            import ('../views/ShoppingPayMent.vue')
    },
    {
        path: '/addressEdit',
        name: 'addressEdit',
        component: () =>
            import ('../views/AddressEdit.vue')
    },
    {
        path: '/evaluate',
        name: 'evaluate',
        component: () =>
            import ('../views/Evaluate.vue')
    },
]

const isPro = process.env.NODE_ENV === 'production'
const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router