<script setup lang="ts">
  import { ELEMENT_CONFIG } from '~/constants/element-plus'
</script>

<template>
  <el-config-provider :size="ELEMENT_CONFIG.size">
    <router-view></router-view>
  </el-config-provider>
</template>
