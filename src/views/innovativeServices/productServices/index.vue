<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-02-16 16:28:27
 * @LastEditors: Do not edit
 * @Description: 项目支撑
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/SCREEN_FIND_PROJECT`,
        search: {
          data: [
            [
              {
                type: 'input',
                value: null,
                initValue: '',
                key: 'name',
                placeholder: '名称检索'
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
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
            { label: '项目名称', key: 'project_name' },
            { label: '项目編碼', key: 'project_code' },
            { label: '建设单位', key: 'construction_unit' },
            { label: '所在区域', key: 'area' },
            { label: '项目概况', key: 'project_overview' },
            { label: '申请支持部门', key: 'support_department' },
            { label: '项目状态', key: 'project_state_name' },
            { label: '项目简介', key: 'project_brief' },
            { label: '参与人员', key: 'join_personnel_name' },
            {
              label: '操作',
              width: 220,
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <div class='flex-table-cell'>
                    <div
                      class='delete-text'
                      onClick={() => this.handlerRemove(row)}
                    >
                      <i class='el-icon-delete'></i>
                      删除
                    </div>
                    <div class='btn-text' onClick={() => this.openPreviewLayer(row)}>
                      <i class='el-icon-view'></i>
                      查看详情
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
  created() { },
  methods: {
    refresh() {
      this.$refs['CubeTableList'] && this.$refs['CubeTableList'].fetchList()
    },
    openLayer(row = {}) {
      const { type, id } = row
      // type 1 b编辑  0 增加 这里标记有row就是编辑 没有就是新增
      this.$openLayer({
        props: {
          type,
          id
        },
        // 弹窗内嵌套组件
        content: () => import('./add.vue'),
        // 弹窗属性设置
        modalProps: {
          width: '45%',
          title: type ? '编辑项目' : '新增项目',
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
    openPreviewLayer(row = {}) {
      const { id } = row
      // type 1 b编辑  0 增加 这里标记有row就是编辑 没有就是新增
      this.$openLayer({
        props: {
          type: 1,
          id
        },
        content: () => import('./preview.vue'),
        modalProps: {
          width: '45%',
          title: '查看项目详情',
          maskClosable: false,
          fullscreen: false
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
            url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT/${id}`
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
        .catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped></style>
