/*
 * @Author: shiliangL
 * @Date: 2021-08-02 11:00:27
 * @LastEditTime: 2021-08-03 20:49:13
 * @LastEditors: Do not edit
 * @Description: 百度地图常用工具类
 */

export default class BMapUtils {
  constructor(options) {
    this.bdMap = BMapUtils.initBdMap(options)
    if (options.centerName) {
      this.fetchBoundary(options.centerName)
    }
  }

  static initBdMap(option) {
    const { BMap } = window
    const options = Object.assign({}, options)
    const bdMap = new BMap.Map(options.container, {
      enableMapClick: false,
      minZoom: 12
    })
    bdMap.centerAndZoom('深圳市宝安区', 12)
    return bdMap
  }

  fetchBoundary(centerName) {
    let paths = []
    const { BMap } = window
    const bd = new BMap.Boundary()
    bd.get(centerName, data => {
      paths = data.boundaries.map(boundary => (boundary || []).split(';').map(point => (([lng, lat]) => ({ lng, lat }))(point.split(',').map(p => +p))))
      const points = []
      paths.forEach(item => {
        item.forEach(p => {
          points.push(new BMap.Point(p.lng, p.lat))
        })
      })
      this.drawBoundaryPolygon(paths)
    })
  }

  drawBoundaryPolygon(result = []) {
    result.map(item => {
      const polygon = item.map((item) => new BMap.Point(item.lng, item.lat))
      const polygons = new BMap.Polygon(polygon, {
        enableMassClear: false,
        strokeColor: '#000',
        fillColor: '',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillOpacity: 0,
        strokeStyle: 'solid'
      })
      this.bdMap && this.bdMap.addOverlay(polygons)
    })
    // this.map && this.map.setViewport(pointView)
  }
}
