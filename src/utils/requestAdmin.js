/*
 * @Author: shiliangL
 * @Date: 2021-07-29 08:18:38
 * @LastEditTime: 2021-08-02 17:55:52
 * @LastEditors: Do not edit
 * @Description:
 */

import Cookies from 'js-cookie'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const token = Cookies.get('token')
const refreshToken = Cookies.get('refreshToken')

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    if (token) {
      config.headers.token = token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJ0b3BldmVyeSIsInBfbG9naW5fbmFtZSI6InhxYmsiLCJleHAiOjE2Mjc4ODQ0NTUsImlhdCI6MTYyNzg4MDg1NSwianRpIjoiRENCRjQyOTMtRTk4OS00Q0ZBLTkyMzctOEI4MDQwM0YxM0UzIn0.7PiiwUoWBIvyosAiDW_kmxqaxWTfgr70ytkcfa3ogGU'
      config.headers.refreshToken = refreshToken || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJ0b3BldmVyeSIsInBfbG9naW5fbmFtZSI6InhxYmsiLCJleHAiOjE2Mjg0NzgyODksImlhdCI6MTYyNzg3MzQ4OSwianRpIjoiRjYxNzRFQTAtRUY0NS00RjUxLTg3ODQtRjlDOTcyQzRDODE3In0.9bG33_OhgY_3VpMgJMq-m5L6R6QxbF_PVT7dN75u7qQ'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const { code, data, success, message } = res
    if (!success) {
      Message({ message: res.message || 'Error', type: 'error', duration: 5 * 1000 })
      if (code === 50008 || code === 50012 || code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(message || 'Error'))
    } else {
      return data || {}
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
