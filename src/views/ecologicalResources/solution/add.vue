<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-16 17:19:24
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
            <el-form-item
              label="解决方案名称"
              prop="name"
              :rules="rules.input"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="解决方案类型"
              prop="type"
              :rules="rules.select"
            >
              <CuebSelectList
                v-model="form.type"
                :config="{
                  keyCode: 'dict_value',
                  keyName: 'dict_name',
                  url: '/ShenZhenTelecom/ENUM?id=9'
                }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="24">
          <el-form-item
            label="方案提供方"
            prop="personnel_ids"
          >
            <el-alert
              v-if="!form.id"
              title="新增完成后可以补充合作伙伴作为方案提供方"
              type="warning"
              :closable="false"
            />
            <CuebSelectList
              v-else
              v-model="form.personnel_ids"
              class="w100p"
              :config="{
                multiple: true,
                keyCode: 'id',
                keyName: 'name',
                url: '/COOPERATIVE_PARTNER/COOPERATIVE'
              }"
            />
          </el-form-item>
        </el-col>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="方案资料"
              prop="regis_No"
            >
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
            <el-form-item
              label="简介"
              prop="brief_introduction"
            >
              <el-input
                v-model="form.brief_introduction"
                placeholder="请输入"
                maxlength="1550"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10 }"
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
        name: '',
        type: null,
        accessory_path: null, // 附件路径
        photo_path: null, // 附件路径
        brief_introduction: null, // 简介
        personnel_ids: []
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
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          if (Array.isArray(Data) && Data.length) {
            const form = Data[0] || {}
            // form.type = form.type ? form.type.toString() : ''
            Object.assign(this.form, form)
            if (this.form.accessory_path) {
              this.fileList = [{ url: this.form.accessory_path, name: '附件.pdf' }]
            }
          }
        }
      }).catch(() => {
        this.fetchLoading = false
      })

      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/BATCH_ADD_SOLUTION_COOPERATIVE?solution_id=${this.id}`
      }).then(res => {
        this.fetchLoading = false
        const { Success, Message } = res
        if (Success) {
          const people = Message.Data || []
          this.form.personnel_ids = people.map(item => item.id)
        }
      }).catch(() => {
        this.fetchLoading = false
      })
    },
    linkPeople2Project() {
      const { id, personnel_ids } = this.form
      const params = {
        'solution_id': id,
        'cooperative_list': personnel_ids
      }
      this.$request({
        method: 'POST',
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/BATCH_ADD_SOLUTION_COOPERATIVE/${this.id}`,
        data: params
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
    },
    submit(formName) {
      if (!this.fileList.length) {
        this.$message({ message: '请上传附件资料', type: 'warning' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const { fileList } = this
          const file = fileList[0]
          this.form.accessory_path = file.url
          const params = JSON.parse(JSON.stringify(this.form))
          delete params.personnel_ids
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/SOLUTION/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/SOLUTION/SOLUTION`,
            data: params || stringify({ ...params })
          }).then(res => {
            const { Success } = res
            if (Success) {
              if (params.id) {
                this.linkPeople2Project()
              } else {
                this.submitLoading = false
                this.$emit('refresh')
                this.$emit('close')
                this.$message.success('操作成功')
              }
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

<style lang="scss"></style>
