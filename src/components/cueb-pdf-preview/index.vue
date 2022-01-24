<!--
 * @Author: shiliangL
 * @Date: 2022-01-24 16:06:12
 * @LastEditTime: 2022-01-24 16:25:36
 * @LastEditors: Do not edit
 * @Description:pdf查看器
-->

<template>
  <div class="cueb-pdf-preview">
    <iframe v-if="isIframe" class="preview" :src="url" />
    <embed v-else class="preview" :src="url">
  </div>
</template>

<script>
export default {
  name: 'CuebPdfPreview',
  props: {
    url: {
      type: String,
      default: () => ''
    },
    isIframe: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.cueb-pdf-preview {
  height: 90vh;
  width: 100%;
  overflow: hidden;
  .preview {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
