<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TheContainer from '@/components/ui/TheContainer.vue'
import { useCommentsInfiniteQuery } from '@/composables/useCommentsInfiniteQuery'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

useIntersectionObserver({
  targetElId: 'sentinel-bottom',
  targetTopElementId: 'sentinel-top',
  callback: handleBottomIntersection,
  secondCallback: handleTopIntersection,
})

const windowSize = ref(20)
const windowStart = ref(0)

const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
  useCommentsInfiniteQuery()

const visibleComments = computed(() => {
  // biome-ignore lint/correctness/noFlatMapIdentity: <explanation>
  const comments = data.value?.pages.flatMap((page) => page) || []
  return comments.slice(windowStart.value, windowStart.value + windowSize.value) // 0, 0 + 20
})

function handleTopIntersection() {
  if (windowStart.value > 0) {
    // windowStart.value = windowStart.value - 10
  } else return
}

function handleBottomIntersection() {
  if (hasNextPage.value && !isFetchingNextPage.value) {
    windowStart.value = windowStart.value + 10
    fetchNextPage()
  }
}

watch(visibleComments, (val) => console.log(val), { deep: true })
</script>

<template>
  <main>
    <TheContainer custom-class="my-4">
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">{{ error.message }}</div>

      <div data-content>
        <ul
          id="comment-list"
          ref="comment-list"
          class="flex flex-col gap-y-3 border border-pink-500"
        >
          <div id="sentinel-top" class="h-10 outline-lime-500 outline"></div>
          <li
            v-for="comment in visibleComments"
            :key="comment.id"
            class="p-4 rounded-md border border-gray-600 text-gray-900 mx-auto w-[90%]"
          >
            <h3 class="font-semibold">{{ comment.name || 'Default name' }}</h3>
            <button type="button" class="leading-[1] text-blue-400 cursor-pointer">
              {{ comment.email }}
            </button>
            <div>
              {{ comment.body }}
            </div>
          </li>
          <div id="sentinel-bottom" class="h-10 outline outline-amber-500"></div>
        </ul>
      </div>
    </TheContainer>
  </main>
</template>
