<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-20 18:32:45
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
          <el-form-item
            label="企业名称"
            prop="enterprise_id"
            :rules="rules.select"
          >
            <CuebSelectList
              v-model="form.enterprise_id"
              class="w100p"
              :config="{
                keyCode: 'id',
                keyName: 'name',
                url: '/COOPERATIVE_PARTNER/COOPERATIVE'
              }"
              @select="selectCuebSelect"
            />
          </el-form-item>
        </el-col>
        <el-col v-else :span="12">
          <el-form-item
            label="企业名称"
            prop="enterprise_name"
            :rules="rules.input"
          >
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
            label="预约时间"
            prop="appointment_time"
            :rules="rules.select"
          >
            <el-date-picker
              v-model="form.appointment_time"
              type="daterange"
              class="w100p"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <!-- value-format="yyyy-MM-dd HH:mm:ss" -->
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
        <el-col :span="12">
          <el-form-item label="预约人数" prop="number" :rules="rules.input">
            <el-input-number
              v-model="form.number"
              class="w100p"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="预约仪器"
            prop="apparatu_ids"
            :rules="rules.input"
          >
            <CuebSelectList
              v-model="form.apparatu_ids"
              class="w100p"
              :config="{
                multiple: true,
                keyCode: 'id',
                keyName: 'name',
                url: '/RD_SERVER/APPARATUS'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
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
          <el-form-item label="预约内容" prop="content">
            <el-input
              v-model="form.content"
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
import { guid } from '@/utils/index'
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
        id: '',
        is_cooperative: true,
        number: 10, // 预约人数
        content: '', // 预约内容
        appointment_time: null, // '预约时间'
        enterprise_name: '', // '企业名称'
        enterprise_id: '', // '企业code'
        domain: '', // 行业/领域；对应字典
        city_area: '', // 区划
        apparatu_ids: [] // 预约仪器
      }
    }
  },
  created() {
    const { id, type } = this
    // 传递类型为 1 的时候标记为加载详情-编辑
    if (type) {
      this.fetchDetail(id)
      this.fetchDetai2evice(id)
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    selectCuebSelect(row) {
      this.form.enterprise_name = row ? row.name : ''
    },
    fetchDetail(id) {
      this.fetchLoading = true
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT/${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              const form = Data[0]
              form.is_cooperative = !!form.is_cooperative
              if (form.start_time && form.end_time) {
                form.appointment_time = [form.start_time, form.end_time]
              }
              Object.assign(this.form, Data[0])
            }
          }
        })
        .catch(() => {
          this.fetchLoading = false
        })
    },
    // 获取相关仪器
    fetchDetai2evice(id) {
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPARATUE_BY_APPOINTMENT_ID?appointment_id=${id}`,
        params: {}
      })
        .then(res => {
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              console.log(Data, '-Data-')
              const ids = Data.map(item => item.id) || []
              this.form.apparatu_ids = ids
            }
          }
        })
        .catch(() => {
        })
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          params.id = !params.id ? guid() : params.id
          params.is_cooperative = params.is_cooperative ? 1 : 0
          params.enterprise_id = !params.is_cooperative
            ? ''
            : params.enterprise_id
          if (
            Array.isArray(params.appointment_time) &&
            params.appointment_time.length
          ) {
            params.start_time = params.appointment_time[0]
            params.end_time = params.appointment_time[1]
            delete params.appointment_time
          } else {
            this.$message({ message: '预约时间参数处理异常', type: 'warning' })
            return
          }
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT`,
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
