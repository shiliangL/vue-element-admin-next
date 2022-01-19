<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-19 17:26:55
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="96px">
    <div class="base-info">
      <el-row>
        <el-col :span="12">
          <el-form-item label="人员名称" prop="name" :rules="rules.input">
            <el-input v-model.trim="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证" prop="code" :rules="rules.input">
            <el-input v-model.trim="form.code" placeholder="请输入" :maxlength="18" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender" :rules="rules.input">
            <el-select v-model.trim="form.gender" placeholder="请选择" class="w100p">
              <el-option
                v-for="item in options.gender"
                :key="item.dict_value"
                :label="item.dict_name"
                :value="item.dict_value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday" :rules="rules.select">
            <el-date-picker
              v-model.trim="form.birthday"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone_number">
            <el-input v-model.trim="form.phone_number" placeholder="请输入" :maxlength="11" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构" prop="org" :rules="rules.select">
            <CuebSelectList
              v-model="form.org"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=6'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="国籍" prop="country">
            <el-input v-model.trim="form.country" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nationality">
            <el-input v-model.trim="form.nationality" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="native_place">
            <el-input v-model.trim="form.native_place" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本地户籍" prop="is_local_register">
            <el-select v-model.trim="form.is_local_register" placeholder="请选择" class="w100p">
              <el-option
                v-for="item in options.localRegister"
                :key="item.dict_value"
                :label="item.dict_name"
                :value="item.dict_value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="户籍类型" prop="register_type" :rules="rules.select">
            <CuebSelectList
              v-model="form.register_type"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=5'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地址" prop="register_address">
            <el-input v-model.trim="form.register_address" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="politics_status" :rules="rules.select">
            <CuebSelectList
              v-model="form.politics_status"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=4'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="marital_status" :rules="rules.select">
            <CuebSelectList
              v-model="form.marital_status"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=1'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="文化程度" prop="standard_culture" :rules="rules.select">
            <CuebSelectList
              v-model="form.standard_culture"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=3'
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业时间" prop="graduate_time" :rules="rules.select">
            <el-date-picker
              v-model.trim="form.graduate_time"
              class="w100p"
              value-format="yyyy-MM-dd"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="毕业院校" prop="graduate_school">
            <el-input v-model.trim="form.graduate_school" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="从事行业" prop="work_industry">
            <el-input v-model.trim="form.work_industry" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="工作单位" prop="work_unit">
            <el-input v-model.trim="form.work_unit" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作岗位" prop="operating_post" :rules="rules.select">
            <CuebSelectList
              v-model="form.operating_post"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=8'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="工作地址" prop="work_address">
            <el-input v-model.trim="form.work_address" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称" prop="technical_post" :rules="rules.select">
            <CuebSelectList
              v-model="form.technical_post"
              class="w100p"
              :config="{
                keyCode: 'dict_value',
                keyName: 'dict_name',
                url: '/ShenZhenTelecom/ENUM?id=7'
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="居住地址" prop="residential_address">
            <el-input v-model.trim="form.residential_address" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="居住建筑" prop="residential_building">
            <el-input
              v-model.trim="form.residential_building"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="家庭成员" prop="family_member">
            <el-input v-model.trim="form.family_member" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆信息" prop="vehicle_info">
            <el-input v-model.trim="form.vehicle_info" placeholder="请输入" />
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
      options: {
        gender: [
          { dict_name: '未知', dict_value: 0 },
          { dict_name: '男', dict_value: 1 },
          { dict_name: '女', dict_value: 2 }
        ],
        localRegister: [
          { dict_name: '是', dict_value: 1 },
          { dict_name: '否', dict_value: 0 }
        ]
      },
      form: {
        name: '', // 人员名称',
        photo_path: '', // 照片',
        code: '', // 身份证',
        gender: 1, // 性别',
        birthday: '', // 出生日期',

        phone_number: '', // 手机号码',
        org: '', // 组织机构',

        country: '', // 国籍',
        nationality: '', // 民族',

        native_place: '', // 籍贯',
        is_local_register: 1, // 本地户籍',

        register_type: '', // 户籍类型',
        register_address: '', // 户籍地址',

        politics_status: '', // 政治面貌',
        marital_status: '', // 婚姻状况',

        standard_culture: '', // 文化程度',
        graduate_time: '', // 毕业时间',

        graduate_school: '', // 毕业院校',
        work_industry: '', // 从事行业',

        work_unit: '', // 工作单位 ',
        operating_post: '', // 工作岗位',

        work_address: '', // 工作地址',
        technical_post: '', // 职称',

        residential_address: '', // 居住地址',
        residential_building: '', // 居住建筑',

        family_member: '', // 家庭成员',
        vehicle_info: '' // 车辆信息',
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
        url: `${process.env.VUE_APP_BASE_API_PREFIXV2}/STAFF_MANAGEMENT/PERSONNEL/${id}`,
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
          // params.is_local_register = params.is_local_register * 1
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIXV2}/STAFF_MANAGEMENT/PERSONNEL/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIXV2}/STAFF_MANAGEMENT/PERSONNEL`,
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

<style lang="scss" scoped></style>
