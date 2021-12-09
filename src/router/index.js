import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'Home',
      component: []
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登陆'
      },
      component: () => import(/* webpackChunkName: "login" */ )
    }
  ]
})
