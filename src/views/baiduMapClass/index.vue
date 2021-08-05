<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-08-03 22:09:48
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
      this.bMapClass = new this.$BMapClass({ container: 'map', centerName: '深圳市宝安区' })
      this.fetchMapLineData()
    },
    async fetchMapLineData() {
      const result = await this.$http({ url: '/mockData/map-line.json', method: 'GET', data: { 'id': '5573FFC1-D4FA-4E09-A60B-D83C72E29B95', 'type': 1, 'dataType': 0, 'workStatus': 0 }})
      this.bMapClass.darwMapLine(result.lineList || [], (row) => {
        console.log(row, '点击了其中一个')
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
