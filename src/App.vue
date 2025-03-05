<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheContainer from './components/ui/TheContainer.vue'
import TheNavigation from './components/layout/TheNavigation.vue'
</script>

<template>
  <header class="bg-blue-500 text-gray-50 font-medium items-center h-12 flex">
    <TheContainer custom-class="flex-1">
      <TheNavigation />
    </TheContainer>
  </header>

  <RouterView />
</template>
