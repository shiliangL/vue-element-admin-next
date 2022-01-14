/*
 * @Author: shiliangL
 * @Date: 2021-08-02 17:31:44
 * @LastEditTime: 2022-01-14 14:40:32
 * @LastEditors: Do not edit
 * @Description:
 */

import 'viewerjs/dist/viewer.css'
import openLayer from '@/plugins/openLayer'
import request from '@/utils/request'
import dayjs from 'dayjs'
import Viewer from 'v-viewer'

export default Vue => {
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$request = request
  Vue.prototype.$http = request
  Vue.prototype.$dayjs = dayjs
  Vue.prototype.$openLayer = openLayer
  Vue.prototype.$RESPONSECONFIG = { data: 'Message', success: 'Success' }

  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999999
    }
  })
}
