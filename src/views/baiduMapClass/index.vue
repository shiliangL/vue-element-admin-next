<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
<<<<<<< HEAD
 * @LastEditTime: 2021-08-03 22:09:48
=======
 * @LastEditTime: 2021-08-04 10:39:57
>>>>>>> b305273343958c808a9a1abecb7c73b896afe213
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div id="map" ref="map" />
  </div>
</template>

<script>

const iconMapCar = require('@/assets/iconOnMap/che.png')

export default {
  name: 'BaiduMapClass',
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        this.mapInit()
      }, 0)
    })
  },
  methods: {
    mapInit() {
      this.bMapClass = new this.$BMapClass({ container: 'map', centerName: '深圳市宝安区' })
      this.map = this.bMapClass.baiduMap
      this.fetchMapLineData()
      this.fetchMapPointData()
    },
    async fetchMapLineData() {
      const result = await this.$http({ url: '/mockData/map-line.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1, 'dataType': 0, 'workStatus': 0 }})
      this.bMapClass.drawMapLine(result.lineList || [])
    },
    async fetchMapPointData() {
      const result = await this.$http({ url: '/mockData/map-point.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1 }})
      this.renderAsyncOnMap(result.list || [])
    },
    renderAsyncOnMap(data = []) {
      if (!data.length) return
      let idx = 0
      this.timemer = null
      const renderIndexNumber = () => {
        const item = data[idx]
        // 逐个干的事情
        this.darwMapPoint([item])
        if (this.timemer != null) {
          window.clearTimeout(this.timemer)
        }
        idx = idx + 1
        if (idx < data.length - 1) {
          this.timemer = window.setTimeout(renderIndexNumber, 50)
        }
      }
      renderIndexNumber()
    },
    darwMapPoint(result = []) {
      this.onMapLinePoint = []
      result.forEach(kk => {
        if (kk.geoX && kk.geoY) {
          const markerIcon = new BMap.Icon(iconMapCar, new BMap.Size(32, 32), {
            imageSize: new BMap.Size(32, 32)
          })
          const marker = new BMap.Marker(new BMap.Point(kk.geoX, kk.geoY), { icon: markerIcon, offset: new BMap.Size(0, -10) })
          this.map.addOverlay(marker)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map {
  position: relative;
  #map{
    width: 100%;
    height: 100%;
  }
}
</style>
