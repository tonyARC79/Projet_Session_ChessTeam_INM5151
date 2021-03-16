import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'session',
        component: () =>
            import('@/components/Login'),
        meta: {
            title: 'Session',
        }
    },
    {
        path: '*',
        name: 'redirect',
        component: () =>
            import('@/components/Login')
    },
    {
        path: '/join',
        name: 'join',
        component: () =>
            import('@/components/Register'),
        meta: {
            title: 'Join',
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

