<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2021-12-30 10:20:24
 * @LastEditors: Do not edit
 * @Description: 设备管理
-->
<template>
  <cube-table-list :config="config" />
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      config: {
        method: 'get',
        url: `${window.VUE_APP_BASE_API_PREFIX}/EXHIBITION_DEVICE`,
        search: {
          data: [
            [
              { type: 'input', value: null, initValue: '', key: 'inputKey', placeholder: '名称检索' },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'add', name: '新增', action: () => this.openLayer({ type: 0 }) }
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
            { label: '设备名称', key: 'name' },
            { label: '设备类型', key: 'type' },
            { label: '设备编号', key: 'code' },
            { label: '使用区域', key: 'region' },
            { label: '采购时间', key: 'order_time' },
            { label: '生产商', key: 'manufacturer' },
            { label: '设备参数', key: 'parameter', width: 320 },
            {
              label: '操作',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  // <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                  <div class='flex-table-cell'>
                    <div class='delete-text' onClick={() => this.handlerType(0, row)}>
                      <i class='el-icon-delete'></i>
                      删除
                    </div>
                    <div class='btn-text' onClick={() => this.openLayer({ type: 1, ...row })}>
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

  },
  methods: {
    openLayer(row = {}) {
      const { type, id } = row
      // type 1 b编辑  0 增加 这里标记有row就是编辑 没有就是新增
      this.$openLayer({
        props: {
          type, id
        },
        // 弹窗内嵌套组件
        content: () => import('./add.vue'),
        // 弹窗属性设置
        modalProps: {
          width: '30%',
          title: type ? '编辑设备' : '新增设备',
          maskClosable: false,
          fullscreen: false
        },
        // 事件回调
        methods: {
          refresh: () => {
            // row 这里标记有row就是编辑刷新当前 没有就是新增刷新到首页
          }
        }
      })
    },
    handlerType(type, row) {
      console.log(type, row)
      this.$message({ message: type ? '数据编辑' : '数据详情', type: 'success' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
