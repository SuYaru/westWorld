import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path     : '/',
      name     : 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about/About.vue')
    },
    {
      path     : '/users',
      name     : 'users',
      component: () => import('./views/user/Users.vue')
    },
    {
      path     : '/news',
      name     : 'news',
      component: () => import('./views/news/News.vue')
    },
    {
      path     : '/cate',
      name     : 'cate',
      component:()=>import('./views/cate/Cates')
    },
    {
      path     : '/order',
      name     : 'order',
      component:()=>import('./views/order/order')
    },


  ]
})
