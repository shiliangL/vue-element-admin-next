<!--
 * @Author: shiliangL
 * @Date: 2021-09-02 09:07:21
 * @LastEditTime: 2021-09-02 10:48:22
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="upSpeed">
    upSpeed
    <canvas ref="canvas" />
  </div>
</template>

<script>

import { ThreeApp, GLTFLoader, THREE } from '@/utils/ThreeApp'

export default {
  name: 'UpSpeed',
  mounted() {
    this.$nextTick().then(() => {
      this.initThree()
    })
  },
  methods: {
    initThree() {
      const loader = new GLTFLoader()
      loader.load('/model/gundam/scene.gltf', (gltf) => {
        this.ThreeApp = new ThreeApp({ canvas: this.$refs['canvas'] })
        const model = gltf.scene

        model.scale.set(0.8, 0.8, 0.8)
        // model.position.y = -6

        const { controls, scene } = this.ThreeApp
        // 模型
        scene.add(model)
        // 辅助坐标
        const axes = new THREE.AxisHelper(50)
        scene.add(axes)

        // 环境光
        const ambient = new THREE.AmbientLight(0xffffff)
        scene.add(ambient)

        //  控制器
        controls.enablePan = true
        controls.enableZoom = true
        controls.target.set(1, 3, 3)
        controls.update()
      },
      (p) => { console.log(p) },
      (e) => { console.log(e) }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.upSpeed {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
