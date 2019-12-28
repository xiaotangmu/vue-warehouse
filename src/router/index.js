import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import MainBox from '@/components/MainBox'
import Register from '@/components/Register'
import PersonCenter from '@/components/views/PersonCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/index/login',
          component: Login
        },
        {
          path: '/index/register',
          component: Register
        },
        {
          path: '/index/mainBox',
          component: MainBox,
          children: [
            {
              path: '/index/mainBox/personCenter',
              component: PersonCenter
            },
            {
              path: '',
              redirect: '/index/mainBox/personCenter'
            }

          ]
        },
        {
          path: '',
          redirect: '/index/mainBox'
        }
      ]
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
