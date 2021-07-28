<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <el-tabs
      ref="scrollPane"
      class="tags-tab-nav"
      :value="selectTab"
      @tab-click="tabClick"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :tag="tag"
        class="tags-view-item"
        :label="tag.title"
        :name="tag.path"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      />
    </el-tabs>
    <div class="el-icon-menu" />
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>

import path from 'path'

export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    },
    selectTab() {
      return this.$route.path
    }
  },
  watch: {
    $route() {
      this.addTags()
      // this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    // 未调用
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    removeTab(tabVue) {
      console.log(tabVue, 'tabVue')
    },
    tabClick(tabVue) {
      const tag = tabVue.$attrs.tag
      this.$router.push({ path: tag.path, query: tag.query, fullPath: tag.fullPath })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  user-select: none;
  background: #fff;
  position: relative;
  align-content: center;
  box-sizing: border-box;
  justify-content: space-between;
  border-top: 1px solid #f6f6f6;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-tab-nav {
  width: 100%;
  height: 28px;
  .el-tabs__item {
    user-select: none;
  }
  .el-tabs__header {
    margin: 0;
    border-bottom: 0px;
  }
  .el-tabs__item {
    height: 38px;
    color: #626b7d;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: -16px;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.is-focus {
      border: 0;
      outline: none;
    }
    &:hover {
      color: #515a6e;
      background: $menuHover;
      border-color: $menuHover;
      mask: url("~@/assets/layout/tags-view-mark.png");
      padding-left: 30px !important;
      padding-right: 30px !important;
      mask-size: 100% 100%;
    }
    &.is-active {
      color: $tagsActiveText;
      background-color: $tagsActiveBg;
      border-color: $tagsActiveBg;
      mask: url("~@/assets/layout/tags-view-mark.png");
      padding-left: 30px !important;
      padding-right: 30px !important;
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
    }
  }
  .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
  }
  .el-tabs__active-bar {
    display: none;
  }
}
</style>
