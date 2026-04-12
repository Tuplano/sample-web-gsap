import { CheckCircle2, Info } from 'lucide-react'
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
      <section className="rounded-2xl border border-[var(--line-strong)] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent)] uppercase tracking-wider">
          <Info size={14} />
          Availability
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Select a property to view live availability and pricing details.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-[var(--accent)] bg-white px-6 py-5 shadow-md">
      <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent)] uppercase tracking-wider">
        <CheckCircle2 size={14} />
        Live Availability
      </div>
      <dl className="mt-6 grid gap-4 text-sm">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
          <dt className="text-[var(--text-muted)] font-medium">Rooms available</dt>
          <dd className="font-bold text-[var(--text)]">{availability.availableRooms}</dd>
        </div>
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
          <dt className="text-[var(--text-muted)] font-medium">Estimated total</dt>
          <dd className="text-base font-black text-[var(--text)]">
            {availability.currency} {availability.totalPrice}
          </dd>
        </div>
        <div className="flex items-center justify-between pt-1">
          <dt className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest leading-none">Reference</dt>
          <dd className="text-[10px] font-mono font-medium opacity-50">{availability.hotelId.slice(0, 8)}</dd>
        </div>
      </dl>
    </section>
  )
}
