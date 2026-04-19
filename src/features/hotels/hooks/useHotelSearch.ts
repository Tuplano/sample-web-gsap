import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { bookingSchema } from '@/schemas/booking'
import type { BookingFormValues } from '@/schemas/booking'
import { hotelService } from '@/features/hotels/services/hotel'
import type { HotelSearchFilters } from '@/types/hotel'

/**
 * Composes search and booking server-state for hotel screens.
 */
export function useHotelSearch() {
  const [filters, setFilters] = useState<HotelSearchFilters>(
    hotelService.getDefaultFilters(),
  )

  const hotelsQuery = useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelService.search(filters),
  })

  const availabilityMutation = useMutation({
    mutationFn: (hotelId: string) =>
      hotelService.getAvailability({
        hotelId,
        ...filters,
      }),
  })

  const bookingMutation = useMutation({
    mutationFn: (values: BookingFormValues) => {
      const payload = bookingSchema.parse(values)
      return hotelService.createBooking(payload)
    },
  })

  return {
    filters,
    setFilters,
    hotelsQuery,
    availabilityMutation,
    bookingMutation,
  }
}
