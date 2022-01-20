<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-20 16:16:35
 * @LastEditors: Do not edit
 * @Description: 实验室仪器管理
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item label="仪器名称" prop="name" :rules="rules.input">
            <el-input v-model.trim="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仪器编码" prop="code" :rules="rules.input">
            <el-input v-model.trim="form.code" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="仪器类型" prop="type" :rules="rules.input">
            <el-input v-model.trim="form.type" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仪器厂家" prop="manufacturer" :rules="rules.input">
            <el-input v-model.trim="form.manufacturer" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="型号参数"
            prop="model_param"
          >
            <el-input
              v-model.trim="form.model_param"
              placeholder="请输入"
              maxlength="450"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="使用时长" prop="use_time">
            <el-input-number v-model.number="form.use_time" class="w100p" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模型ID" prop="model_id">
            <el-input v-model.trim="form.model_id" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="是否校准" prop="is_calibration">
            <el-radio-group v-model.trim="form.is_calibration">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否维修" prop="is_maintain">
            <el-radio-group v-model.trim="form.is_maintain">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
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
        name: '', //  '仪器名称',
        code: '', //  '仪器编号',
        type: '', //  '仪器类型',
        manufacturer: '', //  '仪器厂家',
        model_param: '', //  '型号参数',
        use_time: 0, //  '使用时长',
        model_id: '', //  '模型ID',
        is_calibration: 0, //  '是否校准',
        is_maintain: 1, //  '是否维修',

        maintain_record: '' // 维修记录
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
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPARATUS?id=${id}`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const form = Data[0] || {}
            form.is_maintain = form.is_maintain ? 1 : 0
            form.is_calibration = form.is_calibration ? 1 : 0
            Object.assign(this.form, form)
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
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPARATUS/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPARATUS`,
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
          }).catch(() => {
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
  .flex-box-item {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
