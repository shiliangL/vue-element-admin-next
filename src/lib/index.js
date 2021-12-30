/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-12-29 19:26:28
 * @LastEditors: Do not edit
 * @Description:
 */
import openLayer from '@/plugins/openLayer'
import request from '@/utils/request'

export default Vue => {
  // 事件中心
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$RESPONSECONFIG = { data: 'Message', success: 'Success' }
  Vue.prototype.$openLayer = openLayer
}
