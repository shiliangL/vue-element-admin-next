/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-12-27 17:12:05
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/requestAdmin'
import openLayer from '@/plugins/openLayer'

export default Vue => {
  // 事件中心
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$openLayer = openLayer
}
