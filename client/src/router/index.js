import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FindFriends from '@/components/Friend/FriendSearch'
import Home from '@/components/Home'
import Play from '@/components/Play'
Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/home',
        name: 'home',
        component: Home
    }, {
        path: '/',
        name: 'session',
        component: Login,
        meta: {
            title: 'Session',
        }
    },
    {
        path: '*',
        name: 'redirect',
        component: Login
    },
    {
        path: '/join',
        name: 'join',
        component: Register,
        meta: {
            title: 'Inscription',
        }
    },
    {
        path: '/friends/find',
        name: 'find friends',
        component: FindFriends,
        meta: {
            title: 'Find friends',
            requiresAuth: true
        }
    },
    {
        path: '/play',
        name: 'play',
        component: Play,
        meta: {
            title: 'play',
            requiresAuth: true
        }
    }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next()
            return
        }
        // TODO: rediriger vers la page de non authorisation
        next('/login')
    } else {
        next()
    }
})

export default router

