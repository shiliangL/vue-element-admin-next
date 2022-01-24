<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-24 10:34:05
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

          <el-table-column prop="code" label="身份证号码" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="
                  'peopleTable.' + scope.$index + '.code' + scope.row.id ||
                    scope.row.webid
                "
                label=""
                :prop="'peopleTable.' + scope.$index + '.code'"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.code"
                  placeholder="请输入内容"
                />
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.phone_number"
                  placeholder="请输入内容"
                />
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
                <el-input
                  v-model.trim="scope.row.work_unit"
                  placeholder="请输入内容"
                />
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
                <el-input
                  v-model.trim="scope.row.work_address"
                  placeholder="请输入内容"
                />
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-date-picker
                  v-model="scope.row.create_time"
                  type="datetime"
                  class="w100p"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请输入"
                />
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.operating_post"
                  placeholder="请输入内容"
                />
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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model.trim="scope.row.movement"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-button
                v-if="form.peopleTable.length !==1"
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

      <div v-if="showType === 2" class="content-text-bock">
        <CubeUploadFile accept=".jpg, .jpeg, .png" :file-list.sync="form.filesTable" />
      </div>

      <div v-if="showType === 3" class="content-text-bock">
        <div class="flex-bar-right">
          <el-dropdown @command="command">
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="添加持续跟踪"
              >添加数据</el-dropdown-item>
              <el-dropdown-item
                command="导入持续跟踪"
              >数据导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

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
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change'
                }"
              >
                <el-date-picker
                  v-model="scope.row.return_visit_time"
                  type="datetime"
                  class="w100p"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请输入"
                />
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
                <el-input
                  v-model.trim="scope.row.feedback"
                  type="textarea"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-button
                v-if="form.followTable.length !==1"
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
      form: {
        peopleTable: [],
        filesTable: [],
        followTable: []
      }
    }
  },
  created() {
    this.showTypeParams = {
      1: {
        key: 'peopleTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_JOIN_PEOPLE`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_JOIN_PEOPLE/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/EXHIBITION_HALL_PEOPLE?exhibition_hall_id=${this.id}`
      },
      2: {
        key: 'filesTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RESOURCE_PATH`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RESOURCE_PATH/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/RESOURCE_PATH?exhibition_hall_id=${this.id}`
      },
      3: {
        key: 'followTable',
        add: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RETURN_VISIT`,
        update: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/BATCH_ADD_RETURN_VISIT/${this.id}`,
        detail: `${process.env.VUE_APP_BASE_API_PREFIXV2}/EXHIBITION_HALL/KEEP_TRACKING?exhibition_hall_id=${this.id}`
      }
    }
    this.fetchDetail()
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
          this.openImportTable({ tplUrl: 'template/展厅预约人员登记模板.xls', tplName: '展厅预约人员登记模板' })
          break
        case '添加持续跟踪':
          this.addPeopleTableRow('followTable')
          break
        case '导入持续跟踪':
          this.openImportTable({ tplUrl: 'template/展厅预约持续跟踪.xls', tplName: '展厅预约持续跟踪' })
          break
        default:
          break
      }
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
              exhibition_hall_id: this.id,
              join_people_list: params
            },
            2: {
              exhibition_hall_id: this.id,
              resource_path_list: params.map(item => item.url)
            },
            3: {
              exhibition_hall_id: this.id,
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
            code: '',
            phone_number: '',
            work_unit: '',
            work_address: '',
            operating_post: '',
            movement: '',
            create_time: ''
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
    openImportTable({ tplUrl, tplName }) {
      if (!tplUrl) return
      this.$openLayer({
        props: {
          tplUrl,
          tplName
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
            const { showType } = this
            const request = this.showTypeParams[showType]
            const list = this.form[request.key]
            switch (showType) {
              case 1:
                if (Array.isArray(table) && table.length) {
                  for (const item of table) {
                    const create_time = this.$dayjs(item.create_time).isValid() ? this.$dayjs(item.create_time).format('yyyy-MM-dd HH:mm:ss') : null
                    list.push({
                      webid: this.guid(),
                      name: item.name,
                      code: item.code,
                      phone_number: item.phone_number,
                      work_unit: item.work_unit,
                      work_address: item.work_address,
                      operating_post: item.operating_post,
                      movement: item.movement,
                      create_time: create_time
                    })
                  }
                }
                break
              case 3:
                if (Array.isArray(table) && table.length) {
                  for (const item of table) {
                    const return_visit_time = this.$dayjs(item.return_visit_time).isValid() ? this.$dayjs(item.return_visit_time).format('yyyy-MM-dd HH:mm:ss') : null
                    list.push({
                      webid: this.guid(),
                      return_visit_time: return_visit_time,
                      return_visit_type: item.return_visit_type,
                      feedback: item.feedback
                    })
                  }
                }
                break
              default:
                break
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
