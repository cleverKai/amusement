import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRoute from './home/home'
import loginRoute from './login/login'
Vue.use(VueRouter)

const routes = [
  homeRoute,
  loginRoute
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
