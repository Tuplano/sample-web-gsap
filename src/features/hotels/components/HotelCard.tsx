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
    <article className={`hotel-card${isSelected ? ' selected' : ''}`}>
      <img src={hotel.heroImageUrl} alt={hotel.name} loading="lazy" />
      <div className="hotel-content">
        <h3>{hotel.name}</h3>
        <p className="muted">{hotel.location}</p>
        <p className="hotel-description">{hotel.description}</p>
        <ul className="amenities">
          {hotel.amenities.map((amenity) => (
            <li key={amenity.id}>{amenity.label}</li>
          ))}
        </ul>
        <div className="hotel-meta">
          <span>
            ${hotel.pricePerNight} / night
          </span>
          <span>
            {hotel.rating} ({hotel.reviewCount})
          </span>
          <span>{hotel.distanceToCenterKm} km to center</span>
        </div>
        <button
          type="button"
          onClick={() => onCheckAvailability(hotel.id)}
          disabled={isLoadingAvailability}
        >
          {isLoadingAvailability ? 'Checking...' : 'Check availability'}
        </button>
      </div>
    </article>
  )
}
