import Vue from 'vue'
import App from './App.vue'
import axios from './utils/apiService/'
import router from './router'
import store from './store'


Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')

