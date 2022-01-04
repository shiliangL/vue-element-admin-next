/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2022-01-04 13:58:53
 * @LastEditors: Do not edit
 * @Description:
 */
import openLayer from '@/plugins/openLayer'
import request from '@/utils/request'
import dayjs from 'dayjs'

export default Vue => {
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$dayjs = dayjs
  Vue.prototype.$RESPONSECONFIG = { data: 'Message', success: 'Success' }
  Vue.prototype.$openLayer = openLayer
}
