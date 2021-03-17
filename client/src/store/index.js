import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/apiService/'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    games: null,
    rating: null,
    friends: null,
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    StateGames: state => state.games,
    StateRating: state => state.rating,
    StateFriends: state => state.friends,

  },
  mutations: {
    /* inutile pour l'instant c'est pour l'authentification (token) et 
     * présentement sert à enlever les erreurs
     */
    requete_auth(state) {
      state.status = 'chargement'
    },
    auth_succes(state) {
      state.status = 'succes'
    },

    auth_erreur(state) {
      state.status = 'erreur'
    },
  },
  actions: {
    join({ commit }, nouvelUtilisateur) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios.post('/join', qs.stringify(nouvelUtilisateur))
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_erreur', err)
            reject(err)
          })
      })
    },
    findFriends({ commit }, searchQuery) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios.get('/api/users?username=' + searchQuery,
          {
            headers:
              { "Authorization": 'Bearer ' + localStorage.getItem('token') }
          })
          .then(resp => {
            resolve(resp.data)
          })
          .catch(err => {
            commit('auth_erreur', err)
            reject(err)
          })
      })
    }
  },
  modules: {}
})

