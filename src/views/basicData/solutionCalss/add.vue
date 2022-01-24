<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-24 15:23:46
 * @LastEditors: Do not edit
 * @Description: 数据字典配置
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="dict_name" :rules="rules.input">
            <el-input v-model.trim="form.dict_name" placeholder="请输入" />
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
    },
    dictType: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      form: {
        'dict_type': '',
        'dict_name': '',
        'dict_value': ''
      }
    }
  },
  created() {
    const { id, type } = this
    // 传递类型为 1 的时候标记为加载详情-编辑
    if (type) {
      this.fetchDetail(id)
    } else {
      this.fetchTargetMax()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchTargetMax() {
      // 获取这个字段类型最大的值然后新增的时候 + 1
      const { dictType } = this
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/VALUE_MAX?dict_type=${dictType}`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const result = Data[0] || {}
            this.dict_value_max = result.dict_value + 1
          }
        }
      })
    },
    fetchDetail() {
      const { dictType, id } = this
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/DICT_DATA?dict_type=${dictType}&id=${id}`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const form = Data[0] || {}
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
          const { type, dictType, dict_value_max } = this // 如果 type 为true 则为编辑
          if (!type) {
            params.dict_type = dictType
            params.dict_value = dict_value_max
          }
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/DICT_DATA?dict_type=${dictType}&id=${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/ShenZhenTelecom/DICT_DATA?dict_type=${dictType}&id=${this.id}`,
            data: stringify({ ...params })
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

<style lang="scss" scoped>
.base-info {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  .el-row {
    flex: 1;
  }
}
</style>
