<!--
 * @Author: shiliangL
 * @Date: 2020-12-04 13:50:23
 * @LastEditTime: 2021-07-28 21:22:34
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
        <el-scrollbar class="router-scrollbar-wrapper">
          <router-view
            :key="key"
            class="router-view-page"
          />
        </el-scrollbar>
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
    position: absolute;
    position: relative;
    background: #f1f8ff;
    height: calc(100vh - 100px);
    .router-view-page {
      width: 100%;
      height: 100%;
      background: #fff;
      margin: 0 !important;
      padding: 10px !important;
      overflow: auto;
    }
    // 内容区块无滚动条
    .router-scrollbar-wrapper {
      width: 100%;
      height: 100%;
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
