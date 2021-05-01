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
    birthdate: state => jwt_decode(state.token).birthdate,
    email: state => jwt_decode(state.token).email,
    authStatus: state => state.status,
  },
  mutations: {
    /* inutile pour l'instant c'est pour l'authentification (token) et 
     * présentement sert à enlever les erreurs
     */
    requete_auth(state) {
      state.status = 'chargement'
    },
    auth_success(state, payload) {
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
    loadProfile({ commit }, searchQuery) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        //console.log(localStorage.getItem('token'))
        axios.get('/api/profil?email=' + searchQuery,
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
        axios.post('/session', user)
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
    },
    validUsername({ commit }, searchQuery) {
      commit('requete_auth')
      return new Promise((resolve, reject) => {
        axios.get('/api/user/valid?username=' + searchQuery)
          .then(resp => {
            resolve(resp.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getFriends() {
      return new Promise((resolve, reject) => {
        axios.get('/api/me/friends', {
          headers:
            { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    sendFriendRequest(_, usernameQuery) {
      return new Promise((resolve, reject) => {
        axios.post('/api/friend/request', {
          username: usernameQuery
        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    sendFriendGameRequest(_, usernameQuery) {
      return new Promise((resolve, reject) => {
        axios.post('/api/friend/game', {
          opponent: usernameQuery
        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getGameRequests() {
      return new Promise((resolve, reject) => {
        axios.get('/api/me/game/requests',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    acceptGameRequest({ commit },gameInfo) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios.patch('api/me/game/accept',{
          game_id: gameInfo

        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getFriendsRequests() {
      return new Promise((resolve, reject) => {
        axios.get('/api/me/requests',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    accepterDemandeAmi(_, usernameQuery) {
      return new Promise((resolve, reject) => {
        axios.post('/api/friend', {
          username: usernameQuery
        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    changeUserInformation({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('requete_auth')
        axios.patch('/api/user', qs.stringify(info),
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
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
            reject(err)
          })
      })
    },

    deleteUserAccount({ commit }) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/user/delete',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(resp => {
            localStorage.removeItem('token')
            commit('auth_erreur', 'Le compte a été supprimé')

            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {}
})
