import { hotelApi } from '@/api/hotel'
import type {
  AvailabilityRequest,
  AvailabilityResponse,
  BookingConfirmation,
  BookingPayload,
  Hotel,
  HotelSearchFilters,
} from '@/types/hotel'

/**
 * Feature-level service wrapper for hotel domain operations.
 */
export const hotelService = {
  search(filters: HotelSearchFilters): Promise<Hotel[]> {
    return hotelApi.searchHotels(filters)
  },
  getAvailability(payload: AvailabilityRequest): Promise<AvailabilityResponse> {
    return hotelApi.getAvailability(payload)
  },
  createBooking(payload: BookingPayload): Promise<BookingConfirmation> {
    return hotelApi.submitBooking(payload)
  },
  getDefaultFilters(): HotelSearchFilters {
    return hotelApi.getDefaultFilters()
  },
}
