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
    <section className="panel">
      <h2 className="section-title">Search stays</h2>
      <div className="form-grid">
        <label className="field">
          <span>Destination</span>
          <input
            value={filters.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            placeholder="City or area"
          />
        </label>
        <label className="field">
          <span>Check-in</span>
          <input
            type="date"
            value={filters.checkIn}
            onChange={(event) => updateField('checkIn', event.target.value)}
          />
        </label>
        <label className="field">
          <span>Check-out</span>
          <input
            type="date"
            value={filters.checkOut}
            onChange={(event) => updateField('checkOut', event.target.value)}
          />
        </label>
        <label className="field">
          <span>Guests</span>
          <input
            type="number"
            min={1}
            max={10}
            value={filters.guests}
            onChange={(event) => onNumberChange('guests', event)}
          />
        </label>
        <label className="field">
          <span>Rooms</span>
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
