<template>
  <aside class="my-aside" :style="{ width }">
    <slot />
  </aside>
</template>

<script lang="ts">
  export default {
    name: 'MyAside',
  }
</script>

<script setup lang="ts">
  import { withDefaults } from 'vue'
  type PropValues = {
    width: string
  }
  withDefaults(defineProps<PropValues>(), {
    width: '300px',
  })
</script>

<style lang="scss">
  @import '~assets/styles/mixin';
  @include b(aside) {
    box-sizing: border-box;
    flex-shrink: 0;
    overflow: auto;
  }
</style>
