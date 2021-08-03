<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-03 10:23:39
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
    },
    async fetchMapLineData() {
      const { lineList } = await this.$http({ url: 'http://hw-topevery-dev-ui:49210/mapIndex/getMapCarDisplayInfo', method: 'POST', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1, 'dataType': 0, 'workStatus': 0 }})
      // this.darwBDLine(lineList)
      this.darwMapvLine(lineList)
    },
    async fetchMapSectionData() {
      const result = await this.$http({ url: 'http://hw-topevery-dev-ui:49210/mapIndex/getMapSectionList', method: 'POST', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1 }})
      // this.darwBDPolygon(result)
      this.darwMapvPolygon(result)
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
        const linePoints = item.linePoints[0].map(kk => [kk.lng, kk.lat])
        mapvDataSet.push({
          ...item,
          geometry: {
            type: 'LineString',
            coordinates: linePoints
          }
        })
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
