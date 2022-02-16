<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-16 14:31:26
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
            :rules="rules.input"
          >
            <el-input
              v-model="form.project_name"
              class="w100p"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="项目编码"
            :rules="rules.input"
            prop="project_code"
          >
            <el-input
              v-model="form.project_code"
              class="w100p"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位"
            prop="construction_unit"
            :rules="rules.input"
          >
            <el-input
              v-model="form.construction_unit"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所在区域"
            prop="area"
            :rules="rules.input"
          >
            <el-input
              v-model="form.area"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目概况"
            prop="project_overview"
            :rules="rules.input"
          >
            <el-input
              v-model="form.project_overview"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="项目状态"
            prop="project_state"
            :rules="rules.select"
          >
            <CuebSelectList
              v-model="form.project_state"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=13'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="申请支持部门"
            prop="support_department"
            :rules="rules.select"
          >
            <el-input
              v-model="form.support_department"
              placeholder="请输入"
            />
          </el-form-item>

        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目简介"
            prop="project_brief"
            :rules="rules.input"
          >
            <el-input
              v-model="form.project_brief"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="参与人员"
            prop="personnel_ids"
            :rules="!form.id ? null : rules.input"
          >
            <el-alert
              v-if="!form.id"
              title="新增项目完成后补充参与人员"
              type="warning"
              :closable="false"
            />
            <CuebSelectList
              v-else
              v-model="form.personnel_ids"
              class="w100p"
              :config="{
                multiple: true,
                keyCode: 'id',
                keyName: 'name',
                url: '/STAFF_MANAGEMENT/FIND_PERSONNEL'
              }"
            >
              <template slot-scope="{ row }">
                <div class="flex-box">
                  <div
                    class="flex-box-item-name"
                    v-text="row.name"
                  />
                  <div
                    class="flex-box-item"
                    v-text="row.org_name"
                  />
                </div>
              </template>
            </CuebSelectList>
          </el-form-item>
        </el-col>
      </el-row>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">取 消</el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          @click="submit('form')"
        >确 定</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>

import rules from '@/mixProps/rules.js'
import CuebSelectList from '@/components/cueb-select-list'

export default {
  components: {
    CuebSelectList
  },
  mixins: [rules],
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
          this.form.personnel_ids = people.map(item => item.id)
        }
      }).catch(() => {
      })
    },
    linkPeople2Project() {
      const { id, personnel_ids } = this.form
      const params = {
        'project_id': id,
        'personnel_ids': personnel_ids
      }
      this.$request({
        method: 'POST',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT_PERSONNEL/${this.id}`,
        data: params
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
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          delete params.personnel_ids
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/PROJECT_SUPPORT/PROJECT`,
            data: params || stringify({ ...params })
          })
            .then(res => {
              const { Success } = res
              if (Success) {
                if (params.id) {
                  this.linkPeople2Project()
                } else {
                  this.submitLoading = false
                  this.$emit('refresh')
                  this.$emit('close')
                  this.$message.success('操作成功')
                }
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

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
  .flex-box-item-name{
    min-width: 90px;
    max-width: 140px;
  }
  .flex-box-item {
    // flex: 1;
    margin-left: 10px;
  }
}
</style>
