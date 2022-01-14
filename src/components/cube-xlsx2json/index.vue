<!--
 * @Author: shiliangL
 * @Date: 2022-01-14 11:40:24
 * @LastEditTime: 2022-01-14 14:11:22
 * @LastEditors: Do not edit
 * @Description: 表格导入转为json
-->

<template>
  <div
    v-loading="downloadLoading"
    class="m-upload-file"
    :element-loading-text="loadingText"
  >
    <el-upload
      ref="upload"
      class="upload-form"
      drag
      action="#"
      :multiple="false"
      :show-file-list="false"
      accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :http-request="httpRequest"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="tipText">请使用下载模板填写数据导入</div>
    </el-upload>
    <div class="upload-button-layout">
      <!-- <el-button
        :loading="submitLoading"
        class="mb-sm btn btn-primary"
        size="small"
        type="primary"
        @click="submitForm"
      >导入
      </el-button> -->
      <template>
        <el-button
          type="primary"
          style="margin-right:5px"
          class="mb-sm btn btn-primary btn-outline"
          @click="getTplUrl"
        >下载模板
        </el-button>
      </template>
      <el-button
        style="margin-right:5px"
        class="mb-sm btn btn-primary btn-outline"
        type="primary"
        plain
        @click="close"
      >取消
      </el-button>
    </div>
    <a
      ref="downloadTpl"
      style="display:none"
      :download="tplName"
      :href="tplHref"
    />
    <a ref="download" style="display:none" :href="href" download />
  </div>
</template>

<script>

import XLSX from 'xlsx'

export default {
  name: 'CubeXlsx2json',
  props: {
    tplUrl: {
      required: true,
      type: String,
      default: () => ''
    },
    tplName: {
      type: String,
      default: () => '导入模板.xls'
    }
  },
  data() {
    return {
      headers: null,
      submitLoading: false,
      downloadLoading: false,
      fileList: [],
      href: '',
      tplHref: '',
      count: 0,
      loadingText: ''
    }
  },
  methods: {
    close(res) {
      this.$emit('close')
    },
    httpRequest(e) {
      const file = e.file // 文件信息
      if (!file) {
        // 没有文件
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          this.$emit('callBack', exl)
          this.$emit('close')
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    },
    getTplUrl() {
      this.download()
    },
    submitForm() {
      if (!this.fileList.length) {
        this.$message({
          message: '请添加导入文件',
          type: 'warning'
        })
      }
      this.$refs.upload.submit()
    },
    download(href) {
      const url = href || this.tplUrl
      if (!url) return
      const a = document.createElement('a')
      a.href = url
      a.style.display = 'none'
      a.download = this.tplName
      document.body.append(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-form {
  text-align: center;
}
.upload-button-layout {
  text-align: center;
  margin-top: 10px;
}

.tipText {
  padding: 4px 0;
  color: red;
}
</style>
