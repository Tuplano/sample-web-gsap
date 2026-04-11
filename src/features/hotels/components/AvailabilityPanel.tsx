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
      <section className="border border-[var(--line)] bg-white p-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">Availability</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Select a hotel and check availability.
        </p>
      </section>
    )
  }

  return (
    <section className="border border-[var(--line)] bg-white p-4">
      <h2 className="text-lg font-semibold text-[var(--text)]">Availability</h2>
      <dl className="mt-2 grid gap-2 text-sm">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
          <dt>Rooms available</dt>
          <dd>{availability.availableRooms}</dd>
        </div>
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
          <dt>Estimated total</dt>
          <dd>
            {availability.currency} {availability.totalPrice}
          </dd>
        </div>
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
          <dt>Hotel ID</dt>
          <dd>{availability.hotelId}</dd>
        </div>
      </dl>
    </section>
  )
}
