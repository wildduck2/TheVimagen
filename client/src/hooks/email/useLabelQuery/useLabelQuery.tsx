import { labelQuery } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export const useLabelQuery = () => {
  const labelQueryReq = useQuery({
    queryKey: ['label'],
    queryFn: labelQuery,
    refetchOnWindowFocus: false,
  })

  return { labelQueryReq }
}
