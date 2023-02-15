<template>
  <div class="chart-header" :class="{ volume: volume }">
    <!-- 左边的标题 -->
    <p class="title">
      <i class="el-icon-s-operation"></i>
      {{ title }}
    </p>
    <!-- 右边的插槽 -->
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'compoentName',
  props: {
    title: {
      type: String
    },
    // 是否定位到顶部
    volume: {
      type: Boolean,
      default: true
    }
  }

}
</script>
<style scoped>
.chart-header {
  display: flex;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
}

.chart-header.volume {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}

.chart-header .title {
  color: rgb(97, 97, 97);
  font-weight: bold;
  font-size: 16px;
}
</style>