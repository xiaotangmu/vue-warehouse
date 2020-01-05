import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import MainBox from '@/components/MainBox'
import Register from '@/components/Register'
import PersonCenter from '@/components/views/PersonCenter/PersonCenter'
import BasicInfo from '@/components/views/PersonCenter/BasicInfo'
import PasswordChange from '@/components/views/PersonCenter/PasswordChange'
import PhotoChange from '@/components/views/PersonCenter/PhotoChange'
import Catalog from '@/components/views/Product/Catalog'
import Spu from '@/components/views/Product/Spu'
import SpuAdd from '@/components/views/Product/SpuAdd'
import SpuEdit from '@/components/views/Product/SpuEdit'
import BaseAttr from '@/components/views/Product/BaseAttr'

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
              component: PersonCenter,
              children: [
                {
                  path: '/index/mainBox/personCenter/basicInfo',
                  component: BasicInfo
                },
                {
                  path: '/index/mainBox/personCenter/passwordChange',
                  component: PasswordChange
                },
                {
                  path: '/index/mainBox/personCenter/photoChange',
                  component: PhotoChange
                },
                {
                  path: '',
                  redirect: '/index/mainBox/personCenter/basicInfo'
                }
              ]
            },
            {
              path: '/index/mainBox/catalog',
              component: Catalog
            },
            {
              path: '/index/mainBox/spu',
              component: Spu,
              children: [
                {
                  path: '/index/mainBox/spu/spuAdd',
                  component: SpuAdd
                },
                {
                  path: '/index/mainBox/spu/spuEdit',
                  component: SpuEdit
                }
              ]
            },
            {
              path: '/index/mainBox/baseAttr',
              component: BaseAttr
            },
            {
              path: '',
              redirect: '/index/mainBox/baseAttr'
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
