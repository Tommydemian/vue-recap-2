<template>
  <section>
    <TheContainer custom-class="my-10">
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">{{ error.message }}</div>
      <article class="grid grid-cols-1 w-fit rounded-md overflow-clip mx-auto">
        <div class="max-w-[300px] h-auto aspect-square">
          <img
            src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user image"
            class="object-contain"
            loading="lazy"
          />
        </div>
        <div class="bg-blue-300 text-gray-900 p-4">
          <div class="flex gap-x-2">
            <h3 class="font-semibold">
              {{ userDetails?.name }}
            </h3>
            <span class="italic">( {{ userDetails?.username }} )</span>
          </div>
          <p>{{ userDetails?.email }}</p>
        </div>
      </article>
    </TheContainer>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheContainer from '@/components/ui/TheContainer.vue'
import { computed } from 'vue'
import { useUserQuery } from '@/composables/useUserQuery'
import type { User } from '@/types/user'
const route = useRoute()
const paramId = computed(() => route.params.id)

const { data, error, isLoading } = useUserQuery({ id: Number(paramId.value) })

const userDetails = computed<User | undefined>(() => data.value)
</script>
