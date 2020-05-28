// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入全局样式
import './assets/css/reset-min.css'
import './assets/css/bootstrap.css'
import './assets/css/drag.css'
import './assets/css/login.css'
import './assets/css/main_header.css'
import './assets/css/zTreeStyle.css'
import './assets/css/myModal.css'
import './assets/css/normal.css'
// import './assets/css/element-ui.css'
// import './../plugins/awesomeStyle/awesome.css'

import './assets/js/bootstrap.min.js'
import './assets/js/drag.js'
import './assets/js/login.js'
import './assets/js/register.js'
import './assets/js/main.js'

// import './assets/js/element-ui.js'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import $ from 'jquery'
import Mint from 'mint-ui';
import PubSub from 'pubsub-js'
import { Toast } from 'mint-ui';
import VueSessionStorage from 'vue-sessionstorage';
import store from './store';
import VueCookies from 'vue-cookies'
// import Element from 'element-ui';


Vue.use(VueSessionStorage)
Vue.use(Vuex)
Vue.use(Mint);
Vue.component(Toast)
Vue.config.productionTip = false
Vue.use(VueCookies);

//配置请求根路径
// axois.defaults.baseURL = 'http:/localhost:8081/warehouse/';
// Vue.prototype.$http = axios;

// http request 拦截器
axios.interceptors.request.use(
  //在请求之前做点什么 比如加入token
  config => {
    // config.headers.Authorization = 'Bearer ' +
    const str = config.url;
    if(str !== 'api/login' && str !== 'api/register' && str !== 'api/validateCode'){
      //设置请求头
      // config.headers['Authorization'] = 'Bearer ' + window.$cookies.get('token');
      config.headers['Authorization'] = window.$cookies.get('token');
    }
    //在最后必须返回config
    return config;
  },
  err => {
    return Promise.reject(err);
  });

/* eslint-disable no-new */
// Vue.use(Element);
Vue.use(Element, { size: 'small' });
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
