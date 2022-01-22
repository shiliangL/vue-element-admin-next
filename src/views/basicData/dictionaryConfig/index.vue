<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-01-22 10:32:40
 * @LastEditors: Do not edit
 * @Description: 数据字典配置
-->
<template>
  <cube-table-list ref="CubeTableList" :config="config" />
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      config: {
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/DICT_DATA`,
        search: {
          data: [
            [
              {
                type: 'option',
                value: null,
                options: [],
                key: 'dict_type',
                placeholder: '名称检索'
              },
              { type: 'search', name: '查询' }
            ],
            [
              {
                type: 'add',
                name: '新增',
                action: () => this.openLayer({ type: 0 })
              }
            ]
          ]
        },
        table: {
          // rowKey: 'id',
          // loadType: 'page',
          prefixHeight: 0,
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            // { label: '选择', type: 'selection' },
            { label: '序号', type: 'index' },
            { label: '字典名称', key: 'dict_name' },
            { label: '字典类型', key: 'dict_type' },
            {
              label: '操作',
              width: 160,
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  // <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                  <div class='flex-table-cell'>
                    <div
                      class='delete-text'
                      onClick={() => this.handlerRemove(row)}
                    >
                      <i class='el-icon-delete'></i>
                      删除
                    </div>
                    <div
                      class='btn-text'
                      onClick={() => this.openLayer({ type: 1, ...row })}
                    >
                      <i class='el-icon-edit'></i>
                      编辑
                    </div>
                  </div>
                )
              }
            }
          ]
        }
      }
    }
  },
  created() {
    this.fetchOptio()
  },
  methods: {
    fetchOptio() {
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/DICT_TYPE`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          console.log(Data, '-Data')
          if (Array.isArray(Data) && Data.length) {
            const row = this.config.search.data[0].find(item => item.key === 'dict_type')
            const list = []
            if (!row) return
            for (const item of Data) {
              item.label = item.dict_name
              item.value = item.dict_type
              list.push(item)
            }
            row.options = list
            row.value = list.length ? list[0].value : ''
            row.initValue = list.length ? list[0].value : ''
            this.options = list
          }
        }
      })
    },
    refresh() {
      this.$refs['CubeTableList'] && this.$refs['CubeTableList'].fetchList()
    },
    openLayer(row = {}) {
      let msg = null
      let dictType = null
      // type 1 b编辑  0 增加 这里标记有row就是编辑 没有就是新增
      const { type, id } = row
      const { options, config } = this
      const searchRow = config.search.data[0].find(item => item.key === 'dict_type')
      if (searchRow && options) {
        const findSelectOption = options.find(item => item.value === searchRow.value) || {}
        msg = findSelectOption.label
        dictType = searchRow.value
      }
      if (!dictType) {
        this.$message({ message: '请选择字典类型', type: 'warning' })
        return
      }
      this.$openLayer({
        props: {
          id,
          type,
          dictType
        },
        // 弹窗内嵌套组件
        content: () => import('./add.vue'),
        // 弹窗属性设置
        modalProps: {
          width: '520px',
          title: type ? `编辑${msg}字典数据` : `新增${msg}字典数据`,
          maskClosable: false,
          fullscreen: false
        },
        // 事件回调
        methods: {
          refresh: () => {
            // row 这里标记有row就是编辑刷新当前 没有就是新增刷新到首页
            this.refresh()
          }
        }
      })
    },
    handlerRemove({ id }) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$request({
            method: 'DELETE',
            url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPARATUS/${id}`
          }).then(res => {
            const { Success } = res
            if (Success) {
              this.$message.success('操作成功')
              this.refresh()
            } else {
              this.$message.error('操作失败')
              this.submitLoading = false
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
