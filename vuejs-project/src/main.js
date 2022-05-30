import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueCookies from 'vue-cookies'
import './permission.js'
import excel from 'vue-excel-export'
 
Vue.config.productionTip = false

Vue.use(VueCookies);
Vue.use(excel);

// set default config
VueCookies.config('7d')


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
