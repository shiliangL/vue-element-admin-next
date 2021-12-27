<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <el-tabs
      ref="scrollPane"
      class="tags-tab-warp"
      :value="selectTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :tag="tag"
        :name="tag.path"
      >
        <div
          slot="label"
          class="tags-view-label"
          @contextmenu.prevent.native="openMenu(tag,$event)"
        >
          <i class="el-icon-menu tags-icon" />
          <span v-text="tag.title" />
          <i
            class="el-icon-close"
            @click.stop="closeSelectedTag(tag)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown
      class="operation-dropdown"
    >
      <div class="el-icon-menu" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="dropdownClick(1)"> 刷新当前 </el-dropdown-item>
        <el-dropdown-item @click.native="dropdownClick(2)"> 关闭当前 </el-dropdown-item>
        <!-- <el-dropdown-item @click.native="dropdownClick(3)"> 关闭其他 </el-dropdown-item> -->
        <el-dropdown-item @click.native="dropdownClick(4)"> 关闭所有 </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <ul
      v-show="visible"
      :style="{ left:left+'px',top:top+'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)"> 刷新当前 </li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      > 关闭当前 </li>
      <!-- <li @click="closeOthersTags(selectedTag)"> 关闭其他 </li> -->
      <li @click="closeAllTags(selectedTag)"> 关闭所有 </li>
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
    },
    findeTagOnNotSeletc() {
      return this.visitedViews.find((item) => item.path === this.selectTab) || {}
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
    console.log(this.visitedViews, '-visitedViews-')
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
    // 刷新当前
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
    // 关闭当前
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    // 关闭其他 - bug - TODO
    closeOthersTags(view) {
      console.log(view, 'view')
      this.$router.push(view)
      this.$store.dispatch('tagsView/delOthersViews', view).then(() => {
        // this.moveToCurrentTag()
      })
    },
    // 关闭所有
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
    tabClick(nodeVue) {
      const tag = nodeVue.$attrs.tag
      this.$router.push({ path: tag.path, query: tag.query, fullPath: tag.fullPath })
    },
    dropdownClick(key) {
      const { findeTagOnNotSeletc } = this
      switch (key) {
        case 1:
          // 刷新当前
          this.refreshSelectedTag(findeTagOnNotSeletc)
          break
        case 2:
          // 关闭当前
          this.closeSelectedTag(findeTagOnNotSeletc)
          break
        case 3:
          // 关闭其他
          this.closeOthersTags(findeTagOnNotSeletc)
          break
        case 4:
          // 关闭所有
          this.closeAllTags(findeTagOnNotSeletc)
          break
        default:
          break
      }
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
.tags-tab-warp {
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
    transition: padding 0.23s cubic-bezier(0.645, 0.045, 0.355, 1);
    .el-icon-close {
      display: none;
      transition: all 0.23s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &.is-focus {
      border: 0;
      outline: none;
    }
    &:hover {
      color: #515a6e;
      background: $tagsActiveHoverBg;
      border-color: $tagsActiveHoverBg;
      mask: url("~@/assets/layout/tags-view-mark.png");
      padding-left: 30px !important;
      padding-right: 30px !important;
      mask-size: 100% 100%;
      .el-icon-close {
        display: inline-block !important;
      }
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
      .el-icon-close {
        display: inline-block !important;
      }
    }
    .tags-icon {
      padding-right: 6px;
    }
  }

  // 覆盖重置
  .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
  }
  .el-tabs__active-bar {
    display: none;
  }
}

.operation-dropdown {
  font-size: 20px;
  .el-icon-menu {
    cursor: pointer;
    font-size: 20px;
    transition: transform 0.3s ease-out;
  }
  &:hover {
    .el-icon-menu {
      transform: rotate(90deg);
    }
  }
}
</style>
