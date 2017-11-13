import Vue from 'vue'

// import BootstrapVue from 'bootstrap-vue'
// import BootstrapMaterial from 'bootstrap-material-design';
// import 'bootstrap';
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// import autoUpdater from './updater.js'
// const appVersion = '0.0.3';



// Change config options
// eNotify.setConfig({
//     appIcon: path.join(assetsDirectory, 'icons/png/64x64.png'),
//     displayTime: 6000
// });



// eNotify.notify({ title: 'Notification title', text: 'Some text' });



// import Test from './redmine'
// const Test = require('./redmine')

// Test()
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
