<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-20 15:55:47
 * @LastEditors: Do not edit
 * @Description:
-->

<template>

  <el-form
    ref="form"
    :model="form"
    class="form"
    label-width="110px"
  >
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="name" :rules="rules.input">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="type" :rules="rules.select">
            <CuebSelectList
              v-model="form.type"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=14'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号" prop="code" :rules="rules.input">
            <el-input v-model="form.code" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购时间" prop="purchase_time" :rules="rules.select">
            <el-date-picker v-model="form.purchase_time" class="w100p" value-format="yyyy-MM-dd" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备运行时间" prop="run_time" :rules="rules.input">
            <el-input v-model="form.run_time" placeholder="请输入">
              <template slot="append">h</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运行状态" prop="state" :rules="rules.select">
            <CuebSelectList
              v-model="form.state"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=10'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用区域" prop="area" :rules="rules.input">
            <el-input v-model="form.area" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产商" prop="manufacturer">
            <el-input v-model="form.manufacturer" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="模型编码" prop="c_code">
            <el-input v-model="form.c_code" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模型ID" prop="model_id">
            <el-input v-model="form.model_id" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="设备参数" prop="param">
            <el-input
              v-model="form.param"
              placeholder="请输入"
              maxlength="550"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10}"
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
        'name': '', // 设备名称
        'code': '', // 设备编码
        'c_code': '', // 模型id
        'type': null, // 设备类型
        'model_id': null,
        'area': '', // 区域
        'param': '', // 设备运行参数
        'run_time': 0, // 设备运行时间
        'manufacturer': '', // 厂商
        'purchase_time': null, // 采购时间
        'state': '1' // 状态
        // 'statename': ''
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT?id=${id}`,
        params: {
        }
      }).then((res) => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const form = Data[0]
            form.state = form.state ? form.state.toString() : '1'
            form.type = form.type ? form.type.toString() : null
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
            url: type ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT/${this.id}` : `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT`,
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
</style>
