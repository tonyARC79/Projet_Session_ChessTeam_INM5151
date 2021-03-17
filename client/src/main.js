import Vue from 'vue'
import App from './App.vue'
import axios from './utils/apiService/'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/friend.css';



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

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

