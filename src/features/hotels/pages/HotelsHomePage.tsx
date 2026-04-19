import { useMemo } from 'react'
import { BedDouble, CalendarDays, MapPin, Search, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EditorialSection } from '@/features/hotels/components/EditorialSection'
import { HotelCard } from '@/features/hotels/components/HotelCard'
import { useHotelSearch } from '@/features/hotels/hooks/useHotelSearch'
import { 
  useHeroPremiere, 
  useEditorialAnimation, 
  useSmoothScroll, 
  useCardSwapping,
  useInteractiveShowcase,
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
  } = useHotelSearch()

  useSmoothScroll() // Initialize momentum scrolling
  const { containerRef } = useEditorialAnimation()
  const { heroRef, titleRef, imageRef, contentRef: heroContentRef, overlayRef } = useHeroPremiere()
  const { 
    containerRef: mosaicContainerRef, 
    img1Ref: mosaicImg1Ref, 
    img2Ref: mosaicImg2Ref 
  } = useCardSwapping()
  const {
    sectionRef: showcaseRef,
    imageRef: showcaseImageRef,
    contentRef: showcaseContentRef,
  } = useInteractiveShowcase()

  const hotels = useMemo(() => hotelsQuery.data ?? [], [hotelsQuery.data])

  async function handleCheckAvailability(hotelId: string): Promise<void> {
    await availabilityMutation.mutateAsync(hotelId)
  }

  return (
    <main ref={containerRef} className="flex flex-col gap-0 bg-[var(--bg)]">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="hero-editorial relative flex items-center justify-center overflow-hidden">
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-black/20 transition-opacity duration-1000 group-hover:bg-black/15"></div>
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury living space"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div ref={heroContentRef} className="relative z-20 text-center text-white will-change-transform">
          <div className="page-wrap">
            <span className="hero-subtext mb-5 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase opacity-90">
              <MapPin className="size-3.5" />
              Est. 1994
            </span>
            <h1 ref={titleRef} className="editorial-title mb-0 text-white text-[3.75rem] sm:text-[5.5rem] md:text-[7rem]">
              The Experience
            </h1>
            <p className="hero-subtext mx-auto mt-6 max-w-2xl text-base font-normal leading-7 tracking-[0.01em] text-white/88 sm:text-lg">
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
          <span className="text-balance text-2xl font-serif italic leading-tight text-[var(--text)] sm:text-[2.75rem]">
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
      <section ref={showcaseRef} className="group relative h-[65vh] w-full overflow-hidden sm:h-[72vh]">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          ref={showcaseImageRef}
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=90"
          alt="Sunset dining room"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
        />
        <div ref={showcaseContentRef} className="absolute inset-0 z-20 flex items-center justify-center text-center text-white will-change-transform">
          <div className="page-wrap">
            <h2 className="editorial-title text-5xl text-white sm:text-7xl">Epicurean Journeys</h2>
            <p className="mx-auto mt-4 max-w-xl text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">Bespoke dining under the canopy of the stars.</p>
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
      <section ref={mosaicContainerRef} className="editorial-container stagger-item overflow-visible bg-secondary/10 py-20 sm:py-24">
        <div className="page-wrap">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            
            {/* Stacking Card Deck */}
            <div className="group relative h-[420px] w-full touch-pan-y sm:h-[560px]">
              <div ref={mosaicImg1Ref} className="absolute inset-0 z-20 aspect-square overflow-hidden rounded-[1.75rem] bg-secondary/5 shadow-xl origin-bottom-left will-change-transform">
                <img 
                  src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1000&q=80" 
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700" 
                  alt="Modern luxury dining"
                />
              </div>
              <div ref={mosaicImg2Ref} className="absolute inset-0 z-10 aspect-square translate-x-6 translate-y-6 scale-95 overflow-hidden rounded-[1.75rem] bg-secondary/5 shadow-xl origin-bottom-right will-change-transform sm:translate-x-10 sm:translate-y-10">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80" 
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700" 
                  alt="Sanctuary path"
                />
              </div>
            </div>

            {/* Anchored Portfolio Text - Ensured visibility with z-30 */}
            <div className="item reveal-text relative z-30 flex flex-col items-start justify-center rounded-2xl bg-background/88 p-6 text-left backdrop-blur-sm lg:rounded-none lg:bg-transparent lg:p-0 lg:pl-14 lg:backdrop-blur-none">
              <span className="editorial-label">The Portfolio</span>
              <h2 className="editorial-title tracking-tight text-foreground">Places that linger in memory.</h2>
              <p className="editorial-copy max-w-md text-foreground/72">
                Our properties are more than just hotels; they are anchors for 
                lifelong memories, designed to blend seamlessly with their 
                local heritage and the rhythms of the wild.
              </p>
              <Button variant="outline" size="lg" className="mt-8 h-11 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.16em]">
                Explore the portfolio
                <Search className="size-4" />
              </Button>
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
      <section id="booking" className="border-t border-[var(--line-strong)] bg-white py-20 sm:py-24">
        <div className="page-wrap">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                <BedDouble className="size-4" />
                Reservation desk
              </span>
              <h3 className="text-4xl font-serif italic leading-none text-[var(--text)] sm:text-5xl">Reserve your stay.</h3>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Refine your destination, choose your dates, and move straight into the most relevant stays.
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] text-primary">
              <Search size={16} />
            </div>
          </div>
          
          <div className="grid gap-4 rounded-[1.75rem] border border-border/80 bg-background p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.8fr))_auto] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <MapPin className="size-4 text-primary/80" />
                Destination
              </Label>
              <Input
                id="destination"
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                placeholder="Where to?"
                className="h-12 rounded-xl border-border/80 bg-background px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-in" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <CalendarDays className="size-4 text-primary/80" />
                Check-in
              </Label>
              <Input
                id="check-in"
                type="date"
                value={filters.checkIn}
                onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                className="h-12 rounded-xl border-border/80 bg-background px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-out" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <CalendarDays className="size-4 text-primary/80" />
                Check-out
              </Label>
              <Input
                id="check-out"
                type="date"
                value={filters.checkOut}
                onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                className="h-12 rounded-xl border-border/80 bg-background px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Users className="size-4 text-primary/80" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min={1}
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: Number(e.target.value) || 1 })}
                className="h-12 rounded-xl border-border/80 bg-background px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <BedDouble className="size-4 text-primary/80" />
                Rooms
              </Label>
              <Input
                id="rooms"
                type="number"
                min={1}
                value={filters.rooms}
                onChange={(e) => setFilters({ ...filters, rooms: Number(e.target.value) || 1 })}
                className="h-12 rounded-xl border-border/80 bg-background px-4 text-sm"
              />
            </div>
            <div className="flex items-end">
              <Button className="h-12 w-full rounded-xl px-5 text-[11px] font-semibold uppercase tracking-[0.16em] lg:w-auto">
                Check sanctuary
                <Search className="size-4" />
              </Button>
            </div>
          </div>

          {/* Results Grid - Lifestyle Simple */}
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onCheckAvailability={handleCheckAvailability}
                isLoadingAvailability={availabilityMutation.isPending}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
