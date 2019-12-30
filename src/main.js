// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Mint from 'mint-ui';
import PubSub from 'pubsub-js'
import { Toast } from 'mint-ui';

Vue.use(Mint);
Vue.component(Toast)

Vue.config.productionTip = false

// 引入全局样式
import './assets/css/reset-min.css'
import './assets/css/bootstrap.css'
import './assets/css/drag.css'
import './assets/css/login.css'
import './assets/css/main_header.css'

import './assets/js/bootstrap.min.js'
import './assets/js/drag.js'
import './assets/js/login.js'
import './assets/js/register.js'
import './assets/js/main.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
