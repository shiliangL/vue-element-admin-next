<!--
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2021-07-29 20:53:41
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
  name: 'AppMain',
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
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  // padding-top: 100px;
}

.hasTagsView {
  .app-main {
    top: 100px;
    bottom: 0;
    right: 0;
    padding: 10px;
    position: relative;
    background: #eef1f6;
    height: calc(100vh - 100px);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);

    .router-view-page {
      width: 100%;
      height: 100%;
      background: #fff;
      margin: 0 !important;
      padding: 10px !important;
      overflow: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      &::-ms-overflow-style {
        display: none;
      }
    }
  }
  .fixed-header + .app-main {
    // padding-top: 100px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
