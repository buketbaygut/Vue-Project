import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import User from '../components/User.vue'
import LoginPage from '../components/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: User
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = new VueRouter({
  routes
})

export default router
