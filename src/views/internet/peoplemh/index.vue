<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2021-12-30 19:33:59
 * @LastEditors: Do not edit
 * @Description: 人员管理
-->
<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2021-12-30 15:42:53
 * @LastEditors: Do not edit
 * @Description: 设备管理
-->
<template>
  <cube-table-list
    ref="CubeTableList"
    :config="config"
  />
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      config: {
        method: 'get',
        url: `${window.VUE_APP_BASE_API_PREFIX}/PERSONNEL_INFORMATION`,
        search: {
          data: [
            [
              { type: 'input', value: null, initValue: '', key: 'name', placeholder: '名称检索' },
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
            { label: '人员名称', key: 'name' },
            { label: '身份证', key: 'idcard' },
            { label: '国籍', key: 'nationality' },
            { label: '民族', key: 'nation' },
            { label: '性别', key: 'gender' },
            { label: '户籍类型', key: 'property' },
            { label: '政治面貌', key: 'status' },
            { label: '教育背景 ', key: 'edu_degree' },
            { label: '毕业院校', key: 'school' },
            { label: '专业', key: 'major' },
            { label: '居住地址', key: 'live_address' },
            { label: '从事行业', key: 'industry' },
            { label: '职称', key: 'title' },
            { label: '工作职位', key: 'work_position' },
            { label: '工作地址', key: 'work_address' },
            { label: '工作单位', key: 'work_unit' },
            // { label: '是否本地户籍', key: 'local' },
            {
              label: '操作',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <div class='flex-table-cell'>
                    <div class='delete-text' onClick={() => this.handlerRemove(row)}>
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
    refresh() {
      this.$refs['CubeTableList'] && this.$refs['CubeTableList'].fetchList()
    },
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
          title: type ? '编辑人员信息' : '新增人员信息',
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
      }).then(() => {
        this.$request({
          method: 'DELETE',
          url: `${window.VUE_APP_BASE_API_PREFIX}/PERSONNEL_INFORMATION/${id}`
        }).then((res) => {
          const { Success } = res
          if (Success) {
            this.$message.success('操作成功')
            this.refresh()
          } else {
            this.$message.error('操作失败')
            this.submitLoading = false
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
