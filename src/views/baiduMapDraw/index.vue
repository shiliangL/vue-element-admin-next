<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-03 15:40:25
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div
      id="map"
      ref="map"
    />
  </div>
</template>

<script>

import * as mapv from 'mapv'
const iconMapCar = require('@/assets/iconOnMap/che.png')

export default {
  name: 'BaiduMapGl',
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        this.mapInit()
      }, 0)
    })
    console.log(window)
  },
  methods: {
    mapInit() {
      // eslint-disable-next-line no-undef
      this.map = new BMap.Map('map', {
        enableMapClick: false,
        minZoom: 13
      })
      // eslint-disable-next-line no-undef
      this.map.enableScrollWheelZoom()
      this.map.centerAndZoom(new BMap.Point(113.983201, 22.638147), 12) // 初始化地图,设置中心点坐标和地图级别
      this.fetchMapSectionData()
      this.fetchMapLineData()
      this.fetchMapPointData()
    },
    async fetchMapLineData() {
      const result = await this.$http({ url: '/mockData/map-line.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1, 'dataType': 0, 'workStatus': 0 }})
      // this.darwBDLine(result)
      this.darwMapvLine(result.lineList || [])
    },
    async fetchMapSectionData() {
      const result = await this.$http({ url: '/mockData/map-polygon.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1 }})
      // this.darwBDPolygon(result)
      this.darwMapvPolygon(result)
    },
    async fetchMapPointData() {
      const result = await this.$http({ url: '/mockData/map-point.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1 }})
      // this.darwBDPolygon(result)
      this.darwMapvPoint(result.list || [], iconMapCar)
    },
    darwBDLine(result = []) {
      for (const item of result || []) {
        const linePoints = item.linePoints[0].map(kk => new BMap.Point(kk.lng, kk.lat))
        const polyline = new BMap.Polyline(linePoints, {
          strokeColor: 'RGB(0, 111, 255,0.78)',
          strokeWeight: 2
        })
        polyline.addEventListener('mouseover', function() {
          this.setStrokeWeight(3)
        })
        polyline.addEventListener('mouseout', function() {
          this.setStrokeWeight(2)
        })
        this.map.addOverlay(polyline)
      }
    },
    getBmapPoint(result = [], lng = 'lng', lat = 'lat') {
      return result.map(kk => new BMap.Point(kk[lng], kk[lat])) || []
    },
    darwBDPolygon(result = []) {
      const pointView = []
      result.map(item => {
        item.scopePoints = item.scopePoints ? item.scopePoints : []
        item.scopePoints.map(v1 => {
          const polygon = []
          v1.map(v2 => {
            pointView.push(new BMap.Point(v2.lng, v2.lat))
            polygon.push(new BMap.Point(v2.lng, v2.lat))
          })
          const polygons = new BMap.Polygon(polygon, {
            enableMassClear: false,
            strokeColor: '#197554',
            fillColor: '#B7DFD6',
            strokeWeight: 1,
            strokeOpacity: 1,
            fillOpacity: 0.33,
            strokeStyle: 'solid'
          })
          this.map && this.map.addOverlay(polygons)
        })
      })
      this.map && this.map.setViewport(pointView)
    },
    // mapv绘制面
    darwMapvPolygon(result = []) {
      const mapvDataSet = []
      for (const item of result || []) {
        item.scopePoints = item.scopePoints ? item.scopePoints : []
        item.scopePoints.map(v1 => {
          const polygon = []
          v1.map(v2 => {
            polygon.push([v2.lng, v2.lat])
          })
          mapvDataSet.push({
            geometry: {
              type: 'Polygon',
              coordinates: [polygon]
            }
          })
        })
      }
      const dataSet = new mapv.DataSet(mapvDataSet)
      const options = {
        draw: 'simple',
        zIndex: 1, // 层级
        lineWidth: 1, // 描边宽度
        fillStyle: 'RGB(212, 230, 225,0.33)', // 填充颜色
        strokeStyle: 'RGB(55, 116, 80,0.88)', // 描边颜色
        methods: {
          click: (itemData) => {
            if (itemData) {
              console.log(itemData, 'itemData')
            }
          }
        }
      }
      // eslint-disable-next-line new-cap
      this.mapvLayerPolygon = new mapv.baiduMapLayer(this.map, dataSet, options)
    },
    // mapv绘制线
    darwMapvLine(result = []) {
      const mapvDataSet = []
      for (const item of result || []) {
        item.linePoints = item.linePoints ? item.linePoints : []
        if (item.linePoints.length) {
          const linePoints = item.linePoints[0].map(kk => [kk.lng, kk.lat])
          mapvDataSet.push({
            ...item,
            geometry: {
              type: 'LineString',
              coordinates: linePoints
            }
          })
        }
      }
      const dataSet = new mapv.DataSet(mapvDataSet)

      // eslint-disable-next-line no-unused-vars
      const moveLineOptions = {
        draw: 'simple',
        zIndex: 3,
        lineWidth: 4,
        strokeStyle: '#00FF99',
        methods: {
          click: (item) => {
            if (item) {
              console.log(item)
            }
          },
          mousemove: (item) => {
            if (item) {
              this.moveLineOverlay && this.moveLineOverlay.hide()
            }
          }
        }
      }

      const options = {
        draw: 'simple',
        zIndex: 2,
        strokeStyle: 'RGB(0, 111, 255,0.78)',
        lineWidth: 2,
        methods: {
          mousemove: (item) => {
            if (item) {
              const lineDataSet = new mapv.DataSet(item)
              if (!this.moveLineOverlay) {
              // eslint-disable-next-line new-cap
                this.moveLineOverlay = new mapv.baiduMapLayer(this.map, lineDataSet, moveLineOptions)
                this.moveLineOverlay.workLineId = item.workLineId
              } else if (this.moveLineOverlay && this.moveLineOverlay.workLineId !== item.workLineId) {
                this.moveLineOverlay && this.moveLineOverlay.hide()
                // eslint-disable-next-line new-cap
                this.moveLineOverlay = new mapv.baiduMapLayer(this.map, lineDataSet, moveLineOptions)
                this.moveLineOverlay.workLineId = item.workLineId
              } else {
                this.moveLineOverlay && this.moveLineOverlay.show()
              }
            }
          }
        }
      }
      // eslint-disable-next-line new-cap
      this.mapvLayerLine = new mapv.baiduMapLayer(this.map, dataSet, options)
    },
    // mapv绘制点
    darwMapvPoint(result = [], icon) {
      const data = []
      for (const item of result) {
        if (item.geoX && item.geoY) {
          data.push({
            ...item, geometry: { type: 'Point', coordinates: [item.geoX, item.geoY] }, icon: icon, text: item.personName,
            iconOptions: {
              url: [icon],
              size: 30,
              width: 30
            }
          })
        }
      }
      const dataSet = new mapv.DataSet(data)

      const textOptions = {
        draw: 'text',
        avoid: true,
        size: 14,
        font: '14px Arial',
        fillStyle: '#006FFF',
        offset: {
          x: 0,
          y: -24
        }
      }

      const options = {
      // draw: 'icon',
        draw: 'cluster',
        size: 30,
        width: 30,
        height: 30,
        zIndex: 4,
        methods: {
          click: (point) => {
            if (point) {
              if (point.iconOptions) {
                console.log(point.iconOptions.url)
              }
              // 通过children可以拿到被聚合的所有点
              console.log(point.children)
            }
          }
        },
        minSize: 8, // 聚合点最小半径
        maxSize: 31, // 聚合点最大半径
        clusterRadius: 150, // 聚合像素半径
        maxClusterZoom: 18, // 最大聚合的级别
        maxZoom: 19, // 最大显示级别
        minPoints: 5, // 最少聚合点数，点数多于此值才会被聚合
        extent: 400, // 聚合的细腻程度，越高聚合后点越密集
        label: { // 聚合文本样式
          show: true,
          fillStyle: 'white',
          shadowColor: 'yellow'
        }
      // gradient: { 0: 'blue', 0.5: 'yellow', 1.0: 'rgb(255,0,0)' } // 聚合图标渐变色
      }
      // eslint-disable-next-line new-cap
      const mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options)
      // eslint-disable-next-line new-cap
      const mapvLayerText = new mapv.baiduMapLayer(this.map, dataSet, textOptions)
      mapvLayerText.hide()
      return { mapvLayer, mapvLayerText }
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map {
  position: relative;
  #map {
    height: 100%;
    widows: 100%;
  }
}
</style>
