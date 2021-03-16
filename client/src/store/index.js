import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/apiService/'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
    join() {
      axios({
        method: 'post', url: 'join', data: qs.stringify({
          email: "antoine1.plante@uqam.ca",
          password: "gr007,,",
          username: "testtest123",
          age: "18"
        }),
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          if(error.response.status === 409) {
            alert("Même courriel")
          }
        });
    }
  },
  modules: {}
})

