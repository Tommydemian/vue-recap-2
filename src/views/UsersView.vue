<template>
  <TheContainer custom-class="my-4">
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <div>
      <ul class="flex flex-col gap-y-3">
        <li v-for="user in users" :key="user.id" class="p-4 rounded-md border border-lime-300">
          <h3 class="text-gray-900">{{ user.name }}</h3>
          <button
            type="button"
            @click="redirectToUserDetailsPage(user.id)"
            class="leading-[1] text-blue-400 cursor-pointer"
          >
            {{ user.website }}
          </button>
        </li>
      </ul>
    </div>
  </TheContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUsersQuery } from '@/composables/useUsersQuery'
import TheContainer from '@/components/ui/TheContainer.vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'

const router = useRouter()

const { data, error, isLoading } = useUsersQuery()
const users = computed(() => data.value || [])

const redirectToUserDetailsPage = (id: User['id']) => {
  router.push({ path: `users/${id}` })
}
</script>
