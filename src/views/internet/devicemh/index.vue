<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2021-12-27 18:08:15
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
        url: `/vue-element-admin/article/list`,
        search: {
          data: [
            [
              { type: 'input', value: null, initValue: '', key: 'inputKey', placeholder: '输入框' },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'add', name: '新增', action: () => this.add() }
            ]
          ]
        },
        table: {
          rowKey: 'sectionId',
          loadType: 'list',
          prefixHeight: 0,
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            { label: '选择', type: 'selection' },
            { label: '序号', type: 'index' },
            { label: '设备名称', key: 'code' },
            { label: '设备编号', key: 'manageDeptName' },
            { label: '备注', key: 'manageDeptName' },
            {
              label: '操作',
              key: 'drawNum',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <div class='flex-table-cell'>
                    <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                    <div class='btn-text' onClick={() => this.handlerType(1, row)}>编辑</div>
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
    this.fetchData()
  },
  methods: {
    add() {
      this.centerDialogVisible = true
    },
    fetchData() {
      fetch('/REST/System/TenantBase/SMARTCITY/V1.0/APPSERVICE/EntityService/Data/AICIMTESTSERVICE/Test/SERVER')
        .then(response => response.json())
        .then(data => console.log(data))
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
