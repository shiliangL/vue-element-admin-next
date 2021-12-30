/*
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2021-12-30 10:20:21
 * @LastEditors: Do not edit
 * @Description:
 */
import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import './styles/index.scss' // global css
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'

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

if (process.env.NODE_ENV === 'dev') {
  const { mockXHR } = require('mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small'
})

Vue.config.productionTip = false

Vue.prototype.$openLayer = openLayer({ router, store })

// 设置一些全局变量
// 设置后台服务器不熟路径
window.VUE_APP_BASE_API = 'http://localhost:4632/'
window.VUE_APP_BASE_API_PREFIX = 'REST/System/TenantBase/SMARTCITY/V1.0/APPSERVICE/EntityService/Data/AICIMTESTSERVICE/Telecom'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
