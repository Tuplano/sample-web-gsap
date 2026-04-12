import { useRef } from 'react'
import { gsap } from 'gsap'
import type { Hotel } from '@/types/hotel'

interface HotelCardProps {
  hotel: Hotel
  onCheckAvailability: (hotelId: string) => void
  isLoadingAvailability: boolean
  isSelected: boolean
}

/**
 * Editorial hotel card: minimalist, high-impact imagery, serif typography.
 */
export function HotelCard({
  hotel,
  onCheckAvailability,
  isLoadingAvailability,
  isSelected,
}: HotelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return (
    <article
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-500 reveal-text`}
      onClick={() => onCheckAvailability(hotel.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={hotel.heroImageUrl}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {isSelected && (
          <div className="absolute inset-x-0 bottom-0 bg-white/90 p-3 text-center backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">Current Selection</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-serif italic text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            {hotel.name}
          </h3>
          <span className="text-xs font-medium text-[var(--text-muted)] opacity-50 uppercase tracking-widest">
            {hotel.pricePerNight}$
          </span>
        </div>
        
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {hotel.location} • {hotel.rating} Rating
        </p>

        <button 
          className="mt-4 w-fit border-none bg-transparent p-0 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text)] hover:text-[var(--accent)] active:translate-y-0.5 transition-all"
          disabled={isLoadingAvailability}
        >
          {isLoadingAvailability ? 'Searching...' : 'Check Sanctuary'}
        </button>
      </div>
    </article>
  )
}
