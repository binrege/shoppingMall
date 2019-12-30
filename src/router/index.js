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
    }
]

const isPro = process.env.NODE_ENV === 'production'
const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router