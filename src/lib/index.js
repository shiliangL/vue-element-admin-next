/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2021-08-03 16:34:35
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/requestAdmin'
import BMapUtils from '@/utils/BMapUtils'

export default Vue => {
  // 事件中心
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$BMapUtils = BMapUtils
}
