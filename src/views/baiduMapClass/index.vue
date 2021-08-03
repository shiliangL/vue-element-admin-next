<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-03 17:48:13
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
      const bMapUtils = new this.$BMapUtils({ container: 'map', centerName: '深圳市宝安区' })
      this.map = bMapUtils.bdMap
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map {
  position: relative;
  #map{
    width: 100%;
    height: 80%;
  }
}
</style>
