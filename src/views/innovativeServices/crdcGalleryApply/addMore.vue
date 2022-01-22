<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-22 14:12:59
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="0">
    <div class="base-info">
      <div v-if="showType === 1" class="content-text-bock">
        <div class="flex-bar-right">
          <el-dropdown @command="command">
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="添加人员登记"
              >添加数据</el-dropdown-item>
              <el-dropdown-item
                command="导入人员登记"
              >数据导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <el-table
          :data="form.peopleTable"
          border
          style="width: 100%"
          :max-height="tableMaxHight"
        >
          <el-table-column prop="org" label="所属单位" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.org' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.org'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.org"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="名称" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.name' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.name'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.name"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="start_time" label="到访时间" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.start_time' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.start_time'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-date-picker
                  v-model.trim="scope.row.start_time"
                  type="datetime"
                  class="w100p"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="end_time" label="离开时间" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.end_time' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.end_time'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-date-picker
                  v-model.trim="scope.row.end_time"
                  type="datetime"
                  class="w100p"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="operate_content"
            label="操作内容"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' +
                    scope.$index +
                    '.operate_content' +
                    scope.row.id || scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.operate_content'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.operate_content"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-button
                v-if="form.peopleTable.length !== 1"
                size="mini"
                style="margin-bottom: 18px;"
                type="danger"
                @click="
                  removeTableList(scope.$index, scope.row, form.peopleTable)
                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 附件+测试仪器 -->
      <div v-if="showType === 2" class="content-text-bock">
        <div class="label-title">
          <div class="el-form-item__label">仪器测试情况</div>
        </div>
        <div class="flex-bar-right">
          <el-button type="primary" @click="addFollowTable">
            添加数据
          </el-button>
        </div>

        <el-table
          :data="form.followTable"
          border
          style="width: 100%"
          :max-height="tableMaxHight"
        >
          <el-table-column
            prop="return_visit_time"
            label="仪器名称"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="scope.row.return_visit_type"
                  placeholder="请选择"
                  @change="selectRowChange($event, scope.row)"
                >
                  <el-option
                    v-for="(item, index) in equipmentOption"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_time"
            label="仪器型号"
            align="center"
          />
          <el-table-column
            prop="return_visit_time"
            label="厂家"
            align="center"
          />
          <el-table-column
            prop="return_visit_type"
            label="测试用例"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="通用性能"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="射频性能"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="功耗性能"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="一致性"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="return_visit_type"
            label="测试结果"
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.return_visit_type"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-button
                v-if="form.followTable.length !== 1"
                size="mini"
                style="margin-bottom: 18px;"
                type="danger"
                @click="
                  removeTableList(scope.$index, scope.row, form.followTable)
                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="label-title">
          <div class="el-form-item__label">测试报告</div>
        </div>
        <CubeUploadFile
          accept=".jpg, .jpeg, .png"
          :file-list.sync="form.filesTable"
        />
      </div>

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

export default {
  components: {},
  mixins: [rules],
  props: {
    id: {
      type: [String, Number],
      default: () => ''
    },
    type: {
      type: Number,
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
      equipmentOption: [],
      form: {
        peopleTable: [],
        filesTable: [],
        followTable: []
      }
    }
  },
  created() {
    console.log(this)
    this.showTypeParams = {
      1: {
        key: 'peopleTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/BATCH_APPOINTMENT_PEOPLE`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/BATCH_APPOINTMENT_PEOPLE/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/RD_SERVER/APPOINTMENT_PEOPLE?appointment_id=${this.id}`
      },
      2: {
        key: 'filesTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RESOURCE_PATH`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RESOURCE_PATH/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RESOURCE_PATH/${this.id}`
      },
      3: {
        key: 'followTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RETURN_VISIT`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RETURN_VISIT/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RETURN_VISIT/${this.id}`
      }
    }
    this.fetchDetail()
    // 获取预约相关仪器
    this.fetchDetai2evice()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    command(keyName) {
      switch (keyName) {
        case '添加人员登记':
          this.addPeopleTableRow('peopleTable')
          break
        case '导入人员登记':
          this.openImportTable({ tplUrl: 'template/展厅预约人员登记模板.xls' })
          break
        case '添加持续跟踪':
          this.addPeopleTableRow('followTable')
          break
        case '导入持续跟踪':
          this.openImportTable({ tplUrl: 'template/展厅预约持续跟踪.xls' })
          break
        default:
          break
      }
    },
    addFollowTable() {
      this.addPeopleTableRow('followTable')
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
          const tableList = Data || []
          if (Array.isArray(tableList) && tableList.length) {
            const list =
              showType !== 2
                ? tableList
                : tableList.map(item => {
                  return {
                    url: item.resource_path,
                    name: '回访资料.png'
                  }
                })
            this.form[request.key] = list
          } else {
            const nameDesc = {
              1: 'peopleTable',
              3: 'followTable'
            }
            const name = nameDesc[showType]
            if (!name) return
            this.addPeopleTableRow(name)
          }
        }
      })
    },
    fetchDetai2evice() {
      const { id } = this
      if (!id) return
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
              this.equipmentOption = Data
            }
          }
        })
        .catch(() => {})
    },
    // 选择仪器改变的时候带出其他相关信息
    selectRowChange(value, row) {
      console.log(value, row, '选择仪器改变的时候带出其他相关信息')
    },
    removeTableList(index, row, table) {
      table.splice(index, 1)
    },
    submit(formName) {
      const { showType } = this
      const request = this.showTypeParams[showType]
      const list = this.form[request.key]
      if (!list.length) {
        this.$message({ message: '提交内容不能为空', type: 'warning' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true
          const params = JSON.parse(JSON.stringify(list))
          const paramsList = {
            1: {
              appointment_id: this.id,
              join_people_list: params
            },
            2: {
              appointment_id: this.id,
              resource_path_list: params.map(item => item.url)
            },
            3: {
              appointment_id: this.id,
              return_visit_list: params
            }
          }
          // const { stringify } = this.$qs
          this.$request({
            method: 'POST',
            url: request.add,
            data: paramsList[showType]
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
    },
    addPeopleTableRow(key) {
      switch (key) {
        case 'peopleTable':
          this.form.peopleTable.push({
            webid: this.guid(),
            name: '',
            org: '',
            start_time: '',
            end_time: '',
            operate_content: ''
          })
          break
        case 'followTable':
          this.form.followTable.push({
            webid: this.guid(),
            return_visit_time: '',
            return_visit_type: '',
            feedback: ''
          })
          break
        default:
          break
      }
    },
    openImportTable({ tplUrl }) {
      if (!tplUrl) return
      this.$openLayer({
        props: {
          tplUrl: tplUrl
        },
        content: () => import('@/components/cube-xlsx2json/index.vue'),
        // 弹窗属性设置
        modalProps: {
          width: '550px',
          title: '数据导入',
          maskClosable: false,
          fullscreen: false
        },
        // 事件回调
        methods: {
          callBack: table => {
            // row 这里标记有row就是编辑刷新当前 没有就是新增刷新到首页
            console.log(table)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
