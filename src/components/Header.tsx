import { Link } from '@tanstack/react-router'
import { CalendarDays, Compass, Hotel, Info } from 'lucide-react'

import { useAuthStore } from '@/stores/auth'

export default function Header() {
  const user = useAuthStore((state) => state.user)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  async function handleSessionToggle(): Promise<void> {
    if (user) {
      logout()
      return
    }

    await login({
      email: 'manager@example.com',
      password: 'template-password',
    })
  }

  return (
    <header className="site-header">
      <div className="page-wrap header-inner">
        <Link to="/" className="brand-link">
          Harborline Hotels
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/#overview">
            <Compass size={14} aria-hidden="true" />
            Overview
          </a>
          <a href="/#collections">
            <Hotel size={14} aria-hidden="true" />
            Stays
          </a>
          <a href="/#booking">
            <CalendarDays size={14} aria-hidden="true" />
            Booking
          </a>
          <Link to="/about" activeProps={{ className: 'active' }}>
            <Info size={14} aria-hidden="true" />
            Template notes
          </Link>
        </nav>
        <button
          type="button"
          className="session-btn"
          onClick={handleSessionToggle}
        >
          {user ? 'Sign out' : 'Demo sign in'}
        </button>
      </div>
    </header>
  )
}
