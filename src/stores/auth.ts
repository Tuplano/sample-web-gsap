import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthState, AuthUser } from '@/types/auth'

const DEMO_USER: AuthUser = {
  id: 'guest-001',
  name: 'Template Manager',
  email: 'manager@example.com',
  role: 'manager',
}

/**
 * Global auth state used by API middleware and route guards.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: ({ user, token }) => {
        set({ user, token, isAuthenticated: true })
      },
      clearSession: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
      login: async ({ email }) => {
        const token = `template-token-${Date.now()}`
        set({
          user: { ...DEMO_USER, email },
          token,
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'hotel-template-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
