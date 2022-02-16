<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-15 16:05:37
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

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="培训名称"
            prop="name"
            :rules="rules.input"
          >
            <el-input
              v-model="form.name"
              class="w100p"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="主讲人"
            prop="lecturer"
            :rules="rules.input"
          >
            <el-input
              v-model="form.lecturer"
              class="w100p"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="主讲人简介"
            prop="lecturer_info"
            :rules="rules.input"
          >
            <el-input
              v-model="form.lecturer_info"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="培训简介"
            prop="cultivate_synopsis"
            :rules="rules.input"
          >
            <el-input
              v-model="form.cultivate_synopsis"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10 }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="培训类型"
            prop="type"
            :rules="rules.select"
          >
            <CuebSelectList
              v-model="form.type"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=18'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="培训时间"
            prop="time"
            :rules="rules.select"
          >
            <el-date-picker
              v-model="form.time"
              type="datetime"
              class="w100p"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="培训状态"
            prop="state"
            :rules="rules.select"
          >
            <CuebSelectList
              v-model="form.state"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=12'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="累计观看人数"
            prop="view_number"
            :rules="rules.select"
          >
            <el-input-number
              v-model="form.view_number"
              class="w100p"
              placeholder="请输入"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="培训主图"
            prop="home_page_path"
          >
            <!-- form.home_page_path -->
            <cubeUploadFile
              :limit="1"
              accept=".jpg, .jpeg, .png"
              :file-list.sync="fileList"
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
      fileList: [],
      form: {
        name: '',
        type: 1,
        time: null,
        lecturer: null, // 主讲人
        lecturer_info: null, // 主讲人信息
        cultivate_synopsis: null, // 培训简介
        view_number: 10, // 累计观看人数
        home_page_path: null, // 主页图片路径
        resource_path: null, // 资料路径
        playback_path: null, // 回放路径
        state: 1 // 培训状态
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/CULTIVATE_ENERGIZE/TRAINING_CAN_ASSIGN/${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              const form = Data[0]
              if (form.home_page_path) {
                this.fileList = [{ url: form.home_page_path, name: '培训主图.png' }]
              }
              if (form.time) form.time = form.time.replace(/T/g, ' ')
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
          const { fileList } = this
          if (!fileList.length) {
            this.$message({ message: '请上传培训主图', type: 'warning' })
            return
          }
          const file = fileList[0]
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(this.form))
          params.home_page_path = file.url
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/CULTIVATE_ENERGIZE/TRAINING_CAN_ASSIGN/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/CULTIVATE_ENERGIZE/TRAINING_CAN_ASSIGN`,
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
