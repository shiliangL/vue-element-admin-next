<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-16 16:05:02
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
        <el-col :span="24">
          <el-form-item
            label="授权名称"
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
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="照片"
            prop="img_path"
          >
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

export default {
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
        img_path: null // 专家照片路径
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/AUTHORIZE_THE_WALL/${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              const form = Data[0]
              if (form.img_path) {
                this.fileList = [{ url: form.img_path, name: '培训主图.png' }]
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
          params.img_path = file.url
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/AUTHORIZE_THE_WALL/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/AUTHORIZE_THE_WALL`,
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
