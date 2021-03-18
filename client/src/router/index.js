import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
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
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
        if (store.getters.estConnecte) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router

