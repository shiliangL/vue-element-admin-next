<!--
 * @Author: shiliangL
 * @Date: 2021-02-25 09:06:05
 * @LastEditTime: 2022-01-19 19:18:50
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <el-form ref="form" :model="form" class="form" label-width="0">
    <div class="base-info">
      <div v-if="showType===1" class="content-text-bock">
        <div class="flex-bar-right">
          <el-dropdown @command="command">
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="添加人员登记">添加数据</el-dropdown-item>
              <el-dropdown-item command="导入人员登记">数据导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <el-table
          :data="form.peopleTable"
          border
          style="width: 100%"
          height="80vh"
        >
          <el-table-column prop="name" label="名称" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.name' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.name'"
                :rules="{ required: true, message: '请输入', trigger: 'change' }"
              >
                <el-input v-model.trim="scope.row.name" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="code" label="身份证号码" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.code' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.code' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.code" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="phone_number" label="电话号码" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.phone_number' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.phone_number' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.phone_number" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="work_unit" label="公司名称" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.work_unit' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.work_unit' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.work_unit" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="work_address" label="工作地址" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.work_address' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.work_address' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.work_address" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" label="入场时间" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.create_time' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.create_time' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.create_time" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="operating_post" label="职位" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.operating_post' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.operating_post' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.operating_post" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="movement" label="14天内行动轨迹" align="center">
            <template slot-scope="scope">
              <el-form-item
                :key="'peopleTable.' + scope.$index+'.movement' + scope.row.webid"
                label=""
                :prop="'peopleTable.' + scope.$index+'.movement' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}"
              >
                <el-input v-model.trim="scope.row.movement" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-button size="mini" style="margin-bottom: 18px;" type="danger" @click="removeList(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div v-if="showType===2" class="content-text-bock">
        <CubeUploadFile />
      </div>

      <div v-if="showType===3" class="content-text-bock">
        <div class="flex-bar-right">
          <el-dropdown @command="command">
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="添加持续跟踪">添加数据</el-dropdown-item>
              <el-dropdown-item command="导入持续跟踪">数据导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <CubeTable :config="followTable" />
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
      fetchLoading: false,
      submitLoading: false,
      visible: false,
      peopleTable: {
        data: [],
        columns: [
          { label: '公司', key: 'name' },
          { label: '职位', key: 'code' },
          { label: '联系方式', key: 'code' },
          { label: '身份证', key: 'code' },
          { label: '工作常住地址', key: 'code' },
          { label: '14天内轨迹', key: 'code' }
        ]
      },
      followTable: {
        data: [],
        columns: [
          { label: '回访记录', key: 'name' },
          { label: '回访时间', key: 'name' },
          { label: '回访形式', key: 'code' },
          { label: '客户反馈', key: 'code' },
          { label: '14天内轨迹', key: 'code' }
        ]
      },
      form: {
        peopleTable: [],
        followTable: []
      }
    }
  },
  created() {
    const { id, type } = this
    // 传递类型为 1 的时候标记为加载详情-编辑
    if (type) this.fetchDetail(id)
    const action = {
      label: '操作',
      width: 80,
      render: (h, parmas) => {
        const { row } = parmas
        return (
          <div class='flex-table-cell'>
            <div
              class='delete-text'
              onClick={() => this.handlerRemove(row)}
            >
              <i class='el-icon-delete'></i>
               删除
            </div>
          </div>
        )
      }
    }
    this.peopleTable.columns.push(action)
    this.followTable.columns.push(action)

    this.peopleTableRow = {
      exhibition_hall_id: id,
      name: '',
      code: '',
      phone_number: '',
      work_unit: '',
      work_address: '',
      operating_post: '',
      movement: '',
      create_time: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    command(keyName) {
      switch (keyName) {
        case '添加人员登记':
          this.form.peopleTable.push(this.peopleTableRow)
          break
        case '导入人员登记':
          this.openImportTable({ tplUrl: 'template/展厅预约人员登记模板.xls' })
          break
        case '添加持续跟踪':
          this.followTable.data.push({})
          break
        case '导入持续跟踪':
          this.openImportTable({ tplUrl: 'template/展厅预约持续跟踪.xls' })
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
    fetchDetail(id) {
      this.$request({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT/${id}`,
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
          const { type } = this // 如果 type 为true 则为编辑
          const { stringify } = this.$qs
          this.$request({
            method: type ? 'PUT' : 'POST',
            url: type
              ? `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT/${this.id}`
              : `${process.env.VUE_APP_BASE_API_PREFIX}/EXHIBITION_APPOINTMENT`,
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
    },
    addPeopleTableRow() {
      const { id } = this
      this.form.peopleTable.push({
        webid: this.guid(),
        exhibition_hall_id: id,
        name: '',
        code: '',
        phone_number: '',
        work_unit: '',
        work_address: '',
        operating_post: '',
        movement: '',
        create_time: ''
      })
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
          callBack: (table) => {
            // row 这里标记有row就是编辑刷新当前 没有就是新增刷新到首页
            console.log(table)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
