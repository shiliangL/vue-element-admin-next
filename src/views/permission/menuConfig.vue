<!--
 * @Author: shiliangL
 * @Date: 2021-12-30 12:37:07
 * @LastEditTime: 2022-01-07 16:28:23
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div clas="iframe">
    <!-- :src="`${VUE_APP_BASE_API}/f/Support/ConfigManager/App.AppConfigManager.html?GroupCatalog=PROJECT`" -->
    <iframe
      :src="`${VUE_APP_BASE_API}/f/Support/ConfigManager/App.MenuManager.html`"
      class="iframe"
      frameborder="0"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuConfig',
  data() {
    return {
      VUE_APP_BASE_API: process.env.NODE_ENV === 'development' ? '' : ''
    }
  },
  mounted() {
    console.log('/')
  }
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
