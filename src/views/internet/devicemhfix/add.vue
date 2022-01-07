<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2021-12-30 19:59:09
 * @LastEditors: Do not edit
 * @Description:
-->

<template>

  <el-form
    ref="form"
    :model="form"
    class="form"
    label-width="96px"
  >
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="设备名称"
            prop="name"
            :rules="rules.input"
          >
            <el-input
              v-model="form.name"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="设备编码"
            prop="code"
          >
            <el-input
              v-model="form.code"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="故障时间"
            prop="malfunction_date"
          >
            <el-date-picker
              v-model="form.malfunction_date"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="维修工程师"
            prop="engineer"
          >
            <el-input
              v-model="form.engineer"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="维修时间"
            prop="maintenance_date"
          >
            <el-date-picker
              v-model="form.maintenance_date"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="故障原因"
            prop="malfunction_reason"
          >
            <el-input
              v-model="form.malfunction_reason"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="配件更换"
            prop="parts_replacement"
          >
            <el-input
              v-model="form.parts_replacement"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="维修结论"
            prop="manufacturer"
          >
            <el-input
              v-model="form.maintenance_report"
              placeholder="请输入"
              maxlength="150"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 10}"
            />
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

export default {
  components: {

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
      form: {
        'name': null,
        'code': null,
        'malfunction_date': null,
        'maintenance_date': null,
        'malfunction_reason': null,
        'maintenance_result': null,
        'maintenance_report': null,
        'parts_replacement': null,
        'engineer': null
      }
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
    guid() {
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    fetchDetail(id) {
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_MAINTENANCE_RECORDS/${id}`,
        params: {
        }
      }).then((res) => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            Object.assign(this.form, Data[0])
          }
        }
      })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type ? `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_MAINTENANCE_RECORDS/${this.id}` : `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_MAINTENANCE_RECORDS`,
            data: stringify({ ...params })
          }).then((res) => {
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
        } else {
          this.$message({ message: '请核实表单', type: 'warning' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
