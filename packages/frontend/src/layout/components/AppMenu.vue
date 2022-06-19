<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="rgb(0,21,24)"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-sub-menu index="/">
      <template #title>
        <span>单一文件</span>
      </template>
      <el-menu-item index="/">
        <template #title> FORM-DATA </template>
      </el-menu-item>
      <el-menu-item index="/">
        <template #title> BASE64 </template>
      </el-menu-item>
      <el-menu-item index="/">
        <template #title> 缩略图 </template>
      </el-menu-item>
      <el-menu-item index="/">
        <template #title> 进度管控 </template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/">
      <template #title> 多文件 </template>
    </el-menu-item>
    <el-menu-item index="/">
      <template #title> 拖拽上传 </template>
    </el-menu-item>
    <el-menu-item index="/">
      <template #title> 大文件上传 </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
