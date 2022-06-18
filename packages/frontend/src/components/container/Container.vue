<template>
  <section class="my-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script lang="ts">
  export default {
    name: 'MyContainer',
  }
</script>
<script lang="ts" setup>
  import { Component, computed, useSlots, VNode } from 'vue'

  export interface Props {
    direction?: string
  }

  const props = defineProps<Props>()
  const slots = useSlots()

  const isVertical = computed(() => {
    if (slots?.default) {
      return slots.default().some((vn: VNode) => {
        const tagName = (vn.type as Component).name
        return ['MyHeader', 'MyFooter'].includes(tagName)
      })
    }
    return props.direction === 'vertical'
  })
</script>

<style lang="scss">
  @import '~assets/styles/mixin';

  @include b(container) {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-basis: auto;
    flex-direction: row;
    min-width: 0;
    @include when(vertical) {
      flex-direction: column;
    }
  }
</style>
