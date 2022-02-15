<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-15 09:48:30
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" v-loading="fetchLoading" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="设备名称"
            prop="equipment_id"
            :rules="rules.input"
          >
            <CuebSelectList
              v-model="form.equipment_id"
              :config="{
                keyCode: 'id',
                keyName: 'name',
                url: '/EQUIPMENT_MANAGEMENT/EQUIPMENT'
              }"
            >
              <template slot-scope="{ row }">
                <div class="flex-box">
                  <div class="flex-box-item">
                    名称：{{ row.name }}
                  </div>
                  <div class="flex-box-item">
                    编码：{{ row.code }}
                  </div>
                </div>
              </template>
            </CuebSelectList>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修状态" prop="maintain_state">
            <el-radio-group v-model="form.maintain_state">
              <el-radio :label="2">未修复</el-radio>
              <el-radio :label="1">已修复</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="故障时间" prop="fault_time">
            <el-date-picker
              v-model="form.fault_time"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修工程师" prop="maintain_engineer_name">
            <el-input v-model="form.maintain_engineer_name" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="维修时间" prop="maintain_time">
            <el-date-picker
              v-model="form.maintain_time"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配件更换" prop="mounting_change">
            <el-input v-model="form.mounting_change" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="故障原因" prop="fault_cause">
            <el-input
              v-model="form.fault_cause"
              placeholder="请输入"
              maxlength="150"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修结论" prop="maintain_report">
            <el-input
              v-model="form.maintain_report"
              placeholder="请输入"
              maxlength="150"
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
        equipment_id: '',
        fault_time: '', // 故障时间
        fault_cause: '', // 故障原因
        maintain_time: '', // 维修时间
        maintain_state: 2, // 维修状态 1:已修复 2：未修复
        maintain_report: '', // 维修结论
        mounting_change: '', // 配件更换
        maintain_engineer_name: '' // 维修工程师
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
      console.log(row)
      // row ? this.form.code = row.code : this.form.code = null
    },
    fetchDetail(id) {
      this.fetchLoading = true
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT_MAINTENANCE?id=${id}`,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        this.fetchLoading = false
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            Object.assign(this.form, Data[0])
          }
        }
      }).catch(() => {
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
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT_MAINTENANCE/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/EQUIPMENT_MANAGEMENT/EQUIPMENT_MAINTENANCE`,
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
