<template>
  <el-icon @click="toggleFullScreen"> <full-screen /></el-icon>
</template>

<script lang="ts" setup>
  import { FullScreen } from '@element-plus/icons-vue'

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }
</script>
