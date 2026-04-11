import { addDays, differenceInCalendarDays, parseISO } from 'date-fns'

import { apiClient } from '@/lib/api-client'
import type {
  AvailabilityRequest,
  AvailabilityResponse,
  BookingConfirmation,
  BookingPayload,
  Hotel,
  HotelSearchFilters,
} from '@/types/hotel'

const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h-bayshore',
    name: 'Bayshore Lantern Hotel',
    location: 'Cebu City, Philippines',
    distanceToCenterKm: 1.4,
    pricePerNight: 92,
    rating: 4.6,
    reviewCount: 412,
    description:
      'Central business district property with fast check-in, rooftop breakfast, and airport transfer desk.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      { id: 'wifi', label: 'Wi-Fi' },
      { id: 'breakfast', label: 'Breakfast' },
      { id: 'airport', label: 'Airport Transfer' },
    ],
  },
  {
    id: 'h-courtyard',
    name: 'Courtyard Elms Suites',
    location: 'Makati, Philippines',
    distanceToCenterKm: 2.1,
    pricePerNight: 128,
    rating: 4.7,
    reviewCount: 287,
    description:
      'Apartment-style suites for longer stays, with meeting room access and all-day concierge.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      { id: 'kitchenette', label: 'Kitchenette' },
      { id: 'parking', label: 'Parking' },
      { id: 'workspace', label: 'Workspace' },
    ],
  },
  {
    id: 'h-clifftop',
    name: 'Clifftop Harbor Residence',
    location: 'Davao, Philippines',
    distanceToCenterKm: 3.8,
    pricePerNight: 146,
    rating: 4.8,
    reviewCount: 166,
    description:
      'Quiet hillside property with family rooms, evening lounge service, and pool deck.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      { id: 'pool', label: 'Pool' },
      { id: 'family', label: 'Family Rooms' },
      { id: 'gym', label: 'Gym' },
    ],
  },
]

function getNights(checkIn: string, checkOut: string): number {
  const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn))

  return nights > 0 ? nights : 1
}

function usesMockApi(): boolean {
  return !import.meta.env.VITE_API_BASE_URL
}

/**
 * Hotel API client responsible for inventory and booking endpoints.
 */
export const hotelApi = {
  async searchHotels(filters: HotelSearchFilters): Promise<Hotel[]> {
    if (!usesMockApi()) {
      const { data } = await apiClient.get<Hotel[]>('/hotels/search', {
        params: filters,
      })

      return data
    }

    const destination = filters.destination.trim().toLowerCase()

    return MOCK_HOTELS.filter((hotel) =>
      hotel.location.toLowerCase().includes(destination),
    )
  },

  async getAvailability(
    payload: AvailabilityRequest,
  ): Promise<AvailabilityResponse> {
    if (!usesMockApi()) {
      const { data } = await apiClient.post<AvailabilityResponse>(
        '/hotels/availability',
        payload,
      )

      return data
    }

    const hotel = MOCK_HOTELS.find((item) => item.id === payload.hotelId)

    if (!hotel) {
      throw new Error('Hotel not found')
    }

    const nights = getNights(payload.checkIn, payload.checkOut)

    return {
      hotelId: payload.hotelId,
      availableRooms: 7,
      totalPrice: nights * payload.rooms * hotel.pricePerNight,
      currency: 'USD',
    }
  },

  async submitBooking(payload: BookingPayload): Promise<BookingConfirmation> {
    if (!usesMockApi()) {
      const { data } = await apiClient.post<BookingConfirmation>(
        '/bookings',
        payload,
      )

      return data
    }

    const hotel = MOCK_HOTELS.find((item) => item.id === payload.hotelId)

    if (!hotel) {
      throw new Error('Selected hotel is not available anymore')
    }

    const nights = getNights(payload.checkIn, payload.checkOut)

    return {
      confirmationId: `BK-${Date.now()}`,
      hotelId: payload.hotelId,
      totalPrice: nights * payload.rooms * hotel.pricePerNight,
      currency: 'USD',
    }
  },

  getDefaultFilters(): HotelSearchFilters {
    const today = new Date()

    return {
      destination: 'Philippines',
      checkIn: today.toISOString().slice(0, 10),
      checkOut: addDays(today, 2).toISOString().slice(0, 10),
      guests: 2,
      rooms: 1,
    }
  },
}
