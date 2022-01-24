<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-24 17:54:20
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <div class="fullscreen-flex-form">
    <el-tabs v-model="activeName" class="fullscreen-flex-form-tabs">
      <el-tab-pane label="预约详情" name="0" />
      <el-tab-pane label="人员登记" name="1" />
      <el-tab-pane label="参观资料" name="2" />
      <el-tab-pane label="持续跟踪" name="3" />
    </el-tabs>
    <div class="fullscreen-flex-form-main">
      <ViewMorePageTable :id="id" :show-type="activeNameStr2Numbar" />
    </div>
  </div>
</template>

<script>

import ViewMorePageTable from './viewMorePageTable.vue'

export default {
  components: {
    ViewMorePageTable
  },
  props: {
    id: {
      type: [String, Number],
      default: () => ''
    },
    type: {
      type: [String, Number],
      default: () => ''
    }
  },
  data() {
    return {
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      activeName: '0',
      form: {
        is_cooperative: true,
        department_name: '', // 部门名称
        customer_manager: '', // 客户经理
        project_manager: '', // 项目经理
        appointment_time: '', // '预约时间'
        enterprise_name: '', // '企业名称'
        enterprise_id: '', // '企业code'
        visitors: '', // 来访人员
        staff_profile: '', // 人员情况
        domain: '', // 行业/领域；对应字典
        email: '', // 邮箱
        know_content: '', // 主要了解方面
        communication_materials: '', // 交流材料
        communication_materials_path: '', // 交流材料附件
        business_situation: '', // 商机情况
        is_visit_cim: true, // 是否参观cim
        city_area: '', // 区划
        remark: '' // 备注
      }
    }
  },
  computed: {
    activeNameStr2Numbar() {
      return this.activeName * 1
    }
  },
  created() {
    const { id, type } = this
    // 传递类型为 1 的时候标记为加载详情-编辑
    if (type) this.fetchDetail(id)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    cuebSelectChange(row) {
      if (row) {
        this.form.enterprise_name = row.name
      } else {
        this.form.enterprise_name = ''
      }
    },
    fetchDetail(id) {
      this.fetchLoading = true
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/APPOINTMENT/${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              const form = Data[0]
              form.is_visit_cim = !!form.is_visit_cim
              form.is_cooperative = !!form.is_cooperative
              Object.assign(this.form, Data[0])
            }
          }
        })
        .catch(() => {
          this.fetchLoading = false
        })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          params.is_visit_cim = params.is_visit_cim ? 1 : 0
          params.is_cooperative = params.is_cooperative ? 1 : 0
          params.enterprise_id = !params.is_cooperative
            ? null
            : params.enterprise_id
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/APPOINTMENT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/APPOINTMENT`,
            data: params || stringify({ ...params })
          })
            .then(res => {
              const { Success } = res
              if (Success) {
                this.submitLoading = false
                this.$emit('refresh')
                this.$emit('close')
                this.$message.success('操作成功')
              } else {
                this.$message.error('操作失败')
                this.submitLoading = false
              }
            })
            .catch(() => {
              this.submitLoading = false
            })
        } else {
          this.$message({ message: '请核实表单', type: 'warning' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
