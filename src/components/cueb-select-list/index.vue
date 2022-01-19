<!--
 * @Author: shiliangL
 * @Date: 2022-01-18 16:51:25
 * @LastEditTime: 2022-01-19 10:58:14
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <el-select
    :value="selectValue"
    :loading="fetchLoading"
    :filterable="initConfig.filterable"
    :multiple="initConfig.multiple"
    :collapse-tags="initConfig.collapse"
    :multiple-limit="initConfig.limit"
    :clearable="initConfig.clearable"
    :placeholder="initConfig.placeholder"
    class="cueb-select-list w100p"
    @change="select"
  >
    <el-option
      v-for="(item,index) in options"
      :key="initConfig.rowKey ? 'el-select-' +item[initConfig.rowKey]+index : item.value"
      :label="item.label"
      :value="item.value"
    >
      <template>
        <slot :row="item" />
      </template>
    </el-option>

  </el-select>
</template>

<script>

import { deepMerge } from '@/utils/index'

export default {
  name: 'CuebSelectList',
  model: {
    prop: 'selectValue',
    event: 'change'
  },
  props: {
    selectValue: {
      type: [String, Number, Array],
      default: () => ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fetchLoading: false,
      options: [],
      initConfig: {
        limit: 50,
        multiple: false,
        collapse: false,
        clearable: true,
        filterable: true,
        placeholder: '请选择',
        rowKey: '',
        initLoad: true,
        keyCode: 'id',
        keyName: 'name',
        method: 'get',
        focusLoad: false,
        searchAjax: false,
        url: '/COOPERATIVE_PARTNER/COOPERATIVE'
      }
    }
  },
  created() {
    this.initConfig = deepMerge(this.initConfig, this.config)
    const { initLoad } = this.initConfig
    if (initLoad) {
      this.fetchList()
    }
  },
  methods: {
    fetchList() {
      this.fetchLoading = true
      const { url } = this.initConfig
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}${url}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              const list = []
              const { keyCode, keyName } = this.initConfig
              for (const item of Data) {
                item.value = item[keyCode]
                item.label = item[keyName]
                list.push(item)
              }
              this.options = list
              this.$emit('options', list)
            } else {
              this.$emit('options', null)
            }
          }
        })
        .catch(() => {
          this.fetchLoading = false
        })
    },
    select(value) {
      // this.$emit('input', value)
      this.$emit('change', value)
      if (value) {
        const { keyCode } = this.initConfig
        const rom = this.options.find(item => item[keyCode] === value)
        if (rom) this.$emit('select', rom)
      } else {
        this.$emit('select', null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cueb-select-list {
  overflow: hidden;
}
</style>
