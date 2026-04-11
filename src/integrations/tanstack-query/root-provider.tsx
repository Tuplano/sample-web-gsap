import { getQueryClient } from '@/config/queryClient'

export function getContext() {
  return {
    queryClient: getQueryClient(),
  }
}

export default function TanstackQueryProvider() {
  return null
}
