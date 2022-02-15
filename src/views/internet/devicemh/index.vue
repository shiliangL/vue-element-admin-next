<!--
 * @Author: shiliangL
 * @Date: 2021-12-27 16:11:17
 * @LastEditTime: 2022-02-14 10:19:53
 * @LastEditors: Do not edit
 * @Description: 设备管理
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/FIND_EQUIPMENT`,
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
            { label: '设备名称', key: 'name' },
            { label: '设备编号', key: 'code' },
            { label: '设备类型', key: 'typename' },
            { label: '模型编码', key: 'c_code' },
            { label: '模型ID', key: 'model_id' },
            { label: '使用区域', key: 'area' },
            { label: '采购时间', key: 'purchase_time' },
            {
              label: '运行状态',
              key: 'state',
              render: (h, parmas) => {
                const { row } = parmas
                const mapDesc = [
                  {
                    dict_name: '在线',
                    dict_value: '1',
                    type: ''
                  },
                  {
                    dict_name: '离线',
                    dict_value: '2',
                    type: 'warning'
                  },
                  {
                    dict_name: '故障',
                    dict_value: '3',
                    type: 'danger'
                  }
                ]
                const desc = mapDesc.find(
                  item => item.dict_value * 1 === row.state
                )
                return (
                  <el-tag size='small' type={desc ? desc.type : ''}>
                    {desc ? desc.dict_name : ''}
                  </el-tag>
                )
              }
            },
            {
              label: '运行时间',
              key: 'run_time',
              render: (h, parmas) => {
                const { row } = parmas
                return <span> {row.run_time}h </span>
              }
            },
            { label: '生产商', key: 'manufacturer' },
            {
              label: '设备参数',
              key: 'param',
              width: 450,
              render: (h, parmas) => {
                const { row } = parmas
                return <span autoresize max-lines={3}>{row.param}</span>
              }
            },
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
            url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT/${id}`
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
