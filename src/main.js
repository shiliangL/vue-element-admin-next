/*
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2021-09-02 18:09:08
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import lib from '@/lib/index'

import * as filters from './filters' // global filters

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '1XjLLEhZhQNUzd93EjU5nOGQ'
})
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small'
})

Vue.use(lib)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
