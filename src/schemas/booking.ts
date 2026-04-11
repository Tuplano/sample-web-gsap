import { z } from 'zod'

/**
 * Shared booking schema that keeps form validation consistent across features.
 */
export const bookingSchema = z
  .object({
    hotelId: z.string().min(1, 'Select a hotel'),
    fullName: z.string().min(2, 'Enter a full name'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().min(7, 'Enter a valid phone number'),
    checkIn: z.iso.date('Select a valid check-in date'),
    checkOut: z.iso.date('Select a valid check-out date'),
    rooms: z.number().int().min(1).max(5),
    guests: z.number().int().min(1).max(10),
    specialRequest: z.string().max(400).optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    path: ['checkOut'],
    message: 'Check-out date must be after check-in date',
  })

export type BookingFormValues = z.infer<typeof bookingSchema>
