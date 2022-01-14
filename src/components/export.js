/*
 * @Author: shiliangL
 * @Date: 2021-12-27 12:11:08
 * @LastEditTime: 2022-01-14 12:06:54
 * @LastEditors: Do not edit
 * @Description:
 */
import CubeTable from './cube-table'
import CubeTableList from './cube-table-list'
import CubeSearchBar from './cube-search-bar'
import CubeMaxHeight from './cube-max-height'
import PlaceholderBock from './PlaceholderBock'
import CubeUploadFile from './cube-upload-file'
import CubeXlsx2json from './cube-xlsx2json'

const list = [CubeTable, CubeTableList, CubeSearchBar, CubeMaxHeight, PlaceholderBock, CubeUploadFile, CubeXlsx2json]

export default {
  install(Vue) {
    list.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
