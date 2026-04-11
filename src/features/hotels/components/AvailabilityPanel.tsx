import type { AvailabilityResponse } from '@/types/hotel'

interface AvailabilityPanelProps {
  availability: AvailabilityResponse | null
}

/**
 * Shows computed availability and estimated booking total.
 */
export function AvailabilityPanel({ availability }: AvailabilityPanelProps) {
  if (!availability) {
    return (
      <section className="panel availability">
        <h2 className="section-title">Availability</h2>
        <p className="muted">Select a hotel and check availability.</p>
      </section>
    )
  }

  return (
    <section className="panel availability">
      <h2 className="section-title">Availability</h2>
      <dl>
        <div>
          <dt>Rooms available</dt>
          <dd>{availability.availableRooms}</dd>
        </div>
        <div>
          <dt>Estimated total</dt>
          <dd>
            {availability.currency} {availability.totalPrice}
          </dd>
        </div>
        <div>
          <dt>Hotel ID</dt>
          <dd>{availability.hotelId}</dd>
        </div>
      </dl>
    </section>
  )
}
