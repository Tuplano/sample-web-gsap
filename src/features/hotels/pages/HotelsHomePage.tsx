import { useMemo } from 'react'
import { Search } from 'lucide-react'

import { EditorialSection } from '@/features/hotels/components/EditorialSection'
import { HotelCard } from '@/features/hotels/components/HotelCard'
import { useHotelSearch } from '@/features/hotels/hooks/useHotelSearch'
import { 
  useHeroPremiere, 
  useEditorialAnimation, 
  useSmoothScroll, 
  useCardSwapping 
} from '@/hooks/useGsapAnimations'

/**
 * High-end luxury editorial landing page.
 * Strictly follows the reference layout for a story-driven guest experience.
 */
export function HotelsHomePage() {
  const {
    filters,
    setFilters,
    hotelsQuery,
    availabilityMutation,
    selectedHotel,
  } = useHotelSearch()

  useSmoothScroll() // Initialize momentum scrolling
  const { containerRef } = useEditorialAnimation()
  const { heroRef, titleRef, imageRef } = useHeroPremiere()
  const { 
    containerRef: mosaicContainerRef, 
    img1Ref: mosaicImg1Ref, 
    img2Ref: mosaicImg2Ref 
  } = useCardSwapping()

  const hotels = useMemo(() => hotelsQuery.data ?? [], [hotelsQuery.data])

  async function handleCheckAvailability(hotelId: string): Promise<void> {
    await availabilityMutation.mutateAsync(hotelId)
  }

  return (
    <main ref={containerRef} className="flex flex-col gap-0 bg-[var(--bg)]">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="hero-editorial relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-1000 group-hover:bg-black/15"></div>
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury living space"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-20 text-center text-white">
          <div className="page-wrap">
            <span className="hero-subtext mb-6 block text-[10px] font-bold tracking-[0.4em] uppercase opacity-90">Est. 1994</span>
            <h1 ref={titleRef} className="editorial-title font-serif italic text-white mb-0 text-7xl sm:text-8xl md:text-9xl leading-none">The Experience</h1>
            <p className="hero-subtext mx-auto mt-8 max-w-xl text-lg font-light tracking-wide opacity-90 leading-relaxed">
              A sanctuary for the discerning soul, where every detail is a dialogue between architecture and nature.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Intro Statement */}
      <EditorialSection
        layout="centered"
        title=""
        description={
          <span className="text-3xl font-serif italic text-[var(--text)] sm:text-4xl text-balance">
            "A collection of destinations built for the discerning traveler. 
            Where luxury meets the whispers of the wild, and every stay 
            is a curated chapter in your story."
          </span>
        }
      />

      {/* 3. Chapter 01 - Split Left Text */}
      <EditorialSection
        layout="split-left"
        label="01"
        title="Lush retreats and hidden lagoons"
        description="Escape into the verdant embrace of our private islands, where the turquoise waters meet the emerald canopy of the forest."
        imageSrc="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
        metadata={{
          coordinates: "8.4095° S, 115.1889° E",
          location: "Ubud Sanctuary, Bali",
          category: "Forest Escape"
        }}
      />

      {/* 4. Chapter 02 - Split Right Text (Alternating) */}
      <EditorialSection
        layout="split-right"
        label="02"
        title="Serene private pools"
        description="Your sanctuary includes a personal horizon. Swim under the stars or greet the morning sun from the privacy of your own pool deck."
        imageSrc="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
        metadata={{
          coordinates: "13.7542° N, 59.5448° W",
          location: "Sandy Lane, Barbados",
          category: "Island Retreat"
        }}
      />

      {/* 5. Feature Hero - Mid-roll immersive */}
      <section className="relative h-[80vh] w-full overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=90"
          alt="Sunset dining room"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white">
          <div className="page-wrap">
            <h2 className="editorial-title italic text-6xl md:text-8xl">Epicurean Journeys</h2>
            <p className="mx-auto mt-6 max-w-xl text-[10px] font-bold tracking-[0.4em] opacity-90 uppercase">Bespoke dining under the canopy of the stars.</p>
          </div>
        </div>
      </section>

      {/* 6. Chapter 03 - Split Left Text */}
      <EditorialSection
        layout="split-left"
        label="03"
        title="A sanctuary for the senses"
        description="From open-air baths to curated scents, every element is designed to ground you in the present moment."
        imageSrc="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"
        metadata={{
          coordinates: "3.2028° S, 73.2207° E",
          location: "Malé Atoll, Maldives",
          category: "Oceanic Wellness"
        }}
      />

      {/* 7. Experience Collage Mosaic */}
      <section ref={mosaicContainerRef} className="editorial-container bg-secondary/10 stagger-item py-48 overflow-visible">
        <div className="page-wrap">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* Stacking Card Deck */}
            <div className="relative h-[600px] w-full group">
              <div ref={mosaicImg1Ref} className="absolute inset-0 aspect-square overflow-hidden bg-secondary/5 shadow-2xl z-20 origin-bottom-left">
                <img 
                  src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1000&q=80" 
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700" 
                  alt="Modern luxury dining"
                />
              </div>
              <div ref={mosaicImg2Ref} className="absolute inset-0 aspect-square overflow-hidden bg-secondary/5 shadow-2xl z-10 translate-x-12 translate-y-12 scale-95 origin-bottom-right">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80" 
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700" 
                  alt="Sanctuary path"
                />
              </div>
            </div>

            {/* Anchored Portfolio Text - Ensured visibility with z-30 */}
            <div className="relative z-30 flex flex-col justify-center item reveal-text lg:pl-20 items-start text-left bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-8 lg:p-0 rounded-2xl lg:rounded-none">
              <span className="editorial-label">The Portfolio</span>
              <h2 className="editorial-title italic text-foreground tracking-tight">Places that linger in memory.</h2>
              <p className="editorial-copy mt-8 text-foreground/70 leading-relaxed max-w-sm">
                Our properties are more than just hotels; they are anchors for 
                lifelong memories, designed to blend seamlessly with their 
                local heritage and the rhythms of the wild.
              </p>
              <div className="mt-12 flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Search size={14} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Chapter 04 - Split Right Text */}
      <EditorialSection
        layout="split-right"
        label="04"
        title="Sanctuaries built for the wild"
        description="Low-impact architecture that respects the land it occupies, allowing you to reside in nature without disturbing its delicate balance."
        imageSrc="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80"
        metadata={{
          coordinates: "36.5667° N, 118.7667° W",
          location: "Sequoia Highlands, USA",
          category: "Mountain Sanctum"
        }}
      />

      {/* 9. Closing Scene */}
      <EditorialSection
        layout="split-left"
        label="Conclusion"
        title="Your story begins here"
        description="Whether seeking silence or adventure, your chapter at Harborline awaits its first word."
        imageSrc="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
        metadata={{
          coordinates: "Sanctuary Collective",
          location: "Worldwide",
          category: "Global Anthology"
        }}
      />

      {/* 10. Integrated Booking Bar */}
      <section id="booking" className="border-t border-[var(--line-strong)] bg-white py-24">
        <div className="page-wrap">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 sm:flex-row sm:items-center">
            <h3 className="text-4xl font-serif italic text-[var(--text)]">Reserve your stay.</h3>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)]">
              <Search size={16} />
            </div>
          </div>
          
          <div className="grid gap-16 p-1 border-b border-[var(--line-strong)] pb-24 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-extrabold uppercase tracking-[0.3em] opacity-40">Destination</label>
              <input 
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                placeholder="Where to?" 
                className="w-full text-2xl"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-extrabold uppercase tracking-[0.3em] opacity-40">Check-in</label>
              <input 
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-extrabold uppercase tracking-[0.3em] opacity-40">Check-out</label>
              <input 
                type="date"
                value={filters.checkOut}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-[var(--text)] py-5 text-white hover:bg-[var(--accent)] hover:border-[var(--accent)]">
                Check Sanctuary
              </button>
            </div>
          </div>

          {/* Results Grid - Lifestyle Simple */}
          <div className="mt-32 grid gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onCheckAvailability={handleCheckAvailability}
                isLoadingAvailability={availabilityMutation.isPending}
                isSelected={hotel.id === selectedHotel?.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
