<template>
  <div class="CubeUpload">
    <el-upload
      v-show="!preview"
      ref="upload"
      action=""
      :auto-upload="false"
      :multiple="multiple"
      :disabled="disabled"
      :on-change="onChange"
      :on-exceed="uploadHandleExceed"
      :on-error="uploadUploadError"
      :before-upload="uploadBeforeUpload"
      :before-remove="uploadBeforeRemove"
      :accept="acceptType"
      :limit="limit"
      :size="size"
      :headers="headers"
      :file-list="fileList"
      :show-file-list="false"
      list-type="picture"
    >
      <template>
        <div class="upload-btn">
          <el-button size="small" type="text">
            <i class="el-icon-upload" /> 点击上传
          </el-button>
          <el-tooltip placement="right" effect="light">
            <div slot="content">
              <p>最多可选{{ limit }}个文件,单个文件不超过{{ size }}M</p>
              <p>仅仅接收 {{ accept }} 格式文件</p>
            </div>
            <i class="up-tip el-icon-info" />
          </el-tooltip>
        </div>
      </template>
    </el-upload>

    <transition name="list" tag="div">
      <div class="uploadList">
        <transition-group
          v-viewer="{ movable: false }"
          class="el-upload-list"
          name="list"
          tag="ul"
        >
          >
          <li
            v-for="(item, index) in fileList"
            :key="index + guid()"
            class="upload-li"
          >
            <i
              v-if="!preview"
              class="el-icon-close"
              @click="deleteOne(item, index)"
            />
            <div class="upload-files">
              <template v-if="previewUrl">
                <el-image
                  v-if="isImg(item)"
                  style="width: 60px; height: 60px;border: 1px solid #929292;"
                  :src="item.url"
                  :data-original="item.url"
                />
                <el-image
                  v-else
                  style="width: 60px; height: 60px;border: 1px solid #929292;"
                  :src="require('@/assets/icon/docs.png')"
                  :data-original="require('@/assets/icon/docs.png')"
                />
              </template>
              <template v-else>
                <div v-if="isImg(item)" class="el-icon-picture" />
                <div v-else class="el-icon-document" />
              </template>
              <!-- 操作工具 -->
              <div class="upload-files-mark">
                <i
                  v-if="previewUrl"
                  class="el-icon-zoom-in"
                  @click="zoomImgs(index)"
                />
                <i
                  v-if="0"
                  class="el-icon-download"
                  @click="handleDownload(item)"
                />
              </div>
            </div>
            <div class="files-name" :title="item.name">
              <!-- {{ item.name }} -->
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CubeUploadFile',
  props: {
    /** 约定传入数据格式 如果不是这个格式 请自行处理数据结构
     * [{fileId: "199f2eba-9cfa-46d7-93d7-4f7ad59528d3", name: "画板 – 1.png"}]
     */
    dataList: {
      type: Array,
      default: () => []
    },
    // 文件上传url
    actionUrl: {
      type: String,
      default: () =>
        'REST/System/SERVICES/Public/V1/Upload/UploadUserFile?Folder=appointmenFolder'
      // '/REST/System/SERVICES/Public/V1/UploadUserFile?Folder=appointmenFolder'
      // 'REST/System/TENANTBASE/spatial/V1.0/SpatialManager/DataDirectoryManager/UploadFile?DataName=appointmenFolder'
    },
    // 图片预览url
    previewUrl: {
      type: String,
      default: () => '假装有数据'
    },
    // 文件下载url
    downloadUrl: {
      type: String,
      default: () => ''
    },
    accept: {
      type: String,
      default: () =>
        '.jpg, .jpeg, .png, .pdf, .docx, .doc, .wps, .xlsx, .xml, .xls'
    },
    limit: {
      type: Number,
      default: () => 10
    },
    size: {
      type: Number,
      default: () => 30
    },
    // 是否预览 如果是则只显示图片
    preview: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [], // 上传文件
      rawFileList: [] // 记录多文件
    }
  },
  computed: {
    acceptType() {
      return (
        this.accept ||
        '.jpg, .jpeg, .png, .pdf, .docx, .doc, .wps, .xlsx, .xml, .xls'
      )
    }
  },
  watch: {
    dataList: {
      immediate: true,
      handler(itemList) {
        if (itemList && Array.isArray(itemList) && itemList.length) {
          const arr = []
          for (const item of itemList) {
            arr.push({
              ...item
            })
          }
          this.fileList = arr
        }
      }
    }
  },
  methods: {
    zoomImgs(index) {
      this.$nextTick().then(_ => {
        const viewer = this.$el.querySelector('.el-upload-list').$viewer
        viewer.options.url = 'data-original'
        viewer.view(index)
      })
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
    deleteOne(item) {
      const index = this.fileList.findIndex(k => k.fileId === item.fileId)
      this.fileList.splice(index, 1)
    },
    uploadBeforeUpload(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.'))
      const isTrue = this.acceptType.includes(testmsg) // '.jpg, .jpeg, .png, .pdf, .docx, .doc, .wps, .xlsx, .xml, .xls'
      const isLt2M = file.size / 1024 / 1024 <= 100
      if (!isTrue) {
        this.$message({
          message: `上传文件只能是 ${this.acceptType}格式!`,
          type: 'warning'
        })
        this.fileFormal = true // 当前 的 数据的 formal
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 100MB!',
          type: 'warning'
        })
        this.fileFormal = true
      }
      return isTrue && isLt2M
    },
    uploadUploadError(err, file, fileList) {
      if (this.fileList.length) {
        const index = this.fileList.findIndex(k => k.uid === file.uid)
        this.fileList.splice(index, 1)
      }
      this.$message({ message: '上传失败', type: 'error' })
      return err
    },
    isImg(file) {
      const { name } = file
      const testmsg = name.substring(name.lastIndexOf('.'))
      const isTrue = ['.jpg', '.jpeg', '.png', '.gif'].includes(testmsg)
      return isTrue
    },
    handleDownload(file) {
      if (!file.url) return
      window.open(file.url)
    },
    uploadBeforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
      if (this.fileFormal) {
        const index = fileList.findIndex((f, i) => {
          return f.fileId === file.fileId
        })
        fileList.splice(index, 1)
        this.fileFormal = false
        return false
      }
    },
    uploadHandleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件。`)
    },
    // 以下是多文件上传 Add 2021年08月02日
    initTimeLock(fn, time) {
      clearTimeout(this.timeLock)
      this.timeLock = setTimeout(() => {
        fn.apply(this, arguments)
      }, time)
    },
    // 这里仅仅针对 附件选择完成之后 记录上传文件
    onChange(file) {
      this.rawFileList.push(file)
      this.initTimeLock(() => {
        this.httpRequest()
      }, 500)
    },
    // 自定义上传方式 - 多文件上传
    httpRequest() {
      this.$message.closeAll()
      this.$message({ duration: 0, message: '文件上传中....', type: 'warning' })
      const { rawFileList, actionUrl, headers } = this
      const formData = new FormData()
      rawFileList.forEach(file => {
        formData.append('file', file.raw)
      })
      this.loading = true
      this.$request({
        url: actionUrl,
        method: 'POST',
        data: formData,
        headers: { ...headers }
      })
        .then(res => {
          this.loading = false
          this.$message.closeAll()
          // 清空选择的文件
          this.rawFileList = []
          const { CustomData, Success } = res
          if (Success) {
            const row = {}
            row.url = CustomData
            const nameIndex = CustomData.lastIndexOf('/')
            const name = CustomData.substring(nameIndex + 1, CustomData.length)
            row.name = name || '附件'
            this.fileList.push(row)
            this.$emit('input', this.fileList)
            this.$emit('update:fileList', this.fileList)
            this.$message({ message: '上传成功', type: 'success' })
          } else {
            this.$message({ message: '上传失败', type: 'error' })
            this.rawFileList = []
          }
        })
        .catch(e => {
          this.$message.closeAll()
          this.$message({ message: '上传失败', type: 'error' })
          this.rawFileList = []
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.CubeUpload {
  position: relative;
  .upload-btn {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    padding: 0 10px;
    border-radius: 6px;
    margin: 4px 0;
    .el-icon-upload {
      font-size: 14px;
    }
    .up-tip {
      color: #e5a147;
    }
    &:hover {
      border-color: #409eff;
    }
  }
  .uploadList {
    max-height: 230px;
    min-height: 110px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    overflow-y: auto;
    overflow-x: hidden;
    line-height: 14px;
    border-radius: 4px;
  }
  .el-upload-list {
    display: flex;
    flex-wrap: wrap;
  }
  .upload-li {
    margin: 10px;
    margin-right: 0;
    display: inline-block;
    position: relative;
    text-align: center;
    user-select: none;
    .el-icon-close {
      font-weight: bold;
      position: absolute;
      cursor: pointer;
      transition: all 0.15s linear;
      right: 0px;
      top: 0px;
      &:hover {
        transform: rotate(90deg);
      }
      &:active {
        opacity: 0.42;
      }
    }
    .upload-files {
      width: 60px;
      height: 60px;
      overflow: hidden;
      position: relative;
      .upload-files-mark {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        opacity: 0;
        font-size: 18px;
        background-color: rgba(0, 0, 0, 0.26);
        transition: opacity 0.3s;
        border-radius: 4px;
        i {
          font-size: 18px;
          display: inline-block;
          cursor: pointer;
        }
      }
      &:hover {
        .upload-files-mark {
          opacity: 1;
        }
      }
    }

    .el-icon-picture,
    .el-icon-document {
      font-size: 64px;
    }
    .files-name {
      display: flex;
      justify-content: center;
      font-size: 12px;
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .upload-progress {
      margin: 4px 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      .progress {
        flex: 1;
      }
      .progress-text {
        flex: 1;
      }
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .el-image {
    padding: 4px;
  }
}
</style>
