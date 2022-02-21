import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import User from '../components/User.vue'
import LoginPage from '../components/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/profile',
    name: 'LoginPage',
    component: User
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
