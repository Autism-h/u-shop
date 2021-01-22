import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const indexUrl = [
  {
    path:'/menu',
    component:() => import ('../views/menu/menu'),
    name:'菜单管理'
  },
  {
    path:'/role',
    component:() => import ('../views/role/role'),
    name:'角色管理'
  },
  {
    path:'/goods',
    component:() => import ('../views/goods/goods'),
    name:'商品管理'
  },
  {
    path:'/cate',
    component:() => import ('../views/cate/cate'),
    name:'商品分类'
  },
  {
    path:'/specs',
    component:() => import ('../views/specs/specs'),
    name:'商品规格'
  },
  {
    path:'/user',
    component:() => import ('../views/user/user'),
    name:'管理员管理'
  },
  {
    path:'/banner',
    component:() => import ('../views/banner/banner'),
    name:'轮播图管理'
  }
]


export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import ('../pages/login')
    },
    {
      path: '/index',
      component: () => import ('../pages/index'),
      children:[
        {
          path:'/home',
          component:() => import ('../views/home'),
          name:'首页'
        },
        ...indexUrl
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
