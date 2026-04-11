import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { bookingSchema } from '@/schemas/booking'
import type { BookingFormValues } from '@/schemas/booking'
import type { Hotel, HotelSearchFilters } from '@/types/hotel'

interface BookingFormProps {
  hotels: Hotel[]
  filters: HotelSearchFilters
  isSubmitting: boolean
  onSubmit: (values: BookingFormValues) => Promise<void>
}

/**
 * Booking form used as a baseline for future integrations.
 */
export function BookingForm({
  hotels,
  filters,
  isSubmitting,
  onSubmit,
}: BookingFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<BookingFormValues>(() => ({
    hotelId: hotels[0]?.id ?? '',
    fullName: '',
    email: '',
    phone: '',
    checkIn: filters.checkIn,
    checkOut: filters.checkOut,
    rooms: filters.rooms,
    guests: filters.guests,
    specialRequest: '',
  }))

  useEffect(() => {
    setFormValues((previous) => ({
      ...previous,
      hotelId: previous.hotelId || hotels[0]?.id || '',
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      rooms: filters.rooms,
      guests: filters.guests,
    }))
  }, [filters.checkIn, filters.checkOut, filters.guests, filters.rooms, hotels])

  const isDisabled = useMemo(
    () => isSubmitting || hotels.length === 0,
    [hotels.length, isSubmitting],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setError(null)

    const parsed = bookingSchema.safeParse(formValues)

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please review your inputs')
      return
    }

    await onSubmit(parsed.data)
  }

  return (
    <section className="border border-[var(--line)] bg-white p-4">
      <h2 className="text-lg font-semibold text-[var(--text)]">Book now</h2>
      <form className="mt-3 grid gap-3" onSubmit={handleSubmit}>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Hotel</span>
          <select
            value={formValues.hotelId}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, hotelId: event.target.value }))
            }
          >
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Full name</span>
          <input
            value={formValues.fullName}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, fullName: event.target.value }))
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Email</span>
          <input
            type="email"
            value={formValues.email}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Phone</span>
          <input
            value={formValues.phone}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Special request</span>
          <textarea
            rows={3}
            value={formValues.specialRequest}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                specialRequest: event.target.value,
              }))
            }
          />
        </label>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button type="submit" disabled={isDisabled}>
          {isSubmitting ? 'Submitting booking...' : 'Confirm booking'}
        </button>
      </form>
    </section>
  )
}
