<!--
 * @Author: shiliangL
 * @Date: 2021-12-30 12:37:07
 * @LastEditTime: 2021-12-30 12:51:08
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div clas="iframe">
    <iframe class="iframe" :src="`${VUE_APP_BASE_API}/f/Support/ConfigManager/App.MenuManager.html`" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'MenuConfig',
  data() {
    return {
      VUE_APP_BASE_API: window.VUE_APP_BASE_API
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe{
  width: 100%;
  height: 100%;
}
</style>
