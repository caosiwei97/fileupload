<template>
  <footer class="my-footer" :style="{ height }">
    <slot />
  </footer>
</template>

<script lang="ts">
  export default {
    name: 'MyFooter',
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

  @include b(footer) {
    box-sizing: border-box;
    flex-shrink: 0;
    padding: $--footer-padding;
  }
</style>
