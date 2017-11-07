import Vue from 'vue'

// import BootstrapVue from 'bootstrap-vue'
// import BootstrapMaterial from 'bootstrap-material-design';
// import 'bootstrap';
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import Test from './redmine'


Test()
if (!process.env.IS_WEB)
  Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
//
