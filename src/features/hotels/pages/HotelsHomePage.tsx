import { useMemo, useState } from 'react'
import {
  BedDouble,
  CalendarDays,
  CircleHelp,
  MapPin,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Trees,
} from 'lucide-react'

import { AvailabilityPanel } from '@/features/hotels/components/AvailabilityPanel'
import { BookingForm } from '@/features/hotels/components/BookingForm'
import { HotelCard } from '@/features/hotels/components/HotelCard'
import { HotelSearchForm } from '@/features/hotels/components/HotelSearchForm'
import { useHotelSearch } from '@/features/hotels/hooks/useHotelSearch'
import type { BookingFormValues } from '@/schemas/booking'
import type { AvailabilityResponse, BookingConfirmation } from '@/types/hotel'

/**
 * Main template page with brand-forward landing content and booking workflows.
 */
export function HotelsHomePage() {
  const {
    filters,
    setFilters,
    hotelsQuery,
    availabilityMutation,
    bookingMutation,
    selectedHotel,
  } = useHotelSearch()

  const [availability, setAvailability] =
    useState<AvailabilityResponse | null>(null)
  const [confirmation, setConfirmation] =
    useState<BookingConfirmation | null>(null)

  const hotels = useMemo(() => hotelsQuery.data ?? [], [hotelsQuery.data])

  async function handleCheckAvailability(hotelId: string): Promise<void> {
    const result = await availabilityMutation.mutateAsync(hotelId)
    setAvailability(result)
  }

  async function handleBookingSubmit(values: BookingFormValues): Promise<void> {
    const result = await bookingMutation.mutateAsync(values)
    setConfirmation(result)
  }

  return (
    <main className="pb-14">
      <section id="overview" className="relative min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
          alt="Mountain valley and luxury hillside hotel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,7,0.28)_0%,rgba(12,10,7,0.72)_74%)]" />
        <div className="page-wrap relative z-10 grid min-h-[520px] content-center justify-items-center gap-4 py-12 text-center text-white">
          <h1 className="max-w-[18ch] text-4xl leading-tight font-semibold sm:text-5xl">
            Contemporary stays with a nature-first atmosphere.
          </h1>
          <p className="max-w-3xl text-sm text-white/85 sm:text-base">
            A premium hotel website template with story-driven landing sections,
            room discovery, and an integrated booking workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-black/40 px-4 py-2 text-sm"
            >
              <CalendarDays size={16} aria-hidden="true" />
              Start booking
            </a>
            <a
              href="#collections"
              className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-4 py-2 text-sm text-black"
            >
              <BedDouble size={16} aria-hidden="true" />
              Explore rooms
            </a>
          </div>
        </div>
      </section>

      <section id="collections" className="border-b border-[var(--line)] py-12">
        <div className="page-wrap">
          <h2 className="text-3xl font-semibold text-[var(--text)]">
            Discover curated stays
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
            Use these content blocks for villas, city hotels, mountain cabins,
            or beach resorts without rewriting core layout structure.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Lakeside Villas',
                image:
                  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
              },
              {
                title: 'Forest Retreats',
                image:
                  'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=900&q=80',
              },
              {
                title: 'Cliffside Suites',
                image:
                  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80',
              },
              {
                title: 'Urban Residences',
                image:
                  'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=900&q=80',
              },
            ].map((item) => (
              <article key={item.title} className="overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
                <h3 className="mt-2 text-base font-medium text-[var(--text)]">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-b border-[var(--line)] py-12">
        <div className="page-wrap grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--text)]">
              Built for hotel operators and direct bookings
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-[var(--text-muted)] sm:text-base">
              <li className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                Location-first storytelling sections for each property.
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} aria-hidden="true" />
                Production-ready architecture with typed API and state layers.
              </li>
              <li className="flex items-center gap-2">
                <Trees size={16} aria-hidden="true" />
                Works for nature resorts, city hotels, and mixed portfolios.
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={16} aria-hidden="true" />
                Clean visual system that is easy to rebrand per client.
              </li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1000&q=80"
            alt="Aerial view of resort property"
            loading="lazy"
            className="h-64 w-full rounded-md object-cover"
          />
        </div>
      </section>

      <section id="booking" className="bg-[var(--surface-alt)] py-10">
        <div className="page-wrap">
          <h2 className="text-3xl font-semibold text-[var(--text)]">
            Search and book in one flow
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
            This section is wired to your mock API today and can be swapped to a
            live backend through `VITE_API_BASE_URL`.
          </p>

          <div className="mt-6 grid gap-6">
            <HotelSearchForm filters={filters} onChange={setFilters} />

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <div className="grid gap-3">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  Available hotels
                </h3>
                {hotelsQuery.isLoading ? <p>Loading hotels...</p> : null}
                {hotelsQuery.isError ? (
                  <p className="text-sm text-red-700">
                    Unable to load hotels right now.
                  </p>
                ) : null}
                {hotelsQuery.data?.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    No hotels match your destination.
                  </p>
                ) : null}
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

              <div className="grid content-start gap-3">
                <AvailabilityPanel availability={availability} />
                <BookingForm
                  hotels={hotels}
                  filters={filters}
                  isSubmitting={bookingMutation.isPending}
                  onSubmit={handleBookingSubmit}
                />
                {confirmation ? (
                  <section className="border border-[var(--line)] bg-white p-4">
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      Booking confirmed
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      Reference: {confirmation.confirmationId}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Total: {confirmation.currency} {confirmation.totalPrice}
                    </p>
                  </section>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="page-wrap grid gap-8 lg:grid-cols-2">
          <article className="border-t border-[var(--line)] pt-4">
            <div className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <MessageSquareQuote size={16} aria-hidden="true" />
              Guest feedback
            </div>
            <p className="mt-3 max-w-prose text-[var(--text)]">
              Guests complimented the cleaner booking flow and we saw higher
              direct reservations in the first two weeks.
            </p>
            <span className="mt-2 block text-sm text-[var(--text-muted)]">
              Operations Manager, Harborline Group
            </span>
          </article>

          <article className="border-t border-[var(--line)] pt-4">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-[var(--text)]">
              <CircleHelp size={16} aria-hidden="true" />
              Frequently asked questions
            </h2>
            <details className="mt-3 border-b border-[var(--line)] pb-3">
              <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
                Can this support multiple hotel branches?
              </summary>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Yes. Use property-specific data from your API and duplicate the
                route pattern for each brand or location.
              </p>
            </details>
            <details className="mt-3 border-b border-[var(--line)] pb-3">
              <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
                Can I keep this as landing-only without booking?
              </summary>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Yes. Remove the booking block and keep the hero, collections,
                and editorial sections for a brochure-style site.
              </p>
            </details>
          </article>
        </div>
      </section>
    </main>
  )
}
