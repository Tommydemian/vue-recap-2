import type { User } from '@/types/user'
import { useQuery } from '@tanstack/vue-query'

const getUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!res.ok) throw new Error('Not a valid response')

  return res.json()
}

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
