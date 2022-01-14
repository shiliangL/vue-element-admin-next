<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-01-13 12:03:22
 * @LastEditors: Do not edit
 * @Description: 合作伙伴
-->
<template>
  <div class="drawBMapGL">
    <!-- 合作伙伴 -->
    <!-- <PlaceholderBock /> -->
    <div class="tools">
      <el-link :underline="false" type="primary" @click.stop="draw(1)">
        <i class="el-icon-full-screen" /> 视角
      </el-link>

      <template>
        <el-link :underline="false" type="info" @click.stop="draw(0)">
          <i class="el-icon-thumb" /> 停止绘制
        </el-link>
        <el-link :underline="false" type="primary" @click.stop="draw(2)">
          <i class="el-icon-s-flag" /> 标点
        </el-link>
        <el-link :underline="false" type="danger" @click.stop="draw(5)">
          清空所有绘制
        </el-link>
      </template>
    </div>
    <div id="BMapGL" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.initBMap()
  },
  methods: {
    initBMap() {
      this.map = new BMapGL.Map('BMapGL', { enableMapClick: false })
      this.map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 19) // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      this.map.setHeading(64.5)
      this.map.setTilt(73)
      this.initDrawingManager(this.map)
    },
    initDrawingManager(map) {
      const { BMapGLLib } = window
      this.drawingManager = new BMapGLLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        // eslint-disable-next-line no-undef
        drawingType: BMAP_DRAWING_MARKER,
        enableDrawingTool: false, // 是否显示工具栏
        drawingModes: [
          // eslint-disable-next-line no-undef
          BMAP_DRAWING_MARKER
          // BMAP_DRAWING_CIRCLE,
          // BMAP_DRAWING_POLYLINE,
          // BMAP_DRAWING_POLYGON,
          // BMAP_DRAWING_RECTANGLE
        ],
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMapGL.Size(5, 5) // 偏离值
        }
      })
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      this.drawingManager.addEventListener(
        'overlaycomplete',
        this.overlaycomplete
      )
    },
    // 选择绘图方式
    draw(type) {
      switch (type) {
        case 0:
          this.drawingManager && this.drawingManager.close()
          break
        case 1:
          this.drawingManager && this.drawingManager.close()
          this.getBetterViewByOverlays()
          break
        case 2:
          this.drawingManager.open()
          // eslint-disable-next-line no-undef
          this.drawingManager.setDrawingMode(BMAP_DRAWING_MARKER)
          break
        case 5:
          this.drawingManager && this.drawingManager.close()
          this.$confirm('是否确定删除地图上所有的绘制, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.map && this.map.clearOverlays()
              setTimeout(_ => {
                this.getBetterViewByOverlays()
              }, 200)
            })
            .catch(() => {})
          break
        case 8:
        default:
          break
      }
    },
    overlaycomplete(e) {
      console.log(e)
    },
    getBetterViewByOverlays() {
      if (this.map) {
        // console.log(this.map.getOverlays()) 获取地图覆盖物
        const pointsListOverLay = this.map.getOverlays().filter(item => (item._type && item._type === 'overlay')) || []
        const pointArray = []
        for (const item of pointsListOverLay) {
          console.log(item.latLng, 'latLng')
          console.log(item.point, 'point')
          // if (item.__overLayoutKey__ !== 'marker') {
          //   const itmeList = item.getPath()
          //   if (itmeList.length) itmeList.map(k => pointArray.push(k))
          // } else {
          //   if (item.point) pointArray.push(item.point)
          // }
        }
        const b = pointArray.map((item) => new BMapGL.Point(item.lng, item.lat)) || []
        const list = b.length ? b : this.boundaryLoadedpoints || []
        this.map.setViewport(list)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawBMapGL {
  position: relative;
  .tools {
    top: 20px;
    right: 20px;
    z-index: 99999;
    position: absolute;
    user-select: none;
    height: 36px;
    line-height: 36px;
    background: #ffffff;
    margin: 10px;
    padding: 0 10px;
    box-shadow: 0px 0px 10px rgba(10, 41, 59, 0.1);
    .el-link {
      display: inline-block;
      margin: 0 4px;
    }
  }
  #BMapGL {
    width: 100%;
    height: 100%;
  }
}
</style>
