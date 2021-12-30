/*
 * @Author: shiliangL
 * @Date: 2021-12-27 12:11:08
 * @LastEditTime: 2021-12-30 11:02:36
 * @LastEditors: Do not edit
 * @Description:
 */
import CubeTable from './cube-table'
import CubeTableList from './cube-table-list'
import CubeSearchBar from './cube-search-bar'
import CubeMaxHeight from './cube-max-height'
import PlaceholderBock from './PlaceholderBock'

const list = [CubeTable, CubeTableList, CubeSearchBar, CubeMaxHeight, PlaceholderBock]

export default {
  install(Vue) {
    list.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
