<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-01-17 18:39:03
 * @LastEditors: Do not edit
 * @Description: 解决方案
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
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/COOPERATIVE_COMPANY`,
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
            { label: '合作伙伴名称', key: 'name' },
            { label: '企业类型', key: 'enterprise_type' },
            { label: '法人代表', key: 'legal_person' },
            { label: '注册资本', key: 'regi_capital' },
            { label: '工商注册号', key: 'regis_No' },
            { label: '组织机构代码', key: 'organization_code' },
            { label: '联系方式', key: 'phone' },
            { label: '地址', key: 'address' },
            {
              label: '官方网址',
              key: 'website',
              render: (h, parmas) => {
                const { row } = parmas
                return row.website ? (
                  <el-link href={row.website} target='_blank'>
                    {row.website}
                  </el-link>
                ) : null
              }
            },
            { label: '员工人数', key: 'employees' },
            { label: '经营业务', key: 'business' },
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
          width: '45%',
          customClass: 'fullscreen-flex',
          title: type ? '编辑合作伙伴' : '新增合作伙伴',
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
            url: `${process.env.VUE_APP_BASE_API_PREFIX}/COOPERATIVE_COMPANY/${id}`
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
