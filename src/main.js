import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import axios from 'axios'
import dayjs from 'dayjs'
import Vant from 'vant';
import 'vant/lib/index.css';
import BScroll from "better-scroll";
Vue.use(Vant);
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false


axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.response.use(
    response => {
        return response.data
    }, error => {
        return Promise.reject(error)
    })


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')