import { useRef } from 'react'
import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import { gsap } from 'gsap'

import { Button } from '@/components/ui/button'
import type { Hotel } from '@/types/hotel'

interface HotelCardProps {
  hotel: Hotel
  onCheckAvailability: (hotelId: string) => void
  isLoadingAvailability: boolean
}

/**
 * Editorial hotel card: minimalist, high-impact imagery, serif typography.
 */
export function HotelCard({
  hotel,
  onCheckAvailability,
  isLoadingAvailability,
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
      className="group cursor-pointer reveal-text transition-all duration-500"
      onClick={() => onCheckAvailability(hotel.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={hotel.heroImageUrl}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
      
      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[1.75rem] leading-none font-serif italic text-[var(--text)] transition-colors group-hover:text-primary">
              {hotel.name}
            </h3>
            <span className="pt-1 text-sm font-semibold tracking-[0.04em] text-foreground/64">
              ${hotel.pricePerNight}
              <span className="ml-1 text-xs font-medium text-muted-foreground">night</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary/80" />
              {hotel.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-primary/25 text-primary/80" />
              {hotel.rating} rating
            </span>
          </div>
        </div>
        
        <p className="max-w-[34ch] text-sm leading-6 text-muted-foreground">
          {hotel.description}
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-border/80 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {hotel.reviewCount} verified reviews
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-full px-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground hover:bg-transparent hover:text-primary"
            disabled={isLoadingAvailability}
          >
            {isLoadingAvailability ? 'Searching...' : 'Check stay'}
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  )
}
