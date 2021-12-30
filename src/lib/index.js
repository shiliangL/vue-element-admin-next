/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-12-30 14:49:52
 * @LastEditors: Do not edit
 * @Description:
 */
import openLayer from '@/plugins/openLayer'
import request from '@/utils/request'

export default Vue => {
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$RESPONSECONFIG = { data: 'Message', success: 'Success' }
  Vue.prototype.$openLayer = openLayer
}
