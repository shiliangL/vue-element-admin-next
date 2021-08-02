<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-02 10:12:58
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
import { darkStyle } from '@/utils/mapStyle'

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
      this.map.centerAndZoom(new BMap.Point(114.321317, 30.598428), 12) // 初始化地图,设置中心点坐标和地图级别
      this.map.setMapStyleV2({ styleJson: darkStyle })
      this.fetchMapData(this.map)
    },
    fetchMapData(map) {
      fetch('/mockData/car-list.text').then((res) => {
        return res.text()
      }).then((result) => {
        const data = []
        const timeData = []
        const rs = result.split('\n')
        let maxLength = 0
        for (let i = 0; i < rs.length; i++) {
          const item = rs[i].split(',')
          const coordinates = []
          if (item.length > maxLength) {
            maxLength = item.length
          }
          for (let j = 0; j < item.length; j += 2) {
            coordinates.push([item[j], item[j + 1]])
            timeData.push({
              geometry: {
                type: 'Point',
                coordinates: [item[j], item[j + 1]]
              },
              count: 1,
              time: j
            })
          }
          data.push({ geometry: { type: 'LineString', coordinates: coordinates }})
        }
        const dataSet = new mapv.DataSet(data)
        const options = {
          strokeStyle: 'rgba(53,57,255,0.5)',
          coordType: 'bd09mc',
          globalCompositeOperation: 'lighter',
          shadowColor: 'rgba(53,57,255,0.2)',
          shadowBlur: 3,
          lineWidth: 3.0,
          draw: 'simple'
        }
        // eslint-disable-next-line new-cap
        this.LineMapvLayer = new mapv.baiduMapLayer(map, dataSet, options)

        const animationDataSet = new mapv.DataSet(timeData)

        const animationOptions = {
          fillStyle: 'rgba(255, 250, 250, 0.2)',
          coordType: 'bd09mc',
          globalCompositeOperation: 'lighter',
          size: 1.5,
          animation: {
            stepsRange: {
              start: 0,
              end: 100
            },
            trails: 3,
            duration: 5
          },
          draw: 'simple'
        }
        // eslint-disable-next-line new-cap
        this.animationMapvLayer = new mapv.baiduMapLayer(map, animationDataSet, animationOptions)
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
