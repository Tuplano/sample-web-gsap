export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'guest' | 'manager' | 'admin'
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  setSession: (session: { user: AuthUser; token: string }) => void
  clearSession: () => void
  login: (payload: { email: string; password: string }) => Promise<void>
  logout: () => void
}

export interface NormalizedApiError {
  message: string
  status: number
  code?: string
}
