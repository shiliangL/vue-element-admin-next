<!--
 * @Author: shiliangL
 * @Date: 2021-12-30 10:57:44
 * @LastEditTime: 2021-12-30 11:09:44
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="PlaceholderBock">
    <el-image
      class="image"
      :src="url"
    />
    <div class="desc-text">
      设计开发中.....
    </div>
  </div>
</template>

<script>

import url from '@/assets/layout/prototyping_process.png'

export default {
  name: 'PlaceholderBock',
  data() {
    return {
      url
    }
  }
}
</script>

<style lang="scss" scoped>
.PlaceholderBock {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .image{
    width: 450px;
  }
  .desc-text{
    z-index: 10;
    color: #909399;
    position: relative;
    font-size: 42px;
    padding-top: 220px;
    margin-left: -220px;
  }
}
</style>
