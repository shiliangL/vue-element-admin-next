/*
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2022-01-07 15:50:32
 * @LastEditors: Do not edit
 * @Description:
 */
import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import './styles/index.scss' // global css
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import qs from 'qs'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import openLayer from '@/plugins/openLayer'

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 使用插件、组件
import lib from './lib/index'
import components from './components/export'

Vue.use(lib)
Vue.use(components)

// if (process.env.NODE_ENV === 'dev') {
//   const { mockXHR } = require('mock')
//   mockXHR()
// }
Vue.use(Element, {
  size: Cookies.get('size') || 'small'
})

Vue.config.productionTip = false

Vue.prototype.$qs = qs
Vue.prototype.$openLayer = openLayer({ router, store })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
