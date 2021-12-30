/*
 * @Author: shiliangL
 * @Date: 2021-11-22 13:46:35
 * @LastEditTime: 2021-12-29 09:25:14
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/request'

export function login2(data) {
  return request({
    url: 'Auth/login',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: 'Auth/userinfo',
    method: 'get',
    params: { token }
  })
}

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'Auth/loginout',
    method: 'post'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
