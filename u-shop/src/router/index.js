import Vue from 'vue'
import Router from 'vue-router'

import Store from '../store'
console.log(Store);

function hasUrl(url) {
  return Store.getters.getUserInfo.menus_url.some(item => item == url)
}

Vue.use(Router)

export const indexUrl = [
  {
    path: '/menu',
    component: () => import('../views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('../views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('../views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('../views/cate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/user',
    component: () => import('../views/user/user'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/user') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('../views/member/member'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck'),
    name: '秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  }
]


const router = new Router({
  routes: [{
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [{
          path: '/home',
          component: () => import('../views/home'),
          name: '首页'
        },
        ...indexUrl,
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})


//全局导航守卫之登录拦截
router.beforeEach((to, from, next) => {
  //如果你去的是登录就 next
  if (to.path == '/login') {
    next()
    return
  }
  //如果你有登录状态就next
  if (Store.getters.getUserInfo) {
    next()
    return
  }
  //都没有就强制跳转回登录页
  next('/login')
})

export default router
