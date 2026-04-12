import { type ChangeEvent } from 'react'
import { Calendar, MapPin, Search, Users } from 'lucide-react'

import type { HotelSearchFilters } from '@/types/hotel'

interface HotelSearchFormProps {
  filters: HotelSearchFilters
  onChange: (next: HotelSearchFilters) => void
}

/**
 * Search controls refined with a modern, high-density layout.
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
    <section className="mb-8">
      <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">
        <Search size={14} />
        Search Parameters
      </div>
      <div className="grid gap-2 rounded-2xl bg-[var(--surface-alt)] p-2 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <MapPin className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--accent)]" size={16} />
          <input
            className="w-full rounded-xl border-none bg-white pl-12 pr-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--accent)]"
            value={filters.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            placeholder="Where are you going?"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--accent)] opacity-50" size={16} />
          <input
            type="date"
            className="w-full rounded-xl border-none bg-white pl-12 pr-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--accent)]"
            value={filters.checkIn}
            onChange={(event) => updateField('checkIn', event.target.value)}
          />
        </div>

        <div className="relative">
          <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--accent)] opacity-50" size={16} />
          <input
            type="date"
            className="w-full rounded-xl border-none bg-white pl-12 pr-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--accent)]"
            value={filters.checkOut}
            onChange={(event) => updateField('checkOut', event.target.value)}
          />
        </div>

        <div className="relative">
          <Users className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--accent)] opacity-50" size={16} />
          <div className="flex w-full items-center rounded-xl bg-white pl-12 pr-4 py-3 text-sm">
            <input
              type="number"
              min={1}
              max={10}
              className="w-full border-none p-0 focus:ring-0"
              value={filters.guests}
              onChange={(event) => onNumberChange('guests', event)}
            />
            <span className="ml-2 text-[10px] font-bold text-[var(--text-muted)] uppercase">Guests</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex w-full items-center rounded-xl bg-white px-4 py-3 text-sm">
            <input
              type="number"
              min={1}
              max={5}
              className="w-full border-none p-0 focus:ring-0"
              value={filters.rooms}
              onChange={(event) => onNumberChange('rooms', event)}
            />
            <span className="ml-2 text-[10px] font-bold text-[var(--text-muted)] uppercase">Rooms</span>
          </div>
        </div>
      </div>
    </section>
  )
}
