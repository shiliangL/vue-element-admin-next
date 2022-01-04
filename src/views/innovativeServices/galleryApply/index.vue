<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-01-04 14:37:55
 * @LastEditors: Do not edit
 * @Description: 展厅服务-展厅预约
-->
<template>
  <cube-table-list ref="CubeTableList" :config="config" />
</template>

<script>
// import vclamp from 'vue-clamp'
export default {
  components: {
    // vclamp
  },
  data() {
    return {
      centerDialogVisible: false,
      config: {
        method: 'get',
        url: `${window.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT`,
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
            {
              label: '来访时间',
              key: 'visiting_date',
              render: (h, parmas) => {
                const { row } = parmas
                const visiting_date = row.visiting_date
                  ? this.$dayjs(row.visiting_date).format('YYYY-MM-DD')
                  : ''
                return <span>{visiting_date}</span>
              }
            },
            { label: '来访客户', key: 'visiting_people' },
            { label: '人员情况', key: 'people_detail', width: 450 },
            { label: '行业/领域', key: 'industry' },
            { label: '部门名称', key: 'department', width: 320 },
            // { label: '交流材料', key: 'isdoc' },
            { label: '客户经理', key: 'CM' },
            { label: '项目经理', key: 'PM' },
            { label: '邮箱', key: 'email' },
            { label: '主要了解方面', key: 'manufacturer' },
            { label: '备注', key: 'others' },
            {
              label: '操作',
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
  created() {},
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
          width: '30%',
          title: type ? '编辑设备' : '新增设备',
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
            url: `${window.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT/${id}`
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
