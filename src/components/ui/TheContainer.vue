<template>
  <div :class="['max-w-7xl mx-auto px-2 box-content', customClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
}>()
</script>
