/*
 * @Author: shiliangL
 * @Date: 2021-08-02 11:00:27
 * @LastEditTime: 2021-08-03 22:09:17
 * @LastEditors: Do not edit
 * @Description: 百度地图常用工具类
 */

export default class BMapClass {
  constructor(options) {
    this.baiduMap = BMapClass.initBaiduMap(options)
    if (options.centerName) {
      this.getBoundaryPoint(options.centerName)
    }
  }

  static initBaiduMap(option) {
    const { BMap } = window
    const options = Object.assign({}, option)
    const baiduMap = new BMap.Map(options.container, {
      enableMapClick: false,
      minZoom: 12
    })
    baiduMap.centerAndZoom(options.centerName, 12)
    return baiduMap
  }

  async getBoundaryPoint(centerName) {
    this.boundaryPoint = await this.fetchBoundary(centerName)
    this.drawBoundaryPolygon(this.boundaryPoint || [])
  }

  fetchBoundary(centerName) {
    let paths = []
    const { BMap } = window
    const bd = new BMap.Boundary()
    return new Promise((resolve, reject) => {
      bd.get(centerName, data => {
        paths = data.boundaries.map(boundary => (boundary || []).split(';').map(point => (([lng, lat]) => ({ lng, lat }))(point.split(',').map(p => +p))))
        const points = []
        paths.forEach(item => {
          item.forEach(p => {
            points.push(new BMap.Point(p.lng, p.lat))
          })
        })
        // this.drawBoundaryPolygon(paths)
        resolve(paths)
        // return paths
      })
    })
  }

  drawBoundaryPolygon(result = []) {
    const pointView = []
    result.map(item => {
      const polygon = []
      item.forEach((item) => {
        polygon.push(new BMap.Point(item.lng, item.lat))
        pointView.push(new BMap.Point(item.lng, item.lat))
      })
      const polygons = new BMap.Polygon(polygon, {
        enableMassClear: false,
        strokeColor: '#000',
        fillColor: '',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillOpacity: 0,
        strokeStyle: 'solid'
      })
      this.baiduMap && this.baiduMap.addOverlay(polygons)
    })
    this.baiduMap && this.baiduMap.setViewport(pointView)
  }

  setViewport(viewPoint) {
    return this.baiduMap && this.baiduMap.setViewport(viewPoint)
  }

  darwMapLine(result, clickRow) {
    for (const item of result || []) {
      const linePoints = item.linePoints[0].map(kk => new BMap.Point(kk.lng, kk.lat))
      const polyline = new BMap.Polyline(linePoints, {
        strokeColor: 'RGB(0, 111, 255,0.88)',
        strokeWeight: 2
      })
      polyline.addEventListener('mouseover', function() {
        this.setStrokeWeight(3)
      })
      polyline.addEventListener('mouseout', function() {
        this.setStrokeWeight(2)
      })
      polyline.addEventListener('click', function() {
        clickRow(item)
      })
      this.baiduMap.addOverlay(polyline)
    }
  }
}
