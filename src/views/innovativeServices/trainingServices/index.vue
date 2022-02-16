<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-02-16 16:18:15
 * @LastEditors: Do not edit
 * @Description: 培训赋能
-->
<template>
  <cube-table-list
    ref="CubeTableList"
    :config="config"
  />
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/CULTIVATE_ENERGIZE/FIND_TRAINING_CAN_ASSIGN`,
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
              label: '培训主图', key: 'domainName',
              render: (h, parmas) => {
                const { row } = parmas
                return (row.home_page_path ? <el-image lazy src={row.home_page_path} v-viewer style='width: 60px; height: 40px'> </el-image> : null)
              }
            },
            { label: '培训名称', key: 'name' },
            {
              label: '培训时间', key: 'time',
              render: (h, parmas) => {
                const { row } = parmas
                const t = row.time ? row.time.replace(/T/g, ' ') : ''
                return <span> { t } </span>
              }
            },
            { label: '培训类型', key: 'type_name' },
            { label: '主讲人', key: 'lecturer' },
            { label: '主讲人简介', key: 'lecturer_info' },
            { label: '培训简介', key: 'cultivate_synopsis' },
            { label: '累计观看人数', key: 'view_number' },
            { label: '培训状态', key: 'state_name' },
            {
              label: '操作',
              width: 180,
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
          title: type ? '编辑授权项' : '新增授权项',
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
            url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/CULTIVATE_ENERGIZE/TRAINING_CAN_ASSIGN/${id}`
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
