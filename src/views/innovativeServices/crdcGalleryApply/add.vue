<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-07 15:52:57
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约单位" prop="department" :rules="rules.input">
            <el-input v-model="form.department" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="时间范围" prop="timeRang" :rules="rules.select">
            <el-date-picker
              v-model="form.timeRang"
              class="w100p"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约人数" prop="people" :rules="rules.input">
            <el-input-number
              v-model="form.people"
              class="w100p"
              :min="1"
              :max="9999"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="预约内容" prop="detail">
            <el-input
              v-model="form.detail"
              placeholder="请输入"
              maxlength="550"
              show-word-limit
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
import { isArray } from '@/utils/validate'

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
        detail: '',
        department: '',
        timeRang: [
          this.$dayjs().format('YYYY-MM-DD'),
          this.$dayjs().format('YYYY-MM-DD')
        ],
        start_time: '',
        end_time: '',
        people: 0
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
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/LAB_APPOINTMENT/${id}`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const data = Data[0]
            const start = data.start_time
              ? this.$dayjs(data.start_time).format('YYYY-MM-DD')
              : ''
            const end = data.end_time
              ? this.$dayjs(data.end_time).format('YYYY-MM-DD')
              : ''
            data.timeRang = start ? [start, end] : []
            Object.assign(this.form, data)
          }
        }
      })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          if (isArray(params.timeRang) && params.timeRang.length) {
            params.start_time = params.timeRang[0]
            params.end_time = params.timeRang[1]
            delete params.timeRang
          }
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIX}/LAB_APPOINTMENT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIX}/LAB_APPOINTMENT`,
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
