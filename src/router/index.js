import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
