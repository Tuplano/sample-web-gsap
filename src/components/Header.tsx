import { useState } from 'react'
import { useHeaderScroll } from '@/hooks/useGsapAnimations'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useHeaderScroll(setIsScrolled) // High-performance GSAP trigger

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-700 px-8 py-6 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center">
        {/* Left Nav */}
        <div className={`flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${
          isScrolled ? 'text-foreground/70' : 'text-white/80'
        }`}>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">Portfolio</a>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">Sanctuaries</a>
        </div>
        
        {/* Centered Brandmark */}
        <div className="flex justify-center">
          <div className={`font-serif text-2xl italic tracking-[0.2em] cursor-pointer transition-colors duration-500 ${
            isScrolled ? 'text-foreground' : 'text-white'
          }`}>
            Harborline Living
          </div>
        </div>

        {/* Right Nav */}
        <div className={`flex justify-end gap-10 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${
          isScrolled ? 'text-foreground/70' : 'text-white/80'
        }`}>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">The Story</a>
          <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">Reserve</a>
        </div>
      </div>
    </header>
  )
}
