import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/apiService/'

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
            console.log("erreur");
                axios.post('/join', {
                        "email": "gdsdf@outlook.com",
                        "password": "salutoi",
                        "username": "all",
                        "age": "18" 	
		})
        .then(function (response) {
          console.log(response);
	})
        .catch(function (error) {
          console.log(error);
	});
        }
    },
    modules: {}
})

