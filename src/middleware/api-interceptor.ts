import axios, { type AxiosInstance } from 'axios'

import { useAuthStore } from '@/stores/auth'
import type { NormalizedApiError } from '@/types/auth'

/**
 * Maps unknown HTTP failures into a consistent UI-safe shape.
 */
function normalizeApiError(error: unknown): NormalizedApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500
    const data = error.response?.data as { message?: string; code?: string } | undefined

    return {
      message: data?.message ?? error.message ?? 'Request failed',
      status,
      code: data?.code,
    }
  }

  return {
    message: 'Unexpected network error',
    status: 500,
  }
}

/**
 * Registers auth-aware request and response interceptors.
 */
export function attachApiInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )
}
