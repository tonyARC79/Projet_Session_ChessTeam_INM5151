import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/apiService/'
import jwt_decode from "jwt-decode";
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    username: state => jwt_decode(state.token).username,
    authStatus: state => state.status,
  },
  mutations: {
    /* inutile pour l'instant c'est pour l'authentification (token) et 
     * présentement sert à enlever les erreurs
     */
    requete_auth(state) {
      state.status = 'chargement'
    },
    auth_success(state, payload){
      state.status = 'success'
      state.token = payload.token
      state.username = payload.username
    },

    auth_erreur(state) {
      state.status = 'erreur'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.username = null
    },
  },
  actions: {
    join({ commit }, newUser) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios.post('/join', qs.stringify(newUser))
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
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios({ url: '/session', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const username = resp.data.username
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit({
              type: 'auth_success',
              token: token,
              username: username
            })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_erreur')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {}
})
