/*
 * @Author: shiliangL
 * @Date: 2021-12-27 12:11:08
 * @LastEditTime: 2021-12-27 17:52:46
 * @LastEditors: Do not edit
 * @Description:
 */
import CubeTable from './cube-table'
import CubeTableList from './cube-table-list'
import CubeSearchBar from './cube-search-bar'
import CubeMaxHeight from './cube-max-height'

const list = [CubeTable, CubeTableList, CubeSearchBar, CubeMaxHeight]

export default {
  install(Vue) {
    list.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
