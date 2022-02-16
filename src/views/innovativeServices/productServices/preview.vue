<!--

 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-16 16:32:08
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form
    ref="form"
    v-loading="fetchLoading"
    :model="form"
    class="form"
    label-width="120px"
  >
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="项目名称"
            prop="project_name"
          >
            <span> {{ form.project_name }} </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="项目编码"
            prop="project_code"
          >
            <span> {{ form.project_code }} </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位"
            prop="construction_unit"
          >
            <span> {{ form.construction_unit }} </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所在区域"
            prop="area"
          >
            <span> {{ form.area }} </span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目概况"
            prop="project_overview"
          >
            <span> {{ form.project_overview }} </span>
            <!-- <el-input
              v-model="form.project_overview"
              readonly
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            /> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="项目状态"
            prop="project_state"
          >
            项目状态
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="申请支持部门"
            prop="support_department"
          >
            <span> {{ form.support_department }} </span>
          </el-form-item>

        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目简介"
            prop="project_brief"
          >
            <span> {{ form.project_brief }} </span>
            <!-- <el-input
              v-model="form.project_brief"
              readonly
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            /> -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="参与人员"
            prop="personnel_ids"
          >
            {{ form.personnel_ids.length ? form.personnel_ids.toString() : '暂无' }}
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>

export default {
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
      fileList: [],
      form: {
        project_name: '',
        project_code: null,
        area: null, // 所在区域
        construction_unit: null, // 建设单位
        project_overview: null, // 项目概况
        project_state: null, // 项目状态 外键id=13
        project_brief: null, // 项目简介
        support_department: null, // 申请支持部门
        personnel_ids: [] // 項目參與人員
      }
    }
  },
  created() {
    const { id, type } = this
    // 传递类型为 1 的时候标记为加载详情-编辑
    if (type) {
      this.fetchDetail(id)
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchDetail(id) {
      this.fetchLoading = true
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT/${id}`
      }).then(res => {
        this.fetchLoading = false
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const form = Data[0]
            Object.assign(this.form, form)
          }
        }
      }).catch(() => {
        this.fetchLoading = false
      })
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT_PERSONNEL?project_id=${this.id}`
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const people = Message.Data || []
          this.form.personnel_ids = people.map(item => item.name)
        }
      }).catch(() => {
      })
    }
  }
}
</script>
