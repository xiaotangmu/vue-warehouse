import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainBox from '@/components/MainBox'
import Register from '@/components/Register'
import PersonCenter from '@/components/views/PersonCenter/PersonCenter'
import BasicInfo from '@/components/views/PersonCenter/BasicInfo'
import PasswordChange from '@/components/views/PersonCenter/PasswordChange'
import PhotoChange from '@/components/views/PersonCenter/PhotoChange'
import Catalog from '@/components/views/Product/Catalog'
import Spu from '@/components/views/Product/Spu'
import Sku from '@/components/views/Product/Sku'
import BaseAttr from '@/components/views/Product/BaseAttr'
import Brand from '@/components/views/Brand/Brand'
import Supplier from '@/components/views/Supplier/Supplier'
import Client from '@/components/views/Client/Client'
import Warehouse from '@/components/views/Warehouse/Warehouse'
import Delivery from '@/components/views/Delivery/Delivery'
import Check from '@/components/views/Check/Check'
import Entry from '@/components/views/Report/GodownEntry'
import Out from '@/components/views/Report/OutboundOrder'
import Authority from '@/components/views/User/Authority'
import Role from '@/components/views/User/Role'
import Notification from '@/components/views/Notification/Notification'

import Shelf from '@/components/views/Shelf/Shelf'
import Scheduler from '@/components/views/Scheduler/Scheduler'
import Form from '@/components/views/Form/Form'
import Index from '@/components/views/Index/Index'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/mainBox',
      component: MainBox,
      children: [
      {
        path: '/mainBox/personCenter',
        component: PersonCenter,
        children: [
        {
          path: '/mainBox/personCenter/basicInfo',
          component: BasicInfo
        },
        {
          path: '/mainBox/personCenter/passwordChange',
          component: PasswordChange
        },

        {
          path: '/mainBox/personCenter/photoChange',
        component: PhotoChange
      },
      {
        path: '',
        redirect: '/mainBox/personCenter/basicInfo'
      }
          ]
        },
        {
          path: '/mainBox/catalog',
          component: Catalog
        },
        {
          path: '/mainBox/index',
          component: Index
        },
        {
          path: '/mainBox/form',
          component: Form
        },
        {
          path: '/mainBox/scheduler',
          component: Scheduler
        },
        {
          path: '/mainBox/notification',
          component: Notification
        },
        {
          path: '/mainBox/authority',
          component: Authority
        },
        {
          path: '/mainBox/role',
          component: Role
        },
        {
          path: '/mainBox/spu',
          component: Spu,
        },
        {
          path: '/mainBox/sku',
          component: Sku,
        },
        {
          path: '/mainBox/baseAttr',
          component: BaseAttr
        },
        {
          path: '/mainBox/brand',
          component: Brand
        },
        {
          path: '/mainBox/supplier',
          component: Supplier
        },
        {
          path: '/mainBox/client',
          component: Client
        },
        {
          path: '/mainBox/warehouse',
          component: Warehouse
        },
        {
          path: '/mainBox/check',
          component: Check
        },
        {
          path: '/mainBox/delivery',
          component: Delivery
        },
        {
          path: '/mainBox/entry',
          component: Entry
        },
        {
          path: '/mainBox/out',
          component: Out
        },
        {
          path: '/index/mainBox/shelf',
          component: Shelf
        },
        {
          path: '',
          redirect: '/mainBox/index'
        },
      ]
      },
      {
        path: '/',
        redirect: '/mainBox/check'
      }]
});

// 全局路由守卫
router.beforeEach((to,from,next) => {
// to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  //next() -- 放行   next('/login') -- 强制跳转

  console.log(to)
  if(to.path === '/login') return next();
  if(to.path === '/register') return next();

  //获取token
  // const tokenStr = window.sessionStorage.getItem('token');
  const tokenStr = window.$cookies.get('token');//在这里不用this.$cookies
  if(tokenStr === undefined || tokenStr === null || tokenStr === '') next('login');//不存在强制跳转
  next();
});

export default router;
