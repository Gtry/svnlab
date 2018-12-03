// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

// import './permission'

import '@/assets/styles/index.scss' // global css
import '@/assets/css/icons' // icon: sidebar
import i18n from '@/assets/lang' // Internationalization
import 'font-awesome/css/font-awesome.min.css'
import '../static/css/iconfont/1.0.0/index.css' // icofont

Vue.use(Element, {
  // set element-ui default size
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
