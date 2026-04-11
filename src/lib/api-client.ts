import axios, { type AxiosInstance } from 'axios'

import { attachApiInterceptors } from '@/middleware/api-interceptor'

const API_TIMEOUT_MS = 1000 * 12

/**
 * Creates the base Axios client used by all API modules.
 */
export function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    timeout: API_TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  attachApiInterceptors(instance)

  return instance
}

export const apiClient = createApiClient()
