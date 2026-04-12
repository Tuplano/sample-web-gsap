import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, CreditCard, Mail, Phone, User } from 'lucide-react'

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
 * Booking form refined with high-end inputs and clear visual hierarchy.
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
    <section className="rounded-2xl border border-[var(--line-strong)] bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-2 text-sm font-bold text-[var(--text)] uppercase tracking-wider">
        <CreditCard size={16} />
        Complete Reservation
      </div>
      
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Select Property</label>
          <select
            className="w-full rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-sm transition-all focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
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
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Full Name</label>
          <div className="relative">
            <User className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-muted)] opacity-50" size={16} />
            <input
              className="w-full rounded-xl border border-[var(--line-strong)] bg-white pl-12 pr-4 py-3 text-sm transition-all focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
              placeholder="John Doe"
              value={formValues.fullName}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, fullName: event.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Email</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-muted)] opacity-50" size={16} />
              <input
                type="email"
                className="w-full rounded-xl border border-[var(--line-strong)] bg-white pl-12 pr-4 py-3 text-sm transition-all focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                placeholder="john@example.com"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Phone</label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-muted)] opacity-50" size={16} />
              <input
                className="w-full rounded-xl border border-[var(--line-strong)] bg-white pl-12 pr-4 py-3 text-sm transition-all focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                placeholder="+1 234 567 890"
                value={formValues.phone}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Check-in / Check-out</label>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-alt)] px-4 py-3 text-sm text-[var(--text-muted)]">
            <CalendarDays size={16} className="opacity-50" />
            <span>{formValues.checkIn} — {formValues.checkOut}</span>
            <span className="ml-auto text-[10px] font-black">{formValues.guests} Guests</span>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Special Requests</label>
          <textarea
            className="w-full rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-sm transition-all focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
            rows={3}
            placeholder="Dietary requirements, accessibility aids, or quiet rooms..."
            value={formValues.specialRequest}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                specialRequest: event.target.value,
              }))
            }
          />
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button 
          type="submit" 
          disabled={isDisabled}
          className="mt-2 w-full rounded-full bg-[var(--accent)] py-4 font-bold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? 'Securing your stay...' : 'Complete Reservation'}
        </button>
      </form>
    </section>
  )
}
