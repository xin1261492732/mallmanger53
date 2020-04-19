import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Users from '../components/users/users'
import Right from '../components/rights/right'
import Role from '../components/rights/role'
import Goodslist from '../components/goods/goodslist'
import Goodsadd from '../components/goods/goodsadd'
import Cateparams from '../components/goods/cateparams'
import Goodscate from '../components/goods/goodscate'
import Order from '../components/order/order'
import Report from '../components/report/report'

import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        {
          name: 'roles',
          path: '/roles',
          component: Role
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goodslist
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: Goodsadd
        },
        {
          name: 'params',
          path: '/params',
          component: Cateparams
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscate
        },
        {
          name: 'orders',
          path: '/orders',
          component: Order
        },
        {
          name: 'reports',
          path: '/reports',
          component: Report
        }
      ]
    }
  ]
})

// 在路由配置生效之前 统一判断token
// 路由守卫 在路由配置生效之前
// 路由/导航守卫
// to是要去的路由配置
// from 当前的路由配置
router.beforeEach((to, from, next) => {
  // 如果要去的是登录
  // 如果要去的不是登录
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      // 判断token
      //  如果有token没有 - login
      Message.warning('请先登录')
      router.push({name: 'login'})
      return
    }
    // 如果有 - next()
    next()
  }
})

export default router
