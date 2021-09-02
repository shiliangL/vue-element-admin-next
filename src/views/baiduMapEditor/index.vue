<!--
 * @Author: shiliangL
 * @Date: 2021-07-29 14:14:43
 * @LastEditTime: 2021-09-03 07:45:40
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="baidu-map">
    <div class="flex-box">
      <div class="flex-box-item-row">
        <div
          v-for="item in dynamicValidateForm.parts"
          :key="item.partGuidId"
          :class="selectPart===item.partGuidId?'active':''"
          class="el-card"
          @click="clickSelectPart(item)"
        >
          <div class="flex-header-bar">
            <div> {{ item.partName }} </div>
            <div>
              <!-- geomType {{ item.geomType }} -->
              <span v-if="item.partType ===1"> 绘制范围 </span>
              <span v-else> 查看范围 </span>
            </div>
          </div>
          <div
            v-for="kk in item.partClassList"
            :key="kk.classId"
          >
            <div class="flex-box-item">
              <div class="flex-box-item-row"> {{ kk.className }} </div>
              <div class="flex-box-item-row"> {{ kk.start }} </div>
              <div class="flex-box-item-row"> {{ kk.end }} </div>
              <div class="flex-box-item-row"> {{ kk.personNum }} 人 </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-box-item-row">
        <template v-if="selectCurrentPart">
          <div
            v-for="item in selectCurrentPart.partClassList"
            :key="item.classId"
            :class="selectPart2class===item.classId?'active':''"
            class="el-card"
            @click="clickSelectPart2class(item)"
          >
            <!-- <div> {{ item.className }} </div> -->
            <div class="flex-box-item-class-header">
              <div class="flex-box-item-class">
                <div class="flex-box-item-class-index"> 序号 </div>
                <div class="flex-box-item-class-row"> 岗位 </div>
                <div class="flex-box-item-class-row"> 岗位范围 </div>
              </div>
            </div>

            <div
              v-for="(kk,kkindex) in item.postList"
              :key="kk.classId+kkindex"
            >
              <div class="flex-box-item-class">
                <div class="flex-box-item-class-index"> {{ kkindex+1 }} </div>
                <div class="flex-box-item-class-row"> {{ item.className + '-岗位'+(kkindex+1 ) }} </div>
                <div class="flex-box-item-class-row"> {{ '岗位范围' }} </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex-box-map-map">
        <cube-bMap
          :select-current-part="selectCurrentPart"
          @ready="ready"
        />
      </div>
    </div>
  </div>
</template>

<script>

import cubeBMap from './cubeMap'
import data from './data'

export default {
  name: 'BaiduMapGl',
  components: {
    cubeBMap
  },
  data() {
    return {
      selectPart: '',
      selectPart2class: '',
      dynamicValidateForm: {
        'type': 1,
        'auditOption': '',
        'gridGuidId': '',
        'gridName': '',
        'managerId': '',
        'managerName': '',
        'managerTel': '',
        'parts': [],
        'pointList': [],
        'requirePerson': 1
      }
    }
  },
  computed: {
    selectCurrentPart() {
      return this.dynamicValidateForm.parts.find(item => item.partGuidId === this.selectPart) || null
    }
  },
  created() {
    Object.assign(this.dynamicValidateForm, data.data)
  },
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {

      }, 0)
    })
  },
  methods: {
    ready(map) {
      this.map = map
      setTimeout(() => {
        this.clickSelectPart(this.dynamicValidateForm.parts[1])
      }, 500)
    },
    clickSelectPart(item) {
      this.selectPart2class = ''
      this.selectPart = item.partGuidId
      const p = []
      item.pointList = item.pointList ? item.pointList : []
      item.pointList.forEach((list) => {
        list.forEach((item) => {
          p.push(new BMap.Point(item.lng, item.lat))
        })
      })
      this.map && this.map.setViewport(p)
    },
    clickSelectPart2class(item) {
      this.selectPart2class = item.classId
    }
  }
}
</script>

<style lang="scss" scoped>
.baidu-map {
  position: relative;
  #map {
    height: 100%;
    widows: 100%;
  }
  .flex-header-bar {
    display: flex;
    justify-content: space-between;
  }
  .flex-box {
    height: 100%;
    widows: 100%;
    display: flex;
    font-size: 12px;
    .el-card {
      padding: 6px;
      margin: 6px;
      cursor: pointer;
      &.active {
        border: 1px solid #409eff;
      }
    }
    .flex-box-item-row {
      width: 420px;
      overflow: auto;
    }
    .flex-box-map-map {
      flex: 1;
    }
  }
  .flex-box-item {
    display: flex;
    color: #909399;
    align-items: center;
    justify-content: space-around;
    .flex-box-item-row {
      flex: 1;
    }
  }
  .flex-box-item-class-header {
    font-weight: bold;
  }
  .flex-box-item-class {
    display: flex;
    align-items: center;
    padding: 2px 0;
    .flex-box-item-class-index {
      width: 60px;
    }
    .flex-box-item-class-row {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
