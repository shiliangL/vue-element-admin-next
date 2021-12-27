/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-12-27 10:05:39
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/requestAdmin'

export default Vue => {
  // 事件中心
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
}
