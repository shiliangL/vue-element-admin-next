<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-18 17:45:57
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form
    ref="form"
    v-loading="fetchLoading"
    :model="form"
    class="form fullscreen-flex-form"
    label-width="110px"
  >
    <div class="dialog-main">
      <div class="dialog-main-left">
        <el-row>
          <el-col :span="24">
            <el-form-item label="解决方案名称" prop="name" :rules="rules.input">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="解决方案类型"
              prop="legal_person"
              :rules="rules.input"
            >
              <el-input v-model="form.legal_person" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方法提供方" prop="regi_capital">
              {{ form.regi_capital }}
              <CuebSelectList v-model="form.regi_capital" :config="{rowKey:'credit_code'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案资料" prop="regis_No">
              <cubeUploadFile
                :limit="1"
                accept=".pdf"
                :file-list.sync="fileList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简介" prop="business">
              <el-input
                v-model="form.business"
                placeholder="请输入"
                maxlength="550"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button
        :loading="submitLoading"
        type="primary"
        @click="submit('form')"
      >确 定</el-button>
    </div>
  </el-form>
</template>

<script>
import rules from '@/mixProps/rules.js'
import CuebSelectList from '@/components/cueb-select-list'
import cubeUploadFile from '@/components/cube-upload-file'

export default {
  components: {
    CuebSelectList,
    cubeUploadFile
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
      point: null,
      fileList: [],
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      form: {
        name: '深圳日海物联技术有限公司',
        short_name: '日海物联',
        legal_person: '余明',
        status: '存续（在营、开业、在册）',
        address: '深圳市南山区南头街道大新路198号创新大厦B座1702室',
        regi_capital: [4],
        paid_in_capital: '-',
        credit_code: '91440300MA5EK4A02K',
        regis_no: '440300201383579',
        organization_code: 'MA5EK4A0-2',
        phone: '0755-26918985',
        enterprise_type: '有限责任公司（法人独资）',
        industry: '互联网和相关服务',
        regi_authority: '深圳市市场监督管理局',
        taxes: '一般纳税人',
        establish_date: '2017-06-08',
        website: 'www.sunseaiot.cn',
        filing_date: '2021-11-10',
        business_term: '2017-06-08 至 2037-06-07',
        employees: '50-99人',
        business: '',
        x: '114.077287',
        y: '22.69236'
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
    fetchDetail(id) {
      this.fetchLoading = true
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/SOLUTION/${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              Object.assign(this.form, Data[0])
              this.point = { lat: this.form.y, lng: this.form.x }
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
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/SOLUTION/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/SOLUTION`,
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

<style lang="scss">

</style>
