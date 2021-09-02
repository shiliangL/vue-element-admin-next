/*
 * @Author: shiliangL
 * @Date: 2021-09-02 09:20:43
 * @LastEditTime: 2021-09-02 17:57:57
 * @LastEditors: Do not edit
 * @Description:
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ThreeApp {
  constructor({ canvas }) {
    this.canvas = canvas
    this.scene = ThreeApp.createScene()
    this.camera = ThreeApp.createCamera(canvas)
    this.renderer = ThreeApp.createRenderer(canvas)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.update()
  }

  // 场景
  static createScene() {
    return new THREE.Scene()
  }

  // 相机
  static createCamera(canvas) {
    const innerWidth = canvas.offsetWidth || window.innerWidth
    const innerHeight = canvas.offsetHeight || window.innerHeight
    return new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.25, 5000)
  }

  // 渲染器
  static createRenderer(canvas) {
    const innerWidth = canvas.offsetWidth || window.innerWidth
    const innerHeight = canvas.offsetHeight || window.innerHeight
    const renderer = new THREE.WebGLRenderer({ canvas })

    // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(innerWidth, innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    return renderer
  }

  resize() {
    // const innerWidth = this.canvas.offsetWidth || window.innerWidth
    // const innerHeight = this.canvas.offsetHeight || window.innerHeight
    const canvasSize = this.renderer.getSize(new THREE.Vector2())
    const windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight)
    if (!canvasSize.equals(windowSize)) {
      this.renderer.setSize(windowSize.x, windowSize.y, false)
      this.camera.aspect = windowSize.x / windowSize.y
    }
  }

  update() {
    this.resize()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { this.update() })
  }
}

class AnimationMixer {

}

export default ThreeApp

export { ThreeApp, AnimationMixer, THREE, GLTFLoader }
