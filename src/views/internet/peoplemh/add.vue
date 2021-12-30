<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2021-12-30 19:42:03
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
            label="人员名称"
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
            label="身份证"
            prop="idcard"
          >
            <el-input
              v-model="form.idcard"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="国籍"
            prop="nationality"
          >
            <el-input
              v-model="form.nationality"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="民族"
            prop="nation"
          >
            <el-input
              v-model="form.nation"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="gender"
          >
            <el-radio-group v-model="form.gender">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="户籍类型"
            prop="property"
          >
            <el-input
              v-model="form.property"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="政治面貌"
            prop="status"
          >
            <el-radio-group v-model="form.status">
              <el-radio label="群众" />
              <el-radio label="党员" />
            </el-radio-group>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="教育背景"
            prop="edu_degree"
          >
            <el-select
              v-model="form.edu_degree"
              class="w100p"
              placeholder="请选择活动区域"
            >
              <el-option
                label="其他"
                value="其他"
              />
              <el-option
                label="初中"
                value="初中"
              />
              <el-option
                label="高中"
                value="高中"
              />
              <el-option
                label="专科"
                value="专科"
              />
              <el-option
                label="本科"
                value="本科"
              />
              <el-option
                label="硕士"
                value="硕士"
              />
            </el-select>

          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="毕业院校"
            prop="school"
          >
            <el-input
              v-model="form.school"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="教育背景"
            prop="专业"
          >
            <el-input
              v-model="form.major"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="居住地址"
            prop="live_address"
          >
            <el-input
              v-model="form.live_address"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="从事行业"
            prop="industry"
          >
            <el-input
              v-model="form.industry"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="职称"
            prop="title"
          >
            <el-input
              v-model="form.title"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="工作职位"
            prop="work_position"
          >
            <el-input
              v-model="form.work_position"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="工作地址"
            prop="work_address"
          >
            <el-input
              v-model="form.work_address"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="工作单位"
            prop="work_unit"
          >
            <el-input
              v-model="form.work_unit"
              placeholder="请输入"
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
        'name': '',
        'idcard': '',
        'nationality': '',
        'nation': '',
        'gender': '',
        'birthday': '',
        'property': '',
        'local': '',
        'status': '',
        'marriage': '',
        'edu_degree': '',
        'school': '',
        'major': '',
        'industry': '',
        'title': '',
        'native_address': '',
        'work_unit': '',
        'work_position': '',
        'bld_name': '',
        'bld_code': '',
        'live_address': '',
        'work_address': ''
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
        url: `${window.VUE_APP_BASE_API_PREFIX}/PERSONNEL_INFORMATION/${id}`,
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
            url: type ? `${window.VUE_APP_BASE_API_PREFIX}/PERSONNEL_INFORMATION/${this.id}` : `${window.VUE_APP_BASE_API_PREFIX}/PERSONNEL_INFORMATION`,
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
