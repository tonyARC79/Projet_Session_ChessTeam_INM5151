import Vue from 'vue'
//import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/HelloWorld.vue'

Vue.config.productionTip = false
const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/': Home,
  '/login' : Login
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
