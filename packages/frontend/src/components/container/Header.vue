<template>
  <header class="my-header" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts">
  export default {
    name: 'MyHeader',
  }
</script>
<script setup lang="ts">
  import { withDefaults } from 'vue'

  interface Props {
    height?: string
  }
  withDefaults(defineProps<Props>(), {
    height: '60px',
  })
</script>

<style lang="scss">
  @import '~assets/styles/mixin';

  @include b(header) {
    box-sizing: border-box;
    flex-shrink: 0;
    padding: $--header-padding;
  }
</style>
