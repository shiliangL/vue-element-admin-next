<!--
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2021-09-02 09:03:28
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view
          :key="key"
          class="router-view-page"
        />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Layoutv',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .router-view-page {
    width: 100%;
    height: 100%;
  }
}
</style>
