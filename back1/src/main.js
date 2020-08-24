// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import {httpGet} from './assets/js/http'


import axios from 'axios'
Vue.prototype.$httpGet=httpGet;
axios.defaults.baseURL='http://9.236.37.157:8085'

//发送服务器验证使用 
axios.defaults.withCredentials=true

//请求头添加token字段
axios.interceptors.request.use(config=>{
  console.log(config)

  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.axios = axios


Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
