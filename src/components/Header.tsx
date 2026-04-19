import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useHeaderScroll } from '@/hooks/useGsapAnimations'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isHomeRoute = pathname === '/'
  const isSolidHeader = isScrolled || !isHomeRoute

  useHeaderScroll(setIsScrolled) // High-performance GSAP trigger

  return (
    <header className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-500 sm:px-8 ${
      isSolidHeader
        ? 'bg-background/88 backdrop-blur-xl border-b border-foreground/10'
        : 'bg-transparent'
    }`}>
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center">
        {/* Left Nav */}
        <div className={`flex gap-6 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 sm:gap-8 ${
          isSolidHeader ? 'text-foreground/75' : 'text-white/85'
        }`}>
          <Link
            to="/"
            className={`transition-opacity hover:opacity-100 ${
              pathname === '/' ? 'opacity-100' : 'opacity-70'
            }`}
          >
            Portfolio
          </Link>
          <a href="/#booking" className="opacity-70 transition-opacity hover:opacity-100">Sanctuaries</a>
        </div>
        
        {/* Centered Brandmark */}
        <div className="flex justify-center">
          <div className={`cursor-pointer font-serif text-xl italic tracking-[0.14em] transition-colors duration-500 sm:text-2xl ${
            isSolidHeader ? 'text-foreground' : 'text-white'
          }`}>
            Harborline Living
          </div>
        </div>

        {/* Right Nav */}
        <div className={`flex justify-end gap-6 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 sm:gap-8 ${
          isSolidHeader ? 'text-foreground/75' : 'text-white/85'
        }`}>
          <Link
            to="/story"
            className={`transition-opacity hover:opacity-100 ${
              pathname === '/story' ? 'opacity-100' : 'opacity-70'
            }`}
          >
            The Story
          </Link>
          <a href="/#booking" className="opacity-70 transition-opacity hover:opacity-100">Reserve</a>
        </div>
      </div>
    </header>
  )
}
