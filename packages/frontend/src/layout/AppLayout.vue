<template>
  <div class="common-layout">
    <my-container>
      <my-aside width="200px">
        <app-menu></app-menu>
      </my-aside>
      <my-container>
        <my-header id="header">
          <app-header ref="header"></app-header>
        </my-header>
        <my-main>
          <router-view></router-view>
        </my-main>
      </my-container>
    </my-container>
  </div>
</template>

<script setup lang="ts">
  import AppMenu from './components/AppMenu.vue'
  import AppHeader from './components/AppHeader/index.vue'
  import { onMounted, ref } from 'vue'

  // const header = ref(null)

  // onMounted(() => {
  //   console.log(header.value)
  // })
</script>

<style>
  .my-header {
    display: flex;
    justify-content: space-between;
    color: var(--el-text-color-primary);
    background-color: #fff;
  }

  .my-aside {
    color: var(--el-text-color-primary);
    background-color: rgb(0 21 24);
  }

  .my-main {
    color: var(--el-text-color-primary);
    background-color: #e9eef3;
  }

  .my-container {
    height: 100vh;
  }
</style>
