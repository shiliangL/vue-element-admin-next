<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-02 10:19:19
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div id="map" ref="map" />
  </div>
</template>

<script>

import * as mapv from 'mapv'
import { initBMapGLMap } from '@/utils/BMapGL'

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
      this.map = initBMapGLMap({
        zoom: 13,
        tilt: 60,
        heading: 0,
        container: 'map',
        enableMapClick: false,
        center: [106.560734, 29.566986]
      })
      // eslint-disable-next-line no-undef
      const mapvglView = new mapvgl.View({
        map: this.map
      })
      mapvglView.startAnimation()
      // eslint-disable-next-line no-undef
      this.fetchMapData(mapvglView)
    },
    fetchMapData(mapvglView) {
      fetch('/mockData/car-list-gl.csv').then((res) => {
        return res.text()
      }).then((csvstr) => {
        const dataSet = mapv.csv.getDataSet(csvstr)
        const data = dataSet.get()
        // 移动点位
        const linePointLayer = new mapvgl.LinePointLayer({
          size: 4,
          speed: 0.5,
          color: 'rgba(0, 255, 0, 1)',
          animationType: mapvgl.LinePointLayer.ANIMATION_TYPE_UNIFORM_SPEED,
          shapeType: mapvgl.LinePointLayer.SHAPE_TYPE_CIRCLE,
          blend: 'lighter'
        })
        mapvglView.addLayer(linePointLayer)
        linePointLayer.setData(data)
        //  线路
        const lineLayer = new mapvgl.SimpleLineLayer({
          color: 'rgba(55, 55, 255, 0.33)'
        })
        mapvglView.addLayer(lineLayer)
        lineLayer.setData(data)
      })
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
