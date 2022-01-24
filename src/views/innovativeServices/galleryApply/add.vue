<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-24 15:52:23
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

      <el-row style="height: 64px;">
        <el-col :span="12">
          <el-form-item label="" :rules="rules.input" prop="is_cooperative">
            <el-checkbox v-model="form.is_cooperative">
              是否是合作伙伴
            </el-checkbox>
          </el-form-item>
        </el-col>
        <el-col v-if="form.is_cooperative" :span="12">
          <el-form-item label="企业名称" prop="enterprise_id" :rules="rules.select">
            <CuebSelectList
              v-model="form.enterprise_id"
              class="w100p"
              :config="{
                keyCode: 'id',
                keyName: 'name',
                url: '/COOPERATIVE_PARTNER/COOPERATIVE'
              }"
              @select="cuebSelectChange"
            />
          </el-form-item>
        </el-col>
        <el-col v-else :span="12">
          <el-form-item label="企业名称" prop="enterprise_name" :rules="rules.input">
            <el-input
              v-model="form.enterprise_name"
              placeholder="请输入"
              maxlength="550"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="部门名称"
            :rules="rules.input"
            prop="department_name"
          >
            <el-input
              v-model="form.department_name"
              placeholder="请输入"
              maxlength="550"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户经理"
            :rules="rules.input"
            prop="customer_manager"
          >
            <el-input
              v-model="form.customer_manager"
              placeholder="请输入"
              maxlength="550"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="项目经理"
            :rules="rules.input"
            prop="project_manager"
          >
            <el-input
              v-model="form.project_manager"
              placeholder="请输入"
              maxlength="550"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入"
              maxlength="550"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="预约时间"
            prop="appointment_time"
            :rules="rules.select"
          >
            <el-date-picker
              v-model="form.appointment_time"
              type="datetime"
              class="w100p"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属区划" prop="city_area" :rules="rules.input">
            <CuebSelectList
              v-model="form.city_area"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=17'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="来访人员" prop="visitors" :rules="rules.input">
            <el-input
              v-model="form.visitors"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="人员情况"
            prop="staff_profile"
            :rules="rules.input"
          >
            <el-input
              v-model="form.staff_profile"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="行业/领域" prop="domain" :rules="rules.input">
            <CuebSelectList
              v-model="form.domain"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=16'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="商机情况" prop="business_situation">
            <el-input
              v-model="form.business_situation"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主要了解方面" prop="know_content">
            <el-input
              v-model="form.know_content"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="" prop="is_visit_cim">
            <el-checkbox
              v-model="form.is_visit_cim"
            >是否参观圳·智慧</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
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
