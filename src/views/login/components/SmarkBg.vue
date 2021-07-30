<!--
 * @Author: shiliangL
 * @Date: 2021-07-30 20:41:02
 * @LastEditTime: 2021-07-30 21:13:49
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <video
    autoplay
    loop
    muted
    :style="fixStyle"
    class="fillWidth"
  >
    <source
      src="/video/login_bg.mp4"
      type="video/mp4"
    >
  </video>
</template>

<script>

import { debounce } from '@/utils/index'

export default {
  data() {
    return {
      fixStyle: {}
    }
  },
  mounted() {
    this.resizeHandler = debounce(() => this.onResizeWin(), 100)
    window.addEventListener('resize', this.resizeHandler)
    this.onResizeWin()
    this.$once('hook:beforeDestroy', () => window.removeEventListener('resize', this.resizeHandler))
  },
  methods: {
    onResizeWin() {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fillWidth {
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
