<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-02 08:42:58
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div id="map" ref="map" />
  </div>
</template>

<script>

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
      this.map = new BMapGL.Map('map', {
        enableMapClick: false,
        minZoom: 12
      })
      this.map.setCenter('广东省深圳市')
      // eslint-disable-next-line no-undef
      this.map.centerAndZoom(new BMapGL.Point(114.12744, 22.64469), 12) // 初始化地图,设置中心点坐标和地图级别
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
