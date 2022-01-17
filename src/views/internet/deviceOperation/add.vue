<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-17 18:10:20
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="name" :rules="rules.input">
            <el-input v-model="form.name" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备编号" prop="code" :rules="rules.input">
            <el-input v-model="form.code" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="运行时间" prop="run_time">
            <el-input v-model="form.run_time" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运行状态" prop="state">
            <el-select v-model="form.state" placeholder="请选择" class="w100p">
              <el-option label="" value="在线" />
              <el-option label="离线" value="离线" />
              <el-option label="故障" value="故障" />
            </el-select>
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
        name: '透明屏幕',
        code: 'CT440300TMP000001',
        state: '在线',
        run_time: '18000h'
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
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_STATUS_MONITOR/${id}`,
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
              ? `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_STATUS_MONITOR/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIX}/EQUIPMENT_STATUS_MONITOR`,
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
