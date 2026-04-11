export interface HotelAmenity {
  id: string
  label: string
}

export interface Hotel {
  id: string
  name: string
  location: string
  distanceToCenterKm: number
  pricePerNight: number
  rating: number
  reviewCount: number
  description: string
  heroImageUrl: string
  amenities: HotelAmenity[]
}

export interface HotelSearchFilters {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

export interface AvailabilityRequest extends HotelSearchFilters {
  hotelId: string
}

export interface AvailabilityResponse {
  hotelId: string
  availableRooms: number
  totalPrice: number
  currency: 'USD'
}

export interface BookingPayload {
  hotelId: string
  fullName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  rooms: number
  guests: number
  specialRequest?: string
}

export interface BookingConfirmation {
  confirmationId: string
  hotelId: string
  totalPrice: number
  currency: 'USD'
}
