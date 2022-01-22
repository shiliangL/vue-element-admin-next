<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-01-22 10:51:11
 * @LastEditors: Do not edit
 * @Description: 研发服务-实验室预约
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT`,
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
            { label: '预约单位', key: 'enterprise_name' },
            {
              label: '预约时间',
              key: 'start_time',
              width: 260,
              render: (h, parmas) => {
                const { row } = parmas
                const start_time = row.start_time ? this.$dayjs(row.start_time).format('YYYY-MM-DD') : ''
                const end_time = row.end_time ? this.$dayjs(row.end_time).format('YYYY-MM-DD') : ''
                return (
                  <span>
                    {start_time} 至 {end_time}
                  </span>
                )
              }
            },
            { label: '是否是合作伙伴', key: 'is_cooperative',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <span>
                    { row.is_cooperative ? '是' : '否' }
                  </span>
                )
              }
            },
            { label: '所属行业', key: 'domain_name' },
            { label: '所在区域', key: 'city_area_name' },
            { label: '预约内容', key: 'content' },
            { label: '预约人数', key: 'number' },
            {
              label: '操作',
              width: 240,
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
                    <el-dropdown
                      trigger='click'
                      onCommand={(e, v) => this.handlerClickDropdown(e, v, row)}
                    >
                      <span class='btn-text' style='font-size: 12px;'>
                        更多操作
                        <i class='el-icon-arrow-down el-icon--right'></i>
                      </span>
                      <el-dropdown-menu slot='dropdown'>
                        <el-dropdown-item type='1'> 补充人员登记 </el-dropdown-item>
                        <el-dropdown-item type='2'> 补充测试报告 </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                // <el-dropdown-item type='2'> 补充测试报告 </el-dropdown-item>
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
          width: '45%',
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
            url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT/${id}`
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
    },
    handlerClickDropdown(e, v, row) {
      const { id } = row
      const { type } = v.$attrs
      const title = {
        1: '补充人员登记',
        2: '补充测试报告'
      }
      this.$openLayer({
        props: {
          id,
          type: (type * 1),
          showType: (type * 1)
        },
        // 弹窗内嵌套组件
        content: () => import('./addMore.vue'),
        // 弹窗属性设置
        modalProps: {
          width: '80%',
          title: title[type],
          maskClosable: false,
          fullscreen: true
        },
        // 事件回调
        methods: {
          refresh: () => {
            // row 这里标记有row就是编辑刷新当前 没有就是新增刷新到首页
            this.refresh()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
