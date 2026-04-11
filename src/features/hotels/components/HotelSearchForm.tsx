import { type ChangeEvent } from 'react'

import type { HotelSearchFilters } from '@/types/hotel'

interface HotelSearchFormProps {
  filters: HotelSearchFilters
  onChange: (next: HotelSearchFilters) => void
}

/**
 * Search controls shared by listing and booking workflows.
 */
export function HotelSearchForm({ filters, onChange }: HotelSearchFormProps) {
  function updateField<K extends keyof HotelSearchFilters>(
    key: K,
    value: HotelSearchFilters[K],
  ): void {
    onChange({
      ...filters,
      [key]: value,
    })
  }

  function onNumberChange(
    key: 'guests' | 'rooms',
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    const value = Number(event.target.value)
    updateField(key, Number.isNaN(value) ? filters[key] : value)
  }

  return (
    <section className="border-y border-[var(--line)] py-6">
      <h2 className="text-xl font-semibold text-[var(--text)]">Search stays</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Destination</span>
          <input
            value={filters.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            placeholder="City or area"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Check-in</span>
          <input
            type="date"
            value={filters.checkIn}
            onChange={(event) => updateField('checkIn', event.target.value)}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Check-out</span>
          <input
            type="date"
            value={filters.checkOut}
            onChange={(event) => updateField('checkOut', event.target.value)}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Guests</span>
          <input
            type="number"
            min={1}
            max={10}
            value={filters.guests}
            onChange={(event) => onNumberChange('guests', event)}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-[var(--text)]">Rooms</span>
          <input
            type="number"
            min={1}
            max={5}
            value={filters.rooms}
            onChange={(event) => onNumberChange('rooms', event)}
          />
        </label>
      </div>
    </section>
  )
}
