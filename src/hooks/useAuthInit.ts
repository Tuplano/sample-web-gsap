import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth'

/**
 * Ensures persisted auth state is hydrated once during app bootstrap.
 */
export function useAuthInit(): void {
  useEffect(() => {
    void useAuthStore.persist.rehydrate()
  }, [])
}
