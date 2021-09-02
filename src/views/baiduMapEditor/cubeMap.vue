<!--
 * @Author: shiliangL
 * @Date: 2021-09-02 18:09:49
 * @LastEditTime: 2021-09-02 19:24:50
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="bm-view">
    <baidu-map
      class="bm-view"
      center="宝安区"
      :min-zoom="12"
      :map-click="false"
      @ready="ready"
    >
      <!-- 部件类型范围  当前选择部件 绘制 -->
      <!-- geomType 地图类型： 1、点，2、线，3、面 -->
      <bm-control
        v-if="selectCurrentPart"
        key="06F415E1-7309-EFE2-9448-AAC40885BBBB"
      >
        <!-- 点类型绘制 -->
        <bm-control v-if="selectCurrentPart.pointList.length" key="36C7F20F-146F-8022-1E91-9943F56C5B5B">
          <bm-control
            v-if="selectCurrentPart.geomType === 1"
            key="D6C0986B-F52A-D005-7999-2D602D3F8841"
          >
            <bm-control
              v-for="(item,index) in selectCurrentPart.pointList"
              :key="'bm_control_marker_'+index"
            >
              <bm-control
                v-for="(itemKey,indexKey) in item"
                :key="indexKey+'bm_control_marker_'+index"
              >
                <bm-marker
                  :key="indexKey+'line_list_bm_polyline'"
                  :position="itemKey"
                />
                <bm-circle
                  :key="indexKey+'line_list_bm_marker_circle'"
                  :center="itemKey"
                  stroke-color="blue"
                  :radius="100"
                />
              </bm-control>
            </bm-control>
          </bm-control>
        </bm-control>

        <!-- 线条类型绘制 -->
        <bm-control v-if="selectCurrentPart.pointList.length" key="9D336956-0FE1-9F7F-27FC-FB173A158234">
          <bm-control
            v-if="selectCurrentPart.geomType === 2"
            key="EEDA5456-CEF6-5837-2CC8-7B157F2047AA"
          >
            <bm-control
              v-for="(itemKey,indexKey) in selectCurrentPart.pointList"
              :key="indexKey+'_bm_control_line_list_basic_classPointList'"
            >
              <bm-polyline
                :path="itemKey"
                :editing="selectCurrentPart.editing || false"
                @lineupdate="polygonPartUpdate($event, itemKey, selectCurrentPart.pointList)"
              />
            </bm-control>

          </bm-control>
        </bm-control>

        <!-- 面型绘制 -->
        <bm-control v-if="selectCurrentPart.pointList.length" key="C8E16FDF-E71B-3F82-7173-26A9C3712401">
          <bm-control
            v-if="selectCurrentPart.geomType === 3"
            key="CF95042D-64A1-694B-EDD7-41181ED400B0"
          >
            <bm-control
              v-for="(itemKey,indexKey) in selectCurrentPart.pointList"
              :key="indexKey+'_bm_control_polygon_basic_classPointList'"
            >
              <bm-polygon
                :path="itemKey"
                :stroke-weight="1"
                :editing="selectCurrentPart.editing || false"
                @lineupdate="polygonPartUpdate($event, itemKey, selectCurrentPart.pointList)"
              />
            </bm-control>
          </bm-control>
        </bm-control>

        <!-- 单人单岗作业范围-->
        <!-- geomType 地图类型： 1、点，2、线，3、面 -->
        <bm-control key="63890A20-5F6F-90E3-DCB2-E861CC37883B">
          <bm-control>
            <!-- 绘制线 -->
            <bm-control
              v-if="selectCurrentPart && selectCurrentPart.geomTypePeople === 2"
              key="264628f89a183c2b0d527d632329c7d3"
            >
              <bm-control
                v-for="(item,index) in polygonList"
                :key="'bm_control_line_'+index"
              >
                <bm-control
                  v-for="(itemKey,indexKey) in item.pointList"
                  :key="indexKey+'bm_control_line_'+index"
                >
                  <bm-polyline
                    :key="index+'line_list_bm_polyline'"
                    :path="itemKey"
                    :stroke-color="item.color||styleOptions.strokeColor"
                    :editing="item.editing || false"
                    @rightclick="rightclick($event, index, item)"
                    @lineupdate="polygonUpdate($event, itemKey, item)"
                  />
                </bm-control>
              </bm-control>
              <!-- 班次下其他人员线条绘制 -->
              <bm-control
                v-for="(item,index) in polygonOtherList"
                :key="'bm_control_line_polygonOtherList_'+index"
              >
                <bm-control
                  v-for="(itemKey,indexKey) in item.pointList"
                  :key="indexKey+'bm_control_line_'+index"
                >
                  <bm-polyline
                    :key="index+'line_list_bm_polyline'"
                    :path="itemKey"
                    @rightclick="rightclick($event, index, item)"
                    @lineupdate="polygonUpdate($event, itemKey, item)"
                  />
                </bm-control>
              </bm-control>
            </bm-control>
            <!-- 绘制面 -->
            <bm-control
              v-if="selectCurrentPart && selectCurrentPart.geomTypePeople === 3"
              key="c162a0eb713da423eed30bba80c3b55b"
            >
              <bm-control
                v-for="(item,index) in polygonList"
                :key="'bm_control_polygon_'+index"
              >
                <bm-control
                  v-for="(itemKey,indexKey) in item.pointList"
                  :key="indexKey+'bm_control_polygon_'+index"
                >
                  <bm-polygon
                    :key="index+'line_list_bm_polyline'"
                    :path="itemKey"
                    :editing="item.editing || false"
                    @rightclick="rightclick($event, index, item)"
                    @lineupdate="polygonUpdate($event, itemKey, item)"
                  />
                </bm-control>

              </bm-control>
              <!-- 班次下其他人员区域绘制 -->
              <bm-control
                v-for="(item,index) in polygonOtherList"
                :key="'bm_control_polygon_polygonOtherList_'+index"
              >
                <bm-control
                  v-for="(itemKey,indexKey) in item.pointList"
                  :key="indexKey+'bm_control_polygon_'+index"
                >
                  <bm-polygon
                    :key="index+'line_list_bm_polyline'"
                    :path="itemKey"
                    :editing="item.editing || false"
                    @lineupdate="polygonUpdate($event, itemKey, item)"
                  />
                </bm-control>

              </bm-control>
            </bm-control>
          </bm-control>
        </bm-control>

      </bm-control>

    </baidu-map>
  </div>
</template>

<script>
export default {
  props: {
    selectCurrentPart: {
      type: [Object, null],
      default: () => {
        return {
          editing: false,
          partType: 1,
          pointList: []
        }
      }
    }
  },
  methods: {
    ready({ map, BMap }) {
      this.$nextTick().then(() => {
        this.map = map
        this.map && this.map.enableScrollWheelZoom()
        this.map && this.map.disableDoubleClickZoom()
        this.$emit('ready', map, BMap)
      })
    },
    // 线、面更新 - change - 部件
    polygonPartUpdate(e, index, pointList) {
      // 这里暂时 没有用 实时同步双向数据的话 视图问题会更新 不利于编辑的操作
      pointList.splice(0, 1, e.target.getPath() || [])
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-view{
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
