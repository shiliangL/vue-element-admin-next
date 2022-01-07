<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-05 11:41:27
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="24">
          <el-form-item label="来访时间" prop="visiting_date" :rules="rules.select">
            <el-date-picker
              v-model="form.visiting_date"
              type="datetime"
              class="w100p"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="来访客户" prop="visiting_people" :rules="rules.input">
            <el-input
              v-model="form.visiting_people"
              placeholder="请输入"
              maxlength="550"
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
            prop="people_detail"
            :rules="rules.input"
          >
            <el-input
              v-model="form.people_detail"
              placeholder="请输入"
              maxlength="550"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="行业/领域" prop="industry" :rules="rules.input">
            <el-input v-model="form.industry" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户经理" :rules="rules.input" prop="cm">
            <el-input v-model="form.cm" placeholder="请输入" maxlength="550" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理" :rules="rules.input" prop="pm">
            <el-input v-model="form.pm" placeholder="请输入" maxlength="550" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="others">
            <el-input v-model="form.others" placeholder="请输入" maxlength="550" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="部门名称" prop="department">
            <el-input v-model="form.department" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主要了解方面" prop="purpose">
            <el-input
              v-model="form.purpose"
              placeholder="请输入"
              maxlength="550"
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

export default {
  components: {},
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
        visiting_date: null,
        department: '',
        industry: '',
        visiting_people: '',
        people_detail: '',
        people_department: '',
        cm: '',
        pm: '',
        email: '',
        purpose: '',
        isdoc: '',
        detail: null,
        others: ''
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
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
      )
    },
    fetchDetail(id) {
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT/${id}`,
        params: {}
      }).then(res => {
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
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT`,
            data: stringify({ ...params })
          }).then(res => {
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

<style lang="scss" scoped></style>
