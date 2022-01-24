<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-24 18:10:20
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="110">
    <div class="base-info">
      <div v-if="showType === 0" class="content-text-bock">
        <el-row>
          <el-col :span="6">
            <el-form-item label="">
              <el-checkbox v-model="form.tableDetail.is_cooperative">
                是否是合作伙伴
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col v-if="form.tableDetail.is_cooperative" :span="6">
            <el-form-item label="企业名称">
              xxx
            </el-form-item>
          </el-col>
          <el-col v-else :span="6">
            <el-form-item label="企业名称">
              <span v-text="form.tableDetail.enterprise_name" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="部门名称">
              <span v-text="form.tableDetail.department_name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户经理">
              <span v-text="form.tableDetail.customer_manager" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="部门名称">
              <span v-text="form.tableDetail.department_name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户经理">
              <span v-text="form.tableDetail.customer_manager" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="项目经理">
              <span v-text="form.tableDetail.project_manager" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱">
              <span v-text="form.tableDetail.email" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="预约时间">
              <span v-text="form.tableDetail.appointment_time" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属区划">
              <span v-text="form.tableDetail.city_area" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来访人员">
              <span v-text="form.tableDetail.visitors" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="人员情况">
              <span v-text="form.tableDetail.staff_profile" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行业/领域">
              <span v-text="form.tableDetail.domain" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="商机情况">
              <span v-text="form.tableDetail.business_situation" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主要了解方面">
              <span v-text="form.tableDetail.know_content" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="">
              <el-checkbox
                v-model="form.tableDetail.is_visit_cim"
              >是否参观圳·智慧</el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="备注">
              <span v-text="form.tableDetail.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-if="showType === 1" class="content-text-bock">
        <el-table
          :data="form.peopleTable"
          border
          style="width: 100%"
          :height="tableMaxHight"
        >
          <el-table-column prop="name" label="名称" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.name' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.name'"
              >
                <span v-text="scope.row.name" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="code" label="身份证号码" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.code' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.code'"
              >
                <span v-text="scope.row.code" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="phone_number" label="电话号码" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.phone_number' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.phone_number'"
              >
                <span v-text="scope.row.phone_number" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="work_unit" label="公司名称" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.work_unit' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.work_unit'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <span v-text="scope.row.work_unit" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="work_address" label="工作地址" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.work_address' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.work_address'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <span v-text="scope.row.work_address" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" label="入场时间" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.create_time' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.create_time'"
              >
                <span v-text="scope.row.create_time" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="operating_post" label="职位" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.operating_post' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.operating_post'"
              >
                <span v-text="scope.row.operating_post" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="movement"
            label="14天内行动轨迹"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.movement' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.movement'"
              >
                <span v-text="scope.row.movement" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="showType === 2" class="content-text-bock">
        <CubeUploadFile
          preview
          accept=".jpg, .jpeg, .png"
          :file-list.sync="form.filesTable"
        />
      </div>

      <div v-if="showType === 3" class="content-text-bock">
        <el-table
          :data="form.followTable"
          border
          style="width: 100%"
          :height="tableMaxHight"
        >
          <el-table-column
            prop="return_visit_time"
            label="回访时间"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'followTable.' +
                    scope.$index +
                    '.return_visit_time' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'followTable.' + scope.$index + '.return_visit_time'"
              >
                <span v-text="scope.row.return_visit_time" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="回访形式"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'followTable.' +
                    scope.$index +
                    '.return_visit_type' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'followTable.' + scope.$index + '.return_visit_type'"
              >
                <span v-text="scope.row.return_visit_type" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="feedback" label="回访反馈" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'followTable.' + scope.$index + '.feedback' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'followTable.' + scope.$index + '.feedback'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <span v-text="scope.row.feedback" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-form>
</template>

<script>

export default {
  components: {},
  props: {
    id: {
      type: [String, Number],
      default: () => ''
    },
    showType: {
      type: Number,
      default: () => ''
    }
  },
  data() {
    return {
      showTypeParams: null,
      tableMaxHight: 500,
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      form: {
        tableDetail: {
          is_cooperative: true,
          department_name: '', // 部门名称
          customer_manager: '', // 客户经理
          project_manager: '', // 项目经理
          appointment_time: '', // '预约时间'
          enterprise_name: '', // '企业名称'
          enterprise_id: '', // '企业code'
          visitors: '', // 来访人员
          staff_profile: '', // 人员情况
          domain: '', // 行业/领域；对应字典
          email: '', // 邮箱
          know_content: '', // 主要了解方面
          communication_materials: '', // 交流材料
          communication_materials_path: '', // 交流材料附件
          business_situation: '', // 商机情况
          is_visit_cim: true, // 是否参观cim
          city_area: '', // 区划
          remark: '' // 备注
        },
        peopleTable: [],
        filesTable: [],
        followTable: []
      }
    }
  },
  watch: {
    showType: {
      handler() {
        this.fetchDetail()
      }
    }
  },
  created() {
    this.showTypeParams = {
      0: {
        key: 'tableDetail',
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/APPOINTMENT/${this.id}`
      },
      1: {
        key: 'peopleTable',
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/EXHIBITION_HALL_PEOPLE?exhibition_hall_id=${this.id}`
      },
      2: {
        key: 'filesTable',
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/RESOURCE_PATH?exhibition_hall_id=${this.id}`
      },
      3: {
        key: 'followTable',
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/KEEP_TRACKING?exhibition_hall_id=${this.id}`
      }
    }
    this.fetchDetail()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchDetail() {
      const { showType } = this
      const request = this.showTypeParams[showType]
      this.$request({
        method: 'get',
        url: request.detail,
        params: {}
      }).then(res => {
        const { Success, Message } = res
        if (Success) {
          const { Data } = Message || {}
          switch (this.showType) {
            case 0:
              Object.assign(this.form.tableDetail, Data[0] || {})
              break
            case 1:
              this.form[request.key] = Data || []
              break
            case 2:
              if (Array.isArray(Data) && Data.length) {
                const list = []
                for (const item of Data) {
                  list.push({ url: item.resource_path, name: '回访资料.png' })
                }
                this.form[request.key] = list || []
              }
              break
            case 3:
              this.form[request.key] = Data || []
              break
            default:
              break
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
