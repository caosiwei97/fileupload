<template>
  <main class="my-main">
    <slot />
  </main>
</template>

<script lang="ts">
  export default {
    name: 'MyMain',
  }
</script>

<script setup lang="ts"></script>

<style lang="scss">
  @import '~assets/styles/mixin';
  @include b(main) {
    box-sizing: border-box;
    display: block;
    flex: 1;
    flex-basis: auto;
    padding: $--main-padding;
    overflow: auto;
  }
</style>
