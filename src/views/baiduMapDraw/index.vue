<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-02 20:47:56
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div id="map" ref="map" />
  </div>
</template>

<script>

// import * as mapv from 'mapv'

export default {
  name: 'BaiduMapGl',
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        this.mapInit()
      }, 0)
    })
  },
  methods: {
    mapInit() {
      // eslint-disable-next-line no-undef
      this.map = new BMap.Map('map', {
        enableMapClick: false,
        minZoom: 12
      })
      // eslint-disable-next-line no-undef
      this.map.centerAndZoom(new BMap.Point(113.983201, 22.638147), 12) // 初始化地图,设置中心点坐标和地图级别
      this.fetchMapLineData()
      this.fetchMapSectionData()
    },
    async fetchMapLineData() {
      const { map } = this
      const { lineList } = await this.$http({ url: 'http://hw-topevery-dev-ui:49210/mapIndex/getMapCarDisplayInfo', method: 'POST', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1, 'dataType': 0, 'workStatus': 0 }})
      for (const item of lineList || []) {
        const linePoints = item.linePoints[0].map(kk => new BMap.Point(kk.lng, kk.lat))
        const polyline = new BMap.Polyline(linePoints, {
          strokeColor: 'blue',
          strokeWeight: 2,
          strokeOpacity: 0.5
        })
        map.addOverlay(polyline)
      }
    },
    async fetchMapSectionData() {
      const result = await this.$http({ url: 'http://hw-topevery-dev-ui:49210/mapIndex/getMapSectionList', method: 'POST', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1 }})
      console.log(result, '-result-')
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
            fillOpacity: 0.45,
            strokeStyle: 'solid'
          })
          this.map && this.map.addOverlay(polygons)
        })
      })
      this.map && this.map.setViewport(pointView)
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map {
  position: relative;
  #map{
    height: 100%;
    widows: 100%;
  }
}
</style>
