/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-08-03 21:03:18
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/requestAdmin'
import BMapClass from '@/utils/BMapClass'

export default Vue => {
  // 事件中心
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$BMapClass = BMapClass
}
