<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-02-15 15:22:18
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
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name" :rules="rules.input">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社会信用代码" prop="code" :rules="rules.input">
              <el-input v-model="form.code" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="简称" prop="short_name">
              <el-input v-model="form.short_name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人" prop="legal_person">
              <el-input v-model="form.legal_person" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册资本" prop="regi_capital">
              <el-input v-model="form.regi_capital" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实缴资本" prop="paid_in_capital">
              <el-input v-model="form.paid_in_capital" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入" />
            </el-form-item>
            <!-- <el-form-item label="状态" prop="status">
              <el-input v-model="form.status" placeholder="请输入" />
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司logo" prop="enterprise_img_path">
              <!-- form.enterprise_img_path -->
              <cubeUploadFile
                :limit="1"
                accept=".jpg, .jpeg, .png"
                :file-list.sync="fileList"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业类型" prop="enterprise_type">
              <el-input v-model="form.enterprise_type" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="官网地址" prop="website">
              <el-input v-model="form.website" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备案日期" prop="filing_date">
              <el-date-picker
                v-model="form.filing_date"
                type="date"
                class="w100p"
                value-format="yyyy-MM-dd"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="经营期限" prop="business_term">
              <!-- <el-date-picker
                v-model="form.business_term"
                type="daterange"
                class="w100p"
                value-format="yyyy-MM-dd"
                placeholder="请输入"
              />
            </el-form-item> -->
              <el-input v-model="form.business_term" placeholder="请输入" />
            </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="员工人数" prop="employees">
              <el-input v-model="form.employees" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="纳税人资质" prop="taxes">
              <el-input v-model="form.taxes" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立日期" prop="establish_date">
              <el-date-picker
                v-model="form.establish_date"
                type="date"
                class="w100p"
                value-format="yyyy-MM-dd"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="企业简介" prop="enterprise_profile">
              <el-input
                v-model="form.enterprise_profile"
                placeholder="请输入"
                maxlength="550"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="经营业务" prop="business">
              <el-input
                v-model="form.business"
                placeholder="请输入"
                maxlength="550"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-main-left mapbox">
        <cubeBmapDraw :point.sync="point" @change="cubeBmapDrawChange" />
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
import cubeUploadFile from '@/components/cube-upload-file'
import cubeBmapDraw from '@/components/cube-bmap-draw'
import { bd09towgs84 } from '@/utils/converter'

export default {
  components: {
    cubeBmapDraw,
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
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      fileList: [],
      form: {
        name: '',
        c_code: null,
        code: '',
        short_name: '',
        legal_person: ' ',
        status: '',
        address: '',
        regi_capital: '',
        paid_in_capital: '',
        credit_code: '',
        organization_code: '-',
        phone: '',
        enterprise_type: '',
        industry: '',
        regi_authority: null,
        taxes: '一般纳税人',
        establish_date: '',
        website: '',
        filing_date: null,
        business_term: null,
        employees: '',
        business: null,
        enterprise_img_path: null,
        enterprise_label: null,
        enterprise_profile: null,
        core_competence: null,
        x: null,
        y: null
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/COOPERATIVE_PARTNER/COOPERATIVE?id=${id}`,
        params: {}
      })
        .then(res => {
          this.fetchLoading = false
          const { Success, Message } = res
          if (Success) {
            const { Data } = Message || {}
            if (Array.isArray(Data) && Data.length) {
              Object.assign(this.form, Data[0])
              this.point = { lat: this.form.y, lng: this.form.x }
              // this.point = { lat: this.form.lat, lng: this.form.lng }
              if (this.form.enterprise_img_path) {
                this.fileList = [{ url: this.form.enterprise_img_path, name: '企業logo.png' }]
              }
            }
          }
        })
        .catch(() => {
          this.fetchLoading = false
        })
    },
    submit(formName) {
      // 图片和坐标必须
      if (!this.point) {
        this.$message({ message: '请在地图上标出位置信息', type: 'warning' })
        return
      }
      if (!this.fileList.length) {
        this.$message({ message: '请上传企业LOGO', type: 'warning' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const { fileList, point } = this
          const file = fileList[0]
          this.form.enterprise_img_path = file.url
          this.form.x = point.lng
          this.form.y = point.lat
          // 百度转ws84
          const ws84 = bd09towgs84(point.lng, point.lat)
          this.form.lat = ws84[0]
          this.form.lng = ws84[1]
          const params = JSON.parse(JSON.stringify(this.form))
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/COOPERATIVE_PARTNER/COOPERATIVE/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/COOPERATIVE_PARTNER/COOPERATIVE?isdebugger=true`,
            data: stringify({
              ...params
            })
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
    },
    cubeBmapDrawChange(point) {
      if (!point) {
        this.form.address = null
        return
      }
      const gc = new BMapGL.Geocoder()
      const p = new BMapGL.Point(point.lng, point.lat)
      gc.getLocation(p, res => {
        if (!res) return
        console.log(res)
        const address =
          Array.isArray(res.surroundingPois) && res.surroundingPois.length
            ? res.surroundingPois[0]
            : res.address
        this.form.address = address.title
      })
    }
  }
}
</script>

<style lang="scss">
</style>
