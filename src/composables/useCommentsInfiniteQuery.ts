import { ref } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { Comment } from '@/types/comment'

const getComments = async (pageParam: number): Promise<Comment[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${pageParam}`)

  if (!res.ok) throw new Error('Invalid response')

  return res.json()
}

export const useCommentsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => getComments(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined
    },
    maxPages: 50,
  })
}
