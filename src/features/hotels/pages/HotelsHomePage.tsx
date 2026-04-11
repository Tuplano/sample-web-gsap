import { useMemo, useState } from 'react'

import { AvailabilityPanel } from '@/features/hotels/components/AvailabilityPanel'
import { BookingForm } from '@/features/hotels/components/BookingForm'
import { HotelCard } from '@/features/hotels/components/HotelCard'
import { HotelSearchForm } from '@/features/hotels/components/HotelSearchForm'
import { useHotelSearch } from '@/features/hotels/hooks/useHotelSearch'
import type { BookingFormValues } from '@/schemas/booking'
import type { AvailabilityResponse, BookingConfirmation } from '@/types/hotel'

/**
 * Main template page for hotel listing and booking workflows.
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
    <main className="page-wrap hotel-page">
      <section className="template-intro">
        <p>
          Reusable starter for hotel projects with search, availability checks,
          and booking flow.
        </p>
      </section>

      <HotelSearchForm filters={filters} onChange={setFilters} />

      <section className="listing-layout">
        <div className="listing-column">
          <h2 className="section-title">Available hotels</h2>
          {hotelsQuery.isLoading ? <p>Loading hotels...</p> : null}
          {hotelsQuery.isError ? (
            <p className="error-text">Unable to load hotels right now.</p>
          ) : null}
          {hotelsQuery.data?.length === 0 ? (
            <p className="muted">No hotels match your destination.</p>
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

        <div className="side-column">
          <AvailabilityPanel availability={availability} />
          <BookingForm
            hotels={hotels}
            filters={filters}
            isSubmitting={bookingMutation.isPending}
            onSubmit={handleBookingSubmit}
          />
          {confirmation ? (
            <section className="panel confirmation">
              <h2 className="section-title">Booking confirmed</h2>
              <p>Reference: {confirmation.confirmationId}</p>
              <p>
                Total: {confirmation.currency} {confirmation.totalPrice}
              </p>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  )
}
