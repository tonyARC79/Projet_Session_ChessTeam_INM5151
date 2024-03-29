import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FindFriends from '@/components/Friend/FriendSearch'
import Friends from '@/components/Friend/Friends'
import FriendRequest from '@/components/Friend/FriendRequest'
import Home from '@/components/Home'
import Profil from '@/components/Profil'
import Play from '@/components/Play'
import Tutorial from '@/components/Tutorial/Tutorial.vue'
import GameRoom from '@/components/GameRoom'
import Full from '@/components/Full'
import Move from '@/components/Tutorial/Move.vue'
import Rules from '@/components/Tutorial/Rules.vue'
import CheckMate from '@/components/Tutorial/CheckMate.vue'
import Settings from '@/components/Settings.vue'
import GameRequests from '@/components/GameRequests'
import IaGameRoom from '@/components/IaRoom'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'Accueil',
        component: Home,
        meta: {
            title: 'Accueil',
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
        props: true,
        meta: {
            title: 'Inscription',
        }
    },
    {
        path: '/user/me',
        name: 'viewProfile',
        component: Profil,
        meta: {
            title: 'Profile',
            requiresAuth: true
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            title: 'Paramètres',
            requiresAuth: true
        }
    },
    {
        path: '/play/full',
        name: 'roomFull',
        component: Full,
        meta: {
            title: 'Complet',
            requiresAuth: true
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
        path: '/friends',
        name: 'friends',
        component: Friends,
        meta: {
            title: 'Amis',
            requiresAuth: true
        }
    },
    {
        path: '/friends/requests',
        name: 'friend request',
        component: FriendRequest,
        meta: {
            title: 'Requête d\'ami',
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
        },
    },
    {
        path: '/play/GameRoom',
        name: 'GameRoom',
        component: GameRoom,
        meta: {
            title: 'GameBoard_2v2',
            requiresAuth: true
        },
    },
    {
        path: '/tutorial',
        name: 'Tutorial',
        component: Tutorial,
        meta: {
            title: 'Tutorial',
        }
    },
    {
        path: '/move',
        name: 'Move',
        component: Move,
        meta: {
            title: 'BougerPiece',
        }
    },
    {
        path: '/rules',
        name: 'rules',
        component: Rules,
        meta: {
            title: 'regle',
        }
    },
    {
        path: '/checkMate',
        name: 'chekMate',
        component: CheckMate,
        meta: {
            title: 'EchecEtMat',
        }
    },
    {
        path: '/game_requests',
        name: 'game_requests',
        component: GameRequests,
        meta: {
            title: 'game_requests',
        }
    },
    {
        path: '/play/iaroom',
        name: 'IaGameRoom',
        component: IaGameRoom,
        meta: {
            title: 'ia',
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

