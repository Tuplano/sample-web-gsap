import { QueryClient } from '@tanstack/react-query'

/**
 * Creates a shared QueryClient with production-safe defaults.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        retry: (failureCount, error) => {
          if (error instanceof Error && /401|403/.test(error.message)) {
            return false
          }

          return failureCount < 2
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let singletonQueryClient: QueryClient | null = null

export function getQueryClient(): QueryClient {
  singletonQueryClient ??= createQueryClient()

  return singletonQueryClient
}
