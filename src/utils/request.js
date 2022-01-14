/*
 * @Author: shiliangL
 * @Date: 2021-07-29 08:18:38
 * @LastEditTime: 2022-01-14 11:15:01
 * @LastEditors: Do not edit
 * @Description:
 */
import store from '@/store'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
const dev = process.env.NODE_ENV === 'development'
// eslint-disable-next-line no-unused-vars
const nonStandardApi = ['Auth/userinfo'] // 不规范的接口返回数据结构的接口直接return
// create an axios instance
const service = axios.create({
  baseURL: dev ? '' : process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 12000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
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
    const url = response.config.url
    // if the custom code is not 20000, it is judged as an error.
    if (!nonStandardApi.includes(url) && !res.Success) {
      const msg = (res.ErrorInfo && res.ErrorInfo.Message) ? res.ErrorInfo.Message : ''
      Message({ message: msg || 'Error', type: 'error', duration: 5 * 1000 })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('登录过期,请重新登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(msg || 'Error'))
    } else {
      return res
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
