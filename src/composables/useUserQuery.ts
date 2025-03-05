import type { User } from '@/types/user'
import { useQuery } from '@tanstack/vue-query'

type UserQueryConfig = {
  id: number
}

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

  if (!res.ok) throw new Error('Not a valid response')

  return res.json()
}

export const useUserQuery = ({ id }: UserQueryConfig) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(String(id)),
  })
}
