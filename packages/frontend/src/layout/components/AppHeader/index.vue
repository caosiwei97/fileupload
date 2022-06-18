<template>
  <el-space>
    <BreadcrumbVue></BreadcrumbVue>
  </el-space>
  <el-space>
    <full-screen></full-screen>
  </el-space>
</template>

<script setup lang="ts">
  import BreadcrumbVue from './Breadcrumb.vue'
  import FullScreen from './FullScreen.vue'

  const childMethod = () => {
    console.log('child')
  }

  defineExpose({
    childMethod,
  })
</script>

<style lang="scss" scoped>
  ::v-deep(.el-space__item) {
    display: flex;
    align-items: center;
  }
</style>
