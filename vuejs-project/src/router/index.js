import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import WeddingSystem from '../components/WeddingSystem.vue'
import LoginPage from '../components/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/weddingSystem',
    name: 'WeddingSystem',
    component: WeddingSystem
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
