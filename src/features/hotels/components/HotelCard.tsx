import type { Hotel } from '@/types/hotel'

interface HotelCardProps {
  hotel: Hotel
  onCheckAvailability: (hotelId: string) => void
  isLoadingAvailability: boolean
  isSelected: boolean
}

/**
 * Displays a single hotel listing with key booking details.
 */
export function HotelCard({
  hotel,
  onCheckAvailability,
  isLoadingAvailability,
  isSelected,
}: HotelCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-md border bg-white ${
        isSelected ? 'border-[var(--primary)]' : 'border-[var(--line)]'
      }`}
    >
      <img
        src={hotel.heroImageUrl}
        alt={hotel.name}
        loading="lazy"
        className="block h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="m-0 text-lg font-semibold text-[var(--text)]">{hotel.name}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{hotel.location}</p>
        <p className="mt-2 text-sm text-[var(--text)]">{hotel.description}</p>
        <ul className="mt-3 list-disc pl-5 text-sm text-[var(--text-muted)]">
          {hotel.amenities.map((amenity) => (
            <li key={amenity.id}>{amenity.label}</li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
          <span>${hotel.pricePerNight} / night</span>
          <span>
            {hotel.rating} ({hotel.reviewCount})
          </span>
          <span>{hotel.distanceToCenterKm} km to center</span>
        </div>
        <button
          type="button"
          onClick={() => onCheckAvailability(hotel.id)}
          disabled={isLoadingAvailability}
          className="mt-3 inline-flex"
        >
          {isLoadingAvailability ? 'Checking...' : 'Check availability'}
        </button>
      </div>
    </article>
  )
}
